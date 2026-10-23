/* Репетитор Аянокоджи — движок сайта: маршруты, два репетитора, уроки, тесты, очки PP и эффекты */
(() => {
  'use strict';

  const SUBJ = window.SUBJECTS || [];
  const LESSONS = window.LESSONS;
  const byId = Object.fromEntries(SUBJ.map(s => [s.id, s]));
  const TOTAL = SUBJ.reduce((a, s) => a + s.lessons.length, 0);
  // школьные предметы и разделы «Иностранные языки» (уровни CEFR) и «Программирование» (Основы и Junior)
  const SCHOOL = SUBJ.filter(s => !s.section);
  const LANGS = SUBJ.filter(s => s.section === 'lang');
  const PROGS = SUBJ.filter(s => s.section === 'prog');
  const sumL = list => list.reduce((a, s) => a + s.lessons.length, 0);
  const SCHOOL_TOTAL = sumL(SCHOOL), LANG_TOTAL = sumL(LANGS), PROG_TOTAL = sumL(PROGS);
  const gradeLabel = (s, g) => (s.section === 'lang' ? `уровень ${g}` : s.section === 'prog' ? g : `${g} класс`);
  const gradeWord = s => (s.section === 'lang' ? 'уровень' : s.section === 'prog' ? '' : 'класс');
  const SECTION_LINK = { lang: '<a href="#lang">Языки</a><span>/</span>', prog: '<a href="#prog">Программирование</a><span>/</span>' };
  const crumbRoot = s => `<a href="#home">Предметы</a><span>/</span>${(s && SECTION_LINK[s.section]) || ''}`;
  const root = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
  const reduce = () => mqReduce.matches;
  const fine = () => matchMedia('(pointer: fine)').matches;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const pad2 = n => String(n).padStart(2, '0');
  const fmtNum = n => n.toLocaleString('ru-RU');
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const plural = (n, one, few, many) => {
    const a = n % 10, b = n % 100;
    return a === 1 && b !== 11 ? one : a >= 2 && a <= 4 && (b < 10 || b >= 20) ? few : many;
  };
  const shuffle = arr => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };
  const LETTERS = 'АБВГДЕЖ';

  /* ---------- хранилище и состояние ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem('ayk:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('ayk:' + k, JSON.stringify(v)); } catch (e) { /* хранилище недоступно — работаем без него */ } }
  };
  const blank = () => ({ done: {}, quiz: {}, exam: {}, pp: 0, last: null, name: '', nick: '', tutor: 'duo', iq: {} });
  let st = Object.assign(blank(), store.get('state', {}));
  if (!['a', 'i', 'duo'].includes(st.tutor)) st.tutor = 'duo';
  const save = () => { store.set('state', st); cloudLater(); };
  const doneIn = sid => byId[sid].lessons.reduce((a, _, i) => a + (st.done[sid + '-' + (i + 1)] ? 1 : 0), 0);

  /* ---------- репетиторы ---------- */
  const T = {
    a: { name: 'Аянокоджи Киётака', short: 'Аянокоджи', face: 'img/ayanokoji-face.webp', bust: 'img/ayanokoji-bust.webp' },
    i: { name: 'Амасава Ичика', short: 'Амасава', face: 'img/amasawa-face.webp', bust: 'img/amasawa-bust.webp' }
  };
  const MODES = {
    a: { label: 'Аянокоджи', note: 'Объясняет Аянокоджи: спокойно, строго по делу, с разбором ошибок и стратегией решения.' },
    duo: { label: 'Вместе', note: 'Объясняют вдвоём: Аянокоджи даёт систему, Амасава — примеры из жизни и способы запомнить. В уроках видны заметки обоих.' },
    i: { label: 'Амасава', note: 'Объясняет Амасава: живо, с примерами из жизни, подсказками для запоминания и подколками. Скучно не будет.' }
  };
  const ORDER = ['a', 'duo', 'i'];
  // кто говорит в текущем режиме; если у реплики нет текста для выбранного репетитора — говорит второй
  const speakers = src => {
    const want = st.tutor === 'duo' ? ['a', 'i'] : [st.tutor];
    const have = want.filter(w => src && src[w]);
    return have.length ? have : ['a', 'i'].filter(w => src && src[w]);
  };
  const facesHTML = m => `<span class="tfaces" aria-hidden="true">${(m === 'duo' ? ['a', 'i'] : [m]).map(w => `<img class="${w}" src="${T[w].face}" alt="" width="28" height="28">`).join('')}</span>`;
  const tmodeHTML = () => `<div class="tmode" role="radiogroup" aria-label="Кто объясняет">${ORDER.map(m => `<button type="button" role="radio" aria-checked="${st.tutor === m}" data-act="tutor" data-t="${m}">${facesHTML(m)}<span class="tn">${MODES[m].label}</span></button>`).join('')}</div>`;
  const sayHTML = src => speakers(src).map(w => `<p class="say ${w}"><img src="${T[w].face}" alt="${T[w].short}" width="30" height="30"><span>${src[w]}</span>${CAN_SAY ? `<button type="button" class="say-btn" data-act="saysay" aria-label="Послушать: говорит ${T[w].short}">${SPK}</button>` : ''}</p>`).join('');

  const RANKS = [
    { r: 'D', min: 0, title: 'Класс D', note: 'Отправная точка. Здесь начинают все — даже те, кто делает вид, что нет.' },
    { r: 'C', min: 1500, title: 'Класс C', note: 'Ты начал видеть систему. Теперь главное — регулярность.' },
    { r: 'B', min: 6000, title: 'Класс B', note: 'Уже не новичок. Самое опасное здесь — решить, что ты всё знаешь.' },
    { r: 'A', min: 15000, title: 'Класс A', note: 'Класс A. Удержать его сложнее, чем получить.' }
  ];
  const rankOf = pp => RANKS.reduce((cur, r) => (pp >= r.min ? r : cur), RANKS[0]);

  const QUOTES = [
    'Любая задача — это позиция на доске. Остаётся найти лучший ход.',
    'Я не объясняю лишнего. Только то, что действительно работает.',
    'Талант переоценивают. Систему и повторение — нет.',
    'Неважно, в каком классе ты начинаешь. Важно, в каком закончишь.',
    'Ошибка — это информация. Плохо только повторять её дважды.',
    'Сначала пойми правило. Потом найди исключение. Потом используй оба.',
    'Тридцать минут сосредоточенности стоят трёх часов суеты.'
  ];
  const QUOTES_I = [
    'Учиться вместе веселее — проверено ♡',
    'Мнемоника — это не жульничество, сэмпай. Это тактика.',
    'Ошибся? Отлично. Теперь ты знаешь, где ловушка.',
    'Сначала понять, потом запомнить. Наоборот не работает.'
  ];
  const BUBBLE = [
    'Сэмпа-ай! Объяснять буду я. Ну, и он тоже ♡',
    'Аянокоджи-сэмпай объясняет как учебник. Я — как человек.',
    'Ошибёшься один раз — не страшно. Дважды — я обижусь ♡',
    'Выбери, кто объясняет. Подсказка: выбери меня.',
    'Тридцать минут, сэмпай. Потом можно отдыхать. Честно-честно.'
  ];
  const MOVES = [
    ['1. e4', 'Постановка задачи', 'Репетитор объясняет, зачем нужна тема и где она встретится. Ты сразу видишь цель урока.'],
    ['1… e5', 'Теория', 'Определения, правила и формулы — по порядку, с объяснением, откуда что берётся.'],
    ['2. Кf3', 'Разбор примеров', 'Решения по шагам. Каждый шаг обоснован, ничего не «очевидно».'],
    ['2… Кc6', 'Ловушки', 'Типичные ошибки, на которых теряют баллы. Лучше увидеть их здесь, чем на экзамене.'],
    ['3. Сb5', 'Практика', 'Задачи с полными решениями. Сначала решаешь сам, потом сверяешься.'],
    ['3… a6', 'Тест и конспект', 'Короткий тест с объяснениями и сжатый конспект для повторения.']
  ];
  const OPENING = [['e2', 'e4'], ['e7', 'e5'], ['g1', 'f3'], ['b8', 'c6'], ['f1', 'b5'], ['a7', 'a6']];
  const CARDS = {
    a: {
      kanji: '綾小路 清隆', cls: '1-D', role: 'Анализ и стратегия', style: 'Коротко и по делу',
      say: 'Я объясняю коротко. Если что-то непонятно — значит, я пропустил шаг, а не ты чего-то не можешь.',
      hint: ['наведи — увидишь настоящий', 'ты этого не видел'],
      oaa: [['Академические способности', 'C', 51, 'A+', 98], ['Физические способности', 'C', 54, 'A+', 96], ['Адаптивность', 'C', 50, 'A', 93], ['Вклад в общество', 'D+', 41, 'A', 90]]
    },
    i: {
      kanji: '天沢 一夏', cls: '1-A', role: 'Примеры и запоминание', style: 'Живо, с подколками',
      say: 'Сэмпай, со мной учиться весело. А если будешь лениться — я всё равно буду рядом ♡',
      hint: ['наведи — я тоже кое-что прячу', 'только сэмпаю не говори'],
      oaa: [['Академические способности', 'B+', 78, 'A+', 97], ['Физические способности', 'A−', 84, 'A+', 95], ['Адаптивность', 'B', 70, 'A', 92], ['Вклад в общество', 'C', 55, 'B+', 76]]
    }
  };

  /* ---------- HUD, тосты, искры ---------- */
  function hud() {
    const r = rankOf(st.pp), rk = $('#rk'), pv = $('#ppv');
    if (rk) { rk.textContent = r.r; rk.dataset.r = r.r; }
    if (pv) pv.textContent = fmtNum(st.pp);
  }
  function tutorHud() {
    root.dataset.tutor = st.tutor;
    const f = $('#tfaces'), l = $('#tlabel');
    if (f) f.outerHTML = facesHTML(st.tutor).replace('class="tfaces"', 'class="tfaces" id="tfaces"');
    if (l) l.textContent = MODES[st.tutor].label;
  }
  function toast(title, text, big, who) {
    const box = $('#toasts'); if (!box) return;
    const t = document.createElement('div');
    t.className = 'toast' + (big ? ' big' : '');
    if (!who) t.style.gridTemplateColumns = 'minmax(0,1fr)';
    t.innerHTML = `${who ? `<img src="${T[who].face}" alt="" width="38" height="38">` : ''}<b>${esc(title)}</b>${text ? `<span>${esc(text)}</span>` : ''}`;
    box.appendChild(t);
    setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 380); }, big ? 4600 : 2600);
    // важные сообщения (новый класс, конец урока) репетитор произносит сам
    if (big && who && canAuto()) sayLine(who, text ? `${title}. ${text}` : title);
  }
  const anyTutor = () => (st.tutor === 'duo' ? pick(['a', 'i']) : st.tutor);
  function addPP(n, why) {
    if (n <= 0) return;
    const before = rankOf(st.pp).r;
    st.pp += n; save(); hud();
    toast(`+${n} PP`, why, false, anyTutor());
    const after = rankOf(st.pp);
    if (after.r !== before) setTimeout(() => toast(`Повышение: ${after.title}`, after.note, true, 'a'), 700);
    const chip = $('.pp');
    if (chip && !reduce()) { chip.classList.remove('bump'); void chip.offsetWidth; chip.classList.add('bump'); }
  }
  function burst(el, hearts) {
    if (reduce() || !el) return;
    const r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const G = hearts ? ['♡', '♥', '✦', '♡'] : ['♞', '♜', '♝', '♛', '♚', '♟'];
    const n = hearts ? 12 : 20;
    for (let i = 0; i < n; i++) {
      const s = document.createElement('span');
      s.className = 'spark' + (hearts || i % 3 === 0 ? ' i' : '');
      s.textContent = G[i % G.length] + (hearts ? '' : '︎');
      s.style.left = cx + 'px'; s.style.top = cy + 'px';
      document.body.appendChild(s);
      const a = Math.random() * Math.PI * 2, d = (hearts ? 50 : 90) + Math.random() * (hearts ? 80 : 150);
      const anim = s.animate([
        { transform: 'translate(-50%,-50%) scale(.3)', opacity: 1 },
        { transform: `translate(calc(-50% + ${(Math.cos(a) * d).toFixed(1)}px), calc(-50% + ${(Math.sin(a) * d - 50).toFixed(1)}px)) scale(1.1) rotate(${Math.round((Math.random() - .5) * 400)}deg)`, opacity: 0 }
      ], { duration: 900 + Math.random() * 600, easing: 'cubic-bezier(.2,.7,.3,1)' });
      anim.onfinish = () => s.remove();
    }
  }

  /* ---------- аккаунт и облачное сохранение ----------
     Вход — через аккаунт Claude, в котором открыта страница; прогресс лежит в личном разделе data/users/<id>/,
     а строка в общем рейтинге board/<id> — у каждого своя, писать в чужую нельзя. */
  const standalone = () => !(window.claude && window.claude.use);
  const useCap = n => (standalone() ? Promise.resolve(null) : window.claude.use(n).catch(() => null));
  // mode: 'claude' — вход через Claude; 'server' — свой сервер с логином и паролем (Vercel); 'local' — без сервера (GitHub Pages)
  const cloud = { mode: null, acc: null, state: 'loading', uid: null, me: null, db: null, user: null, ref: null, writable: true, board: true, timer: 0, pending: false, syncedAt: 0, busy: false, dirty: false };
  const MAIN_SITE = 'https://ayanokoji-tutor.vercel.app/';
  const maxMap = (a = {}, b = {}) => { const o = Object.assign({}, b); for (const k in a) o[k] = Math.max(a[k] ?? -1, b[k] ?? -1); return o; };
  function mergeState(a, b) {
    const o = Object.assign(blank(), b, a);
    o.done = Object.assign({}, b.done, a.done);
    o.quiz = Object.assign({}, b.quiz, a.quiz);
    o.exam = maxMap(a.exam, b.exam);
    o.pp = Math.max(a.pp || 0, b.pp || 0);
    o.nick = a.nick || b.nick || '';
    o.name = a.name || b.name || '';
    const ia = a.iq || {}, ib = b.iq || {};
    const lv = {};
    for (let l = 1; l <= 5; l++) { const x = (ia.lv || {})[l] || {}, y = (ib.lv || {})[l] || {}; lv[l] = { n: Math.max(x.n || 0, y.n || 0), ok: Math.max(x.ok || 0, y.ok || 0), streak: x.streak || 0, top: Math.max(x.top || 0, y.top || 0) }; }
    const kinds = {};
    for (const k of new Set([...Object.keys(ia.kinds || {}), ...Object.keys(ib.kinds || {})])) { const x = (ia.kinds || {})[k] || {}, y = (ib.kinds || {})[k] || {}; kinds[k] = (x.n || 0) >= (y.n || 0) ? x : y; }
    o.iq = { lv, kinds, best: Math.max(ia.best || 0, ib.best || 0) || null, tests: (ia.tests || []).length >= (ib.tests || []).length ? (ia.tests || []) : (ib.tests || []), seen: [...new Set([...(ib.seen || []), ...(ia.seen || [])])].slice(-1500) };
    return o;
  }
  async function cloudInit() {
    if (standalone()) return serverInit();
    cloud.mode = 'claude';
    const [user, db] = await Promise.all([useCap('user'), useCap('db')]);
    cloud.user = user; cloud.db = db;
    const uid = user ? await user.id() : null;
    cloud.me = user ? await user.me() : null;
    if (!uid || !db) { cloud.state = 'guest'; acctHud(); return; }
    cloud.uid = uid;
    cloud.ref = db.doc(`data/users/${uid}/profile`);
    try {
      const snap = await cloud.ref.get();
      if (snap.exists) { const data = snap.data() || {}; st = mergeState(st, data.state || {}); store.set('state', st); hud(); tutorHud(); }
      cloud.state = 'on';
      acctHud();
      await pushCloud();
      if (!st.nick && cloud.writable) setTimeout(() => openAcct(true), 1400);
      softRefresh();
    } catch (e) { cloud.state = 'error'; acctHud(); }
  }
  function cloudLater() {
    if (cloud.state !== 'on' || !cloud.writable) return;
    clearTimeout(cloud.timer); cloud.pending = true; cloud.timer = setTimeout(pushCloud, 1500);
  }

  /* ---------- вход по логину и паролю (сервер на Vercel) ---------- */
  async function api(path, body) {
    const opt = body === undefined
      ? { credentials: 'same-origin', headers: { Accept: 'application/json' } }
      : { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-AYK': '1' }, body: JSON.stringify(body) };
    const r = await fetch('api/' + path, opt);
    let data = null;
    try { data = await r.json(); } catch (e) { /* не JSON — сервера нет */ }
    return { ok: r.ok && !!data, status: r.status, data: data || {} };
  }
  async function serverInit() {
    let r = null;
    try { r = await api('me'); } catch (e) { /* сеть недоступна */ }
    if (r && r.ok && r.data.user) { cloud.mode = 'server'; await signedIn(r.data); }
    else if (r && r.ok && r.data.user === null) { cloud.mode = 'server'; cloud.state = 'guest'; acctHud(); }
    else { cloud.mode = 'local'; cloud.state = 'guest'; acctHud(); }
    softRefresh();
  }
  // после входа: прогресс из браузера и из аккаунта объединяются (берётся лучшее)
  async function signedIn(data) {
    cloud.acc = data.user; cloud.state = 'on';
    st = mergeState(st, data.state || {});
    st.nick = data.user.nick;
    store.set('state', st); hud(); tutorHud(); acctHud();
    await pushServer();
  }
  function signedOut() {
    cloud.acc = null; cloud.state = 'guest'; cloud.pending = false; clearTimeout(cloud.timer);
    st = Object.assign(blank(), { tutor: st.tutor });
    store.set('state', st); hud(); tutorHud(); acctHud();
    cur = { v: '' }; route();
  }
  async function pushServer() {
    if (cloud.mode !== 'server' || cloud.state !== 'on') return;
    if (cloud.busy) { cloud.dirty = true; return; }
    cloud.busy = true; cloud.pending = false;
    try {
      const r = await api('save', { state: st });
      if (r.ok) cloud.syncedAt = Date.now();
      else if (r.status === 401) { cloud.acc = null; cloud.state = 'guest'; toast('Сессия закончилась', 'Войди снова, чтобы прогресс сохранялся в аккаунте.', false, anyTutor()); }
    } catch (e) { cloud.pending = true; /* нет связи — сохраним при следующем изменении */ }
    cloud.busy = false;
    acctHud();
    if (cloud.dirty) { cloud.dirty = false; cloudLater(); }
  }
  // при закрытии вкладки досылаем несохранённое
  addEventListener('pagehide', () => {
    if (cloud.mode !== 'server' || cloud.state !== 'on' || !cloud.pending) return;
    const body = JSON.stringify({ state: st });
    if (body.length > 60000) return;
    try { fetch('api/save', { method: 'POST', keepalive: true, credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'X-AYK': '1' }, body }); } catch (e) { /* ignore */ }
  });
  const srvAuthHTML = tab => `<p class="eyebrow">Аккаунт ученика</p>
<div class="tmode acct-tabs" role="tablist"><button type="button" role="tab" data-act="accttab" data-tab="login" aria-checked="${tab === 'login'}">Вход</button><button type="button" role="tab" data-act="accttab" data-tab="reg" aria-checked="${tab === 'reg'}">Регистрация</button></div>
${tab === 'login' ? `<form class="acct-form" data-form="login" novalidate>
<label class="stu-name" for="fLogin">Ник или email</label>
<input id="fLogin" class="stu-inp" name="login" autocomplete="username" maxlength="120" required>
<label class="stu-name" for="fPass">Пароль</label>
<input id="fPass" class="stu-inp" type="password" name="password" autocomplete="current-password" maxlength="128" required>
<p class="acct-err" role="alert" hidden></p>
<div class="cta"><button type="submit" class="btn btn-red">Войти</button><button type="button" class="btn" data-act="acctclose">Закрыть</button></div>
<p class="acct-note">Нет аккаунта? <button type="button" class="linkbtn" data-act="accttab" data-tab="reg">Зарегистрируйся</button> — прогресс из этого браузера перейдёт в аккаунт.</p>
</form>` : `<form class="acct-form" data-form="reg" novalidate>
<label class="stu-name" for="fNick">Ник в рейтинге</label>
<input id="fNick" class="stu-inp" name="nick" autocomplete="nickname" maxlength="24" placeholder="Например, Кей-сан" required>
<label class="stu-name" for="fMail">Email — по желанию</label>
<input id="fMail" class="stu-inp" type="email" name="email" autocomplete="email" maxlength="120" placeholder="Можно войти и по нику">
<label class="stu-name" for="fPass">Пароль — не короче 8 символов</label>
<input id="fPass" class="stu-inp" type="password" name="password" autocomplete="new-password" maxlength="128" required>
<label class="stu-name" for="fPass2">Повтори пароль</label>
<input id="fPass2" class="stu-inp" type="password" name="password2" autocomplete="new-password" maxlength="128" required>
<p class="acct-err" role="alert" hidden></p>
<div class="cta"><button type="submit" class="btn btn-red">Зарегистрироваться</button><button type="button" class="btn" data-act="acctclose">Закрыть</button></div>
<p class="acct-note">Очки, уроки, экзамены и результаты IQ из этого браузера сохранятся в новый аккаунт. Сайт хранит только ник, email (если указан) и прогресс; пароль — в виде необратимого хэша. Восстановить забытый пароль пока нельзя — запомни его.</p>
</form>`}`;
  const srvProfileHTML = () => {
    const when = cloud.syncedAt ? new Date(cloud.syncedAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) : '';
    return `<p class="eyebrow">Профиль ученика</p>
<div class="acct-me"><span class="lb-ini big" id="acctIni"></span><div><b id="acctName"></b><span>Прогресс сохраняется в аккаунте${when ? ` · синхронизация ${when}` : ''}</span></div></div>
<form class="acct-form" data-form="profile" novalidate>
<label class="stu-name" for="fNick">Ник в рейтинге</label>
<input id="fNick" class="stu-inp" name="nick" maxlength="24" value="${esc(cloud.acc.nick)}" required>
<label class="stu-name" for="fMail">Email — по желанию</label>
<input id="fMail" class="stu-inp" type="email" name="email" maxlength="120" value="${esc(cloud.acc.email || '')}">
<p class="acct-err" role="alert" hidden></p>
<div class="cta"><button type="submit" class="btn btn-red">Сохранить</button><button type="button" class="btn" data-act="srvlogout">Выйти</button><button type="button" class="btn" data-act="acctclose">Закрыть</button></div>
</form>
<details class="acct-more"><summary>Сменить пароль</summary><form class="acct-form" data-form="password" novalidate>
<label class="stu-name" for="fOld">Текущий пароль</label>
<input id="fOld" class="stu-inp" type="password" name="old" autocomplete="current-password" maxlength="128" required>
<label class="stu-name" for="fNext">Новый пароль — не короче 8 символов</label>
<input id="fNext" class="stu-inp" type="password" name="next" autocomplete="new-password" maxlength="128" required>
<p class="acct-err" role="alert" hidden></p>
<div class="cta"><button type="submit" class="btn">Сменить пароль</button></div>
</form></details>
<details class="acct-more"><summary>Удалить аккаунт</summary><form class="acct-form" data-form="delete" novalidate>
<p class="acct-note">Аккаунт и весь сохранённый в нём прогресс будут удалены без возможности восстановления.</p>
<label class="stu-name" for="fDel">Пароль для подтверждения</label>
<input id="fDel" class="stu-inp" type="password" name="password" autocomplete="current-password" maxlength="128" required>
<p class="acct-err" role="alert" hidden></p>
<div class="cta"><button type="submit" class="btn btn-red">Удалить навсегда</button></div>
</form></details>`;
  };
  async function acctSubmit(f) {
    const kind = f.dataset.form, val = n => (f.elements[n] ? f.elements[n].value : '');
    const err = $('.acct-err', f), btn = $('[type="submit"]', f);
    const showErr = (m, field) => { err.textContent = m; err.hidden = false; const el = field && f.elements[field]; if (el) el.focus(); };
    err.hidden = true;
    if (kind === 'reg' && val('password') !== val('password2')) return showErr('Пароли не совпадают.', 'password2');
    if (kind === 'profile' || kind === 'password' || kind === 'delete') await pushServer();
    btn.disabled = true;
    let r;
    try {
      if (kind === 'login') r = await api('login', { login: val('login'), password: val('password') });
      else if (kind === 'reg') r = await api('register', { nick: val('nick'), email: val('email'), password: val('password'), state: st });
      else if (kind === 'profile') r = await api('profile', { nick: val('nick'), email: val('email') });
      else if (kind === 'password') r = await api('password', { old: val('old'), next: val('next') });
      else if (kind === 'delete') r = await api('delete', { password: val('password') });
    } catch (e) { r = { ok: false, status: 0, data: { error: 'Нет связи с сервером. Проверь интернет и попробуй ещё раз.' } }; }
    btn.disabled = false;
    if (!r.ok) {
      if (r.status === 401 && kind !== 'login') { cloud.acc = null; cloud.state = 'guest'; acctHud(); }
      return showErr(r.data.error || 'Не получилось. Попробуй ещё раз.', r.data.field);
    }
    if (kind === 'login' || kind === 'reg') {
      await signedIn(r.data);
      closeAcct();
      toast(kind === 'reg' ? 'Аккаунт создан' : 'С возвращением', kind === 'reg' ? `Ты в рейтинге как «${cloud.acc.nick}». Прогресс теперь сохраняется в аккаунте.` : `Прогресс аккаунта «${cloud.acc.nick}» загружен.`, false, anyTutor());
      softRefresh();
    } else if (kind === 'profile') {
      cloud.acc = r.data.user; st.nick = cloud.acc.nick; store.set('state', st); acctHud(); closeAcct();
      toast('Профиль сохранён', `Теперь ты в рейтинге как «${cloud.acc.nick}».`, false, anyTutor());
      softRefresh();
    } else if (kind === 'password') {
      closeAcct();
      toast('Пароль изменён', 'На других устройствах нужно будет войти заново.', false, anyTutor());
    } else if (kind === 'delete') {
      closeAcct(); signedOut();
      toast('Аккаунт удалён', 'Все данные аккаунта стёрты.', false, anyTutor());
    }
  }

  async function pushCloud() {
    if (cloud.mode === 'server') return pushServer();
    cloud.pending = false;
    if (!cloud.ref || !cloud.writable) return;
    if (cloud.busy) { cloud.dirty = true; return; }
    cloud.busy = true;
    try { await cloud.ref.set({ state: JSON.parse(JSON.stringify(st)), v: 1 }); cloud.syncedAt = Date.now(); }
    catch (e) {
      if (e && (e.code === 'invalid_argument' || e.code === 'not_granted' || e.code === 'revoked')) { cloud.writable = false; cloud.state = 'readonly'; }
    }
    cloud.busy = false;
    acctHud();
    await pushBoard();
    if (cloud.dirty) { cloud.dirty = false; cloudLater(); }
  }
  let lastBoard = '';
  async function pushBoard() {
    if (!cloud.db || !cloud.uid || !cloud.board || !cloud.writable) return;
    const row = { pp: st.pp, rank: rankOf(st.pp).r, iq: (st.iq && st.iq.best) || 0, lessons: Object.keys(st.done).length, nick: String(st.nick || '').slice(0, 24) };
    const key = JSON.stringify(row);
    if (key === lastBoard) return;
    try { await cloud.db.doc('board/' + cloud.uid).set(row); lastBoard = key; } catch (e) { cloud.board = false; }
  }
  function acctHud() {
    const b = $('#acctBtn'); if (!b) return;
    const img = $('#acctAva'), t = $('#acctTxt');
    if (cloud.mode === 'server' && cloud.state === 'on') {
      img.hidden = true; t.textContent = cloud.acc.nick; b.classList.remove('ro');
      b.title = cloud.pending ? 'Сохраняю прогресс…' : 'Прогресс сохранён в аккаунте';
    } else if (cloud.state === 'on' || cloud.state === 'readonly') {
      img.src = cloud.me ? cloud.me.avatarUrl : ''; img.hidden = !cloud.me;
      t.textContent = st.nick || (cloud.me && cloud.me.name) || 'Профиль';
      b.classList.toggle('ro', cloud.state === 'readonly');
      b.title = cloud.state === 'on' ? 'Прогресс синхронизирован' : 'Только чтение: прогресс хранится в этом браузере';
    } else if (cloud.mode === 'local') { img.hidden = true; t.textContent = 'Гость'; b.title = 'Прогресс хранится в этом браузере'; }
    else { img.hidden = true; t.textContent = cloud.state === 'loading' ? '…' : 'Войти'; b.title = 'Вход и регистрация'; }
  }
  function openAcct(first, tab) {
    const dlg = $('#acct'), box = $('#acctBox'); if (!dlg || !box) return;
    if (cloud.mode === 'server') {
      box.innerHTML = cloud.state === 'on' ? srvProfileHTML() : srvAuthHTML(tab || 'login');
      if (cloud.state === 'on') { $('#acctName').textContent = cloud.acc.nick; $('#acctIni').textContent = cloud.acc.nick.slice(0, 1).toUpperCase(); }
      dlg.hidden = false;
      const inp = $('.acct-form .stu-inp', box); if (inp && cloud.state !== 'on') inp.focus();
      return;
    }
    const when = cloud.syncedAt ? new Date(cloud.syncedAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) : '';
    if (cloud.state === 'on' || cloud.state === 'readonly') {
      box.innerHTML = `<p class="eyebrow">${first ? 'Регистрация ученика' : 'Профиль ученика'}</p>
<div class="acct-me"><img src="${esc(cloud.me ? cloud.me.avatarUrl : '')}" alt="" width="56" height="56"><div><b id="acctName"></b><span>Вход через аккаунт Claude</span></div></div>
<label class="stu-name" for="nickIn">Ник в рейтинге OAA</label>
<input id="nickIn" class="stu-inp" maxlength="24" placeholder="Например, Кей-сан" autocomplete="off" value="${esc(st.nick || '')}">
<p class="acct-note">${cloud.state === 'on' ? `Очки, пройденные уроки, экзамены и результаты IQ сохраняются в облаке и доступны на любом устройстве, где ты вошёл в этот аккаунт.${when ? ` Последняя синхронизация: ${when}.` : ''}` : 'У тебя доступ только на просмотр, поэтому прогресс хранится в этом браузере. Чтобы он сохранялся в облаке, владелец сайта должен выдать тебе права «Участник» (Contributor).'}</p>
<div class="cta"><button type="button" class="btn btn-red" data-act="acctsave">${first ? 'Зарегистрироваться' : 'Сохранить'}</button><button type="button" class="btn" data-act="acctclose">Закрыть</button></div>`;
      $('#acctName').textContent = (cloud.me && cloud.me.name) || 'Ученик';
    } else if (cloud.mode === 'local') {
      // копия сайта без сервера (например, GitHub Pages): входа здесь нет
      box.innerHTML = `<p class="eyebrow">Вход и регистрация</p><h2 class="h2s">Вход — на основном сайте</h2>
<p class="acct-note">Эта копия сайта работает без аккаунта: очки PP, пройденные уроки, экзамены и результаты IQ сохраняются в этом браузере. Если очистить данные сайта, прогресс пропадёт.</p>
<p class="acct-note">Регистрация, вход, сохранение прогресса в облаке и общий рейтинг OAA работают на основном сайте: <a href="${MAIN_SITE}">ayanokoji-tutor.vercel.app</a>.</p>
<div class="cta"><a class="btn btn-red" href="${MAIN_SITE}">Открыть основной сайт</a><button type="button" class="btn" data-act="acctclose">Закрыть</button></div>`;
    } else {
      box.innerHTML = `<p class="eyebrow">Вход и регистрация</p><h2 class="h2s">Вход через аккаунт Claude</h2>
<p class="acct-note">Отдельный логин и пароль не нужны: сайт узнаёт тебя по аккаунту Claude, в котором он открыт. ${cloud.state === 'loading' ? 'Сейчас проверяю аккаунт — подожди пару секунд.' : 'Сейчас аккаунт не определён: страница открыта без входа или вне Claude. Прогресс сохраняется только в этом браузере.'}</p>
<p class="acct-note">Чтобы войти: открой эту страницу по ссылке, будучи в своём аккаунте на claude.ai. При первом входе тебя попросят выбрать ник для рейтинга — это и есть регистрация.</p>
<div class="cta"><button type="button" class="btn" data-act="acctclose">Понятно</button></div>`;
    }
    dlg.hidden = false;
    const inp = $('#nickIn'); if (inp) inp.focus();
  }
  function closeAcct() { const d = $('#acct'); if (d) d.hidden = true; }
  function softRefresh() {
    if (!cur.v || cur.v === 'lesson' || cur.v === 'exam' || cur.v === 'iqtrain' || cur.v === 'iqtest') return;
    const y = window.scrollY;
    cleanups.forEach(f => { try { f(); } catch (e) { /* ignore */ } });
    cleanups = []; VN.length = 0;
    Promise.resolve(VIEWS[cur.v](cur)).then(html => { viewEl.innerHTML = html; try { (MOUNT[cur.v] || (() => {}))(cur); } catch (e) { console.error(e); } window.scrollTo({ top: y, behavior: 'instant' }); });
  }

  /* ---------- загрузка уроков ---------- */
  const pending = {};
  function loadLesson(sid, n) {
    const have = LESSONS[sid] && LESSONS[sid][n];
    if (have) return Promise.resolve(have);
    const key = sid + '-' + n;
    if (!pending[key]) {
      pending[key] = new Promise(res => {
        const s = document.createElement('script');
        s.src = `data/${sid}/${pad2(n)}.js`;
        s.onload = () => res((LESSONS[sid] && LESSONS[sid][n]) || null);
        s.onerror = () => { s.remove(); delete pending[key]; res(null); };
        document.head.appendChild(s);
      });
    }
    return pending[key];
  }
  const loadAll = sid => Promise.all(byId[sid].lessons.map((_, i) => loadLesson(sid, i + 1)));

  /* ---------- разметка формул: [[a|b]] — дробь, √[x] — корень, ^2 ^(..) _1 _(..) — индексы ---------- */
  /* ---------- блоки кода: подсветка синтаксиса ---------- */
  // <pre class="code" data-lang="c">…</pre> в уроке пишется как есть, без HTML-экранирования
  const escH = x => x.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const CODE_LABEL = { c: 'C', cpp: 'C++', rust: 'Rust', py: 'Python', sh: 'Терминал', asm: 'NASM · x86-64', txt: 'Вывод', make: 'Makefile', cmake: 'CMake', toml: 'TOML' };
  const C_KW = 'auto break case char const continue default do double else enum extern float for goto if inline int long return short signed sizeof static struct switch typedef union unsigned void volatile while bool true false NULL size_t ssize_t pid_t off_t uint8_t uint16_t uint32_t uint64_t int8_t int16_t int32_t int64_t FILE';
  const NUM = String.raw`\b(?:0x[0-9a-fA-F]+|0b[01]+|\d+(?:\.\d+)?)\b`;
  const HL_SRC = {
    c: { c: String.raw`\/\/[^\n]*|\/\*[\s\S]*?\*\/`, p: String.raw`^[ \t]*#[^\n]*`, s: String.raw`"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])+'`, k: C_KW },
    rust: { c: String.raw`\/\/[^\n]*|\/\*[\s\S]*?\*\/`, p: String.raw`#!?\[[^\]\n]*\]|\b[a-z_]\w*!`, s: String.raw`"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\\n])'`, k: 'as break const continue crate dyn else enum extern false fn for if impl in let loop match mod move mut pub ref return self Self static struct super trait true type unsafe use where while i8 i16 i32 i64 i128 isize u8 u16 u32 u64 u128 usize f32 f64 bool char str String Vec Option Some None Result Ok Err Box Rc Arc HashMap' },
    py: { c: '#[^\\n]*', p: String.raw`^[ \t]*@[\w.]+`, s: String.raw`[fbr]?"{3}[\s\S]*?"{3}|[fbr]?'{3}[\s\S]*?'{3}|[fbr]?"(?:\\.|[^"\\\n])*"|[fbr]?'(?:\\.|[^'\\\n])*'`, k: 'and as assert async await break class continue def del elif else except False finally for from global if import in is lambda None nonlocal not or pass raise return True try while with yield self' },
    sh: { c: String.raw`(?:^|[ \t])#[^\n]*`, p: String.raw`\$\w+|\$[?#@*]|^\$ `, s: String.raw`"(?:\\.|[^"\\])*"|'[^']*'`, k: 'if then else elif fi for in do done while until case esac function return export local' },
    asm: { c: ';[^\\n]*', p: String.raw`^[ \t]*[.\w]+:|\b(?:section|global|extern|db|dw|dd|dq|resb|resw|resd|resq|equ|default)\b`, s: String.raw`"[^"\n]*"|'[^'\n]*'`, k: 'mov movzx movsx movsxd lea add sub inc dec mul imul div idiv neg cmp test jmp je jne jz jnz jg jge jl jle ja jae jb jbe js jns call ret push pop syscall and or xor not shl shr sar rol ror nop leave cqo cdq rep movsb stosb lodsb loop rax rbx rcx rdx rsi rdi rbp rsp rip r8 r9 r10 r11 r12 r13 r14 r15 eax ebx ecx edx esi edi ebp esp r8d r9d ax bx cx dx al bl cl dl ah byte word dword qword rel' },
    make: { c: '#[^\\n]*', p: String.raw`^[\w.%/-]+:|\$[@<^]|\$\([\w]+\)`, s: String.raw`"[^"\n]*"`, k: '.PHONY' },
    cmake: { c: '#[^\\n]*', p: String.raw`\b[a-z_]+(?=\()`, s: String.raw`"(?:\\.|[^"\\])*"`, k: 'PUBLIC PRIVATE INTERFACE VERSION LANGUAGES CXX REQUIRED STATIC SHARED COMMAND NAME ON OFF' },
    toml: { c: '#[^\\n]*', p: String.raw`^[ \t]*\[[^\]\n]*\]`, s: String.raw`"(?:\\.|[^"\\\n])*"`, k: 'true false' }
  };
  HL_SRC.cpp = Object.assign({}, HL_SRC.c, { k: C_KW + ' class namespace template typename public private protected virtual override new delete this using try catch throw nullptr constexpr noexcept operator friend explicit mutable final std string vector map unordered_map set array pair unique_ptr shared_ptr weak_ptr make_unique make_shared move cout cin cerr endl' });
  const HL = {};
  Object.keys(HL_SRC).forEach(k => {
    const d = HL_SRC[k], kw = `(?<![\\w.])(?:${d.k.trim().split(/\s+/).map(w => w.replace(/[.]/g, '\\.')).join('|')})\\b`;
    HL[k] = new RegExp(`(${d.c})|(${d.p})|(${d.s})|(${kw})|(${NUM})`, 'gm');
  });
  function hlCode(code, lang) {
    const re = HL[lang];
    if (!re) return escH(code);
    let out = '', at = 0;
    for (const m of code.matchAll(re)) {
      if (!m[0]) continue;
      const cls = m[1] != null ? 'c' : m[2] != null ? 'p' : m[3] != null ? 's' : m[4] != null ? 'k' : 'n';
      out += escH(code.slice(at, m.index)) + `<span class="t-${cls}">${escH(m[0])}</span>`;
      at = m.index + m[0].length;
    }
    return out + escH(code.slice(at));
  }
  const codeBlocks = html => html.replace(/<pre class="code"(?: data-lang="([\w+-]+)")?>\n?([\s\S]*?)<\/pre>/g, (m, lang, body) =>
    `<pre class="code"${lang ? ` data-lang="${lang}" data-label="${CODE_LABEL[lang] || lang}"` : ''}><code>${hlCode(body.replace(/\s+$/, ''), lang)}</code></pre>`);

  function fmt(html) {
    if (!html) return '';
    return codeBlocks(String(html)).split(/(<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>)/).map((part, i) => {
      if (i % 2) return part;
      // корни и дроби могут быть вложены друг в друга — раскрываем изнутри наружу
      for (let k = 0; k < 4; k++) {
        const before = part;
        part = part
          .replace(/([√∛∜])\[([^\[\]]+)\]/g, '<span class="rt">$1<span class="sq">$2</span></span>')
          .replace(/\[\[([^\[\]|]+?)\|([^\[\]]+?)\]\]/g, '<span class="fr"><span>$1</span><span>$2</span></span>');
        if (part === before) break;
      }
      const un = s => s.replace(/^\((.*)\)$/, '$1');
      return part
        // обозначение нуклида ^A_ZX — индексы друг над другом
        .replace(/\^(\([^()]*\)|[0-9]+|[A-Za-z])_(\([^()]*\)|[−-]?[0-9]+|[A-Za-z])(?=[A-Za-z])/g, (m, a, b) => `<span class="nuc"><sup>${un(a)}</sup><sub>${un(b)}</sub></span>`)
        .replace(/\^\(([^()]*)\)/g, '<sup>$1</sup>')
        .replace(/\^([−-]?[0-9]+|[a-zA-Zα-ωπ°*])/g, '<sup>$1</sup>')
        .replace(/_\(([^()]*)\)/g, '<sub>$1</sub>')
        .replace(/_([0-9]+|[a-zA-Zα-ω]|[а-яёА-ЯЁ]+)/g, '<sub>$1</sub>');
    }).join('');
  }

  /* ---------- диалоги репетиторов ---------- */
  const VN = [];
  const vnHTML = src => `<div class="vnw" data-vid="${VN.push(src) - 1}">${vnInner(src)}</div>`;
  function vnInner(src) {
    const who = speakers(src);
    if (!who.length) return '';
    const duo = who.length > 1;
    const ava = (w, on) => `<figure class="vn-ava ${w}${on ? ' on' : ''}" data-n="${T[w].short}"><img src="${T[w].bust}" alt="${T[w].name}" width="360" height="360" loading="lazy"></figure>`;
    const lines = who.map(w => `<div class="vn-line ${w}"><span class="vn-name"><img class="vn-mini" src="${T[w].face}" alt="" width="22" height="22">${duo ? T[w].short : T[w].name}</span><p class="vn-text">${esc(src[w])}</p></div>`).join('');
    const voice = CAN_SAY ? `<button type="button" class="vn-voice" data-act="vnvoice" aria-pressed="false">${SPK}<span>${duo ? 'Послушать их' : 'Послушать'}</span></button>` : '';
    return `<div class="vn${duo ? ' duo' : ''}" data-act="vnskip">${ava(who[0], true)}<div class="vn-box">${lines}${voice}<button type="button" class="vn-skip" aria-label="Показать текст целиком">▼</button></div>${duo ? ava(who[1]) : ''}</div>`;
  }
  function refreshVN() {
    $$('.vnw[data-vid]').forEach(w => { const src = VN[+w.dataset.vid]; if (src) { w.innerHTML = vnInner(src); typeVN(w, false); } });
  }
  function typeVN(scope = document, auto = true) {
    const fresh = [];
    $$('.vn', scope).forEach(vn => {
      if (vn.dataset.typed) return;
      vn.dataset.typed = '1';
      fresh.push(vn);
      const ps = $$('.vn-text', vn), avas = $$('.vn-ava', vn), lines = $$('.vn-line', vn);
      if (reduce() || !ps.length) { vn.classList.add('done'); return; }
      const full = ps.map(p => p.textContent);
      ps.forEach(p => { p.style.minHeight = p.offsetHeight + 'px'; });
      let li = 0, i = 0, tid = 0;
      const speak = k => {
        const w = lines[k] && (lines[k].classList.contains('i') ? 'i' : 'a');
        avas.forEach(a => a.classList.toggle('on', a.classList.contains(w)));
      };
      const finish = () => {
        clearTimeout(tid);
        ps.forEach((p, k) => { p.textContent = full[k]; p.classList.remove('typing', 'wait'); p.style.minHeight = ''; });
        vn.classList.add('done'); avas.forEach(a => a.classList.add('on'));
      };
      ps.forEach((p, k) => { if (k) p.classList.add('wait'); });
      const step = () => {
        const p = ps[li], text = full[li];
        if (i === 0) { p.classList.remove('wait'); p.classList.add('typing'); speak(li); }
        i += 2; p.textContent = text.slice(0, i);
        if (i < text.length) { tid = setTimeout(step, Math.max(9, Math.min(24, 2400 / text.length))); return; }
        p.classList.remove('typing'); li++; i = 0;
        if (li < ps.length) tid = setTimeout(step, 450); else finish();
      };
      ps.forEach((p, k) => { if (!k) p.textContent = ''; });
      step();
      vn._finish = finish;
      onCleanup(() => clearTimeout(tid));
    });
    // «Говорят сами»: звучит первый появившийся диалог (он всегда в начале страницы или только что открылся)
    if (auto && canAuto() && fresh.length) {
      const b = $('.vn-voice', fresh[0]);
      if (b) sayVN(b, true);
    }
  }

  /* ---------- куски разметки главной ---------- */
  function idCard(w) {
    const c = CARDS[w];
    const rows = c.oaa.map(([n, gf, vf, gr, vr]) => `<div class="oaa-r"><span class="oaa-n">${n}</span><span class="oaa-g"><span class="g-f">${gf}</span><span class="g-r">${gr}</span></span><span class="oaa-b" style="--f:${vf}%;--r:${vr}%"><i></i></span><span class="oaa-v"><span class="g-f">${vf}</span><span class="g-r">${vr}</span></span></div>`).join('');
    const sel = st.tutor === w ? ' sel' : '';
    return `<div class="idwrap ${w}${sel}" data-w="${w}"><span class="stamp" aria-hidden="true">Объясняет</span><div class="idcard" tabindex="0" role="button" aria-label="${T[w].name}: выбрать репетитором">
<div class="id-top"><span class="id-school">高度育成高等学校</span><span class="id-kind">Студенческий билет</span></div>
<div class="id-main"><div class="id-photo"><img src="${T[w].bust}" alt="${T[w].name}" width="360" height="360" loading="lazy"></div><div class="id-info"><div class="id-name">${T[w].name.replace(' ', '<br>')}</div><div class="id-jp">${c.kanji}</div>
<dl class="id-dl"><div><dt>Класс</dt><dd>${c.cls}</dd></div><div><dt>Роль</dt><dd>${c.role}</dd></div><div><dt>Стиль</dt><dd>${c.style}</dd></div></dl></div></div>
<p class="id-say">${c.say}</p>
<div class="oaa"><div class="oaa-h"><span>OAA · рейтинг</span><span class="oaa-hint"><span class="h-f">${c.hint[0]}</span><span class="h-r">${c.hint[1]}</span></span></div>${rows}</div>
<div class="id-holo" aria-hidden="true"></div></div></div>`;
  }
  function boardHTML() {
    let sq = '';
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) sq += `<i class="sq${(x + y) % 2 ? ' d' : ''}" data-s="${'abcdefgh'[x]}${8 - y}"></i>`;
    const back = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'];
    let pcs = '';
    for (let x = 0; x < 8; x++) {
      const f = 'abcdefgh'[x];
      pcs += pc(back[x], f + '8', true) + pc('♟', f + '7', true) + pc('♟', f + '2', false) + pc(back[x], f + '1', false);
    }
    return `<div class="board" id="board">${sq}${pcs}</div>`;
  }
  const sqXY = s => ['abcdefgh'.indexOf(s[0]), 8 - +s[1]];
  const pc = (g, s, black) => { const [x, y] = sqXY(s); return `<span class="pc${black ? ' bk' : ''}" data-sq="${s}" data-home="${s}" style="--x:${x};--y:${y}"><b>${g}︎</b></span>`; };

  function cardSubj(s, i) {
    const n = s.lessons.length, d = doneIn(s.id);
    return `<a class="subj hue" href="#s-${s.id}" style="--h:${s.hue};--d:${i * 45}ms">
<span class="subj-glyph" aria-hidden="true">${s.glyph}</span>
<span class="subj-name">${s.name}</span>
<span class="subj-meta">${s.grades} · ${n} ${plural(n, 'урок', 'урока', 'уроков')}</span>
<span class="subj-desc">${s.desc}</span>
<span class="bar" aria-hidden="true"><i style="width:${Math.round(d / n * 100)}%"></i></span>
<span class="subj-foot"><span>${d} / ${n} пройдено</span><span class="arr" aria-hidden="true">→</span></span></a>`;
  }

  /* ---------- главная ---------- */
  function vHome() {
    const last = st.last && byId[st.last.sid] && byId[st.last.sid].lessons[st.last.n - 1] ? st.last : null;
    const doneTotal = Object.keys(st.done).length;
    const r = rankOf(st.pp);
    const mq = [];
    QUOTES.forEach((q, k) => { mq.push(`<span>${q}</span>`); if (QUOTES_I[k]) mq.push(`<span class="i">${QUOTES_I[k]}</span>`); });
    return `
<section class="wrap hero">
  <div class="hero-txt">
    <p class="eyebrow"><span class="dot" aria-hidden="true"></span>Кодо Икусэй · 8–11 класс · все предметы</p>
    <h1 class="hero-h"><span class="ln"><span>Репетитор</span></span><span class="ln"><span class="red">Аянокоджи</span></span><span class="ln sm"><span class="pink">и Амасава Ичика</span></span></h1>
    <p class="hero-sub">${SCHOOL.length} школьных предметов, ${LANGS.length} иностранных языков от A2 до C1, ${PROGS.length} курсов программирования до уровня Junior и ${TOTAL} подробных уроков по 30–40 минут: теория, разборы, ловушки, практика с решениями и тест. Аянокоджи объясняет спокойно и по шагам, Амасава — живо и с подсказками для запоминания. Выбери одного или учись с обоими.</p>
    <blockquote class="hero-q"><span id="heroQ">${QUOTES[0]}</span><span class="caret" aria-hidden="true"></span>${CAN_SAY ? `<button type="button" class="q-say" data-act="heroq" aria-label="Послушать: говорит Аянокоджи">${SPK}</button>` : ''}</blockquote>
    <div class="cta">
      <button type="button" class="btn btn-red" data-to="subjects">Выбрать предмет <span aria-hidden="true">→</span></button>
      ${last ? `<a class="btn" href="#l-${last.sid}-${last.n}">Продолжить: ${esc(byId[last.sid].name)}, урок ${last.n}</a>` : '<button type="button" class="btn" data-to="tutors">Выбрать репетитора</button>'}
    </div>
    <dl class="stats">
      <div><dt>Курсов</dt><dd>${SUBJ.length}</dd></div>
      <div><dt>Уроков</dt><dd>${TOTAL}</dd></div>
      <div><dt>Часов занятий</dt><dd>≈${Math.round(TOTAL * 35 / 60)}</dd></div>
      <div><dt>Пройдено тобой</dt><dd>${doneTotal}</dd></div>
    </dl>
  </div>
  <div class="hero-art">
    <div class="poster" id="poster"><img src="img/ayanokoji-poster.webp" alt="Аянокоджи Киётака держит шахматную пешку над доской" width="736" height="951" fetchpriority="high"><div class="poster-tag"><b>Аянокоджи Киётака</b><span>Класс 1-D · репетитор</span></div></div>
    <div class="mascot"><div class="bubble" id="bubble" aria-live="polite"><b>Амасава</b><span id="bubbleT">${BUBBLE[0]}</span></div><img class="chibi" id="chibi" src="img/amasawa-chibi.webp" alt="Амасава Ичика машет рукой" width="520" height="645" data-act="chibi" title="Нажми на меня"></div>
  </div>
  <div class="jp" aria-hidden="true">綾小路清隆</div>
</section>
<section class="wrap sec" id="tutors" style="scroll-margin-top:calc(var(--head) + 8px)">
  <header class="sec-h"><p class="eyebrow">Репетиторы · два студенческих билета</p><h2>Кто будет объяснять</h2><p>Нажми на билет, чтобы выбрать репетитора, или включи режим «Вместе» — тогда в каждом уроке они объясняют по очереди, как в диалоге, а на полях появляются заметки обоих. Переключиться можно в любой момент, даже посреди урока.</p></header>
  <div class="tutors">${idCard('a')}${idCard('i')}</div>
  ${tmodeHTML()}
  <p class="tmode-note" id="tmodeNote">${MODES[st.tutor].note}</p>
</section>
<section class="wrap sec" id="subjects" style="scroll-margin-top:calc(var(--head) + 8px)">
  <header class="sec-h"><p class="eyebrow">OAA · раздел 1 · академические способности</p><h2>Выбери предмет</h2><p>Курсы идут от 8 к 11 классу. Начать можно с любого урока, но если тема даётся тяжело — вернись на пару уроков назад. Пробелы в основании видны сразу.</p></header>
  <div class="grid-subj">${SCHOOL.map(cardSubj).join('')}</div>
</section>
${LANGS.length ? langPromo() : ''}
${PROGS.length ? progPromo() : ''}
${window.IQ ? iqPromo() : ''}
<section class="wrap sec">
  <header class="sec-h"><p class="eyebrow">Испанская партия · 6 ходов</p><h2>Как устроен каждый урок</h2><p>Шесть ходов дебюта — шесть шагов урока. Порядок не случаен: каждый следующий опирается на предыдущий. Доска справа разыгрывает эти ходы.</p></header>
  <div class="opening">
    <ol class="moves">${MOVES.map(m => `<li><span class="mv">${m[0]}</span><b>${m[1]}</b><p>${m[2]}</p></li>`).join('')}</ol>
    <div class="board-wrap" aria-hidden="true">${boardHTML()}<span class="board-cap">1. e4 e5 2. Кf3 Кc6 3. Сb5 a6</span></div>
  </div>
</section>
<section class="wrap sec">
  <header class="sec-h"><p class="eyebrow">Система классов</p><h2>Очки PP и твой класс</h2><p>В Кодо Икусэй всё измеряется очками. Здесь тоже: +100 PP за пройденный урок, +20 PP за верный ответ в тесте с первой попытки и бонус за новый рекорд на специальном экзамене.</p></header>
  <div class="ranks">${RANKS.map(x => `<div class="rank${x.r === r.r ? ' cur' : ''}"><span class="rk-l">${x.r}</span><span class="rk-pp">от ${fmtNum(x.min)} PP</span><p>${x.note}</p>${x.r === r.r ? '<span class="rk-you">Ты здесь</span>' : ''}</div>`).join('')}</div>
</section>
<div class="marquee" aria-hidden="true"><div class="mq-track">${mq.concat(mq).join('')}</div></div>`;
  }

  function iqPromo() {
    const sample = window.IQ.generate(3, 'matrix', null);
    const best = st.iq && st.iq.best;
    return `<section class="wrap sec" id="iqsec">
  <div class="iq-promo">
    <div class="iq-promo-t">
      <p class="eyebrow">OAA · раздел 4 · интеллект</p>
      <h2>IQ-тренажёр</h2>
      <p>Бесконечные задания восьми типов: числовые и буквенные ряды, матрицы фигур, логические цепочки, повороты узоров. Пять уровней сложности — от «Класса D» до «Белой комнаты». Каждое задание собирается заново и получает свой номер: того, что ты уже решал, генератор не выдаст повторно.</p>
      <ul class="iq-promo-l">${window.IQ.LEVELS.map(l => `<li><b>${l.n}</b>${l.name}</li>`).join('')}</ul>
      <div class="cta"><a class="btn btn-red" href="#iq">Открыть раздел IQ →</a><a class="btn" href="#iq-test">${best ? `IQ-тест · рекорд ${best}` : 'Пройти IQ-тест'}</a></div>
    </div>
    <div class="iq-promo-art" aria-hidden="true">${sample ? sample.q.replace(/<p[^>]*>[\s\S]*?<\/p>/, '') : ''}<span class="iq-promo-id">№ ${sample ? sample.id : ''}</span></div>
  </div>
</section>`;
  }

  /* ---------- раздел «Программирование» ---------- */
  function progPromo() {
    return `<section class="wrap sec" id="progsec" style="scroll-margin-top:calc(var(--head) + 8px)">
  <header class="sec-h"><p class="eyebrow">OAA · раздел 3 · программирование</p><h2>Программирование: до уровня Junior</h2><p>${PROGS.length} курсов по ${Math.round(PROG_TOTAL / PROGS.length)} уроков: Linux, основы системного программирования, C, C++, Rust, Python и ассемблер. Код с подсветкой, задачи с решениями и подготовка к собеседованию на позицию Junior.</p></header>
  <div class="grid-subj">${PROGS.map(cardSubj).join('')}</div>
  <div class="cta" style="margin-top:28px"><a class="btn btn-red" href="#prog">Открыть раздел программирования <span aria-hidden="true">→</span></a></div>
</section>`;
  }
  // рекомендуемый маршрут: от среды и первого языка к системному уровню
  const PROG_PATH = [
    ['linux', 'Среда', 'Терминал, файлы, права, процессы и Bash. Всё остальное ты будешь запускать здесь.'],
    ['python', 'Первый язык', 'Быстрый старт: алгоритмы, структуры данных, автоматизация рутины.'],
    ['clang', 'Фундамент', 'Память, указатели и то, как программа на самом деле работает с железом.'],
    ['asm', 'Под капотом', 'Регистры, стек и системные вызовы: что получается из твоего кода на C.'],
    ['sysprog', 'Система', 'Процессы, файлы, потоки, сигналы и сокеты — программы, которые работают с ядром.'],
    ['cpp', 'Индустрия', 'Классы, RAII, шаблоны и STL — язык игр, браузеров и высоконагруженных систем.'],
    ['rust', 'Безопасность', 'Владение и заимствование: системный язык, где ошибки памяти ловит компилятор.']
  ];
  function vProg() {
    return `
<section class="wrap lang-page prog-page">
  <nav class="crumbs" aria-label="Навигация"><a href="#home">Предметы</a><span>/</span><span aria-current="page">Программирование</span></nav>
  <header class="sec-h" style="margin-top:20px"><p class="eyebrow">OAA · раздел 3</p><h1 class="h1">Программирование</h1><p>${PROGS.length} курсов — от первой команды в терминале до уровня Junior: ${Math.round(PROG_TOTAL / PROGS.length)} уроков в каждом, восемь на основы и восемь на уровень Junior, а в конце — специальный экзамен.</p></header>
  ${vnHTML({ a: 'Программирование учат руками, а не глазами. В каждом уроке есть код — не копируй его, а набирай сам, запускай, ломай и чини. Ошибка компилятора — не провал, а подсказка. Через месяц ты начнёшь понимать её с первого взгляда.', i: 'Сэмпай, я составила маршрут ♡ Начни с Linux и Python, потом C — и тогда ассемблер, системное программирование, C++ и Rust покажутся логичными, а не страшными. Код в уроках можно скопировать кнопкой в углу блока!' })}
  <ol class="prog-path">${PROG_PATH.filter(([id]) => byId[id]).map(([id, step, what], k) => `<li><a href="#s-${id}" class="hue" style="--h:${byId[id].hue}"><span class="pp-n">${k + 1}</span><span class="pp-t"><small>${step}</small><b>${byId[id].name}</b><span>${what}</span></span></a></li>`).join('')}</ol>
  <div class="grid-subj">${PROGS.map(cardSubj).join('')}</div>
  <section class="sec">
    <header class="sec-h"><p class="eyebrow">Честно о целях</p><h2>Что значит «уровень Junior»</h2></header>
    <div class="content lang-how">
      <p>Junior — это не «знаю синтаксис», а «могу самостоятельно решить небольшую задачу в команде»: прочитать чужой код, найти ошибку, написать функцию с тестами и объяснить, почему она работает. Курсы дают фундамент и честную карту: что спрашивают на собеседованиях и что нужно уметь руками.</p>
      <ol>
        <li><b>Нужен компьютер с Linux.</b> Подойдут WSL на Windows, виртуальная машина или отдельный раздел. Все примеры рассчитаны на Linux и компиляторы gcc, g++, rustc и Python 3.</li>
        <li><b>Код — каждый день.</b> Лучше 30 минут ежедневно, чем пять часов раз в неделю. Набирай примеры сам и меняй их.</li>
        <li><b>Проекты важнее уроков.</b> В конце каждого курса есть мини-проект. Положи его на GitHub — это твоё портфолио.</li>
        <li><b>Читай чужой код и документацию.</b> man-страницы, cppreference, The Rust Book, docs.python.org — первоисточники лучше пересказов.</li>
        <li><b>Проверяй себя.</b> Контрольная точка после основ, вопросы собеседования в последнем уроке и специальный экзамен в конце курса.</li>
      </ol>
      <p class="fine">Обычно на путь до первой работы Junior уходит от полугода до года регулярной практики. Курсы — это карта и ядро знаний; уровень создают часы написанного кода и законченные проекты.</p>
    </div>
  </section>
</section>`;
  }

  /* ---------- раздел «Иностранные языки» ---------- */
  function langPromo() {
    return `<section class="wrap sec" id="langsec" style="scroll-margin-top:calc(var(--head) + 8px)">
  <header class="sec-h"><p class="eyebrow">OAA · раздел 2 · иностранные языки</p><h2>Иностранные языки: от A2 до C1</h2><p>${LANGS.length} углублённых курсов по ${Math.round(LANG_TOTAL / LANGS.length)} уроков: грамматика уровней B1, B2 и C1, лексика, стратегии экзаменов. Объясняют те же репетиторы, а фразы на иностранном языке можно прослушать.</p></header>
  <div class="grid-subj">${LANGS.map(cardSubj).join('')}</div>
  <div class="cta" style="margin-top:28px"><a class="btn btn-red" href="#lang">Открыть раздел языков <span aria-hidden="true">→</span></a></div>
</section>`;
  }
  const CEFR = [
    ['A2', 'Старт курса', 'Понимаешь простые фразы о себе, семье, покупках и учёбе, можешь коротко поговорить на знакомую тему и заполнить анкету.'],
    ['B1', 'Пороговый', 'Понимаешь главное в ясной речи и текстах на знакомые темы, справляешься в поездке, рассказываешь о событиях и планах и объясняешь своё мнение.'],
    ['B2', 'Продвинутый', 'Понимаешь сложные тексты и новости, говоришь спонтанно и бегло, споришь и аргументируешь, пишешь подробный связный текст.'],
    ['C1', 'Профессиональный', 'Понимаешь длинные сложные тексты и скрытые смыслы, говоришь свободно, не подбирая слов, и гибко пользуешься языком в учёбе и работе.']
  ];
  const EXAMS = [
    ['Английский', 'Cambridge B1 Preliminary, IELTS 4–5', 'B2 First, IELTS 5,5–6,5', 'C1 Advanced, IELTS 7–8'],
    ['Немецкий', 'Goethe-Zertifikat B1', 'Goethe-Zertifikat B2, telc B2', 'Goethe-Zertifikat C1, TestDaF'],
    ['Французский', 'DELF B1', 'DELF B2', 'DALF C1'],
    ['Польский', 'Certyfikat B1', 'Certyfikat B2', 'Certyfikat C1'],
    ['Китайский', '≈ HSK 4', '≈ HSK 5', '≈ HSK 6'],
    ['Японский', '≈ JLPT N3', '≈ JLPT N2', '≈ JLPT N1']
  ];
  function vLang() {
    return `
<section class="wrap lang-page">
  <nav class="crumbs" aria-label="Навигация"><a href="#home">Предметы</a><span>/</span><span aria-current="page">Иностранные языки</span></nav>
  <header class="sec-h" style="margin-top:20px"><p class="eyebrow">OAA · раздел 2</p><h1 class="h1">Иностранные языки</h1><p>${LANGS.length} углублённых курсов — английский, немецкий, французский, польский, китайский и японский. Каждый ведёт от уверенного A2 к C1: ${Math.round(LANG_TOTAL / LANGS.length)} уроков, по восемь на уровни B1, B2 и C1, и специальный экзамен в конце.</p></header>
  ${vnHTML({ a: 'Язык не учат темами, его учат уровнями. На каждом уровне меняется не столько словарь, сколько то, что ты умеешь делать: на B1 — рассказывать, на B2 — спорить, на C1 — выбирать точное слово под ситуацию. Курс показывает, что нужно на каждом шаге. Но часы практики за тебя не проведёт никто.', i: 'Сэмпай, выбирай язык по сердцу, а не по моде ♡ Кстати, все фразы с пунктирным подчёркиванием можно послушать — нажми, и браузер прочитает их вслух. Подражай произношению, это лучше любой транскрипции!' })}
  <div class="cefr">${CEFR.map(([lv, name, can]) => `<div class="cefr-c"><b>${lv}</b><span>${name}</span><p>${can}</p></div>`).join('')}</div>
  <div class="grid-subj">${LANGS.map(cardSubj).join('')}</div>
  <section class="sec">
    <header class="sec-h"><p class="eyebrow">Честно о сроках</p><h2>Как на самом деле дойти до C1</h2></header>
    <div class="content lang-how">
      <p>Для европейских языков путь от A2 до C1 обычно занимает 500–700 часов занятий, для китайского и японского — в два-три раза больше. Курс даёт карту и ядро: грамматику каждого уровня, ключевую лексику, типичные ошибки и стратегии экзаменов. Остальные часы — это практика, и без неё уровень не растёт.</p>
      <ol>
        <li><b>Один урок — один-два дня.</b> Прочитай теорию, прослушай примеры, реши практику, пройди тест.</li>
        <li><b>Каждый день 20–30 минут ввода:</b> подкасты, видео, адаптированные книги на своём уровне. Понимать должно быть почти всё — тогда язык усваивается.</li>
        <li><b>Говори и пиши с первого дня.</b> Пересказывай примеры урока своими словами, веди короткий дневник, найди собеседника.</li>
        <li><b>Повторяй слова интервально</b> — через день, неделю, месяц. Карточки работают лучше списков.</li>
        <li><b>Проверяй себя экзаменом.</b> В конце каждого уровня есть контрольная точка, а в конце курса — специальный экзамен.</li>
      </ol>
    </div>
    <div class="tbl"><table><thead><tr><th>Язык</th><th>B1</th><th>B2</th><th>C1</th></tr></thead><tbody>${EXAMS.map(r => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join('')}</tbody></table></div>
    <p class="fine">Соответствие HSK и JLPT уровням CEFR приблизительное. Озвучка работает через синтезатор речи браузера: Аянокоджи говорит мужским голосом, Амасава — женским. Если для языка нет голоса, установи его в настройках системы (языковой пакет). Больше всего естественных голосов в Microsoft Edge.</p>
  </section>
</section>`;
  }

  /* ---------- голоса репетиторов (синтезатор речи браузера) ---------- */
  // Голоса актёров озвучки взять нельзя: это голоса реальных людей. Персонажей передаёт манера речи:
  // Аянокоджи — мужской голос, низкий, медленный и ровный, с паузами между фразами и без восклицаний;
  // Амасава — женский, высокий, быстрый и эмоциональный, восклицания и вопросы звучат выше.
  const CAN_SAY = 'speechSynthesis' in window;
  const TV = {
    a: { g: 'm', pitch: 0.8, rate: 0.9, gap: 450, best: /dmitry|pavel|yuri/i },
    i: { g: 'f', pitch: 1.2, rate: 1.07, gap: 140, best: /dariya|svetlana|milena|irina/i }
  };
  // при смене значений по умолчанию старые сохранённые тон и скорость сбрасываются
  const VOICE_VER = 2;
  // настройки голосов хранятся в этом браузере: набор голосов у каждого устройства свой
  const clampN = (x, lo, hi, d) => (typeof x === 'number' && isFinite(x) ? Math.min(hi, Math.max(lo, x)) : d);
  const vset = (() => {
    const s = store.get('voice', {}) || {}, old = s.ver !== VOICE_VER;
    const one = w => { const o = s[w] || {}; return { v: typeof o.v === 'string' ? o.v : '', pitch: old ? TV[w].pitch : clampN(o.pitch, 0.5, 1.6, TV[w].pitch), rate: old ? TV[w].rate : clampN(o.rate, 0.6, 1.5, TV[w].rate) }; };
    return { ver: VOICE_VER, mode: ['auto', 'click', 'off'].includes(s.mode) ? s.mode : 'auto', a: one('a'), i: one('i') };
  })();
  const saveV = () => { store.set('voice', vset); root.dataset.voice = vset.mode; };
  // «сами говорят»: только после первого действия пользователя, иначе браузер всё равно заблокирует звук
  const canAuto = () => CAN_SAY && vset.mode === 'auto' && !(navigator.userActivation && !navigator.userActivation.hasBeenActive);
  const VOICE = { ru: 'ru-RU', en: 'en-GB', de: 'de-DE', fr: 'fr-FR', pl: 'pl-PL', zh: 'zh-CN', ja: 'ja-JP' };
  const LANG_IN = { ru: 'русском', en: 'английском', de: 'немецком', fr: 'французском', pl: 'польском', zh: 'китайском', ja: 'японском' };
  const SPK = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  // браузеры не сообщают пол голоса — узнаём его по имени (Windows, Edge, Chrome, macOS, iOS)
  const V_M = /\b(male|david|mark|george|james|guy|ryan|thomas|daniel|alex|fred|oliver|arthur|aaron|pavel|dmitry|yuri|maxim|stefan|conrad|killian|markus|paul|henri|remy|adam|marek|kangkang|yunxi|yunjian|yunyang|yunhao|ichiro|keita|otoya|hattori|daichi|naoki)\b/i;
  const V_F = /\b(female|zira|hazel|susan|sonia|libby|maisie|kate|serena|jenny|aria|samantha|karen|moira|tessa|irina|svetlana|dariya|milena|katya|hedda|katja|amala|anna|petra|hortense|julie|denise|eloise|vivienne|amelie|audrey|paulina|zofia|zosia|ewa|huihui|yaoyao|xiaoxiao|xiaoyi|tingting|meijia|haruka|ayumi|sayaka|nanami|kyoko|mizuki)\b/i;
  const vGender = v => (V_M.test(v.name) ? 'm' : V_F.test(v.name) || /^google/i.test(v.name) ? 'f' : '');
  const normLang = x => String(x || '').replace('_', '-').toLowerCase();
  // нейросетевые голоса (Edge, macOS, iOS) звучат почти как живые — им заметный приоритет
  const NATURAL = /natural|neural|online|premium|enhanced/i;
  function pickVoice(lang, w) {
    const code = lang.slice(0, 2).toLowerCase(), t = TV[w];
    const score = v => { const g = vGender(v); return (g === t.g ? 8 : g ? 0 : 4) + (NATURAL.test(v.name) ? 3 : 0) + (normLang(v.lang) === lang.toLowerCase() ? 2 : 0) + (t.best.test(v.name) ? 1 : 0); };
    return speechSynthesis.getVoices().filter(v => normLang(v.lang).startsWith(code)).sort((x, y) => score(y) - score(x))[0] || null;
  }
  // русский голос можно выбрать вручную в настройках, остальные подбираются по полу персонажа
  function voiceOf(lang, w) {
    const p = vset[w], own = lang.startsWith('ru') && p.v ? speechSynthesis.getVoices().find(v => v.name === p.v) : null;
    return { v: own || pickVoice(lang, w), own: !!own };
  }
  // mood — интонация фразы: «!» или «?» в конце реплики Амасавы
  function utter(text, lang, w, mood) {
    const u = new SpeechSynthesisUtterance(text), p = vset[w];
    const { v, own } = voiceOf(lang, w), g = v ? vGender(v) : '';
    u.lang = lang;
    if (v) u.voice = v;
    // если нужного по полу голоса в системе нет, тембр чужого сдвигаем сильнее
    const base = !own && g && g !== TV[w].g ? (w === 'a' ? Math.min(p.pitch, 0.7) : Math.max(p.pitch, 1.4)) : p.pitch;
    u.pitch = Math.min(2, base + (mood === '!' ? 0.08 : mood === '?' ? 0.05 : 0));
    u.rate = p.rate * (lang.startsWith('ru') ? 1 : 0.9) * (mood === '!' ? 1.04 : 1);
    return u;
  }
  // текст по кускам: русский и вставки на иностранных языках читаются голосами своих языков
  function segs(el, base) {
    const out = [];
    const add = (lang, t) => { const last = out[out.length - 1]; if (last && last.lang === lang) last.t += t; else out.push({ lang, t }); };
    (function walk(node, lang) {
      node.childNodes.forEach(n => {
        if (n.nodeType === 3) add(lang, n.nodeValue);
        else if (n.nodeType === 1 && !n.matches('rt, rp, .py, s, button, svg')) walk(n, VOICE[String(n.getAttribute('lang') || '').slice(0, 2).toLowerCase()] || lang);
      });
    })(el, base);
    return out.filter(s => /[\p{L}\p{N}]/u.test(s.t));
  }
  // в курсах языков вставки латиницей или иероглифами внутри русского текста читаются голосом изучаемого языка
  const L_CH = 'A-Za-zÀ-ÖØ-öø-ÿĀ-ž', J_CH = '\u3040-\u30ff\u3400-\u9fff\uff66-\uff9f々〆ー';
  const RUN_LAT = new RegExp(String.raw`[${L_CH}][${L_CH}’'-]*(?:[\s,;:!?.]+[${L_CH}][${L_CH}’'-]*)*[.!?]?`, 'g');
  const RUN_CJK = new RegExp(`[${J_CH}][${J_CH}、。！？]*`, 'g');
  function splitMixed(p) {
    const s = cur && cur.sid && byId[cur.sid], code = s && s.lang;
    if (!code || !p.lang.startsWith('ru')) return [p];
    const out = [];
    let at = 0;
    p.t.replace(code === 'zh' || code === 'ja' ? RUN_CJK : RUN_LAT, (m, i) => {
      if (m.replace(/[^\p{L}]/gu, '').length < 2) return m;
      out.push({ t: p.t.slice(at, i), lang: p.lang }, { t: m, lang: VOICE[code] });
      at = i + m.length;
      return m;
    });
    out.push({ t: p.t.slice(at), lang: p.lang });
    return out.filter(x => /[\p{L}\p{N}]/u.test(x.t)).map((x, k) => ({ t: x.t, lang: x.lang, w: p.w, on: k ? null : p.on }));
  }
  const cleanSay = t => t.replace(/[♡♥☆★✦]/g, '').replace(/\s*[→⟶]\s*/g, ', ').replace(/\s+/g, ' ').trim();
  // манера речи: сердечко у Амасавы — игривое восклицание и конец фразы; Аянокоджи голос не повышает
  const manner = (t, w) => (w === 'a'
    ? t.replace(/[♡♥]+/g, '.').replace(/!+/g, '.')
    : t.replace(/([.!?…])?\s*[♡♥]+/g, (m, p) => (p || '!') + ' '));
  const moodOf = (t, w) => (w !== 'i' ? '' : /!["»”)]*$/.test(t) ? '!' : /\?["»”)]*$/.test(t) ? '?' : '');
  // короткими фразами: длинные реплики Chrome иногда обрывает
  const sentences = t => (t.match(/[^.!?…。！？]+[.!?…。！？]*["»”)]*\s*|[.!?…。！？]+\s*/g) || [t]).map(x => x.trim()).filter(x => /[\p{L}\p{N}]/u.test(x));
  const voiceWarned = {};
  function warnVoices(list) {
    const voices = speechSynthesis.getVoices();
    if (!voices.length) return;
    list.forEach(p => {
      const code = p.lang.slice(0, 2), have = voices.filter(v => normLang(v.lang).startsWith(code));
      if (!have.length) {
        if (voiceWarned[code]) return;
        voiceWarned[code] = 1;
        toast('Нет голоса для этого языка', `В системе не установлен голос на ${LANG_IN[code]} языке, поэтому браузер может прочитать текст с акцентом или промолчать. Добавь языковой пакет в настройках системы.`, false, p.w);
      } else if (!(code === 'ru' && vset[p.w].v) && !have.some(v => vGender(v) === TV[p.w].g) && !voiceWarned[code + p.w]) {
        voiceWarned[code + p.w] = 1;
        toast(`${T[p.w].short}: голос заменён`, `В системе нет ${p.w === 'a' ? 'мужского' : 'женского'} голоса на ${LANG_IN[code]} языке, поэтому тембр изменён у ближайшего. Голос можно выбрать вручную в окне «Голоса» (значок динамика вверху). Точнее звучит в Microsoft Edge или после установки языкового пакета.`, false, p.w);
      }
    });
  }
  let sayTok = 0, sayEnd = null, sayKeep = [], sayTimer = 0;
  function stopSay() {
    sayTok++;
    clearTimeout(sayTimer);
    if (CAN_SAY) speechSynthesis.cancel();
    const f = sayEnd; sayEnd = null; sayKeep = [];
    if (f) f();
  }
  // parts: [{ t, lang, w, on }] — w: кто говорит, on: вызывается, когда реплика начинает звучать
  function say(parts, end) {
    stopSay();
    if (!CAN_SAY) { toast('Озвучка недоступна', 'Этот браузер не умеет читать текст вслух.', false, 'i'); if (end) end(); return; }
    const list = [];
    parts.flatMap(splitMixed).forEach(p => sentences(cleanSay(manner(p.t, p.w))).forEach((t, k) => list.push({ t, lang: p.lang, w: p.w, on: k ? null : p.on, mood: moodOf(t, p.w) })));
    if (!list.length) { if (end) end(); return; }
    warnVoices(list);
    const tok = sayTok;
    sayEnd = end || null;
    let at = 0;
    // фразы звучат по одной: между ними пауза в манере персонажа, при смене говорящего — чуть длиннее
    const next = () => {
      if (tok !== sayTok) return;
      if (at >= list.length) { const f = sayEnd; sayEnd = null; sayKeep = []; if (f) f(); return; }
      const p = list[at++], after = list[at], u = utter(p.t, p.lang, p.w, p.mood);
      let done = false;
      const go = () => {
        if (done || tok !== sayTok) return;
        done = true;
        clearTimeout(sayTimer);
        sayTimer = setTimeout(next, !after ? 0 : after.w !== p.w ? 500 : TV[p.w].gap);
      };
      u.onstart = () => { if (tok === sayTok && p.on) p.on(); };
      u.onend = u.onerror = go;
      sayKeep = [u]; // иначе Chrome может собрать реплику сборщиком мусора и не вызвать onend
      speechSynthesis.speak(u);
      // страховка, если браузер не пришлёт onend: следующая фраза просто встанет в его очередь
      sayTimer = setTimeout(go, 4000 + p.t.length * 170 / u.rate);
    };
    next();
  }
  // кто читает фразу: внутри заметки — её автор, иначе выбранный репетитор, в режиме «Вместе» — по очереди
  let duoTurn = 'i';
  function voiceFor(el) {
    const note = el.closest('.ayano, .ichika');
    if (note) return note.classList.contains('ichika') ? 'i' : 'a';
    if (st.tutor !== 'duo') return st.tutor;
    duoTurn = duoTurn === 'a' ? 'i' : 'a';
    return duoTurn;
  }
  function speak(el) {
    const full = VOICE[String(el.getAttribute('lang') || '').slice(0, 2).toLowerCase()];
    if (!full) return;
    if (el.classList.contains('speaking')) { stopSay(); return; }
    const w = voiceFor(el);
    say(segs(el, full).map(p => Object.assign(p, { w })), () => el.classList.remove('speaking', 'by-a', 'by-i'));
    if (sayEnd) el.classList.add('speaking', 'by-' + w);
  }
  function sayNote(btn) {
    const note = btn.closest('.ayano, .ichika');
    if (!note) return;
    if (note.classList.contains('speaking')) { stopSay(); return; }
    const w = note.classList.contains('ichika') ? 'i' : 'a';
    say(segs(note, VOICE.ru).map(p => Object.assign(p, { w })), () => { note.classList.remove('speaking'); btn.setAttribute('aria-pressed', 'false'); });
    if (sayEnd) { note.classList.add('speaking'); btn.setAttribute('aria-pressed', 'true'); }
  }
  function sayVN(btn, auto) {
    const vn = btn.closest('.vn');
    if (!vn) return;
    if (btn.classList.contains('on')) { stopSay(); return; }
    // при автоозвучке текст продолжает печататься, поэтому реплики берём из данных диалога
    const wrap = vn.closest('.vnw'), src = wrap && VN[+wrap.dataset.vid];
    if (!auto && vn._finish) vn._finish();
    const avas = $$('.vn-ava', vn), lines = $$('.vn-line', vn);
    const parts = lines.map(line => {
      const w = line.classList.contains('i') ? 'i' : 'a';
      return { t: (src && src[w]) || $('.vn-text', line).textContent, lang: VOICE.ru, w, on: () => { avas.forEach(a => a.classList.toggle('on', a.classList.contains(w))); lines.forEach(l => l.classList.toggle('talk', l === line)); } };
    });
    say(parts, () => { btn.classList.remove('on'); btn.setAttribute('aria-pressed', 'false'); if (vn.classList.contains('done')) avas.forEach(a => a.classList.add('on')); lines.forEach(l => l.classList.remove('talk')); });
    if (sayEnd) { btn.classList.add('on'); btn.setAttribute('aria-pressed', 'true'); }
  }
  // короткие реплики репетиторов (.say): результат теста, подсказки, разборы
  function saySay(p) {
    if (!p) return;
    if (p.classList.contains('speaking')) { stopSay(); return; }
    const w = p.classList.contains('i') ? 'i' : 'a', txt = $('span', p);
    if (!txt) return;
    say(segs(txt, VOICE.ru).map(x => Object.assign(x, { w })), () => p.classList.remove('speaking'));
    if (sayEnd) p.classList.add('speaking');
  }
  // в режиме «Говорят сами» реплики внутри блока звучат по очереди
  function autoSay(el) {
    if (!el || !canAuto()) return;
    const items = $$('.say', el);
    const parts = items.flatMap(p => { const w = p.classList.contains('i') ? 'i' : 'a', s = $('span', p); return s ? segs(s, VOICE.ru).map(x => Object.assign(x, { w })) : []; });
    if (!parts.length) return;
    items.forEach(p => p.classList.add('speaking'));
    say(parts, () => items.forEach(p => p.classList.remove('speaking')));
  }
  const sayLine = (w, t, end) => say([{ t, lang: VOICE.ru, w }], end);
  // приветствие при выборе репетитора — его собственная реплика с билета
  function sayGreet(m) {
    const G = { a: [['a', CARDS.a.say]], i: [['i', CARDS.i.say]], duo: [['a', 'Объясняем вдвоём. Я даю систему.'], ['i', 'А я — примеры и способы запомнить ♡']] };
    say((G[m] || []).map(([w, t]) => ({ t, lang: VOICE.ru, w })));
  }

  /* ---------- окно настроек голосов ---------- */
  const SAMPLE = { a: 'Аянокоджи. Объясню один раз — спокойно и по существу. Остальное ты поймёшь сам.', i: 'А я Амасава! Учиться со мной весело, правда-правда. Ну что, начнём, сэмпай? ♡' };
  const VMODES = [['auto', 'Говорят сами', 'Репетиторы говорят сами, как только появляются их реплики: диалоги, результаты тестов, подсказки. Звук включится после первого нажатия на странице — так требуют браузеры.'], ['click', 'По кнопке', 'Реплики звучат только когда нажимаешь значок динамика рядом с ними.'], ['off', 'Без голоса', 'Кнопки озвучки скрыты. Фразы на иностранных языках по-прежнему можно послушать нажатием.']];
  const ruVoices = () => (CAN_SAY ? speechSynthesis.getVoices().filter(v => normLang(v.lang).startsWith('ru')) : []);
  function voiceRowHTML(w) {
    const p = vset[w], gname = g => (g === 'm' ? ' · мужской' : g === 'f' ? ' · женский' : '');
    const opts = ruVoices().map(v => `<option value="${esc(v.name)}"${v.name === p.v ? ' selected' : ''}>${esc(v.name)}${gname(vGender(v))}</option>`).join('');
    const now = voiceOf(VOICE.ru, w).v;
    return `<fieldset class="vrow ${w}"><legend><img src="${T[w].face}" alt="" width="28" height="28">${T[w].name}</legend>
<p class="vnow">${now ? `Сейчас звучит: <b>${esc(now.name)}</b>${NATURAL.test(now.name) ? ' · естественный голос' : ''}` : 'Голос выберет браузер'}</p>
<label class="vfield"><span>Голос</span><select data-vw="${w}" data-vk="v"><option value="">Подобрать автоматически (${w === 'a' ? 'мужской' : 'женский'})</option>${opts}</select></label>
<label class="vfield"><span>Тон <output>${p.pitch.toFixed(2)}</output></span><input type="range" min="0.5" max="1.6" step="0.05" value="${p.pitch}" data-vw="${w}" data-vk="pitch"></label>
<label class="vfield"><span>Скорость <output>${p.rate.toFixed(2)}</output></span><input type="range" min="0.6" max="1.5" step="0.05" value="${p.rate}" data-vw="${w}" data-vk="rate"></label>
<button type="button" class="btn vtest" data-act="vtest" data-w="${w}">${SPK}<span>Послушать</span></button></fieldset>`;
  }
  function voicesHTML() {
    const mode = VMODES.find(x => x[0] === vset.mode);
    return `<p class="eyebrow">Озвучка</p><h2 class="h2s">Голоса репетиторов</h2>
<div class="tmode acct-tabs vmodes" role="radiogroup" aria-label="Когда говорят репетиторы">${VMODES.map(([m, l]) => `<button type="button" role="radio" aria-checked="${vset.mode === m}" data-act="vmode" data-m="${m}">${l}</button>`).join('')}</div>
<p class="acct-note" id="vmodeNote">${mode[2]}</p>
${CAN_SAY ? voiceRowHTML('a') + voiceRowHTML('i') : '<p class="acct-err">Этот браузер не умеет читать текст вслух.</p>'}
${CAN_SAY && !ruVoices().length ? '<p class="acct-note">На этом устройстве не найдено русских голосов, поэтому браузер выберет голос сам. Добавь русский языковой пакет с речью в настройках системы или открой сайт в Microsoft Edge.</p>' : ''}
${CAN_SAY && ruVoices().length && !ruVoices().some(v => NATURAL.test(v.name)) ? '<p class="acct-note vtip">Сейчас на устройстве только стандартные голоса системы — они звучат механически. Живее всего репетиторы звучат в Microsoft Edge: там есть нейросетевые голоса Dmitry для Аянокоджи и Svetlana для Амасавы, сайт включит их сам.</p>' : ''}
<p class="acct-note vfine">Голоса — это синтезатор речи твоего устройства, а характер передаёт манера: Аянокоджи говорит низко, медленно и ровно, делает паузы и никогда не повышает голос; Амасава — высоко, быстро и эмоционально. Тон и скорость можно подстроить под то, как ты их слышишь. Настоящие голоса актёров озвучки сайт не использует: это голоса реальных людей, и копировать их без разрешения нельзя.</p>
<div class="cta"><button type="button" class="btn btn-red" data-act="vclose">Готово</button><button type="button" class="btn" data-act="vreset">Сбросить</button></div>`;
  }
  function openVoices() {
    const d = $('#vdlg'), b = $('#vbox');
    if (!d || !b) return;
    b.innerHTML = voicesHTML();
    d.hidden = false;
    const f = $('[aria-checked="true"]', b); if (f) f.focus();
  }
  function closeVoices() { const d = $('#vdlg'); if (d) d.hidden = true; }
  if (CAN_SAY && speechSynthesis.addEventListener) speechSynthesis.addEventListener('voiceschanged', () => { const d = $('#vdlg'); if (d && !d.hidden) $('#vbox').innerHTML = voicesHTML(); });
  document.addEventListener('input', e => {
    const el = e.target.closest && e.target.closest('#vbox [data-vk]');
    if (!el) return;
    const w = el.dataset.vw, k = el.dataset.vk;
    vset[w][k] = k === 'v' ? el.value : +el.value;
    const o = el.parentElement.querySelector('output'); if (o) o.textContent = (+el.value).toFixed(2);
    saveV();
  });
  if (CAN_SAY) { try { speechSynthesis.getVoices(); } catch (e) { /* голоса подгрузятся позже */ } }

  // оборачивает иероглифы и кану вне [lang] в <span lang>, чтобы браузер взял японский или китайский шрифт
  const HAS_CJK = /[぀-ヿ㐀-鿿]/;
  const CJK_RUN = /[　-〿぀-ヿ㐀-鿿！-＠ｦ-ﾟ～]+/g;
  function wrapCJK(root, code) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: n => (HAS_CJK.test(n.nodeValue) && !n.parentElement.closest('[lang], rt, rp, .vn, script, style') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT)
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n => {
      const t = n.nodeValue, frag = document.createDocumentFragment();
      let at = 0;
      t.replace(CJK_RUN, (m, i) => {
        if (!HAS_CJK.test(m)) return m;
        frag.append(t.slice(at, i));
        const s = document.createElement('span');
        s.lang = code; s.textContent = m;
        frag.append(s);
        at = i + m.length;
        return m;
      });
      frag.append(t.slice(at));
      n.replaceWith(frag);
    });
  }

  let openTimer = 0, quoteTimer = 0, bubbleN = 0;
  function mHome() {
    // доска разыгрывает испанскую партию, пункт списка подсвечивается вместе с ходом
    const board = $('#board'), items = $$('.moves li');
    if (board && !reduce()) {
      let k = 0;
      const place = (p, s) => { const [x, y] = sqXY(s); p.dataset.sq = s; p.style.setProperty('--x', x); p.style.setProperty('--y', y); };
      const flash = s => { const q = $(`.sq[data-s="${s}"]`, board); if (q) { q.classList.add('lit'); setTimeout(() => q.classList.remove('lit'), 1300); } };
      const step = () => {
        if (!document.body.contains(board)) return;
        if (k >= OPENING.length) {
          openTimer = setTimeout(() => {
            $$('.pc', board).forEach(p => place(p, p.dataset.home));
            items.forEach(li => li.classList.remove('on'));
            k = 0; openTimer = setTimeout(step, 1400);
          }, 2800);
          return;
        }
        const [from, to] = OPENING[k];
        const p = $(`.pc[data-sq="${from}"]`, board);
        if (p) { place(p, to); p.classList.remove('hop'); void p.offsetWidth; p.classList.add('hop'); }
        flash(from); flash(to);
        items.forEach((li, i) => li.classList.toggle('on', i === k));
        k++;
        openTimer = setTimeout(step, 1700);
      };
      openTimer = setTimeout(step, 1000);
    }
    // цитаты печатаются заново
    const q = $('#heroQ');
    if (q && !reduce()) {
      let qi = 0;
      const typeTo = (text, done) => {
        let s = q.textContent;
        const erase = () => {
          if (!document.body.contains(q)) return;
          if (s.length) { s = s.slice(0, -3); q.textContent = s; quoteTimer = setTimeout(erase, 14); } else type(0);
        };
        const type = i => {
          if (!document.body.contains(q)) return;
          q.textContent = text.slice(0, i);
          if (i < text.length) quoteTimer = setTimeout(() => type(i + 1), 30); else done();
        };
        erase();
      };
      const cycle = () => { qi = (qi + 1) % QUOTES.length; typeTo(QUOTES[qi], () => { quoteTimer = setTimeout(cycle, 5200); }); };
      quoteTimer = setTimeout(cycle, 5200);
    }
    onCleanup(() => { clearTimeout(openTimer); clearTimeout(quoteTimer); });
    // билеты: наведение показывает «настоящий» рейтинг, клик выбирает репетитора
    $$('.idwrap').forEach(wrap => {
      const card = $('.idcard', wrap), w = wrap.dataset.w;
      if (fine()) { card.addEventListener('mouseenter', () => card.classList.add('reveal')); card.addEventListener('mouseleave', () => card.classList.remove('reveal')); }
      card.addEventListener('click', () => { if (!fine()) card.classList.toggle('reveal'); setTutor(w, false, true); });
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.classList.toggle('reveal'); setTutor(w, false, true); } });
      tilt(card, 6);
    });
    const poster = $('#poster'); if (poster) tilt(poster, 5);
    $$('.subj').forEach(el => tilt(el, 5));
  }

  function tilt(el, max) {
    if (reduce() || !fine()) return;
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      el.style.setProperty('--ry', ((px - .5) * max * 2).toFixed(2) + 'deg');
      el.style.setProperty('--rx', ((.5 - py) * max * 2).toFixed(2) + 'deg');
      el.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
      el.style.setProperty('--my', (py * 100).toFixed(1) + '%');
    });
    el.addEventListener('pointerleave', () => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
  }

  /* ---------- страница предмета ---------- */
  function vSubject({ sid }) {
    const s = byId[sid], n = s.lessons.length, d = doneIn(sid);
    const nextN = (s.lessons.findIndex((_, i) => !st.done[sid + '-' + (i + 1)]) + 1) || 1;
    const grades = [...new Set(s.lessons.map(l => l[0]))];
    const row = (l, i) => {
      const k = i + 1, done = st.done[sid + '-' + k];
      return `<a class="les${done ? ' done' : ''}" href="#l-${sid}-${k}" style="--d:${Math.min(i * 25, 500)}ms"><span class="les-n">${done ? '✓' : pad2(k)}</span><span class="les-t">${esc(l[1])}</span><span class="les-m" data-m="${k}">30–40 мин</span><span class="les-go" aria-hidden="true">→</span></a>`;
    };
    return `
<section class="wrap hue" style="--h:${s.hue}">
  <nav class="crumbs" aria-label="Навигация">${crumbRoot(s)}<span aria-current="page">${s.name}</span></nav>
  <header class="s-head">
    <div class="s-glyph" aria-hidden="true">${s.glyph}</div>
    <div class="s-meta">
      <p class="eyebrow">${s.grades} · ${n} ${plural(n, 'урок', 'урока', 'уроков')} · ≈${Math.round(n * 35 / 60)} ч занятий</p>
      <h1>${s.name}</h1>
      <p class="s-desc">${s.desc}</p>
      <div class="s-prog"><span class="bar"><i style="width:${Math.round(d / n * 100)}%"></i></span><span>${d} из ${n} пройдено</span></div>
      <div class="cta"><a class="btn btn-red" href="#l-${sid}-${nextN}">${d ? 'Продолжить' : 'Начать'} с урока ${nextN} <span aria-hidden="true">→</span></a><a class="btn" href="#exam-${sid}">Специальный экзамен</a></div>
    </div>
  </header>
  ${vnHTML({ a: s.intro, i: s.intro2 })}
  <div class="path">${grades.map(g => `<div class="grade"><h2 class="grade-h"><span>${g}</span>${gradeWord(s)}</h2><div class="les-list">${s.lessons.map((l, i) => (l[0] === g ? row(l, i) : '')).join('')}</div></div>`).join('')}</div>
</section>`;
  }
  function mSubject({ sid }) {
    typeVN();
    loadAll(sid).then(all => {
      all.forEach((L, i) => {
        const el = $(`.les-m[data-m="${i + 1}"]`);
        if (el) el.textContent = L ? `${L.m || 35} мин` : 'готовится';
      });
    });
  }

  /* ---------- урок ---------- */
  const SAY = {
    soon: { a: 'Этот урок ещё в работе. Я не выкладываю то, что не проверил сам. Пока пройди соседние уроки — к этому вернёмся позже.', i: 'Тут пока пусто, сэмпай. Загляни в соседний урок — там я уже всё подготовила ♡' },
    missing: { a: 'Здесь ничего нет. Бывает. Вернись к списку предметов — там всё на месте.', i: 'Заблудился, сэмпай? Пойдём обратно к предметам, я покажу дорогу.' },
    noexam: { a: 'Экзамен откроется, когда в курсе будет достаточно уроков с тестами. Проверять пустое место бессмысленно.', i: 'Экзамен пока закрыт. Сначала уроки, потом проверка — так честнее ♡' },
    timer: { a: 'Сделай перерыв на 5–10 минут: мозгу нужно время, чтобы закрепить материал.', i: 'Перерыв, сэмпай! Попей воды и разомнись — я подожду ♡' }
  };
  const quizSay = (ok, n) => ok === n
    ? { a: 'Без ошибок. Тема твоя — можно идти дальше.', i: 'Все правильно?! Ладно, признаю — ты молодец, сэмпай ♡' }
    : ok >= n * .7 ? { a: 'Хорошо. Перечитай объяснения к ошибкам — там конкретная дыра, её легко закрыть.', i: 'Почти идеально! Прочитай пояснения к ошибкам — я потом проверю ♡' }
      : ok >= n * .4 ? { a: 'Половина. Это не провал, а сигнал: вернись к разборам примеров и реши практику ещё раз.', i: 'Серединка. Сэмпай, ты можешь лучше — я знаю. Разборы примеров ждут тебя.' }
        : { a: 'Рано идти дальше. Перечитай теорию, особенно «Ловушки», и пройди тест ещё раз завтра.', i: 'Так дело не пойдёт, сэмпай. Перечитай урок, а завтра — реванш. Договорились?' };

  async function vLesson({ sid, n }) {
    const s = byId[sid], meta = s.lessons[n - 1];
    if (!meta) return vMissing();
    const L = await loadLesson(sid, n);
    st.last = { sid, n }; save();
    const [grade, title] = meta;
    const key = sid + '-' + n, total = s.lessons.length;
    const crumbs = `<nav class="crumbs" aria-label="Навигация">${crumbRoot(s)}<a href="#s-${sid}">${s.name}</a><span>/</span><span aria-current="page">Урок ${n}</span></nav>`;
    const head = tags => `<header class="l-head"><div class="l-num">${pad2(n)}<small>из ${pad2(total)}</small></div><div class="l-titles"><p class="eyebrow">${s.name} · ${gradeLabel(s, grade)}</p><h1>${esc(title)}</h1>${tags}</div></header>`;
    const prev = n > 1 ? n - 1 : 0, next = n < total ? n + 1 : 0;
    const pager = `<nav class="pager" aria-label="Соседние уроки">${prev ? `<a class="pg" href="#l-${sid}-${prev}"><small>← Урок ${prev}</small><span>${esc(s.lessons[prev - 1][1])}</span></a>` : '<span></span>'}${next ? `<a class="pg next" href="#l-${sid}-${next}"><small>Урок ${next} →</small><span>${esc(s.lessons[next - 1][1])}</span></a>` : `<a class="pg next" href="#exam-${sid}"><small>Финал курса →</small><span>Специальный экзамен</span></a>`}</nav>`;
    if (!L) return `<section class="wrap hue" style="--h:${s.hue}">${crumbs}${head('')}<div class="soon">${vnHTML(SAY.soon)}${pager}</div></section>`;
    const m = L.m || 35, P = L.p || [], Q = L.q || [], S = L.s || [];
    const nSec = (L.c.match(/<h3/g) || []).length;
    const done = !!st.done[key];
    const tags = `<ul class="l-tags"><li>≈ ${m} мин</li><li>${nSec} ${plural(nSec, 'раздел', 'раздела', 'разделов')}</li><li>${P.length} ${plural(P.length, 'задача', 'задачи', 'задач')}</li><li>${Q.length} ${plural(Q.length, 'вопрос', 'вопроса', 'вопросов')}</li>${done ? '<li class="ok">Пройден</li>' : ''}</ul>`;
    const practice = P.map((p, i) => `<div class="pr"><span class="pr-n">${i + 1}</span><div><div class="pr-q">${fmt(p.q)}</div><details><summary>Показать решение</summary><div class="pr-a">${fmt(p.a)}</div></details></div></div>`).join('');
    const quiz = Q.map((q, i) => `<div class="qz" data-a="${q.a}" data-k="${key}-${i}"><p class="qz-q">${i + 1}. ${fmt(q.q)}</p><div class="qz-o">${q.o.map((t, j) => `<button type="button" data-j="${j}"><span>${LETTERS[j]})</span><span>${fmt(t)}</span></button>`).join('')}</div>${q.e ? `<p class="qz-e" hidden>${fmt(q.e)}</p>` : ''}</div>`).join('');
    return `
<div class="rprog" aria-hidden="true"><i id="rprog"></i></div>
<section class="wrap hue" style="--h:${s.hue}">
  ${crumbs}
  ${head(tags)}
  <div class="l-grid">
    <article class="l-body">
      ${vnHTML({ a: L.intro, i: L.intro2 })}
      <section class="goals"><h2 class="h2s">Что ты будешь уметь после урока</h2><ul>${(L.goals || []).map(g => `<li><span>${fmt(g)}</span></li>`).join('')}</ul></section>
      ${s.lang ? `<p class="say-tip">${SPK.replace('width="16" height="16"', 'width="20" height="20"')}<span>Слова и фразы на ${LANG_IN[s.lang]} с пунктирным подчёркиванием можно послушать — нажми на них. Читают Аянокоджи и Амасава своими голосами: тот, кто сейчас объясняет, а в режиме «Вместе» — по очереди. Тембр и скорость каждого можно настроить в окне «Голоса» (значок динамика вверху).</span></p>` : ''}
      <div class="content" id="content">${fmt(L.c)}</div>
      ${P.length ? `<section class="block" id="practice"><h2 class="h2s">Практика<small>Сначала реши сам — на бумаге. Только потом открывай решение.</small></h2><div class="pr-list">${practice}</div></section>` : ''}
      ${Q.length ? `<section class="block" id="quiz"><h2 class="h2s">Тест<small>+20 PP за каждый верный ответ с первой попытки</small></h2><div class="quiz" id="quizBox">${quiz}</div><div class="qz-score" id="qzScore" hidden></div></section>` : ''}
      ${S.length ? `<section class="block" id="summary"><h2 class="h2s">Конспект<small>Перечитай перед следующим уроком и через неделю</small></h2><ol class="sum">${S.map(x => `<li><span>${fmt(x)}</span></li>`).join('')}</ol></section>` : ''}
      <div class="finish"><p>${done ? 'Урок уже засчитан. Вернись к нему через несколько дней — повторение закрепляет лучше, чем первое чтение.' : 'Прочитал теорию, решил задачи и прошёл тест? Отметь урок пройденным.'}</p>${done ? '<button type="button" class="btn is-done btn-red" disabled>Урок пройден ✓</button>' : `<button type="button" class="btn btn-red" data-act="finish" data-k="${key}">Завершить урок · +100 PP</button>`}</div>
      ${pager}
    </article>
    <aside class="l-side">
      <div class="side-card"><span class="lbl">Кто объясняет</span>${tmodeHTML()}${CAN_SAY ? '<button type="button" class="linkbtn side-voices" data-act="voices">Голоса репетиторов</button>' : ''}</div>
      <div class="side-card"><span class="lbl">Таймер урока</span><div class="timer"><span id="tmv">${pad2(m)}:00</span><button type="button" class="tbtn" id="tmBtn">Старт</button><button type="button" class="tbtn ghost" id="tmReset" aria-label="Сбросить таймер">↺</button></div></div>
      <nav class="side-card toc" id="toc" aria-label="Содержание урока"><span class="lbl">Содержание</span></nav>
    </aside>
  </div>
</section>`;
  }

  function mLesson({ sid, n }) {
    typeVN();
    const content = $('#content');
    if (!content) return;
    $$('table', content).forEach(t => { if (!t.parentElement.classList.contains('tbl')) { const w = document.createElement('div'); w.className = 'tbl'; t.parentNode.insertBefore(w, t); w.appendChild(t); } });
    // блоки кода: кнопка «Копировать»
    $$('pre.code', $('.l-body')).forEach(pre => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'code-copy'; b.dataset.act = 'copycode'; b.textContent = 'Копировать';
      pre.appendChild(b);
    });
    // в курсах китайского и японского иероглифы без разметки получают язык: свой шрифт и озвучку
    const subj = byId[sid];
    if (subj && (subj.lang === 'zh' || subj.lang === 'ja')) wrapCJK($('.l-body'), subj.lang);
    // фразы на иностранном языке: доступны с клавиатуры и подсказывают, что их можно послушать
    $$('.l-body [lang]').forEach(el => { if (!el.closest('a, button')) { el.tabIndex = 0; el.title = 'Нажми, чтобы послушать'; } });
    // заметки репетиторов можно послушать их голосами
    if (CAN_SAY) $$('.ayano, .ichika', content).forEach(n => {
      const w = n.classList.contains('ichika') ? 'i' : 'a';
      n.classList.add('has-say');
      n.insertAdjacentHTML('beforeend', `<button type="button" class="note-say" data-act="notesay" aria-pressed="false" aria-label="Послушать: говорит ${T[w].short}" title="Послушать голосом: ${T[w].short}">${SPK}</button>`);
    });
    // оглавление
    const toc = $('#toc'), items = [];
    $$('h3', content).forEach((h, i) => { h.id = 'sec-' + (i + 1); items.push([h.id, pad2(i + 1), h.textContent]); });
    [['practice', '✎', 'Практика'], ['quiz', '?', 'Тест'], ['summary', '≡', 'Конспект']].forEach(([id, mark, t]) => { if (document.getElementById(id)) items.push([id, mark, t]); });
    if (toc) toc.insertAdjacentHTML('beforeend', items.map(([id, mark, t]) => `<button type="button" data-to="${id}"><span>${mark}</span>${esc(t)}</button>`).join(''));
    // полоса чтения
    const bar = $('#rprog'), body = $('.l-body');
    const onScroll = () => {
      if (!bar || !body) return;
      const r = body.getBoundingClientRect(), total = Math.max(1, r.height - innerHeight * .5);
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, -r.top / total)).toFixed(4)})`;
    };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    onCleanup(() => removeEventListener('scroll', onScroll));
    if ('IntersectionObserver' in window && toc) {
      const btns = $$('button', toc);
      const io = new IntersectionObserver(ents => ents.forEach(en => {
        if (en.isIntersecting) btns.forEach(b => b.classList.toggle('on', b.dataset.to === en.target.id));
      }), { rootMargin: '-15% 0px -75% 0px' });
      items.forEach(([id]) => { const t = document.getElementById(id); if (t) io.observe(t); });
      onCleanup(() => io.disconnect());
    }
    // таймер
    const L = LESSONS[sid] && LESSONS[sid][n];
    const v = $('#tmv'), b = $('#tmBtn'), rs = $('#tmReset');
    if (v && b && rs) {
      const full = (L && L.m || 35) * 60;
      let left = full, id = 0;
      const show = () => { v.textContent = pad2(Math.floor(left / 60)) + ':' + pad2(left % 60); };
      const stop = () => { clearInterval(id); id = 0; };
      b.addEventListener('click', () => {
        if (id) { stop(); b.textContent = 'Дальше'; return; }
        if (left <= 0) left = full;
        b.textContent = 'Пауза';
        id = setInterval(() => {
          left--; show();
          if (left <= 0) { stop(); b.textContent = 'Старт'; const w = speakers(SAY.timer)[0]; toast('Время урока вышло', SAY.timer[w], true, w); }
        }, 1000);
      });
      rs.addEventListener('click', () => { stop(); left = full; show(); b.textContent = 'Старт'; });
      onCleanup(stop);
    }
  }

  function quizScore() {
    const box = $('#quizBox'), out = $('#qzScore');
    if (!box || !out) return;
    const all = $$('.qz', box), answered = all.filter(q => q.dataset.done);
    if (answered.length < all.length) return;
    const ok = answered.filter(q => q.dataset.ok === '1').length, n = all.length;
    out.hidden = false;
    out.innerHTML = `<b>Результат: ${ok} из ${n}</b>${sayHTML(quizSay(ok, n))}`;
    autoSay(out);
  }

  /* ---------- специальный экзамен ---------- */
  let xmPool = [], xm = null;
  const examArt = `<div class="xm-art" aria-hidden="true"><figure class="a"><img src="img/ayanokoji-rose.webp" alt="" width="640" height="640" loading="lazy"></figure><figure class="i"><img src="img/amasawa-knife.webp" alt="" width="600" height="848" loading="lazy"></figure></div>`;
  async function vExam({ sid }) {
    const s = byId[sid];
    const all = await loadAll(sid);
    xmPool = [];
    all.forEach((L, i) => { if (L && L.q) L.q.forEach(q => xmPool.push({ q: q.q, o: q.o, a: q.a, e: q.e, n: i + 1 })); });
    const best = st.exam[sid];
    const crumbs = `<nav class="crumbs" aria-label="Навигация">${crumbRoot(s)}<a href="#s-${sid}">${s.name}</a><span>/</span><span aria-current="page">Специальный экзамен</span></nav>`;
    if (xmPool.length < 5) return `<section class="wrap hue" style="--h:${s.hue}">${crumbs}<div class="xm-top"><header class="xm-head"><p class="eyebrow">Специальный экзамен</p><h1>${s.name}</h1></header>${examArt}</div><div class="xm-stage">${vnHTML(SAY.noexam)}</div></section>`;
    return `
