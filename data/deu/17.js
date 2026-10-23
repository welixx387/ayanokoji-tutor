L('deu', 17, {
  m: 40,
  intro: 'Начинаем уровень C1. Номинальный стиль — отличительная черта немецких научных, деловых и юридических текстов: вместо придаточных предложений — существительные с предлогами. «Nachdem er angekommen war» превращается в «Nach seiner Ankunft». Умение переходить от глагольного стиля к номинальному и обратно — один из главных навыков C1.',
  intro2: 'Senpai, немецкие чиновники умеют написать «Bei Nichtbeachtung erfolgt eine Ermahnung» ♡ Это всего лишь «если не будешь слушаться, тебя отругают»! Сегодня научимся и писать так, и расшифровывать.',
  goals: [
    'Превращать придаточные предложения в предложные группы и обратно',
    'Знать соответствия союзов и предлогов: weil → wegen, obwohl → trotz',
    'Образовывать существительные от глаголов',
    'Понимать, где номинальный стиль уместен, а где мешает'
  ],
  c: `
<h3>Глагольный и номинальный стиль</h3>
<div class="two"><div><h4>Verbalstil</h4><p>Живой, разговорный, понятный.</p><p lang="de">Weil die Preise gestiegen sind, kaufen die Menschen weniger.</p></div><div><h4>Nominalstil</h4><p>Сжатый, официальный, научный.</p><p lang="de">Aufgrund des Preisanstiegs sinkt die Kaufbereitschaft.</p></div></div>

<h3>Союз → предлог</h3>
<div class="tbl"><table><thead><tr><th>Союз</th><th>Предлог</th><th>Пример</th></tr></thead><tbody>
<tr><td lang="de">weil, da</td><td lang="de">wegen, aufgrund + Gen</td><td lang="de">weil es regnete → wegen des Regens</td></tr>
<tr><td lang="de">obwohl</td><td lang="de">trotz + Gen</td><td lang="de">obwohl er krank war → trotz seiner Krankheit</td></tr>
<tr><td lang="de">wenn, falls</td><td lang="de">bei + Dat, im Falle + Gen</td><td lang="de">wenn es Probleme gibt → bei Problemen</td></tr>
<tr><td lang="de">nachdem</td><td lang="de">nach + Dat</td><td lang="de">nachdem er angekommen war → nach seiner Ankunft</td></tr>
<tr><td lang="de">bevor</td><td lang="de">vor + Dat</td><td lang="de">bevor die Prüfung beginnt → vor Beginn der Prüfung</td></tr>
<tr><td lang="de">während</td><td lang="de">während + Gen</td><td lang="de">während wir aßen → während des Essens</td></tr>
<tr><td lang="de">um … zu, damit</td><td lang="de">zu + Dat, zwecks + Gen</td><td lang="de">um Energie zu sparen → zum Energiesparen / zur Einsparung von Energie</td></tr>
<tr><td lang="de">indem</td><td lang="de">durch + Akk</td><td lang="de">indem man regelmäßig übt → durch regelmäßiges Üben</td></tr>
<tr><td lang="de">ohne dass</td><td lang="de">ohne + Akk</td><td lang="de">ohne dass er sich verabschiedete → ohne Abschied</td></tr>
</tbody></table></div>

<h3>Как образовать существительное</h3>
<ul class="ex-l">
<li><span lang="de">entwickeln → die Entwicklung, entscheiden → die Entscheidung</span><span class="tr">-ung (женский род)</span></li>
<li><span lang="de">ankommen → die Ankunft, abfahren → die Abfahrt, beginnen → der Beginn</span><span class="tr">особые формы — учить отдельно</span></li>
<li><span lang="de">lesen → das Lesen, essen → das Essen</span><span class="tr">субстантивированный инфинитив (средний род)</span></li>
<li><span lang="de">möglich → die Möglichkeit, frei → die Freiheit</span><span class="tr">от прилагательных: -keit, -heit</span></li>
</ul>
<div class="ichika">При превращении подлежащее становится родительным падежом или притяжательным местоимением ♡ <span lang="de">Der Zug kommt an</span> → <span lang="de">die Ankunft des Zuges</span>. <span lang="de">Er kommt an</span> → <span lang="de">seine Ankunft</span>. А дополнение часто встаёт с von или в Genitiv: <span lang="de">die Lösung des Problems</span>.</div>

<h3>Мера</h3>
<div class="warn"><p>Номинальный стиль сжимает текст, но может сделать его непроходимым: <span lang="de">Zur Gewährleistung der Durchführung der Maßnahmen ist die Einhaltung der Fristen erforderlich.</span> Здесь пять существительных подряд. Хороший академический текст сочетает оба стиля: номинальные группы для понятий и глаголы для действий.</p></div>
<div class="ex" data-t="Из официального в понятный"><p><span lang="de">Bei Nichtbezahlung der Rechnung innerhalb von 14 Tagen erfolgt eine Mahnung.</span></p><p><span lang="de">Wenn Sie die Rechnung nicht innerhalb von 14 Tagen bezahlen, bekommen Sie eine Mahnung.</span></p></div>
<div class="ayano">На экзамене C1 бывают задания на переформулирование: переписать предложение в другом стиле без потери смысла. Тренируйся парами: возьми одно предложение и запиши его в обоих стилях. Начни с союзов weil, obwohl, nachdem — они дают больше всего таких задач.</div>
`,
  p: [
    { q: 'В номинальный стиль: <span lang="de">Weil das Wetter schlecht war, wurde das Spiel abgesagt.</span>', a: '<span lang="de">Wegen des schlechten Wetters wurde das Spiel abgesagt.</span>' },
    { q: 'В номинальный стиль: <span lang="de">Nachdem er das Studium beendet hatte, zog er nach Berlin.</span>', a: '<span lang="de">Nach der Beendigung seines Studiums zog er nach Berlin.</span> Проще: <span lang="de">Nach seinem Studium zog er nach Berlin.</span>' },
    { q: 'В номинальный стиль: <span lang="de">Obwohl sie sich sehr bemüht hatte, scheiterte sie.</span>', a: '<span lang="de">Trotz ihrer großen Bemühungen scheiterte sie.</span>' },
    { q: 'В номинальный стиль: <span lang="de">Indem man Sport treibt, bleibt man gesund.</span>', a: '<span lang="de">Durch Sport bleibt man gesund.</span> / <span lang="de">Durch regelmäßiges Sporttreiben …</span>' },
    { q: 'В глагольный стиль: <span lang="de">Bei Regen fällt das Fest aus.</span>', a: '<span lang="de">Wenn es regnet, fällt das Fest aus.</span>' },
    { q: 'В глагольный стиль: <span lang="de">Vor Abfahrt des Zuges bitte einsteigen.</span>', a: '<span lang="de">Bitte steigen Sie ein, bevor der Zug abfährt.</span>' }
  ],
  q: [
    { q: 'obwohl → ?', o: ['wegen', 'trotz', 'bei', 'durch'], a: 1, e: 'Уступка.' },
    { q: 'indem → ?', o: ['durch', 'nach', 'vor', 'mit'], a: 0, e: 'Способ.' },
    { q: 'Существительное от ankommen:', o: ['die Ankommung', 'die Ankunft', 'das Ankommen — единственный вариант', 'der Ankam'], a: 1, e: 'die Ankunft.' },
    { q: '<span lang="de">wenn Fragen auftreten → ___ Fragen</span>', o: ['Bei', 'Wegen', 'Trotz', 'Nach'], a: 0, e: 'Условие → bei.' },
    { q: 'Главный риск номинального стиля:', o: ['слишком разговорно', 'тяжёлые цепочки существительных', 'много глаголов', 'неправильная орфография'], a: 1, e: 'Текст становится нечитаемым.' }
  ],
  s: [
    'Nominalstil — научные, деловые, юридические тексты; Verbalstil — живая речь.',
    'weil → wegen/aufgrund, obwohl → trotz, wenn → bei, nachdem → nach.',
    'bevor → vor, während → während, um … zu → zu/zur, indem → durch.',
    'Существительные: -ung, особые (Ankunft, Abfahrt), das + инфинитив, -heit/-keit.',
    'Подлежащее → Genitiv или притяжательное: die Ankunft des Zuges, seine Ankunft.',
    'Сочетай оба стиля: понятия — существительными, действия — глаголами.'
  ]
});
