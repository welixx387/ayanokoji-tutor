L('deu', 4, {
  m: 45,
  intro: 'Склонение прилагательных — самая «страшная» тема немецкой грамматики, но у неё есть простой принцип. Окончание прилагательного зависит от того, что стоит перед ним: определённый артикль, неопределённый или ничего. И работает одно правило: сигнал рода и падежа должен прозвучать хотя бы один раз — либо в артикле, либо в прилагательном.',
  intro2: 'Senpai, «ein schöner Tag», «der schöne Tag», «schönes Wetter» — окончания пляшут, но в этом танце есть ритм ♡ Сегодня научу тебя чувствовать его, а не зубрить три таблицы наизусть. Почти.',
  goals: [
    'Понимать принцип «сигнала» в склонении прилагательных',
    'Склонять прилагательные после определённого артикля',
    'Склонять прилагательные после ein, kein и притяжательных местоимений',
    'Склонять прилагательные без артикля'
  ],
  c: `
<h3>Главный принцип</h3>
<div class="rule" data-t="Сигнал звучит один раз"><p>Признаки рода и падежа (-r, -s, -e, -m, -n) называются сигналами. Если артикль уже показал сигнал (der, dem, das), прилагательному достаточно -e или -en. Если артикль сигнала не дал (ein, kein, без артикля) — сигнал берёт на себя прилагательное.</p></div>

<h3>После определённого артикля</h3>
<div class="tbl"><table><thead><tr><th></th><th>мужской</th><th>женский</th><th>средний</th><th>множ.</th></tr></thead><tbody>
<tr><td>Nom</td><td lang="de">der gute Mann</td><td lang="de">die gute Frau</td><td lang="de">das gute Kind</td><td lang="de">die guten Kinder</td></tr>
<tr><td>Akk</td><td lang="de">den guten Mann</td><td lang="de">die gute Frau</td><td lang="de">das gute Kind</td><td lang="de">die guten Kinder</td></tr>
<tr><td>Dat</td><td lang="de">dem guten Mann</td><td lang="de">der guten Frau</td><td lang="de">dem guten Kind</td><td lang="de">den guten Kindern</td></tr>
<tr><td>Gen</td><td lang="de">des guten Mannes</td><td lang="de">der guten Frau</td><td lang="de">des guten Kindes</td><td lang="de">der guten Kinder</td></tr>
</tbody></table></div>
<p>Просто: <b>-e</b> в пяти клетках (именительный ед. ч. всех родов, винительный женского и среднего), везде остальное — <b>-en</b>. Так же после <span lang="de">dieser, jeder, welcher</span> и <span lang="de">alle</span> во множественном.</p>

<h3>После ein, kein, mein</h3>
<div class="tbl"><table><thead><tr><th></th><th>мужской</th><th>женский</th><th>средний</th><th>множ.</th></tr></thead><tbody>
<tr><td>Nom</td><td lang="de">ein guter Mann</td><td lang="de">eine gute Frau</td><td lang="de">ein gutes Kind</td><td lang="de">keine guten Kinder</td></tr>
<tr><td>Akk</td><td lang="de">einen guten Mann</td><td lang="de">eine gute Frau</td><td lang="de">ein gutes Kind</td><td lang="de">keine guten Kinder</td></tr>
<tr><td>Dat</td><td lang="de">einem guten Mann</td><td lang="de">einer guten Frau</td><td lang="de">einem guten Kind</td><td lang="de">keinen guten Kindern</td></tr>
<tr><td>Gen</td><td lang="de">eines guten Mannes</td><td lang="de">einer guten Frau</td><td lang="de">eines guten Kindes</td><td lang="de">keiner guten Kinder</td></tr>
</tbody></table></div>
<p>Отличие от первой таблицы — только три клетки, где <span lang="de">ein</span> «молчит»: <span lang="de">ein guter Mann</span> (Nom м. р.), <span lang="de">ein gutes Kind</span> (Nom и Akk ср. р.). Там прилагательное берёт сигнал артикля der/das: -er, -es.</p>
<div class="ichika">Фокус ♡ Сравни <span lang="de">der</span> и <span lang="de">ein guter</span>: буква r «перепрыгнула» с артикля на прилагательное. И <span lang="de">das</span> → <span lang="de">ein gutes</span>: буква s тоже перепрыгнула. Сигнал никуда не исчез, он просто переехал!</div>

<h3>Без артикля</h3>
<div class="tbl"><table><thead><tr><th></th><th>мужской</th><th>женский</th><th>средний</th><th>множ.</th></tr></thead><tbody>
<tr><td>Nom</td><td lang="de">guter Wein</td><td lang="de">frische Milch</td><td lang="de">frisches Brot</td><td lang="de">alte Freunde</td></tr>
<tr><td>Akk</td><td lang="de">guten Wein</td><td lang="de">frische Milch</td><td lang="de">frisches Brot</td><td lang="de">alte Freunde</td></tr>
<tr><td>Dat</td><td lang="de">gutem Wein</td><td lang="de">frischer Milch</td><td lang="de">frischem Brot</td><td lang="de">alten Freunden</td></tr>
<tr><td>Gen</td><td lang="de">guten Weines</td><td lang="de">frischer Milch</td><td lang="de">frischen Brotes</td><td lang="de">alter Freunde</td></tr>
</tbody></table></div>
<p>Прилагательное получает окончания определённого артикля: der → gut<b>er</b>, dem → gut<b>em</b>, das → frisch<b>es</b>. Исключение — родительный мужского и среднего рода: -en, потому что сигнал уже есть в существительном (-es).</p>
<div class="warn"><p>Прилагательное после глагола (в роли сказуемого) не склоняется: <span lang="de">Der Mann ist gut.</span> Окончания нужны только перед существительным.</p></div>

<h3>Алгоритм за три секунды</h3>
<ol><li>Есть ли перед прилагательным артикль с сигналом (der, dem, den, des…)? → -e или -en.</li><li>Артикль ein-типа без окончания (ein, kein, mein)? → прилагательное берёт сигнал: -er / -es.</li><li>Артикля нет? → окончание как у определённого артикля.</li></ol>
<div class="ayano">Не пытайся вычислять окончание в живой речи по таблице — это слишком медленно. Выучи наизусть десять фраз-образцов: <span lang="de">mit einem guten Freund, in der neuen Wohnung, ein schönes Wochenende, mit freundlichen Grüßen</span>. Когда сомневаешься, подставляй нужное слово в знакомый образец. Таблица нужна для проверки, а не для разговора.</div>
`,
  p: [
    { q: 'Вставь окончание: <span lang="de">Das ist ein interessant___ Buch.</span>', a: '<span lang="de">interessantes</span> — ein не показал род, сигнал -es.' },
    { q: 'Вставь: <span lang="de">Ich wohne in der neu___ Wohnung.</span>', a: '<span lang="de">neuen</span> — Dativ, после der.' },
    { q: 'Вставь: <span lang="de">Er hat einen klein___ Hund.</span>', a: '<span lang="de">kleinen</span> — Akkusativ м. р.' },
    { q: 'Вставь: <span lang="de">Ich trinke gern kalt___ Wasser.</span>', a: '<span lang="de">kaltes</span> — без артикля, сигнал das → -es.' },
    { q: 'Вставь: <span lang="de">Mit freundlich___ Grüßen</span>', a: '<span lang="de">freundlichen</span> — Dativ множ. без артикля.' },
    { q: 'Вставь: <span lang="de">Das ist ein alt___ Mann.</span>', a: '<span lang="de">alter</span> — Nominativ м. р. после ein.' }
  ],
  q: [
    { q: '<span lang="de">der ___ Tisch</span> (Nom)', o: ['großer', 'große', 'großen', 'großes'], a: 1, e: 'После der в Nom — -e.' },
    { q: '<span lang="de">ein ___ Auto</span> (Nom)', o: ['neue', 'neuen', 'neues', 'neuer'], a: 2, e: 'Сигнал среднего рода.' },
    { q: '<span lang="de">mit einer ___ Freundin</span>', o: ['gute', 'guten', 'guter', 'gutes'], a: 1, e: 'Dativ после einer.' },
    { q: '<span lang="de">___ Kaffee</span> (Nom, без артикля)', o: ['schwarze', 'schwarzen', 'schwarzer', 'schwarzes'], a: 2, e: 'Как der → -er.' },
    { q: '<span lang="de">Das Wetter ist ___.</span>', o: ['schön', 'schöne', 'schönes', 'schönen'], a: 0, e: 'После глагола не склоняется.' }
  ],
  s: [
    'Сигнал рода и падежа звучит один раз — в артикле или прилагательном.',
    'После der/die/das: -e в Nom ед. ч. и Akk ж./ср. р., иначе -en.',
    'После ein/kein/mein: как после der, но ein guter (Nom м.), ein gutes (Nom/Akk ср.).',
    'Без артикля: окончание определённого артикля (guter, gutem, gutes), Gen м./ср. — -en.',
    'После глагола прилагательное не склоняется.',
    'Учись по фразам-образцам, таблицей проверяй.'
  ]
});