<section class="wrap hue" style="--h:${s.hue}">
  ${crumbs}
  <div class="xm-top"><header class="xm-head"><p class="eyebrow">Специальный экзамен · ${s.grades}</p><h1>${s.name}</h1><p>10 случайных вопросов из всех уроков курса, варианты ответов перемешаны. Лучший результат: <b>${best != null ? best + ' из 10' : 'ещё нет'}</b>. За каждый балл сверх прошлого рекорда — +15 PP.</p></header>${examArt}</div>
  <div class="xm-stage" id="xmStage"></div>
</section>`;
  }
  function mExam({ sid }) { if (xmPool.length >= 5) startExam(sid); else typeVN(); }
  function startExam(sid) {
    const items = shuffle(xmPool).slice(0, Math.min(10, xmPool.length)).map(q => {
      const order = shuffle(q.o.map((_, i) => i));
      return { q: q.q, e: q.e, n: q.n, o: order.map(i => q.o[i]), a: order.indexOf(q.a), ok: null };
    });
    xm = { sid, items, i: 0, score: 0 };
    drawExam();
  }
  function drawExam() {
    const stage = $('#xmStage'); if (!stage || !xm) return;
    const total = xm.items.length;
    if (xm.i >= total) return drawResult(stage);
    const q = xm.items[xm.i];
    stage.innerHTML = `<div class="xm-dots" aria-hidden="true">${xm.items.map((it, k) => `<i class="${k < xm.i ? (it.ok ? 'ok' : 'bad') : k === xm.i ? 'cur' : ''}"></i>`).join('')}</div>
