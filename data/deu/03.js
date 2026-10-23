L('deu', 3, {
  m: 35,
  intro: 'В немецком два основных прошедших времени: Perfekt — для разговора и Präteritum — для письменного рассказа: книг, новостей, сказок. А чтобы показать, что одно событие произошло раньше другого, нужен Plusquamperfekt. На уровне B1 важно читать тексты в Präteritum без словаря форм и уметь самому рассказать историю.',
  intro2: 'Senpai, «Es war einmal…» — так начинаются все немецкие сказки ♡ Это Präteritum, время рассказчиков. Сегодня научимся рассказывать истории как братья Гримм. Только без злых мачех, договорились?',
  goals: [
    'Образовывать Präteritum слабых, сильных и смешанных глаголов',
    'Знать, где используют Präteritum, а где Perfekt',
    'Строить Plusquamperfekt и использовать его с nachdem',
    'Рассказывать историю в правильной последовательности времён'
  ],
  c: `
<h3>Präteritum: образование</h3>
<div class="tbl"><table><thead><tr><th>Лицо</th><th>слабый: machen</th><th>сильный: gehen</th><th>смешанный: denken</th></tr></thead><tbody>
<tr><td lang="de">ich</td><td lang="de">machte</td><td lang="de">ging</td><td lang="de">dachte</td></tr>
<tr><td lang="de">du</td><td lang="de">machtest</td><td lang="de">gingst</td><td lang="de">dachtest</td></tr>
<tr><td lang="de">er/sie/es</td><td lang="de">machte</td><td lang="de">ging</td><td lang="de">dachte</td></tr>
<tr><td lang="de">wir</td><td lang="de">machten</td><td lang="de">gingen</td><td lang="de">dachten</td></tr>
<tr><td lang="de">ihr</td><td lang="de">machtet</td><td lang="de">gingt</td><td lang="de">dachtet</td></tr>
<tr><td lang="de">sie/Sie</td><td lang="de">machten</td><td lang="de">gingen</td><td lang="de">dachten</td></tr>
</tbody></table></div>
<p>Обрати внимание: у ich и er/sie/es формы совпадают и не имеют окончания у сильных глаголов.</p>
<div class="tbl"><table><thead><tr><th>Частые сильные и смешанные</th><th>Präteritum</th></tr></thead><tbody>
<tr><td lang="de">sein, haben, werden</td><td lang="de">war, hatte, wurde</td></tr>
<tr><td lang="de">kommen, sehen, geben, nehmen</td><td lang="de">kam, sah, gab, nahm</td></tr>
<tr><td lang="de">fahren, lesen, schreiben, finden</td><td lang="de">fuhr, las, schrieb, fand</td></tr>
<tr><td lang="de">bringen, wissen, kennen</td><td lang="de">brachte, wusste, kannte</td></tr>
<tr><td lang="de">können, müssen, wollen, dürfen</td><td lang="de">konnte, musste, wollte, durfte</td></tr>
</tbody></table></div>

<h3>Präteritum или Perfekt</h3>
<div class="two"><div><h4>Perfekt</h4><p>Устная речь, письма друзьям, сообщения.</p><p lang="de">Gestern habe ich einen tollen Film gesehen.</p></div><div><h4>Präteritum</h4><p>Книги, новости, отчёты, сказки. А ещё в речи: sein, haben, модальные глаголы.</p><p lang="de">Ich war gestern müde, ich konnte nicht kommen.</p></div></div>
<div class="ichika">Даже в разговоре немцы говорят <span lang="de">ich war, ich hatte, ich musste</span> ♡ «Ich bin gewesen» звучит тяжеловато. Так что эти формы Präteritum нужны тебе каждый день, а не только для сказок!</div>

<h3>Plusquamperfekt: раньше прошлого</h3>
<div class="rule" data-t="hatte / war + Partizip II"><p>Показывает действие, которое случилось раньше другого прошедшего действия. Выбор hatte/war — как haben/sein в Perfekt.</p></div>
<ul class="ex-l">
<li><span lang="de">Als ich am Bahnhof ankam, war der Zug schon abgefahren.</span><span class="tr">Когда я пришёл на вокзал, поезд уже ушёл.</span></li>
<li><span lang="de">Nachdem wir gegessen hatten, gingen wir spazieren.</span><span class="tr">После того как мы поели, мы пошли гулять.</span></li>
<li><span lang="de">Bevor er nach Berlin zog, hatte er drei Jahre Deutsch gelernt.</span><span class="tr">До переезда в Берлин он три года учил немецкий.</span></li>
</ul>
<div class="warn"><p>После <span lang="de">nachdem</span> время «сдвигается» назад: главное в Präteritum или Perfekt → придаточное в Plusquamperfekt. Неверно: <s>Nachdem ich gegessen habe, ging ich…</s></p></div>

<h3>Как рассказать историю</h3>
<div class="ex" data-t="Мини-рассказ"><p lang="de">Letzten Sommer fuhr ich mit meinen Freunden an die Ostsee. Am ersten Tag regnete es, deshalb blieben wir im Hotel. Am Abend merkte ich, dass ich mein Handy im Zug vergessen hatte. Zum Glück fand der Schaffner es und brachte es am nächsten Tag zurück.</p></div>
<div class="ayano">Выучи Präteritum сильных глаголов не по алфавиту, а по моделям чередования: schreiben — schrieb, bleiben — blieb; finden — fand, trinken — trank; fahren — fuhr, tragen — trug. Двадцать самых частых глаголов закрывают большую часть любого текста. Начни с них.</div>
`,
  p: [
    { q: 'Поставь в Präteritum: <span lang="de">Wir spielen Fußball.</span>', a: '<span lang="de">Wir spielten Fußball.</span>' },
    { q: 'Поставь в Präteritum: <span lang="de">Er kommt spät nach Hause.</span>', a: '<span lang="de">Er kam spät nach Hause.</span>' },
    { q: 'Образуй Präteritum (ich): sehen, wissen, schreiben, können.', a: '<span lang="de">ich sah, ich wusste, ich schrieb, ich konnte</span>' },
    { q: 'Plusquamperfekt: <span lang="de">Ich kam ins Kino. Der Film (beginnen) schon.</span>', a: '<span lang="de">Der Film hatte schon begonnen.</span>' },
    { q: 'Соедини с nachdem: <span lang="de">Sie machte die Hausaufgaben. Dann sah sie fern.</span>', a: '<span lang="de">Nachdem sie die Hausaufgaben gemacht hatte, sah sie fern.</span>' },
    { q: 'Переведи: «Вчера я был болен и не мог прийти».', a: '<span lang="de">Gestern war ich krank und konnte nicht kommen.</span>' }
  ],
  q: [
    { q: 'Präteritum от fahren (er):', o: ['fahrte', 'fuhr', 'fuhrte', 'gefahren'], a: 1, e: 'Сильный глагол.' },
    { q: 'Präteritum от bringen (ich):', o: ['bringte', 'brang', 'brachte', 'gebracht'], a: 2, e: 'Смешанный глагол.' },
    { q: 'Где обычно используют Präteritum?', o: ['в чатах', 'в письменных рассказах и новостях', 'только в вопросах', 'только с du'], a: 1, e: 'Письменная речь.' },
    { q: '<span lang="de">Nachdem er das Buch ___, gab er es zurück.</span>', o: ['gelesen hat', 'gelesen hatte', 'las', 'liest'], a: 1, e: 'Plusquamperfekt после nachdem.' },
    { q: '<span lang="de">Als wir ankamen, ___ der Zug schon ___.</span>', o: ['hatte … abgefahren', 'war … abgefahren', 'ist … abgefahren', 'wurde … abgefahren'], a: 1, e: 'abfahren — движение, sein.' }
  ],
  s: [
    'Präteritum: слабые -te, сильные — смена корня, смешанные — смена корня + -te.',
    'ich и er/sie/es совпадают: ich ging, er ging.',
    'Perfekt — разговор; Präteritum — письменный рассказ, новости.',
    'В речи тоже Präteritum: war, hatte, konnte, musste, wollte.',
    'Plusquamperfekt = hatte/war + Partizip II — раньше другого прошедшего.',
    'nachdem + Plusquamperfekt, главное — Präteritum.'
  ]
});
