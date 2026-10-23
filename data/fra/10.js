L('fra', 10, {
  m: 40,
  intro: 'Самый частый вопрос на B2: subjonctif или indicatif? Ответ зависит от союза и от того, утверждает ли говорящий факт или выражает отношение к нему. В этом уроке — союзы, которые требуют subjonctif, и те, что требуют indicatif, глаголы мнения в утвердительной и отрицательной форме, а также тонкие случаи вроде espérer и après que.',
  intro2: 'Senpai, «Je pense qu’il a raison», но «Je ne pense pas qu’il ait raison» ♡ Одно «не» — и наклонение меняется! Французский очень чувствителен к сомнениям. Сегодня научимся слышать их в грамматике.',
  goals: [
    'Знать союзы с subjonctif: bien que, pour que, avant que, à condition que, sans que',
    'Знать союзы с indicatif: parce que, après que, pendant que, alors que',
    'Выбирать наклонение после глаголов мнения',
    'Различать il est probable и il est possible, espérer и souhaiter'
  ],
  c: `
<h3>Союзы</h3>
<div class="two"><div><h4>+ subjonctif</h4><p lang="fr">bien que, quoique (хотя)</p><p lang="fr">pour que, afin que (чтобы)</p><p lang="fr">avant que (до того как)</p><p lang="fr">à condition que (при условии)</p><p lang="fr">sans que (без того чтобы)</p><p lang="fr">jusqu’à ce que (пока не)</p><p lang="fr">à moins que (если только не)</p></div><div><h4>+ indicatif</h4><p lang="fr">parce que, puisque (потому что, раз)</p><p lang="fr">après que (после того как)</p><p lang="fr">pendant que (пока, в то время как)</p><p lang="fr">alors que, tandis que (тогда как)</p><p lang="fr">depuis que (с тех пор как)</p><p lang="fr">même si (даже если)</p><p lang="fr">si (если)</p></div></div>
<ul class="ex-l">
<li><span lang="fr">Bien qu’il soit fatigué, il continue.</span><span class="tr">Хотя он устал, он продолжает.</span></li>
<li><span lang="fr">Je t’explique pour que tu comprennes.</span><span class="tr">Объясняю, чтобы ты понял.</span></li>
<li><span lang="fr">Rentre avant qu’il (ne) pleuve.</span><span class="tr">Возвращайся до дождя (ne — книжное, без отрицательного смысла).</span></li>
<li><span lang="fr">Après qu’il est parti, nous avons dîné.</span><span class="tr">После того как он ушёл… — по норме indicatif.</span></li>
</ul>
<div class="warn"><p><span lang="fr">après que</span> по правилам требует indicatif — это факт, который уже случился. Многие носители говорят с subjonctif, но на экзамене пиши indicatif. А <span lang="fr">avant que</span> — subjonctif, потому что действие ещё не произошло.</p></div>

<h3>Глаголы мнения</h3>
<div class="tbl"><table><thead><tr><th>Утверждение — indicatif</th><th>Отрицание или вопрос с инверсией — subjonctif</th></tr></thead><tbody>
<tr><td lang="fr">Je pense qu’il a raison.</td><td lang="fr">Je ne pense pas qu’il ait raison.</td></tr>
<tr><td lang="fr">Je crois que c’est vrai.</td><td lang="fr">Crois-tu que ce soit vrai ?</td></tr>
<tr><td lang="fr">Je suis sûr qu’elle viendra.</td><td lang="fr">Je ne suis pas sûr qu’elle vienne.</td></tr>
</tbody></table></div>
<div class="ichika">Логика простая ♡ Когда ты уверен — реальность, indicatif. Когда сомневаешься или отрицаешь — уже не реальность, а мнение, subjonctif. Грамматика как детектор лжи: показывает, насколько ты веришь своим словам!</div>

<h3>Тонкие пары</h3>
<div class="tbl"><table><thead><tr><th>Indicatif</th><th>Subjonctif</th></tr></thead><tbody>
<tr><td lang="fr">Il est probable qu’il viendra.</td><td lang="fr">Il est possible qu’il vienne.</td></tr>
<tr><td lang="fr">J’espère que tu vas bien.</td><td lang="fr">Je souhaite que tu ailles bien.</td></tr>
<tr><td lang="fr">Il me semble que tu as raison.</td><td lang="fr">Il semble que tu aies raison.</td></tr>
<tr><td lang="fr">Je sais qu’il est là.</td><td lang="fr">Je doute qu’il soit là.</td></tr>
</tbody></table></div>
<p>После превосходной степени и <span lang="fr">le seul, l’unique, le premier</span> — обычно subjonctif: <span lang="fr">C’est le meilleur film que j’aie jamais vu.</span></p>
<div class="ayano">Не пытайся запомнить всё сразу. Для письма B2 достаточно уверенно знать пять союзов с subjonctif (bien que, pour que, avant que, à condition que, sans que) и правило глаголов мнения. Используй хотя бы два из них в каждом эссе — экзаменаторы специально ищут subjonctif как признак уровня.</div>
`,
  p: [
    { q: 'Выбери наклонение: <span lang="fr">Bien qu’il (faire) froid, nous sortons.</span>', a: '<span lang="fr">Bien qu’il fasse froid</span>' },
    { q: 'Выбери: <span lang="fr">Je reste parce que je (vouloir) t’aider.</span>', a: '<span lang="fr">parce que je veux</span> — indicatif.' },
    { q: 'Выбери: <span lang="fr">Je te prête mon vélo à condition que tu me le (rendre) demain.</span>', a: '<span lang="fr">que tu me le rendes</span>' },
    { q: 'Отрицание: <span lang="fr">Je crois qu’elle est malade.</span> → «Не думаю, что…»', a: '<span lang="fr">Je ne crois pas qu’elle soit malade.</span>' },
    { q: 'Выбери: <span lang="fr">J’espère que tu (pouvoir) venir.</span>', a: '<span lang="fr">que tu pourras / que tu peux venir</span> — espérer + indicatif.' },
    { q: 'Выбери: <span lang="fr">C’est la seule personne qui me (comprendre).</span>', a: '<span lang="fr">qui me comprenne</span>' }
  ],
  q: [
    { q: '<span lang="fr">Pour que tu ___ , je vais répéter.</span>', o: ['comprends', 'comprennes', 'comprendras', 'comprendrais'], a: 1, e: 'pour que + subjonctif.' },
    { q: '<span lang="fr">Pendant que tu ___ , je prépare le dîner.</span>', o: ['travailles', 'travaillais — единственный вариант', 'travaillerais', 'travaillasses'], a: 0, e: 'pendant que + indicatif.' },
    { q: '<span lang="fr">Je ne suis pas sûr qu’il ___ raison.</span>', o: ['a', 'ait', 'aura', 'avait'], a: 1, e: 'Сомнение.' },
    { q: '<span lang="fr">Il est probable qu’elle ___ en retard.</span>', o: ['soit', 'sera', 'soyez', 'serait — обязательно'], a: 1, e: 'probable — indicatif.' },
    { q: 'По норме после <span lang="fr">après que</span>:', o: ['subjonctif', 'indicatif', 'infinitif', 'conditionnel'], a: 1, e: 'Факт — indicatif.' }
  ],
  s: [
    '+ subjonctif: bien que, pour que, avant que, à condition que, sans que, jusqu’à ce que, à moins que.',
    '+ indicatif: parce que, puisque, après que, pendant que, alors que, même si, si.',
    'Je pense que + indicatif; Je ne pense pas que + subjonctif.',
    'probable — indicatif, possible — subjonctif.',
    'espérer + indicatif, souhaiter + subjonctif.',
    'Превосходная степень, le seul, le premier — обычно subjonctif.'
  ]
});
