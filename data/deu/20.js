L('deu', 20, {
  m: 35,
  intro: 'Модальные глаголы в немецком умеют не только выражать долженствование и возможность, но и оценку говорящего: насколько он уверен в сказанном и откуда у него информация. «Er muss krank sein» — «он, должно быть, болен»; «Er soll reich sein» — «говорят, он богат»; «Er will nichts gesehen haben» — «он утверждает, что ничего не видел». Это субъективное значение модальных глаголов — тема C1.',
  intro2: 'Senpai, «Sie soll sehr klug sein» — не «она должна быть умной», а «говорят, она очень умная» ♡ Модальные глаголы умеют сплетничать! Сегодня разберёмся, кто кому что сказал и насколько это правда.',
  goals: [
    'Различать объективное и субъективное значение модальных глаголов',
    'Выражать степень уверенности: muss, dürfte, kann, könnte, kann nicht',
    'Передавать чужие утверждения: soll и will',
    'Строить субъективные модальные конструкции о прошлом'
  ],
  c: `
<h3>Шкала уверенности</h3>
<div class="tbl"><table><thead><tr><th>Форма</th><th>Уверенность</th><th>Пример</th><th>Перевод</th></tr></thead><tbody>
<tr><td lang="de">muss</td><td>почти 100 %</td><td lang="de">Er muss zu Hause sein, das Licht brennt.</td><td>Он, должно быть, дома.</td></tr>
<tr><td lang="de">dürfte</td><td>≈ 75 %</td><td lang="de">Das dürfte stimmen.</td><td>Это, вероятно, верно.</td></tr>
<tr><td lang="de">kann</td><td>≈ 50 %</td><td lang="de">Das kann sein.</td><td>Может быть.</td></tr>
<tr><td lang="de">könnte</td><td>меньше 50 %</td><td lang="de">Er könnte im Büro sein.</td><td>Он мог бы быть в офисе.</td></tr>
<tr><td lang="de">kann nicht</td><td>почти 0 %</td><td lang="de">Das kann nicht wahr sein!</td><td>Не может быть!</td></tr>
</tbody></table></div>
<p>Синонимы-наречия: <span lang="de">bestimmt, sicher</span> (muss), <span lang="de">wahrscheinlich, vermutlich</span> (dürfte), <span lang="de">vielleicht, möglicherweise</span> (kann, könnte). Предположение выражает и <span lang="de">werden + wohl</span>: <span lang="de">Er wird wohl schlafen.</span></p>

<h3>Чужие слова: sollen и wollen</h3>
<div class="two"><div><h4>soll — говорят другие</h4><p lang="de">Der Film soll sehr gut sein.</p><p>Говорят, фильм очень хороший.</p></div><div><h4>will — утверждает сам</h4><p lang="de">Er will den Täter gesehen haben.</p><p>Он утверждает, что видел преступника (но мы сомневаемся).</p></div></div>
<div class="ichika">Разница в источнике ♡ <span lang="de">soll</span> — информация от третьих лиц, слухи, новости. <span lang="de">will</span> — человек сам про себя заявляет, и говорящий слегка не верит. <span lang="de">Er will Millionär sein</span> — «он называет себя миллионером». Ну-ну.</div>

<h3>О прошлом</h3>
<div class="rule" data-t="модальный глагол + Partizip II + haben/sein"><p>Модальный глагол в настоящем времени (оценка — сейчас), действие — в прошлом.</p></div>
<ul class="ex-l">
<li><span lang="de">Er muss den Zug verpasst haben.</span><span class="tr">Он, должно быть, опоздал на поезд.</span></li>
<li><span lang="de">Sie kann das nicht gesagt haben.</span><span class="tr">Не может быть, чтобы она это сказала.</span></li>
<li><span lang="de">Der Politiker soll Geld angenommen haben.</span><span class="tr">Говорят, политик брал деньги.</span></li>
<li><span lang="de">Er will gestern zu Hause gewesen sein.</span><span class="tr">Он утверждает, что вчера был дома.</span></li>
</ul>
<div class="warn"><p>Сравни: <span lang="de">Er musste arbeiten</span> — он был вынужден работать (объективно, прошлое). <span lang="de">Er muss gearbeitet haben</span> — он, видимо, работал (вывод говорящего сейчас). Форма модального глагола решает, о чём речь.</p></div>

<h3>mögen: уступка</h3>
<p><span lang="de">Das mag sein, aber …</span> — «может, и так, но…». <span lang="de">Er mag ja recht haben, trotzdem …</span> — «пусть он и прав, но…». Полезно в дискуссии, чтобы признать аргумент и возразить.</p>
<div class="ayano">В новостях и научных текстах субъективные модальные глаголы — сигнал надёжности информации. <span lang="de">soll</span> означает, что редакция не проверяла сведения. Читая, задавай себе вопрос: кто это утверждает и насколько уверенно? Так ты читаешь не только слова, но и позицию автора.</div>
`,
  p: [
    { q: 'Вырази уверенность: «Она, должно быть, очень устала».', a: '<span lang="de">Sie muss sehr müde sein.</span>' },
    { q: 'Передай слух: «Говорят, в этом ресторане отлично готовят».', a: '<span lang="de">In diesem Restaurant soll man sehr gut essen.</span>' },
    { q: 'Передай сомнительное утверждение: «Он утверждает, что знает министра».', a: '<span lang="de">Er will den Minister kennen.</span>' },
    { q: 'О прошлом: «Он, должно быть, забыл ключ».', a: '<span lang="de">Er muss den Schlüssel vergessen haben.</span>' },
    { q: 'О прошлом: «Говорят, она жила в Японии».', a: '<span lang="de">Sie soll in Japan gelebt haben.</span>' },
    { q: 'Признай аргумент и возрази: «Может, и так, но…»', a: '<span lang="de">Das mag sein, aber …</span>' }
  ],
  q: [
    { q: '<span lang="de">Er soll sehr reich sein.</span> означает:', o: ['Он должен быть богатым.', 'Говорят, он очень богат.', 'Он хочет быть богатым.', 'Он может быть богат.'], a: 1, e: 'soll — слух.' },
    { q: 'Почти полная уверенность:', o: ['könnte', 'kann', 'muss', 'dürfte'], a: 2, e: 'muss.' },
    { q: '«Не может быть, чтобы он это сделал»:', o: ['Er muss das nicht getan haben.', 'Er kann das nicht getan haben.', 'Er soll das nicht tun.', 'Er will das nicht tun.'], a: 1, e: 'kann nicht + перфектный инфинитив.' },
    { q: '<span lang="de">Er will nichts gesehen haben.</span>', o: ['Он не хочет ничего видеть.', 'Он утверждает, что ничего не видел.', 'Говорят, он ничего не видел.', 'Он, должно быть, ничего не видел.'], a: 1, e: 'will — утверждение о себе.' },
    { q: 'Вероятно (≈ 75 %):', o: ['dürfte', 'muss', 'kann nicht', 'will'], a: 0, e: 'Das dürfte stimmen.' }
  ],
  s: [
    'Субъективные модальные глаголы выражают оценку говорящего.',
    'muss (≈100 %) > dürfte (≈75 %) > kann (≈50 %) > könnte > kann nicht (≈0 %).',
    'soll — «говорят»; will — «утверждает сам (сомнительно)».',
    'О прошлом: muss … gemacht haben, soll … gewesen sein.',
    'Er musste arbeiten (объективно) ≠ Er muss gearbeitet haben (вывод).',
    'mag — уступка: Das mag sein, aber…'
  ]
});
