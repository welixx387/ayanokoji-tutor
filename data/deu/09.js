L('deu', 9, {
  m: 40,
  intro: 'Начинаем уровень B2. Относительные придаточные — «который», «чей», «где» — позволяют описывать людей и предметы одним точным предложением. В немецком относительное местоимение согласуется в роде и числе со словом, к которому относится, а падеж берёт из своего придаточного. Это ключ к сложным текстам и к письму уровня B2.',
  intro2: 'Senpai, «der Mann, dem ich geholfen habe» — тот, которому я помогла ♡ Местоимение смотрит в две стороны: род берёт у мужчины, падеж — у глагола helfen. Двуличное, но полезное!',
  goals: [
    'Склонять относительные местоимения, включая dessen, deren, denen',
    'Выбирать падеж местоимения по его роли в придаточном',
    'Использовать предлоги перед относительным местоимением',
    'Употреблять was, wo и wo(r)- + предлог как относительные слова'
  ],
  c: `
<h3>Формы относительного местоимения</h3>
<div class="tbl"><table><thead><tr><th></th><th>мужской</th><th>женский</th><th>средний</th><th>множ.</th></tr></thead><tbody>
<tr><td>Nom</td><td lang="de">der</td><td lang="de">die</td><td lang="de">das</td><td lang="de">die</td></tr>
<tr><td>Akk</td><td lang="de">den</td><td lang="de">die</td><td lang="de">das</td><td lang="de">die</td></tr>
<tr><td>Dat</td><td lang="de">dem</td><td lang="de">der</td><td lang="de">dem</td><td lang="de"><b>denen</b></td></tr>
<tr><td>Gen</td><td lang="de"><b>dessen</b></td><td lang="de"><b>deren</b></td><td lang="de"><b>dessen</b></td><td lang="de"><b>deren</b></td></tr>
</tbody></table></div>
<p>Почти как определённый артикль — отличаются только выделенные формы. Глагол в придаточном стоит в конце, придаточное отделяется запятыми.</p>

<h3>Как выбрать форму</h3>
<div class="rule" data-t="Род и число — от главного слова, падеж — от придаточного"><p>Спроси: какую роль местоимение играет внутри своего придаточного?</p></div>
<ul class="ex-l">
<li><span lang="de">Das ist der Mann, der neben mir wohnt.</span><span class="tr">Подлежащее → Nom.</span></li>
<li><span lang="de">Das ist der Mann, den ich gestern gesehen habe.</span><span class="tr">sehen + Akk → den.</span></li>
<li><span lang="de">Das ist der Mann, dem ich geholfen habe.</span><span class="tr">helfen + Dat → dem.</span></li>
<li><span lang="de">Das ist der Mann, dessen Auto gestohlen wurde.</span><span class="tr">Чей → dessen.</span></li>
<li><span lang="de">Das sind die Kinder, denen ich Deutsch beibringe.</span><span class="tr">Dat множ. → denen.</span></li>
<li><span lang="de">Die Frau, deren Sohn hier studiert, ist Ärztin.</span><span class="tr">Женщина, чей сын… → deren.</span></li>
</ul>
<div class="ichika">После dessen и deren следующее слово идёт без артикля ♡ <span lang="de">der Mann, dessen Auto…</span>, а не <s>dessen das Auto</s>. Dessen уже сам работает как артикль!</div>

<h3>С предлогами</h3>
<ul class="ex-l">
<li><span lang="de">Das ist die Freundin, mit der ich in Urlaub fahre.</span><span class="tr">mit + Dat → der.</span></li>
<li><span lang="de">Das ist das Thema, über das wir gesprochen haben.</span><span class="tr">sprechen über + Akk → das.</span></li>
<li><span lang="de">Die Stadt, in der ich wohne, ist klein. = Die Stadt, wo ich wohne, …</span><span class="tr">Для мест можно wo.</span></li>
</ul>
<div class="warn"><p>Предлог всегда стоит перед местоимением, в начале придаточного: <span lang="de">…, mit der ich spreche</span>. Нельзя: <s>…, die ich mit spreche</s>, как в английском «the girl I speak with».</p></div>

<h3>was, wo и wor-</h3>
<div class="tbl"><table><thead><tr><th>После</th><th>Относительное слово</th><th>Пример</th></tr></thead><tbody>
<tr><td lang="de">alles, nichts, etwas, vieles, das</td><td lang="de">was</td><td lang="de">Das ist alles, was ich weiß.</td></tr>
<tr><td>превосходной степени в ср. роде</td><td lang="de">was</td><td lang="de">Das ist das Beste, was ich je gegessen habe.</td></tr>
<tr><td>всего предыдущего предложения</td><td lang="de">was</td><td lang="de">Er hat die Prüfung bestanden, was mich sehr freut.</td></tr>
<tr><td>was + глагол с предлогом</td><td lang="de">wo(r) + предлог</td><td lang="de">Es gibt nichts, worüber ich mich mehr freue.</td></tr>
<tr><td>названий городов и стран</td><td lang="de">wo</td><td lang="de">Berlin, wo ich studiert habe, …</td></tr>
</tbody></table></div>
<div class="ayano">Когда пишешь сложное предложение, проверяй относительное местоимение тремя вопросами: к какому слову оно относится (род, число), какая у него роль в придаточном (падеж), есть ли предлог. Три вопроса — три секунды, но они ловят почти все ошибки. На экзамене B2 именно эти ошибки снижают оценку за грамматику.</div>
`,
  p: [
    { q: 'Соедини: <span lang="de">Ich habe einen Freund. Der Freund spricht fünf Sprachen.</span>', a: '<span lang="de">Ich habe einen Freund, der fünf Sprachen spricht.</span>' },
    { q: 'Соедини: <span lang="de">Das ist das Buch. Ich habe dir das Buch empfohlen.</span>', a: '<span lang="de">Das ist das Buch, das ich dir empfohlen habe.</span>' },
    { q: 'Соедини: <span lang="de">Die Kollegen sind nett. Ich arbeite mit den Kollegen.</span>', a: '<span lang="de">Die Kollegen, mit denen ich arbeite, sind nett.</span>' },
    { q: 'Соедини: <span lang="de">Das ist die Lehrerin. Ihre Tochter ist in meiner Klasse.</span>', a: '<span lang="de">Das ist die Lehrerin, deren Tochter in meiner Klasse ist.</span>' },
    { q: 'Вставь: <span lang="de">Das ist alles, ___ ich brauche.</span>', a: '<span lang="de">was</span>' },
    { q: 'Вставь: <span lang="de">Das ist etwas, ___ ich mich sehr interessiere.</span> (sich interessieren für)', a: '<span lang="de">wofür</span>' }
  ],
  q: [
    { q: '<span lang="de">Der Film, ___ wir gesehen haben, war spannend.</span>', o: ['der', 'den', 'dem', 'dessen'], a: 1, e: 'sehen + Akk.' },
    { q: '<span lang="de">Die Leute, ___ ich geholfen habe, …</span>', o: ['die', 'denen', 'deren', 'den'], a: 1, e: 'Dat множ.' },
    { q: '<span lang="de">Der Schüler, ___ Eltern hier sind, …</span>', o: ['der', 'dessen', 'deren', 'dem'], a: 1, e: 'Чей, мужской род.' },
    { q: '<span lang="de">Das ist das Schönste, ___ ich je gesehen habe.</span>', o: ['das', 'was', 'wo', 'dem'], a: 1, e: 'После превосходной степени.' },
    { q: '<span lang="de">Die Firma, für ___ ich arbeite, …</span>', o: ['die', 'der', 'den', 'deren'], a: 0, e: 'für + Akk, женский.' }
  ],
  s: [
    'Относительные местоимения = артикль, кроме denen (Dat мн.) и dessen/deren (Gen).',
    'Род и число — от главного слова, падеж — от роли в придаточном.',
    'После dessen/deren — без артикля.',
    'Предлог — перед местоимением в начале придаточного.',
    'was — после alles, nichts, etwas, das, превосходной степени, всей фразы.',
    'wo(r) + предлог вместо was с глаголом с предлогом; wo — для мест.'
  ]
});
