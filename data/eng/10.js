L('eng', 10, {
  m: 35,
  intro: 'Будущее на уровне B2 — это уже не только планы, но и взгляд из будущего: что будет происходить в определённый момент и что успеет завершиться к нему. Future Continuous и Future Perfect помогают говорить о карьере, прогнозах и сроках точнее. Добавим также выражения be due to, be set to и вежливые вопросы о планах.',
  intro2: 'Senpai, «This time next year I’ll be studying in Tokyo» ♡ Представь себя через год — что ты будешь делать прямо в тот момент? Вот это и есть Future Continuous. А «By then I’ll have learnt Japanese» — уже итог. Мечтаем грамматически!',
  goals: [
    'Употреблять Future Continuous для действия в процессе в будущем',
    'Употреблять Future Perfect для результата к моменту в будущем',
    'Задавать вежливые вопросы о планах с Future Continuous',
    'Использовать be due to, be set to, be on the point of'
  ],
  c: `
<h3>Future Continuous</h3>
<p><b>will be + V-ing</b> — действие будет в процессе в определённый момент будущего.</p>
<ul class="ex-l">
<li><span lang="en">This time tomorrow I’ll be flying to Tokyo.</span><span class="tr">Завтра в это время я буду лететь в Токио.</span></li>
<li><span lang="en">Don’t call at eight — we’ll be having dinner.</span><span class="tr">Не звони в восемь — мы будем ужинать.</span></li>
<li><span lang="en">Will you be using the car tonight?</span><span class="tr">Ты будешь пользоваться машиной вечером? (вежливый вопрос перед просьбой)</span></li>
</ul>
<div class="ichika">Последний пример — секретное оружие вежливости ♡ <span lang="en">Will you be using the car?</span> звучит мягче, чем <span lang="en">Will you use the car?</span>: ты как будто интересуешься планами, а не давишь. А потом уже просишь машину!</div>

<h3>Future Perfect</h3>
<p><b>will have + V3</b> — действие завершится к определённому моменту в будущем. Почти всегда с <span lang="en">by</span> (к) или <span lang="en">by the time</span>.</p>
<ul class="ex-l">
<li><span lang="en">By 2030 I will have graduated from university.</span><span class="tr">К 2030 году я окончу университет.</span></li>
<li><span lang="en">By the time you get home, I’ll have cooked dinner.</span><span class="tr">К тому времени, как ты придёшь, я приготовлю ужин.</span></li>
<li><span lang="en">Next month we will have been married for ten years.</span><span class="tr">В следующем месяце будет десять лет, как мы женаты (Future Perfect Continuous — длительность к моменту).</span></li>
</ul>
<div class="warn"><p><span lang="en">by</span> = «к (моменту)», а <span lang="en">until</span> = «до (всё это время)». <span lang="en">I’ll have finished by Friday</span> — закончу не позже пятницы. <span lang="en">I’ll be working until Friday</span> — буду работать всё время до пятницы.</p></div>

<h3>Будущее в официальной речи и новостях</h3>
<div class="tbl"><table><thead><tr><th>Выражение</th><th>Значение</th><th>Пример</th></tr></thead><tbody>
<tr><td lang="en">be due to</td><td>по плану / ожидается</td><td lang="en">The train is due to arrive at 6.15.</td></tr>
<tr><td lang="en">be set to</td><td>вот-вот, должно (в новостях)</td><td lang="en">Prices are set to rise next year.</td></tr>
<tr><td lang="en">be on the point of / be on the verge of</td><td>на грани того, чтобы</td><td lang="en">The company is on the verge of bankruptcy.</td></tr>
<tr><td lang="en">be to + V</td><td>официальный план, распоряжение</td><td lang="en">The President is to visit Japan in May.</td></tr>
</tbody></table></div>

<h3>Будущее в прошлом</h3>
<p>Когда мы рассказываем о прошлом, «будущее» сдвигается: <span lang="en">will → would, am going to → was going to</span>.</p>
<ul class="ex-l">
<li><span lang="en">I knew she would be late.</span><span class="tr">Я знал, что она опоздает.</span></li>
<li><span lang="en">Little did they know that this trip would change their lives.</span><span class="tr">Они и не подозревали, что эта поездка изменит их жизнь.</span></li>
</ul>
<div class="ayano">Future Perfect хорош для постановки целей. Сформулируй цель как результат к дате: <span lang="en">By June I will have read five books in English.</span> Такая формулировка заставляет думать о сроке и проверяемом результате. Попробуй написать три цели на год именно так — это упражнение и по грамматике, и по планированию.</div>
`,
  p: [
    { q: 'Поставь глагол: <span lang="en">At 10 a.m. tomorrow I (sit) my maths exam.</span>', a: '<span lang="en">I’ll be sitting</span> — процесс в момент будущего.' },
    { q: 'Поставь глагол: <span lang="en">By the end of the year, they (build) the new stadium.</span>', a: '<span lang="en">will have built</span> — результат к моменту.' },
    { q: 'by или until: <span lang="en">I’ll be at work ___ six. I’ll have finished the report ___ six.</span>', a: '<span lang="en">until</span>; <span lang="en">by</span>.' },
    { q: 'Вежливо спроси, будет ли сосед пользоваться принтером.', a: '<span lang="en">Will you be using the printer?</span>' },
    { q: 'Переведи: «Самолёт должен приземлиться в 11:30».', a: '<span lang="en">The plane is due to land at 11:30.</span>' },
    { q: 'Сформулируй цель: к лету прочитать 10 книг.', a: '<span lang="en">By the summer I will have read ten books.</span>' }
  ],
  q: [
    { q: '<span lang="en">This time next week I ___ on the beach.</span>', o: ['lie', 'will be lying', 'will have lain', 'am lying'], a: 1, e: 'Future Continuous.' },
    { q: '<span lang="en">By 2030 scientists ___ a cure.</span>', o: ['will find', 'will have found', 'will be finding', 'find'], a: 1, e: 'Future Perfect.' },
    { q: '<span lang="en">The meeting is ___ to start at noon.</span>', o: ['due', 'set on', 'about', 'point'], a: 0, e: 'be due to.' },
    { q: '«к пятнице» по-английски:', o: ['until Friday', 'by Friday', 'till Friday', 'since Friday'], a: 1, e: 'by — не позже.' },
    { q: '<span lang="en">I knew she ___ come.</span>', o: ['will', 'would', 'is going', 'shall'], a: 1, e: 'Будущее в прошлом.' }
  ],
  s: [
    'Future Continuous = will be + V-ing: процесс в момент будущего; вежливые вопросы о планах.',
    'Future Perfect = will have + V3: результат к моменту (by, by the time).',
    'Future Perfect Continuous: will have been + V-ing — длительность к моменту.',
    'by — к, не позже; until — до, всё это время.',
    'Официально: be due to, be set to, be on the verge of, be to.',
    'Будущее в прошлом: would, was going to.'
  ]
});
