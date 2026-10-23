L('deu', 18, {
  m: 35,
  intro: 'Распространённое определение (erweitertes Partizipialattribut) — конструкция, которая пугает даже продвинутых студентов: между артиклем и существительным помещается целое придаточное. «Die im letzten Jahr von der Stadt gebaute Brücke» — «мост, построенный городом в прошлом году». Это визитная карточка научного и газетного немецкого. Сегодня научимся его читать и строить.',
  intro2: 'Senpai, немецкий умеет засунуть целое предложение между «die» и «Brücke» ♡ Как начинку в пельмень! Главное — знать, с какой стороны его есть. Сейчас покажу.',
  goals: [
    'Распознавать распространённое определение в тексте',
    'Читать его по алгоритму: артикль — существительное — причастие — расширение',
    'Превращать относительное придаточное в определение и обратно',
    'Понимать конструкцию zu + Partizip I (die zu lösende Aufgabe)'
  ],
  c: `
<h3>Как это устроено</h3>
<div class="rule" data-t="артикль + [расширение] + причастие с окончанием + существительное"><p>Причастие склоняется как прилагательное. Всё, что стоит между артиклем и причастием, — бывшее содержание придаточного предложения.</p></div>
<div class="tbl"><table><thead><tr><th>Относительное придаточное</th><th>Распространённое определение</th></tr></thead><tbody>
<tr><td lang="de">die Brücke, die im letzten Jahr gebaut wurde</td><td lang="de">die im letzten Jahr gebaute Brücke</td></tr>
<tr><td lang="de">der Künstler, der seit Jahren in Berlin lebt</td><td lang="de">der seit Jahren in Berlin lebende Künstler</td></tr>
<tr><td lang="de">die Studenten, die aus dem Ausland gekommen sind</td><td lang="de">die aus dem Ausland gekommenen Studenten</td></tr>
<tr><td lang="de">die Aufgabe, die gelöst werden muss</td><td lang="de">die zu lösende Aufgabe</td></tr>
</tbody></table></div>
<p>Partizip I (<span lang="de">lebend</span>) — активное и одновременное действие. Partizip II (<span lang="de">gebaut</span>) — пассивное или завершённое. <span lang="de">zu + Partizip I</span> — то, что нужно или можно сделать.</p>

<h3>Алгоритм чтения</h3>
<ol>
<li>Найди артикль, после которого не сразу идёт существительное: <span lang="de">die …</span></li>
<li>Найди существительное, к которому он относится: <span lang="de">… Maßnahmen</span>.</li>
<li>Найди причастие прямо перед ним: <span lang="de">… eingeführten Maßnahmen</span>.</li>
<li>Прочитай середину как придаточное: <span lang="de">von der Regierung im Frühjahr</span>.</li>
</ol>
<div class="ex" data-t="Разбор"><p><span lang="de">Die von der Regierung im Frühjahr eingeführten Maßnahmen haben sich bewährt.</span></p><p>→ <span lang="de">Die Maßnahmen, die von der Regierung im Frühjahr eingeführt wurden, haben sich bewährt.</span></p><p>Меры, введённые правительством весной, себя оправдали.</p></div>
<div class="ichika">Русский тебе тут помогает ♡ У нас тоже есть «введённые правительством весной меры» — то же самое, просто такой порядок звучит книжно. В немецком он просто чаще встречается. Переводи на «который» — и всё станет понятно.</div>

<h3>Как построить самому</h3>
<ol>
<li>Исходное: <span lang="de">das Buch, das von vielen Schülern gelesen wird</span>.</li>
<li>Глагол → причастие: gelesen wird → <span lang="de">gelesen</span> (пассив → Partizip II).</li>
<li>Причастию — окончание прилагательного: <span lang="de">das … gelesene Buch</span>.</li>
<li>Всё остальное — между артиклем и причастием: <span lang="de">das von vielen Schülern gelesene Buch</span>.</li>
</ol>
<div class="warn"><p>Не перегружай: <span lang="de">die von dem im letzten Jahr gewählten Bürgermeister vorgeschlagene Reform</span> — грамматически верно, но тяжело. В собственном тексте используй не больше одного распространённого определения на предложение.</p></div>
<div class="ayano">Это та конструкция, из-за которой немецкие научные тексты кажутся непробиваемыми. Но как только ты научишься видеть пару «артикль — существительное» через всё расширение, тексты станут прозрачными. Тренируйся на абзаце из Википедии: найди все такие определения и разверни каждое в придаточное. Пять абзацев — и навык закреплён.</div>
`,
  p: [
    { q: 'Разверни: <span lang="de">der vor kurzem renovierte Bahnhof</span>', a: '<span lang="de">der Bahnhof, der vor kurzem renoviert wurde</span>' },
    { q: 'Разверни: <span lang="de">die immer weiter steigenden Mieten</span>', a: '<span lang="de">die Mieten, die immer weiter steigen</span>' },
    { q: 'Сверни: <span lang="de">der Zug, der aus München kommt</span>', a: '<span lang="de">der aus München kommende Zug</span>' },
    { q: 'Сверни: <span lang="de">die Briefe, die gestern geschrieben wurden</span>', a: '<span lang="de">die gestern geschriebenen Briefe</span>' },
    { q: 'Сверни через zu: <span lang="de">die Fragen, die beantwortet werden müssen</span>', a: '<span lang="de">die zu beantwortenden Fragen</span>' },
    { q: 'Переведи: <span lang="de">Die seit 2010 in Wien arbeitende Ärztin hat einen Preis bekommen.</span>', a: 'Врач, работающая в Вене с 2010 года, получила премию.' }
  ],
  q: [
    { q: 'В <span lang="de">die von ihm geschriebenen Bücher</span> существительное:', o: ['ihm', 'geschriebenen', 'Bücher', 'von'], a: 2, e: 'Артикль die относится к Bücher.' },
    { q: '<span lang="de">der lachende Junge</span> — причастие:', o: ['Partizip I, активное', 'Partizip II, пассивное', 'инфинитив', 'Konjunktiv'], a: 0, e: 'lachend — Partizip I.' },
    { q: '<span lang="de">die zu prüfenden Dokumente</span> — это документы, которые…', o: ['уже проверены', 'нужно проверить', 'проверяют себя', 'не проверяются'], a: 1, e: 'zu + Partizip I.' },
    { q: 'Сверни: <span lang="de">das Kind, das schläft</span>', o: ['das geschlafene Kind', 'das schlafende Kind', 'das zu schlafende Kind', 'das schlafte Kind'], a: 1, e: 'Активное одновременное.' },
    { q: 'Где такие конструкции встречаются чаще всего?', o: ['в разговоре', 'в научных и газетных текстах', 'в песнях', 'в чатах'], a: 1, e: 'Книжный стиль.' }
  ],
  s: [
    'Распространённое определение: артикль + расширение + причастие + существительное.',
    'Partizip I — активное одновременное; Partizip II — пассивное/завершённое.',
    'zu + Partizip I — «который нужно / можно»: die zu lösende Aufgabe.',
    'Чтение: артикль → существительное → причастие → середина как придаточное.',
    'Построение: придаточное → причастие с окончанием → остальное между артиклем и причастием.',
    'В своём тексте — не больше одного такого определения на предложение.'
  ]
});
