L('english', 5, {
  m: 35,
  intro: 'Модальные глаголы выражают не действие, а отношение к нему: возможность, разрешение, обязанность, совет, вероятность. Они ведут себя особо: не имеют окончания -s, не требуют do в вопросах, после них идёт глагол без to. Разберём can, could, may, might, must, have to, should, need и их значения.',
  intro2: 'Senpai, «You must wear a seatbelt» и «You have to wear a uniform» — в чём разница? ♡ Must — я сам считаю, что это нужно, или это строгое правило. Have to — так требуют обстоятельства. А mustn’t и don’t have to вообще значат совершенно разное! Сегодня разберёмся.',
  goals: [
    'Знать особенности модальных глаголов',
    'Различать can, could, be able to; may и might',
    'Различать must и have to, mustn’t и don’t have to',
    'Употреблять should, ought to, need и модальные глаголы с перфектным инфинитивом'
  ],
  c: `
<h3>Особенности модальных глаголов</h3>
<ul><li>Не имеют окончания -s в 3-м лице: <i>She can swim</i> (не «cans»).</li><li>После них — глагол без to (кроме ought to, have to): <i>You should go</i>.</li><li>Вопрос и отрицание образуются без do: <i>Can you help? You mustn’t smoke.</i></li><li>Не имеют форм всех времён — используются эквиваленты (be able to, have to).</li></ul>

<h3>Возможность и способность</h3>
<div class="tbl"><table><thead><tr><th>Глагол</th><th>Значение</th><th>Пример</th></tr></thead><tbody>
<tr><td>can</td><td>умение, возможность, разрешение (неформально)</td><td>I can speak English. Can I go out?</td></tr>
<tr><td>could</td><td>умение в прошлом; вежливая просьба; возможность</td><td>She could read at four. Could you open the door, please?</td></tr>
<tr><td>be able to</td><td>способность в любом времени, особенно для однократного успеха в прошлом</td><td>I will be able to come. Despite the storm, they were able to reach the shore.</td></tr>
<tr><td>may</td><td>разрешение (формально); предположение (вероятно)</td><td>May I come in? It may rain later.</td></tr>
<tr><td>might</td><td>менее вероятное предположение</td><td>He might be at home, but I’m not sure.</td></tr>
</tbody></table></div>

<h3>Обязанность и совет</h3>
<div class="tbl"><table><thead><tr><th>Глагол</th><th>Значение</th><th>Пример</th></tr></thead><tbody>
<tr><td>must</td><td>обязанность по мнению говорящего, строгое правило, настоятельный совет</td><td>I must study harder. Passengers must show their tickets.</td></tr>
<tr><td>have to</td><td>необходимость из-за обстоятельств, правил; любые времена</td><td>I have to get up at 6 because my school starts early. She had to wait.</td></tr>
<tr><td>should / ought to</td><td>совет, рекомендация</td><td>You should see a doctor. You ought to apologize.</td></tr>
<tr><td>need</td><td>необходимость; needn’t — нет необходимости</td><td>You needn’t hurry, we have time.</td></tr>
</tbody></table></div>
<div class="warn"><p><b>mustn’t</b> — запрет («нельзя»): <i>You mustn’t use your phone during the exam.</i> <b>don’t have to</b> / <b>needn’t</b> — нет необходимости («можно не»): <i>You don’t have to come if you’re busy.</i> Перепутать их — серьёзная смысловая ошибка.</p></div>
<div class="ichika">Запоминалка ♡ mustn’t = «нельзя, это запрещено». don’t have to = «не обязательно, как хочешь». В школе: «You mustn’t cheat» (нельзя списывать) и «You don’t have to wear a tie on Fridays» (по пятницам галстук не обязателен).</div>

<h3>Модальные глаголы о прошлом</h3>
<div class="tbl"><table><thead><tr><th>Конструкция</th><th>Значение</th><th>Пример</th></tr></thead><tbody>
<tr><td>must have + V3</td><td>уверенное предположение о прошлом («наверняка»)</td><td>The streets are wet. It must have rained.</td></tr>
<tr><td>can’t have + V3</td><td>уверенность, что чего-то не было</td><td>He can’t have seen me — I was hiding.</td></tr>
<tr><td>might / may have + V3</td><td>возможно, было</td><td>She might have missed the bus.</td></tr>
<tr><td>should have + V3</td><td>упрёк, сожаление: следовало, но не сделал</td><td>You should have told me earlier!</td></tr>
<tr><td>needn’t have + V3</td><td>сделал, но было не нужно</td><td>You needn’t have bought milk — we have plenty.</td></tr>
</tbody></table></div>
<div class="ayano">Модальные глаголы удобно расположить на шкале уверенности: must (почти наверняка) → should/ought to (ожидаемо) → may (возможно) → might/could (возможно, но вряд ли) → can’t (невозможно). Тогда выбор зависит от того, насколько ты уверен. Это работает и для настоящего, и с перфектным инфинитивом — для прошлого.</div>
`,
  p: [
    { q: 'Выберите: You (mustn’t / don’t have to) park here. It’s forbidden.', a: 'mustn’t — запрет.' },
    { q: 'Выберите: You (mustn’t / don’t have to) bring food. Lunch is provided.', a: 'don’t have to — нет необходимости.' },
    { q: 'Переведите: «Ей пришлось ждать два часа».', a: 'She had to wait for two hours.' },
    { q: 'Дайте совет: Your friend has a headache.', a: 'You should take a painkiller / You should rest.' },
    { q: 'Сделайте вывод о прошлом: The window is broken and there’s a ball on the floor.', a: 'Someone must have broken it with the ball.' },
    { q: 'Выразите упрёк: Ты не подготовился к тесту и получил плохую оценку.', a: 'You should have prepared for the test.' }
  ],
  q: [
    { q: 'My grandma ___ swim very well when she was young.', o: ['can', 'could', 'may', 'must'], a: 1, e: 'Умение в прошлом.' },
    { q: '___ I use your pen? (вежливо, формально)', o: ['May', 'Must', 'Should', 'Need'], a: 0, e: 'Разрешение.' },
    { q: 'You ___ smoke in the hospital.', o: ['mustn’t', 'don’t have to', 'needn’t', 'shouldn’t have'], a: 0, e: 'Запрет.' },
    { q: 'She isn’t answering. She ___ be asleep.', o: ['must', 'can', 'need', 'ought'], a: 0, e: 'Уверенное предположение.' },
    { q: 'You ___ have told me — I already knew.', o: ['must', 'needn’t', 'can’t', 'should'], a: 1, e: 'Сделал, но было не нужно.' }
  ],
  s: [
    'Модальные: без -s, без to после них, без do в вопросах.',
    'can/could/be able to — умение и возможность; may/might — разрешение и вероятность.',
    'must — обязанность по мнению говорящего, правило; have to — из-за обстоятельств.',
    'mustn’t — запрет; don’t have to / needn’t — нет необходимости.',
    'should / ought to — совет.',
    'must have, can’t have, might have, should have, needn’t have + V3 — о прошлом.'
  ]
});
