L('deu', 1, {
  m: 40,
  intro: 'Немецкий кажется строгим, и это хорошая новость: у него очень логичный порядок слов. Если ты на уровне A2, ты уже умеешь говорить простыми фразами о себе. Чтобы дойти до B1, нужно уверенно управлять двумя вещами — порядком слов в предложении и прошедшим временем Perfekt. С них и начнём, а заодно проверим, где у тебя пробелы.',
  intro2: 'Hallo, senpai! ♡ Немецкий — как конструктор: детали всегда встают на свои места. Глагол — на второе место, его хвостик — в самый конец. Нажимай на немецкие фразы с пунктиром — я прочитаю их вслух. Los geht’s!',
  goals: [
    'Понимать, чем отличаются уровни A2, B1, B2 и C1 в немецком',
    'Строить предложения по правилу второго места глагола и «рамки»',
    'Образовывать Perfekt с haben и sein',
    'Знать порядок обстоятельств и место nicht'
  ],
  c: `
<h3>Карта курса</h3>
<div class="tbl"><table><thead><tr><th>Уровень</th><th>Что ты можешь</th><th>Пример</th></tr></thead><tbody>
<tr><td>A2</td><td>простые фразы о себе, семье, покупках</td><td lang="de">Ich wohne in Kasan. Ich spiele gern Fußball.</td></tr>
<tr><td>B1</td><td>рассказать историю, объяснить причину, высказать мнение</td><td lang="de">Ich bin zu spät gekommen, weil der Bus nicht gefahren ist.</td></tr>
<tr><td>B2</td><td>аргументировать, понимать новости и фильмы</td><td lang="de">Wenn ich das gewusst hätte, hätte ich ein Taxi genommen.</td></tr>
<tr><td>C1</td><td>точно и гибко, в научном и деловом стиле</td><td lang="de">Die im letzten Jahr eingeführten Maßnahmen haben sich bewährt.</td></tr>
</tbody></table></div>
<p>Уроки 1–8 ведут к B1, 9–16 — к B2, 17–24 — к C1. В конце каждого уровня — контрольная точка.</p>

<h3>Порядок слов: второе место и рамка</h3>
<div class="rule" data-t="Главное правило"><p>В утвердительном предложении спрягаемый глагол стоит <b>на втором месте</b>. Всё остальное — модальный глагол с инфинитивом, Perfekt, отделяемая приставка — образует «рамку»: вторая часть уходит в <b>конец</b>.</p></div>
<ul class="ex-l">
<li><span lang="de">Ich lerne heute Deutsch.</span><span class="tr">Я сегодня учу немецкий.</span></li>
<li><span lang="de">Heute lerne ich Deutsch.</span><span class="tr">Первое место занято — подлежащее уходит за глагол.</span></li>
<li><span lang="de">Ich muss heute Deutsch lernen.</span><span class="tr">Модальный глагол на втором месте, инфинитив в конце.</span></li>
<li><span lang="de">Der Zug fährt um acht Uhr ab.</span><span class="tr">Отделяемая приставка ab — в конце.</span></li>
<li><span lang="de">Ich habe gestern Deutsch gelernt.</span><span class="tr">Perfekt: haben на втором месте, причастие в конце.</span></li>
</ul>
<div class="ichika">Представь бутерброд ♡ Две половинки хлеба — это две части глагола: одна на втором месте, другая в самом конце. А всё остальное — начинка между ними. Немцы иногда так долго держат начинку, что слушатель ждёт глагол до последнего слова!</div>

<h3>Perfekt — прошедшее время разговорной речи</h3>
<div class="tbl"><table><thead><tr><th>Тип глагола</th><th>Partizip II</th><th>Пример</th></tr></thead><tbody>
<tr><td>слабые</td><td>ge- … -t</td><td lang="de">machen → gemacht, kaufen → gekauft</td></tr>
<tr><td>сильные</td><td>ge- … -en (часто меняется корень)</td><td lang="de">sehen → gesehen, finden → gefunden, schreiben → geschrieben</td></tr>
<tr><td>с отделяемой приставкой</td><td>-ge- внутри</td><td lang="de">einkaufen → eingekauft, ankommen → angekommen</td></tr>
<tr><td>с неотделяемой приставкой и на -ieren</td><td>без ge-</td><td lang="de">besuchen → besucht, verstehen → verstanden, studieren → studiert</td></tr>
</tbody></table></div>
<p><b>sein</b> вместо haben — с глаголами движения и изменения состояния, а также с sein, bleiben, werden: <span lang="de">Ich bin nach Berlin gefahren. Er ist eingeschlafen. Wir sind zu Hause geblieben.</span></p>

<h3>Порядок обстоятельств и nicht</h3>
<p>Обстоятельства обычно идут в порядке <b>Te-Ka-Mo-Lo</b>: время (temporal) — причина (kausal) — образ действия (modal) — место (lokal).</p>
<p lang="de">Ich fahre morgen wegen der Prüfung mit dem Zug nach München.</p>
<div class="warn"><p><span lang="de">nicht</span> отрицает всё предложение — тогда стоит ближе к концу, но перед второй частью рамки: <span lang="de">Ich habe das Buch nicht gelesen.</span> Отрицание существительного с неопределённым артиклем или без артикля — <span lang="de">kein</span>: <span lang="de">Ich habe keine Zeit.</span></p></div>
<div class="ayano">Диагностика простая: возьми пять предложений о своём вчерашнем дне и скажи их вслух в Perfekt. Если ты задумываешься над haben или sein и над формой причастия — это первая зона работы. Остальное курс достроит. Начинать с честной проверки быстрее, чем повторять всё подряд.</div>
`,
  p: [
    { q: 'Начни предложение со слова morgen: <span lang="de">Ich besuche meine Oma morgen.</span>', a: '<span lang="de">Morgen besuche ich meine Oma.</span>' },
    { q: 'Поставь в Perfekt: <span lang="de">Wir kaufen ein.</span>', a: '<span lang="de">Wir haben eingekauft.</span>' },
    { q: 'Поставь в Perfekt: <span lang="de">Sie fährt nach Hamburg.</span>', a: '<span lang="de">Sie ist nach Hamburg gefahren.</span>' },
    { q: 'Образуй Partizip II: verstehen, telefonieren, aufstehen.', a: '<span lang="de">verstanden, telefoniert, aufgestanden</span>' },
    { q: 'Добавь модальный глагол müssen: <span lang="de">Ich arbeite heute.</span>', a: '<span lang="de">Ich muss heute arbeiten.</span>' },
    { q: 'Расставь по Te-Ka-Mo-Lo: nach Hause / heute / mit dem Fahrrad / Ich fahre.', a: '<span lang="de">Ich fahre heute mit dem Fahrrad nach Hause.</span>' }
  ],
  q: [
    { q: 'Где стоит спрягаемый глагол в утвердительном предложении?', o: ['на первом месте', 'на втором месте', 'в конце', 'где угодно'], a: 1, e: 'Правило второго места.' },
    { q: '<span lang="de">Gestern ___ ich ins Kino gegangen.</span>', o: ['habe', 'bin', 'war', 'hat'], a: 1, e: 'gehen — движение, sein.' },
    { q: 'Partizip II от besuchen:', o: ['gebesucht', 'besucht', 'besuchen', 'gesucht'], a: 1, e: 'Неотделяемая приставка — без ge-.' },
    { q: 'Partizip II от anrufen:', o: ['geanrufen', 'angerufen', 'anrufte', 'angeruft'], a: 1, e: '-ge- между приставкой и корнем.' },
    { q: '«У меня нет времени»:', o: ['Ich habe nicht Zeit.', 'Ich habe keine Zeit.', 'Ich nicht habe Zeit.', 'Ich habe Zeit nicht.'], a: 1, e: 'kein перед существительным без артикля.' }
  ],
  s: [
    'Уроки 1–8 — B1, 9–16 — B2, 17–24 — C1.',
    'Спрягаемый глагол на втором месте; вторая часть рамки — в конце.',
    'Perfekt = haben/sein + Partizip II; sein — движение, смена состояния, sein, bleiben, werden.',
    'Partizip II: ge-t, ge-en, -ge- внутри отделяемых, без ge- у be-/ver-/-ieren.',
    'Обстоятельства по Te-Ka-Mo-Lo.',
    'nicht — перед концом рамки; kein — перед существительным без определённого артикля.'
  ]
});
