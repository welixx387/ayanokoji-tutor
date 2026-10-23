L('fra', 20, {
  m: 40,
  intro: 'Во французском разница между регистрами огромна: разговорный язык улиц, нейтральный язык СМИ и высокий книжный стиль иногда кажутся разными языками. На C1 нужно понимать все три и выбирать нужный. В этом уроке — признаки каждого регистра, сокращения и верлан, синонимы по уровням и три способа задать вопрос.',
  intro2: 'Senpai, «T’as vu la meuf ? Elle est trop relou !» — это французский, честное слово ♡ Здесь и сокращения, и верлан — слова наоборот. Сегодня научимся понимать подростков в Париже и не звучать как они на собеседовании!',
  goals: [
    'Различать familier, courant и soutenu',
    'Понимать разговорные сокращения и верлан',
    'Подбирать синонимы под регистр',
    'Задавать вопросы в трёх регистрах'
  ],
  c: `
<h3>Три регистра</h3>
<div class="tbl"><table><thead><tr><th>Familier</th><th>Courant</th><th>Soutenu</th></tr></thead><tbody>
<tr><td lang="fr">la bagnole</td><td lang="fr">la voiture</td><td lang="fr">l’automobile</td></tr>
<tr><td lang="fr">le boulot</td><td lang="fr">le travail</td><td lang="fr">l’emploi, la profession</td></tr>
<tr><td lang="fr">bouffer</td><td lang="fr">manger</td><td lang="fr">se restaurer</td></tr>
<tr><td lang="fr">le fric</td><td lang="fr">l’argent</td><td lang="fr">les fonds</td></tr>
<tr><td lang="fr">un mec / une meuf</td><td lang="fr">un homme / une femme</td><td lang="fr">un monsieur / une dame</td></tr>
<tr><td lang="fr">se barrer</td><td lang="fr">partir</td><td lang="fr">se retirer, s’en aller</td></tr>
<tr><td lang="fr">J’en ai marre.</td><td lang="fr">J’en ai assez.</td><td lang="fr">Je suis las de cela.</td></tr>
</tbody></table></div>

<h3>Признаки разговорной речи</h3>
<ul class="ex-l">
<li><span lang="fr">Je sais pas. C’est pas grave.</span><span class="tr">Пропуск ne в отрицании.</span></li>
<li><span lang="fr">T’as vu ? Y a personne.</span><span class="tr">tu as → t’as, il y a → y a.</span></li>
<li><span lang="fr">Ouais, c’est cool, ça.</span><span class="tr">ouais, ça, cool.</span></li>
<li><span lang="fr">le resto, le ciné, le prof, l’appart, l’ado, sympa</span><span class="tr">Сокращения (apocope).</span></li>
<li><span lang="fr">une meuf (femme), relou (lourd), chelou (louche), ouf (fou)</span><span class="tr">Верлан — слоги наоборот.</span></li>
</ul>
<div class="ichika">Верлан — сам по себе верлан от «l’envers» (наоборот) ♡ Самые известные слова — <span lang="fr">meuf</span> (женщина), <span lang="fr">relou</span> (надоедливый), <span lang="fr">ouf</span> (безумный). Понимать нужно, использовать — только с друзьями. На экзамене — никогда!</div>

<h3>Вопрос в трёх регистрах</h3>
<div class="tbl"><table><thead><tr><th>Регистр</th><th>Пример</th></tr></thead><tbody>
<tr><td>Familier — интонация</td><td lang="fr">Tu viens ? Tu fais quoi ?</td></tr>
<tr><td>Courant — est-ce que</td><td lang="fr">Est-ce que tu viens ? Qu’est-ce que tu fais ?</td></tr>
<tr><td>Soutenu — инверсия</td><td lang="fr">Viens-tu ? Que fais-tu ? Puis-je entrer ?</td></tr>
</tbody></table></div>

<h3>Признаки высокого стиля</h3>
<ul class="ex-l">
<li><span lang="fr">Je ne saurais vous dire.</span><span class="tr">Не могу знать (savoir в conditionnel вместо pouvoir).</span></li>
<li><span lang="fr">Il n’a guère d’amis.</span><span class="tr">У него почти нет друзей (ne … guère).</span></li>
<li><span lang="fr">Je ne sais si …, Je n’ose le dire.</span><span class="tr">Отрицание без pas с savoir, oser, pouvoir.</span></li>
<li><span lang="fr">demeurer (rester), s’enquérir de (se renseigner), auprès de (chez)</span><span class="tr">Книжные синонимы.</span></li>
</ul>
<div class="warn"><p>Смешение регистров — самая заметная ошибка на C1. В официальном письме одно слово <span lang="fr">boulot</span> или <span lang="fr">ça</span> снижает оценку. Но и в разговоре с друзьями <span lang="fr">Puis-je …</span> прозвучит странно. Регистр должен быть единым внутри текста.</p></div>
<div class="ayano">Чтобы чувствовать регистр, слушай разные источники: подкасты для молодёжи, новости France Info, литературные передачи France Culture. Записывай одну мысль в трёх вариантах. Цель C1 — не говорить «красиво», а говорить уместно: точно попадать в ситуацию.</div>
`,
  p: [
    { q: 'Переведи в courant: <span lang="fr">J’ai pas de fric pour la bagnole.</span>', a: '<span lang="fr">Je n’ai pas d’argent pour la voiture.</span>' },
    { q: 'Переведи в familier: <span lang="fr">Il n’y a personne.</span>', a: '<span lang="fr">Y a personne.</span>' },
    { q: 'Расшифруй верлан: <span lang="fr">C’est chelou.</span>', a: '<span lang="fr">C’est louche.</span> — Это подозрительно / странно.' },
    { q: 'Задай вопрос «Где ты живёшь?» в трёх регистрах.', a: '<span lang="fr">Tu habites où ?</span> / <span lang="fr">Où est-ce que tu habites ?</span> / <span lang="fr">Où habites-tu ?</span>' },
    { q: 'Переведи в soutenu: <span lang="fr">Je ne peux pas vous le dire.</span>', a: '<span lang="fr">Je ne saurais vous le dire.</span>' },
    { q: 'Подбери формальный синоним: <span lang="fr">le boulot</span>.', a: '<span lang="fr">le travail, l’emploi</span>' }
  ],
  q: [
    { q: 'Регистр <span lang="fr">bouffer</span>:', o: ['soutenu', 'courant', 'familier', 'научный'], a: 2, e: 'Разговорно-грубоватое.' },
    { q: '<span lang="fr">relou</span> — верлан от:', o: ['lourd', 'loup', 'roulé', 'lourdeur'], a: 0, e: 'lourd → relou.' },
    { q: 'Вопрос в высоком стиле:', o: ['Tu viens ?', 'Est-ce que tu viens ?', 'Viens-tu ?', 'Tu viens ou quoi ?'], a: 2, e: 'Инверсия.' },
    { q: '<span lang="fr">Il n’a guère d’argent.</span>', o: ['У него много денег.', 'У него почти нет денег.', 'У него нет денег совсем.', 'У него было много денег.'], a: 1, e: 'ne … guère = едва, почти не.' },
    { q: 'Главная ошибка регистра на C1:', o: ['слишком много связок', 'смешение регистров в одном тексте', 'subjonctif', 'длинные предложения'], a: 1, e: 'Регистр должен быть единым.' }
  ],
  s: [
    'Familier: bagnole, boulot, fric, mec; courant: voiture, travail, argent; soutenu: automobile, emploi, fonds.',
    'Разговорные признаки: пропуск ne, t’as, y a, ouais, ça, сокращения (resto, prof).',
    'Верлан: meuf, relou, chelou, ouf — понимать, но не на экзамене.',
    'Вопрос: интонация (familier), est-ce que (courant), инверсия (soutenu).',
    'Soutenu: ne … guère, je ne saurais, demeurer, auprès de.',
    'Регистр единый внутри текста.'
  ]
});
