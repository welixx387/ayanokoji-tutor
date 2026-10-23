L('english', 4, {
  m: 35,
  intro: 'В английском нет одного «будущего времени» — есть несколько способов говорить о будущем, и выбор зависит от того, насколько действие запланировано и на чём основан прогноз. Разберём will, be going to, Present Continuous и Present Simple для будущего, а также правило придаточных времени и условия.',
  intro2: 'Senpai, «I’ll help you!» — решение прямо сейчас ♡ «I’m going to study medicine» — давно задуманный план. «I’m meeting Kate at 5» — уже договорились. Одно будущее, три разных оттенка. Сегодня научимся слышать эти оттенки и выбирать правильно.',
  goals: [
    'Употреблять will для спонтанных решений, обещаний и прогнозов',
    'Употреблять be going to для планов и прогнозов на основе фактов',
    'Использовать Present Continuous и Present Simple для будущего',
    'Применять правило времени в придаточных после when, if, until, as soon as'
  ],
  c: `
<h3>Will (Future Simple)</h3>
<p>Образование: <b>will + V</b>; отрицание <b>won’t</b>; вопрос <b>Will you…?</b></p>
<div class="tbl"><table><thead><tr><th>Употребление</th><th>Пример</th></tr></thead><tbody>
<tr><td>Спонтанное решение в момент речи</td><td>It’s cold. I’ll close the window.</td></tr>
<tr><td>Обещание, предложение, просьба</td><td>I’ll call you tomorrow. Will you help me?</td></tr>
<tr><td>Предсказание, мнение о будущем (без явных доказательств)</td><td>I think it will be a great party. People will live on Mars one day.</td></tr>
<tr><td>Факты о будущем</td><td>She will be 16 next month.</td></tr>
</tbody></table></div>
<p>Слова-спутники: <b>I think, I’m sure, probably, perhaps, tomorrow, next week, in the future</b>.</p>

<h3>Be going to</h3>
<p>Образование: <b>am/is/are going to + V</b>.</p>
<div class="tbl"><table><thead><tr><th>Употребление</th><th>Пример</th></tr></thead><tbody>
<tr><td>Заранее обдуманное намерение, план</td><td>I’m going to buy a new laptop next month (я давно решил).</td></tr>
<tr><td>Прогноз на основе того, что видно сейчас</td><td>Look at those clouds! It’s going to rain.</td></tr>
</tbody></table></div>
<div class="ichika">Сравни прогнозы ♡ «I think it will rain tomorrow» — просто моё мнение. «Look at the sky! It’s going to rain» — я вижу тучи, доказательство прямо перед глазами. Есть улика — going to, только мнение — will.</div>

<h3>Present Continuous и Present Simple для будущего</h3>
<div class="tbl"><table><thead><tr><th>Время</th><th>Когда</th><th>Пример</th></tr></thead><tbody>
<tr><td>Present Continuous</td><td>договорённость: время, место, участники уже определены</td><td>I’m meeting the dentist at 3 tomorrow. We’re flying to Sochi on Friday.</td></tr>
<tr><td>Present Simple</td><td>расписания, программы, официальные графики</td><td>The film starts at 7:30. The train leaves at 10.</td></tr>
</tbody></table></div>

<h3>Придаточные времени и условия</h3>
<div class="rule" data-t="Главное правило"><p>После <b>when, if, as soon as, until, before, after, unless</b> в придаточных времени и условия будущее выражается <b>Present Simple</b>, а не will: <i>I’ll call you <b>when</b> I <b>get</b> home</i> (не «will get»). <i><b>If</b> it <b>rains</b>, we’ll stay at home.</i></p></div>
<div class="warn"><p>Исключение — когда <b>when</b> или <b>if</b> вводят дополнительное придаточное (отвечают на вопрос «что?», а не «когда?» и «при каком условии?»): <i>I don’t know <b>when</b> he <b>will come</b></i> (не знаю что? — когда придёт). Здесь will возможен.</p></div>

<h3>Другие формы будущего</h3>
<ul><li><b>Future Continuous</b> (will be + V-ing) — действие в процессе в определённый момент будущего: <i>This time tomorrow I’ll be lying on the beach.</i></li><li><b>Future Perfect</b> (will have + V3) — действие завершится к моменту в будущем: <i>By 2030 I will have graduated from university.</i></li><li><b>be about to</b> — вот-вот: <i>Hurry up! The train is about to leave.</i></li></ul>
<div class="ayano">Выбор формы будущего — это вопрос о степени уверенности и подготовки. Только что решил — will. Решил заранее — going to. Уже договорился и всё назначено — Present Continuous. Это расписание, не зависящее от тебя, — Present Simple. Задай себе вопрос «когда принято решение и насколько оно закреплено?», и форма выберется сама.</div>
`,
  p: [
    { q: 'Выберите: The phone is ringing. — I (answer) it.', a: 'I’ll answer it — спонтанное решение.' },
    { q: 'Выберите: Look out! You (fall)!', a: 'You’re going to fall — прогноз по видимым признакам.' },
    { q: 'Выберите: We (have) a party on Saturday. Everyone is invited.', a: 'We’re having a party — договорённость.' },
    { q: 'Исправьте: I will phone you when I will arrive.', a: 'I will phone you when I arrive — после when в придаточном времени Present Simple.' },
    { q: 'Выберите: The lesson (start) at 8:30 every morning.', a: 'starts — расписание.' },
    { q: 'Переведите: «В это время завтра я буду писать экзамен».', a: 'This time tomorrow I will be writing an exam (Future Continuous).' }
  ],
  q: [
    { q: 'I’m thirsty. — I ___ get you some water.', o: ['am going to', 'will', 'am getting', 'get'], a: 1, e: 'Спонтанное предложение.' },
    { q: 'She has bought the tickets. She ___ visit her grandma.', o: ['will', 'is going to', 'visits', 'would'], a: 1, e: 'План, подготовленный заранее.' },
    { q: 'If he ___ late, we will start without him.', o: ['will be', 'is', 'was', 'be'], a: 1, e: 'Придаточное условия — Present Simple.' },
    { q: 'Our flight ___ at 6 a.m.', o: ['leaves', 'will leaving', 'is leave', 'going to leave'], a: 0, e: 'Расписание.' },
    { q: 'By next June I ___ my exams.', o: ['will pass', 'will have passed', 'pass', 'am passing'], a: 1, e: 'Future Perfect: к моменту в будущем.' }
  ],
  s: [
    'will + V: спонтанные решения, обещания, предсказания-мнения.',
    'be going to + V: планы, намерения, прогноз по видимым признакам.',
    'Present Continuous — договорённости; Present Simple — расписания.',
    'После when, if, until, as soon as в придаточных времени и условия — Present Simple вместо will.',
    'Future Continuous — процесс в момент будущего; Future Perfect — завершится к моменту.',
    'be about to — вот-вот произойдёт.'
  ]
});
