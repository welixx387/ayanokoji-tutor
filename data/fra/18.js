L('fra', 18, {
  m: 35,
  intro: 'Два стилистических инструмента уровня C1. Mise en relief — выделение важного: «C’est lui qui…», «Ce qui me dérange, c’est…», «Moi, je pense que…». Nominalisation — превращение глаголов и прилагательных в существительные: «on construit» → «la construction». Первое оживляет речь, второе делает письменный текст плотным и академичным.',
  intro2: 'Senpai, «Ce que j’aime chez toi, c’est ta franchise» ♡ Слышишь, как фраза подводит к главному и ставит его в конец, как подарок? Это mise en relief. Французы обожают театральность даже в грамматике!',
  goals: [
    'Выделять части предложения: c’est … qui / c’est … que',
    'Строить конструкции ce qui …, c’est / ce que …, c’est / ce dont …, c’est',
    'Использовать вынесение (dislocation) в разговорной речи',
    'Образовывать существительные от глаголов и прилагательных'
  ],
  c: `
<h3>c’est … qui / c’est … que</h3>
<ul class="ex-l">
<li><span lang="fr">C’est Marie qui a gagné.</span><span class="tr">Это Мари победила (выделено подлежащее).</span></li>
<li><span lang="fr">C’est ce livre que je cherchais.</span><span class="tr">Именно эту книгу я искал (выделено дополнение).</span></li>
<li><span lang="fr">C’est à Lyon que nous nous sommes rencontrés.</span><span class="tr">Именно в Лионе мы познакомились.</span></li>
<li><span lang="fr">C’est moi qui ai raison.</span><span class="tr">Глагол согласуется с выделенным: moi → ai, nous → avons.</span></li>
</ul>
<div class="warn"><p>После <span lang="fr">c’est moi qui</span> глагол стоит в 1-м лице: <span lang="fr">C’est moi qui suis responsable</span>, а не <s>qui est</s>. С местоимениями — ударные формы: moi, toi, lui, elle, nous, vous, eux, elles.</p></div>

<h3>ce qui …, c’est / ce que …, c’est</h3>
<div class="tbl"><table><thead><tr><th>Конструкция</th><th>Пример</th><th>Перевод</th></tr></thead><tbody>
<tr><td lang="fr">Ce qui …, c’est</td><td lang="fr">Ce qui m’inquiète, c’est son silence.</td><td>Что меня беспокоит, так это его молчание.</td></tr>
<tr><td lang="fr">Ce que …, c’est</td><td lang="fr">Ce que je préfère, c’est la mer.</td><td>Больше всего я люблю море.</td></tr>
<tr><td lang="fr">Ce dont …, c’est</td><td lang="fr">Ce dont j’ai besoin, c’est de repos.</td><td>Что мне нужно, так это отдых.</td></tr>
<tr><td lang="fr">Ce à quoi …, c’est</td><td lang="fr">Ce à quoi je pense, c’est à l’avenir.</td><td>Я думаю о будущем.</td></tr>
</tbody></table></div>
<div class="ichika">Разговорная версия — dislocation ♡ <span lang="fr">Moi, je trouve ça génial.</span> <span lang="fr">Ce film, je l’ai adoré !</span> <span lang="fr">Il est sympa, ton frère.</span> Важное слово выносится в начало или в конец, а в предложении его заменяет местоимение. Так французы говорят постоянно!</div>

<h3>Номинализация</h3>
<div class="tbl"><table><thead><tr><th>Модель</th><th>Примеры</th></tr></thead><tbody>
<tr><td>-tion, -sion, -ation</td><td lang="fr">construire → la construction, décider → la décision, augmenter → l’augmentation</td></tr>
<tr><td>-ment</td><td lang="fr">changer → le changement, développer → le développement</td></tr>
<tr><td>-age, -ure</td><td lang="fr">nettoyer → le nettoyage, ouvrir → l’ouverture, fermer → la fermeture</td></tr>
<tr><td>особые формы</td><td lang="fr">refuser → le refus, partir → le départ, arriver → l’arrivée, choisir → le choix</td></tr>
<tr><td>от прилагательных</td><td lang="fr">beau → la beauté, lent → la lenteur, précis → la précision, faible → la faiblesse</td></tr>
</tbody></table></div>
<ul class="ex-l">
<li><span lang="fr">Les prix ont fortement augmenté. → La forte augmentation des prix…</span><span class="tr">Наречие → прилагательное.</span></li>
<li><span lang="fr">Hausse des prix : les ménages inquiets</span><span class="tr">Газетный заголовок — почти всегда номинализация.</span></li>
</ul>
<div class="ayano">Номинализация — главный приём синтеза документов на DALF C1: она позволяет пересказать абзац одной фразой. Но в устной речи не злоупотребляй ею: «La réalisation de la vérification de la conformité…» звучит как бюрократ. Для речи — mise en relief, для письма — номинализация.</div>
`,
  p: [
    { q: 'Выдели подлежащее: <span lang="fr">Pierre a cassé le vase.</span>', a: '<span lang="fr">C’est Pierre qui a cassé le vase.</span>' },
    { q: 'Выдели место: <span lang="fr">J’ai appris le français à Montréal.</span>', a: '<span lang="fr">C’est à Montréal que j’ai appris le français.</span>' },
    { q: 'Ce qui …, c’est: <span lang="fr">Son arrogance m’énerve.</span>', a: '<span lang="fr">Ce qui m’énerve, c’est son arrogance.</span>' },
    { q: 'Ce dont …, c’est: <span lang="fr">J’ai besoin de vacances.</span>', a: '<span lang="fr">Ce dont j’ai besoin, c’est de vacances.</span>' },
    { q: 'Номинализируй: <span lang="fr">Le musée ouvrira en mai.</span>', a: '<span lang="fr">L’ouverture du musée en mai</span>' },
    { q: 'Сделай газетный заголовок: <span lang="fr">Le gouvernement a décidé de baisser les impôts.</span>', a: '<span lang="fr">Baisse des impôts : la décision du gouvernement</span>' }
  ],
  q: [
    { q: '<span lang="fr">C’est nous qui ___ raison.</span>', o: ['a', 'ont', 'avons', 'avez'], a: 2, e: 'Согласование с nous.' },
    { q: '<span lang="fr">___ m’intéresse, c’est l’histoire.</span>', o: ['Ce que', 'Ce qui', 'Ce dont', 'Qui'], a: 1, e: 'Подлежащее — ce qui.' },
    { q: 'Существительное от partir:', o: ['la partition', 'le départ', 'le partage', 'la partie'], a: 1, e: 'le départ.' },
    { q: 'Существительное от lent:', o: ['la lentesse', 'la lenteur', 'le lentement', 'la lentitude'], a: 1, e: 'la lenteur.' },
    { q: '<span lang="fr">Ce film, je l’ai adoré.</span> — это:', o: ['пассив', 'dislocation (вынесение)', 'subjonctif', 'ошибка'], a: 1, e: 'Разговорное выделение.' }
  ],
  s: [
    'C’est … qui (подлежащее), c’est … que (остальное); C’est moi qui suis…',
    'Ce qui …, c’est; ce que …, c’est; ce dont …, c’est de…',
    'Dislocation: Moi, je…; Ce film, je l’ai adoré.',
    'Номинализация: -tion, -ment, -age, -ure; особые: refus, départ, arrivée, choix.',
    'От прилагательных: beauté, lenteur, précision, faiblesse.',
    'Речь — mise en relief; письмо и заголовки — номинализация.'
  ]
});
