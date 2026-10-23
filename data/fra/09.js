L('fra', 9, {
  m: 45,
  intro: 'Начинаем уровень B2. Subjonctif — наклонение субъективного: желания, необходимости, эмоций, сомнений. «Il faut que tu viennes», «Je veux qu’il parte», «Je suis content que tu sois là». В русском похожий смысл передаётся словом «чтобы», но во французском subjonctif используется гораздо шире. Без него невозможен уровень B2.',
  intro2: 'Senpai, «Il faut que tu saches…» — и сразу понятно, что сейчас будет что-то важное ♡ Subjonctif — это наклонение чувств. Им говорят «я хочу», «мне жаль», «нужно, чтобы». Очень эмоциональное наклонение, мне подходит!',
  goals: [
    'Образовывать subjonctif présent правильных и неправильных глаголов',
    'Использовать subjonctif после выражений необходимости и желания',
    'Использовать subjonctif после выражений эмоций и сомнения',
    'Заменять subjonctif инфинитивом при одном подлежащем'
  ],
  c: `
<h3>Образование</h3>
<div class="rule" data-t="основа ils (présent) без -ent + -e, -es, -e, -ions, -iez, -ent"><p>ils parlent → que je parle; ils finissent → que je finisse; ils prennent → que je prenne. Для nous и vous основа берётся от nous: que nous prenions, que vous preniez.</p></div>
<div class="tbl"><table><thead><tr><th>Глагол</th><th>que je / tu / il</th><th>que nous / vous</th><th>qu’ils</th></tr></thead><tbody>
<tr><td lang="fr">être</td><td lang="fr">sois, sois, soit</td><td lang="fr">soyons, soyez</td><td lang="fr">soient</td></tr>
<tr><td lang="fr">avoir</td><td lang="fr">aie, aies, ait</td><td lang="fr">ayons, ayez</td><td lang="fr">aient</td></tr>
<tr><td lang="fr">aller</td><td lang="fr">aille, ailles, aille</td><td lang="fr">allions, alliez</td><td lang="fr">aillent</td></tr>
<tr><td lang="fr">faire</td><td lang="fr">fasse</td><td lang="fr">fassions, fassiez</td><td lang="fr">fassent</td></tr>
<tr><td lang="fr">pouvoir</td><td lang="fr">puisse</td><td lang="fr">puissions, puissiez</td><td lang="fr">puissent</td></tr>
<tr><td lang="fr">savoir</td><td lang="fr">sache</td><td lang="fr">sachions, sachiez</td><td lang="fr">sachent</td></tr>
<tr><td lang="fr">vouloir</td><td lang="fr">veuille</td><td lang="fr">voulions, vouliez</td><td lang="fr">veuillent</td></tr>
<tr><td lang="fr">venir</td><td lang="fr">vienne</td><td lang="fr">venions, veniez</td><td lang="fr">viennent</td></tr>
</tbody></table></div>

<h3>Когда нужен subjonctif</h3>
<div class="tbl"><table><thead><tr><th>Группа</th><th>Выражения</th><th>Пример</th></tr></thead><tbody>
<tr><td>Необходимость</td><td lang="fr">il faut que, il est nécessaire que, il est important que</td><td lang="fr">Il faut que tu fasses tes devoirs.</td></tr>
<tr><td>Желание, воля</td><td lang="fr">vouloir que, souhaiter que, exiger que, préférer que</td><td lang="fr">Je veux que vous soyez à l’heure.</td></tr>
<tr><td>Эмоции</td><td lang="fr">être content / triste / surpris que, avoir peur que, regretter que</td><td lang="fr">Je suis contente que tu sois là.</td></tr>
<tr><td>Сомнение, возможность</td><td lang="fr">douter que, il est possible que, il se peut que</td><td lang="fr">Il est possible qu’il pleuve.</td></tr>
<tr><td>Оценка</td><td lang="fr">c’est dommage que, il vaut mieux que, il est normal que</td><td lang="fr">C’est dommage qu’elle ne puisse pas venir.</td></tr>
</tbody></table></div>
<div class="ichika">Запоминалка ♡ Subjonctif появляется там, где есть «хочу», «надо», «чувствую» или «не уверен». Это всё субъективное — то, что творится в голове, а не в реальности. Отсюда и название: subjonctif — субъективный!</div>

<h3>Одно подлежащее — инфинитив</h3>
<div class="two"><div><h4>Разные подлежащие → subjonctif</h4><p lang="fr">Je veux que tu partes.</p><p>Я хочу, чтобы ты уехал.</p></div><div><h4>Одно подлежащее → инфинитив</h4><p lang="fr">Je veux partir.</p><p>Я хочу уехать.</p></div></div>
<p>С эмоциями — <span lang="fr">de</span> + инфинитив: <span lang="fr">Je suis content de te voir</span> (я рад тебя видеть), но <span lang="fr">Je suis content que tu sois venu</span>.</p>
<div class="warn"><p>Неверно: <s>Je veux que je parte.</s> Если подлежащее одно, subjonctif не используется. И не забудь que перед формой: subjonctif всегда стоит в придаточном после que.</p></div>
<div class="ayano">Выучи наизусть пять фраз-якорей: <span lang="fr">il faut que je fasse, je veux que tu viennes, je suis content que tu sois là, il est possible qu’il ait raison, bien qu’il pleuve</span>. В них неправильные формы и все главные триггеры. Когда сомневаешься, подставляй новый глагол в знакомую фразу.</div>
`,
  p: [
    { q: 'Subjonctif: <span lang="fr">Il faut que nous (partir) tôt.</span>', a: '<span lang="fr">que nous partions</span>' },
    { q: 'Subjonctif: <span lang="fr">Je veux que tu (être) honnête.</span>', a: '<span lang="fr">que tu sois</span>' },
    { q: 'Subjonctif: <span lang="fr">Ma mère souhaite que j’(aller) à l’université.</span>', a: '<span lang="fr">que j’aille</span>' },
    { q: 'Subjonctif: <span lang="fr">C’est dommage qu’il ne (pouvoir) pas venir.</span>', a: '<span lang="fr">qu’il ne puisse pas venir</span>' },
    { q: 'Инфинитив или subjonctif: «Я хочу выучить французский» / «Я хочу, чтобы ты выучил французский».', a: '<span lang="fr">Je veux apprendre le français.</span> / <span lang="fr">Je veux que tu apprennes le français.</span>' },
    { q: 'Переведи: «Я рада, что ты сдал экзамен».', a: '<span lang="fr">Je suis contente que tu aies réussi l’examen.</span> (subjonctif passé = que + aie/sois + причастие)' }
  ],
  q: [
    { q: 'Subjonctif от faire (je):', o: ['que je fais', 'que je fasse', 'que je ferais', 'que je faisse'], a: 1, e: 'fasse.' },
    { q: '<span lang="fr">Il faut que vous ___ patients.</span>', o: ['êtes', 'soyez', 'seriez', 'serez'], a: 1, e: 'soyez.' },
    { q: '<span lang="fr">Je veux ___ .</span> (я хочу уйти)', o: ['que je parte', 'partir', 'que je pars', 'de partir'], a: 1, e: 'Одно подлежащее — инфинитив.' },
    { q: 'После какого выражения subjonctif?', o: ['je sais que', 'il est sûr que', 'il est possible que', 'je pense que'], a: 2, e: 'Возможность.' },
    { q: 'Subjonctif от savoir (il):', o: ['qu’il sait', 'qu’il sache', 'qu’il saura', 'qu’il savait'], a: 1, e: 'sache.' }
  ],
  s: [
    'Subjonctif: основа ils + -e, -es, -e, -ions, -iez, -ent.',
    'Неправильные: sois, aie, aille, fasse, puisse, sache, veuille, vienne.',
    'Триггеры: необходимость, желание, эмоции, сомнение, оценка.',
    'Il faut que…, Je veux que…, Je suis content que…, Il est possible que…',
    'Одно подлежащее → инфинитив: Je veux partir; content de + инфинитив.',
    'Subjonctif всегда после que в придаточном.'
  ]
});
