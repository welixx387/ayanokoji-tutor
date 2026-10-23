L('deu', 16, {
  m: 45,
  intro: 'Контрольная точка B2. Пора собрать грамматику и лексику в три ключевых навыка экзамена: аргументированное эссе (Erörterung), официальное письмо — жалобу или запрос — и дискуссию. В уроке — структуры, готовые формулы и критерии оценки, а в конце — проверка по требованиям уровня B2.',
  intro2: 'Senpai, на B2 ты уже не «учишь немецкий», а живёшь на нём ♡ Можешь спорить с соседом по общежитию, писать жалобу в Deutsche Bahn и смотреть сериалы без субтитров. Давай убедимся!',
  goals: [
    'Писать Erörterung: введение, аргументы за и против, собственная позиция, вывод',
    'Писать официальное письмо-жалобу и запрос',
    'Вести дискуссию: соглашаться, возражать, перебивать вежливо',
    'Проверить себя по требованиям уровня B2'
  ],
  c: `
<h3>Erörterung — аргументированное эссе</h3>
<ol>
<li><b>Einleitung.</b> Подведи к теме, сформулируй вопрос: <span lang="de">Immer mehr Menschen arbeiten im Homeoffice. Doch ist das wirklich sinnvoll?</span></li>
<li><b>Argumente dafür.</b> <span lang="de">Für … spricht, dass … Ein wichtiges Argument ist …</span></li>
<li><b>Argumente dagegen.</b> <span lang="de">Dagegen lässt sich einwenden, dass … Andererseits darf man nicht vergessen, dass …</span></li>
<li><b>Eigene Meinung.</b> <span lang="de">Meiner Ansicht nach überwiegen die Vorteile, weil …</span></li>
<li><b>Schluss.</b> <span lang="de">Zusammenfassend lässt sich sagen, dass …</span></li>
</ol>
<div class="ichika">Самые сильные аргументы ставь в конец каждого блока ♡ Читатель лучше запоминает последнее. А ещё обязательно пример: <span lang="de">Zum Beispiel …</span> Аргумент без примера — как торт без крема!</div>

<h3>Официальное письмо</h3>
<div class="tbl"><table><thead><tr><th>Часть</th><th>Формула</th></tr></thead><tbody>
<tr><td>Betreff</td><td lang="de">Beschwerde über die Reparatur vom 3. Mai</td></tr>
<tr><td>Anrede</td><td lang="de">Sehr geehrte Damen und Herren,</td></tr>
<tr><td>Повод</td><td lang="de">hiermit möchte ich mich über … beschweren. / Ich wende mich an Sie, weil …</td></tr>
<tr><td>Детали</td><td lang="de">Leider musste ich feststellen, dass … Außerdem …</td></tr>
<tr><td>Требование</td><td lang="de">Ich bitte Sie daher, … / Ich erwarte, dass Sie mir den Betrag erstatten.</td></tr>
<tr><td>Концовка</td><td lang="de">Ich hoffe auf eine baldige Antwort. Mit freundlichen Grüßen</td></tr>
</tbody></table></div>
<div class="warn"><p>Слово после Anrede пишется с маленькой буквы: <span lang="de">Sehr geehrte Damen und Herren, hiermit…</span> В Betreff не ставят точку и не пишут слово «Betreff» в современных письмах — только саму тему.</p></div>

<h3>Дискуссия</h3>
<div class="tbl"><table><thead><tr><th>Функция</th><th>Выражения</th></tr></thead><tbody>
<tr><td>Согласие</td><td lang="de">Da stimme ich Ihnen völlig zu. Das sehe ich genauso.</td></tr>
<tr><td>Частичное согласие</td><td lang="de">Da haben Sie zwar recht, aber … Das stimmt im Prinzip, allerdings …</td></tr>
<tr><td>Возражение</td><td lang="de">Da bin ich anderer Meinung. Das sehe ich anders, denn …</td></tr>
<tr><td>Вмешаться</td><td lang="de">Darf ich kurz unterbrechen? Dazu möchte ich etwas sagen.</td></tr>
<tr><td>Уточнить</td><td lang="de">Wie meinen Sie das genau? Habe ich Sie richtig verstanden, dass …?</td></tr>
<tr><td>Подвести итог</td><td lang="de">Wir sind uns also einig, dass … Fassen wir zusammen: …</td></tr>
</tbody></table></div>

<h3>Контрольная точка B2</h3>
<ul class="ex-l">
<li><b>Говорение:</b> 10–15 минут дискуссии на общественную тему с аргументами и примерами.</li>
<li><b>Аудирование:</b> радиоинтервью, подкасты, новости; фильмы без субтитров в целом понятны.</li>
<li><b>Чтение:</b> газетные статьи, мнения, несложная художественная литература.</li>
<li><b>Письмо:</b> эссе и официальное письмо около 150–200 слов, без ошибок, мешающих пониманию.</li>
</ul>
<p>Экзамены: <b>Goethe-Zertifikat B2</b>, telc Deutsch B2, ÖSD Zertifikat B2. Для поступления в немецкие вузы обычно нужен уровень выше — C1 (TestDaF, DSH или Goethe C1), об этом урок 24.</p>
<div class="ayano">Проверь себя на реальном материале: напиши эссе на 180 слов за 45 минут без словаря, затем перечитай с чек-листом — порядок слов в придаточных, падежи после предлогов, окончания прилагательных, связки. Если находишь больше пяти ошибок такого типа, вернись к урокам 4, 5 и 9 перед переходом к C1.</div>
`,
  p: [
    { q: 'Напиши вступительную фразу Erörterung на тему «Soziale Netzwerke».', a: 'Например: <span lang="de">Soziale Netzwerke sind aus unserem Alltag nicht mehr wegzudenken. Doch bringen sie mehr Vor- oder Nachteile?</span>' },
    { q: 'Введи аргумент «против»: «можно возразить, что это дорого».', a: '<span lang="de">Dagegen lässt sich einwenden, dass es teuer ist.</span>' },
    { q: 'Начни жалобу на опоздавшую доставку.', a: '<span lang="de">Sehr geehrte Damen und Herren, hiermit möchte ich mich über die verspätete Lieferung beschweren.</span>' },
    { q: 'Сформулируй требование вернуть деньги.', a: '<span lang="de">Ich bitte Sie daher, mir den Kaufpreis zu erstatten.</span>' },
    { q: 'Вежливо перебей собеседника.', a: '<span lang="de">Entschuldigung, darf ich kurz unterbrechen?</span>' },
    { q: 'Частично согласись: «Вы правы, но…»', a: '<span lang="de">Da haben Sie zwar recht, aber …</span>' }
  ],
  q: [
    { q: 'Часть Erörterung, где приводится собственная позиция:', o: ['Einleitung', 'Argumente dafür', 'Eigene Meinung', 'Betreff'], a: 2, e: 'Eigene Meinung.' },
    { q: '«Тут я придерживаюсь другого мнения»:', o: ['Da bin ich anderer Meinung.', 'Da habe ich andere Meinung.', 'Ich meine andere.', 'Das ist anders Meinung.'], a: 0, e: 'Устойчивая формула.' },
    { q: 'После «Sehr geehrte Damen und Herren,» следующее слово:', o: ['с большой буквы всегда', 'с маленькой буквы (если не существительное)', 'в кавычках', 'с новой страницы'], a: 1, e: 'Немецкая норма.' },
    { q: '«Подводя итог, можно сказать»:', o: ['Zusammenfassend lässt sich sagen', 'Zum Schluss ich sage', 'Am Ende sage ich', 'Zusammen sagen wir'], a: 0, e: 'Формула вывода.' },
    { q: 'Какой уровень обычно нужен для учёбы в немецком вузе?', o: ['A2', 'B1', 'B2', 'C1'], a: 3, e: 'Обычно C1: TestDaF, DSH, Goethe C1.' }
  ],
  s: [
    'Erörterung: Einleitung → dafür → dagegen → eigene Meinung → Schluss.',
    'Аргумент = тезис + объяснение + пример.',
    'Жалоба: Betreff, Anrede, повод, детали, требование, Mit freundlichen Grüßen.',
    'Дискуссия: zustimmen, widersprechen, unterbrechen, nachfragen, zusammenfassen.',
    'B2: дискуссия 10–15 минут, статьи, фильмы, эссе 150–200 слов.',
    'Экзамены B2: Goethe, telc, ÖSD; для вуза обычно нужен C1.'
  ]
});
