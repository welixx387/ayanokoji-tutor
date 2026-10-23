L('pol', 4, {
  m: 40,
  intro: 'Виды глагола в польском устроены так же, как в русском: несовершенный — процесс и повторение, совершенный — результат. Это большое преимущество русскоговорящих. А вот прошедшее время отличается сильнее: у него есть личные окончания (byłem, byłeś), три рода в единственном числе и два во множественном — мужско-личный и немужско-личный.',
  intro2: 'Senpai, по-польски «я был» — «byłem», а «я была» — «byłam» ♡ Окончание сразу говорит, кто говорит! А ещё оно умеет «прыгать»: «Gdzie byłeś?» = «Gdzieś był?» Польский глагол — настоящий акробат.',
  goals: [
    'Подбирать видовые пары глаголов',
    'Образовывать прошедшее время с личными окончаниями',
    'Различать формы мужско-личного и немужско-личного рода во множественном числе',
    'Знать частые неправильные формы: mieć, jeść, iść, wziąć'
  ],
  c: `
<h3>Виды глагола</h3>
<div class="tbl"><table><thead><tr><th>Несовершенный (niedokonany)</th><th>Совершенный (dokonany)</th><th>Перевод</th></tr></thead><tbody>
<tr><td lang="pl">robić</td><td lang="pl">zrobić</td><td>делать / сделать</td></tr>
<tr><td lang="pl">pisać</td><td lang="pl">napisać</td><td>писать / написать</td></tr>
<tr><td lang="pl">czytać</td><td lang="pl">przeczytać</td><td>читать / прочитать</td></tr>
<tr><td lang="pl">kupować</td><td lang="pl">kupić</td><td>покупать / купить</td></tr>
<tr><td lang="pl">brać</td><td lang="pl">wziąć</td><td>брать / взять</td></tr>
<tr><td lang="pl">mówić</td><td lang="pl">powiedzieć</td><td>говорить / сказать</td></tr>
<tr><td lang="pl">oglądać</td><td lang="pl">obejrzeć</td><td>смотреть / посмотреть</td></tr>
</tbody></table></div>
<p>Логика как в русском: <span lang="pl">Czytałem książkę cały wieczór</span> (процесс) — <span lang="pl">Przeczytałem książkę</span> (результат).</p>

<h3>Прошедшее время</h3>
<div class="tbl"><table><thead><tr><th></th><th>Мужской</th><th>Женский</th><th>Средний</th></tr></thead><tbody>
<tr><td lang="pl">ja</td><td lang="pl">robiłem</td><td lang="pl">robiłam</td><td>—</td></tr>
<tr><td lang="pl">ty</td><td lang="pl">robiłeś</td><td lang="pl">robiłaś</td><td>—</td></tr>
<tr><td lang="pl">on / ona / ono</td><td lang="pl">robił</td><td lang="pl">robiła</td><td lang="pl">robiło</td></tr>
</tbody></table></div>
<div class="tbl"><table><thead><tr><th></th><th>Мужско-личный (есть хотя бы один мужчина)</th><th>Немужско-личный</th></tr></thead><tbody>
<tr><td lang="pl">my</td><td lang="pl">robiliśmy</td><td lang="pl">robiłyśmy</td></tr>
<tr><td lang="pl">wy</td><td lang="pl">robiliście</td><td lang="pl">robiłyście</td></tr>
<tr><td lang="pl">oni / one</td><td lang="pl">robili</td><td lang="pl">robiły</td></tr>
</tbody></table></div>
<div class="ichika">Мужско-личный род — особенность польского ♡ Если в группе есть хотя бы один мужчина — <span lang="pl">oni byli</span>. Если только женщины, дети, животные или вещи — <span lang="pl">one były</span>. Пять девушек и один парень — уже «oni»! Подробнее — в уроке 6.</div>

<h3>Частые особые формы</h3>
<div class="tbl"><table><thead><tr><th>Инфинитив</th><th>on</th><th>ona</th><th>oni</th></tr></thead><tbody>
<tr><td lang="pl">mieć</td><td lang="pl">miał</td><td lang="pl">miała</td><td lang="pl">mieli</td></tr>
<tr><td lang="pl">jeść</td><td lang="pl">jadł</td><td lang="pl">jadła</td><td lang="pl">jedli</td></tr>
<tr><td lang="pl">iść</td><td lang="pl">szedł</td><td lang="pl">szła</td><td lang="pl">szli</td></tr>
<tr><td lang="pl">wziąć</td><td lang="pl">wziął</td><td lang="pl">wzięła</td><td lang="pl">wzięli</td></tr>
<tr><td lang="pl">móc</td><td lang="pl">mógł</td><td lang="pl">mogła</td><td lang="pl">mogli</td></tr>
<tr><td lang="pl">chcieć</td><td lang="pl">chciał</td><td lang="pl">chciała</td><td lang="pl">chcieli</td></tr>
</tbody></table></div>
<div class="warn"><p>Чередование е/а: <span lang="pl">mieć — miał, ale mieli</span>; <span lang="pl">widzieć — widział, widzieli</span>. В мужско-личной форме обычно возвращается е. А ударение в <span lang="pl">robiliśmy</span> по норме — на третий слог с конца: roBIliśmy.</p></div>

<h3>Подвижные окончания</h3>
<ul class="ex-l">
<li><span lang="pl">Gdzie byłeś? → Gdzieś był?</span><span class="tr">В разговоре окончание может прыгнуть к первому слову.</span></li>
<li><span lang="pl">Co robiliście? → Coście robili?</span><span class="tr">Разговорно; в письме используй полную форму.</span></li>
</ul>
<div class="ayano">Самая частая ошибка русскоговорящих — забыть личное окончание: <s>Ja był w Krakowie</s> вместо <span lang="pl">Byłem w Krakowie</span>. Местоимение ja при этом обычно вообще не нужно: окончание уже говорит, кто действует. Тренируй рассказ о вчерашнем дне только без местоимений — так окончания закрепятся быстрее.</div>
`,
  p: [
    { q: 'Подбери совершенный вид: pisać, czytać, kupować.', a: '<span lang="pl">napisać, przeczytać, kupić</span>' },
    { q: 'Прошедшее (я, мужчина): <span lang="pl">być w kinie</span>.', a: '<span lang="pl">Byłem w kinie.</span>' },
    { q: 'Прошедшее (ты, девушка): <span lang="pl">mieć czas</span>.', a: '<span lang="pl">Miałaś czas.</span>' },
    { q: 'Прошедшее (мы — Анна и Пётр): <span lang="pl">oglądać film</span>.', a: '<span lang="pl">Oglądaliśmy film.</span>' },
    { q: 'Прошедшее (они — три подруги): <span lang="pl">iść do kina</span>.', a: '<span lang="pl">Szły do kina.</span>' },
    { q: 'Выбери вид: «Вчера я прочитал всю книгу» / «Вчера я весь вечер читал».', a: '<span lang="pl">Wczoraj przeczytałem całą książkę.</span> / <span lang="pl">Wczoraj cały wieczór czytałem.</span>' }
  ],
  q: [
    { q: 'Совершенный вид от brać:', o: ['zabrać — единственный', 'wziąć', 'przebrać', 'brać się'], a: 1, e: 'brać / wziąć.' },
    { q: '«Я была» (говорит женщина):', o: ['byłem', 'byłam', 'była', 'byłaś'], a: 1, e: 'byłam.' },
    { q: 'Брат и сестра «были»:', o: ['były', 'byli', 'był', 'była'], a: 1, e: 'Есть мужчина — мужско-личная форма.' },
    { q: 'Прошедшее от iść (on):', o: ['iszedł', 'szedł', 'iśł', 'szła'], a: 1, e: 'szedł.' },
    { q: 'Ошибка:', o: ['Byłem w domu.', 'Ja był w domu.', 'Byłam w domu.', 'Byliśmy w domu.'], a: 1, e: 'Нужно личное окончание.' }
  ],
  s: [
    'Виды как в русском: robić/zrobić, czytać/przeczytać, brać/wziąć, mówić/powiedzieć.',
    'Прошедшее: основа + ł + окончание: robiłem/robiłam, robiłeś/robiłaś, robił/robiła/robiło.',
    'Мн. ч.: мужско-личное robiliśmy/robili; немужско-личное robiłyśmy/robiły.',
    'Особые: miał/mieli, jadł/jedli, szedł/szła/szli, wziął/wzięła, mógł/mogła.',
    'Окончание может «прыгать»: Gdzieś był? — разговорно.',
    'Местоимение ja обычно не нужно — окончание уже показывает лицо.'
  ]
});
