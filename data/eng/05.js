L('eng', 5, {
  m: 40,
  intro: 'Модальные глаголы выражают отношение говорящего: можно, нужно, стоит, вероятно. На B1 важно не только знать их значения, но и чувствовать разницу между похожими: must и have to, mustn’t и don’t have to, might и will probably. Сегодня соберём систему «обязанность — совет — вероятность».',
  intro2: 'Senpai, «You mustn’t eat that» и «You don’t have to eat that» — первое значит «нельзя!», второе — «можно не есть, если не хочешь» ♡ Перепутаешь — и вместо вежливого совета получится запрет. Сегодня этого не случится!',
  goals: [
    'Различать must, have to, need to и should',
    'Не путать mustn’t и don’t have to',
    'Выражать вероятность: must, might, may, could, can’t',
    'Использовать be able to, be allowed to и другие эквиваленты'
  ],
  c: `
<h3>Обязанность и необходимость</h3>
<div class="tbl"><table><thead><tr><th>Форма</th><th>Оттенок</th><th>Пример</th></tr></thead><tbody>
<tr><td lang="en">must</td><td>обязанность по мнению говорящего, строгое правило</td><td lang="en">I must call my mum. Passengers must wear seat belts.</td></tr>
<tr><td lang="en">have to</td><td>необходимость из-за внешних обстоятельств; есть все времена</td><td lang="en">I have to get up at six for work. We had to wait.</td></tr>
<tr><td lang="en">need to</td><td>нужно для цели</td><td lang="en">You need to register before the exam.</td></tr>
<tr><td lang="en">mustn’t</td><td>запрещено</td><td lang="en">You mustn’t park here.</td></tr>
<tr><td lang="en">don’t have to / needn’t</td><td>не обязательно</td><td lang="en">You don’t have to come if you’re busy.</td></tr>
</tbody></table></div>
<div class="warn"><p><span lang="en">You mustn’t tell anyone</span> — «никому нельзя говорить». <span lang="en">You don’t have to tell anyone</span> — «можешь никому не говорить». Противоположный смысл!</p></div>

<h3>Совет и критика</h3>
<ul class="ex-l">
<li><span lang="en">You should see a doctor.</span><span class="tr">Тебе стоит сходить к врачу.</span></li>
<li><span lang="en">You ought to apologise.</span><span class="tr">Тебе следовало бы извиниться (чуть формальнее, чем should).</span></li>
<li><span lang="en">You’d better hurry, or you’ll miss the bus.</span><span class="tr">Лучше поторопись, иначе опоздаешь (совет с угрозой последствий).</span></li>
<li><span lang="en">If I were you, I’d take the job.</span><span class="tr">На твоём месте я бы согласился на эту работу.</span></li>
</ul>

<h3>Вероятность в настоящем</h3>
<div class="rule" data-t="Шкала уверенности"><p><span lang="en">must</span> (почти наверняка) → <span lang="en">should</span> (ожидаемо) → <span lang="en">may / might / could</span> (возможно) → <span lang="en">can’t</span> (не может быть).</p></div>
<ul class="ex-l">
<li><span lang="en">She’s not answering. She must be asleep.</span><span class="tr">Она, должно быть, спит.</span></li>
<li><span lang="en">He might be stuck in traffic.</span><span class="tr">Возможно, он застрял в пробке.</span></li>
<li><span lang="en">That can’t be Anna — she’s in Spain.</span><span class="tr">Это не может быть Анна.</span></li>
</ul>
<div class="warn"><p>Противоположность <span lang="en">must</span> в значении вероятности — <span lang="en">can’t</span>, а не <s>mustn’t</s>. <span lang="en">He mustn’t be at home</span> звучит как «ему запрещено быть дома».</p></div>

<h3>Способность и разрешение</h3>
<div class="tbl"><table><thead><tr><th>Значение</th><th>Настоящее</th><th>Прошлое</th><th>Будущее</th></tr></thead><tbody>
<tr><td>способность</td><td lang="en">can / am able to</td><td lang="en">could / was able to</td><td lang="en">will be able to</td></tr>
<tr><td>разрешение</td><td lang="en">can / may / am allowed to</td><td lang="en">could / was allowed to</td><td lang="en">will be allowed to</td></tr>
</tbody></table></div>
<p>Для одного конкретного успешного случая в прошлом используют <span lang="en">was able to / managed to</span>, а не could: <span lang="en">The fire spread quickly, but everyone was able to escape.</span></p>
<div class="ichika">Could в прошлом — это общая способность: <span lang="en">I could swim when I was five</span> ♡ А если речь про один трудный случай — «смог, справился» — говори <span lang="en">managed to</span>. Это любимая ловушка экзаменов!</div>
<div class="ayano">Модальные глаголы удобно учить как две оси. Первая — «обязанность»: must, have to, should, don’t have to, mustn’t. Вторая — «вероятность»: must, might, can’t. Один и тот же глагол must стоит на обеих осях, поэтому смысл определяется контекстом: о правилах или о догадках идёт речь.</div>
`,
  p: [
    { q: 'mustn’t или don’t have to: <span lang="en">You ___ wear a uniform on Fridays — it’s optional.</span>', a: '<span lang="en">don’t have to</span> — необязательно.' },
    { q: 'mustn’t или don’t have to: <span lang="en">You ___ use your phone during the test.</span>', a: '<span lang="en">mustn’t</span> — запрещено.' },
    { q: 'Выскажи догадку: свет в окнах горит — значит, соседи дома.', a: '<span lang="en">They must be at home.</span>' },
    { q: 'Выбери: <span lang="en">After three hours, we (could / were able to) fix the car.</span>', a: '<span lang="en">were able to</span> (или <span lang="en">managed to</span>) — один конкретный успех.' },
    { q: 'Дай совет другу, который всё время опаздывает.', a: '<span lang="en">You should leave home earlier.</span> / <span lang="en">You’d better set an alarm.</span>' },
    { q: 'Переведи: «Это не может быть правдой».', a: '<span lang="en">It can’t be true.</span>' }
  ],
  q: [
    { q: 'Запрет выражает:', o: ['don’t have to', 'mustn’t', 'needn’t', 'might not'], a: 1, e: 'mustn’t — нельзя.' },
    { q: '<span lang="en">Yesterday I ___ stay late at work.</span>', o: ['must', 'had to', 'have to', 'should'], a: 1, e: 'Прошедшее время — had to.' },
    { q: 'Почти уверен, что это так:', o: ['He might be tired.', 'He must be tired.', 'He can be tired.', 'He should tired.'], a: 1, e: 'must — сильная уверенность.' },
    { q: 'Противоположность must в значении вероятности:', o: ['mustn’t', 'can’t', 'needn’t', 'shouldn’t'], a: 1, e: 'can’t be.' },
    { q: '<span lang="en">You’d better ___ now.</span>', o: ['to leave', 'leave', 'leaving', 'left'], a: 1, e: 'had better + V без to.' }
  ],
  s: [
    'must — обязанность по мнению говорящего; have to — из-за обстоятельств; need to — для цели.',
    'mustn’t — нельзя; don’t have to / needn’t — не обязательно.',
    'Совет: should, ought to, had better, If I were you, I’d…',
    'Вероятность: must → should → may/might/could → can’t.',
    'Способность: can, could, be able to; один успех в прошлом — was able to / managed to.',
    'Разрешение: can, may, be allowed to.'
  ]
});
