L('deu', 5, {
  m: 40,
  intro: 'Предлоги в немецком управляют падежами, а девять из них — предлоги двойного управления — требуют то винительного, то дательного падежа в зависимости от смысла. К ним добавляются пары глаголов «положить — лежать» и большой список глаголов с закреплёнными предлогами: warten auf, denken an, sich freuen über. Это основа точной речи на уровне B1.',
  intro2: 'Senpai, «Ich lege das Buch auf den Tisch» и «Das Buch liegt auf dem Tisch» — одна буква в артикле, а смысл другой ♡ Куда? или Где? — вот и весь секрет. Задай вопрос — и падеж выберется сам!',
  goals: [
    'Выбирать Akkusativ или Dativ после предлогов двойного управления',
    'Различать legen/liegen, stellen/stehen, setzen/sitzen, hängen',
    'Запомнить частые глаголы с предлогами и их падежи',
    'Использовать местоименные наречия darauf, worauf, daran'
  ],
  c: `
<h3>Wohin? или Wo?</h3>
<p>Предлоги двойного управления: <span lang="de">an, auf, hinter, in, neben, über, unter, vor, zwischen</span>.</p>
<div class="two"><div><h4>Wohin? → Akkusativ</h4><p>Движение, направление, смена места.</p><p lang="de">Ich gehe in den Park.</p><p lang="de">Er hängt das Bild an die Wand.</p></div><div><h4>Wo? → Dativ</h4><p>Местонахождение, действие на месте.</p><p lang="de">Ich bin im Park.</p><p lang="de">Das Bild hängt an der Wand.</p></div></div>
<p>Слияния: <span lang="de">in dem → im, an dem → am, in das → ins, an das → ans</span>.</p>
<div class="warn"><p>Движение внутри одного места — тоже Wo: <span lang="de">Wir laufen im Park.</span> (бегаем по парку, а не в парк).</p></div>

<h3>Пары глаголов</h3>
<div class="tbl"><table><thead><tr><th>Действие (Wohin? + Akk)</th><th>Состояние (Wo? + Dat)</th></tr></thead><tbody>
<tr><td lang="de">legen — legte — hat gelegt</td><td lang="de">liegen — lag — hat gelegen</td></tr>
<tr><td lang="de">stellen — stellte — hat gestellt</td><td lang="de">stehen — stand — hat gestanden</td></tr>
<tr><td lang="de">setzen — setzte — hat gesetzt</td><td lang="de">sitzen — saß — hat gesessen</td></tr>
<tr><td lang="de">hängen — hängte — hat gehängt</td><td lang="de">hängen — hing — hat gehangen</td></tr>
</tbody></table></div>
<ul class="ex-l">
<li><span lang="de">Ich stelle die Flasche in den Kühlschrank.</span><span class="tr">Ставлю бутылку в холодильник.</span></li>
<li><span lang="de">Die Flasche steht im Kühlschrank.</span><span class="tr">Бутылка стоит в холодильнике.</span></li>
</ul>
<div class="ichika">legen — класть плашмя, stellen — ставить вертикально ♡ Книгу на стол — <span lang="de">legen</span>, а на полку корешком наружу — <span lang="de">stellen</span>. Немцы и тут аккуратисты!</div>

<h3>Глаголы с предлогами</h3>
<div class="tbl"><table><thead><tr><th>Глагол</th><th>Падеж</th><th>Пример</th></tr></thead><tbody>
<tr><td lang="de">warten auf</td><td>Akk</td><td lang="de">Ich warte auf den Bus.</td></tr>
<tr><td lang="de">denken an</td><td>Akk</td><td lang="de">Ich denke oft an dich.</td></tr>
<tr><td lang="de">sich freuen auf / über</td><td>Akk</td><td lang="de">Ich freue mich auf die Ferien (ещё впереди) / über das Geschenk (уже есть).</td></tr>
<tr><td lang="de">sich interessieren für</td><td>Akk</td><td lang="de">Sie interessiert sich für Kunst.</td></tr>
<tr><td lang="de">sich erinnern an</td><td>Akk</td><td lang="de">Erinnerst du dich an unseren Urlaub?</td></tr>
<tr><td lang="de">Angst haben vor</td><td>Dat</td><td lang="de">Er hat Angst vor Hunden.</td></tr>
<tr><td lang="de">teilnehmen an</td><td>Dat</td><td lang="de">Ich nehme an dem Kurs teil.</td></tr>
<tr><td lang="de">abhängen von</td><td>Dat</td><td lang="de">Das hängt vom Wetter ab.</td></tr>
<tr><td lang="de">sich kümmern um</td><td>Akk</td><td lang="de">Wer kümmert sich um die Katze?</td></tr>
<tr><td lang="de">sprechen mit / über</td><td>Dat / Akk</td><td lang="de">Ich spreche mit ihr über das Problem.</td></tr>
</tbody></table></div>

<h3>darauf, worauf и вопросы</h3>
<ul class="ex-l">
<li><span lang="de">Worauf wartest du? — Auf den Bus. Ich warte schon lange darauf.</span><span class="tr">Для вещей: wo(r)- и da(r)- + предлог.</span></li>
<li><span lang="de">Auf wen wartest du? — Auf meinen Freund. Ich warte auf ihn.</span><span class="tr">Для людей: предлог + местоимение.</span></li>
<li><span lang="de">Ich freue mich darauf, dich zu sehen.</span><span class="tr">darauf указывает вперёд, на целое действие.</span></li>
</ul>
<div class="ayano">Глаголы с предлогами учи только целыми фразами с падежом: не «warten — ждать», а «<span lang="de">warten auf + Akk</span>, <span lang="de">ich warte auf den Bus</span>». Заведи карточки, где на обороте — пример. Предлог в немецком — часть значения глагола, и выучить его отдельно потом гораздо дольше.</div>
`,
  p: [
    { q: 'Wo или Wohin, вставь артикль: <span lang="de">Die Katze schläft unter ___ Bett.</span>', a: '<span lang="de">dem</span> — Wo? Dativ.' },
    { q: 'Вставь: <span lang="de">Die Katze springt auf ___ Sofa.</span>', a: '<span lang="de">das</span> — Wohin? Akkusativ.' },
    { q: 'Выбери глагол: <span lang="de">Ich (legen/liegen) das Handy auf den Tisch.</span>', a: '<span lang="de">Ich lege das Handy auf den Tisch.</span>' },
    { q: 'Выбери: <span lang="de">Der Mantel (hängen) jetzt an der Tür.</span> Perfekt.', a: '<span lang="de">Der Mantel hat an der Tür gehangen.</span>' },
    { q: 'Дополни: <span lang="de">Ich freue mich ___ das Wochenende.</span> (впереди)', a: '<span lang="de">auf</span>' },
    { q: 'Задай вопрос: <span lang="de">Ich denke an die Prüfung.</span>', a: '<span lang="de">Woran denkst du?</span>' }
  ],
  q: [
    { q: '<span lang="de">Wir fahren an ___ Meer.</span>', o: ['dem', 'das', 'der', 'den'], a: 1, e: 'Wohin → Akk, das Meer.' },
    { q: '<span lang="de">Das Buch ___ auf dem Tisch.</span>', o: ['legt', 'liegt', 'stellt', 'setzt'], a: 1, e: 'Состояние.' },
    { q: '<span lang="de">Er hat Angst ___ der Prüfung.</span>', o: ['vor', 'auf', 'an', 'über'], a: 0, e: 'Angst vor + Dat.' },
    { q: '<span lang="de">Das hängt ___ dir ab.</span>', o: ['von', 'an', 'auf', 'mit'], a: 0, e: 'abhängen von.' },
    { q: 'Вопрос о вещи с warten auf:', o: ['Auf was wartest du?', 'Worauf wartest du?', 'Wo wartest du?', 'Wen wartest du?'], a: 1, e: 'wo(r) + предлог.' }
  ],
  s: [
    'an, auf, hinter, in, neben, über, unter, vor, zwischen: Wohin → Akk, Wo → Dat.',
    'Слияния: im, am, ins, ans.',
    'legen/liegen, stellen/stehen, setzen/sitzen, hängen (hängte/hing).',
    'Глаголы с предлогами учи с падежом: warten auf + Akk, Angst vor + Dat.',
    'sich freuen auf (будущее) / über (уже есть).',
    'Вещи: worauf/darauf; люди: auf wen/auf ihn.'
  ]
});
