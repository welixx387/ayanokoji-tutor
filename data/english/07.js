L('english', 7, {
  m: 40,
  intro: 'Условные предложения (Conditionals) описывают ситуации «если… то…». В английском их несколько типов в зависимости от того, насколько реально условие и к какому времени оно относится. Разберём нулевой, первый, второй и третий типы, смешанные условные, unless и конструкцию I wish.',
  intro2: 'Senpai, «If I win the lottery…» и «If I won the lottery…» — обе фразы про лотерею, но разные ♡ Первая — вполне возможно, я купил билет. Вторая — мечта, вряд ли случится. А «If I had bought a ticket…» — уже сожаление о прошлом. Сегодня — четыре уровня реальности в английской грамматике!',
  goals: [
    'Различать типы условных предложений по реальности и времени',
    'Правильно строить каждый тип',
    'Использовать unless, as long as, provided that',
    'Выражать сожаление с помощью I wish и If only'
  ],
  c: `
<h3>Четыре основных типа</h3>
<div class="tbl"><table><thead><tr><th>Тип</th><th>Ситуация</th><th>If-часть</th><th>Главная часть</th><th>Пример</th></tr></thead><tbody>
<tr><td>Zero</td><td>общие истины, законы, всегда так</td><td>Present Simple</td><td>Present Simple</td><td>If you heat ice, it melts.</td></tr>
<tr><td>First</td><td>реальное условие в будущем</td><td>Present Simple</td><td>will + V</td><td>If it rains tomorrow, we will stay at home.</td></tr>
<tr><td>Second</td><td>нереальное или маловероятное в настоящем/будущем</td><td>Past Simple</td><td>would + V</td><td>If I had a million dollars, I would travel the world.</td></tr>
<tr><td>Third</td><td>нереальное в прошлом (сожаление, упрёк)</td><td>Past Perfect</td><td>would have + V3</td><td>If I had studied harder, I would have passed the exam.</td></tr>
</tbody></table></div>
<div class="warn"><p>В if-части <b>не используется will или would</b> (кроме особых случаев вежливой просьбы): <i>If it <s>will rain</s> rains…</i>, <i>If I <s>would have</s> had…</i>. Это самая частая ошибка.</p></div>
<div class="ichika">Во втором типе с be часто используют <b>were</b> для всех лиц ♡ «If I were you, I would apologize» — «на твоём месте я бы извинился». Это устойчивая формула совета, её стоит выучить целиком.</div>

<h3>Как выбрать тип</h3>
<div class="rule" data-t="Два вопроса"><ol><li>К какому времени относится условие: настоящее/будущее или прошлое?</li><li>Насколько оно реально: возможно или нереально (противоречит фактам)?</li></ol><p>Будущее + реально → First. Настоящее/будущее + нереально → Second. Прошлое (уже не изменить) → Third. Всегда истинно → Zero.</p></div>
<div class="ex" data-t="Одна ситуация — разные типы"><ol><li><i>If I see Tom, I’ll tell him.</i> — я, возможно, увижу Тома (First).</li><li><i>If I saw Tom, I would tell him.</i> — я вряд ли его увижу (Second).</li><li><i>If I had seen Tom, I would have told him.</i> — я его не видел, уже поздно (Third).</li></ol></div>

<h3>Смешанные условные</h3>
<p>Условие из одного времени, результат — из другого:</p>
<ul><li>Прошлое условие → результат сейчас: <i>If I <b>had taken</b> the map, we <b>wouldn’t be</b> lost now.</i></li><li>Постоянное состояние → результат в прошлом: <i>If I <b>were</b> braver, I <b>would have spoken</b> to her yesterday.</i></li></ul>

<h3>Unless и другие союзы</h3>
<p><b>unless</b> = if not («если не»): <i>You won’t pass <b>unless</b> you study</i> (= if you don’t study). После unless глагол в утвердительной форме. Также: <b>as long as, provided (that)</b> — «при условии, что»; <b>in case</b> — «на случай, если»: <i>Take an umbrella in case it rains.</i></p>

<h3>I wish / If only</h3>
<div class="tbl"><table><thead><tr><th>Сожаление о…</th><th>Форма</th><th>Пример</th></tr></thead><tbody>
<tr><td>настоящем</td><td>wish + Past Simple</td><td>I wish I knew the answer (жаль, что не знаю).</td></tr>
<tr><td>прошлом</td><td>wish + Past Perfect</td><td>I wish I had listened to you (жаль, что не послушал).</td></tr>
<tr><td>раздражение, желание перемен</td><td>wish + would</td><td>I wish you would stop talking!</td></tr>
</tbody></table></div>
<div class="ayano">Обрати внимание на логику: чем «нереальнее» ситуация, тем дальше «назад» сдвигается время в if-части. Реальное будущее — Present, нереальное настоящее — Past, нереальное прошлое — Past Perfect. Английский будто отодвигает нереальное во времени. Если понял этот принцип, условные предложения и I wish подчиняются одному правилу.</div>
`,
  p: [
    { q: 'Поставьте глаголы: If you (mix) red and white, you (get) pink.', a: 'mix, get — Zero Conditional (всегда так).' },
    { q: 'Поставьте глаголы: If she (call), I (tell) her the news.', a: 'calls, will tell — First Conditional.' },
    { q: 'Поставьте глаголы: If I (be) taller, I (play) basketball.', a: 'were, would play — Second Conditional.' },
    { q: 'Поставьте глаголы: If we (leave) earlier, we (not / miss) the train.', a: 'had left, wouldn’t have missed — Third Conditional.' },
    { q: 'Перепишите с unless: If you don’t hurry, you’ll be late.', a: 'Unless you hurry, you’ll be late.' },
    { q: 'Выразите сожаление: Я не выучил слова к тесту.', a: 'I wish I had learnt the words for the test.' }
  ],
  q: [
    { q: 'If it ___ tomorrow, we will go to the beach.', o: ['will be sunny', 'is sunny', 'was sunny', 'would be sunny'], a: 1, e: 'First: if + Present Simple.' },
    { q: 'If I ___ you, I would accept the offer.', o: ['am', 'was being', 'were', 'will be'], a: 2, e: 'Second: If I were you.' },
    { q: 'If he had asked me, I ___ him.', o: ['will help', 'would help', 'would have helped', 'helped'], a: 2, e: 'Third Conditional.' },
    { q: 'We won’t go ___ it stops raining.', o: ['if', 'unless', 'when', 'in case'], a: 1, e: 'unless = if not.' },
    { q: 'I wish I ___ more free time now.', o: ['have', 'had', 'will have', 'had had'], a: 1, e: 'Сожаление о настоящем — Past Simple.' }
  ],
  s: [
    'Zero: Present + Present — всегда истинно.',
    'First: if + Present, will + V — реальное будущее.',
    'Second: if + Past, would + V — нереальное настоящее; If I were you.',
    'Third: if + Past Perfect, would have + V3 — нереальное прошлое.',
    'В if-части не ставим will/would; unless = if not; in case — на случай.',
    'I wish + Past (настоящее), + Past Perfect (прошлое), + would (раздражение).'
  ]
});
