L('eng', 12, {
  m: 35,
  intro: 'Модальные глаголы с перфектным инфинитивом позволяют рассуждать о прошлом: делать выводы, предполагать, критиковать. «Должно быть, он забыл», «не может быть, чтобы она это сказала», «можно было и не приходить». Это то, что отличает речь B2 от B1: умение говорить не только о фактах, но и о вероятностях.',
  intro2: 'Senpai, сегодня ты детектив ♡ «The window is broken. Someone must have thrown a ball.» Из улик — к выводам, и всё по-английски. Шерлок одобрил бы!',
  goals: [
    'Делать выводы о прошлом: must have, can’t have',
    'Выражать предположения: might have, may have, could have',
    'Выражать упрёк и упущенные возможности: should have, could have',
    'Различать needn’t have и didn’t need to'
  ],
  c: `
<h3>Формула и шкала уверенности</h3>
<div class="rule" data-t="modal + have + V3"><p>Модальный глагол показывает степень уверенности, have + V3 переносит её в прошлое.</p></div>
<div class="tbl"><table><thead><tr><th>Форма</th><th>Значение</th><th>Пример</th></tr></thead><tbody>
<tr><td lang="en">must have done</td><td>почти уверен, что было</td><td lang="en">The streets are wet. It must have rained.</td></tr>
<tr><td lang="en">may / might / could have done</td><td>возможно, было</td><td lang="en">She might have missed the bus.</td></tr>
<tr><td lang="en">can’t / couldn’t have done</td><td>уверен, что не было</td><td lang="en">He can’t have seen me — I was hiding.</td></tr>
</tbody></table></div>
<div class="warn"><p>Отрицание вывода — <span lang="en">can’t have</span>, а не <s>mustn’t have</s>. <span lang="en">She can’t have forgotten — she wrote it down.</span></p></div>

<h3>Критика и упущенные возможности</h3>
<ul class="ex-l">
<li><span lang="en">You should have checked the address.</span><span class="tr">Надо было проверить адрес.</span></li>
<li><span lang="en">You could have told me!</span><span class="tr">Мог бы и сказать! (упрёк)</span></li>
<li><span lang="en">I could have become a pianist, but I gave up.</span><span class="tr">Я мог стать пианистом (возможность, которая не реализовалась).</span></li>
<li><span lang="en">You might have warned me.</span><span class="tr">Мог бы и предупредить (британское, с раздражением).</span></li>
</ul>
<div class="ichika">Интонация решает ♡ <span lang="en">You could have called!</span> с ударением на «could» — это упрёк. А <span lang="en">It could have been worse</span> — утешение: «могло быть и хуже». Одна конструкция — разные эмоции.</div>

<h3>needn’t have и didn’t need to</h3>
<div class="two"><div><h4>needn’t have + V3</h4><p>Сделал, но оказалось, что было не нужно.</p><p lang="en">You needn’t have bought milk — we have plenty.</p></div><div><h4>didn’t need to + V</h4><p>Не было необходимости (обычно и не делал).</p><p lang="en">I didn’t need to buy milk, so I didn’t.</p></div></div>

<h3>Логика рассуждения</h3>
<div class="ex" data-t="Детективная задача"><p>Ключи лежат на столе, дверь заперта изнутри, в комнате никого.</p><ol><li><span lang="en">The owner must have left through the window.</span> — других выходов нет, вывод сильный.</li><li><span lang="en">He might have climbed down the drainpipe.</span> — один из вариантов.</li><li><span lang="en">He can’t have used the door — it was locked from the inside.</span> — исключаем.</li></ol></div>
<div class="ayano">Когда рассуждаешь, начинай со слов, которые показывают уверенность, и обосновывай их. «Должно быть, потому что…», «не может быть, ведь…». В английском это работает так же: <span lang="en">She must have been tired, because she fell asleep at once.</span> Вывод без основания звучит как обвинение, а вывод с основанием — как анализ.</div>
`,
  p: [
    { q: 'Сделай вывод: <span lang="en">Tom’s car isn’t outside. He (leave).</span>', a: '<span lang="en">He must have left.</span>' },
    { q: 'Исключи вариант: <span lang="en">Anna (steal) the money — she was with me all evening.</span>', a: '<span lang="en">Anna can’t have stolen the money.</span>' },
    { q: 'Выскажи предположение: друг не отвечает — возможно, уснул.', a: '<span lang="en">He might have fallen asleep.</span>' },
    { q: 'Упрёк: ты не сказал мне, что вечеринка отменена.', a: '<span lang="en">You could have told me (that the party was cancelled)!</span> / <span lang="en">You should have told me.</span>' },
    { q: 'needn’t have или didn’t need to: Я взял зонт, но дождя не было.', a: '<span lang="en">I needn’t have taken an umbrella.</span>' },
    { q: 'Утешь друга, который упал с велосипеда, но не пострадал.', a: '<span lang="en">It could have been worse.</span>' }
  ],
  q: [
    { q: 'Почти уверен, что это было:', o: ['might have', 'must have', 'can’t have', 'needn’t have'], a: 1, e: 'Сильный вывод.' },
    { q: '<span lang="en">She ___ seen us — she didn’t say hello.</span>', o: ['must have', 'can’t have', 'should have', 'needn’t have'], a: 1, e: 'Уверены, что не видела.' },
    { q: '«Надо было проверить» —', o: ['You must check.', 'You should have checked.', 'You must have checked.', 'You might check.'], a: 1, e: 'Упрёк.' },
    { q: 'Сделал зря, не было нужно:', o: ['didn’t need to do', 'needn’t have done', 'mustn’t have done', 'couldn’t do'], a: 1, e: 'needn’t have.' },
    { q: '<span lang="en">He’s late. He ___ got stuck in traffic.</span>', o: ['can’t have', 'may have', 'mustn’t have', 'should'], a: 1, e: 'Возможно.' }
  ],
  s: [
    'modal + have + V3 — рассуждение о прошлом.',
    'must have — почти уверен; might/may/could have — возможно; can’t have — уверен, что нет.',
    'should have / could have / might have — упрёк, упущенная возможность.',
    'It could have been worse — утешение.',
    'needn’t have done — сделал зря; didn’t need to do — не было нужно.',
    'Вывод + обоснование: must have…, because…'
  ]
});
