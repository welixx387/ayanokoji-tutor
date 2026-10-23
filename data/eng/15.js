L('eng', 15, {
  m: 40,
  intro: 'На уровне B2 от тебя ждут связного аргументированного текста: эссе, где мысль развивается от тезиса к выводу, а переходы между частями ясны. В этом уроке — связки по функциям, структура эссе-мнения, правила абзаца и типичные ошибки русскоговорящих в письменной речи. Всё это напрямую влияет на оценку на экзаменах B2 First и IELTS.',
  intro2: 'Senpai, эссе — это не «написать много», а провести читателя по мысли за руку ♡ Связки — это перила на лестнице. Без них читатель падает. Давай построим крепкую лестницу!',
  goals: [
    'Использовать связки по функциям: добавление, контраст, причина, следствие, пример',
    'Строить эссе-мнение из четырёх-пяти абзацев',
    'Писать абзац по схеме тезис — объяснение — пример',
    'Избегать типичных ошибок пунктуации и стиля'
  ],
  c: `
<h3>Связки по функциям</h3>
<div class="tbl"><table><thead><tr><th>Функция</th><th>Связки</th></tr></thead><tbody>
<tr><td>Добавление</td><td lang="en">moreover, furthermore, in addition, what is more, besides</td></tr>
<tr><td>Контраст</td><td lang="en">however, nevertheless, on the other hand, whereas, while, although, despite</td></tr>
<tr><td>Причина</td><td lang="en">because of, due to, owing to, since, as</td></tr>
<tr><td>Следствие</td><td lang="en">therefore, consequently, as a result, thus, hence</td></tr>
<tr><td>Пример</td><td lang="en">for instance, for example, such as, a case in point is</td></tr>
<tr><td>Вывод</td><td lang="en">to sum up, in conclusion, all things considered, on balance</td></tr>
</tbody></table></div>
<div class="warn"><p>Грамматика связок различается. <span lang="en">Although</span> — союз, после него предложение: <span lang="en">Although it was raining, we went out.</span> <span lang="en">Despite / in spite of</span> — предлоги, после них существительное или -ing: <span lang="en">Despite the rain…, Despite being tired…</span> <span lang="en">However</span> начинает новое предложение и отделяется запятой.</p></div>

<h3>Структура эссе-мнения</h3>
<ol>
<li><b>Введение.</b> Перефразируй тему, обозначь актуальность и дай тезис: <span lang="en">In my view, … for two main reasons.</span></li>
<li><b>Аргумент 1.</b> Тезис абзаца → объяснение → пример.</li>
<li><b>Аргумент 2.</b> Та же схема.</li>
<li><b>Контраргумент</b> (по желанию): <span lang="en">Admittedly, … However, …</span></li>
<li><b>Вывод.</b> Кратко повтори позицию другими словами, без новых аргументов.</li>
</ol>
<div class="ex" data-t="Пример абзаца"><p lang="en">Firstly, studying abroad helps young people become more independent. Living without their parents, students have to manage their own budget, cook and solve everyday problems. For instance, my cousin, who spent a year in Germany, came back far more confident and organised. Therefore, the experience develops skills that no classroom can teach.</p></div>
<div class="ichika">Посмотри на абзац как на гамбургер ♡ Верхняя булочка — тезис, начинка — объяснение и пример, нижняя булочка — вывод абзаца. Без булочек всё разваливается, без начинки — невкусно!</div>

<h3>Типичные ошибки русскоговорящих</h3>
<div class="tbl"><table><thead><tr><th>Ошибка</th><th>Правильно</th></tr></thead><tbody>
<tr><td><s>Also, it is important…</s> в начале каждого абзаца</td><td>Разнообразь: <span lang="en">Furthermore, … Another key point is…</span></td></tr>
<tr><td><s>I think that in my opinion…</s></td><td>Одно вводное выражение: <span lang="en">In my opinion, …</span></td></tr>
<tr><td><s>Nowadays people use internet.</s></td><td lang="en">Nowadays people use the internet.</td></tr>
<tr><td><s>It is very important problem.</s></td><td lang="en">It is a very important problem / a serious issue.</td></tr>
<tr><td>Слишком длинные предложения с цепочкой запятых</td><td>Одна мысль — одно предложение, связь через связки</td></tr>
<tr><td>Разговорные сокращения <s>don’t, can’t, kids, stuff</s></td><td>В эссе: <span lang="en">do not, cannot, children, things</span></td></tr>
</tbody></table></div>

<h3>Полезные выражения для мнения</h3>
<ul class="ex-l">
<li><span lang="en">There is no doubt that…</span><span class="tr">Нет сомнений, что…</span></li>
<li><span lang="en">It could be argued that…</span><span class="tr">Можно утверждать, что…</span></li>
<li><span lang="en">Opponents of this view claim that…</span><span class="tr">Противники этой точки зрения утверждают…</span></li>
<li><span lang="en">This is not to say that…</span><span class="tr">Это не значит, что…</span></li>
</ul>
<div class="ayano">Самое частое слабое место эссе — аргумент без примера. «Это полезно для развития» — пустое утверждение, пока не показано, как именно. Пиши каждый аргумент по схеме «тезис — почему — пример — вывод». Если для аргумента не находится конкретного примера, возможно, это не аргумент, а повтор тезиса.</div>
`,
  p: [
    { q: 'Соедини с although: <span lang="en">It was expensive. We bought it.</span>', a: '<span lang="en">Although it was expensive, we bought it.</span>' },
    { q: 'Перепиши с despite: <span lang="en">Although she was ill, she went to work.</span>', a: '<span lang="en">Despite being ill, she went to work.</span> / <span lang="en">Despite her illness, …</span>' },
    { q: 'Вставь связку следствия: <span lang="en">The roads were icy. ___, many flights were delayed.</span>', a: '<span lang="en">As a result / Consequently</span>' },
    { q: 'Напиши тезис введения на тему «Должны ли школьники носить форму?»', a: 'Например: <span lang="en">In my view, school uniforms are beneficial, as they reduce social pressure and save families money.</span>' },
    { q: 'Исправь: <i>Nowadays many people uses internet for study.</i>', a: '<span lang="en">Nowadays many people use the internet for studying.</span>' },
    { q: 'Как начать контраргумент?', a: '<span lang="en">Admittedly, … / It could be argued that… However, …</span>' }
  ],
  q: [
    { q: '<span lang="en">___ the bad weather, the match went ahead.</span>', o: ['Although', 'Despite', 'However', 'Whereas'], a: 1, e: 'Despite + существительное.' },
    { q: 'Связка следствия:', o: ['moreover', 'therefore', 'whereas', 'for instance'], a: 1, e: 'therefore — следовательно.' },
    { q: 'В выводе эссе нужно:', o: ['привести новый аргумент', 'повторить позицию другими словами', 'задать вопрос читателю', 'дать пример'], a: 1, e: 'Без новых аргументов.' },
    { q: 'Стиль эссе — какое слово уместно?', o: ['kids', 'stuff', 'children', 'gonna'], a: 2, e: 'Нейтральный стиль.' },
    { q: '<span lang="en">I live in a city, ___ my brother lives in a village.</span>', o: ['whereas', 'despite', 'therefore', 'moreover'], a: 0, e: 'Контраст двух фактов.' }
  ],
  s: [
    'Связки: добавление, контраст, причина, следствие, пример, вывод.',
    'although + предложение; despite + существительное/-ing; However, в начале предложения.',
    'Эссе: введение с тезисом → 2 аргумента → контраргумент → вывод.',
    'Абзац: тезис → объяснение → пример → мини-вывод.',
    'Без разговорных сокращений; артикли the internet, a serious issue.',
    'Аргумент без примера — слабый аргумент.'
  ]
});
