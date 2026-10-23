L('fra', 23, {
  m: 45,
  intro: 'Главное письменное задание экзамена DALF C1 — synthèse de documents: из двух-трёх текстов общим объёмом около тысячи слов нужно составить связный текст примерно на 220 слов без собственного мнения. Это навык учёбы во французском университете. В уроке — методика синтеза, конспектирование (prise de notes), резюме и формулы академического письма.',
  intro2: 'Senpai, синтез — это как сварить суп из трёх разных рецептов ♡ Берёшь лучшее из каждого, смешиваешь и подаёшь как одно блюдо. Своё мнение туда класть нельзя — это строгий французский суп!',
  goals: [
    'Конспектировать с сокращениями и символами',
    'Составлять synthèse de documents по шагам',
    'Писать résumé текста',
    'Использовать формулы сопоставления источников'
  ],
  c: `
<h3>Prise de notes</h3>
<div class="tbl"><table><thead><tr><th>Сокращение</th><th>Значение</th><th>Символ</th><th>Значение</th></tr></thead><tbody>
<tr><td lang="fr">qqn / qqch</td><td>quelqu’un / quelque chose</td><td>→</td><td>следствие</td></tr>
<tr><td lang="fr">pb, pt, ds</td><td>problème, point, dans</td><td>≠</td><td>противоположность</td></tr>
<tr><td lang="fr">bcp, tt, ts</td><td>beaucoup, tout, tous</td><td>↑ / ↓</td><td>рост / падение</td></tr>
<tr><td lang="fr">c.-à-d., ex.</td><td>c’est-à-dire, exemple</td><td>+ / −</td><td>плюс / минус</td></tr>
<tr><td lang="fr">gvt, svt</td><td>gouvernement, souvent</td><td>∆</td><td>изменение</td></tr>
</tbody></table></div>
<div class="ichika">Конспект на французском — это шифр ♡ «Le gvt ↑ impôts → bcp de pb pr les jeunes» — и всё понятно: правительство повысило налоги, у молодёжи много проблем. На лекциях во Франции все пишут именно так!</div>

<h3>Synthèse de documents: шаги</h3>
<ol>
<li><b>Прочитать</b> все документы, найти общую тему.</li>
<li><b>Таблица идей:</b> строки — идеи, столбцы — документы. Где авторы согласны, где спорят.</li>
<li><b>Проблематика:</b> один вопрос, который объединяет документы.</li>
<li><b>План</b> из двух-трёх частей по идеям, а не по документам.</li>
<li><b>Написать</b>: заголовок, введение (тема, проблематика, план), развитие, короткий вывод.</li>
<li><b>Проверить:</b> нет ли своего мнения, цитат и лишних примеров; уложиться в объём (обычно около 220 слов ± 10 %).</li>
</ol>
<div class="warn"><p>Три запрета синтеза: своё мнение («je pense que»), прямые цитаты и копирование фраз из документов, пересказ документов по очереди («Le document 1 dit… Le document 2 dit…»). Нужно переформулировать и сгруппировать по идеям.</p></div>

<h3>Формулы сопоставления</h3>
<div class="tbl"><table><thead><tr><th>Функция</th><th>Формулы</th></tr></thead><tbody>
<tr><td>Согласие источников</td><td lang="fr">Les auteurs s’accordent à dire que … Tous soulignent …</td></tr>
<tr><td>Расхождение</td><td lang="fr">Contrairement à …, … Si le premier document insiste sur …, le second met plutôt l’accent sur …</td></tr>
<tr><td>Подача идеи</td><td lang="fr">Selon …, D’après …, … met en évidence / en lumière …</td></tr>
<tr><td>Добавление</td><td lang="fr">Par ailleurs, … En outre, …</td></tr>
<tr><td>Вывод</td><td lang="fr">En définitive, il apparaît que …</td></tr>
</tbody></table></div>

<h3>Résumé</h3>
<p>Резюме — сжатие одного текста примерно до четверти объёма с сохранением порядка мыслей автора и без собственных комментариев. Повествование ведётся как бы от лица автора, без фраз «l’auteur dit que».</p>
<div class="ex" data-t="Введение синтеза"><p lang="fr">Le télétravail, longtemps marginal, s’est imposé depuis la crise sanitaire. Les documents proposés s’interrogent sur ses effets : constitue-t-il un progrès pour les salariés ou une source de nouvelles difficultés ? Nous examinerons d’abord ses avantages, puis les risques qu’il comporte.</p></div>
<div class="ayano">Синтез тренируется только практикой с таймером. Возьми две статьи на одну тему из Le Monde или Le Figaro, сделай таблицу идей за 20 минут и напиши 220 слов за 40. Потом сравни: есть ли хоть одна фраза, скопированная из статей? Если есть — перепиши её. Переформулирование и есть главный навык C1.</div>
`,
  p: [
    { q: 'Расшифруй конспект: <span lang="fr">Bcp de jeunes ↓ lecture → pb de vocabulaire.</span>', a: '<span lang="fr">Beaucoup de jeunes lisent moins, ce qui entraîne des problèmes de vocabulaire.</span>' },
    { q: 'Запиши сокращённо: <span lang="fr">Le gouvernement veut souvent réduire les dépenses.</span>', a: '<span lang="fr">Gvt veut svt ↓ dépenses.</span>' },
    { q: 'Сопоставь: документ 1 — за, документ 2 — против школьной формы.', a: '<span lang="fr">Si le premier document défend l’uniforme scolaire, le second en souligne les limites.</span>' },
    { q: 'Покажи согласие авторов.', a: '<span lang="fr">Les auteurs s’accordent à dire que …</span>' },
    { q: 'Что нельзя делать в синтезе?', a: 'Давать своё мнение, цитировать и копировать фразы, пересказывать документы по очереди.' },
    { q: 'Какой примерный объём синтеза на DALF C1?', a: 'Около 220 слов (допускается небольшое отклонение).' }
  ],
  q: [
    { q: 'Синтез строится по:', o: ['документам по очереди', 'идеям', 'личному мнению', 'хронологии авторов'], a: 1, e: 'План по идеям.' },
    { q: 'В синтезе допустимо:', o: ['je pense que', 'прямые цитаты', 'переформулирование', 'новые примеры от себя'], a: 2, e: 'Только переформулирование.' },
    { q: 'Сокращение <span lang="fr">qqch</span>:', o: ['quelqu’un', 'quelque chose', 'quoique', 'quelquefois'], a: 1, e: 'quelque chose.' },
    { q: '«Авторы сходятся во мнении»:', o: ['Les auteurs s’accordent à dire que', 'Les auteurs se disputent', 'Selon moi', 'Je suis d’accord'], a: 0, e: 'Формула согласия.' },
    { q: 'Résumé сохраняет:', o: ['мнение студента', 'порядок мыслей автора', 'все примеры', 'цитаты'], a: 1, e: 'Сжато, в порядке автора.' }
  ],
  s: [
    'Prise de notes: qqn, qqch, pb, bcp, tt, gvt, svt; символы →, ≠, ↑, ↓.',
    'Синтез: чтение → таблица идей → проблематика → план по идеям → текст → проверка.',
    'Без своего мнения, цитат и пересказа документов по очереди.',
    'Формулы: Les auteurs s’accordent à dire…, Contrairement à…, Si le premier… le second…',
    'Résumé: около четверти текста, порядок мыслей автора, без комментариев.',
    'Объём синтеза DALF C1 — около 220 слов.'
  ]
});
