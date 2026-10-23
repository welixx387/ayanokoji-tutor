L('eng', 11, {
  m: 40,
  intro: 'Третий тип условных предложений — о прошлом, которое уже нельзя изменить: «если бы я тогда…». Смешанные условные соединяют прошлое и настоящее. Вместе с wish/if only и should have это полный набор для разговора о сожалениях, упрёках и альтернативной истории. Это ключевая грамматика уровня B2.',
  intro2: 'Senpai, «If I had studied harder, I would have passed» — классика ночи после экзамена ♡ Но давай использовать это время для анализа, а не для страданий: в английском даже сожаления звучат красиво!',
  goals: [
    'Строить третий тип условных предложений',
    'Использовать смешанные условные: прошлое → настоящее и наоборот',
    'Выражать сожаление о прошлом с wish и if only',
    'Выражать упрёк и сожаление через should have и ought to have'
  ],
  c: `
<h3>Третий тип: нереальное прошлое</h3>
<div class="rule" data-t="if + Past Perfect, would have + V3"><p>Ситуация в прошлом уже случилась иначе, мы представляем альтернативу.</p></div>
<ul class="ex-l">
<li><span lang="en">If I had left earlier, I wouldn’t have missed the train.</span><span class="tr">Если бы я вышел раньше, я бы не опоздал на поезд (но я вышел поздно).</span></li>
<li><span lang="en">She would have called you if she had known.</span><span class="tr">Она бы позвонила, если бы знала.</span></li>
<li><span lang="en">If it hadn’t rained, we could have gone to the beach.</span><span class="tr">could have / might have — возможность в нереальном прошлом.</span></li>
</ul>
<div class="warn"><p>Сокращение <span lang="en">’d</span> бывает и had, и would: <span lang="en">If I’d known, I’d have helped</span> = <span lang="en">If I had known, I would have helped</span>. После if — had, перед have + V3 — would.</p></div>

<h3>Смешанные условные</h3>
<div class="tbl"><table><thead><tr><th>Тип</th><th>Схема</th><th>Пример</th></tr></thead><tbody>
<tr><td>прошлое условие → результат сейчас</td><td>if + Past Perfect, would + V</td><td lang="en">If I had taken the job, I would be rich now.</td></tr>
<tr><td>постоянное состояние → результат в прошлом</td><td>if + Past Simple, would have + V3</td><td lang="en">If I were more patient, I wouldn’t have shouted at him.</td></tr>
</tbody></table></div>
<div class="ichika">Смешанные условные — как машина времени ♡ «Если бы я тогда выучил японский (прошлое), я бы сейчас смотрела аниме без субтитров (настоящее)». Две эпохи в одном предложении. Звучит очень по-взрослому!</div>

<h3>Сожаления: wish и if only</h3>
<div class="tbl"><table><thead><tr><th>О чём</th><th>Форма</th><th>Пример</th></tr></thead><tbody>
<tr><td>о настоящем</td><td>wish + Past Simple</td><td lang="en">I wish I lived closer to the sea.</td></tr>
<tr><td>о прошлом</td><td>wish + Past Perfect</td><td lang="en">I wish I had listened to my parents.</td></tr>
<tr><td>о поведении других (раздражение)</td><td>wish + would</td><td lang="en">I wish he would stop complaining.</td></tr>
<tr><td>сильная эмоция</td><td>if only + …</td><td lang="en">If only I hadn’t said that!</td></tr>
</tbody></table></div>

<h3>Упрёки и сожаления: should have</h3>
<ul class="ex-l">
<li><span lang="en">You should have told me earlier.</span><span class="tr">Тебе следовало сказать мне раньше (но ты не сказал).</span></li>
<li><span lang="en">I shouldn’t have eaten so much cake.</span><span class="tr">Зря я съел так много торта.</span></li>
<li><span lang="en">They ought to have apologised.</span><span class="tr">Им следовало извиниться.</span></li>
</ul>
<div class="note"><p>В формальном стиле if можно опустить, поставив had в начало (инверсия): <span lang="en">Had I known, I would have come.</span> Подробнее — в уроке об инверсии уровня C1.</p></div>
<div class="ayano">Чтобы не путаться, задавай два вопроса. Когда происходит условие — в прошлом или это постоянное свойство? Когда происходит результат — в прошлом или сейчас? Ответы однозначно определяют формы. «Если бы я был внимательнее (всегда), я бы не потерял ключи (вчера)» — постоянное → прошлое: <span lang="en">If I were more careful, I wouldn’t have lost my keys.</span></div>
`,
  p: [
    { q: 'Составь третий тип: <span lang="en">I didn’t know about the party, so I didn’t go.</span>', a: '<span lang="en">If I had known about the party, I would have gone.</span>' },
    { q: 'Составь смешанное: <span lang="en">I didn’t study medicine, so I’m not a doctor now.</span>', a: '<span lang="en">If I had studied medicine, I would be a doctor now.</span>' },
    { q: 'Вырази сожаление: ты не купил билеты заранее.', a: '<span lang="en">I wish I had bought the tickets in advance.</span>' },
    { q: 'Вырази упрёк: друг не предупредил тебя.', a: '<span lang="en">You should have warned me.</span>' },
    { q: 'Раскрой сокращения: <span lang="en">If she’d asked, I’d have helped.</span>', a: '<span lang="en">If she had asked, I would have helped.</span>' },
    { q: 'Смешанное: <span lang="en">He isn’t brave, so he didn’t jump into the water.</span>', a: '<span lang="en">If he were braver, he would have jumped into the water.</span>' }
  ],
  q: [
    { q: '<span lang="en">If you ___ me, I would have helped.</span>', o: ['asked', 'had asked', 'would ask', 'have asked'], a: 1, e: 'Third: if + Past Perfect.' },
    { q: '<span lang="en">If I had saved money, I ___ a car now.</span>', o: ['would have', 'would have had', 'had', 'will have'], a: 0, e: 'Смешанный: результат сейчас.' },
    { q: '<span lang="en">I wish I ___ that.</span> (сожаление о прошлом)', o: ['didn’t say', 'hadn’t said', 'wouldn’t say', 'don’t say'], a: 1, e: 'wish + Past Perfect.' },
    { q: '«Тебе не стоило этого делать»:', o: ['You shouldn’t do it.', 'You shouldn’t have done it.', 'You mustn’t have done it.', 'You didn’t should do it.'], a: 1, e: 'should have + V3.' },
    { q: '<span lang="en">___ I known, I would have come.</span>', o: ['If', 'Had', 'Have', 'Should'], a: 1, e: 'Инверсия вместо if.' }
  ],
  s: [
    'Third: if + Past Perfect, would have + V3 — нереальное прошлое.',
    'could have / might have — возможность в нереальном прошлом.',
    'Смешанные: прошлое → сейчас (had done, would do); постоянное → прошлое (were, would have done).',
    'wish + Past — о настоящем; wish + Past Perfect — о прошлом; wish + would — раздражение.',
    'should have / ought to have + V3 — упрёк и сожаление.',
    'Had I known… — формальная инверсия вместо if.'
  ]
});
