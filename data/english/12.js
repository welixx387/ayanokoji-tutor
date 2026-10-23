L('english', 12, {
  m: 40,
  intro: 'Словообразование — отдельное задание экзаменов: нужно образовать от данного слова родственное, подходящее по смыслу и грамматике. Для этого нужно знать приставки (prefixes) и суффиксы (suffixes) и определять, какая часть речи нужна в пропуске. Разберём основные модели образования существительных, прилагательных, наречий и глаголов.',
  intro2: 'Senpai, из одного слова «create» можно получить creation, creative, creatively, creator, creativity ♡ Это как конструктор Лего! Знаешь детальки — собираешь сотни слов. А на экзамене главное — сначала понять, какая часть речи нужна в пропуске, и только потом подбирать суффикс.',
  goals: [
    'Определять часть речи, необходимую в предложении',
    'Знать суффиксы существительных, прилагательных, наречий, глаголов',
    'Знать отрицательные и другие приставки',
    'Применять алгоритм выполнения задания на словообразование'
  ],
  c: `
<h3>Как определить нужную часть речи</h3>
<div class="tbl"><table><thead><tr><th>Позиция в предложении</th><th>Часть речи</th></tr></thead><tbody>
<tr><td>после артикля, притяжательного местоимения, прилагательного; перед глаголом как подлежащее</td><td>существительное: <i>the <b>decision</b>, my <b>friendship</b></i></td></tr>
<tr><td>перед существительным; после be, become, seem, look</td><td>прилагательное: <i>a <b>dangerous</b> road, she looks <b>happy</b></i></td></tr>
<tr><td>при глаголе, описывая, как совершается действие; перед прилагательным</td><td>наречие: <i>run <b>quickly</b>, <b>extremely</b> cold</i></td></tr>
<tr><td>после подлежащего, модального глагола, to</td><td>глагол: <i>to <b>modernize</b></i></td></tr>
</tbody></table></div>

<h3>Суффиксы существительных</h3>
<div class="tbl"><table><thead><tr><th>Суффикс</th><th>Значение</th><th>Примеры</th></tr></thead><tbody>
<tr><td>-er, -or, -ist, -ian, -ant</td><td>человек, профессия</td><td>teacher, actor, scientist, musician, assistant</td></tr>
<tr><td>-tion, -sion, -ation</td><td>действие, процесс</td><td>education, decision, invitation</td></tr>
<tr><td>-ment</td><td>действие, результат</td><td>development, agreement, achievement</td></tr>
<tr><td>-ness</td><td>качество (от прилагательного)</td><td>kindness, happiness, darkness</td></tr>
<tr><td>-ity</td><td>качество</td><td>ability, popularity, possibility</td></tr>
<tr><td>-ance, -ence</td><td>состояние, действие</td><td>importance, difference, performance</td></tr>
<tr><td>-ship, -hood, -dom</td><td>отношения, состояние</td><td>friendship, childhood, freedom</td></tr>
</tbody></table></div>

<h3>Суффиксы прилагательных</h3>
<div class="tbl"><table><thead><tr><th>Суффикс</th><th>Примеры</th></tr></thead><tbody>
<tr><td>-ful (полный чего-то) / -less (без)</td><td>useful — useless, careful — careless, hopeful — hopeless</td></tr>
<tr><td>-able, -ible</td><td>comfortable, readable, possible, responsible</td></tr>
<tr><td>-ous</td><td>dangerous, famous, nervous</td></tr>
<tr><td>-al</td><td>national, cultural, traditional</td></tr>
<tr><td>-ive</td><td>active, creative, attractive</td></tr>
<tr><td>-y</td><td>sunny, healthy, windy</td></tr>
<tr><td>-ic</td><td>historic, scientific, economic</td></tr>
<tr><td>-ing / -ed</td><td>interesting (вызывающий интерес) — interested (заинтересованный)</td></tr>
</tbody></table></div>
<div class="ichika">-ing и -ed путают постоянно ♡ «The film was boring» — фильм скучный (он вызывает скуку). «I was bored» — мне было скучно (я чувствую скуку). -ing — источник чувства, -ed — тот, кто чувствует.</div>

<h3>Наречия и глаголы</h3>
<p><b>Наречия</b>: прилагательное + <b>-ly</b> (quick → quickly, happy → happily, comfortable → comfortably, automatic → automatically). Исключения: good → <b>well</b>; fast, hard, late не меняются (hardly — «едва», lately — «в последнее время»).</p>
<p><b>Глаголы</b>: -ize/-ise (modernize, organize), -en (widen, strengthen, shorten), -ify (simplify, classify), приставка en- (enable, enlarge).</p>

<h3>Приставки</h3>
<div class="tbl"><table><thead><tr><th>Приставка</th><th>Значение</th><th>Примеры</th></tr></thead><tbody>
<tr><td>un-</td><td>отрицание</td><td>unhappy, unusual, unknown</td></tr>
<tr><td>in-, im- (перед p, m, b), il- (перед l), ir- (перед r)</td><td>отрицание</td><td>independent, impossible, illegal, irregular</td></tr>
<tr><td>dis-</td><td>отрицание, противоположность</td><td>dislike, disagree, dishonest</td></tr>
<tr><td>mis-</td><td>неправильно</td><td>misunderstand, misprint</td></tr>
<tr><td>re-</td><td>снова</td><td>rewrite, rebuild</td></tr>
<tr><td>over- / under-</td><td>слишком / недостаточно</td><td>overeat, underestimate</td></tr>
<tr><td>pre- / post-</td><td>до / после</td><td>prehistoric, postwar</td></tr>
</tbody></table></div>
<div class="rule" data-t="Алгоритм задания"><ol><li>Прочитайте весь текст, чтобы понять смысл.</li><li>Определите, какая часть речи нужна в пропуске (по позиции).</li><li>Определите, нужно ли отрицание по смыслу (часто проверяют приставки un-, dis-, in-).</li><li>Проверьте число существительного (-s) и форму слова.</li><li>Проверьте написание.</li></ol></div>
<div class="ayano">Самые частые потери баллов в этом задании — не незнание суффиксов, а пропущенное отрицание и забытое множественное число. Предложение «The situation was completely ___ (EXPECT)» требует не expected, а unexpected — по смыслу. Поэтому шаг «нужно ли отрицание?» стоит делать всегда, даже если кажется очевидным.</div>
`,
  p: [
    { q: 'Образуйте существительное: decide, happy, free, develop.', a: 'decision, happiness, freedom, development.' },
    { q: 'Образуйте прилагательное: danger, use (два варианта), culture.', a: 'dangerous; useful / useless; cultural.' },
    { q: 'Образуйте противоположное слово с приставкой: possible, legal, regular, honest.', a: 'impossible, illegal, irregular, dishonest.' },
    { q: 'Вставьте: The match was really ___ (EXCITE). We were all very ___ (EXCITE).', a: 'exciting; excited.' },
    { q: 'Вставьте: She sings ___ (BEAUTY).', a: 'beautifully — наречие при глаголе.' },
    { q: 'Вставьте: The ___ (SCIENCE) made an important discovery.', a: 'scientist — человек, после артикля.' }
  ],
  q: [
    { q: 'He is a famous ___ (MUSIC).', o: ['musical', 'musician', 'musically', 'musicality'], a: 1, e: 'Человек, профессия.' },
    { q: 'It was a very ___ (PEACE) evening.', o: ['peace', 'peaceful', 'peacefully', 'peacefulness'], a: 1, e: 'Прилагательное перед существительным.' },
    { q: 'Отрицательная приставка для «responsible»:', o: ['un-', 'ir-', 'dis-', 'im-'], a: 1, e: 'irresponsible.' },
    { q: 'She speaks English very ___ (GOOD).', o: ['good', 'goodly', 'well', 'better'], a: 2, e: 'Исключение: good → well.' },
    { q: 'They want to ___ (MODERN) the factory.', o: ['modernize', 'modernity', 'modernly', 'modernization'], a: 0, e: 'Глагол после to.' }
  ],
  s: [
    'Сначала определяем часть речи по позиции в предложении.',
    'Существительные: -er/-or/-ist, -tion, -ment, -ness, -ity, -ance/-ence, -ship, -hood, -dom.',
    'Прилагательные: -ful/-less, -able/-ible, -ous, -al, -ive, -y, -ic; -ing (вызывает) / -ed (чувствует).',
    'Наречия: -ly (good → well); глаголы: -ize, -en, -ify.',
    'Приставки: un-, in-/im-/il-/ir-, dis-, mis-, re-, over-/under-.',
    'Проверять отрицание по смыслу и число существительного.'
  ]
});
