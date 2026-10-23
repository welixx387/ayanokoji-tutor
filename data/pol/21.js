L('pol', 21, {
  m: 40,
  intro: 'Публицистический и научный стиль — то, с чем сталкивается каждый, кто учится или работает в Польше: статьи, отчёты, рефераты, презентации. У этих стилей есть узнаваемые черты: номинализация, безличные конструкции, связки, сокращения и осторожные формулировки. В уроке — инструменты для чтения и написания таких текстов.',
  intro2: 'Senpai, «Przeprowadzono badania, które wykazały…» — «Были проведены исследования, которые показали…» ♡ Так звучит польская наука. Сегодня научимся писать как польский профессор. Очки и бородка — по желанию!',
  goals: [
    'Узнавать черты научного и публицистического стиля',
    'Использовать безличные конструкции и номинализацию',
    'Знать частые сокращения: m.in., np., tzw., tj.',
    'Описывать данные и смягчать утверждения'
  ],
  c: `
<h3>Черты научного стиля</h3>
<div class="tbl"><table><thead><tr><th>Черта</th><th>Примеры</th></tr></thead><tbody>
<tr><td>Безличность</td><td lang="pl">stwierdzono, zaobserwowano, należy podkreślić, można przypuszczać</td></tr>
<tr><td>Номинализация</td><td lang="pl">przeprowadzenie badań, wzrost liczby, ocena wyników</td></tr>
<tr><td>Интернационализмы</td><td lang="pl">analiza, hipoteza, kontekst, metoda, struktura</td></tr>
<tr><td>Связки</td><td lang="pl">natomiast, zatem, ponadto, jednakże, mianowicie, w związku z tym</td></tr>
<tr><td>Смягчение</td><td lang="pl">prawdopodobnie, wydaje się, można przypuszczać, w pewnym stopniu</td></tr>
</tbody></table></div>
<div class="ex" data-t="Научный абзац"><p lang="pl">W badaniu wzięło udział 200 uczniów. Stwierdzono, że regularne czytanie wpływa na rozwój słownictwa. Wydaje się zatem, że czytanie powinno odgrywać większą rolę w programie nauczania. Należy jednak podkreślić, że próba była stosunkowo niewielka.</p></div>
<div class="ichika">«Natomiast» — любимое слово польских учёных ♡ Значит «а», «же», «тогда как»: <span lang="pl">Chłopcy wybierali sport, natomiast dziewczęta — sztukę.</span> Вставь его в свой реферат — и преподаватель кивнёт с уважением.</div>

<h3>Сокращения</h3>
<div class="tbl"><table><thead><tr><th>Сокращение</th><th>Полностью</th><th>Значение</th></tr></thead><tbody>
<tr><td lang="pl">m.in.</td><td lang="pl">między innymi</td><td>в том числе, среди прочего</td></tr>
<tr><td lang="pl">np.</td><td lang="pl">na przykład</td><td>например</td></tr>
<tr><td lang="pl">tzw.</td><td lang="pl">tak zwany</td><td>так называемый</td></tr>
<tr><td lang="pl">tj.</td><td lang="pl">to jest</td><td>то есть</td></tr>
<tr><td lang="pl">itd. / itp.</td><td lang="pl">i tak dalej / i tym podobne</td><td>и так далее / и тому подобное</td></tr>
<tr><td lang="pl">ok., r., w.</td><td lang="pl">około, rok, wiek</td><td>около, год, век</td></tr>
</tbody></table></div>

<h3>Описание данных</h3>
<ul class="ex-l">
<li><span lang="pl">Odsetek młodych czytelników wzrósł z 30 do 45 procent.</span><span class="tr">Доля выросла с 30 до 45 процентов.</span></li>
<li><span lang="pl">Liczba wypadków spadła o 10 procent.</span><span class="tr">Количество упало на 10 процентов.</span></li>
<li><span lang="pl">W porównaniu z rokiem ubiegłym …</span><span class="tr">По сравнению с прошлым годом…</span></li>
<li><span lang="pl">Z danych wynika, że …</span><span class="tr">Из данных следует, что…</span></li>
</ul>
<div class="warn"><p><span lang="pl">z … do</span> — с какого значения на какое; <span lang="pl">o</span> — на сколько: <span lang="pl">wzrosła o 5%</span>. Как немецкое auf/um и английское to/by.</p></div>

<h3>Публицистика</h3>
<ul class="ex-l">
<li><span lang="pl">Wzrost cen paliw. Rząd zapowiada zmiany.</span><span class="tr">Заголовки: номинализация, без глагола.</span></li>
<li><span lang="pl">Jak podaje PAP, … / Według ekspertów, …</span><span class="tr">Ссылка на источник (PAP — польское информационное агентство).</span></li>
<li><span lang="pl">Polityk rzekomo przyjął łapówkę. Podobno …</span><span class="tr">rzekomo — якобы; podobno — говорят, будто бы.</span></li>
</ul>
<div class="ayano">Научный стиль ценит точность, а не сложность. Не пытайся писать длинные фразы ради солидности: одна мысль — одно предложение, данные — с источником, вывод — с осторожностью. Перед сдачей проверь каждое категоричное утверждение: есть ли у него основание? Если нет — смягчи: <span lang="pl">wydaje się, można przypuszczać</span>.</div>
`,
  p: [
    { q: 'Сделай безличным: <span lang="pl">Badacze stwierdzili, że …</span>', a: '<span lang="pl">Stwierdzono, że …</span>' },
    { q: 'Номинализируй: <span lang="pl">Ceny szybko wzrosły.</span>', a: '<span lang="pl">szybki wzrost cen</span>' },
    { q: 'Расшифруй: <span lang="pl">m.in., tzw., np.</span>', a: '<span lang="pl">między innymi, tak zwany, na przykład</span>' },
    { q: 'Опиши: количество студентов упало с 500 до 400.', a: '<span lang="pl">Liczba studentów spadła z 500 do 400.</span>' },
    { q: 'Смягчи: <span lang="pl">To jest najlepsza metoda.</span>', a: '<span lang="pl">Wydaje się, że jest to jedna z najskuteczniejszych metod.</span>' },
    { q: 'Сошлись на экспертов: «По мнению экспертов, цены вырастут».', a: '<span lang="pl">Według ekspertów ceny wzrosną.</span>' }
  ],
  q: [
    { q: 'Безличная форма научного стиля:', o: ['zrobiłem', 'stwierdzono', 'zrobimy', 'zrób'], a: 1, e: 'Форма на -no.' },
    { q: '<span lang="pl">tzw.</span> =', o: ['to znaczy', 'tak zwany', 'też wiem', 'trzeba wiedzieć'], a: 1, e: 'Так называемый.' },
    { q: '«Выросла на 5%»:', o: ['wzrosła do 5%', 'wzrosła o 5%', 'wzrosła z 5%', 'wzrosła na 5%'], a: 1, e: 'o — на сколько.' },
    { q: '<span lang="pl">rzekomo</span>:', o: ['точно', 'якобы', 'быстро', 'редко'], a: 1, e: 'Сомнение.' },
    { q: 'Связка «тогда как, а»:', o: ['natomiast', 'ponieważ', 'czyli', 'więc'], a: 0, e: 'natomiast.' }
  ],
  s: [
    'Научный стиль: безличность (stwierdzono, należy), номинализация, интернационализмы.',
    'Связки: natomiast, zatem, ponadto, jednakże, mianowicie.',
    'Смягчение: prawdopodobnie, wydaje się, można przypuszczać.',
    'Сокращения: m.in., np., tzw., tj., itd., itp., ok.',
    'Данные: wzrósł z … do …, spadł o …; Z danych wynika, że…',
    'Публицистика: заголовки-номинализации, według…, rzekomo, podobno.'
  ]
});
