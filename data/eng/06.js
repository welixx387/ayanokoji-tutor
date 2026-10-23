L('eng', 6, {
  m: 35,
  intro: 'Условные предложения позволяют говорить о реальном и воображаемом: о законах природы, планах, мечтах и сожалениях. На B1 нужно уверенно владеть нулевым, первым и вторым типом, а также конструкциями с unless, in case и wish. Главное — понять логику: чем менее реальна ситуация, тем дальше назад сдвигается время.',
  intro2: 'Senpai, «If I have time, I’ll come» — я, скорее всего, приду ♡ «If I had time, I’d come» — увы, времени нет. Одна форма глагола — и вежливый отказ готов! Давай научимся мечтать по-английски.',
  goals: [
    'Строить условные предложения нулевого, первого и второго типа',
    'Выбирать тип по реальности ситуации',
    'Использовать unless, as long as, provided that и in case',
    'Выражать желания о настоящем с wish и if only'
  ],
  c: `
<h3>Три базовых типа</h3>
<div class="tbl"><table><thead><tr><th>Тип</th><th>Ситуация</th><th>Схема</th><th>Пример</th></tr></thead><tbody>
<tr><td>Zero</td><td>всегда так, закон, правило</td><td>if + Present, Present</td><td lang="en">If you heat ice, it melts.</td></tr>
<tr><td>First</td><td>реальное будущее</td><td>if + Present, will + V</td><td lang="en">If it rains, we’ll stay at home.</td></tr>
<tr><td>Second</td><td>нереальное или маловероятное сейчас/в будущем</td><td>if + Past, would + V</td><td lang="en">If I had a car, I would drive to work.</td></tr>
</tbody></table></div>
<div class="warn"><p>В части с if не ставят will и would: <s>If it will rain</s>, <s>If I would have</s>. Во втором типе с be часто используют were для всех лиц: <span lang="en">If I were you…, If he were taller…</span></p></div>
<ul class="ex-l">
<li><span lang="en">If I win the lottery, I’ll buy a house.</span><span class="tr">Я купил билет и реально рассчитываю (First).</span></li>
<li><span lang="en">If I won the lottery, I’d travel the world.</span><span class="tr">Просто мечтаю (Second).</span></li>
</ul>
<div class="ichika">Second Conditional — идеальный вежливый отказ ♡ <span lang="en">I’d love to come if I didn’t have so much homework.</span> Ты и согласие показал, и причину назвал. Мягко и по-английски!</div>

<h3>Другие союзы условия</h3>
<div class="tbl"><table><thead><tr><th>Союз</th><th>Значение</th><th>Пример</th></tr></thead><tbody>
<tr><td lang="en">unless</td><td>если не</td><td lang="en">You won’t pass unless you study.</td></tr>
<tr><td lang="en">as long as / provided (that)</td><td>при условии, что</td><td lang="en">You can borrow it as long as you return it tomorrow.</td></tr>
<tr><td lang="en">in case</td><td>на случай, если</td><td lang="en">Take an umbrella in case it rains.</td></tr>
<tr><td lang="en">otherwise</td><td>иначе</td><td lang="en">Hurry up, otherwise we’ll be late.</td></tr>
</tbody></table></div>
<div class="warn"><p><span lang="en">in case</span> ≠ <span lang="en">if</span>. <span lang="en">Take an umbrella if it rains</span> — возьми, если пойдёт дождь. <span lang="en">Take an umbrella in case it rains</span> — возьми заранее, на всякий случай.</p></div>

<h3>Wish и if only о настоящем</h3>
<ul class="ex-l">
<li><span lang="en">I wish I knew the answer.</span><span class="tr">Жаль, что я не знаю ответа (wish + Past Simple).</span></li>
<li><span lang="en">I wish I could speak Japanese.</span><span class="tr">Хотел бы я уметь говорить по-японски.</span></li>
<li><span lang="en">If only it weren’t so cold!</span><span class="tr">Если бы только не было так холодно!</span></li>
<li><span lang="en">I wish you would stop interrupting me.</span><span class="tr">Перестань, пожалуйста, перебивать (wish + would — раздражение, желание, чтобы кто-то изменил поведение).</span></li>
</ul>
<div class="rule" data-t="Логика сдвига"><p>Реальное → настоящее время. Нереальное настоящее → прошедшее (Past Simple, were, could). Нереальное прошлое (следующий уровень) → Past Perfect. Английский «отодвигает» нереальное назад во времени.</p></div>
<div class="ayano">Выбор типа зависит не от грамматики, а от твоей оценки реальности. «Если я сдам экзамен» — первый тип, если ты считаешь это вероятным, и второй, если почти не надеешься. Носитель по форме глагола сразу слышит, насколько ты уверен. Поэтому условные предложения — инструмент тонкой передачи отношения.</div>
`,
  p: [
    { q: 'Поставь глаголы: <span lang="en">If you (mix) blue and yellow, you (get) green.</span>', a: '<span lang="en">If you mix blue and yellow, you get green.</span> — Zero.' },
    { q: 'Поставь глаголы: <span lang="en">If she (call), I (tell) her.</span>', a: '<span lang="en">If she calls, I’ll tell her.</span>' },
    { q: 'Поставь глаголы: <span lang="en">If I (be) rich, I (help) everyone.</span>', a: '<span lang="en">If I were rich, I would help everyone.</span>' },
    { q: 'Перепиши с unless: <span lang="en">If you don’t hurry, you’ll miss the train.</span>', a: '<span lang="en">Unless you hurry, you’ll miss the train.</span>' },
    { q: 'Вырази сожаление: у тебя нет собаки.', a: '<span lang="en">I wish I had a dog.</span>' },
    { q: 'if или in case: <span lang="en">Write down my number ___ you get lost.</span>', a: '<span lang="en">in case</span> — на всякий случай.' }
  ],
  q: [
    { q: '<span lang="en">If it ___ tomorrow, we’ll cancel the trip.</span>', o: ['will snow', 'snows', 'snowed', 'would snow'], a: 1, e: 'First: if + Present.' },
    { q: '<span lang="en">If I ___ you, I’d apologise.</span>', o: ['am', 'was being', 'were', 'will be'], a: 2, e: 'If I were you.' },
    { q: '<span lang="en">I wish I ___ taller.</span>', o: ['am', 'were', 'will be', 'have been'], a: 1, e: 'wish + прошедшее для настоящего.' },
    { q: 'unless означает:', o: ['если', 'если не', 'на случай', 'пока'], a: 1, e: 'unless = if not.' },
    { q: 'Нереальное настоящее:', o: ['If I have time, I’ll call.', 'If I had time, I’d call.', 'If I have time, I call.', 'If I’ll have time, I call.'], a: 1, e: 'Second Conditional.' }
  ],
  s: [
    'Zero: if + Present, Present — всегда так.',
    'First: if + Present, will + V — реальное будущее.',
    'Second: if + Past, would + V — нереальное настоящее; If I were you…',
    'В части с if нет will/would.',
    'unless = if not; as long as / provided — при условии; in case — на всякий случай.',
    'wish + Past — сожаление о настоящем; wish + would — раздражение.'
  ]
});
