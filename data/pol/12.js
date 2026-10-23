L('pol', 12, {
  m: 40,
  intro: 'Чтобы убрать действующее лицо, польский использует несколько средств: пассив с być и zostać, безличные формы на -no/-to («zbudowano», «zrobiono») и конструкции с się («mówi się», «tu się nie pali»). Безличная форма на -no/-to — особенность польского, которой нет в русском: она очень частая в новостях и официальных текстах.',
  intro2: 'Senpai, «Zbudowano nowy most» — «построили новый мост», а кто — неважно ♡ Одно слово вместо трёх! Польские журналисты обожают эту форму. Научимся и мы.',
  goals: [
    'Строить пассив с zostać и być и различать их',
    'Использовать безличные формы на -no/-to',
    'Использовать безличные конструкции с się',
    'Употреблять trzeba, można, warto, wolno'
  ],
  c: `
<h3>Пассив: zostać и być</h3>
<div class="tbl"><table><thead><tr><th>Конструкция</th><th>Значение</th><th>Пример</th></tr></thead><tbody>
<tr><td lang="pl">zostać + прич. (сов. вид)</td><td>однократное завершённое событие</td><td lang="pl">Dom został zbudowany w 1990 roku.</td></tr>
<tr><td lang="pl">być + прич. (несов. вид)</td><td>процесс, повторение</td><td lang="pl">Dom był budowany przez dwa lata.</td></tr>
<tr><td lang="pl">być + прич. (сов. вид)</td><td>состояние, результат</td><td lang="pl">Sklep jest zamknięty.</td></tr>
</tbody></table></div>
<p>Действующее лицо — <span lang="pl">przez</span> + винительный: <span lang="pl">Książka została napisana przez Olgę Tokarczuk.</span> Будущее: <span lang="pl">Wyniki zostaną ogłoszone jutro.</span></p>
<div class="warn"><p>В польском пассив используют реже, чем в русском официальном стиле, и почти никогда с <span lang="pl">przez</span> в разговоре. Естественнее актив: <span lang="pl">Olga Tokarczuk napisała tę książkę.</span></p></div>

<h3>Безличные формы на -no / -to</h3>
<div class="rule" data-t="основа страдательного причастия + -o"><p><span lang="pl">zbudowany → zbudowano, zrobiony → zrobiono, otwarty → otwarto</span>. Только прошедшее время, без действующего лица, с винительным падежом объекта.</p></div>
<ul class="ex-l">
<li><span lang="pl">Zbudowano nowy most.</span><span class="tr">Построили новый мост.</span></li>
<li><span lang="pl">W szkole zorganizowano koncert.</span><span class="tr">В школе организовали концерт.</span></li>
<li><span lang="pl">Mówiono o tym od dawna.</span><span class="tr">Об этом давно говорили.</span></li>
<li><span lang="pl">Nie znaleziono sprawcy.</span><span class="tr">Виновника не нашли (отрицание — родительный).</span></li>
</ul>
<div class="ichika">Форма на -no — супер для новостей ♡ <span lang="pl">Zamknięto drogę, odwołano lot, aresztowano złodzieja.</span> Коротко, без лишних «кем». Прочитай заголовки польских новостей — увидишь её в каждом втором!</div>

<h3>Конструкции с się</h3>
<ul class="ex-l">
<li><span lang="pl">Mówi się, że jutro będzie padać.</span><span class="tr">Говорят, что завтра будет дождь.</span></li>
<li><span lang="pl">Tu się nie pali.</span><span class="tr">Здесь не курят.</span></li>
<li><span lang="pl">Jak to się pisze?</span><span class="tr">Как это пишется?</span></li>
<li><span lang="pl">Sklep otwiera się o dziewiątej.</span><span class="tr">Магазин открывается в девять.</span></li>
<li><span lang="pl">Dobrze się tu mieszka.</span><span class="tr">Здесь хорошо живётся.</span></li>
</ul>

<h3>trzeba, można, warto, wolno</h3>
<div class="tbl"><table><thead><tr><th>Слово</th><th>Значение</th><th>Пример</th></tr></thead><tbody>
<tr><td lang="pl">trzeba</td><td>нужно</td><td lang="pl">Trzeba kupić chleb.</td></tr>
<tr><td lang="pl">można</td><td>можно</td><td lang="pl">Czy można tu usiąść?</td></tr>
<tr><td lang="pl">warto</td><td>стоит</td><td lang="pl">Warto zobaczyć Kraków.</td></tr>
<tr><td lang="pl">wolno / nie wolno</td><td>разрешено / нельзя</td><td lang="pl">Tu nie wolno parkować.</td></tr>
</tbody></table></div>
<p>Прошедшее и будущее — через było / będzie: <span lang="pl">Trzeba było zadzwonić! Będzie można przyjść później.</span></p>
<div class="ayano">Формы на -no/-to в русском передаются неопределённо-личным «сделали», поэтому переводить их легко, а самому использовать — непривычно. Тренируйся на новостях: возьми пять польских заголовков и найди в них безличные формы, затем перескажи русские новости этими формами. Это навык уровня B2–C1, который сразу делает текст «польским».</div>
`,
  p: [
    { q: 'В пассив с zostać: <span lang="pl">Policja złapała złodzieja.</span>', a: '<span lang="pl">Złodziej został złapany przez policję.</span>' },
    { q: 'Безличная форма: <span lang="pl">Ktoś otworzył nowy sklep.</span>', a: '<span lang="pl">Otwarto nowy sklep.</span>' },
    { q: 'Безличная форма: <span lang="pl">Odwołali koncert.</span>', a: '<span lang="pl">Odwołano koncert.</span>' },
    { q: 'С się: «Как это говорится по-польски?»', a: '<span lang="pl">Jak to się mówi po polsku?</span>' },
    { q: 'Переведи: «Стоит выучить польский».', a: '<span lang="pl">Warto nauczyć się polskiego.</span>' },
    { q: 'Переведи: «Надо было взять зонт!»', a: '<span lang="pl">Trzeba było wziąć parasol!</span>' }
  ],
  q: [
    { q: '<span lang="pl">Most ___ zbudowany w 2010 roku.</span>', o: ['został', 'stał', 'zostanie', 'jest się'], a: 0, e: 'Однократное событие в прошлом.' },
    { q: 'Безличная форма от zrobić:', o: ['zrobiło', 'zrobiono', 'zrobiony', 'zrobione'], a: 1, e: 'zrobiono.' },
    { q: '<span lang="pl">Nie znaleziono ___ .</span>', o: ['klucze', 'kluczy', 'kluczami', 'kluczach'], a: 1, e: 'Отрицание — родительный.' },
    { q: '«Здесь нельзя курить»:', o: ['Tu nie trzeba palić.', 'Tu nie wolno palić.', 'Tu nie warto palić.', 'Tu nie można się palić.'], a: 1, e: 'nie wolno.' },
    { q: 'Действующее лицо в пассиве:', o: ['od + род.', 'przez + вин.', 'z + твор.', 'dla + род.'], a: 1, e: 'przez.' }
  ],
  s: [
    'zostać + причастие — событие; być + причастие — процесс или состояние.',
    'Действующее лицо: przez + вин.; в разговоре лучше актив.',
    'Безличное -no/-to: zbudowano, zrobiono, otwarto — прошлое, без деятеля.',
    'się: mówi się, tu się nie pali, jak to się pisze.',
    'trzeba, można, warto, (nie) wolno + инфинитив; было/будет: trzeba było.',
    'Формы -no/-to — признак новостного и официального стиля.'
  ]
});
