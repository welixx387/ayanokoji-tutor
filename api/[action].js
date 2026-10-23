// API аккаунтов: регистрация, вход, облачный прогресс, рейтинг. Один файл — одна функция Vercel: /api/<action>
import { q } from './_lib/db.js';
import { hashPassword, checkPassword, createSession, currentUser, dropSession, rateLimit } from './_lib/auth.js';

const RANKS = [['A', 15000], ['B', 6000], ['C', 1500], ['D', 0]];
const rankOf = pp => RANKS.find(([, min]) => pp >= min)[0];
const int = (v, max) => Math.max(0, Math.min(max, Math.round(Number(v) || 0)));
const MAX_STATE = 200000;

const send = (res, code, data) => res.status(code).json(data);
const fail = (status, error, field) => Object.assign(new Error(error), { status, public: true, field });
const pub = u => ({ nick: u.nick, email: u.email || '' });

function cleanNick(v) {
  const nick = String(v || '').replace(/\s+/g, ' ').trim();
  if (nick.length < 2 || nick.length > 24) throw fail(400, 'Ник — от 2 до 24 символов.', 'nick');
  if (!/^[\p{L}\p{N} _.\-]+$/u.test(nick)) throw fail(400, 'В нике можно использовать буквы, цифры, пробел, точку, дефис и подчёркивание.', 'nick');
  return nick;
}
const nickKey = nick => nick.toLowerCase().replace(/ё/g, 'е');

