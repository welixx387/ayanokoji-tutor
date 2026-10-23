L('deu', 21, {
  m: 40,
  intro: 'Словообразование — главный способ расширить словарь на уровне C1 без зубрёжки. Немецкий собирает слова как конструктор: приставки меняют смысл глагола, суффиксы превращают глагол в существительное или прилагательное, а сложные слова соединяют несколько корней в одно. Зная модели, ты понимаешь незнакомые слова и сам строишь новые.',
  intro2: 'Senpai, «Donaudampfschifffahrtsgesellschaft» — это одно слово! ♡ Пароходство по Дунаю. Немцы склеивают слова, как оригами. Сегодня научимся разбирать такие чудовища на понятные кусочки.',
  goals: [
    'Различать отделяемые, неотделяемые и двойственные приставки',
    'Понимать значения приставок be-, ver-, er-, ent-, zer-',
    'Разбирать сложные слова и определять их род',
    'Использовать суффиксы существительных и прилагательных'
  ],
  c: `
<h3>Приставки глаголов</h3>
<div class="tbl"><table><thead><tr><th>Тип</th><th>Приставки</th><th>Ударение и Partizip II</th></tr></thead><tbody>
<tr><td>Неотделяемые</td><td lang="de">be-, emp-, ent-, er-, ge-, miss-, ver-, zer-</td><td>безударные, без ge-: <span lang="de">verstanden</span></td></tr>
<tr><td>Отделяемые</td><td lang="de">ab-, an-, auf-, aus-, ein-, mit-, nach-, vor-, weg-, zu-, zurück-</td><td>ударные, -ge- внутри: <span lang="de">aufgestanden</span></td></tr>
<tr><td>Двойственные</td><td lang="de">durch-, über-, um-, unter-, wieder-</td><td>смысл зависит от отделяемости</td></tr>
</tbody></table></div>
<ul class="ex-l">
<li><span lang="de">Er setzt mit der Fähre über.</span><span class="tr">übersetzen (отделяемая): переправляться.</span></li>
<li><span lang="de">Sie übersetzt den Text.</span><span class="tr">übersetzen (неотделяемая): переводить.</span></li>
<li><span lang="de">Er fährt das Schild um. / Er umfährt das Hindernis.</span><span class="tr">сбить / объехать.</span></li>
</ul>

<h3>Значения неотделяемых приставок</h3>
<div class="tbl"><table><thead><tr><th>Приставка</th><th>Значение</th><th>Примеры</th></tr></thead><tbody>
<tr><td lang="de">ver-</td><td>ошибка; изменение; расход</td><td lang="de">sich verlaufen (заблудиться), verschlafen (проспать), verbessern (улучшить), verbrauchen (израсходовать)</td></tr>
<tr><td lang="de">er-</td><td>достижение результата</td><td lang="de">erreichen, erkämpfen, erfinden</td></tr>
<tr><td lang="de">ent-</td><td>удаление, отделение</td><td lang="de">entfernen, entkommen, entdecken</td></tr>
<tr><td lang="de">zer-</td><td>разрушение на части</td><td lang="de">zerbrechen, zerreißen, zerstören</td></tr>
<tr><td lang="de">be-</td><td>делает глагол переходным</td><td lang="de">antworten auf → beantworten; über etwas sprechen → besprechen</td></tr>
<tr><td lang="de">miss-</td><td>неудача, неправильно</td><td lang="de">missverstehen, misslingen</td></tr>
</tbody></table></div>
<div class="ichika">Приставка ver- — коварная ♡ <span lang="de">kaufen</span> — покупать, <span lang="de">verkaufen</span> — продавать! <span lang="de">mieten</span> — снимать, <span lang="de">vermieten</span> — сдавать. А <span lang="de">sich versprechen</span> — оговориться, хотя <span lang="de">versprechen</span> — обещать. Будь начеку!</div>

<h3>Сложные слова</h3>
<div class="rule" data-t="Главное слово — последнее"><p>Род и основное значение сложного слова определяет последний компонент: <span lang="de">das Haus + die Tür = die Haustür</span> (дверь дома).</p></div>
<ul class="ex-l">
<li><span lang="de">die Arbeit + der Platz = der Arbeitsplatz</span><span class="tr">соединительное -s- (после -ung, -heit, -keit, -tion, -ität и многих других)</span></li>
<li><span lang="de">die Sonne + die Brille = die Sonnenbrille</span><span class="tr">соединительное -n-</span></li>
<li><span lang="de">das Kind + der Garten = der Kindergarten</span><span class="tr">-er- (часто от формы множественного числа)</span></li>
<li><span lang="de">die Donau + der Dampf + das Schiff + die Fahrt</span><span class="tr">→ die Donaudampfschifffahrt: читай справа налево — «плавание пароходов по Дунаю».</span></li>
</ul>

<h3>Суффиксы</h3>
<div class="tbl"><table><thead><tr><th>Суффикс</th><th>Род / часть речи</th><th>Примеры</th></tr></thead><tbody>
<tr><td lang="de">-ung, -heit, -keit, -schaft, -ion, -ität</td><td>женский род</td><td lang="de">die Wohnung, die Freiheit, die Möglichkeit, die Freundschaft</td></tr>
<tr><td lang="de">-er, -ling, -ismus</td><td>мужской род</td><td lang="de">der Lehrer, der Lehrling, der Tourismus</td></tr>
<tr><td lang="de">-chen, -lein, -ment, -um</td><td>средний род</td><td lang="de">das Mädchen, das Büchlein, das Dokument, das Museum</td></tr>
<tr><td lang="de">-bar, -lich, -ig, -los, -haft, -isch, -sam</td><td>прилагательные</td><td lang="de">machbar, freundlich, lustig, arbeitslos, fehlerhaft, typisch, sparsam</td></tr>
</tbody></table></div>
<div class="ayano">Когда встречаешь длинное незнакомое слово, не лезь сразу в словарь. Разбей его на части справа налево, определи главное слово и приставку, предположи значение по контексту. Потом проверь. Эта привычка за месяц удваивает скорость чтения: большинство длинных слов состоит из уже знакомых кусков.</div>
`,
  p: [
    { q: 'Объясни разницу: <span lang="de">umfahren</span> (отделяемое) и <span lang="de">umfahren</span> (неотделяемое).', a: 'Отделяемое — сбить (<span lang="de">Er fährt den Baum um</span>), неотделяемое — объехать (<span lang="de">Er umfährt den Stau</span>).' },
    { q: 'Что значит <span lang="de">vermieten</span>, если <span lang="de">mieten</span> — снимать?', a: 'Сдавать в аренду.' },
    { q: 'Определи род: <span lang="de">Fußballweltmeisterschaft</span>.', a: 'Женский — по последнему слову die Meisterschaft.' },
    { q: 'Образуй сложное слово: die Zeitung + der Artikel.', a: '<span lang="de">der Zeitungsartikel</span> — соединительное -s-.' },
    { q: 'Образуй существительное: frei, möglich, wohnen.', a: '<span lang="de">die Freiheit, die Möglichkeit, die Wohnung</span>' },
    { q: 'Образуй прилагательное «без работы» и «экономный».', a: '<span lang="de">arbeitslos, sparsam</span>' }
  ],
  q: [
    { q: 'Неотделяемая приставка:', o: ['auf-', 'ver-', 'mit-', 'zu-'], a: 1, e: 'ver- неотделяемая.' },
    { q: 'Род слова <span lang="de">Handschuh</span> (die Hand + der Schuh):', o: ['die', 'der', 'das', 'зависит от смысла'], a: 1, e: 'По последнему слову.' },
    { q: 'zer- обычно означает:', o: ['достижение', 'разрушение', 'начало', 'повтор'], a: 1, e: 'zerbrechen, zerstören.' },
    { q: 'Суффикс среднего рода:', o: ['-ung', '-chen', '-heit', '-ling'], a: 1, e: 'das Mädchen.' },
    { q: '<span lang="de">Sie ___ den Brief ins Englische.</span>', o: ['setzt über', 'übersetzt', 'übergesetzt', 'setzt übersetzt'], a: 1, e: 'Переводить — неотделяемое.' }
  ],
  s: [
    'Неотделяемые: be-, ent-, er-, ver-, zer-, miss- (без ge-).',
    'Отделяемые: ab-, an-, auf-, aus-, ein-, mit-, zu- (ударные).',
    'Двойственные: über-, um-, unter-, durch- — смысл зависит от отделяемости.',
    'ver- — ошибка/изменение (verkaufen, verschlafen); er- — результат; zer- — разрушение.',
    'Сложное слово: род и смысл — по последнему компоненту; соединительные -s-, -n-, -er-.',
    'Суффиксы: -ung/-heit/-keit (die), -er/-ling (der), -chen (das), -bar/-lich/-los (прил.).'
  ]
});
