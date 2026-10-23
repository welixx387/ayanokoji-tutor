L('english', 3, {
  m: 40,
  intro: 'Present Perfect — время, которого нет в русском языке, поэтому оно кажется самым трудным. Но идея простая: Present Perfect связывает прошлое с настоящим. Важно не когда произошло действие, а его результат или опыт сейчас. Разберём образование, употребление, слова-маркеры и главную трудность — выбор между Present Perfect и Past Simple.',
  intro2: 'Senpai, «I have lost my keys» и «I lost my keys yesterday» ♡ Первое — ключей нет прямо сейчас, нужно что-то делать! Второе — просто рассказ о прошлом, возможно, ключи уже нашлись. Present Perfect — это всегда про «сейчас». Сегодня поймём это раз и навсегда.',
  goals: [
    'Образовывать Present Perfect',
    'Знать случаи употребления Present Perfect',
    'Использовать just, already, yet, ever, never, for, since',
    'Различать Present Perfect и Past Simple, been и gone'
  ],
  c: `
<h3>Образование</h3>
<div class="tbl"><table><thead><tr><th>Форма</th><th>Схема</th><th>Пример</th></tr></thead><tbody>
<tr><td>Утверждение</td><td>have / has + V3 (3-я форма)</td><td>I have finished. She has gone.</td></tr>
<tr><td>Отрицание</td><td>haven’t / hasn’t + V3</td><td>We haven’t seen it.</td></tr>
<tr><td>Вопрос</td><td>Have / Has + подлежащее + V3?</td><td>Have you ever been to Paris?</td></tr>
</tbody></table></div>
<p>V3 правильных глаголов — с -ed (worked), неправильных — третья колонка таблицы (seen, written, done, been).</p>

<h3>Когда употребляется</h3>
<div class="tbl"><table><thead><tr><th>Случай</th><th>Пример</th></tr></thead><tbody>
<tr><td><b>Результат</b> в настоящем</td><td>I’ve broken my phone (= сейчас он сломан). She has cut her finger.</td></tr>
<tr><td><b>Опыт</b> за всю жизнь (не важно когда)</td><td>Have you ever tried sushi? I’ve never been to Japan.</td></tr>
<tr><td>Действие в <b>незаконченный</b> период</td><td>I’ve drunk three cups of coffee today. She has written two letters this week.</td></tr>
<tr><td>Действие, начавшееся в прошлом и продолжающееся сейчас (с for, since)</td><td>I have known him for ten years. They have lived here since 2015.</td></tr>
<tr><td>Только что завершённое действие</td><td>The film has just started.</td></tr>
</tbody></table></div>
<div class="tbl"><table><thead><tr><th>Маркер</th><th>Место и значение</th></tr></thead><tbody>
<tr><td>just</td><td>только что; между have и V3: I’ve just eaten.</td></tr>
<tr><td>already</td><td>уже (в утверждениях): She has already left.</td></tr>
<tr><td>yet</td><td>ещё не / уже (в отрицаниях и вопросах), в конце: I haven’t done it yet. Have you finished yet?</td></tr>
<tr><td>ever / never</td><td>когда-либо / никогда: Have you ever…? I’ve never…</td></tr>
<tr><td>for</td><td>в течение (период): for two hours, for a long time</td></tr>
<tr><td>since</td><td>с (момент начала): since Monday, since 2020, since I was a child</td></tr>
<tr><td>recently, lately, so far, today, this week</td><td>незаконченный период или недавнее время</td></tr>
</tbody></table></div>

<h3>Present Perfect или Past Simple?</h3>
<div class="rule" data-t="Главное правило"><p>Если указано или подразумевается <b>конкретное время в прошлом</b> (yesterday, last year, in 2019, ago, when…) — только <b>Past Simple</b>. Если время не важно или период ещё не закончился — <b>Present Perfect</b>.</p></div>
<div class="ex" data-t="Сравним"><ol><li>I <b>have been</b> to London. (опыт, когда — неважно) — I <b>went</b> to London <b>last year</b>. (конкретное время)</li><li>She <b>has written</b> three books. (она жива и может написать ещё) — Pushkin <b>wrote</b> many poems. (период его жизни закончен)</li><li>Have you seen Tom <b>today</b>? (день не закончился) — Did you see Tom <b>yesterday</b>?</li></ol></div>
<div class="ichika">Типичный диалог ♡ Начинаем с Present Perfect, а подробности — в Past Simple. «Have you ever been to Italy?» — «Yes, I have. I went there two years ago. We visited Rome». Как только появилось «когда» — переходим в Past Simple.</div>
<div class="warn"><p><b>been</b> или <b>gone</b>? <i>He has <b>gone</b> to Paris</i> — уехал и сейчас там. <i>He has <b>been</b> to Paris</i> — побывал и вернулся. Вопрос «Where is Tom?» — «He’s gone to the shop» (он ещё в магазине).</p></div>

<h3>Present Perfect Continuous (коротко)</h3>
<p><b>have/has been + V-ing</b> — действие длилось до настоящего момента и продолжается или только что закончилось, важна длительность: <i>I have been waiting for you for an hour! It has been raining all day.</i></p>
<div class="ayano">Самый надёжный тест для выбора времени — вопрос «есть ли в предложении точка во времени?». Если есть «вчера», «в 2019 году», «два дня назад» — это прошлое, отрезанное от сейчас, Past Simple. Если точки нет или период до сих пор открыт («сегодня», «в этом году», «никогда») — Present Perfect. Русскоязычные часто ошибаются, переводя «я видел» всегда через saw. Смотри на время, а не на перевод.</div>
`,
  p: [
    { q: 'Поставьте глагол: I (lose) my keys. Can you help me?', a: 'I have lost my keys — результат сейчас.' },
    { q: 'Выберите время: I (see) this film last week.', a: 'saw — конкретное время в прошлом (last week).' },
    { q: 'Вставьте for или since: I have lived here ___ 2018. She has worked there ___ five years.', a: 'since 2018; for five years.' },
    { q: 'Вставьте already или yet: Have you done your homework ___? — Yes, I’ve ___ done it.', a: 'yet; already.' },
    { q: 'Объясните разницу: She has gone to Spain. — She has been to Spain.', a: 'gone — уехала и сейчас там; been — побывала и вернулась.' },
    { q: 'Найдите ошибку: I have visited Moscow in 2020.', a: 'Конкретная дата → Past Simple: I visited Moscow in 2020.' }
  ],
  q: [
    { q: 'I ___ never ___ a horse.', o: ['have / ride', 'have / ridden', 'did / ride', 'has / ridden'], a: 1, e: 'Опыт: have + V3.' },
    { q: 'She ___ the letter yesterday.', o: ['has written', 'wrote', 'have written', 'writes'], a: 1, e: 'yesterday — Past Simple.' },
    { q: 'They have been friends ___ childhood.', o: ['for', 'since', 'ago', 'during'], a: 1, e: 'since + момент.' },
    { q: 'Has the bus arrived ___?', o: ['already', 'yet', 'just', 'ago'], a: 1, e: 'yet — в вопросах в конце.' },
    { q: 'Where’s Mum? — She’s ___ to the supermarket.', o: ['been', 'gone', 'went', 'go'], a: 1, e: 'Она сейчас там.' }
  ],
  s: [
    'Present Perfect: have/has + V3.',
    'Употребление: результат, опыт, незаконченный период, действие до сих пор (for, since), just.',
    'Маркеры: just, already, yet, ever, never, for, since, recently, today, this week.',
    'Конкретное время в прошлом (yesterday, ago, in 2019) — только Past Simple.',
    'been — побывал и вернулся; gone — уехал и там.',
    'Present Perfect Continuous: have/has been + V-ing — длительность до настоящего.'
  ]
});