<div class="xm-card"><p class="xm-n">Вопрос ${xm.i + 1} из ${total} · из урока ${q.n}</p><p class="xm-q">${fmt(q.q)}</p>
<div class="xm-o">${q.o.map((t, j) => `<button type="button" data-xj="${j}"><span>${LETTERS[j]})</span><span>${fmt(t)}</span></button>`).join('')}</div>
<div class="xm-after" id="xmAfter" hidden>${q.e ? `<p>${fmt(q.e)}</p>` : ''}<button type="button" class="btn btn-red" data-act="xmnext">${xm.i + 1 < total ? 'Следующий вопрос →' : 'Посмотреть результат'}</button></div></div>`;
  }
  function drawResult(stage) {
    const s = byId[xm.sid], total = xm.items.length;
    const score = Math.round(xm.score / total * 10);
    const prev = st.exam[xm.sid] || 0;
    const gain = Math.max(0, score - prev) * 15;
    if (st.exam[xm.sid] == null || score > prev) { st.exam[xm.sid] = score; save(); }
    if (gain) addPP(gain, 'Новый рекорд экзамена');
    const say = score === 10 ? { a: 'Безупречно. Хотя на настоящем экзамене я бы советовал не показывать всё сразу.', i: 'Десять из десяти! Сэмпай, ты меня пугаешь. В хорошем смысле ♡' }
      : score >= 8 ? { a: 'Хороший результат. Ошибки сидят в конкретных темах — их легко закрыть.', i: 'Круто! Ещё чуть-чуть — и будет идеально. Список тем для повторения внизу.' }
        : score >= 5 ? { a: 'Средний уровень. Ровно там, где удобно прятаться. Но тебе ведь нужно не прятаться.', i: 'Средненько. Знаешь, кто ещё любит прятаться посередине? Аянокоджи-сэмпай. Не бери с него пример ♡' }
          : { a: 'Пока рано. Вернись к урокам из списка ниже, потом попробуй снова.', i: 'Ой. Проиграть битву — не значит проиграть войну. Повтори уроки из списка и возвращайся!' };
    const wrong = [...new Set(xm.items.filter(it => !it.ok).map(it => it.n))].sort((a, b) => a - b);
    stage.innerHTML = `<div class="xm-res"><p class="eyebrow">Результат · ${s.name}</p><div class="xm-score">${score}<small> / 10</small></div>
