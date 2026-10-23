L('deu', 2, {
  m: 40,
  intro: 'Чтобы говорить на уровне B1, нужно связывать мысли: объяснять причины, сообщать, ставить условия, задавать косвенные вопросы. Для этого служат придаточные предложения. Главная особенность немецкого придаточного — спрягаемый глагол уходит в самый конец. Освоишь этот механизм — и речь сразу станет взрослее.',
  intro2: 'Senpai, в придаточном немецкий глагол прячется в самый конец, как кот под диван ♡ «…, weil ich keine Zeit habe». Сначала непривычно, потом начинаешь ждать глагол и даже радоваться, когда он наконец появляется!',
  goals: [
    'Ставить глагол в конец придаточного предложения',
    'Различать weil и denn, wenn и als, obwohl и trotzdem',
    'Строить косвенные вопросы с ob и вопросительными словами',
    'Начинать фразу с придаточного и правильно строить главное'
  ],
  c: `
<h3>Механизм придаточного</h3>
<div class="rule" data-t="Союз … спрягаемый глагол в конце"><p>В придаточном спрягаемый глагол стоит последним. Модальный глагол или вспомогательный haben/sein встают после инфинитива или причастия. Отделяемая приставка снова «прирастает» к глаголу.</p></div>
<ul class="ex-l">
<li><span lang="de">Ich bleibe zu Hause, weil ich krank bin.</span><span class="tr">Я остаюсь дома, потому что болею.</span></li>
<li><span lang="de">Ich weiß, dass du morgen arbeiten musst.</span><span class="tr">Я знаю, что ты завтра должен работать.</span></li>
<li><span lang="de">Er sagt, dass er den Film schon gesehen hat.</span><span class="tr">Он говорит, что уже видел фильм.</span></li>
<li><span lang="de">Sie ist müde, weil sie früh aufsteht.</span><span class="tr">Она устаёт, потому что рано встаёт (aufstehen — слитно).</span></li>
</ul>

<h3>Пары, которые путают</h3>
<div class="tbl"><table><thead><tr><th>Пара</th><th>Разница</th><th>Пример</th></tr></thead><tbody>
<tr><td lang="de">weil / denn</td><td>оба «потому что»; после weil глагол в конце, после denn — обычный порядок</td><td lang="de">…, weil ich müde bin. / …, denn ich bin müde.</td></tr>
<tr><td lang="de">wenn / als</td><td>als — однократное событие в прошлом; wenn — повторяемое или настоящее/будущее, а также «если»</td><td lang="de">Als ich klein war, … / Wenn ich Zeit habe, …</td></tr>
<tr><td lang="de">obwohl / trotzdem</td><td>obwohl — союз (глагол в конец); trotzdem — наречие на первом месте (глагол второй)</td><td lang="de">Obwohl es regnet, gehe ich spazieren. / Es regnet. Trotzdem gehe ich spazieren.</td></tr>
<tr><td lang="de">dass / das</td><td>dass — союз «что»; das — артикль или местоимение</td><td lang="de">Ich glaube, dass das Buch gut ist.</td></tr>
</tbody></table></div>
<div class="ichika">Запоминалка для als ♡ Als — это «альбом»: одна фотография из прошлого. <span lang="de">Als ich in Berlin war…</span> — один раз, одна поездка. А <span lang="de">wenn</span> — это «всегда, когда»: <span lang="de">Immer wenn ich in Berlin war, habe ich Currywurst gegessen.</span></div>

<h3>Косвенные вопросы</h3>
<ul class="ex-l">
<li><span lang="de">Kommst du morgen? → Ich weiß nicht, ob du morgen kommst.</span><span class="tr">Вопрос «да/нет» → ob (ли).</span></li>
<li><span lang="de">Wann fährt der Zug? → Können Sie mir sagen, wann der Zug fährt?</span><span class="tr">Вопросительное слово остаётся союзом.</span></li>
<li><span lang="de">Wo wohnt er? → Weißt du, wo er wohnt?</span><span class="tr">Косвенный вопрос — вежливее прямого.</span></li>
</ul>

<h3>Придаточное в начале</h3>
<p>Если предложение начинается с придаточного, оно занимает <b>первое место</b>. Значит, сразу после запятой идёт глагол главного предложения, а за ним подлежащее.</p>
<ul class="ex-l">
<li><span lang="de">Weil es regnet, bleibe ich zu Hause.</span><span class="tr">«глагол, глагол» на стыке — так и должно быть.</span></li>
<li><span lang="de">Wenn du Zeit hast, ruf mich an.</span><span class="tr">Если будет время, позвони мне.</span></li>
</ul>
<div class="warn"><p>Частая ошибка: <s>Weil es regnet, ich bleibe zu Hause.</s> Подлежащее главного предложения не может стоять сразу после придаточного — сначала глагол.</p></div>
<div class="ayano">Сначала тренируй одну модель до автоматизма — например, weil. Каждый день отвечай себе на три «почему?» с weil, проговаривая вслух. Когда глагол в конце начнёт ставиться сам, переходи к dass и ob. Попытка освоить все союзы сразу даёт одинаковые ошибки во всех.</div>
`,
  p: [
    { q: 'Соедини с weil: <span lang="de">Ich lerne Deutsch. Ich will in Wien studieren.</span>', a: '<span lang="de">Ich lerne Deutsch, weil ich in Wien studieren will.</span>' },
    { q: 'Перепиши с denn: <span lang="de">Er kommt nicht, weil er krank ist.</span>', a: '<span lang="de">Er kommt nicht, denn er ist krank.</span>' },
    { q: 'Выбери als или wenn: ___ ich zehn Jahre alt war, bekam ich einen Hund.', a: '<span lang="de">Als</span> — одно событие в прошлом.' },
    { q: 'Косвенный вопрос: <span lang="de">Hat der Laden heute geöffnet?</span> (Weißt du, …)', a: '<span lang="de">Weißt du, ob der Laden heute geöffnet hat?</span>' },
    { q: 'Начни с придаточного: <span lang="de">Ich gehe spazieren, obwohl es kalt ist.</span>', a: '<span lang="de">Obwohl es kalt ist, gehe ich spazieren.</span>' },
    { q: 'Перепиши с trotzdem: <span lang="de">Obwohl ich müde bin, lerne ich weiter.</span>', a: '<span lang="de">Ich bin müde. Trotzdem lerne ich weiter.</span>' }
  ],
  q: [
    { q: '<span lang="de">Ich glaube, dass er recht ___.</span>', o: ['hat', 'haben', 'hat er', 'ist'], a: 0, e: 'Глагол в конце придаточного.' },
    { q: 'После какого союза обычный порядок слов?', o: ['weil', 'dass', 'denn', 'obwohl'], a: 2, e: 'denn не меняет порядок.' },
    { q: '<span lang="de">___ ich gestern nach Hause kam, war niemand da.</span>', o: ['Wenn', 'Als', 'Ob', 'Dass'], a: 1, e: 'Однократно в прошлом.' },
    { q: '<span lang="de">Weil ich Hunger habe, ___</span>', o: ['ich esse ein Brot.', 'esse ich ein Brot.', 'ich ein Brot esse.', 'ein Brot ich esse.'], a: 1, e: 'После придаточного — сразу глагол.' },
    { q: 'Косвенный вопрос «да/нет» вводится словом:', o: ['dass', 'wenn', 'ob', 'als'], a: 2, e: 'ob = ли.' }
  ],
  s: [
    'В придаточном спрягаемый глагол — в конце; отделяемая приставка слитно.',
    'weil — глагол в конце; denn — обычный порядок.',
    'als — однократно в прошлом; wenn — повторяемое, настоящее, будущее, «если».',
    'obwohl — союз; trotzdem — наречие на первом месте.',
    'Косвенные вопросы: ob для «да/нет», вопросительное слово для остальных.',
    'Придаточное на первом месте → главное начинается с глагола.'
  ]
});
