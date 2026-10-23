L('pol', 13, {
  m: 40,
  intro: 'Даты, время, возраст, цены — числа нужны каждый день, и именно здесь польский часто отличается от русского. Порядковые числительные в датах стоят в родительном падеже, время называют порядковыми числительными женского рода, а для смешанных групп и детей есть собирательные числительные: dwoje, troje, pięcioro.',
  intro2: 'Senpai, «Urodziłam się trzeciego maja» — «Я родилась третьего мая» ♡ Тут всё как в русском! А «wpół do szóstej» — это 5:30: «половина до шестого», совсем как наше «полшестого». Считают до следующего часа!',
  goals: [
    'Называть даты с порядковыми числительными',
    'Говорить о времени: официально и разговорно',
    'Использовать собирательные числительные dwoje, troje',
    'Называть годы, возраст и цены'
  ],
  c: `
<h3>Даты</h3>
<div class="tbl"><table><thead><tr><th>Вопрос</th><th>Ответ</th><th>Падеж</th></tr></thead><tbody>
<tr><td lang="pl">Który jest dzisiaj?</td><td lang="pl">Dzisiaj jest pierwszy maja.</td><td>число — им., месяц — род.</td></tr>
<tr><td lang="pl">Kiedy masz urodziny?</td><td lang="pl">Dwudziestego piątego grudnia.</td><td>всё в род.</td></tr>
<tr><td lang="pl">W którym roku?</td><td lang="pl">W dwa tysiące ósmym roku.</td><td>местн.: w … roku</td></tr>
<tr><td lang="pl">Kiedy?</td><td lang="pl">Trzeciego marca dwa tysiące ósmego roku.</td><td>полная дата — род.</td></tr>
</tbody></table></div>
<p>Месяцы: <span lang="pl">styczeń, luty, marzec, kwiecień, maj, czerwiec, lipiec, sierpień, wrzesień, październik, listopad, grudzień</span>. Названия совсем не похожи на русские — их нужно выучить отдельно.</p>
<div class="ichika">Польские месяцы — про природу ♡ <span lang="pl">lipiec</span> — от липы (июль), <span lang="pl">sierpień</span> — от серпа (август, жатва), <span lang="pl">listopad</span> — «листопад» (ноябрь), <span lang="pl">kwiecień</span> — от цветов (апрель). Это древние славянские названия — в украинском они похожи!</div>

<h3>Время</h3>
<div class="tbl"><table><thead><tr><th>Время</th><th>Разговорно</th><th>Официально</th></tr></thead><tbody>
<tr><td>5:00</td><td lang="pl">piąta</td><td lang="pl">piąta (siedemnasta)</td></tr>
<tr><td>5:15</td><td lang="pl">kwadrans po piątej</td><td lang="pl">piąta piętnaście</td></tr>
<tr><td>5:30</td><td lang="pl">wpół do szóstej</td><td lang="pl">piąta trzydzieści</td></tr>
<tr><td>5:45</td><td lang="pl">za kwadrans szósta</td><td lang="pl">piąta czterdzieści pięć</td></tr>
<tr><td>5:50</td><td lang="pl">za dziesięć szósta</td><td lang="pl">piąta pięćdziesiąt</td></tr>
</tbody></table></div>
<p>Вопрос «во сколько?» — <span lang="pl">O której?</span> — ответ в местном падеже: <span lang="pl">o piątej, o wpół do ósmej, o siedemnastej trzydzieści</span>.</p>

<h3>Собирательные числительные</h3>
<p><span lang="pl">dwoje, troje, czworo, pięcioro, sześcioro…</span> + родительный множественного. Используются:</p>
<ul class="ex-l">
<li><span lang="pl">Mam dwoje dzieci.</span><span class="tr">С детьми.</span></li>
<li><span lang="pl">Przyszło troje studentów.</span><span class="tr">Со смешанной группой (юноши и девушки).</span></li>
<li><span lang="pl">W klatce było czworo kociąt.</span><span class="tr">С детёнышами (-ę: kocię, szczenię).</span></li>
<li><span lang="pl">dwoje drzwi, troje sań</span><span class="tr">С существительными только во мн. ч.</span></li>
</ul>
<div class="warn"><p>Глагол с собирательными числительными — в единственном числе среднего рода: <span lang="pl">Dwoje dzieci bawiło się w parku.</span> Не <s>bawiły się</s>.</p></div>

<h3>Возраст и цены</h3>
<ul class="ex-l">
<li><span lang="pl">Mam szesnaście lat. Ona ma dwadzieścia jeden lat. On ma dwadzieścia dwa lata.</span><span class="tr">rok — lata (2–4, 22–24) — lat (5+, 21).</span></li>
<li><span lang="pl">To kosztuje trzy złote pięćdziesiąt groszy.</span><span class="tr">3,50 злотых.</span></li>
</ul>
<div class="ayano">Даты и время — то, что нужно с первого дня в Польше: запись к врачу, билет на поезд, встреча с другом. Возьми свой ежедневник и проговаривай вслух по-польски все даты и время на неделю вперёд. Через неделю это станет автоматическим, и ты перестанешь переводить в голове.</div>
`,
  p: [
    { q: 'Скажи дату: 1 сентября.', a: '<span lang="pl">pierwszy września</span> (Dzisiaj jest…) / <span lang="pl">pierwszego września</span> (когда?)' },
    { q: 'Когда ты родился? (15 апреля 2009)', a: '<span lang="pl">Piętnastego kwietnia dwa tysiące dziewiątego roku.</span>' },
    { q: 'Скажи разговорно: 7:30.', a: '<span lang="pl">wpół do ósmej</span>' },
    { q: 'Скажи разговорно: 9:45.', a: '<span lang="pl">za kwadrans dziesiąta</span>' },
    { q: 'Переведи: «У меня трое детей».', a: '<span lang="pl">Mam troje dzieci.</span>' },
    { q: 'Сколько лет: 23 / 25?', a: '<span lang="pl">dwadzieścia trzy lata, dwadzieścia pięć lat</span>' }
  ],
  q: [
    { q: '<span lang="pl">Dzisiaj jest drugi ___ .</span> (май)', o: ['maj', 'maja', 'maju', 'majem'], a: 1, e: 'Месяц в родительном.' },
    { q: '5:30 разговорно:', o: ['wpół do piątej', 'wpół do szóstej', 'pół piątej', 'piąta i pół'], a: 1, e: 'Половина до шестой.' },
    { q: '<span lang="pl">O ___ zaczyna się film?</span>', o: ['który', 'której', 'którym', 'którą'], a: 1, e: 'O której?' },
    { q: '<span lang="pl">Mam ___ dzieci.</span> (2)', o: ['dwa', 'dwie', 'dwoje', 'dwóch'], a: 2, e: 'Собирательное.' },
    { q: '«Мне 22 года»:', o: ['Mam dwadzieścia dwa lat.', 'Mam dwadzieścia dwa lata.', 'Jestem dwadzieścia dwa lata.', 'Mam dwadzieścia dwa roku.'], a: 1, e: '22–24 → lata.' }
  ],
  s: [
    'Дата: pierwszy maja (сегодня), pierwszego maja (когда?); w dwa tysiące ósmym roku.',
    'Месяцы: styczeń, luty, marzec, kwiecień, maj, czerwiec, lipiec, sierpień, wrzesień, październik, listopad, grudzień.',
    'Время: kwadrans po, wpół do (следующего часа), za kwadrans; O której? — o piątej.',
    'Собирательные dwoje, troje: дети, смешанные группы, детёныши, слова только во мн. ч.',
    'С собирательными глагол в ед. ч. ср. р.',
    'Возраст: rok — lata — lat.'
  ]
});