${vnHTML(say)}
${wrong.length ? `<div><p class="lbl">Стоит повторить</p><ul>${wrong.map(k => `<li><a href="#l-${xm.sid}-${k}">Урок ${k}. ${esc(s.lessons[k - 1][1])}</a></li>`).join('')}</ul></div>` : ''}
<div class="cta"><button type="button" class="btn btn-red" data-act="xmretry">Новый вариант</button><a class="btn" href="#s-${xm.sid}">К курсу</a></div></div>`;
    typeVN(stage);
    if (score >= 8) burst($('.xm-score', stage));
  }

  /* ---------- прогресс ---------- */
  function vProgress() {
    const r = rankOf(st.pp), nextR = RANKS[RANKS.indexOf(r) + 1];
    const doneTotal = Object.keys(st.done).length, quizN = Object.keys(st.quiz).length;
    const pct = nextR ? Math.round((st.pp - r.min) / (nextR.min - r.min) * 100) : 100;
    return `
<section class="wrap prog">
  <nav class="crumbs" aria-label="Навигация"><a href="#home">Предметы</a><span>/</span><span aria-current="page">Мой прогресс</span></nav>
  <header class="sec-h" style="margin-top:20px"><p class="eyebrow">Личное дело ученика</p><h1 class="h1">Мой прогресс</h1><p>${cloud.state === 'on' ? 'Прогресс сохраняется в твоём аккаунте и доступен на любом устройстве после входа.' : 'Всё хранится только в этом браузере. Если очистить данные сайта, придётся начать с класса D.'}</p></header>
  <div class="prog-grid">
    <div class="stu">
      <div class="stu-top"><span>高度育成高等学校</span><span>Ученик</span></div>
      <div class="stu-rank">${r.r}</div>
      <label class="stu-name" for="stuName">Имя ученика</label>
      <input id="stuName" class="stu-inp" maxlength="40" placeholder="Впиши своё имя" value="${esc(st.name || '')}" autocomplete="off">
      <dl class="stu-dl"><div><dt>Очки</dt><dd>${fmtNum(st.pp)} PP</dd></div><div><dt>Уроков пройдено</dt><dd>${doneTotal} / ${TOTAL}</dd></div><div><dt>Верных ответов</dt><dd>${quizN}</dd></div><div><dt>Лучший IQ</dt><dd>${(st.iq && st.iq.best) || '—'}</dd></div><div><dt>Репетитор</dt><dd>${MODES[st.tutor].label}</dd></div><div><dt>Аккаунт</dt><dd>${cloud.state === 'on' ? 'в облаке' : cloud.state === 'readonly' ? 'только чтение' : cloud.state === 'loading' ? '…' : 'гость'}</dd></div></dl>
      <button type="button" class="btn" data-act="acct">${cloud.state === 'on' || cloud.state === 'readonly' ? 'Профиль и ник' : cloud.mode === 'local' ? 'Об аккаунте' : 'Войти / зарегистрироваться'}</button>
      <div class="stu-next">${nextR ? `До класса ${nextR.r}: ${fmtNum(nextR.min - st.pp)} PP` : 'Это высший класс'}<span class="bar"><i style="width:${pct}%"></i></span></div>
      <p class="stu-note">${r.note}</p>
    </div>
    <div class="prog-list">${SUBJ.map(s => { const d = doneIn(s.id), n = s.lessons.length; return `<a class="pl hue" style="--h:${s.hue}" href="#s-${s.id}"><span class="pl-g">${s.glyph}</span><span class="pl-n">${s.name}</span><span class="bar"><i style="width:${Math.round(d / n * 100)}%"></i></span><span class="pl-c">${d}/${n}</span><span class="pl-x">${st.exam[s.id] != null ? 'Экзамен: ' + st.exam[s.id] + ' из 10' : 'Экзамен ещё не сдавался'}</span></a>`; }).join('')}</div>
  </div>
  <section class="lb-sec">
    <header class="sec-h"><p class="eyebrow">Рейтинг OAA</p><h2>Лучшие ученики</h2><p>Общий рейтинг всех, кто занимается на сайте под своим аккаунтом: очки PP, класс и лучший результат IQ-теста. Имя в рейтинге — твой ник.</p></header>
    <div class="lb" id="lbList"><p class="lb-empty">Загружаю рейтинг…</p></div>
  </section>
  <div class="reset"><button type="button" class="btn" data-act="reset1">Сбросить прогресс</button><div class="reset-c" id="resetC" hidden><span>Удалить все PP, отметки об уроках и результаты экзаменов?</span><button type="button" class="btn btn-red" data-act="reset2">Да, сбросить</button><button type="button" class="btn" data-act="reset0">Отмена</button></div></div>
