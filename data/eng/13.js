L('eng', 13, {
  m: 40,
  intro: 'Придаточные определительные — главный инструмент, чтобы строить сложные, но ясные предложения. На B2 нужно различать ограничительные и неограничительные придаточные, уверенно использовать whose, where, when, which с предлогами и сокращать придаточные до причастных оборотов. Это сильно влияет на оценку письма.',
  intro2: 'Senpai, «My brother who lives in London» и «My brother, who lives in London» — две запятые меняют количество братьев! ♡ Без запятых братьев несколько, с запятыми — он один. Запятые в английском — это смысл, а не украшение.',
  goals: [
    'Различать ограничительные и неограничительные придаточные',
    'Выбирать who, which, that, whose, where, when, why',
    'Ставить предлог в придаточном формально и разговорно',
    'Сокращать придаточные до причастных оборотов'
  ],
  c: `
<h3>Два типа придаточных</h3>
<div class="tbl"><table><thead><tr><th></th><th>Ограничительные (defining)</th><th>Неограничительные (non-defining)</th></tr></thead><tbody>
<tr><td>Роль</td><td>указывают, о ком/чём речь</td><td>добавляют информацию об уже понятном</td></tr>
<tr><td>Запятые</td><td>нет</td><td>есть</td></tr>
<tr><td>that</td><td>можно вместо who/which</td><td>нельзя</td></tr>
<tr><td>Пропуск слова</td><td>можно, если оно дополнение</td><td>нельзя</td></tr>
<tr><td>Пример</td><td lang="en">The book (that) I bought is great.</td><td lang="en">This book, which I bought yesterday, is great.</td></tr>
</tbody></table></div>
<ul class="ex-l">
<li><span lang="en">My sister who lives in Paris is an artist.</span><span class="tr">У меня несколько сестёр; та, что живёт в Париже, — художница.</span></li>
<li><span lang="en">My sister, who lives in Paris, is an artist.</span><span class="tr">Сестра одна; то, что она живёт в Париже, — дополнительная информация.</span></li>
</ul>

<h3>Относительные слова</h3>
<div class="tbl"><table><thead><tr><th>Слово</th><th>Для</th><th>Пример</th></tr></thead><tbody>
<tr><td lang="en">who / whom</td><td>людей (whom — дополнение, формально)</td><td lang="en">The man whom I met was a writer.</td></tr>
<tr><td lang="en">which</td><td>предметов; комментария ко всей фразе</td><td lang="en">He passed the exam, which surprised everyone.</td></tr>
<tr><td lang="en">whose</td><td>принадлежности (и для людей, и для предметов)</td><td lang="en">That’s the girl whose bike was stolen.</td></tr>
<tr><td lang="en">where / when / why</td><td>места, времени, причины</td><td lang="en">the town where I grew up; the day when we met; the reason why I left</td></tr>
</tbody></table></div>
<div class="ichika">Which про всю фразу — очень полезная штука ♡ <span lang="en">She didn’t call, which made me worried.</span> Здесь which относится не к слову, а ко всему факту «она не позвонила». Только с запятой и только which — never that!</div>

<h3>Предлоги в придаточных</h3>
<div class="two"><div><h4>Разговорно</h4><p>Предлог в конце.</p><p lang="en">That’s the man I was talking about.</p><p lang="en">The house we lived in was old.</p></div><div><h4>Формально</h4><p>Предлог перед whom/which.</p><p lang="en">The man about whom I was talking…</p><p lang="en">The issue to which the report refers…</p></div></div>
<p>Количественные выражения: <span lang="en">I have two brothers, both of whom are doctors. She bought ten books, most of which she has read.</span></p>

<h3>Сокращение придаточных</h3>
<ul class="ex-l">
<li><span lang="en">The woman (who is) standing by the door is my teacher.</span><span class="tr">Активное значение → V-ing.</span></li>
<li><span lang="en">The products (which were) made in this factory are exported.</span><span class="tr">Пассивное → V3.</span></li>
<li><span lang="en">He was the first person to arrive.</span><span class="tr">После the first, the last, the only — инфинитив.</span></li>
</ul>
<div class="warn"><p>Нельзя: <s>The man which I met</s> (для людей — who/that), <s>My mother, that lives in Omsk</s> (that с запятыми). И не дублируй дополнение: <s>The book that I read it</s> — it лишнее.</p></div>
<div class="ayano">Хорошее письменное предложение на B2 — это часто одно главное и одно придаточное, а не цепочка из трёх which. Если придаточных больше двух, читатель теряет нить. Используй их, чтобы сжимать информацию, но перечитывай: можно ли разбить фразу на две без потерь? Если можно и станет понятнее — разбей.</div>
`,
  p: [
    { q: 'Соедини: <span lang="en">This is the restaurant. We had our first date there.</span>', a: '<span lang="en">This is the restaurant where we had our first date.</span>' },
    { q: 'Соедини: <span lang="en">I met a girl. Her father is an astronaut.</span>', a: '<span lang="en">I met a girl whose father is an astronaut.</span>' },
    { q: 'Нужны ли запятые: <span lang="en">Moscow which is the capital of Russia is huge.</span>', a: 'Да: <span lang="en">Moscow, which is the capital of Russia, is huge.</span> — Москва одна, информация дополнительная.' },
    { q: 'Сделай формальнее: <span lang="en">This is the topic I want to talk about.</span>', a: '<span lang="en">This is the topic about which I want to talk.</span>' },
    { q: 'Сократи: <span lang="en">The people who are waiting outside are angry.</span>', a: '<span lang="en">The people waiting outside are angry.</span>' },
    { q: 'Соедини с which для всей фразы: <span lang="en">He forgot my birthday. It upset me.</span>', a: '<span lang="en">He forgot my birthday, which upset me.</span>' }
  ],
  q: [
    { q: '<span lang="en">The man ___ car was stolen called the police.</span>', o: ['who', 'whose', 'which', 'whom'], a: 1, e: 'Принадлежность.' },
    { q: 'Где нельзя использовать that?', o: ['The film that we saw', 'My dad, that is a pilot,', 'The book that I read', 'The girl that sings'], a: 1, e: 'Неограничительное придаточное.' },
    { q: '<span lang="en">She has three sons, all of ___ are engineers.</span>', o: ['who', 'whom', 'them', 'which'], a: 1, e: 'После предлога — whom.' },
    { q: '<span lang="en">He was the last person ___ the room.</span>', o: ['leaving', 'to leave', 'left', 'leaves'], a: 1, e: 'the last + to-инфинитив.' },
    { q: 'Ошибка:', o: ['The book I read was long.', 'The book that I read it was long.', 'The book which I read was long.', 'The book, which I read, was long.'], a: 1, e: 'Лишнее it.' }
  ],
  s: [
    'Ограничительные — без запятых, можно that и пропуск дополнения.',
    'Неограничительные — с запятыми, нельзя that и пропуск.',
    'who/whom — люди, which — предметы и вся фраза, whose — принадлежность, where/when/why.',
    'Предлог: разговорно в конце, формально перед whom/which; both of whom, most of which.',
    'Сокращение: V-ing (актив), V3 (пассив), the first/last/only + to-инфинитив.',
    'Не повторяй дополнение: the book that I read (без it).'
  ]
});
