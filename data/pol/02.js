L('pol', 2, {
  m: 45,
  intro: 'Польских падежей семь, и шесть из них похожи на русские. Самый частый и важный — родительный (dopełniacz): он нужен после отрицания, количества, многих предлогов и глаголов. Окончания родительного падежа — главный источник ошибок на уровне B1, поэтому сегодня соберём их в систему.',
  intro2: 'Senpai, «Mam kota» — «у меня есть кот», а «Nie mam kota» — «у меня нет кота» ♡ Совсем как по-русски: отрицание тянет за собой родительный падеж. Хоть здесь польский нас не обманывает!',
  goals: [
    'Знать семь польских падежей и их вопросы',
    'Образовывать родительный падеж единственного и множественного числа',
    'Использовать родительный после отрицания и количества',
    'Знать предлоги и глаголы с родительным падежом'
  ],
  c: `
<h3>Семь падежей</h3>
<div class="tbl"><table><thead><tr><th>Падеж</th><th>Вопрос</th><th>Пример</th></tr></thead><tbody>
<tr><td>Mianownik (им.)</td><td lang="pl">kto? co?</td><td lang="pl">To jest kot.</td></tr>
<tr><td>Dopełniacz (род.)</td><td lang="pl">kogo? czego?</td><td lang="pl">Nie ma kota.</td></tr>
<tr><td>Celownik (дат.)</td><td lang="pl">komu? czemu?</td><td lang="pl">Daję kotu mleko.</td></tr>
<tr><td>Biernik (вин.)</td><td lang="pl">kogo? co?</td><td lang="pl">Widzę kota.</td></tr>
<tr><td>Narzędnik (твор.)</td><td lang="pl">(z) kim? (z) czym?</td><td lang="pl">Bawię się z kotem.</td></tr>
<tr><td>Miejscownik (предл.)</td><td lang="pl">o kim? o czym?</td><td lang="pl">Myślę o kocie.</td></tr>
<tr><td>Wołacz (зват.)</td><td lang="pl">o!</td><td lang="pl">Kocie, chodź tu!</td></tr>
</tbody></table></div>

<h3>Окончания родительного падежа</h3>
<div class="tbl"><table><thead><tr><th>Род</th><th>Ед. ч.</th><th>Мн. ч.</th></tr></thead><tbody>
<tr><td>Мужской</td><td><b>-a</b> (одушевлённые и часть неодушевлённых): <span lang="pl">kota, brata, chleba, ołówka</span><br><b>-u</b> (многие неодушевлённые): <span lang="pl">domu, sklepu, czasu</span></td><td><b>-ów</b>: <span lang="pl">domów, studentów</span>; после мягких часто <b>-i/-y</b>: <span lang="pl">gości, nauczycieli</span></td></tr>
<tr><td>Женский</td><td><b>-y / -i</b>: <span lang="pl">kobiety, mamy, ulicy, nocy, kuchni</span></td><td>чаще нулевое: <span lang="pl">kobiet, książek, ulic</span>; у некоторых <b>-i/-y</b>: <span lang="pl">nocy</span></td></tr>
<tr><td>Средний</td><td><b>-a</b>: <span lang="pl">okna, morza, miasta</span></td><td>нулевое: <span lang="pl">okien, miast, jabłek</span></td></tr>
</tbody></table></div>
<p>Выбор -a или -u у неодушевлённых мужского рода нельзя вывести одним правилом: <span lang="pl">telefonu, domu, samochodu</span>, но <span lang="pl">chleba, ołówka, zęba</span>. Учи родительный вместе со словом: <span lang="pl">dom — domu, chleb — chleba</span>.</p>
<div class="ichika">Беглое «е» — как в русском «сон — сна» ♡ <span lang="pl">okno → okien, książka → książek, jabłko → jabłek</span>. Во множественном числе гласная появляется, чтобы слово можно было произнести. Русскому уху это очень знакомо!</div>

<h3>Когда нужен родительный</h3>
<ul class="ex-l">
<li><span lang="pl">Nie mam czasu. Nie lubię kawy.</span><span class="tr">После отрицания вместо винительного.</span></li>
<li><span lang="pl">dużo ludzi, mało pieniędzy, trochę cukru, butelka wody, kilo jabłek</span><span class="tr">После слов количества и меры.</span></li>
<li><span lang="pl">do szkoły, od mamy, z Polski, bez cukru, dla ciebie, u babci, obok domu, podczas lekcji</span><span class="tr">Предлоги: do, od, z (откуда), bez, dla, u, obok, koło, podczas, według, wśród.</span></li>
<li><span lang="pl">szukać, słuchać, potrzebować, używać, bać się, uczyć się</span><span class="tr">Глаголы: <span lang="pl">Szukam kluczy. Uczę się polskiego.</span></span></li>
</ul>
<div class="warn"><p>Русское «слушать музыку» и «учить польский» — винительный, а в польском родительный: <span lang="pl">słucham muzyki, uczę się polskiego</span>. А «бояться» совпадает: <span lang="pl">boję się psa</span>.</p></div>
<div class="ayano">Не учи окончания отдельно от слов. Заведи словарь, где каждое существительное записано в двух формах: именительный и родительный. <span lang="pl">kot — kota, dom — domu, ulica — ulicy</span>. Родительный падеж по-польски — словарная форма, так же как в латыни. Через месяц ты будешь «слышать» правильное окончание.</div>
`,
  p: [
    { q: 'Поставь в отрицание: <span lang="pl">Mam brata.</span>', a: '<span lang="pl">Nie mam brata.</span>' },
    { q: 'Поставь в отрицание: <span lang="pl">Lubię herbatę.</span>', a: '<span lang="pl">Nie lubię herbaty.</span>' },
    { q: 'Дополни: <span lang="pl">butelka (woda), kilo (pomidory)</span>.', a: '<span lang="pl">butelka wody, kilo pomidorów</span>' },
    { q: 'Дополни: <span lang="pl">Idę do (szkoła), potem do (sklep).</span>', a: '<span lang="pl">do szkoły, do sklepu</span>' },
    { q: 'Переведи: «Я слушаю радио и учу польский».', a: '<span lang="pl">Słucham radia i uczę się polskiego.</span>' },
    { q: 'Множественное родительное: <span lang="pl">dużo (książka), pięć (okno)</span>.', a: '<span lang="pl">dużo książek, pięć okien</span>' }
  ],
  q: [
    { q: '<span lang="pl">Nie mam ___ .</span> (samochód)', o: ['samochód', 'samochodu', 'samochodem', 'samochodzie'], a: 1, e: 'Отрицание — родительный.' },
    { q: '<span lang="pl">Szukam ___ .</span> (klucze)', o: ['klucze', 'kluczy', 'kluczami', 'kluczach'], a: 1, e: 'szukać + родительный.' },
    { q: 'Предлог с родительным:', o: ['bez', 'przez', 'o', 'z kim'], a: 0, e: 'bez cukru.' },
    { q: '<span lang="pl">dużo ___</span> (kobieta, мн. ч.)', o: ['kobiety', 'kobiet', 'kobietów', 'kobietami'], a: 1, e: 'Нулевое окончание.' },
    { q: '«Я учу польский»:', o: ['Uczę polski.', 'Uczę się polskiego.', 'Uczę się polski.', 'Uczę polskim.'], a: 1, e: 'uczyć się + родительный.' }
  ],
  s: [
    'Семь падежей: им., род., дат., вин., твор., предл. (miejscownik), зват.',
    'Род. ед. ч.: м. р. -a/-u (учить со словом), ж. р. -y/-i, ср. р. -a.',
    'Род. мн. ч.: м. р. -ów (или -i/-y), ж. и ср. р. — часто нулевое с беглым e.',
    'После отрицания и количества — родительный.',
    'Предлоги: do, od, z, bez, dla, u, obok, podczas, według, wśród.',
    'Глаголы: szukać, słuchać, potrzebować, używać, bać się, uczyć się.'
  ]
});