function cleanEmail(v) {
  const email = String(v || '').trim().toLowerCase();
  if (!email) return null;
  if (email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw fail(400, 'Проверь email — похоже, в нём ошибка.', 'email');
  return email;
}

function cleanPassword(v, field = 'password') {
  const pw = String(v || '');
  if (pw.length < 8) throw fail(400, 'Пароль — не короче 8 символов.', field);
  if (pw.length > 128) throw fail(400, 'Пароль слишком длинный.', field);
  return pw;
}

function cleanState(v) {
  const state = v && typeof v === 'object' && !Array.isArray(v) ? v : {};
  const json = JSON.stringify(state);
  if (json.length > MAX_STATE) throw fail(413, 'Прогресс слишком большой для сохранения.');
  const pp = int(state.pp, 10000000);
  return {
    json, pp, rank: rankOf(pp),
    iq: int(state.iq && state.iq.best, 200),
    lessons: int(state.done && typeof state.done === 'object' ? Object.keys(state.done).length : 0, 10000)
  };
}

async function needUser(req) {
  const u = await currentUser(req);
  if (!u) throw fail(401, 'Нужно войти в аккаунт.');
  return u;
}

async function conflicts(nick, email, exceptId = 0) {
  const rows = await q(`select nick_key, email from ayk_users where (nick_key = $1 or ($2::text is not null and email = $2)) and id <> $3`, [nickKey(nick), email, exceptId]);
  if (rows.some(r => r.nick_key === nickKey(nick))) throw fail(409, 'Этот ник уже занят.', 'nick');
  if (email && rows.some(r => r.email === email)) throw fail(409, 'Этот email уже зарегистрирован. Попробуй войти.', 'email');
}

const ROUTES = {
  me: { method: 'GET', async fn(req, res) {
    const u = await currentUser(req);
    // гостю — 200 с user: null, чтобы проверка входа не сыпала ошибками в консоль браузера
    if (!u) return send(res, 200, { user: null });
    send(res, 200, { user: pub(u), state: u.state || {} });
  } },

  register: { method: 'POST', async fn(req, res, b) {
    const nick = cleanNick(b.nick), email = cleanEmail(b.email), pw = cleanPassword(b.password);
    const s = cleanState(b.state);
    // лимиты по адресу щадящие: у целого класса в школе может быть один IP
    if (!(await rateLimit(req, 'reg', 40, 60))) throw fail(429, 'Слишком много регистраций с этого адреса. Попробуй через час.');
    await conflicts(nick, email);
    const pass = await hashPassword(pw);
    let rows;
    try {
      rows = await q(`insert into ayk_users (nick, nick_key, email, pass, state, pp, rank, iq, lessons) values ($1, $2, $3, $4, $5::jsonb, $6, $7, $8, $9) returning *`,
        [nick, nickKey(nick), email, pass, s.json, s.pp, s.rank, s.iq, s.lessons]);
    } catch (e) {
      if (e && e.code === '23505') { await conflicts(nick, email); throw fail(409, 'Такой аккаунт уже есть.'); }
      throw e;
    }
    await createSession(res, rows[0].id);
    send(res, 200, { user: pub(rows[0]), state: rows[0].state });
  } },

  login: { method: 'POST', async fn(req, res, b) {
    const login = String(b.login || '').trim(), pw = String(b.password || '');
    if (!login || !pw) throw fail(400, 'Введи ник или email и пароль.');
    if (!(await rateLimit(req, 'login', 120, 10))) throw fail(429, 'Слишком много попыток входа. Подожди несколько минут.');
    const rows = login.includes('@')
      ? await q(`select * from ayk_users where email = $1`, [login.toLowerCase()])
      : await q(`select * from ayk_users where nick_key = $1`, [nickKey(login.replace(/\s+/g, ' '))]);
    const u = rows[0];
    if (!u) { await hashPassword(pw); throw fail(401, 'Неверный ник, email или пароль.'); }
    if (u.locked_until && new Date(u.locked_until) > new Date()) throw fail(429, 'Слишком много неудачных попыток. Вход временно закрыт на 10 минут.');
    if (!(await checkPassword(pw, u.pass))) {
      await q(`update ayk_users set fails = case when fails + 1 >= 8 then 0 else fails + 1 end,
        locked_until = case when fails + 1 >= 8 then now() + interval '10 minutes' else locked_until end where id = $1`, [u.id]);
      throw fail(401, 'Неверный ник, email или пароль.');
    }
    await q(`update ayk_users set fails = 0, locked_until = null where id = $1`, [u.id]);
    await createSession(res, u.id);
    send(res, 200, { user: pub(u), state: u.state || {} });
  } },

  logout: { method: 'POST', async fn(req, res) {
    await dropSession(req, res);
    send(res, 200, { ok: true });
  } },

  save: { method: 'POST', async fn(req, res, b) {
    const u = await needUser(req);
    const s = cleanState(b.state);
    await q(`update ayk_users set state = $1::jsonb, pp = $2, rank = $3, iq = $4, lessons = $5, updated_at = now() where id = $6`,
      [s.json, s.pp, s.rank, s.iq, s.lessons, u.id]);
    send(res, 200, { ok: true });
  } },

  board: { method: 'GET', async fn(req, res) {
    const me = await currentUser(req);
    const rows = await q(`select id, nick, pp, rank, iq, lessons from ayk_users where pp > 0 or iq > 0 or lessons > 0 order by pp desc, id asc limit 30`);
    send(res, 200, { rows: rows.map(r => ({ nick: r.nick, pp: r.pp, rank: r.rank, iq: r.iq, lessons: r.lessons, me: !!me && String(me.id) === String(r.id) })) });
  } },

  profile: { method: 'POST', async fn(req, res, b) {
    const u = await needUser(req);
    const nick = cleanNick(b.nick), email = cleanEmail(b.email);
    await conflicts(nick, email, u.id);
    const rows = await q(`update ayk_users set nick = $1, nick_key = $2, email = $3, updated_at = now() where id = $4 returning *`, [nick, nickKey(nick), email, u.id]);
    send(res, 200, { user: pub(rows[0]) });
  } },

  password: { method: 'POST', async fn(req, res, b) {
    const u = await needUser(req);
    if (!(await rateLimit(req, 'pw', 10, 10))) throw fail(429, 'Слишком много попыток. Подожди несколько минут.');
    if (!(await checkPassword(String(b.old || ''), u.pass))) throw fail(400, 'Текущий пароль указан неверно.', 'old');
    const pw = cleanPassword(b.next, 'next');
    await q(`update ayk_users set pass = $1, updated_at = now() where id = $2`, [await hashPassword(pw), u.id]);
    await q(`delete from ayk_sessions where user_id = $1`, [u.id]);
    await createSession(res, u.id);
    send(res, 200, { ok: true });
  } },

  delete: { method: 'POST', async fn(req, res, b) {
    const u = await needUser(req);
    if (!(await rateLimit(req, 'pw', 10, 10))) throw fail(429, 'Слишком много попыток. Подожди несколько минут.');
    if (!(await checkPassword(String(b.password || ''), u.pass))) throw fail(400, 'Пароль указан неверно.', 'password');
    await q(`delete from ayk_users where id = $1`, [u.id]);
    await dropSession(req, res);
    send(res, 200, { ok: true });
  } }
};

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const route = ROUTES[String((req.query && req.query.action) || '')];
  if (!route) return send(res, 404, { error: 'Не найдено.' });
  if (req.method !== route.method) return send(res, 405, { error: 'Метод не поддерживается.' });
  // защита от подделки запросов с чужих сайтов: такой заголовок нельзя отправить без CORS
  if (req.method === 'POST' && req.headers['x-ayk'] !== '1') return send(res, 403, { error: 'Запрос отклонён.' });
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  try {
    await route.fn(req, res, body);
  } catch (e) {
    if (e && e.public) return send(res, e.status, { error: e.message, field: e.field });
    console.error(e);
    send(res, e && e.status === 503 ? 503 : 500, { error: e && e.status === 503 ? 'База данных ещё не подключена.' : 'Ошибка сервера. Попробуй ещё раз.' });
  }
}
