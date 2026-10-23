L('deu', 7, {
  m: 40,
  intro: 'Две темы этого урока объединяет вопрос «кто действует?». Возвратные глаголы показывают, что действие направлено на себя — sich waschen, sich freuen. Пассив убирает действующее лицо на задний план: важен процесс, а не исполнитель. Пассив очень частый в инструкциях, новостях и официальных текстах.',
  intro2: 'Senpai, по-немецки нельзя просто «радоваться» — нужно «радовать себя»: ich freue mich ♡ А в пассиве дом «становится построенным»: das Haus wird gebaut. Немцы любят, чтобы всё было точно-точно!',
  goals: [
    'Использовать возвратные местоимения в Akkusativ и Dativ',
    'Знать частые возвратные глаголы',
    'Образовывать Vorgangspassiv во всех основных временах',
    'Различать Vorgangspassiv и Zustandspassiv'
  ],
  c: `
<h3>Возвратные местоимения</h3>
<div class="tbl"><table><thead><tr><th>Лицо</th><th>Akkusativ</th><th>Dativ</th></tr></thead><tbody>
<tr><td lang="de">ich</td><td lang="de">mich</td><td lang="de">mir</td></tr>
<tr><td lang="de">du</td><td lang="de">dich</td><td lang="de">dir</td></tr>
<tr><td lang="de">er / sie / es</td><td lang="de">sich</td><td lang="de">sich</td></tr>
<tr><td lang="de">wir / ihr</td><td lang="de">uns / euch</td><td lang="de">uns / euch</td></tr>
<tr><td lang="de">sie / Sie</td><td lang="de">sich</td><td lang="de">sich</td></tr>
</tbody></table></div>
<ul class="ex-l">
<li><span lang="de">Ich wasche mich.</span><span class="tr">Я умываюсь (Akk — нет другого дополнения).</span></li>
<li><span lang="de">Ich wasche mir die Hände.</span><span class="tr">Я мою руки (Dat — есть дополнение die Hände).</span></li>
<li><span lang="de">Ich kann mir das nicht vorstellen.</span><span class="tr">Не могу себе это представить.</span></li>
</ul>
<p>Частые: <span lang="de">sich freuen, sich beeilen, sich erholen, sich verlieben, sich entscheiden, sich treffen, sich setzen, sich anziehen, sich (Dat) etwas wünschen, sich (Dat) etwas merken.</span></p>
<div class="warn"><p>Возвратность в русском и немецком не всегда совпадает: <span lang="de">sich erholen</span> — отдыхать, <span lang="de">sich beeilen</span> — торопиться, но <span lang="de">lernen</span> — учиться (без sich), <span lang="de">beginnen</span> — начинаться.</p></div>

<h3>Vorgangspassiv: процесс</h3>
<div class="rule" data-t="werden + Partizip II"><p>Исполнителя можно назвать через <span lang="de">von + Dat</span> (лицо) или <span lang="de">durch + Akk</span> (средство, причина).</p></div>
<div class="tbl"><table><thead><tr><th>Время</th><th>Пример</th></tr></thead><tbody>
<tr><td>Präsens</td><td lang="de">Das Haus wird gebaut.</td></tr>
<tr><td>Präteritum</td><td lang="de">Das Haus wurde 1990 gebaut.</td></tr>
<tr><td>Perfekt</td><td lang="de">Das Haus ist gebaut worden.</td></tr>
<tr><td>Plusquamperfekt</td><td lang="de">Das Haus war gebaut worden.</td></tr>
<tr><td>Futur</td><td lang="de">Das Haus wird gebaut werden.</td></tr>
</tbody></table></div>
<div class="warn"><p>В Perfekt пассива — <span lang="de">worden</span>, а не <s>geworden</s>: <span lang="de">Der Brief ist geschrieben worden.</span> Форма geworden — только когда werden значит «становиться»: <span lang="de">Er ist Arzt geworden.</span></p></div>
<ul class="ex-l">
<li><span lang="de">Amerika wurde von Kolumbus entdeckt.</span><span class="tr">Америка была открыта Колумбом.</span></li>
<li><span lang="de">Die Stadt wurde durch ein Erdbeben zerstört.</span><span class="tr">Город был разрушен землетрясением.</span></li>
<li><span lang="de">Hier wird nicht geraucht.</span><span class="tr">Здесь не курят (безличный пассив).</span></li>
</ul>
<div class="ichika">Пассив — любимое время инструкций и рецептов ♡ <span lang="de">Die Zwiebeln werden geschnitten, dann wird alles fünf Minuten gekocht.</span> Кто режет — неважно, важно, что лук порезан. Немецкие кулинарные книги — отличная практика пассива!</div>

<h3>Zustandspassiv: результат</h3>
<div class="two"><div><h4>Vorgang: werden</h4><p>Процесс идёт.</p><p lang="de">Die Tür wird geöffnet.</p><p>Дверь открывают (сейчас).</p></div><div><h4>Zustand: sein</h4><p>Результат, состояние.</p><p lang="de">Die Tür ist geöffnet.</p><p>Дверь открыта.</p></div></div>
<div class="ayano">Пассив в немецком используют чаще, чем в русском, особенно в официальных и научных текстах. Тренируйся на реальных материалах: возьми любую новостную заметку и найди все формы werden + Partizip II. Затем перепиши два предложения в актив. Такое упражнение за десять минут показывает, понимаешь ли ты конструкцию на самом деле.</div>
`,
  p: [
    { q: 'Вставь местоимение: <span lang="de">Ich freue ___ auf den Urlaub.</span>', a: '<span lang="de">mich</span>' },
    { q: 'Вставь: <span lang="de">Du musst ___ die Zähne putzen.</span>', a: '<span lang="de">dir</span> — есть дополнение die Zähne.' },
    { q: 'Пассив Präsens: <span lang="de">Man repariert das Auto.</span>', a: '<span lang="de">Das Auto wird repariert.</span>' },
    { q: 'Пассив Präteritum: <span lang="de">Goethe schrieb den Faust.</span>', a: '<span lang="de">Der Faust wurde von Goethe geschrieben.</span>' },
    { q: 'Пассив Perfekt: <span lang="de">Man hat den Dieb gefunden.</span>', a: '<span lang="de">Der Dieb ist gefunden worden.</span>' },
    { q: 'Vorgang или Zustand? <span lang="de">Das Geschäft ist heute geschlossen.</span>', a: 'Zustandspassiv — состояние «закрыто».' }
  ],
  q: [
    { q: '<span lang="de">Wir treffen ___ um acht.</span>', o: ['sich', 'uns', 'euch', 'mich'], a: 1, e: 'wir → uns.' },
    { q: '<span lang="de">Das Museum ___ 1900 gebaut.</span>', o: ['wird', 'wurde', 'ist', 'hat'], a: 1, e: 'Präteritum пассива.' },
    { q: 'Perfekt пассива:', o: ['ist gebaut geworden', 'ist gebaut worden', 'hat gebaut worden', 'wurde gebaut geworden'], a: 1, e: 'worden.' },
    { q: 'Исполнитель-лицо в пассиве вводится предлогом:', o: ['mit', 'von', 'durch', 'bei'], a: 1, e: 'von + Dat.' },
    { q: '<span lang="de">Die Fenster sind geputzt.</span> — это', o: ['Vorgangspassiv', 'Zustandspassiv', 'Aktiv', 'Konjunktiv'], a: 1, e: 'sein + Partizip II — состояние.' }
  ],
  s: [
    'Возвратные: mich/dich/sich/uns/euch/sich; Dat: mir/dir, если есть другое дополнение.',
    'Частые: sich freuen, beeilen, erholen, entscheiden, vorstellen.',
    'Vorgangspassiv = werden + Partizip II.',
    'Perfekt пассива: ist … worden (не geworden).',
    'von + Dat — лицо, durch + Akk — средство; безличный: Hier wird nicht geraucht.',
    'Zustandspassiv = sein + Partizip II — результат.'
  ]
});
