L('english', 2, {
  m: 35,
  intro: 'Чтобы рассказать историю, нужны два прошедших времени: Past Simple для последовательности событий и Past Continuous для фона и длительных действий. Разберём образование (в том числе неправильные глаголы), употребление, сочетание времён с when и while, а также конструкцию used to.',
  intro2: 'Senpai, imagine ♡ «I was walking home when it started to rain». Сначала фон (шёл домой — Continuous), потом событие, которое его прервало (начался дождь — Simple). Это основа любой истории на английском. Сегодня научимся рассказывать так, чтобы было понятно, что случилось и когда.',
  goals: [
    'Образовывать Past Simple правильных и неправильных глаголов',
    'Образовывать и употреблять Past Continuous',
    'Сочетать времена с when и while',
    'Использовать used to для прошлых привычек'
  ],
  c: `
<h3>Past Simple</h3>
<div class="tbl"><table><thead><tr><th>Форма</th><th>Схема</th><th>Пример</th></tr></thead><tbody>
<tr><td>Утверждение</td><td>V-ed (правильные) / 2-я форма (неправильные)</td><td>I played. She went.</td></tr>
<tr><td>Отрицание</td><td>didn’t + V</td><td>She didn’t go.</td></tr>
<tr><td>Вопрос</td><td>Did + подлежащее + V?</td><td>Did she go?</td></tr>
</tbody></table></div>
<div class="warn"><p>После <b>did</b> и <b>didn’t</b> глагол стоит в начальной форме: <i>Did you see?</i> (не «saw»), <i>I didn’t go</i> (не «went»). Прошедшее время уже выражено вспомогательным глаголом.</p></div>
<p>Правописание -ed: stop → sto<b>pp</b>ed, study → stud<b>ied</b>, play → play<b>ed</b>, like → lik<b>ed</b>. Глагол be: was (I, he, she, it), were (you, we, they).</p>
<div class="tbl"><table><thead><tr><th>Частые неправильные глаголы</th></tr></thead><tbody>
<tr><td>be — was/were — been; begin — began — begun; buy — bought — bought; come — came — come; do — did — done; eat — ate — eaten; find — found — found; get — got — got; give — gave — given; go — went — gone; have — had — had; know — knew — known; make — made — made; meet — met — met; see — saw — seen; take — took — taken; think — thought — thought; write — wrote — written</td></tr>
</tbody></table></div>
<p>Употребление: законченное действие в прошлом в определённое время; последовательность событий. Маркеры: <b>yesterday, last week/year, ago, in 2010, when I was a child</b>.</p>

<h3>Past Continuous</h3>
<div class="tbl"><table><thead><tr><th>Форма</th><th>Схема</th><th>Пример</th></tr></thead><tbody>
<tr><td>Утверждение</td><td>was / were + V-ing</td><td>I was reading. They were playing.</td></tr>
<tr><td>Отрицание</td><td>wasn’t / weren’t + V-ing</td><td>He wasn’t sleeping.</td></tr>
<tr><td>Вопрос</td><td>Was / Were + подлежащее + V-ing?</td><td>What were you doing at 8 p.m.?</td></tr>
</tbody></table></div>
<div class="tbl"><table><thead><tr><th>Употребление</th><th>Пример</th></tr></thead><tbody>
<tr><td>Действие в процессе в определённый момент прошлого</td><td>At 7 o’clock yesterday I was having dinner.</td></tr>
<tr><td>Длительное действие, прерванное другим</td><td>I was having a shower when the phone rang.</td></tr>
<tr><td>Два параллельных длительных действия</td><td>While Mum was cooking, Dad was watching TV.</td></tr>
<tr><td>Фон, атмосфера в рассказе</td><td>The sun was shining and the birds were singing.</td></tr>
</tbody></table></div>
<div class="ichika">Запоминалка ♡ <b>when</b> + короткое событие (Simple), <b>while</b> + длительный процесс (Continuous). «I was sleeping <b>when</b> the alarm rang». «<b>While</b> I was sleeping, someone called». Длинное — Continuous, «выстрел» — Simple.</div>
<div class="ex" data-t="Последовательность или параллель?"><ol><li>When I came home, my sister <b>cooked</b> dinner. — сначала я пришёл, потом она приготовила (последовательность).</li><li>When I came home, my sister <b>was cooking</b> dinner. — она уже готовила, когда я пришёл (процесс).</li></ol><p>Одно слово меняет смысл всей истории.</p></div>

<h3>Used to</h3>
<p><b>Used to + V</b> — прошлые привычки и состояния, которых больше нет: <i>I used to play the violin</i> (раньше играл, сейчас нет). Отрицание и вопрос: <i>I didn’t use to like fish. Did you use to live here?</i> (после did — use без -d).</p>
<div class="warn"><p>Не путайте <b>used to do</b> (раньше делал) и <b>be used to doing</b> (привык делать): <i>I’m used to getting up early</i> — я привык рано вставать.</p></div>
<div class="ayano">Рассказ на английском — это всегда два слоя: фон и события. Фон (что происходило) — Past Continuous, события (что случилось) — Past Simple. Если пишешь историю для экзамена или письма, начни с фона в Continuous, а потом двигай сюжет короткими действиями в Simple. Такой текст звучит естественно.</div>
`,
  p: [
    { q: 'Поставьте глаголы: I (see) Tom yesterday. He (not / recognize) me.', a: 'I saw Tom yesterday. He didn’t recognize me.' },
    { q: 'Поставьте глаголы: What (you / do) at 9 p.m. yesterday? — I (watch) a film.', a: 'What were you doing at 9 p.m. yesterday? — I was watching a film.' },
    { q: 'Соедините when: I (walk) in the park. I (meet) an old friend.', a: 'I was walking in the park when I met an old friend.' },
    { q: 'Напишите три формы: buy, write, think, begin.', a: 'buy — bought — bought; write — wrote — written; think — thought — thought; begin — began — begun.' },
    { q: 'Переведите: «Раньше я жил в деревне».', a: 'I used to live in a village.' },
    { q: 'Найдите ошибку: Did you went to the cinema?', a: 'После did — начальная форма: Did you go to the cinema?' }
  ],
  q: [
    { q: 'She ___ to London last summer.', o: ['go', 'goes', 'went', 'was going'], a: 2, e: 'Законченное действие, last summer.' },
    { q: 'I ___ TV when the lights went out.', o: ['watched', 'was watching', 'watch', 'am watching'], a: 1, e: 'Прерванный процесс.' },
    { q: 'Did you ___ the news?', o: ['heard', 'hear', 'hearing', 'hears'], a: 1, e: 'После did — начальная форма.' },
    { q: '___ I was doing my homework, my brother was playing games.', o: ['When', 'While', 'Ago', 'Since'], a: 1, e: 'Два параллельных процесса.' },
    { q: 'He ___ smoke, but he gave up.', o: ['used to', 'is used to', 'uses to', 'was using'], a: 0, e: 'Прошлая привычка.' }
  ],
  s: [
    'Past Simple: V-ed или 2-я форма; did/didn’t + начальная форма.',
    'Употребление: законченные действия в прошлом, последовательность; yesterday, ago, last.',
    'Past Continuous: was/were + V-ing; процесс в момент прошлого, фон.',
    'when + событие (Simple), while + процесс (Continuous).',
    'used to + V — прошлые привычки; be used to + V-ing — привык.',
    'Неправильные глаголы: go — went — gone, see — saw — seen, write — wrote — written…'
  ]
});
