L('eng', 3, {
  m: 40,
  intro: 'Present Perfect — мост между прошлым и настоящим. Сегодня разберём не только его, но и Present Perfect Continuous: когда важен результат, а когда — длительность процесса. Это одна из самых частых зон ошибок даже на B2, поэтому стоит закрыть её основательно.',
  intro2: 'Senpai, «I’ve painted the room» — комната готова, можно любоваться ♡ «I’ve been painting the room» — я весь в краске, и, может быть, ещё не закончила. Одна буковка «been» — и совсем другая картинка!',
  goals: [
    'Различать Present Perfect и Past Simple по признаку «связь с настоящим»',
    'Выбирать между Present Perfect Simple и Continuous',
    'Правильно использовать for, since, already, yet, just, ever, never',
    'Говорить о жизненном опыте и недавних событиях'
  ],
  c: `
<h3>Present Perfect или Past Simple</h3>
<div class="tbl"><table><thead><tr><th>Present Perfect</th><th>Past Simple</th></tr></thead><tbody>
<tr><td>время не указано или период не закончился: <span lang="en">I have visited Paris twice.</span></td><td>конкретное время в прошлом: <span lang="en">I visited Paris in 2022.</span></td></tr>
<tr><td>период ещё идёт: <span lang="en">I have drunk three coffees today.</span></td><td>период закончился: <span lang="en">I drank three coffees yesterday.</span></td></tr>
<tr><td>результат важен сейчас: <span lang="en">I have lost my wallet.</span> (нет кошелька)</td><td>просто факт прошлого: <span lang="en">I lost my wallet last week.</span></td></tr>
</tbody></table></div>
<div class="rule" data-t="Главный тест"><p>Есть в предложении слово, привязывающее действие к законченному прошлому (<span lang="en">yesterday, last year, in 2019, ago, when I was a child</span>)? Тогда только Past Simple. Нет — смотрим, важна ли связь с настоящим.</p></div>

<h3>Simple или Continuous</h3>
<div class="two"><div><h4>Present Perfect Simple</h4><p>Результат, количество, законченность.</p><p lang="en">I have written three emails.</p><p lang="en">She has read the whole book.</p></div><div><h4>Present Perfect Continuous</h4><p>Длительность, процесс, видимые следы.</p><p lang="en">I have been writing emails all morning.</p><p lang="en">Your eyes are red. Have you been crying?</p></div></div>
<div class="warn"><p>Глаголы состояния (<span lang="en">know, believe, have, be, own, like</span>) в Continuous не используются: <span lang="en">I have known her for years</span>, а не <s>I have been knowing</s>.</p></div>
<div class="ichika">Посчитать можно — значит Simple ♡ «Я написал три письма» — считаем результат. «Я пишу письма с утра» — важно, как долго. Вопрос <span lang="en">How many…?</span> тянет Simple, а <span lang="en">How long…?</span> — обычно Continuous.</div>

<h3>Слова-спутники</h3>
<div class="tbl"><table><thead><tr><th>Слово</th><th>Значение и место</th><th>Пример</th></tr></thead><tbody>
<tr><td lang="en">for</td><td>в течение (период)</td><td lang="en">for two years, for ages</td></tr>
<tr><td lang="en">since</td><td>с (момент начала)</td><td lang="en">since 2021, since I was ten</td></tr>
<tr><td lang="en">just</td><td>только что, между have и V3</td><td lang="en">I’ve just finished.</td></tr>
<tr><td lang="en">already</td><td>уже (утверждения)</td><td lang="en">She has already left.</td></tr>
<tr><td lang="en">yet</td><td>ещё не / уже (отрицания и вопросы), в конце</td><td lang="en">Have you eaten yet? I haven’t decided yet.</td></tr>
<tr><td lang="en">ever / never</td><td>когда-либо / никогда</td><td lang="en">Have you ever been to Japan?</td></tr>
<tr><td lang="en">so far</td><td>пока что, на данный момент</td><td lang="en">So far we have visited four museums.</td></tr>
</tbody></table></div>

<h3>Полезные конструкции</h3>
<ul class="ex-l">
<li><span lang="en">It’s the first time I’ve tried sushi.</span><span class="tr">Я впервые пробую суши (после It’s the first time — Present Perfect).</span></li>
<li><span lang="en">It’s been ages since we last met.</span><span class="tr">Мы не виделись целую вечность.</span></li>
<li><span lang="en">She has gone to London.</span><span class="tr">Она уехала в Лондон (и сейчас там).</span></li>
<li><span lang="en">She has been to London.</span><span class="tr">Она бывала в Лондоне (и вернулась).</span></li>
</ul>
<div class="ayano">Русскоговорящие чаще всего ошибаются в двух местах. Первое — «Я живу здесь пять лет» переводят настоящим временем; правильно <span lang="en">I have lived / have been living here for five years</span>. Второе — соединяют Present Perfect с точным временем: <s>I have seen him yesterday</s>. Запомни эти две ловушки — и половина ошибок исчезнет.</div>
`,
  p: [
    { q: 'Выбери время: <span lang="en">I (see) this film three times.</span>', a: '<span lang="en">I have seen this film three times.</span> — количество, время не указано.' },
    { q: 'Выбери: <span lang="en">I (see) him two days ago.</span>', a: '<span lang="en">I saw him two days ago.</span> — ago требует Past Simple.' },
    { q: 'Simple или Continuous: <span lang="en">She (study) for six hours, and she’s exhausted.</span>', a: '<span lang="en">She has been studying for six hours</span> — длительность, усталость как след.' },
    { q: 'Вставь for или since: <span lang="en">I’ve known Tom ___ we were kids. We’ve been friends ___ fifteen years.</span>', a: '<span lang="en">since</span>; <span lang="en">for</span>.' },
    { q: 'Переведи: «Я впервые в Лондоне».', a: '<span lang="en">It’s the first time I’ve been to London.</span>' },
    { q: 'Исправь ошибку: <i>I am waiting for you for an hour!</i>', a: '<span lang="en">I have been waiting for you for an hour!</span>' }
  ],
  q: [
    { q: '<span lang="en">Have you finished ___?</span>', o: ['already', 'yet', 'just', 'since'], a: 1, e: 'yet — в вопросах, в конце.' },
    { q: '<span lang="en">I ___ my keys. I can’t open the door.</span>', o: ['lost', 'have lost', 'have been losing', 'had lose'], a: 1, e: 'Результат важен сейчас.' },
    { q: '<span lang="en">How long ___ you ___ here?</span>', o: ['do / work', 'have / been working', 'did / work', 'are / working'], a: 1, e: 'Длительность до сейчас.' },
    { q: 'Ошибка в предложении:', o: ['I have known her for years.', 'I have been knowing her for years.', 'I’ve just seen him.', 'She has gone out.'], a: 1, e: 'know — глагол состояния.' },
    { q: '<span lang="en">He ___ to Rome, so he can’t come to the party.</span>', o: ['has been', 'has gone', 'went', 'was'], a: 1, e: 'Уехал и сейчас там.' }
  ],
  s: [
    'Present Perfect — связь с настоящим; Past Simple — законченное прошлое с указанием времени.',
    'yesterday, ago, last…, in 2019 — только Past Simple.',
    'Perfect Simple — результат и количество; Perfect Continuous — длительность и следы.',
    'Глаголы состояния в Continuous не ставятся.',
    'for + период, since + момент; just, already, yet, ever, never, so far.',
    'It’s the first time I’ve…; been to — побывал, gone to — уехал.'
  ]
});
