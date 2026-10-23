L('pol', 16, {
  m: 45,
  intro: 'Контрольная точка B2. С уровнем B2 можно учиться в польском университете на польском языке и работать в польской компании. Проверим главные письменные жанры экзамена — аргументированное эссе (rozprawka) и официальное письмо — и устные навыки дискуссии. В конце — требования уровня и формат государственного экзамена B2.',
  intro2: 'Senpai, B2 — это когда тебя спрашивают: «Ты точно не поляк?» ♡ С ним ты можешь поступить в Ягеллонский университет и спорить о политике в краковском кафе. Проверим, насколько ты близок к этому!',
  goals: [
    'Писать rozprawka: теза, аргументы, контраргумент, вывод',
    'Писать официальное письмо: просьба, жалоба (reklamacja)',
    'Вести дискуссию: соглашаться, возражать, уточнять',
    'Проверить себя по требованиям B2'
  ],
  c: `
<h3>Rozprawka — эссе</h3>
<div class="tbl"><table><thead><tr><th>Часть</th><th>Формулы</th></tr></thead><tbody>
<tr><td>Wstęp и teza</td><td lang="pl">Współcześnie coraz częściej mówi się o … Uważam, że …</td></tr>
<tr><td>Argumenty</td><td lang="pl">Po pierwsze, … Po drugie, … Ponadto … Co więcej, …</td></tr>
<tr><td>Przykład</td><td lang="pl">Przykładem może być … Świadczy o tym …</td></tr>
<tr><td>Kontrargument</td><td lang="pl">Z drugiej strony należy pamiętać, że … Przeciwnicy tego poglądu twierdzą, że …</td></tr>
<tr><td>Zakończenie</td><td lang="pl">Podsumowując, … Reasumując, … W związku z powyższym …</td></tr>
</tbody></table></div>
<div class="ichika">Польские школьники пишут rozprawka с начальной школы ♡ Главное — <span lang="pl">teza</span> в начале и подтверждение в конце. Если в выводе ты передумал — это провал! Позиция должна быть устойчивой, как Вавельский замок.</div>

<h3>Официальное письмо</h3>
<div class="tbl"><table><thead><tr><th>Часть</th><th>Формулы</th></tr></thead><tbody>
<tr><td>Обращение</td><td lang="pl">Szanowni Państwo, / Szanowna Pani Dyrektor,</td></tr>
<tr><td>Повод</td><td lang="pl">Zwracam się z uprzejmą prośbą o … / W nawiązaniu do Pana wiadomości …</td></tr>
<tr><td>Жалоба</td><td lang="pl">Chciałbym złożyć reklamację dotyczącą … Niestety, … okazało się, że …</td></tr>
<tr><td>Требование</td><td lang="pl">Uprzejmie proszę o zwrot pieniędzy / o wymianę towaru.</td></tr>
<tr><td>Концовка</td><td lang="pl">Z góry dziękuję za odpowiedź. Z poważaniem</td></tr>
</tbody></table></div>
<div class="warn"><p>В официальном письме не используй <span lang="pl">bo, fajny, super, no</span>. Обращение к адресату и местоимения пиши с большой буквы: <span lang="pl">Proszę Panią…, Pana prośba…</span>.</p></div>

<h3>Дискуссия</h3>
<ul class="ex-l">
<li><span lang="pl">Całkowicie się z tobą zgadzam.</span><span class="tr">Полностью согласен.</span></li>
<li><span lang="pl">Masz rację, ale …</span><span class="tr">Ты прав, но…</span></li>
<li><span lang="pl">Nie do końca się zgadzam.</span><span class="tr">Не совсем согласен.</span></li>
<li><span lang="pl">Moim zdaniem jest zupełnie odwrotnie.</span><span class="tr">По-моему, всё наоборот.</span></li>
<li><span lang="pl">Co masz na myśli?</span><span class="tr">Что ты имеешь в виду?</span></li>
<li><span lang="pl">Przepraszam, że przerywam, ale …</span><span class="tr">Простите, что перебиваю, но…</span></li>
</ul>

<h3>Контрольная точка B2</h3>
<ul class="ex-l">
<li><b>Говорение:</b> дискуссия на общественные темы с аргументами, вежливое несогласие.</li>
<li><b>Аудирование:</b> радио, подкасты, фильмы без субтитров в целом понятны.</li>
<li><b>Чтение:</b> газетные статьи, мнения, несложная художественная литература.</li>
<li><b>Письмо:</b> эссе и официальное письмо с правильной пунктуацией и регистром.</li>
<li><b>Грамматика:</b> мужско-личные формы, числительные, условное наклонение без системных ошибок.</li>
</ul>
<p>Государственный экзамен B2 проверяет те же пять частей, что и B1, на более сложном материале. Многие польские вузы принимают иностранцев на программы на польском языке с B2. Требования конкретного вуза уточняй на его сайте.</p>
<div class="ayano">Пройди честную самопроверку: напиши rozprawka на 250 слов за 60 минут на тему «Czy warto studiować za granicą?» и проверь: теза в начале и в конце, три аргумента с примерами, контраргумент, запятые перед придаточными, мужско-личные формы. Если находишь больше пяти системных ошибок — вернись к урокам 6, 9 и 14.</div>
`,
  p: [
    { q: 'Сформулируй тезу: «Я считаю, что учиться за границей стоит».', a: '<span lang="pl">Uważam, że warto studiować za granicą.</span>' },
    { q: 'Введи второй аргумент и добавление.', a: '<span lang="pl">Po drugie, … Co więcej, …</span>' },
    { q: 'Введи контраргумент.', a: '<span lang="pl">Z drugiej strony należy pamiętać, że …</span>' },
    { q: 'Начни жалобу на сломанный телефон.', a: '<span lang="pl">Chciałbym złożyć reklamację dotyczącą telefonu, który kupiłem w Państwa sklepie.</span>' },
    { q: 'Вежливо попроси о возврате денег.', a: '<span lang="pl">Uprzejmie proszę o zwrot pieniędzy.</span>' },
    { q: 'Вежливо перебей собеседника.', a: '<span lang="pl">Przepraszam, że przerywam, ale …</span>' }
  ],
  q: [
    { q: 'Главная мысль rozprawka называется:', o: ['teza', 'temat', 'tytuł', 'treść'], a: 0, e: 'Teza.' },
    { q: '«Подводя итог»:', o: ['Podsumowując', 'Po pierwsze', 'Co więcej', 'Na przykład'], a: 0, e: 'Podsumowując.' },
    { q: 'Жалоба на товар по-польски:', o: ['skarga только', 'reklamacja', 'rezerwacja', 'reklama'], a: 1, e: 'Reklamacja.' },
    { q: 'Неуместно в официальном письме:', o: ['ponieważ', 'uprzejmie', 'fajny', 'Z poważaniem'], a: 2, e: 'Разговорное слово.' },
    { q: '«Не совсем согласен»:', o: ['Całkowicie się zgadzam.', 'Nie do końca się zgadzam.', 'Masz rację.', 'Zgoda.'], a: 1, e: 'Частичное несогласие.' }
  ],
  s: [
    'Rozprawka: wstęp z tezą → argumenty z przykładami → kontrargument → zakończenie.',
    'Связки: po pierwsze, ponadto, co więcej, z drugiej strony, podsumowując.',
    'Официально: Szanowni Państwo, Zwracam się z uprzejmą prośbą, Z poważaniem.',
    'Жалоба: reklamacja dotycząca…, Uprzejmie proszę o zwrot / wymianę.',
    'Дискуссия: zgadzam się, nie do końca, co masz na myśli, przepraszam, że przerywam.',
    'B2 — уровень для учёбы и работы на польском.'
  ]
});
