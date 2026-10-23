L('fra', 15, {
  m: 40,
  intro: 'Французская школа славится культом аргументированного текста — dissertation. На уровне B2 от тебя ждут essai argumenté около 250 слов: с проблематикой, планом, связками и выводом. В этом уроке — французская структура эссе, которая отличается от англоязычной, и полный набор логических связок по функциям.',
  intro2: 'Senpai, французы учатся писать эссе с подросткового возраста и очень этим гордятся ♡ У них даже есть слово «problématique» — центральный вопрос текста. Сегодня я покажу, как писать так, чтобы французский экзаменатор кивнул одобрительно!',
  goals: [
    'Строить essai argumenté по французской схеме',
    'Формулировать проблематику и объявлять план',
    'Использовать связки по функциям: добавление, противопоставление, уступка, причина, следствие',
    'Писать вывод с bilan и ouverture'
  ],
  c: `
<h3>Структура эссе</h3>
<div class="tbl"><table><thead><tr><th>Часть</th><th>Что сделать</th><th>Формулы</th></tr></thead><tbody>
<tr><td>Introduction</td><td>подвести к теме (amorce), задать проблематику, объявить план</td><td lang="fr">De nos jours, … On peut se demander si … Nous verrons d’abord …, puis …</td></tr>
<tr><td>Développement</td><td>две-три части, в каждой — аргументы и примеры</td><td lang="fr">Tout d’abord, … En outre, … Par exemple, …</td></tr>
<tr><td>Conclusion</td><td>итог (bilan) и расширение темы (ouverture)</td><td lang="fr">En définitive, … Reste à savoir si …</td></tr>
</tbody></table></div>
<div class="ichika">Ouverture — французская фишка ♡ В конце эссе не просто «итак, я считаю», а новый вопрос, который открывает тему шире. Например, после эссе о соцсетях: <span lang="fr">Reste à savoir comment l’école pourrait accompagner les jeunes dans ce domaine.</span> Красиво и умно!</div>

<h3>Связки по функциям</h3>
<div class="tbl"><table><thead><tr><th>Функция</th><th>Связки</th></tr></thead><tbody>
<tr><td>Добавление</td><td lang="fr">de plus, en outre, par ailleurs, d’autre part</td></tr>
<tr><td>Противопоставление</td><td lang="fr">cependant, néanmoins, toutefois, en revanche, alors que</td></tr>
<tr><td>Уступка</td><td lang="fr">certes …, mais … ; bien que + subjonctif ; même si + indicatif</td></tr>
<tr><td>Причина</td><td lang="fr">car, puisque, étant donné que, en raison de</td></tr>
<tr><td>Следствие</td><td lang="fr">donc, par conséquent, c’est pourquoi, si bien que</td></tr>
<tr><td>Пример</td><td lang="fr">par exemple, ainsi, notamment, c’est le cas de</td></tr>
<tr><td>Вывод</td><td lang="fr">en somme, en définitive, pour conclure, finalement</td></tr>
</tbody></table></div>
<div class="warn"><p><span lang="fr">en revanche</span> противопоставляет два факта (а вот), <span lang="fr">cependant</span> — вводит возражение (однако). <span lang="fr">Car</span> не ставят в начало предложения — только в середину: <span lang="fr">Je reste, car il pleut.</span></p></div>

<h3>Абзац-аргумент</h3>
<div class="ex" data-t="Пример"><p lang="fr">Tout d’abord, le télétravail permet de mieux concilier vie professionnelle et vie privée. En effet, les salariés économisent le temps passé dans les transports, qu’ils peuvent consacrer à leur famille ou à leurs loisirs. C’est le cas de nombreux parisiens, qui gagnent ainsi près d’une heure par jour. Par conséquent, leur stress diminue et leur motivation augmente.</p></div>
<p>Схема: тезис (<span lang="fr">Tout d’abord…</span>) → объяснение (<span lang="fr">En effet…</span>) → пример (<span lang="fr">C’est le cas de…</span>) → вывод абзаца (<span lang="fr">Par conséquent…</span>).</p>

<h3>Уступка — ключ к нюансу</h3>
<ul class="ex-l">
<li><span lang="fr">Certes, les écrans présentent des risques, mais ils sont aussi un formidable outil d’apprentissage.</span><span class="tr">Конечно, экраны несут риски, но…</span></li>
<li><span lang="fr">Bien que le projet soit coûteux, il est indispensable.</span><span class="tr">Хотя проект дорогой, он необходим.</span></li>
</ul>
<div class="ayano">Французское эссе ценит логику больше, чем эмоции. Перед написанием потрать пять минут на план: проблематика одним вопросом, две части по два аргумента, пример к каждому. Текст, написанный по плану, читается как цепочка, а без плана — как набор мыслей. Экзаменатор DELF B2 оценивает именно связность.</div>
`,
  p: [
    { q: 'Сформулируй проблематику для темы «уроки онлайн».', a: 'Например: <span lang="fr">On peut se demander si les cours en ligne peuvent remplacer l’enseignement traditionnel.</span>' },
    { q: 'Объяви план из двух частей.', a: '<span lang="fr">Nous verrons d’abord les avantages des cours en ligne, puis leurs limites.</span>' },
    { q: 'Уступка с certes: «Конечно, это дорого, но полезно».', a: '<span lang="fr">Certes, c’est cher, mais c’est utile.</span>' },
    { q: 'Соедини с bien que: <span lang="fr">Il pleut. Nous sortons.</span>', a: '<span lang="fr">Bien qu’il pleuve, nous sortons.</span>' },
    { q: 'Вставь связку следствия: <span lang="fr">Les prix augmentent ; ___, les ménages consomment moins.</span>', a: '<span lang="fr">par conséquent</span> / <span lang="fr">c’est pourquoi</span>' },
    { q: 'Напиши ouverture для эссе о спорте в школе.', a: 'Например: <span lang="fr">Reste à savoir si l’école dispose des moyens nécessaires pour développer ces activités.</span>' }
  ],
  q: [
    { q: 'Часть введения, где задаётся центральный вопрос:', o: ['amorce', 'problématique', 'bilan', 'ouverture'], a: 1, e: 'Problématique.' },
    { q: 'Связка уступки:', o: ['donc', 'certes … mais', 'en outre', 'car'], a: 1, e: 'Certes … mais.' },
    { q: '<span lang="fr">Même si + ___</span>', o: ['subjonctif', 'indicatif', 'conditionnel', 'infinitif'], a: 1, e: 'même si + indicatif.' },
    { q: 'Что не ставят в начало предложения?', o: ['Cependant', 'Car', 'Par conséquent', 'De plus'], a: 1, e: 'car — только в середине.' },
    { q: 'Ouverture — это:', o: ['пример', 'расширение темы в выводе', 'объявление плана', 'заголовок'], a: 1, e: 'Новый вопрос в конце.' }
  ],
  s: [
    'Introduction: amorce → problématique → annonce du plan.',
    'Développement: 2–3 части; абзац = тезис → en effet → пример → вывод.',
    'Conclusion: bilan + ouverture.',
    'Связки: de plus, en outre; cependant, en revanche; car, puisque; donc, par conséquent.',
    'Уступка: certes … mais; bien que + subjonctif; même si + indicatif.',
    'car — не в начале предложения; план до написания — 5 минут.'
  ]
});
