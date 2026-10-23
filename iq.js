/* Раздел IQ: бесконечная генерация заданий пяти уровней сложности.
   Каждое задание собирается из случайного зерна; номер задания — отпечаток его содержимого. */
(() => {
  'use strict';

  const LEVELS = [
    { n: 1, name: 'Класс D', desc: 'Разминка: одна прямая закономерность.', pp: 5 },
    { n: 2, name: 'Класс C', desc: 'Два шага рассуждения и первые ловушки.', pp: 10 },
    { n: 3, name: 'Класс B', desc: 'Несколько признаков меняются одновременно.', pp: 15 },
    { n: 4, name: 'Класс A', desc: 'Скрытые правила, чередования, лишние условия.', pp: 25 },
    { n: 5, name: 'Белая комната', desc: 'Предел. Здесь ошибаются даже отличники.', pp: 40 }
  ];
  const KINDS = {
    seq: { name: 'Числовой ряд', desc: 'Найди закономерность и продолжи последовательность.' },
    matrix: { name: 'Матрица фигур', desc: 'Классика IQ-тестов: какая фигура заполнит пустую клетку.' },
    letters: { name: 'Буквенный ряд', desc: 'Те же ряды, только из букв алфавита.' },
    odd: { name: 'Лишнее число', desc: 'Четыре числа объединены свойством, одно — нет.' },
    order: { name: 'Логическая цепочка', desc: 'Расставь людей по порядку по нескольким условиям.' },
    symbols: { name: 'Уравнения с символами', desc: 'Каждый символ — число. Вычисли значение.' },
    numgrid: { name: 'Числовая таблица', desc: 'В каждой строке одно правило. Найди пропущенное.' },
    spatial: { name: 'Поворот фигуры', desc: 'Мысленно поверни или отрази узор из клеток.' }
  };
  const HINT = {
    seq: { a: 'Выпиши разности соседних чисел. Если они не постоянны — разности разностей или отношения.', i: 'Вычти соседей друг из друга, сэмпай. Не помогло? Попробуй поделить ♡' },
    matrix: { a: 'Разбери признаки по одному: форма, количество, заливка, размер. Для каждого найди правило внутри строки.', i: 'Каждая строчка — маленькая история. Что меняется слева направо? ♡' },
    letters: { a: 'Замени буквы номерами в алфавите. Задача станет числовым рядом.', i: 'Пронумеруй буквы: А — 1, Б — 2… Буквы — это просто числа в костюмах ♡' },
    odd: { a: 'Найди свойство, общее для четырёх чисел: делимость, квадраты, простота, сумма или порядок цифр.', i: 'Четверо дружат, один — сам по себе. Что общего у четверых? ♡' },
    order: { a: 'Запиши всех в одну цепочку от большего к меньшему. Каждое условие — одно звено.', i: 'Нарисуй лесенку и расставляй людей по ступенькам ♡' },
    symbols: { a: 'Начни с уравнения, где один символ повторяется: его значение находится сразу.', i: 'Найди уравнение, где герой один, — он сдастся первым ♡' },
    numgrid: { a: 'Найди правило по первым двум строкам и обязательно проверь его на обеих.', i: 'Что сделать с первыми двумя числами, чтобы получить третье? Плюс? Умножить? ♡' },
    spatial: { a: 'Следи за одной заметной клеткой — например, угловой — и проверь, куда она переедет.', i: 'Нарисуй узор на листке и поверни листок. Это не жульничество, это метод ♡' }
  };
  const I_PREFIX = ['Смотри, сэмпай: ', 'Всё просто: ', 'Секрет раскрыт ♡ ', 'Ага, вот где собака зарыта: ', 'Разгадка: '];

  /* ---------- генератор случайных чисел с зерном ---------- */
  function cyrb128(str) {
    let h1 = 1779033703, h2 = 3144134277, h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
      k = str.charCodeAt(i);
      h1 = h2 ^ Math.imul(h1 ^ k, 597399067); h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
      h3 = h4 ^ Math.imul(h3 ^ k, 951274213); h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067); h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213); h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    h1 ^= (h2 ^ h3 ^ h4); h2 ^= h1; h3 ^= h1; h4 ^= h1;
    return [h1 >>> 0, h2 >>> 0, h3 >>> 0, h4 >>> 0];
  }
  function sfc32(a, b, c, d) {
    return () => {
      a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
      let t = (a + b) | 0; a = b ^ (b >>> 9); b = (c + (c << 3)) | 0; c = (c << 21) | (c >>> 11);
      d = (d + 1) | 0; t = (t + d) | 0; c = (c + t) | 0;
      return (t >>> 0) / 4294967296;
    };
  }
  function rng(seed) {
    const f = sfc32(...cyrb128(seed));
    for (let i = 0; i < 15; i++) f();
    const R = {
      f,
      int: (a, b) => a + Math.floor(f() * (b - a + 1)),
      pick: arr => arr[Math.floor(f() * arr.length)],
      chance: p => f() < p,
      shuffle: arr => { const x = arr.slice(); for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(f() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; } return x; }
    };
    return R;
  }
  const fingerprint = s => { const h = cyrb128(s); return (h[0].toString(36).toUpperCase() + h[1].toString(36).toUpperCase()).padEnd(12, '0').slice(0, 12); };
  function freshSeed() {
    const a = new Uint32Array(3);
    try { crypto.getRandomValues(a); } catch (e) { for (let i = 0; i < 3; i++) a[i] = Math.floor(Math.random() * 4294967296); }
    return Array.from(a, x => x.toString(36)).join('-');
  }

  /* ---------- общие помощники ---------- */
  const fmtN = n => (n < 0 ? '−' + Math.abs(n) : String(n));
  // варианты ответа: правильный + отвлекающие без повторов; a — индекс правильного после перемешивания
  function build(R, correct, pool, n, key = x => String(x)) {
    const seen = new Set([key(correct)]), list = [correct];
    for (const c of R.shuffle(pool)) {
      if (list.length >= n) break;
      if (c == null) continue;
      const k = key(c);
      if (!seen.has(k)) { seen.add(k); list.push(c); }
    }
    const order = R.shuffle(list.map((_, i) => i));
    return { opts: order.map(i => list[i]), a: order.indexOf(0) };
  }
  function numPool(R, ans, extra) {
    const p = [...extra];
    for (const d of [1, -1, 2, -2, 3, -3, 5, -5, 10, -10]) p.push(ans + d);
    for (let i = 0; i < 6; i++) p.push(ans + R.int(-12, 12) || ans + 7);
    return p.filter(x => Number.isFinite(x) && x !== ans);
  }

  /* ---------- 1. числовой ряд ---------- */
  const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
  function genSeq(R, L) {
    const len = L >= 4 ? 6 : 5;
    const rules = [
      { lv: [1, 2], make() {
        const d = R.pick([2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 15, 17]) * (L > 1 && R.chance(.35) ? -1 : 1);
        const a = R.int(1, 70) + (d < 0 ? 90 : 0), t = [a];
        while (t.length <= len) t.push(t[t.length - 1] + d);
        return { t, a: `Разность соседних чисел постоянна: каждый раз ${d > 0 ? '+' : '−'}${Math.abs(d)}.`, i: `каждый раз ${d > 0 ? 'прибавляют' : 'отнимают'} ${Math.abs(d)}, как по ступенькам.`, wrong: [t[len] + d] };
      } },
      { lv: [2, 3], make() {
        const q = L >= 3 ? R.pick([2, 3, 4, -2]) : R.pick([2, 3]), a = R.int(1, q === 4 ? 3 : 7), t = [a];
        while (t.length <= len) t.push(t[t.length - 1] * q);
        return { t, a: `Каждое число в ${Math.abs(q)} раза больше предыдущего${q < 0 ? ', и знак чередуется (умножаем на −2)' : ''}.`, i: `тут умножают на ${fmtN(q)} — растёт быстрее, чем мои ожидания от тебя.`, wrong: [t[len - 1] + (t[len - 1] - t[len - 2])] };
      } },
      { lv: [2, 3], make() {
        const p = R.int(4, 14), m = R.int(1, p - 1), a = R.int(1, 40), t = [a];
        for (let k = 1; t.length <= len; k++) t.push(t[t.length - 1] + (k % 2 ? p : -m));
        return { t, a: `Шаги чередуются: +${p}, затем −${m}, снова +${p} и так далее.`, i: `шаг вперёд на ${p}, шаг назад на ${m}. Танец, а не ряд ♡`, wrong: [t[len - 1] + (len % 2 ? p : -m)] };
      } },
      { lv: [3, 4], make() {
        const a = R.int(1, 30), d = R.int(1, 6), k = R.int(1, 4), t = [a];
        for (let s = 0; t.length <= len; s++) t.push(t[t.length - 1] + d + s * k);
        const diffs = t.slice(1).map((x, j) => x - t[j]);
        return { t, a: `Разности растут на ${k}: ${diffs.slice(0, -1).join(', ')}, значит, следующая разность ${diffs[diffs.length - 1]}.`, i: `разности сами образуют лесенку: ${diffs.slice(0, -1).join(', ')}…`, wrong: [t[len - 1] + diffs[diffs.length - 2]] };
      } },
      { lv: [3, 4], make() {
        const s = R.int(1, 9), c = R.int(-3, 6), t = [];
        for (let k = 0; t.length <= len; k++) t.push((s + k) * (s + k) + c);
        return { t, a: `Это квадраты чисел ${s}, ${s + 1}, ${s + 2}…${c ? ` ${c > 0 ? 'плюс' : 'минус'} ${Math.abs(c)}` : ''}. Следующее: ${s + len}²${c ? (c > 0 ? ' + ' : ' − ') + Math.abs(c) : ''}.`, i: `спрятаны квадраты: ${s}·${s}, ${s + 1}·${s + 1} и дальше${c ? ', с небольшой поправкой' : ''}.`, wrong: [(s + len) * (s + len)] };
      } },
      { lv: [3, 4], make() {
        const t = [R.int(1, 9), R.int(1, 9)];
        while (t.length <= len) t.push(t[t.length - 1] + t[t.length - 2]);
        return { t, a: 'Каждое число — сумма двух предыдущих, как в последовательности Фибоначчи.', i: 'каждое число — сумма двух соседей слева. Семейная традиция ♡', wrong: [t[len - 1] * 2] };
      } },
      { lv: [4, 5], make() {
        const m = R.pick([2, 3]), c = R.pick([-1, 1, 2, 3, -2, 4]), t = [R.int(2, 6)];
        while (t.length <= len) t.push(t[t.length - 1] * m + c);
        return { t, a: `Правило: умножить на ${m} и ${c > 0 ? 'прибавить' : 'вычесть'} ${Math.abs(c)}.`, i: `два действия подряд: ×${m}, потом ${c > 0 ? '+' : '−'}${Math.abs(c)}.`, wrong: [t[len - 1] * m] };
      } },
      { lv: [4, 5], make() {
        const a = R.int(1, 20), p = R.int(2, 9), b = R.int(1, 5), geo = R.chance(.5), q = R.int(2, 6);
        const A = k => a + k * p, B = k => (geo ? b * 2 ** k : 60 + b - k * q);
        const t = []; for (let k = 0; t.length <= len; k++) { t.push(A(k)); if (t.length <= len) t.push(B(k)); }
        return { t, a: `Это два ряда, вставленных друг в друга. На нечётных местах: +${p} каждый раз; на чётных: ${geo ? '×2' : '−' + q}.`, i: 'тут два ряда переплетены, как косичка. Смотри через одно ♡', wrong: [t[len - 1] + p, t[len - 2] + (t[len - 2] - t[len - 4])] };
      } },
      { lv: [5, 5], make() {
        const m = R.pick([2, 3]), c = R.int(1, 9), t = [R.int(2, 9)];
        for (let k = 0; t.length <= len; k++) t.push(k % 2 ? t[t.length - 1] + c : t[t.length - 1] * m);
        return { t, a: `Действия чередуются: ×${m}, затем +${c}, снова ×${m} и так далее.`, i: `умножение и сложение ходят по очереди. Вежливые ♡`, wrong: [len % 2 ? t[len - 1] * m : t[len - 1] + c] };
      } },
      { lv: [5, 5], make() {
        const d = R.int(1, 4), r = R.pick([2, 3]), t = [R.int(1, 30)];
        for (let k = 0; t.length <= len; k++) t.push(t[t.length - 1] + d * r ** k);
        return { t, a: `Разности образуют геометрическую прогрессию: каждая в ${r} раза больше предыдущей.`, i: `разности умножаются на ${r}. Ряд внутри ряда ♡`, wrong: [t[len - 1] + d * r ** (len - 2) * 2] };
      } },
      { lv: [5, 5], make() {
        const j = R.int(0, 4), t = [R.int(1, 40)];
        for (let k = 0; t.length <= len; k++) t.push(t[t.length - 1] + PRIMES[j + k]);
        return { t, a: `Разности — подряд идущие простые числа: ${PRIMES.slice(j, j + len - 1).join(', ')}, дальше ${PRIMES[j + len - 1]}.`, i: 'разности — простые числа, которые делятся только на себя и единицу. Гордые ♡', wrong: [t[len - 1] + PRIMES[j + len - 2] + 2] };
      } },
      { lv: [4, 5], make() {
        const s = R.int(1, 4), c = R.int(0, 5), t = [];
        for (let k = 0; t.length <= len; k++) t.push((s + k) ** 3 - c);
        return { t, a: `Это кубы чисел ${s}, ${s + 1}, ${s + 2}…${c ? ` минус ${c}` : ''}.`, i: 'спрятаны кубы — числа, умноженные сами на себя трижды.', wrong: [(s + len) ** 2] };
      } }
    ];
    const pool = rules.filter(r => L >= r.lv[0] && L <= r.lv[1]);
    const r = R.pick(pool).make();
    const shown = r.t.slice(0, len), ans = r.t[len];
    const { opts, a } = build(R, ans, numPool(R, ans, r.wrong), 5);
    return {
      q: `<p class="iq-lead">Какое число должно стоять вместо знака вопроса?</p><div class="iq-seq">${shown.map(x => `<span>${fmtN(x)}</span>`).join('')}<span class="iq-ask">?</span></div>`,
      opts: opts.map(fmtN), a,
      ex: { a: `${r.a} Ответ: ${fmtN(ans)}.`, i: R.pick(I_PREFIX) + r.i + ` Ответ — ${fmtN(ans)}.` }
    };
  }

  /* ---------- 2. матрица фигур ---------- */
  const SHAPES = ['circle', 'square', 'triangle', 'diamond', 'hex', 'star'];
  const SHAPE_RU = { circle: 'круг', square: 'квадрат', triangle: 'треугольник', diamond: 'ромб', hex: 'шестиугольник', star: 'звезда' };
  const FILLS = ['none', 'half', 'solid'], FILL_RU = { none: 'без заливки', half: 'полупрозрачная', solid: 'сплошная' };
  const SIZES = [.62, .8, 1], SIZE_RU = ['мелкие', 'средние', 'крупные'];
  const POS = { 1: [[50, 50]], 2: [[29, 50], [71, 50]], 3: [[50, 27], [27, 71], [73, 71]] };
  function shapeSVG(kind, cx, cy, r, fill) {
    const cls = `f-${fill}`;
    const poly = pts => `<polygon class="${cls}" points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}"/>`;
    const ring = (n, rad, rot = -Math.PI / 2) => Array.from({ length: n }, (_, k) => [cx + rad * Math.cos(rot + k * 2 * Math.PI / n), cy + rad * Math.sin(rot + k * 2 * Math.PI / n)]);
    if (kind === 'circle') return `<circle class="${cls}" cx="${cx}" cy="${cy}" r="${r.toFixed(1)}"/>`;
    if (kind === 'square') return `<rect class="${cls}" x="${(cx - r * .85).toFixed(1)}" y="${(cy - r * .85).toFixed(1)}" width="${(r * 1.7).toFixed(1)}" height="${(r * 1.7).toFixed(1)}"/>`;
    if (kind === 'triangle') return poly(ring(3, r * 1.1));
    if (kind === 'diamond') return poly(ring(4, r * 1.1));
    if (kind === 'hex') return poly(ring(6, r));
    const pts = []; for (let k = 0; k < 10; k++) { const rad = k % 2 ? r * .45 : r * 1.1, ang = -Math.PI / 2 + k * Math.PI / 5; pts.push([cx + rad * Math.cos(ang), cy + rad * Math.sin(ang)]); }
    return poly(pts);
  }
  function cellSVG(c) {
    const base = c.count === 1 ? 27 : c.count === 2 ? 18 : 15;
    const r = base * SIZES[c.size];
    return `<svg class="mx-cell" viewBox="0 0 100 100" aria-hidden="true">${POS[c.count].map(([x, y]) => shapeSVG(c.shape, x, y, r, c.fill)).join('')}</svg>`;
  }
  function genMatrix(R, L) {
    const nVar = [1, 2, 2 + (R.chance(.5) ? 1 : 0), 3, 4][L - 1];
    const attrs = R.shuffle(['shape', 'count', 'fill', 'size']).slice(0, nVar);
    const shapes3 = R.shuffle(SHAPES).slice(0, 3);
    const rule = {}, descr = [];
    const words = { shape: 'форма', count: 'количество фигур', fill: 'заливка', size: 'размер' };
    for (const at of ['shape', 'count', 'fill', 'size']) {
      if (!attrs.includes(at)) { rule[at] = { t: 'const', v: at === 'shape' ? 0 : R.int(0, 2) }; continue; }
      const ordered = at === 'count' || at === 'size';
      const t = ordered ? R.pick(L <= 2 ? ['prog', 'prog', 'row'] : ['prog', 'dist', 'row']) : R.pick(L <= 2 ? ['dist', 'row'] : ['dist', 'dist', 'row']);
      rule[at] = { t, dir: R.chance(.5) ? 1 : -1, shift: R.pick([1, 2]), perm: R.shuffle([0, 1, 2]) };
    }
    const idx = (at, r, c) => {
      const u = rule[at];
      if (u.t === 'const') return u.v;
      if (u.t === 'row') return u.perm[r];
      if (u.t === 'prog') return u.dir > 0 ? c : 2 - c;
      return u.perm[(c + r * u.shift) % 3];
    };
    const cell = (r, c) => ({ shape: shapes3[idx('shape', r, c)], count: idx('count', r, c) + 1, fill: FILLS[idx('fill', r, c)], size: idx('size', r, c) });
    const val = (at, v) => at === 'shape' ? SHAPE_RU[v] : at === 'count' ? String(v) : at === 'fill' ? FILL_RU[v] : SIZE_RU[v];
    for (const at of attrs) {
      const u = rule[at], vals = [0, 1, 2].map(k => val(at, at === 'shape' ? shapes3[k] : at === 'count' ? k + 1 : at === 'fill' ? FILLS[k] : k));
      if (u.t === 'prog') descr.push(`${words[at][0].toUpperCase() + words[at].slice(1)} в каждой строке ${u.dir > 0 ? 'растёт' : 'убывает'}: ${(u.dir > 0 ? vals : vals.slice().reverse()).join(' → ')}.`);
      else if (u.t === 'row') descr.push(`${words[at][0].toUpperCase() + words[at].slice(1)} одинаков${at === 'count' ? 'о' : at === 'shape' || at === 'fill' ? 'а' : ''} внутри строки и меняется от строки к строке.`);
      else descr.push(`${words[at][0].toUpperCase() + words[at].slice(1)}: в каждой строке встречаются все три варианта (${vals.join(', ')}), без повторов.`);
    }
    const ans = cell(2, 2), key = c => `${c.shape}|${c.count}|${c.fill}|${c.size}`;
    const pool = [];
    const alt = (c, at) => { const x = { ...c }; if (at === 'shape') x.shape = R.pick(shapes3.filter(s => s !== c.shape).concat(R.pick(SHAPES))); else if (at === 'count') x.count = R.pick([1, 2, 3].filter(v => v !== c.count)); else if (at === 'fill') x.fill = R.pick(FILLS.filter(v => v !== c.fill)); else x.size = R.pick([0, 1, 2].filter(v => v !== c.size)); return x; };
    for (let k = 0; k < 30; k++) { const at1 = R.pick(k < 12 ? attrs : ['shape', 'count', 'fill', 'size']); let x = alt(ans, at1); if (L >= 4 && R.chance(.4)) x = alt(x, R.pick(attrs)); pool.push(x); }
    pool.push(cell(2, 1), cell(1, 2), cell(2, 0));
    const { opts, a } = build(R, ans, pool, 6, key);
    const grid = [];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) grid.push(r === 2 && c === 2 ? '<div class="mx-q">?</div>' : `<div>${cellSVG(cell(r, c))}</div>`);
    const answerText = `${SHAPE_RU[ans.shape]}, количество ${ans.count}, заливка ${FILL_RU[ans.fill]}, размер — ${SIZE_RU[ans.size].replace(/е$/, 'й')}`;
    return {
      q: `<p class="iq-lead">Какая фигура должна стоять в пустой клетке?</p><div class="mx">${grid.join('')}</div>`,
      opts: opts.map(cellSVG), a, wide: true,
      ex: { a: `${descr.join(' ')} Значит, в пустой клетке: ${answerText}.`, i: R.pick(I_PREFIX) + `смотри на каждый признак отдельно. ${descr[0]} Остальное — та же логика ♡` }
    };
  }

  /* ---------- 3. буквенный ряд ---------- */
  const AB = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
  // каждый элемент — пара букв (на 5 уровне ещё и число); у каждой части своё правило, алфавит идёт по кругу
  function genLetters(R, L) {
    const W = p => ((p % 32) + 32) % 32;
    const n = L >= 4 ? 6 : 5, s = R.int(0, 31);
    let main = [], why, whyI;
    if (L === 1) {
      const k = R.pick([1, 2, 3, 4]) * (R.chance(.3) ? -1 : 1);
      for (let j = 0; j <= n; j++) main.push(s + j * k);
      why = `номер каждый раз ${k > 0 ? 'растёт' : 'уменьшается'} на ${Math.abs(k)}`; whyI = `первая буква шагает на ${Math.abs(k)} ${k > 0 ? 'вперёд' : 'назад'}`;
    } else if (L === 2) {
      const p = R.int(3, 6), m = R.int(1, p - 1);
      main = [s]; for (let j = 1; j <= n; j++) main.push(main[j - 1] + (j % 2 ? p : -m));
      why = `шаги чередуются: вперёд на ${p}, назад на ${m}`; whyI = `первая буква танцует: ${p} вперёд, ${m} назад`;
    } else if (L === 3) {
      const st = R.int(1, 3);
      main = [s]; for (let j = 1; j <= n; j++) main.push(main[j - 1] + st + j - 1);
      why = `шаг растёт: +${st}, +${st + 1}, +${st + 2}…`; whyI = 'каждый прыжок первой буквы на одну букву длиннее прошлого';
    } else if (L === 4) {
      const st = R.int(1, 3), dir = R.chance(.5) ? 1 : -1;
      main = [s]; for (let j = 1; j <= n; j++) main.push(main[j - 1] + dir * (st + j - 1));
      why = `буква идёт ${dir > 0 ? 'вперёд' : 'назад'} с растущим шагом: ${st}, ${st + 1}, ${st + 2}…`; whyI = `первая буква разгоняется ${dir > 0 ? 'вперёд' : 'назад'}`;
    } else {
      const fib = R.pick([[1, 2, 3, 5, 8, 13], [2, 3, 5, 8, 13, 21]]);
      main = [s]; for (let j = 1; j <= n; j++) main.push(main[j - 1] + fib[j - 1]);
      why = `шаги — числа Фибоначчи: ${fib.slice(0, 4).join(', ')}… (каждый шаг — сумма двух предыдущих)`; whyI = 'шаги первой буквы растут как числа Фибоначчи: каждый — сумма двух прошлых';
    }
    main = main.map(W);
    const k2 = R.pick(L <= 2 ? [1, 2, -1, -2] : [1, 2, 3, -1, -2, -3]), alt2 = L >= 4 && R.chance(.5);
    const step2 = j => (alt2 ? (j % 2 === 0 ? Math.abs(k2) + 1 : -1) : k2);
    let sec = [R.int(0, 31)];
    for (let j = 1; j <= n; j++) sec.push(sec[j - 1] + step2(j - 1));
    sec = sec.map(W);
    const why2 = alt2 ? `шаги чередуются: +${Math.abs(k2) + 1}, затем −1` : `номер каждый раз ${k2 > 0 ? 'растёт' : 'уменьшается'} на ${Math.abs(k2)}`;
    const numMode = L === 5 ? R.pick(['pos', 'double', 'plus']) : null, c = R.int(1, 9);
    const num = p => (numMode === 'pos' ? p + 1 : numMode === 'double' ? 2 * (p + 1) : p + 1 + c);
    const numDesc = numMode === 'pos' ? 'номер первой буквы в алфавите' : numMode === 'double' ? 'удвоенный номер первой буквы' : `номер первой буквы плюс ${c}`;
    const mk = (m, t, nm) => AB[W(m)] + AB[W(t)] + (numMode ? (nm == null ? num(W(m)) : nm) : '');
    const render = j => mk(main[j], sec[j]);
    const am = main[n], as = sec[n], correct = render(n);
    const pool = [mk(am + 1, as), mk(am - 1, as), mk(am, as + 1), mk(am, as - 1), mk(am + 1, as - 1), mk(as, am), mk(am + 2, as)];
    if (numMode) pool.push(mk(am, as, num(am) + 1), mk(am, as, num(am) - 1), mk(am, as, num(am) + 2));
    const { opts, a } = build(R, correct, pool, 5);
    const list = arr => arr.map(p => p + 1).join(', ');
    return {
      q: `<p class="iq-lead">Что продолжит ряд? У каждой части элемента своё правило. Алфавит без Ё и идёт по кругу: после Я снова А.</p><div class="iq-seq let">${main.slice(0, n).map((_, j) => `<span>${render(j)}</span>`).join('')}<span class="iq-ask">?</span></div>`,
      opts, a,
      ex: { a: `Первая буква (номера ${list(main)}): ${why}. Вторая буква (номера ${list(sec)}): ${why2}.${numMode ? ` Число — ${numDesc}.` : ''} Ответ: ${correct}.`, i: R.pick(I_PREFIX) + `${whyI}, а у второй буквы своя дорожка.${numMode ? ' А число выдаёт номер первой буквы — шпион ♡' : ''} Ответ — ${correct}.` }
    };
  }
  /* ---------- 4. лишнее число ---------- */
  const isPrime = n => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
  const digSum = n => String(n).split('').reduce((a, d) => a + +d, 0);
  function genOdd(R, L) {
    let good = [], bad, why, whyI;
    const uniq = (make, n) => { const s = new Set(); let g = 0; while (s.size < n && g++ < 500) s.add(make()); return [...s]; };
    if (L <= 2) {
      const m = L === 1 ? R.pick([2, 5, 10]) : R.pick([3, 4, 6, 7, 9]);
      const hi = L === 1 ? 99 : 199;
      good = uniq(() => m * R.int(Math.ceil(12 / m), Math.floor(hi / m)), 4);
      do { bad = R.int(12, hi); } while (bad % m === 0 || good.includes(bad));
      why = `Все числа, кроме ${bad}, делятся на ${m}.`; whyI = `четверо делятся на ${m} без остатка, а ${bad} — нет.`;
    } else if (L === 3) {
      good = uniq(() => R.int(4, 22) ** 2, 4);
      do { const k = R.int(4, 22); bad = k * k + R.pick([-2, -1, 1, 2, 3]); } while (Number.isInteger(Math.sqrt(bad)) || good.includes(bad));
      why = `${good.map(x => `${x} = ${Math.sqrt(x)}²`).join(', ')} — точные квадраты, а ${bad} — нет.`; whyI = `четверо — квадраты целых чисел, ${bad} притворяется.`;
    } else if (L === 4) {
      good = uniq(() => { let p; do { p = R.int(23, 199); } while (!isPrime(p)); return p; }, 4);
      const ps = [7, 11, 13, 17, 19];
      do { bad = R.pick(ps) * R.pick(ps); } while (bad > 361 || good.includes(bad));
      const f = ps.find(p => bad % p === 0);
      why = `${good.join(', ')} — простые числа. А ${bad} = ${f} · ${bad / f} — составное, хотя не делится на 2, 3 и 5.`; whyI = `${bad} только прикидывается простым: ${f} · ${bad / f}. Коварный ♡`;
    } else {
      if (R.chance(.5)) {
        const S = R.int(11, 19), mk = () => { let n; do { n = R.int(100, 999); } while (digSum(n) !== S); return n; };
        good = uniq(mk, 4);
        do { bad = R.int(100, 999); } while (Math.abs(digSum(bad) - S) !== 1);
        why = `У чисел ${good.join(', ')} сумма цифр равна ${S}, у ${bad} — ${digSum(bad)}.`; whyI = `сложи цифры каждого числа — у четверых выйдет ${S}.`;
      } else {
        const inc = n => { const s = String(n); for (let i = 1; i < s.length; i++) if (s[i] <= s[i - 1]) return false; return true; };
        good = uniq(() => { let n; do { n = R.int(1000, 9999); } while (!inc(n)); return n; }, 4);
        do { bad = R.int(1000, 9999); } while (inc(bad) || String(bad).split('').sort().join('') === String(bad) || new Set(String(bad)).size < 4);
        why = `В числах ${good.join(', ')} цифры строго возрастают слева направо, а в ${bad} — нет.`; whyI = 'у четверых цифры идут по возрастанию, как по лестнице вверх.';
      }
    }
    const list = R.shuffle([...good, bad]);
    return {
      q: `<p class="iq-lead">Какое число лишнее?</p><div class="iq-seq">${list.map(x => `<span>${x}</span>`).join('')}</div>`,
      opts: list.map(String), a: list.indexOf(bad),
      ex: { a: `${why} Ответ: ${bad}.`, i: R.pick(I_PREFIX) + whyI + ` Лишнее — ${bad}.` }
    };
  }

  /* ---------- 5. логическая цепочка ---------- */
  const PEOPLE = [['Аянокоджи', 0], ['Рюэн', 0], ['Кацураги', 0], ['Хирата', 0], ['Судо', 0], ['Нагумо', 0], ['Кандзаки', 0], ['Ямаути', 0],
    ['Хорикита', 1], ['Кусида', 1], ['Ичиносэ', 1], ['Сакаянаги', 1], ['Каруидзава', 1], ['Ибуки', 1], ['Мацусита', 1], ['Амасава', 1], ['Онодэра', 1]];
  const ATTRS = [
    { gt: () => 'выше, чем', lt: () => 'ниже, чем', lt2: 'ниже, чем', ngt: () => 'не выше, чем', top: 'Кто выше всех?', bot: 'Кто ниже всех?', place: 'по росту, если считать от самого высокого', all: 'Все разного роста.', sym: 'выше' },
    { gt: () => 'старше, чем', lt: () => 'младше, чем', lt2: 'младше, чем', ngt: () => 'не старше, чем', top: 'Кто старше всех?', bot: 'Кто младше всех?', place: 'по возрасту, если считать от самого старшего', all: 'Все разного возраста.', sym: 'старше' },
    { gt: f => `набрал${f ? 'а' : ''} больше баллов, чем`, lt: f => `набрал${f ? 'а' : ''} меньше баллов, чем`, lt2: 'меньше, чем', ngt: f => `набрал${f ? 'а' : ''} не больше баллов, чем`, top: 'Кто набрал больше всех баллов на экзамене?', bot: 'Кто набрал меньше всех баллов?', place: 'по баллам на экзамене, если считать от лучшего результата', all: 'Ни у кого баллы не совпали.', sym: 'больше баллов' },
    { gt: f => `пробежал${f ? 'а' : ''} быстрее, чем`, lt: f => `пробежал${f ? 'а' : ''} медленнее, чем`, lt2: 'медленнее, чем', ngt: f => `пробежал${f ? 'а' : ''} не быстрее, чем`, top: 'Кто пробежал быстрее всех?', bot: 'Кто пробежал медленнее всех?', place: 'в забеге, если считать от победителя', all: 'Никто не прибежал одновременно.', sym: 'быстрее' }
  ];
  function genOrder(R, L) {
    const n = [3, 4, 5, 5, 6][L - 1];
    const ppl = R.shuffle(PEOPLE).slice(0, n); // порядок = от большего к меньшему
    const A = R.pick(ATTRS);
    const name = k => ppl[k][0], fem = k => ppl[k][1];
    const st = [];
    const pairs = R.shuffle(Array.from({ length: n - 1 }, (_, k) => k));
    let used = new Set();
    if (L >= 4) {
      const mid = R.int(1, n - 2);
      st.push(`${name(mid)} ${A.gt(fem(mid))} ${name(mid + 1)}, но ${A.lt2} ${name(mid - 1)}.`);
      used.add(mid); used.add(mid - 1);
    }
    for (const k of pairs) {
      if (used.has(k)) continue;
      const neg = L === 5 && R.chance(.35);
      if (neg) st.push(`${name(k + 1)} ${A.ngt(fem(k + 1))} ${name(k)}.`);
      else if (R.chance(.5)) st.push(`${name(k)} ${A.gt(fem(k))} ${name(k + 1)}.`);
      else st.push(`${name(k + 1)} ${A.lt(fem(k + 1))} ${name(k)}.`);
    }
    if (L >= 4) { const i = R.int(0, n - 3), j = R.int(i + 2, n - 1); st.push(`${name(i)} ${A.gt(fem(i))} ${name(j)}.`); }
    const stmts = R.shuffle(st);
    const k = R.int(0, n - 1);
    const question = k === 0 ? A.top : k === n - 1 ? A.bot : `Кто на ${k + 1}-м месте ${A.place}?`;
    const names = ppl.map(p => p[0]);
    const list = R.shuffle(names);
    const chain = names.join(' → ');
    return {
      q: `<p class="iq-lead">${A.all}</p><ul class="iq-facts">${stmts.map(s => `<li>${s}</li>`).join('')}</ul><p class="iq-lead"><b>${question}</b></p>`,
      opts: list, a: list.indexOf(names[k]),
      ex: { a: `Соединяем условия в одну цепочку (слева — ${A.sym}): ${chain}. ${L >= 4 ? 'Одно из условий лишнее — оно лишь подтверждает цепочку. ' : ''}Ответ: ${names[k]}.`, i: R.pick(I_PREFIX) + `выстраиваем всех лесенкой: ${chain}. Ответ — ${names[k]} ♡` }
    };
  }

  /* ---------- 6. уравнения с символами ---------- */
  const SYM = ['★', '▲', '●', '■'];
  function genSymbols(R, L) {
    const S = i => `<b class="sy s${i}">${SYM[i]}</b>`;
    const v = [R.int(2, 9), R.int(2, 9), R.int(2, 9), R.int(2, 9)];
    let eqs = [], ask, ans, why;
    if (L === 1) {
      eqs = [[`${S(0)} + ${S(0)}`, 2 * v[0]], [`${S(0)} + ${S(1)}`, v[0] + v[1]]];
      ask = S(1); ans = v[1];
      why = `${SYM[0]} = ${2 * v[0]} : 2 = ${v[0]}; ${SYM[1]} = ${v[0] + v[1]} − ${v[0]} = ${v[1]}.`;
    } else if (L === 2) {
      eqs = [[`${S(0)} + ${S(0)} + ${S(0)}`, 3 * v[0]], [`${S(0)} × ${S(1)}`, v[0] * v[1]], [`${S(1)} + ${S(2)}`, v[1] + v[2]]];
      ask = S(2); ans = v[2];
      why = `${SYM[0]} = ${v[0]}, ${SYM[1]} = ${v[0] * v[1]} : ${v[0]} = ${v[1]}, ${SYM[2]} = ${v[1] + v[2]} − ${v[1]} = ${v[2]}.`;
    } else if (L === 3) {
      eqs = [[`${S(0)} × ${S(0)}`, v[0] * v[0]], [`${S(0)} + ${S(1)} + ${S(1)}`, v[0] + 2 * v[1]], [`${S(2)} − ${S(1)}`, v[2] - v[1]]];
      ask = `${S(0)} + ${S(1)} × ${S(2)}`; ans = v[0] + v[1] * v[2];
      why = `${SYM[0]} = ${v[0]}, ${SYM[1]} = ${v[1]}, ${SYM[2]} = ${v[2]}. Не забудь порядок действий: сначала умножение. ${v[0]} + ${v[1]} × ${v[2]} = ${ans}.`;
    } else if (L === 4) {
      if (v[0] <= v[1]) v[0] = v[1] + R.int(1, 5);
      eqs = [[`${S(0)} + ${S(1)}`, v[0] + v[1]], [`${S(0)} − ${S(1)}`, v[0] - v[1]], [`${S(2)} × ${S(0)}`, v[2] * v[0]], [`${S(3)} + ${S(2)} + ${S(2)}`, v[3] + 2 * v[2]]];
      ask = `${S(3)} × ${S(1)} − ${S(2)}`; ans = v[3] * v[1] - v[2];
      why = `Сложим первые два уравнения: 2·${SYM[0]} = ${2 * v[0]}, ${SYM[0]} = ${v[0]}, ${SYM[1]} = ${v[1]}. Тогда ${SYM[2]} = ${v[2]}, ${SYM[3]} = ${v[3]}. ${v[3]} × ${v[1]} − ${v[2]} = ${ans}.`;
    } else {
      eqs = [[`${S(0)} + ${S(1)}`, v[0] + v[1]], [`${S(1)} + ${S(2)}`, v[1] + v[2]], [`${S(0)} + ${S(2)}`, v[0] + v[2]], [`${S(3)} × ${S(1)} − ${S(0)}`, v[3] * v[1] - v[0]]];
      ask = `${S(3)} + ${S(2)} × ${S(0)}`; ans = v[3] + v[2] * v[0];
      const tot = v[0] + v[1] + v[2];
      why = `Сложим три первых уравнения: 2(${SYM[0]} + ${SYM[1]} + ${SYM[2]}) = ${2 * tot}, сумма трёх символов ${tot}. Отсюда ${SYM[2]} = ${tot} − ${v[0] + v[1]} = ${v[2]}, ${SYM[0]} = ${v[0]}, ${SYM[1]} = ${v[1]}, ${SYM[3]} = ${v[3]}. Значит, ${v[3]} + ${v[2]} × ${v[0]} = ${ans}.`;
    }
    const { opts, a } = build(R, ans, numPool(R, ans, [ans + v[0], ans - v[1], v[2] * v[0], (v[3] + v[2]) * v[0]]), 5);
    return {
      q: `<p class="iq-lead">Каждый символ обозначает число. Найди значение выражения.</p><div class="iq-eqs">${R.shuffle(eqs).map(([l, r]) => `<div>${l} = ${fmtN(r)}</div>`).join('')}<div class="iq-ask-eq">${ask} = ?</div></div>`,
      opts: opts.map(fmtN), a,
      ex: { a: `${why} Ответ: ${fmtN(ans)}.`, i: R.pick(I_PREFIX) + `сначала находим символ, который одинок в своём уравнении, потом остальных по цепочке. Ответ — ${fmtN(ans)}.` }
    };
  }

  /* ---------- 7. числовая таблица ---------- */
  const NG_RULES = [
    [1, (a, b) => a + b, 'третье число — сумма первых двух', '+'],
    [2, (a, b) => a * b, 'третье число — произведение первых двух', '×'],
    [2, (a, b) => a - b, 'третье число — разность первых двух', '−'],
    [3, (a, b) => (a + b) * 2, 'третье число — удвоенная сумма первых двух', '(a + b) × 2'],
    [3, (a, b) => a * b - a, 'третье число — произведение минус первое число', 'a × b − a'],
    [3, (a, b) => a * a + b, 'третье число — квадрат первого плюс второе', 'a² + b'],
    [4, (a, b) => (a - b) * (a - b), 'третье число — квадрат разности', '(a − b)²'],
    [4, (a, b) => a * b + a + b, 'третье число — произведение плюс оба числа', 'a × b + a + b'],
    [4, (a, b) => a * a - b * b, 'третье число — разность квадратов', 'a² − b²'],
    [5, (a, b) => a * b - (a + b), 'третье число — произведение минус сумма', 'a × b − (a + b)'],
    [5, (a, b) => a * a + b * b, 'третье число — сумма квадратов', 'a² + b²'],
    [5, (a, b) => (a + b) * (a + b) - a * b, 'третье число — квадрат суммы минус произведение', '(a + b)² − a × b'],
    [5, (a, b) => 2 * a * b - b, 'третье число — удвоенное произведение минус второе', '2 × a × b − b']
  ];
  function genNumgrid(R, L) {
    const pool = NG_RULES.filter(r => r[0] === L || (L >= 3 && r[0] === L - 1 && R.chance(.3)));
    const [, f, txt] = R.pick(pool.length ? pool : NG_RULES.filter(r => r[0] <= L));
    const hi = L >= 4 ? 12 : 9;
    const rows = [];
    for (let r = 0; r < 3; r++) { let a = R.int(2, hi), b = R.int(2, hi); if (a <= b) { const t = a; a = b + 1; b = t; } rows.push([a, b, f(a, b)]); }
    const ans = rows[2][2];
    const others = NG_RULES.map(r => r[1](rows[2][0], rows[2][1])).filter(x => x !== ans);
    const { opts, a } = build(R, ans, numPool(R, ans, others), 5);
    const cells = rows.map((row, r) => row.map((x, c) => (r === 2 && c === 2 ? '<span class="iq-ask">?</span>' : `<span>${fmtN(x)}</span>`)).join('')).join('');
    return {
      q: `<p class="iq-lead">В каждой строке числа связаны одним правилом. Какое число пропущено?</p><div class="ng">${cells}</div>`,
      opts: opts.map(fmtN), a,
      ex: { a: `В каждой строке ${txt}: ${rows.slice(0, 2).map(([x, y, z]) => `${x}, ${y} → ${z}`).join('; ')}. Для третьей строки: ${rows[2][0]}, ${rows[2][1]} → ${ans}.`, i: R.pick(I_PREFIX) + `${txt}. Проверила на двух строках — работает. Ответ — ${ans} ♡` }
    };
  }

  /* ---------- 8. поворот фигуры ---------- */
  const TF = {
    r90: g => g.map((row, i) => row.map((_, j) => g[g.length - 1 - j][i])),
    r180: g => g.map((row, i) => row.map((_, j) => g[g.length - 1 - i][g.length - 1 - j])),
    r270: g => g.map((row, i) => row.map((_, j) => g[j][g.length - 1 - i])),
    fh: g => g.map(row => row.slice().reverse()),
    fv: g => g.slice().reverse().map(row => row.slice()),
    tr: g => g.map((row, i) => row.map((_, j) => g[j][i])),
    at: g => { const n = g.length; return g.map((row, i) => row.map((_, j) => g[n - 1 - j][n - 1 - i])); },
    id: g => g.map(row => row.slice())
  };
  const TF_RU = { r90: 'повернуть на 90° по часовой стрелке', r180: 'повернуть на 180°', r270: 'повернуть на 90° против часовой стрелки', fh: 'отразить зеркально слева направо', fv: 'отразить сверху вниз' };
  const gkey = g => g.map(r => r.join('')).join('/');
  function gridSVG(g) {
    const n = g.length, s = 100 / n;
    let out = `<svg class="sp-cell" viewBox="-2 -2 104 104" aria-hidden="true"><rect class="sp-frame" x="0" y="0" width="100" height="100"/>`;
    g.forEach((row, i) => row.forEach((v, j) => { if (v) out += `<rect class="sp-on" x="${(j * s + 1).toFixed(1)}" y="${(i * s + 1).toFixed(1)}" width="${(s - 2).toFixed(1)}" height="${(s - 2).toFixed(1)}"/>`; }));
    for (let k = 1; k < n; k++) out += `<line class="sp-grid" x1="${(k * s).toFixed(1)}" y1="0" x2="${(k * s).toFixed(1)}" y2="100"/><line class="sp-grid" x1="0" y1="${(k * s).toFixed(1)}" x2="100" y2="${(k * s).toFixed(1)}"/>`;
    return out + '</svg>';
  }
  function genSpatial(R, L) {
    const n = [4, 4, 4, 5, 5][L - 1];
    let g, imgs;
    for (let guard = 0; guard < 200; guard++) {
      g = Array.from({ length: n }, () => Array.from({ length: n }, () => (R.chance(.45) ? 1 : 0)));
      const cnt = g.flat().reduce((a, b) => a + b, 0);
      if (cnt < 3 || cnt > n * n - 2) continue;
      imgs = Object.keys(TF).map(k => gkey(TF[k](g)));
      if (new Set(imgs).size === 8) break;
    }
    let ops;
    if (L === 1) ops = [R.pick(['fh', 'r180'])];
    else if (L === 2) ops = [R.pick(['r90', 'r270'])];
    else if (L === 3) ops = [R.pick(['r90', 'r270', 'fv'])];
    else ops = [R.pick(['r90', 'r270']), R.pick(['fh', 'fv'])];
    if (L === 5 && R.chance(.5)) ops = [R.pick(['r90', 'r270', 'r180']), R.pick(['fh', 'fv']), R.pick(['r90', 'r270'])];
    const ans = ops.reduce((acc, k) => TF[k](acc), g);
    const pool = Object.keys(TF).map(k => TF[k](g)).filter(x => gkey(x) !== gkey(ans));
    if (L >= 4) { const near = ans.map(r => r.slice()); const i = R.int(0, n - 1), j = R.int(0, n - 1); near[i][j] ^= 1; pool.push(near); }
    const { opts, a } = build(R, ans, pool, L >= 4 ? 6 : 4, gkey);
    const task = ops.map(k => TF_RU[k]).join(', затем ');
    return {
      q: `<p class="iq-lead">Узор нужно <b>${task}</b>. Что получится?</p><div class="sp-src">${gridSVG(g)}</div>`,
      opts: opts.map(gridSVG), a, wide: true,
      ex: { a: `Выполняем действия по порядку: ${task}. Удобно следить за угловыми клетками: при повороте на 90° по часовой верхняя строка становится правым столбцом, при зеркальном отражении левый край меняется местами с правым.`, i: R.pick(I_PREFIX) + 'выбери одну клетку-маячок у края и следи только за ней. Куда она уехала — там и ищи правильный узор ♡' }
    };
  }

  const GEN = { seq: genSeq, matrix: genMatrix, letters: genLetters, odd: genOdd, order: genOrder, symbols: genSymbols, numgrid: genNumgrid, spatial: genSpatial };

  /* ---------- выдача задания ---------- */
  let lastKind = '';
  function generate(level, kind, seen) {
    for (let tries = 0; tries < 25; tries++) {
      const seed = freshSeed();
      const R = rng(seed);
      const k = kind || R.pick(Object.keys(GEN).filter(x => x !== lastKind));
      let t;
      try { t = GEN[k](R, level); } catch (e) { console.error(e); continue; }
      if (!t || !Array.isArray(t.opts) || t.opts.length < 3 || !(t.a >= 0)) continue;
      const fp = fingerprint(k + '|' + level + '|' + t.q + '|' + t.opts.join('|'));
      if (seen && seen.has(fp)) continue;
      lastKind = k;
      return Object.assign(t, { kind: k, level, fp, id: `${level}·${fp.slice(0, 4)}-${fp.slice(4, 8)}-${fp.slice(8, 12)}` });
    }
    return null;
  }

  /* ---------- виды страниц ---------- */
  const A = () => window.AYK;
  const iqState = () => {
    const s = A().st;
    if (!s.iq) s.iq = {};
    const q = s.iq;
    q.lv = q.lv || {}; q.best = q.best || null; q.tests = q.tests || []; q.seen = q.seen || []; q.kinds = q.kinds || {};
    for (let l = 1; l <= 5; l++) q.lv[l] = q.lv[l] || { n: 0, ok: 0, streak: 0, top: 0 };
    return q;
  };
  const seenSet = () => new Set(iqState().seen);
  function remember(fp) { const q = iqState(); q.seen.push(fp); if (q.seen.length > 1500) q.seen.splice(0, q.seen.length - 1500); }
  const iqLabel = iq => iq >= 140 ? 'Белая комната' : iq >= 130 ? 'Класс A' : iq >= 115 ? 'Класс B' : iq >= 100 ? 'Класс C' : 'Класс D';

  function vIq() {
    const q = iqState(), ay = A();
    const lv = LEVELS.map(l => { const s = q.lv[l.n]; const pct = s.n ? Math.round(s.ok / s.n * 100) : 0; return `<a class="iq-lv" href="#iq-train-${l.n}" style="--lv:${l.n}"><span class="iq-lv-n">${l.n}</span><span class="iq-lv-name">${l.name}</span><span class="iq-lv-desc">${l.desc}</span><span class="iq-lv-pp">+${l.pp} PP за верный ответ</span><span class="iq-lv-st">${s.n ? `Решено ${s.n} · верно ${pct}% · рекордная серия ${s.top}` : 'Ещё не начато'}</span><span class="iq-lv-bars" aria-hidden="true">${'<i></i>'.repeat(l.n)}</span></a>`; }).join('');
    return `
<section class="wrap iq">
  <nav class="crumbs" aria-label="Навигация"><a href="#home">Главная</a><span>/</span><span aria-current="page">IQ</span></nav>
  <header class="iq-head"><p class="eyebrow">OAA · раздел 4</p><h1>Интеллект <span class="red">IQ</span></h1><p>Бесконечные задания на логику, закономерности и пространственное мышление. Каждое собирается заново из случайного зерна — у задания есть свой номер-отпечаток, и тебе никогда не выпадет то, что ты уже решал.</p></header>
  ${ay.vnHTML({ a: 'Интеллект тренируется так же, как мышцы: регулярно и с постепенно растущей нагрузкой. Начни с уровня, где ты решаешь больше половины задач. Если решаешь всё — переходи выше. Тренировка на слишком лёгком уровне — это не тренировка, а отдых.', i: 'Сэмпай, здесь задания никогда не заканчиваются ♡ Пять уровней: от «Класса D» до «Белой комнаты». Про последний уровень я кое-что знаю… Скажем так: там будет весело. Для меня.' })}
  <div class="iq-levels">${lv}</div>
  <a class="iq-test" href="#iq-test"><span class="iq-test-k">IQ-тест</span><span class="iq-test-t">24 задания · 25 минут · сложность подстраивается под тебя</span><span class="iq-test-b">${q.best ? `Лучший результат: <b>${q.best}</b> — ${iqLabel(q.best)}` : 'Ты ещё не проходил тест'}</span><span class="btn btn-red">Начать тест →</span></a>
  <h2 class="iq-h2">Типы заданий</h2>
  <div class="iq-kinds">${Object.entries(KINDS).map(([k, v]) => { const s = q.kinds[k]; return `<div class="iq-kind-c"><b>${v.name}</b><span>${v.desc}</span>${s && s.n ? `<i>верно ${Math.round(s.ok / s.n * 100)}% из ${s.n}</i>` : ''}</div>`; }).join('')}</div>
  <p class="fine">Как обеспечена уникальность: задание собирается из случайного зерна (около 10^28 вариантов) и получает номер — отпечаток содержимого. Номера решённых заданий запоминаются в твоём профиле, и генератор не выдаст их повторно. Совпадение с заданием другого человека практически невозможно. Оценка IQ в тесте ориентировочная: это тренажёр, а не клинический тест.</p>
</section>`;
  }

  /* --- тренировка --- */
  let cur = null, mode = null, test = null, timerId = 0;
  function vTrain({ lvl }) {
    const l = LEVELS[lvl - 1], s = iqState().lv[lvl];
    return `
<section class="wrap iq">
  <nav class="crumbs" aria-label="Навигация"><a href="#home">Главная</a><span>/</span><a href="#iq">IQ</a><span>/</span><span aria-current="page">Уровень ${lvl}</span></nav>
  <header class="iq-head iq-head-sm"><p class="eyebrow">Тренировка · уровень ${lvl} из 5</p><h1>${l.name}</h1>
    <div class="iq-lvtabs" role="tablist">${LEVELS.map(x => `<a href="#iq-train-${x.n}" role="tab" aria-selected="${x.n === lvl}" class="${x.n === lvl ? 'on' : ''}">${x.n}</a>`).join('')}</div>
    <ul class="l-tags" id="iqStats"><li>Решено: <b>${s.n}</b></li><li>Верно: <b>${s.ok}</b></li><li>Серия: <b id="iqStreak">${s.streak}</b></li><li>+${l.pp} PP за ответ</li></ul>
  </header>
  <div class="iq-stage" id="iqStage"></div>
</section>`;
  }
  function mTrain({ lvl }) { mode = { type: 'train', lvl }; nextTask(); keyOn(); }

  function nextTask() {
    const stage = document.getElementById('iqStage'); if (!stage) return;
    const lvl = mode.type === 'train' ? mode.lvl : test.lvl;
    cur = generate(lvl, null, seenSet());
    if (!cur) { stage.innerHTML = '<p>Не удалось собрать задание. Попробуй ещё раз.</p>'; return; }
    cur.t0 = Date.now(); cur.done = false;
    const ay = A();
    const head = mode.type === 'test'
      ? `<div class="iq-tbar"><span>Задание ${test.i + 1} из ${test.n}</span><span class="iq-tlv">Сложность: ${'<i></i>'.repeat(lvl)}${'<i class="off"></i>'.repeat(5 - lvl)}</span><span id="iqClock" class="iq-clock">${clock()}</span></div><div class="xm-dots">${test.items.map(it => `<i class="${it.ok ? 'ok' : 'bad'}"></i>`).join('')}<i class="cur"></i>${'<i></i>'.repeat(Math.max(0, test.n - test.items.length - 1))}</div>`
      : '';
    stage.innerHTML = `${head}<div class="iq-card"><div class="iq-top"><span class="iq-kind">${KINDS[cur.kind].name}</span><span class="iq-id" title="Номер задания — отпечаток его содержимого">№ ${cur.id}</span></div>
<div class="iq-q">${cur.q}</div>
<div class="iq-opts${cur.wide ? ' wide' : ''} n${cur.opts.length}">${cur.opts.map((o, j) => `<button type="button" data-iq="${j}"><span class="k">${j + 1}</span><span class="v">${o}</span></button>`).join('')}</div>
${mode.type === 'train' ? `<div class="iq-tools"><button type="button" class="btn" data-act="iqhint">Подсказка</button><button type="button" class="btn" data-act="iqskip">Другое задание</button></div><div class="iq-hint" id="iqHint" hidden>${ay.sayHTML(HINT[cur.kind])}</div>` : ''}
<div class="iq-after" id="iqAfter" hidden></div></div>`;
  }

  function answer(j) {
    if (!cur || cur.done) return;
    cur.done = true;
    const ok = j === cur.a, ay = A(), q = iqState();
    remember(cur.fp);
    document.querySelectorAll('.iq-opts button').forEach((b, k) => { b.disabled = true; if (k === cur.a) b.classList.add('ok'); if (k === j && !ok) b.classList.add('bad'); });
    const ks = q.kinds[cur.kind] = q.kinds[cur.kind] || { n: 0, ok: 0 };
    ks.n++; if (ok) ks.ok++;
    const after = document.getElementById('iqAfter');
    if (mode.type === 'train') {
      const s = q.lv[mode.lvl];
      s.n++; if (ok) { s.ok++; s.streak++; s.top = Math.max(s.top, s.streak); } else s.streak = 0;
      ay.save();
      if (ok) ay.addPP(LEVELS[mode.lvl - 1].pp, `IQ · уровень ${mode.lvl}`);
      const st = document.getElementById('iqStreak'); if (st) st.textContent = s.streak;
      const verdict = ok ? (s.streak >= 5 && s.streak % 5 === 0 ? `Верно. Серия ${s.streak} — пора подумать о следующем уровне.` : 'Верно.') : 'Неверно. Разбор ниже.';
      after.innerHTML = `<p class="iq-verdict ${ok ? 'ok' : 'bad'}">${verdict}</p>${ay.vnHTML(cur.ex)}<button type="button" class="btn btn-red" data-act="iqnext">Следующее задание → <kbd>Enter</kbd></button>`;
      if (ok && s.streak && s.streak % 5 === 0) ay.burst(after.querySelector('.iq-verdict'));
    } else {
      test.items.push({ lvl: test.lvl, ok, kind: cur.kind, sec: (Date.now() - cur.t0) / 1000 });
      ay.save();
      after.innerHTML = `<p class="iq-verdict ${ok ? 'ok' : 'bad'}">${ok ? 'Верно.' : 'Неверно.'}</p><details class="iq-why"><summary>Разбор</summary>${ay.sayHTML(cur.ex)}</details><button type="button" class="btn btn-red" data-act="iqnext">${test.items.length < test.n ? 'Дальше →' : 'Результат'} <kbd>Enter</kbd></button>`;
      test.lvl = Math.max(1, Math.min(5, test.lvl + (ok ? 1 : -1)));
    }
    after.hidden = false;
    ay.typeVN(after);
    const btn = after.querySelector('[data-act="iqnext"]'); if (btn) btn.focus({ preventScroll: true });
  }

  /* --- IQ-тест --- */
  const TEST_N = 24, TEST_SEC = 25 * 60;
  function clock() { if (!test) return ''; const left = Math.max(0, Math.round(TEST_SEC - (Date.now() - test.t0) / 1000)); return `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`; }
  function vTest() {
    const q = iqState(), ay = A();
    return `
<section class="wrap iq">
  <nav class="crumbs" aria-label="Навигация"><a href="#home">Главная</a><span>/</span><a href="#iq">IQ</a><span>/</span><span aria-current="page">IQ-тест</span></nav>
  <header class="iq-head iq-head-sm"><p class="eyebrow">Специальный экзамен · IQ</p><h1>IQ-тест</h1></header>
  <div class="iq-stage" id="iqStage">
    ${ay.vnHTML({ a: 'Правила простые. 24 задания, 25 минут. Ответил верно — следующее задание сложнее, ошибся — проще. Подсказок нет. Думай столько, сколько нужно, но помни о времени.', i: 'Сэмпай, это как специальный экзамен в нашей школе: всё по-честному ♡ В конце я скажу твой ориентировочный IQ. Обещаю не смеяться. Наверное.' })}
    <ul class="iq-rules"><li>24 задания восьми типов, сложность от 1 до 5 подстраивается под ответы.</li><li>25 минут на весь тест; когда время выйдет, тест завершится сам.</li><li>Ответ выбирается один раз, изменить его нельзя. Клавиши 1–6 — быстрый выбор.</li><li>Итог — ориентировочная оценка IQ и разбор по типам задач.</li></ul>
    ${q.best ? `<p>Твой лучший результат: <b>${q.best}</b> (${iqLabel(q.best)}).</p>` : ''}
    <button type="button" class="btn btn-red" data-act="iqstart">Начать тест</button>
  </div>
</section>`;
  }
  function mTest() { A().typeVN(); keyOn(); }
  function startTest() {
    mode = { type: 'test' };
    test = { i: 0, n: TEST_N, lvl: 2, items: [], t0: Date.now() };
    clearInterval(timerId);
    timerId = setInterval(() => {
      const c = document.getElementById('iqClock'); if (c) c.textContent = clock();
      if (Date.now() - test.t0 >= TEST_SEC * 1000) { clearInterval(timerId); finishTest(true); }
    }, 1000);
    A().onCleanup(() => clearInterval(timerId));
    nextTask();
  }
  function finishTest(timeout) {
    clearInterval(timerId);
    const stage = document.getElementById('iqStage'); if (!stage || !test) return;
    const ay = A(), q = iqState(), items = test.items;
    const tail = items.slice(-10);
    const ability = items.length ? tail.reduce((s, it) => s + it.lvl, 0) / tail.length + ((items.filter(i => i.ok).length / items.length) - .5) * 2 : 0;
    const answered = items.length / TEST_N;
    const iq = Math.max(70, Math.min(150, Math.round((70 + (ability - .5) * 16) * (.85 + .15 * answered))));
    const prev = q.best || 0;
    q.tests.push({ iq, t: Date.now(), n: items.length }); if (q.tests.length > 30) q.tests.shift();
    if (iq > prev) q.best = iq;
    ay.save();
    const bonus = Math.max(0, iq - 70) * 2;
    if (bonus) ay.addPP(bonus, 'IQ-тест пройден');
    const byKind = {};
    items.forEach(it => { const k = byKind[it.kind] = byKind[it.kind] || { n: 0, ok: 0 }; k.n++; if (it.ok) k.ok++; });
    const say = iq >= 140 ? { a: 'Результат уровня Белой комнаты. Я не ожидал. Впрочем, я вообще редко чего-то ожидаю.', i: 'Сэмпай… ты точно не из Белой комнаты? Я бы запомнила такое лицо ♡' }
      : iq >= 120 ? { a: 'Высокий результат. Посмотри на типы задач с наименьшей точностью — там остался запас роста.', i: 'Ого! Ты умнее, чем выглядишь. Это комплимент, честно ♡' }
        : iq >= 100 ? { a: 'Средний уровень и выше. Тренировка на уровнях 3–4 даст заметный прирост через пару недель.', i: 'Неплохо, сэмпай! Ещё немного тренировок — и будешь пугать учителей.' }
          : { a: 'Начни с тренировки на уровнях 1–2. Скорость приходит с узнаванием типов задач, а не с талантом.', i: 'Не грусти, сэмпай. IQ-тест измеряет навык решать такие задачи, а навык тренируется. Я помогу ♡' };
    stage.innerHTML = `<div class="xm-res iq-res"><p class="eyebrow">Результат${timeout ? ' · время вышло' : ''}</p><div class="xm-score">${iq}<small> IQ</small></div><p class="iq-res-l">${iqLabel(iq)}${iq > prev && prev ? ' · новый рекорд!' : ''}</p>
${ay.vnHTML(say)}
<div><p class="lbl">Точность по типам задач</p><div class="iq-bars">${Object.entries(byKind).map(([k, v]) => `<div><span>${KINDS[k].name}</span><span class="bar"><i style="width:${Math.round(v.ok / v.n * 100)}%"></i></span><b>${v.ok}/${v.n}</b></div>`).join('')}</div></div>
<p class="fine">Решено заданий: ${items.length} из ${TEST_N}, верно: ${items.filter(i => i.ok).length}. Оценка ориентировочная: она учитывает, до какого уровня сложности ты дошёл и сколько ответил верно.</p>
<div class="cta"><button type="button" class="btn btn-red" data-act="iqstart">Пройти ещё раз</button><a class="btn" href="#iq">К разделу IQ</a></div></div>`;
    ay.typeVN(stage);
    if (iq >= 120) ay.burst(stage.querySelector('.xm-score'));
    test = null; mode = { type: 'idle' };
  }

  /* --- клавиатура и действия --- */
  let keyBound = false;
  function keyOn() {
    if (keyBound) return; keyBound = true;
    document.addEventListener('keydown', e => {
      if (!document.getElementById('iqStage') || !cur) return;
      const tag = (e.target.tagName || '').toLowerCase(); if (tag === 'input' || tag === 'textarea') return;
      if (/^[1-6]$/.test(e.key) && !cur.done) { const j = +e.key - 1; if (j < cur.opts.length) { e.preventDefault(); answer(j); } }
      else if (e.key === 'Enter' && cur.done) { const b = document.querySelector('[data-act="iqnext"]'); if (b) { e.preventDefault(); b.click(); } }
    });
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-iq]'); if (b) { answer(+b.dataset.iq); return; }
    const a = e.target.closest('[data-act]'); if (!a) return;
    const act = a.dataset.act;
    if (act === 'iqnext') {
      if (mode && mode.type === 'test') { test.i = test.items.length; if (test.items.length >= test.n) finishTest(false); else nextTask(); }
      else nextTask();
      const s = document.getElementById('iqStage'); if (s) s.scrollIntoView({ block: 'start', behavior: 'smooth' });
    } else if (act === 'iqskip') { if (cur && !cur.done) remember(cur.fp); nextTask(); }
    else if (act === 'iqhint') { const h = document.getElementById('iqHint'); if (h) { h.hidden = false; A().autoSay(h); } }
    else if (act === 'iqstart') startTest();
  });

  window.IQ = {
    LEVELS, KINDS, generate, iqLabel,
    views: { iq: vIq, iqtrain: vTrain, iqtest: vTest },
    mounts: { iq: () => A().typeVN(), iqtrain: mTrain, iqtest: mTest },
    leave: () => { clearInterval(timerId); cur = null; test = null; }
  };
})();
