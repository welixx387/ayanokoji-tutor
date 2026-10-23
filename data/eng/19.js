L('eng', 19, {
  m: 35,
  intro: '«Говорят, что…», «Считается, что…», «По сообщениям…» — так звучат новости, научные статьи и официальные отчёты. В английском для этого есть безличный пассив с глаголами сообщения и мнения: It is said that… и He is said to… Вторая модель особенно важна: её проверяют в C1 Advanced и она постоянно встречается в прессе.',
  intro2: 'Senpai, слухи по-английски звучат очень солидно ♡ «She is said to have dated a famous actor». Звучит как в газете, а на деле — сплетня! Сегодня научимся говорить так, как пишут журналисты.',
  goals: [
    'Строить конструкцию It is said / believed / reported that…',
    'Преобразовывать её в personal passive: He is said to be / to have been…',
    'Выбирать нужный инфинитив: простой, длительный, перфектный',
    'Использовать there is said to be и наречия reportedly, allegedly'
  ],
  c: `
<h3>Две модели</h3>
<p>Глаголы: <span lang="en">say, believe, think, know, report, expect, consider, claim, allege, estimate, understand, rumour.</span></p>
<div class="two"><div><h4>It + passive + that</h4><p lang="en">It is said that he is a millionaire.</p><p lang="en">It is believed that the painting was stolen.</p></div><div><h4>Подлежащее + passive + to-инфинитив</h4><p lang="en">He is said to be a millionaire.</p><p lang="en">The painting is believed to have been stolen.</p></div></div>
<div class="ichika">Вторая модель короче и звучит естественнее ♡ Подлежащее из придаточного «переезжает» в начало, а глагол придаточного превращается в инфинитив. Так любят писать журналисты: сразу видно, о ком новость.</div>

<h3>Выбор инфинитива</h3>
<div class="tbl"><table><thead><tr><th>Время действия относительно сообщения</th><th>Инфинитив</th><th>Пример</th></tr></thead><tbody>
<tr><td>одновременно (состояние)</td><td lang="en">to be / to know</td><td lang="en">She is thought to be the best candidate.</td></tr>
<tr><td>одновременно (процесс)</td><td lang="en">to be doing</td><td lang="en">The minister is reported to be considering resignation.</td></tr>
<tr><td>раньше</td><td lang="en">to have done</td><td lang="en">The thieves are believed to have escaped abroad.</td></tr>
<tr><td>раньше, пассив</td><td lang="en">to have been done</td><td lang="en">Ten people are reported to have been injured.</td></tr>
<tr><td>в будущем</td><td lang="en">to + V (с expect)</td><td lang="en">Prices are expected to rise.</td></tr>
</tbody></table></div>
<div class="ex" data-t="Преобразование по шагам"><p><span lang="en">It is reported that the president left the country yesterday.</span></p><ol><li>Подлежащее придаточного → в начало: <span lang="en">The president</span></li><li>Глагол сообщения → в том же времени: <span lang="en">is reported</span></li><li>left — раньше сообщения → <span lang="en">to have left</span></li></ol><p>Итог: <span lang="en">The president is reported to have left the country yesterday.</span></p></div>
<div class="warn"><p>Время глагола сообщения сохраняется: <span lang="en">It was thought that he was guilty → He was thought to be guilty.</span> Действие одновременное — значит, простой инфинитив, даже в прошлом.</p></div>

<h3>There, наречия и be supposed to</h3>
<ul class="ex-l">
<li><span lang="en">There are said to be ghosts in the castle.</span><span class="tr">Говорят, в замке водятся привидения.</span></li>
<li><span lang="en">The singer is reportedly planning a comeback.</span><span class="tr">По сообщениям, певец планирует вернуться.</span></li>
<li><span lang="en">He allegedly stole the documents.</span><span class="tr">Он якобы украл документы (не доказано).</span></li>
<li><span lang="en">This restaurant is supposed to be excellent.</span><span class="tr">Говорят, этот ресторан отличный.</span></li>
<li><span lang="en">You’re supposed to be at school!</span><span class="tr">Ты должен быть в школе! (обязанность, ожидание)</span></li>
</ul>
<div class="ayano">Эти конструкции — инструмент дистанции. Журналист пишет <span lang="en">is alleged to have</span>, потому что не может утверждать факт до решения суда. Когда читаешь новости, замечай такие маркеры: они показывают, где проверенная информация, а где чужое мнение. Это навык критического чтения, а не только грамматика.</div>
`,
  p: [
    { q: 'Перепиши: <span lang="en">It is said that she speaks seven languages.</span>', a: '<span lang="en">She is said to speak seven languages.</span>' },
    { q: 'Перепиши: <span lang="en">It is believed that the fire started in the kitchen.</span>', a: '<span lang="en">The fire is believed to have started in the kitchen.</span>' },
    { q: 'Перепиши: <span lang="en">It is reported that the company is losing money.</span>', a: '<span lang="en">The company is reported to be losing money.</span>' },
    { q: 'Перепиши: <span lang="en">It is thought that two paintings were damaged.</span>', a: '<span lang="en">Two paintings are thought to have been damaged.</span>' },
    { q: 'Переведи: «Ожидается, что поезд прибудет в полдень».', a: '<span lang="en">The train is expected to arrive at noon.</span>' },
    { q: 'Переведи с there: «Говорят, в этом озере есть монстр».', a: '<span lang="en">There is said to be a monster in this lake.</span>' }
  ],
  q: [
    { q: '<span lang="en">He is known ___ a talented chess player.</span>', o: ['being', 'to be', 'that he is', 'be'], a: 1, e: 'Состояние одновременно — to be.' },
    { q: '<span lang="en">The suspect is believed ___ the country last week.</span>', o: ['to leave', 'to have left', 'leaving', 'to be leaving'], a: 1, e: 'Действие раньше сообщения.' },
    { q: '<span lang="en">Many houses are reported ___ in the flood.</span>', o: ['to destroy', 'to have been destroyed', 'to have destroyed', 'destroying'], a: 1, e: 'Раньше + пассив.' },
    { q: '«Якобы» по-английски:', o: ['actually', 'allegedly', 'eventually', 'accordingly'], a: 1, e: 'allegedly — по утверждениям, не доказано.' },
    { q: '<span lang="en">There ___ to be a secret tunnel here.</span>', o: ['says', 'is said', 'said', 'is saying'], a: 1, e: 'There is said to be…' }
  ],
  s: [
    'It is said / believed / reported that… — безличный пассив.',
    'He is said to… — подлежащее придаточного выносится вперёд, глагол становится инфинитивом.',
    'to do — одновременно, to be doing — процесс, to have done — раньше, to have been done — раньше и пассив.',
    'Время глагола сообщения сохраняется: was thought to be.',
    'There is said to be…; наречия reportedly, allegedly, supposedly.',
    'be supposed to: «говорят, что» или «должен (по ожиданиям)».'
  ]
});