</section>`;
  }
  function mProgress() {
    const inp = $('#stuName');
    if (inp) inp.addEventListener('input', () => { st.name = inp.value.slice(0, 40); save(); });
    const box = $('#lbList'); if (!box) return;
    if (cloud.mode === 'server') {
      const note = cloud.state === 'on' ? '' : '<p class="lb-empty">Чтобы попасть в рейтинг, <button type="button" class="linkbtn" data-act="acct">войди или зарегистрируйся</button>.</p>';
      api('board').then(r => {
        if (!document.body.contains(box)) return;
        const rows = r.ok ? r.data.rows : null;
        if (!rows) { box.innerHTML = '<p class="lb-empty">Рейтинг сейчас недоступен.</p>'; return; }
        if (!rows.length) { box.innerHTML = '<p class="lb-empty">Пока в рейтинге никого. Пройди урок или реши задание IQ — и ты будешь первым.</p>' + note; return; }
        box.innerHTML = rows.map((x, i) => {
          const rk = /^[ABCD]$/.test(x.rank) ? x.rank : 'D';
          return `<div class="lb-row${x.me ? ' me' : ''}"><span class="lb-n">${i + 1}</span><span class="lb-ini"></span><span class="lb-name"></span><span class="rk" data-r="${rk}">${rk}</span><span class="lb-pp">${fmtNum(Math.max(0, Math.round(+x.pp || 0)))} PP</span><span class="lb-iq">${+x.iq ? 'IQ ' + Math.round(+x.iq) : '—'}</span></div>`;
        }).join('') + note;
        $$('.lb-row', box).forEach((row, i) => {
          const nick = String(rows[i].nick || 'Ученик');
          $('.lb-name', row).textContent = nick + (rows[i].me ? ' · ты' : '');
          $('.lb-ini', row).textContent = nick.slice(0, 1).toUpperCase();
        });
      }).catch(() => { if (document.body.contains(box)) box.innerHTML = '<p class="lb-empty">Рейтинг сейчас недоступен.</p>'; });
      return;
    }
    if (!cloud.db) {
      box.innerHTML = cloud.state === 'loading' ? '<p class="lb-empty">Проверяю аккаунт…</p>'
        : cloud.mode === 'local' ? `<p class="lb-empty">Общий рейтинг и вход работают на основном сайте — <a href="${MAIN_SITE}">ayanokoji-tutor.vercel.app</a>. Здесь твой прогресс хранится в этом браузере.</p>`
        : '<p class="lb-empty">Рейтинг виден после входа: открой сайт, будучи в своём аккаунте Claude. Подробнее — кнопка «Войти» вверху.</p>';
      return;
    }
    const unsub = cloud.db.collection('board').orderBy('pp', 'desc').limit(30).onSnapshot(async snap => {
      const docs = snap.docs, ids = docs.map(d => d.id);
      const ps = cloud.user && ids.length ? await cloud.user.profiles(ids) : {};
      if (!document.body.contains(box)) return;
      if (!docs.length) { box.innerHTML = '<p class="lb-empty">Пока в рейтинге никого. Пройди урок или реши задание IQ — и ты будешь первым.</p>'; return; }
      box.innerHTML = docs.map((d, i) => {
        const r = d.data() || {}, p = ps[d.id] || {}, rk = /^[ABCD]$/.test(r.rank) ? r.rank : 'D';
        return `<div class="lb-row${d.id === cloud.uid ? ' me' : ''}"><span class="lb-n">${i + 1}</span><img src="${esc(p.avatarUrl || '')}" alt="" width="34" height="34"><span class="lb-name"></span><span class="rk" data-r="${rk}">${rk}</span><span class="lb-pp">${fmtNum(Math.max(0, Math.round(+r.pp || 0)))} PP</span><span class="lb-iq">${+r.iq ? 'IQ ' + Math.round(+r.iq) : '—'}</span></div>`;
      }).join('');
      $$('.lb-name', box).forEach((el, i) => { const d = docs[i], r = d.data() || {}, p = ps[d.id] || {}; el.textContent = (String(r.nick || '').slice(0, 24) || p.name || 'Ученик') + (d.id === cloud.uid ? ' · ты' : ''); });
    }, () => { box.innerHTML = '<p class="lb-empty">Рейтинг сейчас недоступен.</p>'; });
    onCleanup(unsub);
  }

  /* ---------- о репетиторах ---------- */
  function vAbout() {
    return `
