L('fra', 19, {
  m: 35,
  intro: 'На C1 мнение должно быть точным по степени уверенности: не «это так», а «по-видимому», «вероятно», «нельзя исключать». Это называется модализацией. Во французском для неё есть наклонения (conditionnel, subjonctif), глаголы (sembler, paraître, s’avérer), наречия и безличные обороты. Плюс знаменитая ловушка: sans doute значит «вероятно», а не «без сомнения».',
  intro2: 'Senpai, «Il viendra sans doute» — это не «он точно придёт», а «он, наверное, придёт» ♡ Французы даже в сомнениях хитрят! Сегодня научимся тонко дозировать уверенность, как настоящие интеллектуалы.',
  goals: [
    'Выражать разные степени уверенности',
    'Выбирать наклонение после выражений вероятности',
    'Использовать глаголы sembler, paraître, s’avérer',
    'Нюансировать мнение: certes, toutefois, il n’en reste pas moins que'
  ],
  c: `
<h3>Шкала уверенности</h3>
<div class="tbl"><table><thead><tr><th>Уверенность</th><th>Выражения</th><th>Наклонение</th></tr></thead><tbody>
<tr><td>Очень высокая</td><td lang="fr">il est certain que, sans aucun doute, il est évident que</td><td>indicatif</td></tr>
<tr><td>Высокая</td><td lang="fr">il est probable que, sans doute, probablement</td><td>indicatif</td></tr>
<tr><td>Средняя</td><td lang="fr">il est possible que, il se peut que, peut-être</td><td>subjonctif (после que)</td></tr>
<tr><td>Низкая</td><td lang="fr">il est peu probable que, il est douteux que</td><td>subjonctif</td></tr>
<tr><td>Отрицание</td><td lang="fr">il est exclu que, il est impossible que</td><td>subjonctif</td></tr>
</tbody></table></div>
<div class="warn"><p><span lang="fr">sans doute</span> = вероятно. <span lang="fr">sans aucun doute</span> = несомненно. А <span lang="fr">peut-être</span> и <span lang="fr">sans doute</span> в начале фразы требуют инверсии в книжном стиле: <span lang="fr">Peut-être viendra-t-il.</span> В разговоре: <span lang="fr">Peut-être qu’il viendra.</span></p></div>

<h3>Глаголы видимости</h3>
<ul class="ex-l">
<li><span lang="fr">Il semble que la situation se soit améliorée.</span><span class="tr">Похоже, что ситуация улучшилась (subjonctif).</span></li>
<li><span lang="fr">Il me semble que tu as raison.</span><span class="tr">Мне кажется, ты прав (с me — indicatif).</span></li>
<li><span lang="fr">Il paraît qu’ils vont se marier.</span><span class="tr">Говорят, они собираются пожениться.</span></li>
<li><span lang="fr">L’hypothèse s’est avérée fausse.</span><span class="tr">Гипотеза оказалась ложной.</span></li>
</ul>
<div class="ichika">Il semble que + subjonctif, но il me semble que + indicatif ♡ Странно? Логика такая: «мне кажется» — это моё личное, почти уверенное мнение. А «кажется вообще» — сомнение. Французы и тут разбираются в нюансах!</div>

<h3>Модализация в академическом тексте</h3>
<div class="tbl"><table><thead><tr><th>Категоричное</th><th>Модализованное</th></tr></thead><tbody>
<tr><td lang="fr">Les réseaux sociaux rendent les jeunes dépressifs.</td><td lang="fr">Une utilisation excessive des réseaux sociaux pourrait favoriser certains troubles chez les jeunes.</td></tr>
<tr><td lang="fr">Cette méthode est la meilleure.</td><td lang="fr">Cette méthode semble être l’une des plus efficaces.</td></tr>
<tr><td lang="fr">Tout le monde le sait.</td><td lang="fr">Il est généralement admis que …</td></tr>
</tbody></table></div>

<h3>Нюансирование</h3>
<ul class="ex-l">
<li><span lang="fr">Certes …, toutefois …</span><span class="tr">Конечно…, однако…</span></li>
<li><span lang="fr">Il n’en reste pas moins que …</span><span class="tr">Тем не менее остаётся фактом, что…</span></li>
<li><span lang="fr">Force est de constater que …</span><span class="tr">Приходится признать, что…</span></li>
<li><span lang="fr">Dans une certaine mesure, … / Dans la plupart des cas, …</span><span class="tr">В определённой мере… / В большинстве случаев…</span></li>
<li><span lang="fr">Si l’on en croit …, …</span><span class="tr">Если верить…, …</span></li>
</ul>
<div class="ayano">Модализация — признак честного мышления: ты утверждаешь ровно столько, сколько можешь доказать. В эссе DALF экзаменатор ценит фразу <span lang="fr">il semblerait que</span> выше категоричного «это так», если у тебя нет данных. Но не превращай текст в сплошные сомнения: позиция в выводе должна быть ясной.</div>
`,
  p: [
    { q: 'Выбери наклонение: <span lang="fr">Il est possible que le train (avoir) du retard.</span>', a: '<span lang="fr">ait</span>' },
    { q: 'Выбери: <span lang="fr">Il est probable que le train (avoir) du retard.</span>', a: '<span lang="fr">aura / a</span> — indicatif.' },
    { q: 'Переведи: «Он, вероятно, прав».', a: '<span lang="fr">Il a sans doute raison.</span> / <span lang="fr">Il a probablement raison.</span>' },
    { q: 'Смягчи: <span lang="fr">Les écrans détruisent l’attention des enfants.</span>', a: 'Например: <span lang="fr">Une exposition prolongée aux écrans pourrait nuire à l’attention des enfants.</span>' },
    { q: 'Переведи: «Решение оказалось удачным».', a: '<span lang="fr">La solution s’est avérée efficace / judicieuse.</span>' },
    { q: 'Начни вывод с нюансом: «Приходится признать, что…»', a: '<span lang="fr">Force est de constater que …</span>' }
  ],
  q: [
    { q: '<span lang="fr">sans doute</span> означает:', o: ['несомненно', 'вероятно', 'никогда', 'возможно, нет'], a: 1, e: 'Ловушка: «вероятно».' },
    { q: '<span lang="fr">Il se peut qu’il ___ .</span>', o: ['vient', 'vienne', 'viendra', 'viendrait'], a: 1, e: 'Возможность — subjonctif.' },
    { q: '<span lang="fr">Il me semble que tu ___ fatigué.</span>', o: ['sois', 'es', 'serais — только так', 'fusses'], a: 1, e: 'Il me semble que + indicatif.' },
    { q: '«Оказаться» (о гипотезе):', o: ['s’avérer', 'se trouver seulement', 'arriver', 'devenir'], a: 0, e: 's’avérer.' },
    { q: 'Книжный порядок после peut-être в начале:', o: ['Peut-être il viendra.', 'Peut-être viendra-t-il.', 'Peut-être que viendra-t-il.', 'Peut-être il vient-il.'], a: 1, e: 'Инверсия.' }
  ],
  s: [
    'Шкала: certain/évident → probable/sans doute → possible/peut-être → peu probable → exclu.',
    'probable, certain — indicatif; possible, il se peut, douteux — subjonctif.',
    'sans doute = вероятно; sans aucun doute = несомненно.',
    'Il semble que + subjonctif; il me semble que + indicatif; il paraît que — говорят.',
    'Модализация: pourrait, semble, il est généralement admis que.',
    'Нюанс: certes … toutefois, il n’en reste pas moins que, force est de constater que.'
  ]
});
