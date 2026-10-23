L('fra', 22, {
  m: 40,
  intro: 'На C1 ошибки прячутся в словах, похожих на знакомые: французские «ложные друзья» английского и русского, паронимы — пары почти одинаковых слов с разным смыслом, и омофоны, которые звучат одинаково, но пишутся по-разному. Этот урок — карта ловушек, на которых теряют баллы даже сильные студенты.',
  intro2: 'Senpai, «la librairie» — это не библиотека, а книжный магазин! ♡ А «actuellement» — не «на самом деле», а «в настоящее время». Французский расставил ловушки специально для тех, кто знает английский. Сейчас я их все обезврежу!',
  goals: [
    'Не попадаться на ложных друзей из английского и русского',
    'Различать паронимы: amener / emmener, éminent / imminent',
    'Не путать омофоны: a / à, ou / où, ces / ses / c’est / s’est',
    'Выработать привычку проверять слова в толковом словаре'
  ],
  c: `
<h3>Ложные друзья</h3>
<div class="tbl"><table><thead><tr><th>Слово</th><th>Значит</th><th>Не путать с</th></tr></thead><tbody>
<tr><td lang="fr">actuellement</td><td>в настоящее время</td><td>«на самом деле» — en fait, en réalité</td></tr>
<tr><td lang="fr">éventuellement</td><td>возможно, при случае</td><td>«в конце концов» — finalement</td></tr>
<tr><td lang="fr">la librairie</td><td>книжный магазин</td><td>библиотека — la bibliothèque</td></tr>
<tr><td lang="fr">la lecture</td><td>чтение</td><td>лекция — le cours magistral, la conférence</td></tr>
<tr><td lang="fr">sensible</td><td>чувствительный</td><td>разумный — raisonnable, sensé</td></tr>
<tr><td lang="fr">assister à</td><td>присутствовать на</td><td>помогать — aider</td></tr>
<tr><td lang="fr">la location</td><td>аренда</td><td>место — le lieu, l’endroit</td></tr>
<tr><td lang="fr">le journal</td><td>газета</td><td>журнал — le magazine, la revue</td></tr>
<tr><td lang="fr">la figure</td><td>лицо</td><td>фигура (тело) — la silhouette</td></tr>
<tr><td lang="fr">prétendre</td><td>утверждать</td><td>претендовать — revendiquer, prétendre à</td></tr>
</tbody></table></div>

<h3>Паронимы</h3>
<div class="tbl"><table><thead><tr><th>Пара</th><th>Разница</th></tr></thead><tbody>
<tr><td lang="fr">amener / emmener</td><td>привести кого-то сюда / увести кого-то с собой</td></tr>
<tr><td lang="fr">apporter / emporter</td><td>принести что-то сюда / унести с собой (à emporter — навынос)</td></tr>
<tr><td lang="fr">éminent / imminent</td><td>выдающийся / неминуемый</td></tr>
<tr><td lang="fr">conjecture / conjoncture</td><td>предположение / конъюнктура, обстановка</td></tr>
<tr><td lang="fr">infraction / effraction</td><td>нарушение закона / взлом</td></tr>
<tr><td lang="fr">original / originel</td><td>оригинальный, необычный / изначальный</td></tr>
<tr><td lang="fr">recouvrer / recouvrir</td><td>вернуть себе (здоровье) / покрыть</td></tr>
</tbody></table></div>
<div class="ichika">Для amener и emmener — смотри на приставку ♡ <span lang="fr">a-</span> = к сюда, <span lang="fr">em-</span> = прочь отсюда. <span lang="fr">J’emmène mon chien en vacances</span> — беру собаку с собой. А с вещами — <span lang="fr">apporter / emporter</span>. Пицца навынос — <span lang="fr">pizza à emporter</span>!</div>

<h3>Омофоны</h3>
<div class="tbl"><table><thead><tr><th>Пара</th><th>Проверка</th></tr></thead><tbody>
<tr><td lang="fr">a / à</td><td>a = avait можно подставить (глагол avoir); à — предлог</td></tr>
<tr><td lang="fr">ou / où</td><td>ou = ou bien (или); où — где, куда</td></tr>
<tr><td lang="fr">et / est</td><td>et = et puis (и); est = était (глагол)</td></tr>
<tr><td lang="fr">ces / ses / c’est / s’est</td><td>ces — эти; ses — его/её (мн.); c’est — это есть; s’est — возвратный глагол</td></tr>
<tr><td lang="fr">son / sont</td><td>son — его/её; sont = étaient</td></tr>
<tr><td lang="fr">quand / quant à / qu’en</td><td>когда / что касается / que + en</td></tr>
<tr><td>-é / -er</td><td>подставь vendu / vendre: <span lang="fr">Il a mangé</span> (vendu) / <span lang="fr">Il va manger</span> (vendre)</td></tr>
</tbody></table></div>
<div class="warn"><p>Ошибки -é / -er — самые частые во французских текстах, даже у носителей. После предлога и модального глагола — инфинитив -er: <span lang="fr">pour manger, je veux manger</span>. После avoir/être — причастие -é: <span lang="fr">j’ai mangé</span>.</p></div>
<div class="ayano">Для C1 нужен толковый словарь, а не только двуязычный. Le Robert и Larousse онлайн показывают значения, примеры и синонимы на французском. Если сомневаешься в слове — открой толковую статью и прочитай два примера. Двуязычный словарь даст перевод, а толковый — понимание.</div>
`,
  p: [
    { q: 'Переведи: «Сейчас я работаю в Лионе».', a: '<span lang="fr">Actuellement, je travaille à Lyon.</span>' },
    { q: 'Переведи: «Я иду в библиотеку, а потом в книжный магазин».', a: '<span lang="fr">Je vais à la bibliothèque, puis à la librairie.</span>' },
    { q: 'amener или emmener: «Я отвожу детей в школу».', a: '<span lang="fr">J’emmène les enfants à l’école.</span>' },
    { q: 'Вставь: <span lang="fr">Il ___ parti ___ Paris.</span> (a/à, est/et)', a: '<span lang="fr">Il est parti à Paris.</span>' },
    { q: 'Вставь: <span lang="fr">Elle ___ levée tôt ; ___ amis dormaient encore.</span> (s’est/c’est, ses/ces)', a: '<span lang="fr">Elle s’est levée tôt ; ses amis dormaient encore.</span>' },
    { q: 'Вставь -é или -er: <span lang="fr">Je dois termin___ ce projet que j’ai commenc___ hier.</span>', a: '<span lang="fr">terminer</span>, <span lang="fr">commencé</span>' }
  ],
  q: [
    { q: '<span lang="fr">éventuellement</span> значит:', o: ['в конце концов', 'возможно, при случае', 'постоянно', 'немедленно'], a: 1, e: 'Ложный друг.' },
    { q: '«Присутствовать на лекции»:', o: ['aider à la lecture', 'assister à la conférence', 'assister la lecture', 'lire la conférence'], a: 1, e: 'assister à.' },
    { q: '«Неминуемый»:', o: ['éminent', 'imminent', 'immanent', 'émérite'], a: 1, e: 'imminent.' },
    { q: '<span lang="fr">Tu veux du thé ___ du café ?</span>', o: ['où', 'ou', 'oú', 'au'], a: 1, e: 'Или.' },
    { q: '<span lang="fr">Il faut ___ ce travail.</span>', o: ['terminé', 'terminer', 'terminez', 'terminés'], a: 1, e: 'После il faut — инфинитив.' }
  ],
  s: [
    'Ложные друзья: actuellement, éventuellement, librairie, lecture, sensible, assister à, location.',
    'amener/emmener (люди), apporter/emporter (вещи): a- сюда, em- прочь.',
    'Паронимы: éminent/imminent, infraction/effraction, original/originel.',
    'Омофоны: a/à, ou/où, et/est, ces/ses/c’est/s’est, son/sont.',
    '-é/-er: подставь vendu/vendre.',
    'Толковый словарь (Le Robert, Larousse) — инструмент C1.'
  ]
});