<section class="wrap">
  <nav class="crumbs" aria-label="Навигация"><a href="#home">Предметы</a><span>/</span><span aria-current="page">Репетиторы</span></nav>
  <div class="about">
    <article class="prof a">
      <figure class="prof-art"><img src="img/ayanokoji-piano.webp" alt="Аянокоджи Киётака за роялем" width="760" height="1080" loading="lazy"><span class="jp2" aria-hidden="true">綾小路清隆</span></figure>
      <div class="prof-txt">
        <p class="eyebrow">Класс 1-D · Кодо Икусэй</p>
        <h1>Аянокоджи Киётака</h1>
        ${vnHTML({ a: 'Я не собирался никого учить. Но объяснить — лучший способ проверить, понимаешь ли ты сам. Договоримся так: я объясняю ясно, а ты не пропускаешь практику. Иначе мы оба тратим время.' })}
        <p>Ученик класса D старшей школы Кодо Икусэй. Предпочитает держаться в тени, на контрольных нарочно набирает ровно средний балл и почти не показывает эмоций. За спокойствием — привычка анализировать: он видит в любой задаче систему и выбирает самый короткий путь к решению.</p>
        <h2>Как он объясняет</h2>
        <p>Минимум воды, максимум структуры: что нужно знать, почему это работает, где обычно ошибаются и как проверить себя. Его заметки на полях — про стратегию: какой ход выбрать, где подвох, как не потерять балл.</p>
      </div>
    </article>
    <article class="prof i">
      <figure class="prof-art"><img src="img/amasawa-senpai.webp" alt="Амасава Ичика машет рукой, рядом надпись «Сэмпай!»" width="600" height="801" loading="lazy"></figure>
      <div class="prof-txt">
        <p class="eyebrow">Класс 1-A · Кодо Икусэй</p>
        <h2 class="big pink">Амасава Ичика</h2>
        ${vnHTML({ i: 'Сэмпа-ай, привет! Аянокоджи-сэмпай объясняет правильно, но так серьёзно, что хочется спать. Поэтому я буду рядом: расскажу, как это запомнить, где это встречается в жизни, и прослежу, чтобы ты не ленился ♡' })}
        <p>Первокурсница класса A — яркая, весёлая и непредсказуемая. Называет всех вокруг «сэмпаями», любит подшучивать над Аянокоджи и, кажется, знает о нём больше, чем говорит. Учится легко и не скрывает этого.</p>
        <h2>Как она объясняет</h2>
        <p>Через примеры из жизни, ассоциации и мнемоники — приёмы, которые помогают запомнить правило за минуту и не забыть к экзамену. Её заметки на полях подписаны розовым.</p>
      </div>
    </article>
    <div class="prof-txt">
      <h2 class="big" style="margin-top:0">Кто объясняет</h2>
      <p>Выбери одного репетитора или режим «Вместе». В режиме «Вместе» вступление к каждому уроку — диалог двух репетиторов, а в тексте видны заметки обоих.</p>
      ${tmodeHTML()}
      <p class="tmode-note" id="tmodeNote">${MODES[st.tutor].note}</p>
      <h2>Как заниматься, чтобы был результат</h2>
      <ol>
        <li><b>Один урок — одна сессия 30–40 минут.</b> Запусти таймер в боковой панели и не отвлекайся. Короткая сосредоточенная работа лучше длинной рассеянной.</li>
        <li><b>Теорию читай с ручкой.</b> Перерисовывай схемы и переписывай ключевые формулы — так материал запоминается лучше.</li>
        <li><b>Практику решай сам.</b> Открывать решение до того, как попробовал, — значит обманывать себя, а не учителя.</li>
        <li><b>Тест проходи честно.</b> Первая попытка показывает реальное понимание и приносит PP. Ошибки — карта того, что повторить.</li>
        <li><b>Перечитывай конспект через день и через неделю.</b> Интервальное повторение — самый дешёвый способ ничего не забыть.</li>
        <li><b>В конце курса сдай специальный экзамен.</b> Десять случайных вопросов покажут, какие темы держатся, а какие — нет.</li>
      </ol>
      <h2>Что внутри</h2>
      <p>${SCHOOL.length} школьных предметов и ${SCHOOL_TOTAL} уроков: ${SCHOOL.map(s => `${s.name.toLowerCase()} (${s.lessons.length})`).join(', ')}. Раздел иностранных языков — ${LANGS.length} курсов от A2 до C1 и ${LANG_TOTAL} уроков: ${LANGS.map(s => s.name.toLowerCase()).join(', ')}. Раздел программирования — ${PROGS.length} курсов до уровня Junior и ${PROG_TOTAL} уроков: ${PROGS.map(s => s.name).join(', ')}. Каждый урок — это вступление, цели, теория с разбором примеров и ловушками, практика с решениями, тест и конспект.</p>
      <p class="fine">Неофициальный фан-проект. Аянокоджи Киётака и Амасава Ичика — персонажи серии ранобэ «Добро пожаловать в класс превосходства» (Classroom of the Elite) Сёго Кинугасы; права на персонажей принадлежат правообладателям. Иллюстрации — фан-арты, подписи авторов сохранены на изображениях. Учебные тексты написаны по школьной программе 8–11 классов и помогают разобраться в учебнике, а не заменяют его.</p>
    </div>
  </div>
