L('fra', 13, {
  m: 40,
  intro: 'Косвенная речь — пересказ чужих слов: «Он сказал, что придёт». Во французском, как в английском, действует согласование времён: если глагол «сказал» стоит в прошедшем, времена в придаточном сдвигаются. Плюс меняются местоимения, слова времени и места, а вопросы и приказы перестраиваются. Это обязательная тема B2 и основа для синтеза документов на C1.',
  intro2: 'Senpai, Мари сказала: «Je viendrai demain» ♡ А в пересказе: «Marie a dit qu’elle viendrait le lendemain». Изменились три слова! Французский пересказ — как игра в испорченный телефон, только с чёткими правилами.',
  goals: [
    'Переводить утверждения в косвенную речь',
    'Применять согласование времён после глагола в прошедшем',
    'Менять указатели времени и места: demain → le lendemain',
    'Передавать вопросы и приказы'
  ],
  c: `
<h3>Утверждения</h3>
<p>Если вводящий глагол в настоящем (<span lang="fr">il dit</span>), время не меняется: <span lang="fr">Il dit : « Je suis fatigué. » → Il dit qu’il est fatigué.</span></p>
<div class="rule" data-t="Вводящий глагол в прошедшем → сдвиг времён"><p>Il a dit / Il disait / Il avait dit + que …</p></div>
<div class="tbl"><table><thead><tr><th>Прямая речь</th><th>Косвенная речь (après il a dit que)</th></tr></thead><tbody>
<tr><td>Présent: <span lang="fr">« Je suis malade. »</span></td><td>Imparfait: <span lang="fr">qu’il était malade</span></td></tr>
<tr><td>Passé composé: <span lang="fr">« J’ai fini. »</span></td><td>Plus-que-parfait: <span lang="fr">qu’il avait fini</span></td></tr>
<tr><td>Futur simple: <span lang="fr">« Je viendrai. »</span></td><td>Conditionnel présent: <span lang="fr">qu’il viendrait</span></td></tr>
<tr><td>Futur antérieur: <span lang="fr">« J’aurai fini. »</span></td><td>Conditionnel passé: <span lang="fr">qu’il aurait fini</span></td></tr>
<tr><td>Imparfait, plus-que-parfait, conditionnel</td><td>не меняются</td></tr>
</tbody></table></div>
<div class="ichika">Шаг назад по лестнице времён ♡ Présent → imparfait, passé composé → plus-que-parfait, futur → conditionnel. Как будто всё отодвигается на одну ступеньку в прошлое. А то, что уже на нижних ступеньках, остаётся на месте.</div>

<h3>Указатели времени и места</h3>
<div class="tbl"><table><thead><tr><th>Прямая речь</th><th>Косвенная (в прошлом)</th></tr></thead><tbody>
<tr><td lang="fr">aujourd’hui</td><td lang="fr">ce jour-là</td></tr>
<tr><td lang="fr">hier / demain</td><td lang="fr">la veille / le lendemain</td></tr>
<tr><td lang="fr">la semaine prochaine / dernière</td><td lang="fr">la semaine suivante / précédente</td></tr>
<tr><td lang="fr">maintenant</td><td lang="fr">à ce moment-là</td></tr>
<tr><td lang="fr">ici</td><td lang="fr">là</td></tr>
</tbody></table></div>

<h3>Вопросы и приказы</h3>
<div class="tbl"><table><thead><tr><th>Прямая речь</th><th>Косвенная</th></tr></thead><tbody>
<tr><td lang="fr">« Tu viens ? » / « Est-ce que tu viens ? »</td><td lang="fr">Il m’a demandé si je venais.</td></tr>
<tr><td lang="fr">« Qu’est-ce que tu fais ? »</td><td lang="fr">Il m’a demandé ce que je faisais.</td></tr>
<tr><td lang="fr">« Qu’est-ce qui se passe ? »</td><td lang="fr">Il a demandé ce qui se passait.</td></tr>
<tr><td lang="fr">« Où vas-tu ? »</td><td lang="fr">Il m’a demandé où j’allais.</td></tr>
<tr><td lang="fr">« Ferme la porte ! »</td><td lang="fr">Il m’a dit de fermer la porte.</td></tr>
<tr><td lang="fr">« Ne parle pas ! »</td><td lang="fr">Il m’a dit de ne pas parler.</td></tr>
</tbody></table></div>
<div class="warn"><p>В косвенном вопросе нет инверсии и est-ce que: <span lang="fr">Il m’a demandé où j’allais</span>, а не <s>où allais-je</s>. <span lang="fr">Qu’est-ce que</span> превращается в <span lang="fr">ce que</span>, <span lang="fr">qu’est-ce qui</span> — в <span lang="fr">ce qui</span>.</p></div>

<h3>Глаголы вместо «сказал»</h3>
<p>Чтобы пересказ не был монотонным: <span lang="fr">affirmer, expliquer, ajouter, répondre, préciser, annoncer, avouer, promettre, se demander, prétendre</span>. Они же передают позицию говорящего: <span lang="fr">Il a avoué qu’il avait menti.</span></p>
<div class="ayano">Самая частая ошибка — сдвинуть время, но забыть указатель времени: <s>Elle a dit qu’elle viendrait demain</s> — если «завтра» уже прошло, правильно <span lang="fr">le lendemain</span>. Проверяй пересказ двумя проходами: сначала глаголы, затем слова времени и места.</div>
`,
  p: [
    { q: 'Перескажи: <span lang="fr">Paul a dit : « J’ai faim. »</span>', a: '<span lang="fr">Paul a dit qu’il avait faim.</span>' },
    { q: 'Перескажи: <span lang="fr">Léa a dit : « J’ai perdu mes clés hier. »</span>', a: '<span lang="fr">Léa a dit qu’elle avait perdu ses clés la veille.</span>' },
    { q: 'Перескажи: <span lang="fr">Ils ont dit : « Nous partirons demain. »</span>', a: '<span lang="fr">Ils ont dit qu’ils partiraient le lendemain.</span>' },
    { q: 'Перескажи вопрос: <span lang="fr">Elle m’a demandé : « Tu aimes le jazz ? »</span>', a: '<span lang="fr">Elle m’a demandé si j’aimais le jazz.</span>' },
    { q: 'Перескажи вопрос: <span lang="fr">Il a demandé : « Qu’est-ce que vous voulez ? »</span>', a: '<span lang="fr">Il a demandé ce que nous voulions.</span>' },
    { q: 'Перескажи приказ: <span lang="fr">Le prof nous a dit : « Ouvrez vos livres ! »</span>', a: '<span lang="fr">Le prof nous a dit d’ouvrir nos livres.</span>' }
  ],
  q: [
    { q: '<span lang="fr">« Je viendrai. »</span> → <span lang="fr">Il a dit qu’il ___ .</span>', o: ['viendra', 'viendrait', 'venait', 'vient'], a: 1, e: 'futur → conditionnel.' },
    { q: '<span lang="fr">« J’ai compris. »</span> → <span lang="fr">Elle a dit qu’elle ___ .</span>', o: ['a compris', 'avait compris', 'comprenait', 'comprendrait'], a: 1, e: 'passé composé → plus-que-parfait.' },
    { q: 'demain в пересказе о прошлом:', o: ['demain', 'le lendemain', 'la veille', 'hier'], a: 1, e: 'le lendemain.' },
    { q: '<span lang="fr">« Qu’est-ce qui se passe ? »</span> → <span lang="fr">Il a demandé ___ se passait.</span>', o: ['qu’est-ce qui', 'ce qui', 'ce que', 'que'], a: 1, e: 'ce qui.' },
    { q: 'Приказ в косвенной речи:', o: ['Il m’a dit que je ferme.', 'Il m’a dit de fermer.', 'Il m’a dit fermer.', 'Il m’a dit si je ferme.'], a: 1, e: 'de + инфинитив.' }
  ],
  s: [
    'Вводящий глагол в настоящем — время не меняется.',
    'В прошедшем: présent → imparfait, passé composé → plus-que-parfait, futur → conditionnel.',
    'Imparfait, plus-que-parfait, conditionnel не меняются.',
    'demain → le lendemain, hier → la veille, aujourd’hui → ce jour-là, ici → là.',
    'Вопросы: si, ce que, ce qui, où…; без инверсии.',
    'Приказы: dire de + инфинитив; разнообразь глаголы: affirmer, expliquer, ajouter.'
  ]
});
