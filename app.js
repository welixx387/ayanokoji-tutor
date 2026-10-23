/* Репетитор Аянокоджи — движок сайта: маршруты, два репетитора, уроки, тесты, очки PP и эффекты */
(() => {
  'use strict';

  const SUBJ = window.SUBJECTS || [];
  const LESSONS = window.LESSONS;
  const byId = Object.fromEntries(SUBJ.map(s => [s.id, s]));
  const TOTAL = SUBJ.reduce((a, s) => a + s.lessons.length, 0);
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
  const sayHTML = src => speakers(src).map(w => `<p class="say ${w}"><img src="${T[w].face}" alt="${T[w].short}" width="30" height="30"><span>${src[w]}</span></p>`).join('');

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
  const cloud = { state: 'loading', uid: null, me: null, db: null, user: null, ref: null, writable: true, board: true, timer: 0, syncedAt: 0, busy: false, dirty: false };
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
    clearTimeout(cloud.timer); cloud.timer = setTimeout(pushCloud, 1500);
  }
  async function pushCloud() {
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
    if (cloud.state === 'on' || cloud.state === 'readonly') {
      img.src = cloud.me ? cloud.me.avatarUrl : ''; img.hidden = !cloud.me;
      t.textContent = st.nick || (cloud.me && cloud.me.name) || 'Профиль';
      b.classList.toggle('ro', cloud.state === 'readonly');
      b.title = cloud.state === 'on' ? 'Прогресс синхронизирован' : 'Только чтение: прогресс хранится в этом браузере';
    } else if (standalone()) { img.hidden = true; t.textContent = 'Гость'; b.title = 'Прогресс хранится в этом браузере'; }
    else { img.hidden = true; t.textContent = cloud.state === 'loading' ? '…' : 'Войти'; b.title = 'Вход и регистрация'; }
  }
  function openAcct(first) {
    const dlg = $('#acct'), box = $('#acctBox'); if (!dlg || !box) return;
    const when = cloud.syncedAt ? new Date(cloud.syncedAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) : '';
    if (cloud.state === 'on' || cloud.state === 'readonly') {
      box.innerHTML = `<p class="eyebrow">${first ? 'Регистрация ученика' : 'Профиль ученика'}</p>
<div class="acct-me"><img src="${esc(cloud.me ? cloud.me.avatarUrl : '')}" alt="" width="56" height="56"><div><b id="acctName"></b><span>Вход через аккаунт Claude</span></div></div>
<label class="stu-name" for="nickIn">Ник в рейтинге OAA</label>
<input id="nickIn" class="stu-inp" maxlength="24" placeholder="Например, Кей-сан" autocomplete="off" value="${esc(st.nick || '')}">
<p class="acct-note">${cloud.state === 'on' ? `Очки, пройденные уроки, экзамены и результаты IQ сохраняются в облаке и доступны на любом устройстве, где ты вошёл в этот аккаунт.${when ? ` Последняя синхронизация: ${when}.` : ''}` : 'У тебя доступ только на просмотр, поэтому прогресс хранится в этом браузере. Чтобы он сохранялся в облаке, владелец сайта должен выдать тебе права «Участник» (Contributor).'}</p>
<div class="cta"><button type="button" class="btn btn-red" data-act="acctsave">${first ? 'Зарегистрироваться' : 'Сохранить'}</button><button type="button" class="btn" data-act="acctclose">Закрыть</button></div>`;
      $('#acctName').textContent = (cloud.me && cloud.me.name) || 'Ученик';
    } else if (standalone()) {
      // открыто вне Claude (например, на GitHub Pages): облачного входа здесь нет
      box.innerHTML = `<p class="eyebrow">Вход и регистрация</p><h2 class="h2s">Здесь вход не нужен</h2>
<p class="acct-note">Эта версия сайта работает без аккаунта: очки PP, пройденные уроки, экзамены и результаты IQ сохраняются в этом браузере. Если очистить данные сайта, прогресс пропадёт.</p>
<p class="acct-note">Облачный вход, синхронизация между устройствами и общий рейтинг OAA работают в версии сайта на claude.ai.</p>
<div class="cta"><button type="button" class="btn" data-act="acctclose">Понятно</button></div>`;
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
  function fmt(html) {
    if (!html) return '';
    return String(html).split(/(<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>)/).map((part, i) => {
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
    return `<div class="vn${duo ? ' duo' : ''}" data-act="vnskip">${ava(who[0], true)}<div class="vn-box">${lines}<button type="button" class="vn-skip" aria-label="Показать текст целиком">▼</button></div>${duo ? ava(who[1]) : ''}</div>`;
  }
  function refreshVN() {
    $$('.vnw[data-vid]').forEach(w => { const src = VN[+w.dataset.vid]; if (src) { w.innerHTML = vnInner(src); typeVN(w); } });
  }
  function typeVN(scope = document) {
    $$('.vn', scope).forEach(vn => {
      if (vn.dataset.typed) return;
      vn.dataset.typed = '1';
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
    <p class="hero-sub">${SUBJ.length} школьных предметов и ${TOTAL} подробных уроков по 30–40 минут: теория, разборы, ловушки, практика с решениями и тест. Аянокоджи объясняет спокойно и по шагам, Амасава — живо и с подсказками для запоминания. Выбери одного или учись с обоими.</p>
    <blockquote class="hero-q"><span id="heroQ">${QUOTES[0]}</span><span class="caret" aria-hidden="true"></span></blockquote>
    <div class="cta">
      <button type="button" class="btn btn-red" data-to="subjects">Выбрать предмет <span aria-hidden="true">→</span></button>
      ${last ? `<a class="btn" href="#l-${last.sid}-${last.n}">Продолжить: ${esc(byId[last.sid].name)}, урок ${last.n}</a>` : '<button type="button" class="btn" data-to="tutors">Выбрать репетитора</button>'}
    </div>
    <dl class="stats">
      <div><dt>Предметов</dt><dd>${SUBJ.length}</dd></div>
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
  <div class="grid-subj">${SUBJ.map(cardSubj).join('')}</div>
</section>
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
      <p class="eyebrow">OAA · раздел 2 · интеллект</p>
      <h2>IQ-тренажёр</h2>
      <p>Бесконечные задания восьми типов: числовые и буквенные ряды, матрицы фигур, логические цепочки, повороты узоров. Пять уровней сложности — от «Класса D» до «Белой комнаты». Каждое задание собирается заново и получает свой номер: того, что ты уже решал, генератор не выдаст повторно.</p>
      <ul class="iq-promo-l">${window.IQ.LEVELS.map(l => `<li><b>${l.n}</b>${l.name}</li>`).join('')}</ul>
      <div class="cta"><a class="btn btn-red" href="#iq">Открыть раздел IQ →</a><a class="btn" href="#iq-test">${best ? `IQ-тест · рекорд ${best}` : 'Пройти IQ-тест'}</a></div>
    </div>
    <div class="iq-promo-art" aria-hidden="true">${sample ? sample.q.replace(/<p[^>]*>[\s\S]*?<\/p>/, '') : ''}<span class="iq-promo-id">№ ${sample ? sample.id : ''}</span></div>
  </div>
</section>`;
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
      card.addEventListener('click', () => { if (!fine()) card.classList.toggle('reveal'); setTutor(w); });
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.classList.toggle('reveal'); setTutor(w); } });
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
  <nav class="crumbs" aria-label="Навигация"><a href="#home">Предметы</a><span>/</span><span aria-current="page">${s.name}</span></nav>
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
  <div class="path">${grades.map(g => `<div class="grade"><h2 class="grade-h"><span>${g}</span>класс</h2><div class="les-list">${s.lessons.map((l, i) => (l[0] === g ? row(l, i) : '')).join('')}</div></div>`).join('')}</div>
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
    const crumbs = `<nav class="crumbs" aria-label="Навигация"><a href="#home">Предметы</a><span>/</span><a href="#s-${sid}">${s.name}</a><span>/</span><span aria-current="page">Урок ${n}</span></nav>`;
    const head = tags => `<header class="l-head"><div class="l-num">${pad2(n)}<small>из ${pad2(total)}</small></div><div class="l-titles"><p class="eyebrow">${s.name} · ${grade} класс</p><h1>${esc(title)}</h1>${tags}</div></header>`;
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
      <div class="content" id="content">${fmt(L.c)}</div>
      ${P.length ? `<section class="block" id="practice"><h2 class="h2s">Практика<small>Сначала реши сам — на бумаге. Только потом открывай решение.</small></h2><div class="pr-list">${practice}</div></section>` : ''}
      ${Q.length ? `<section class="block" id="quiz"><h2 class="h2s">Тест<small>+20 PP за каждый верный ответ с первой попытки</small></h2><div class="quiz" id="quizBox">${quiz}</div><div class="qz-score" id="qzScore" hidden></div></section>` : ''}
      ${S.length ? `<section class="block" id="summary"><h2 class="h2s">Конспект<small>Перечитай перед следующим уроком и через неделю</small></h2><ol class="sum">${S.map(x => `<li><span>${fmt(x)}</span></li>`).join('')}</ol></section>` : ''}
      <div class="finish"><p>${done ? 'Урок уже засчитан. Вернись к нему через несколько дней — повторение закрепляет лучше, чем первое чтение.' : 'Прочитал теорию, решил задачи и прошёл тест? Отметь урок пройденным.'}</p>${done ? '<button type="button" class="btn is-done btn-red" disabled>Урок пройден ✓</button>' : `<button type="button" class="btn btn-red" data-act="finish" data-k="${key}">Завершить урок · +100 PP</button>`}</div>
      ${pager}
    </article>
    <aside class="l-side">
      <div class="side-card"><span class="lbl">Кто объясняет</span>${tmodeHTML()}</div>
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
    const crumbs = `<nav class="crumbs" aria-label="Навигация"><a href="#home">Предметы</a><span>/</span><a href="#s-${sid}">${s.name}</a><span>/</span><span aria-current="page">Специальный экзамен</span></nav>`;
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
  <header class="sec-h" style="margin-top:20px"><p class="eyebrow">Личное дело ученика</p><h1 class="h1">Мой прогресс</h1><p>Всё хранится только в этом браузере. Если очистить данные сайта, придётся начать с класса D.</p></header>
  <div class="prog-grid">
    <div class="stu">
      <div class="stu-top"><span>高度育成高等学校</span><span>Ученик</span></div>
      <div class="stu-rank">${r.r}</div>
      <label class="stu-name" for="stuName">Имя ученика</label>
      <input id="stuName" class="stu-inp" maxlength="40" placeholder="Впиши своё имя" value="${esc(st.name || '')}" autocomplete="off">
      <dl class="stu-dl"><div><dt>Очки</dt><dd>${fmtNum(st.pp)} PP</dd></div><div><dt>Уроков пройдено</dt><dd>${doneTotal} / ${TOTAL}</dd></div><div><dt>Верных ответов</dt><dd>${quizN}</dd></div><div><dt>Лучший IQ</dt><dd>${(st.iq && st.iq.best) || '—'}</dd></div><div><dt>Репетитор</dt><dd>${MODES[st.tutor].label}</dd></div><div><dt>Аккаунт</dt><dd>${cloud.state === 'on' ? 'в облаке' : cloud.state === 'readonly' ? 'только чтение' : cloud.state === 'loading' ? '…' : 'гость'}</dd></div></dl>
      <button type="button" class="btn" data-act="acct">${cloud.state === 'on' || cloud.state === 'readonly' ? 'Профиль и ник' : standalone() ? 'Об аккаунте' : 'Войти / зарегистрироваться'}</button>
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
    if (!cloud.db) {
      box.innerHTML = `<p class="lb-empty">${cloud.state === 'loading' ? 'Проверяю аккаунт…' : standalone() ? 'Общий рейтинг работает в версии сайта на claude.ai. Здесь твой прогресс хранится в этом браузере.' : 'Рейтинг виден после входа: открой сайт, будучи в своём аккаунте Claude. Подробнее — кнопка «Войти» вверху.'}</p>`;
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
      <p>${SUBJ.length} предметов и ${TOTAL} уроков: ${SUBJ.map(s => `${s.name.toLowerCase()} (${s.lessons.length})`).join(', ')}. Каждый урок — это вступление, цели, теория с разбором примеров и ловушками, практика с решениями, тест и конспект.</p>
      <p class="fine">Неофициальный фан-проект. Аянокоджи Киётака и Амасава Ичика — персонажи серии ранобэ «Добро пожаловать в класс превосходства» (Classroom of the Elite) Сёго Кинугасы; права на персонажей принадлежат правообладателям. Иллюстрации — фан-арты, подписи авторов сохранены на изображениях. Учебные тексты написаны по школьной программе 8–11 классов и помогают разобраться в учебнике, а не заменяют его.</p>
    </div>
  </div>
</section>`;
  }

  const vMissing = () => `<section class="wrap soon"><nav class="crumbs"><a href="#home">Предметы</a></nav><h1 class="h1" style="margin:24px 0">Такой страницы нет</h1>${vnHTML(SAY.missing)}</section>`;

  /* ---------- выбор репетитора ---------- */
  function setTutor(m, quiet) {
    if (!MODES[m]) return;
    const changed = st.tutor !== m;
    st.tutor = m; save();
    tutorHud();
    $$('.tmode button').forEach(b => b.setAttribute('aria-checked', b.dataset.t === m ? 'true' : 'false'));
    $$('#tmodeNote').forEach(n => { n.textContent = MODES[m].note; });
    $$('.idwrap').forEach(w => w.classList.toggle('sel', w.dataset.w === m));
    if (changed) {
      refreshVN();
      if (!quiet) toast(m === 'duo' ? 'Объясняют вдвоём' : `Объясняет ${MODES[m].label}`, MODES[m].note, false, m === 'duo' ? 'i' : m);
    }
  }

  /* ---------- маршрутизация ---------- */
  const viewEl = $('#view'), shut = $('#shutter');
  const VIEWS = Object.assign({ home: vHome, subject: vSubject, lesson: vLesson, exam: vExam, progress: vProgress, about: vAbout, missing: vMissing }, (window.IQ && window.IQ.views) || {});
  const MOUNT = Object.assign({ home: mHome, subject: mSubject, lesson: mLesson, exam: mExam, progress: mProgress, about: () => typeVN(), missing: () => typeVN() }, (window.IQ && window.IQ.mounts) || {});
  let cur = { v: '' }, cleanups = [];
  function onCleanup(f) { cleanups.push(f); }

  function parse(h) {
    h = (h || '').replace(/^#/, '');
    let m;
    if (!h || h === 'home') return { v: 'home' };
    if (h === 'subjects' || h === 'tutors') return { v: 'home', anchor: h };
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
  async function route() {
    const r = parse(location.hash);
    if (r.v === 'home' && cur.v === 'home') { if (r.anchor) jump(r.anchor); else window.scrollTo({ top: 0, behavior: reduce() ? 'auto' : 'smooth' }); return; }
    const animate = cur.v !== '' && !reduce();
    if (animate) await shutter(true);
    cleanups.forEach(f => { try { f(); } catch (e) { /* ignore */ } });
    cleanups = [];
    VN.length = 0;
    if (window.IQ) window.IQ.leave();
    let html;
    try { html = await VIEWS[r.v](r); } catch (e) { console.error(e); html = vMissing(); }
    viewEl.innerHTML = html;
    cur = r;
    const navKey = r.v === 'progress' || r.v === 'about' ? r.v : r.v.startsWith('iq') ? 'iq' : 'home';
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
      burst(el, true);
    },
    vnskip: el => { if (el._finish) el._finish(); },
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

  document.addEventListener('click', e => {
    const to = e.target.closest('[data-to]');
    if (to) { e.preventDefault(); jump(to.dataset.to); return; }
    const qb = e.target.closest('.qz-o button');
    if (qb) return answerQuiz(qb);
    const xb = e.target.closest('[data-xj]');
    if (xb) return answerExam(xb);
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
  SUBJ.forEach(s => s.lessons.forEach((l, i) => IDX.push({ sid: s.id, n: i + 1, g: l[0], t: l[1], s: s.name, h: s.hue, k: (l[1] + ' ' + s.name).toLowerCase().replace(/ё/g, 'е') })));
  const pal = $('#pal'), palIn = $('#palIn'), palList = $('#palList');
  let palLastFocus = null;
  function renderPal(q) {
    const words = q.toLowerCase().replace(/ё/g, 'е').split(/\s+/).filter(Boolean);
    const res = (words.length ? IDX.filter(x => words.every(w => x.k.includes(w))) : IDX.filter(x => x.n === 1)).slice(0, 40);
    palList.innerHTML = res.length
      ? res.map((x, i) => `<a class="pal-i hue${i ? '' : ' on'}" href="#l-${x.sid}-${x.n}" style="--h:${x.h}"><span class="pal-s">${x.s}</span><span class="pal-t">${esc(x.t)}</span><span class="pal-g">${x.g} кл · урок ${x.n}</span></a>`).join('')
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
    if (e.key === 'Escape') { closePal(); closeAcct(); return; }
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
    get st() { return st; }, save, addPP, toast, burst, vnHTML, sayHTML, typeVN, onCleanup, esc, T,
    cloud: () => cloud
  };
  hud();
  tutorHud();
  acctHud();
  symbols();
  cursorRing();
  route();
  cloudInit();
})();