</section>`;
  }

  const vMissing = () => `<section class="wrap soon"><nav class="crumbs"><a href="#home">Предметы</a></nav><h1 class="h1" style="margin:24px 0">Такой страницы нет</h1>${vnHTML(SAY.missing)}</section>`;

  /* ---------- выбор репетитора ---------- */
  function setTutor(m, quiet, greet) {
    if (!MODES[m]) return;
    const changed = st.tutor !== m;
    if (changed) stopSay();
    st.tutor = m; save();
    tutorHud();
    $$('.tmode button').forEach(b => b.setAttribute('aria-checked', b.dataset.t === m ? 'true' : 'false'));
    $$('#tmodeNote').forEach(n => { n.textContent = MODES[m].note; });
    $$('.idwrap').forEach(w => w.classList.toggle('sel', w.dataset.w === m));
    if (changed) {
      refreshVN();
      if (!quiet) toast(m === 'duo' ? 'Объясняют вдвоём' : `Объясняет ${MODES[m].label}`, MODES[m].note, false, m === 'duo' ? 'i' : m);
    }
    // выбранный репетитор здоровается своим голосом: сам — в режиме «Говорят сами», по клику на билет — всегда
    if (!quiet && (greet ? CAN_SAY && vset.mode !== 'off' : changed && canAuto())) sayGreet(m);
  }

  /* ---------- маршрутизация ---------- */
  const viewEl = $('#view'), shut = $('#shutter');
  const VIEWS = Object.assign({ home: vHome, lang: vLang, prog: vProg, subject: vSubject, lesson: vLesson, exam: vExam, progress: vProgress, about: vAbout, missing: vMissing }, (window.IQ && window.IQ.views) || {});
  const MOUNT = Object.assign({ home: mHome, lang: () => typeVN(), prog: () => typeVN(), subject: mSubject, lesson: mLesson, exam: mExam, progress: mProgress, about: () => typeVN(), missing: () => typeVN() }, (window.IQ && window.IQ.mounts) || {});
  let cur = { v: '' }, cleanups = [];
  function onCleanup(f) { cleanups.push(f); }

  function parse(h) {
    h = (h || '').replace(/^#/, '');
    let m;
    if (!h || h === 'home') return { v: 'home' };
    if (h === 'subjects' || h === 'tutors') return { v: 'home', anchor: h };
    if (h === 'lang') return { v: 'lang' };
    if (h === 'prog') return { v: 'prog' };
    if ((m = h.match(/^s-([a-z]+)$/)) && byId[m[1]]) return { v: 'subject', sid: m[1] };
    if ((m = h.match(/^l-([a-z]+)-(\d+)$/)) && byId[m[1]]) return { v: 'lesson', sid: m[1], n: +m[2] };
    if ((m = h.match(/^exam-([a-z]+)$/)) && byId[m[1]]) return { v: 'exam', sid: m[1] };
    if (h === 'progress' || h === 'about') return { v: h };
    if (window.IQ) {
      if (h === 'iq') return { v: 'iq' };
      if (h === 'iq-test') return { v: 'iqtest' };
      if ((m = h.match(/^iq-train-([1-5])$/))) return { v: 'iqtrain', lvl: +m[1] };
    }
    return { v: 'missing' };
  }
  function shutter(cover) {
    return new Promise(res => {
      shut.classList.remove('in', 'out'); void shut.offsetWidth;
      shut.classList.add(cover ? 'in' : 'out');
      setTimeout(() => { if (!cover) shut.classList.remove('out'); res(); }, cover ? 470 : 540);
    });
  }
  function jump(id, instant) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: instant || reduce() ? 'auto' : 'smooth', block: 'start' });
  }
  let curHash = '';
  async function route() {
    const hash = location.hash;
    // переходы копятся в очереди; если адрес уже показан, повторно не перерисовываем
    if (cur.v !== '' && hash === curHash) return;
    const r = parse(hash);
    if (r.v === 'home' && cur.v === 'home') { if (r.anchor) jump(r.anchor); else window.scrollTo({ top: 0, behavior: reduce() ? 'auto' : 'smooth' }); return; }
    const animate = cur.v !== '' && !reduce();
    if (animate) await shutter(true);
    stopSay();
    cleanups.forEach(f => { try { f(); } catch (e) { /* ignore */ } });
    cleanups = [];
    VN.length = 0;
    if (window.IQ) window.IQ.leave();
    let html;
    try { html = await VIEWS[r.v](r); } catch (e) { console.error(e); html = vMissing(); }
    viewEl.innerHTML = html;
    cur = r; curHash = hash;
    const navKey = r.v === 'progress' || r.v === 'about' ? r.v : r.v.startsWith('iq') ? 'iq'
      : r.v === 'lang' || (r.sid && byId[r.sid] && byId[r.sid].section === 'lang') ? 'lang'
        : r.v === 'prog' || (r.sid && byId[r.sid] && byId[r.sid].section === 'prog') ? 'prog' : 'home';
    $$('.nav a').forEach(a => a.classList.toggle('on', a.dataset.nav === navKey));
    window.scrollTo({ top: 0, behavior: 'instant' });
    try { (MOUNT[r.v] || (() => {}))(r); } catch (e) { console.error(e); }
    if (r.anchor) jump(r.anchor, true);
    viewEl.focus({ preventScroll: true });
    if (animate) await shutter(false);
  }
  let chain = Promise.resolve();
  const queueRoute = () => { chain = chain.then(route).catch(e => console.error(e)); };
  addEventListener('hashchange', queueRoute);

  /* ---------- действия ---------- */
  const actions = {
    search: () => openPal(),
    palclose: () => closePal(),
    theme: () => {
      const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
      root.dataset.theme = dark ? 'light' : 'dark';
      store.set('theme', root.dataset.theme);
      symColor();
    },
    tutor: el => setTutor(el.dataset.t),
    tutorcycle: () => setTutor(ORDER[(ORDER.indexOf(st.tutor) + 1) % ORDER.length]),
    acct: () => openAcct(false),
    accttab: el => openAcct(false, el.dataset.tab),
    srvlogout: async () => {
      await pushServer();
      try { await api('logout', {}); } catch (e) { /* выходим локально в любом случае */ }
      closeAcct(); signedOut();
      toast('Ты вышел из аккаунта', 'Прогресс сохранён в облаке. Войди снова, чтобы продолжить.', false, anyTutor());
    },
    acctclose: () => closeAcct(),
    acctsave: () => {
      const inp = $('#nickIn');
      if (inp) { const v = inp.value.trim().slice(0, 24); if (!v) { inp.focus(); return; } st.nick = v; }
      save(); pushBoard(); acctHud(); closeAcct();
      toast('Профиль сохранён', st.nick ? `Теперь ты в рейтинге как «${st.nick}».` : '', false, anyTutor());
      if (cur.v === 'progress') softRefresh();
    },
    chibi: el => {
      bubbleN = (bubbleN + 1) % BUBBLE.length;
      const t = $('#bubbleT'); if (t) t.textContent = BUBBLE[bubbleN];
      if (CAN_SAY && vset.mode !== 'off') sayLine('i', BUBBLE[bubbleN]);
      burst(el, true);
    },
    vnskip: el => { if (el._finish) el._finish(); },
    vnvoice: btn => sayVN(btn),
    notesay: sayNote,
    saysay: btn => saySay(btn.closest('.say')),
    copycode: btn => {
      const code = $('code', btn.closest('pre')), text = code ? code.textContent : '';
      const done = ok => { btn.textContent = ok ? 'Скопировано' : 'Выдели и скопируй'; setTimeout(() => { btn.textContent = 'Копировать'; }, 1600); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(() => done(true), () => done(false));
      else done(false);
    },
    heroq: () => { const q = $('#heroQ'), t = q ? q.textContent : ''; sayLine('a', QUOTES.find(x => t && x.startsWith(t)) || QUOTES[0]); },
    voices: () => openVoices(),
    vclose: () => closeVoices(),
    vmode: el => {
      vset.mode = el.dataset.m; saveV();
      if (vset.mode === 'off') stopSay();
      $$('#vbox [data-act="vmode"]').forEach(b => b.setAttribute('aria-checked', b === el ? 'true' : 'false'));
      const n = $('#vmodeNote'); if (n) n.textContent = VMODES.find(x => x[0] === vset.mode)[2];
    },
    vtest: el => sayLine(el.dataset.w, SAMPLE[el.dataset.w]),
    vreset: () => {
      vset.mode = 'auto';
      ['a', 'i'].forEach(w => { vset[w] = { v: '', pitch: TV[w].pitch, rate: TV[w].rate }; });
      saveV();
      const b = $('#vbox'); if (b) b.innerHTML = voicesHTML();
    },
    finish: btn => {
      const key = btn.dataset.k;
      if (!key || st.done[key]) return;
      st.done[key] = Date.now(); save();
      addPP(100, 'Урок пройден');
      burst(btn);
      btn.classList.add('is-done'); btn.disabled = true; btn.textContent = 'Урок пройден ✓';
      const p = btn.parentElement && $('p', btn.parentElement);
      if (p) p.textContent = 'Засчитано. Вернись к этому уроку через несколько дней — повторение закрепляет лучше, чем первое чтение.';
    },
    xmnext: () => { if (xm) { xm.i++; drawExam(); const s = $('#xmStage'); if (s) s.scrollIntoView({ behavior: reduce() ? 'auto' : 'smooth', block: 'nearest' }); } },
    xmretry: () => { if (xm) { VN.length = 0; startExam(xm.sid); } },
    reset1: () => { const c = $('#resetC'); if (c) c.hidden = false; },
    reset0: () => { const c = $('#resetC'); if (c) c.hidden = true; },
    reset2: () => { const keep = { name: st.name, tutor: st.tutor, nick: st.nick }; st = Object.assign(blank(), keep); save(); hud(); toast('Прогресс сброшен', 'Снова класс D. Иногда начать заново — это тоже ход.', false, 'a'); cur = { v: '' }; route(); }
  };

  document.addEventListener('submit', e => {
    const f = e.target.closest('form[data-form]');
    if (f) { e.preventDefault(); acctSubmit(f); }
  });
  document.addEventListener('click', e => {
    const to = e.target.closest('[data-to]');
    if (to) { e.preventDefault(); jump(to.dataset.to); return; }
    const qb = e.target.closest('.qz-o button');
    if (qb) return answerQuiz(qb);
    const xb = e.target.closest('[data-xj]');
    if (xb) return answerExam(xb);
    const sp = e.target.closest('.l-body [lang]');
    if (sp && !e.target.closest('a, button, summary, input')) { speak(sp); return; }
    const a = e.target.closest('[data-act]');
    if (a && actions[a.dataset.act]) actions[a.dataset.act](a, e);
    const pi = e.target.closest('.pal-i');
    if (pi) closePal();
  });

  function answerQuiz(b) {
    const box = b.closest('.qz');
    if (!box || box.dataset.done) return;
    const j = +b.dataset.j, a = +box.dataset.a, key = box.dataset.k;
    box.dataset.done = '1'; box.dataset.ok = j === a ? '1' : '0';
    $$('button', box).forEach((x, i) => { x.disabled = true; if (i === a) x.classList.add('ok'); });
    if (j !== a) b.classList.add('bad');
    const ex = $('.qz-e', box); if (ex) ex.hidden = false;
    if (j === a && key && !st.quiz[key]) { st.quiz[key] = 1; save(); addPP(20, 'Верный ответ'); }
    quizScore();
  }
  function answerExam(b) {
    if (!xm) return;
    const q = xm.items[xm.i]; if (!q || q.ok !== null) return;
    const j = +b.dataset.xj;
    q.ok = j === q.a; if (q.ok) xm.score++;
    $$('.xm-o button').forEach((x, i) => { x.disabled = true; if (i === q.a) x.classList.add('ok'); });
    if (!q.ok) b.classList.add('bad');
    const after = $('#xmAfter'); if (after) after.hidden = false;
    const dots = $$('.xm-dots i'); if (dots[xm.i]) dots[xm.i].className = q.ok ? 'ok' : 'bad';
  }

  /* ---------- поиск ---------- */
  const IDX = [];
  SUBJ.forEach(s => s.lessons.forEach((l, i) => IDX.push({ sid: s.id, n: i + 1, g: s.section ? l[0] : l[0] + ' кл', t: l[1], s: s.name, h: s.hue, k: (l[1] + ' ' + s.name + ' ' + (s.section === 'lang' ? 'язык ' + l[0] : s.section === 'prog' ? 'программирование код ' + l[0] : '')).toLowerCase().replace(/ё/g, 'е') })));
  const pal = $('#pal'), palIn = $('#palIn'), palList = $('#palList');
  let palLastFocus = null;
  function renderPal(q) {
    const words = q.toLowerCase().replace(/ё/g, 'е').split(/\s+/).filter(Boolean);
    const res = (words.length ? IDX.filter(x => words.every(w => x.k.includes(w))) : IDX.filter(x => x.n === 1)).slice(0, 40);
    palList.innerHTML = res.length
      ? res.map((x, i) => `<a class="pal-i hue${i ? '' : ' on'}" href="#l-${x.sid}-${x.n}" style="--h:${x.h}"><span class="pal-s">${x.s}</span><span class="pal-t">${esc(x.t)}</span><span class="pal-g">${x.g} · урок ${x.n}</span></a>`).join('')
      : '<p class="pal-empty">Ничего не нашлось. Попробуй другое слово — например, «логарифм», «Пётр» или «Passive».</p>';
  }
  function openPal() { palLastFocus = document.activeElement; pal.hidden = false; palIn.value = ''; renderPal(''); palIn.focus(); }
  function closePal() { if (pal.hidden) return; pal.hidden = true; if (palLastFocus && palLastFocus.focus) palLastFocus.focus({ preventScroll: true }); }
  palIn.addEventListener('input', () => renderPal(palIn.value));
  palIn.addEventListener('keydown', e => {
    const items = $$('.pal-i', palList), at = items.findIndex(x => x.classList.contains('on'));
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!items.length) return;
      const nx = (at + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items.forEach((x, i) => x.classList.toggle('on', i === nx));
      items[nx].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (items[at]) { location.hash = items[at].getAttribute('href').slice(1); closePal(); }
    }
  });
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K' || e.key === 'л' || e.key === 'Л')) { e.preventDefault(); pal.hidden ? openPal() : closePal(); return; }
    if (e.key === 'Escape') { closePal(); closeAcct(); closeVoices(); return; }
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('.l-body [lang]')) { e.preventDefault(); speak(e.target); return; }
    const tag = (e.target.tagName || '').toLowerCase();
    if (e.key === '/' && pal.hidden && tag !== 'input' && tag !== 'textarea') { e.preventDefault(); openPal(); }
  });

  /* ---------- фон: плывущие символы ---------- */
  let symColor = () => {};
  function symbols() {
    const c = $('#sym'); if (!c || !c.getContext) return;
    const ctx = c.getContext('2d');
    const G = ['∑', '∫', 'π', '√x', 'Δ', 'λ', '∞', '≈', '∠', '⊥', '♞', '♜', '♝', '♛', 'α', 'β', 'Ω', 'x²', 'sin', 'log', 'H₂O', 'ДНК', '1812', '§', 'F=ma', 'a²+b²', 'Ё', '{ }', '01', '→', '%', 'v₀', 'ε', '∈', '♡'];
    let W = 0, H = 0, P = [], mx = innerWidth / 2, my = innerHeight / 2, col = '#888', raf = 0;
    const mk = any => ({ g: G[Math.floor(Math.random() * G.length)], x: Math.random() * W, y: any ? Math.random() * H : H + 30, z: .3 + Math.random() * .9, s: 12 + Math.random() * 18, v: .1 + Math.random() * .25, r: (Math.random() - .5) * .6, a: .05 + Math.random() * .09 });
    const fit = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = innerWidth; H = innerHeight; c.width = W * dpr; c.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      P = Array.from({ length: Math.round(Math.min(44, W * H / 30000)) }, () => mk(true));
    };
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      for (const p of P) {
        ctx.globalAlpha = p.a;
        ctx.font = `${p.s.toFixed(0)}px "JetBrains Mono","Segoe UI Symbol",monospace`;
        ctx.save();
        ctx.translate(p.x + (mx - W / 2) * .025 * p.z, p.y + (my - H / 2) * .025 * p.z);
        ctx.rotate(p.r);
        ctx.fillText(p.g, 0, 0);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    };
    const tick = () => {
      for (const p of P) { p.y -= p.v * p.z; if (p.y < -40) Object.assign(p, mk(false)); }
      draw(); raf = requestAnimationFrame(tick);
    };
    symColor = () => { col = getComputedStyle(root).getPropertyValue('--ink-3').trim() || '#888'; if (reduce()) draw(); };
    fit(); symColor();
    addEventListener('resize', () => { fit(); if (reduce()) draw(); });
    addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
    document.addEventListener('visibilitychange', () => { cancelAnimationFrame(raf); if (!document.hidden && !reduce()) raf = requestAnimationFrame(tick); });
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', symColor);
    if (reduce()) draw(); else raf = requestAnimationFrame(tick);
  }

  /* ---------- курсор-кольцо ---------- */
  function cursorRing() {
    if (reduce() || !fine()) return;
    const ring = document.createElement('div');
    ring.className = 'cring'; ring.setAttribute('aria-hidden', 'true');
    document.body.appendChild(ring);
    let x = -100, y = -100, tx = -100, ty = -100;
    addEventListener('pointermove', e => {
      tx = e.clientX; ty = e.clientY;
      ring.classList.toggle('hot', !!e.target.closest('a,button,summary,input,.subj,.idcard,.chibi,[data-act]'));
    }, { passive: true });
    document.addEventListener('pointerleave', () => { tx = ty = -100; });
    const loop = () => { x += (tx - x) * .2; y += (ty - y) * .2; ring.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`; requestAnimationFrame(loop); };
    loop();
  }

  /* ---------- старт ---------- */
  const savedTheme = store.get('theme', null);
  if (savedTheme === 'dark' || savedTheme === 'light') root.dataset.theme = savedTheme;
  // общий интерфейс для раздела IQ (iq.js)
  window.AYK = {
    get st() { return st; }, save, addPP, toast, burst, vnHTML, sayHTML, typeVN, autoSay, onCleanup, esc, T,
    cloud: () => cloud
  };
  hud();
  tutorHud();
  root.dataset.voice = vset.mode;
  acctHud();
  symbols();
  cursorRing();
  route();
  cloudInit();
})();
