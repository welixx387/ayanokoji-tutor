L('english', 8, {
  m: 35,
  intro: 'Косвенная речь (Reported Speech) — пересказ чужих слов: «Он сказал, что устал». В английском при пересказе действует согласование времён: если глагол сообщения стоит в прошедшем времени, время в пересказе «сдвигается» назад. Разберём сдвиг времён, изменение местоимений и обстоятельств, пересказ вопросов, просьб и приказов.',
  intro2: 'Senpai, Tom said: «I am tired». Как пересказать? ♡ «Tom said that he was tired» — am превратилось в was! Это и есть согласование времён: прошедшее «said» тянет за собой всё предложение в прошлое. Звучит странно для русского уха, но правило очень механическое.',
  goals: [
    'Применять правило сдвига времён',
    'Менять местоимения, указательные слова и обстоятельства времени и места',
    'Пересказывать общие и специальные вопросы',
    'Пересказывать просьбы и приказы, различать say и tell'
  ],
  c: `
<h3>Сдвиг времён</h3>
<p>Если глагол, вводящий речь, стоит в прошедшем времени (said, told, asked), время в пересказе сдвигается на шаг назад.</p>
<div class="tbl"><table><thead><tr><th>Прямая речь</th><th>Косвенная речь</th><th>Пример</th></tr></thead><tbody>
<tr><td>Present Simple</td><td>Past Simple</td><td>«I like it» → He said (that) he liked it.</td></tr>
<tr><td>Present Continuous</td><td>Past Continuous</td><td>«I’m working» → She said she was working.</td></tr>
<tr><td>Present Perfect</td><td>Past Perfect</td><td>«I’ve finished» → He said he had finished.</td></tr>
<tr><td>Past Simple</td><td>Past Perfect</td><td>«I saw him» → She said she had seen him.</td></tr>
<tr><td>will</td><td>would</td><td>«I’ll help» → He said he would help.</td></tr>
<tr><td>can / may / must</td><td>could / might / had to</td><td>«I can swim» → She said she could swim.</td></tr>
</tbody></table></div>
<div class="note"><p>Сдвиг не нужен, если глагол сообщения стоит в настоящем времени (<i>He says he is tired</i>), а также часто — если речь идёт об общеизвестной истине (<i>The teacher said that water boils at 100 °C</i>). Would, could, should, might не меняются.</p></div>

<h3>Слова времени и места</h3>
<div class="tbl"><table><thead><tr><th>Прямая речь</th><th>Косвенная речь</th></tr></thead><tbody>
<tr><td>now</td><td>then</td></tr>
<tr><td>today / tonight</td><td>that day / that night</td></tr>
<tr><td>yesterday</td><td>the day before / the previous day</td></tr>
<tr><td>tomorrow</td><td>the next day / the following day</td></tr>
<tr><td>last week</td><td>the week before / the previous week</td></tr>
<tr><td>next year</td><td>the following year</td></tr>
<tr><td>ago</td><td>before</td></tr>
<tr><td>here / this / these</td><td>there / that / those</td></tr>
</tbody></table></div>
<p>Местоимения меняются по смыслу: <i>Anna said, «I love my cat» → Anna said that she loved her cat.</i></p>
<div class="ichika">Логика понятна ♡ Если Аня сказала «завтра» неделю назад, то для нас это уже не «завтра», а «на следующий день». Слова времени меняются потому, что изменилась точка, с которой мы смотрим.</div>

<h3>Say и tell</h3>
<p><b>say</b> — без указания, кому, или с to: <i>He said (to me) that…</i>. <b>tell</b> — обязательно с адресатом без предлога: <i>He told me that…</i> (не «told that», не «said me»).</p>

<h3>Вопросы</h3>
<div class="rule" data-t="Правило"><p>В косвенном вопросе <b>прямой порядок слов</b> (как в утверждении), нет вспомогательного do/does/did и вопросительного знака. Общие вопросы вводятся <b>if</b> или <b>whether</b>, специальные — тем же вопросительным словом.</p></div>
<div class="ex" data-t="Примеры"><ol><li>«Do you like pizza?» → She asked me <b>if I liked</b> pizza.</li><li>«Where do you live?» → He asked me <b>where I lived</b>.</li><li>«What are you doing?» → Mum asked <b>what I was doing</b>.</li><li>«Have you seen my keys?» → Dad asked <b>whether I had seen</b> his keys.</li></ol></div>
<div class="warn"><p>Типичная ошибка — сохранить вопросительный порядок: <s>He asked where did I live</s>. Правильно: <i>He asked where I lived.</i></p></div>

<h3>Просьбы и приказы</h3>
<p>Используется <b>ask / tell / order + объект + to + V</b>; отрицание — <b>not to + V</b>:</p>
<ul><li>«Please, close the door» → She asked me <b>to close</b> the door.</li><li>«Don’t be late!» → The teacher told us <b>not to be</b> late.</li></ul>
<p>Другие глаголы сообщения передают оттенок: <i>advise, suggest, promise, warn, explain, admit, offer, refuse</i>: «I’ll help you» → He <b>promised to help</b> me.</p>
<div class="ayano">Косвенная речь — это три механических шага: сдвинуть время на шаг назад, поменять местоимения и слова времени, для вопроса — вернуть прямой порядок слов. Выполняй их по очереди и проверяй каждый. Проблемы возникают, когда пытаются сделать всё сразу «на слух».</div>
`,
  p: [
    { q: 'Перескажите: Kate said, «I am reading a book».', a: 'Kate said (that) she was reading a book.' },
    { q: 'Перескажите: He said, «I saw this film yesterday».', a: 'He said (that) he had seen that film the day before.' },
    { q: 'Перескажите вопрос: She asked me, «Do you speak German?»', a: 'She asked me if (whether) I spoke German.' },
    { q: 'Перескажите вопрос: He asked, «Where are you going?»', a: 'He asked where I was going.' },
    { q: 'Перескажите: The teacher said to us, «Don’t use your phones».', a: 'The teacher told us not to use our phones.' },
    { q: 'Вставьте said или told: She ___ me the truth. He ___ that he was busy.', a: 'told; said.' }
  ],
  q: [
    { q: '«I will call you», he said. → He said he ___ me.', o: ['will call', 'would call', 'called', 'has called'], a: 1, e: 'will → would.' },
    { q: 'She asked me where ___.', o: ['did I live', 'I lived', 'do I live', 'I live?'], a: 1, e: 'Прямой порядок слов, сдвиг времени.' },
    { q: '«Today» в косвенной речи:', o: ['tomorrow', 'that day', 'yesterday', 'now'], a: 1, e: 'Сдвиг обстоятельства.' },
    { q: 'He ___ me that he was hungry.', o: ['said', 'told', 'asked', 'spoke'], a: 1, e: 'tell + адресат.' },
    { q: 'Mum told me ___ late.', o: ['don’t be', 'not to be', 'not be', 'to not being'], a: 1, e: 'Отрицательная просьба: not to + V.' }
  ],
  s: [
    'После said, told, asked время сдвигается назад: Present → Past, Past/Present Perfect → Past Perfect, will → would.',
    'now → then, today → that day, yesterday → the day before, tomorrow → the next day, here → there.',
    'say (to somebody) / tell somebody.',
    'Вопросы: прямой порядок слов; общие — if/whether, специальные — вопросительное слово.',
    'Просьбы и приказы: ask/tell + somebody + (not) to + V.',
    'Глаголы-сообщения: promise, advise, warn, suggest, offer.'
  ]
});
