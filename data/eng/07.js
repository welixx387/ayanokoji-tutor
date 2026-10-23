L('eng', 7, {
  m: 35,
  intro: 'Пассив переносит внимание с того, кто действует, на то, что происходит. В новостях, инструкциях, научных текстах он встречается постоянно. На B1 нужно уверенно строить пассив в основных временах, понимать, когда он уместен, и освоить родственную конструкцию have something done — «сделать что-то руками другого человека».',
  intro2: 'Senpai, «I cut my hair» — ты сам себя подстриг ♡ А «I had my hair cut» — тебя подстригли в салоне. Разница огромная, особенно для причёски! Сегодня научимся не путать.',
  goals: [
    'Строить пассив в основных временах и с модальными глаголами',
    'Понимать, когда пассив уместнее актива',
    'Использовать конструкцию have/get something done',
    'Передавать процессы и новости в пассиве'
  ],
  c: `
<h3>Формула пассива</h3>
<div class="rule" data-t="be + V3"><p>Глагол be ставится в нужное время, смысловой глагол — в третьей форме. Исполнитель, если нужен, вводится через <span lang="en">by</span>.</p></div>
<div class="tbl"><table><thead><tr><th>Время</th><th>Пассив</th><th>Пример</th></tr></thead><tbody>
<tr><td>Present Simple</td><td>is/are + V3</td><td lang="en">English is spoken in many countries.</td></tr>
<tr><td>Present Continuous</td><td>is/are being + V3</td><td lang="en">The road is being repaired.</td></tr>
<tr><td>Past Simple</td><td>was/were + V3</td><td lang="en">The bridge was built in 1890.</td></tr>
<tr><td>Present Perfect</td><td>has/have been + V3</td><td lang="en">The results have been published.</td></tr>
<tr><td>Future</td><td>will be + V3</td><td lang="en">The winners will be announced tomorrow.</td></tr>
<tr><td>Modal</td><td>modal + be + V3</td><td lang="en">This form must be signed.</td></tr>
</tbody></table></div>

<h3>Когда выбирать пассив</h3>
<ul class="ex-l">
<li><span lang="en">My bike was stolen last night.</span><span class="tr">Исполнитель неизвестен.</span></li>
<li><span lang="en">The suspect was arrested.</span><span class="tr">Исполнитель очевиден — полиция.</span></li>
<li><span lang="en">The data is collected and then analysed.</span><span class="tr">Важен процесс, а не люди.</span></li>
<li><span lang="en">Mistakes were made.</span><span class="tr">Пассив позволяет не называть виноватого — приём политиков.</span></li>
</ul>
<div class="warn"><p>Не каждый глагол имеет пассив. Непереходные глаголы (<span lang="en">happen, arrive, die, appear</span>) пассива не образуют: <s>The accident was happened</s> → <span lang="en">The accident happened.</span></p></div>

<h3>Have / get something done</h3>
<p>Конструкция <b>have + объект + V3</b> означает, что действие для нас выполнил кто-то другой, обычно за плату. <span lang="en">Get</span> вместо have — разговорный вариант.</p>
<ul class="ex-l">
<li><span lang="en">I had my hair cut yesterday.</span><span class="tr">Я вчера подстригся (в парикмахерской).</span></li>
<li><span lang="en">We’re having our kitchen redecorated.</span><span class="tr">Нам делают ремонт на кухне.</span></li>
<li><span lang="en">You should get your eyes tested.</span><span class="tr">Тебе стоит проверить зрение.</span></li>
<li><span lang="en">She had her bag stolen on the metro.</span><span class="tr">У неё украли сумку в метро (неприятное событие, которое с нами случилось).</span></li>
</ul>
<div class="ichika">Последний пример хитрый ♡ <span lang="en">She had her bag stolen</span> — она, конечно, не заказывала кражу! Конструкция также значит «с ней это случилось». Так говорят о неприятностях: <span lang="en">I had my phone broken.</span></div>

<h3>Предлоги и порядок слов</h3>
<ul class="ex-l">
<li><span lang="en">The letter was written by hand.</span><span class="tr">Способ — by hand, by email.</span></li>
<li><span lang="en">The cake was cut with a knife.</span><span class="tr">Инструмент — with.</span></li>
<li><span lang="en">I was given a present.</span><span class="tr">Глаголы с двумя дополнениями: чаще подлежащим становится человек.</span></li>
<li><span lang="en">The issue is being looked into.</span><span class="tr">Фразовые глаголы сохраняют частицу: look into → is being looked into.</span></li>
</ul>
<div class="ayano">Хороший способ проверить, нужен ли пассив: спроси себя, о чём это предложение. Если о предмете, событии, процессе — пассив естественен. Если о человеке и его действиях — актив. В разговорном английском пассив встречается реже, чем в письменном, но в новостях и инструкциях без него не обойтись.</div>
`,
  p: [
    { q: 'Перепиши в пассиве: <span lang="en">They built this castle in the 12th century.</span>', a: '<span lang="en">This castle was built in the 12th century.</span>' },
    { q: 'Перепиши в пассиве: <span lang="en">Someone is cleaning the room.</span>', a: '<span lang="en">The room is being cleaned.</span>' },
    { q: 'Перепиши в пассиве: <span lang="en">They have cancelled the flight.</span>', a: '<span lang="en">The flight has been cancelled.</span>' },
    { q: 'Скажи, что тебе починили телефон в мастерской.', a: '<span lang="en">I had my phone repaired.</span> / <span lang="en">I got my phone fixed.</span>' },
    { q: 'Исправь: <i>The accident was happened at night.</i>', a: '<span lang="en">The accident happened at night.</span> — happen непереходный.' },
    { q: 'Пассив с модальным: <span lang="en">You must switch off your phones.</span>', a: '<span lang="en">Phones must be switched off.</span>' }
  ],
  q: [
    { q: '<span lang="en">The results ___ next week.</span>', o: ['will announce', 'will be announced', 'are announcing', 'announced'], a: 1, e: 'Future Passive.' },
    { q: '<span lang="en">The road ___ at the moment.</span>', o: ['is repaired', 'is being repaired', 'has repaired', 'repairs'], a: 1, e: 'Present Continuous Passive.' },
    { q: '«Я сделал маникюр в салоне»:', o: ['I did my nails.', 'I had my nails done.', 'I have done my nails.', 'I was done my nails.'], a: 1, e: 'have something done.' },
    { q: 'Не образует пассив:', o: ['write', 'build', 'arrive', 'steal'], a: 2, e: 'Непереходный глагол.' },
    { q: '<span lang="en">This form ___ in black ink.</span>', o: ['must complete', 'must be completed', 'must completed', 'must be complete by'], a: 1, e: 'modal + be + V3.' }
  ],
  s: [
    'Пассив = be в нужном времени + V3; исполнитель — через by.',
    'is done, is being done, was done, has been done, will be done, must be done.',
    'Пассив — когда исполнитель неизвестен, очевиден или неважен; в новостях и науке.',
    'Непереходные глаголы (happen, arrive) пассива не имеют.',
    'have/get + объект + V3 — услуга или неприятное событие.',
    'Фразовые глаголы сохраняют частицу: is being looked into.'
  ]
});
