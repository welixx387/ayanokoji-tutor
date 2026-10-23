L('pol', 6, {
  m: 45,
  intro: 'Мужско-личный род — то, чего нет в русском и что сразу выдаёт иностранца. Во множественном числе польский делит всё на две группы: мужчины (и группы, где есть хотя бы один мужчина) и все остальные. От этого зависят формы глаголов, прилагательных, местоимений и числительных. Вторая часть урока — числительные и падежи после них.',
  intro2: 'Senpai, «dwaj studenci», но «dwie studentki» и «dwa koty» ♡ У польского три разных «два»! И это не прихоть, а система. Разберёмся — и ты будешь считать, как настоящий поляк.',
  goals: [
    'Различать мужско-личный и немужско-личный род',
    'Образовывать мужско-личную форму существительных и прилагательных',
    'Использовать числительные 2–4 и 5+ с правильными падежами',
    'Согласовывать числительные с мужско-личными существительными'
  ],
  c: `
<h3>Две группы во множественном числе</h3>
<div class="two"><div><h4>Мужско-личный</h4><p>мужчины и смешанные группы</p><p lang="pl">oni, ci dobrzy studenci byli</p></div><div><h4>Немужско-личный</h4><p>женщины, дети, животные, вещи</p><p lang="pl">one, te dobre studentki / koty / domy były</p></div></div>

<h3>Формы существительных и прилагательных</h3>
<div class="tbl"><table><thead><tr><th>Ед. ч.</th><th>Мн. ч. (мужско-личный)</th><th>Чередование</th></tr></thead><tbody>
<tr><td lang="pl">student</td><td lang="pl">studenci</td><td>t → ci</td></tr>
<tr><td lang="pl">Polak</td><td lang="pl">Polacy</td><td>k → c</td></tr>
<tr><td lang="pl">chłopiec</td><td lang="pl">chłopcy</td><td>беглое e</td></tr>
<tr><td lang="pl">lekarz, nauczyciel</td><td lang="pl">lekarze, nauczyciele</td><td>мягкие → -e</td></tr>
<tr><td lang="pl">profesor, pan, syn</td><td lang="pl">profesorowie, panowie, synowie</td><td>-owie (титулы, родство)</td></tr>
</tbody></table></div>
<div class="tbl"><table><thead><tr><th>Прилагательное</th><th>Мужско-личный</th><th>Немужско-личный</th></tr></thead><tbody>
<tr><td lang="pl">dobry</td><td lang="pl">dobrzy</td><td lang="pl">dobre</td></tr>
<tr><td lang="pl">wysoki</td><td lang="pl">wysocy</td><td lang="pl">wysokie</td></tr>
<tr><td lang="pl">młody</td><td lang="pl">młodzi</td><td lang="pl">młode</td></tr>
<tr><td lang="pl">polski</td><td lang="pl">polscy</td><td lang="pl">polskie</td></tr>
</tbody></table></div>
<div class="ichika">Звук смягчается ♡ <span lang="pl">dobry → dobrzy, wysoki → wysocy, młody → młodzi</span>. Мужчины во множественном числе звучат мягче. Интересно, что сказали бы на это польские мужчины!</div>

<h3>Числительные</h3>
<div class="tbl"><table><thead><tr><th></th><th>Немужско-личные</th><th>Мужско-личные</th></tr></thead><tbody>
<tr><td>2–4</td><td lang="pl">dwa koty, dwie książki, trzy domy (им. мн.)</td><td lang="pl">dwaj studenci / dwóch studentów</td></tr>
<tr><td>5+</td><td lang="pl">pięć kotów, sześć książek (род. мн.)</td><td lang="pl">pięciu studentów</td></tr>
<tr><td>12–14</td><td lang="pl">dwanaście kotów (род. мн.)</td><td lang="pl">dwunastu studentów</td></tr>
<tr><td>22–24</td><td lang="pl">dwadzieścia dwa koty (им. мн.)</td><td lang="pl">dwudziestu dwóch studentów</td></tr>
</tbody></table></div>
<p><span lang="pl">dwa</span> — для мужского и среднего немужско-личного, <span lang="pl">dwie</span> — для женского. Логика 2–4 / 5+ похожа на русскую: «два кота / пять котов».</p>
<div class="warn"><p>Ловушка: с <span lang="pl">pięciu studentów, dwóch studentów</span> глагол стоит в единственном числе среднего рода: <span lang="pl">Przyszło pięciu studentów. Dwóch studentów czekało.</span> А с <span lang="pl">dwaj studenci</span> — множественное: <span lang="pl">Dwaj studenci przyszli.</span></p></div>

<h3>Деньги</h3>
<p><span lang="pl">jeden złoty, dwa złote, pięć złotych; jeden grosz, trzy grosze, dziesięć groszy</span>. Та же схема 1 / 2–4 / 5+.</p>
<div class="ayano">Мужско-личный род нужен в каждом рассказе о людях, поэтому тренируй его на реальных группах: твоя семья, класс, друзья. <span lang="pl">Moi rodzice byli…, moje siostry były…, moi koledzy przyszli…</span> Когда формы на -li, -i, -cy станут привычными для людей, ошибки исчезнут сами.</div>
`,
  p: [
    { q: 'Множественное число: <span lang="pl">ten młody Polak</span>.', a: '<span lang="pl">ci młodzi Polacy</span>' },
    { q: 'Множественное число: <span lang="pl">ta młoda Polka</span>.', a: '<span lang="pl">te młode Polki</span>' },
    { q: 'Прошедшее: <span lang="pl">Anna i Marek (iść) do kina.</span>', a: '<span lang="pl">Anna i Marek poszli do kina.</span>' },
    { q: 'Посчитай: 2 / 5 книги (książka).', a: '<span lang="pl">dwie książki, pięć książek</span>' },
    { q: 'Посчитай: 3 / 6 студентов (мужчины).', a: '<span lang="pl">trzej studenci / trzech studentów, sześciu studentów</span>' },
    { q: 'Сколько стоит: 4 злотых / 12 злотых.', a: '<span lang="pl">cztery złote, dwanaście złotych</span>' }
  ],
  q: [
    { q: 'Мужско-личная форма от dobry:', o: ['dobre', 'dobrzy', 'dobri', 'dobrzi'], a: 1, e: 'dobrzy.' },
    { q: 'Три подруги «пришли»:', o: ['przyszli', 'przyszły', 'przyszło', 'przyszedł'], a: 1, e: 'Немужско-личный.' },
    { q: '<span lang="pl">pięć ___</span> (kot)', o: ['koty', 'kotów', 'kotami', 'kot'], a: 1, e: '5+ — родительный мн.' },
    { q: '<span lang="pl">___ studentów przyszło.</span>', o: ['Pięć', 'Pięciu', 'Piąty', 'Pięcioro'], a: 1, e: 'Мужско-личная форма.' },
    { q: '<span lang="pl">dwadzieścia dwa ___</span> (złoty)', o: ['złote', 'złotych', 'złoty', 'złotymi'], a: 0, e: '22–24 как 2–4.' }
  ],
  s: [
    'Мужско-личный род: мужчины и группы с хотя бы одним мужчиной.',
    'oni byli / one były; ci dobrzy studenci / te dobre studentki.',
    'Существительные: studenci, Polacy, chłopcy, lekarze, profesorowie.',
    'Числительные: 2–4 + им. мн., 5+ и 12–14 + род. мн.; dwa/dwie.',
    'Мужско-личные: dwaj studenci (мн. глагол) / dwóch, pięciu studentów (глагол в ед. ч. ср. р.).',
    'Деньги: złoty — złote — złotych, grosz — grosze — groszy.'
  ]
});
