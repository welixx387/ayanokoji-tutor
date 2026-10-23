L('fra', 17, {
  m: 40,
  intro: 'Начинаем уровень C1. Passé simple — время французской литературы и истории: в нём написаны романы Гюго, Дюма и Камю, сказки и учебники истории. В разговоре его не используют, но читать без него невозможно. На C1 нужно свободно узнавать формы passé simple, понимать passé antérieur и узнавать imparfait du subjonctif в классических текстах.',
  intro2: 'Senpai, «Il était une fois une princesse qui vécut heureuse…» ♡ Это passé simple — время сказок и великих романов. Говорить на нём не надо, а вот читать Дюма в оригинале — очень даже! Готов к приключениям мушкетёров?',
  goals: [
    'Узнавать и образовывать passé simple трёх типов',
    'Знать формы частых неправильных глаголов',
    'Понимать роль passé simple и imparfait в литературном тексте',
    'Узнавать passé antérieur и imparfait du subjonctif'
  ],
  c: `
<h3>Три типа окончаний</h3>
<div class="tbl"><table><thead><tr><th>Лицо</th><th>-a- (глаголы на -er)</th><th>-i-</th><th>-u-</th></tr></thead><tbody>
<tr><td lang="fr">je</td><td lang="fr">parlai</td><td lang="fr">finis</td><td lang="fr">voulus</td></tr>
<tr><td lang="fr">tu</td><td lang="fr">parlas</td><td lang="fr">finis</td><td lang="fr">voulus</td></tr>
<tr><td lang="fr">il / elle</td><td lang="fr">parla</td><td lang="fr">finit</td><td lang="fr">voulut</td></tr>
<tr><td lang="fr">nous</td><td lang="fr">parlâmes</td><td lang="fr">finîmes</td><td lang="fr">voulûmes</td></tr>
<tr><td lang="fr">vous</td><td lang="fr">parlâtes</td><td lang="fr">finîtes</td><td lang="fr">voulûtes</td></tr>
<tr><td lang="fr">ils / elles</td><td lang="fr">parlèrent</td><td lang="fr">finirent</td><td lang="fr">voulurent</td></tr>
</tbody></table></div>
<p>На практике чаще всего встречаются формы третьего лица: <span lang="fr">il parla, ils parlèrent</span>.</p>

<h3>Частые неправильные глаголы</h3>
<div class="tbl"><table><thead><tr><th>Инфинитив</th><th>il / elle</th><th>ils / elles</th></tr></thead><tbody>
<tr><td lang="fr">être / avoir</td><td lang="fr">fut / eut</td><td lang="fr">furent / eurent</td></tr>
<tr><td lang="fr">faire / dire / voir</td><td lang="fr">fit / dit / vit</td><td lang="fr">firent / dirent / virent</td></tr>
<tr><td lang="fr">prendre / mettre</td><td lang="fr">prit / mit</td><td lang="fr">prirent / mirent</td></tr>
<tr><td lang="fr">venir / tenir</td><td lang="fr">vint / tint</td><td lang="fr">vinrent / tinrent</td></tr>
<tr><td lang="fr">pouvoir / savoir / devoir</td><td lang="fr">put / sut / dut</td><td lang="fr">purent / surent / durent</td></tr>
<tr><td lang="fr">naître / mourir / vivre</td><td lang="fr">naquit / mourut / vécut</td><td lang="fr">naquirent / moururent / vécurent</td></tr>
</tbody></table></div>
<div class="ichika">Ловушка ♡ <span lang="fr">il fit</span> — от faire, а не от finir! <span lang="fr">il vit</span> — от voir («он увидел»), хотя похоже на vivre. А <span lang="fr">il fut</span> — «он был», от être. Читай медленно и проверяй по смыслу!</div>

<h3>Passé simple и imparfait в литературе</h3>
<p>Распределение — как у passé composé и imparfait в разговоре: passé simple двигает сюжет, imparfait рисует фон.</p>
<div class="ex" data-t="Литературный фрагмент"><p lang="fr">La nuit tombait. Le vent soufflait sur la lande et les arbres gémissaient. Soudain, un cavalier apparut au bout du chemin. Il descendit de cheval, frappa trois fois à la porte et attendit.</p><p>Фон: tombait, soufflait, gémissaient. События: apparut, descendit, frappa, attendit.</p></div>

<h3>Passé antérieur и imparfait du subjonctif</h3>
<ul class="ex-l">
<li><span lang="fr">Dès qu’il eut fini sa lettre, il sortit.</span><span class="tr">Passé antérieur (eut fini) — действие сразу перед другим в passé simple; после dès que, quand, lorsque, après que.</span></li>
<li><span lang="fr">Il fallait qu’il partît.</span><span class="tr">Imparfait du subjonctif — книжный, в классике; сегодня говорят qu’il parte.</span></li>
<li><span lang="fr">Bien qu’il fût malade, il travaillait.</span><span class="tr">qu’il fût = qu’il soit в старом литературном стиле.</span></li>
</ul>
<div class="warn"><p>Активно использовать imparfait du subjonctif не нужно — он звучит архаично и даже комично в современной речи. Достаточно узнавать его в книгах: 3-е лицо ед. ч. с циркумфлексом (<span lang="fr">qu’il fût, qu’il eût, qu’il fît</span>).</p></div>
<div class="ayano">Лучшая тренировка — адаптированная литература, а затем оригинал. Начни с «Маленького принца» Сент-Экзюпери: язык простой, а passé simple там на каждой странице. Подчёркивай формы и восстанавливай инфинитив. Через двадцать страниц ты перестанешь замечать, что это «трудное» время.</div>
`,
  p: [
    { q: 'Восстанови инфинитив: <span lang="fr">il fit, il fut, il vit, il eut</span>.', a: 'faire, être, voir, avoir.' },
    { q: 'Passé simple (il): parler, finir, prendre, venir.', a: '<span lang="fr">il parla, il finit, il prit, il vint</span>' },
    { q: 'Passé simple (ils): aller, faire, pouvoir.', a: '<span lang="fr">ils allèrent, ils firent, ils purent</span>' },
    { q: 'Перепиши в разговорный стиль: <span lang="fr">Elle entra, regarda autour d’elle et sourit.</span>', a: '<span lang="fr">Elle est entrée, elle a regardé autour d’elle et elle a souri.</span>' },
    { q: 'Найди фон и события: <span lang="fr">Il pleuvait. Marie ouvrit la fenêtre et vit un chat.</span>', a: 'Фон: pleuvait. События: ouvrit, vit.' },
    { q: 'Переведи: <span lang="fr">Quand il eut terminé, il se leva.</span>', a: 'Когда он закончил, он встал (passé antérieur + passé simple).' }
  ],
  q: [
    { q: '<span lang="fr">il naquit</span> — инфинитив:', o: ['nager', 'naître', 'nier', 'nuire'], a: 1, e: 'naître.' },
    { q: 'Passé simple от être (ils):', o: ['étaient', 'furent', 'fûrent', 'sont été'], a: 1, e: 'furent.' },
    { q: 'Где используют passé simple?', o: ['в чатах', 'в литературе и истории', 'в разговоре с друзьями', 'в рецептах'], a: 1, e: 'Письменный рассказ.' },
    { q: '<span lang="fr">Dès qu’il ___ , il partit.</span>', o: ['a mangé', 'eut mangé', 'avait mangé', 'mangeait'], a: 1, e: 'Passé antérieur.' },
    { q: '<span lang="fr">qu’il fût</span> — это:', o: ['passé simple', 'imparfait du subjonctif от être', 'futur', 'conditionnel'], a: 1, e: 'Книжная форма.' }
  ],
  s: [
    'Passé simple — время литературы и истории; в речи не используется.',
    'Типы: -a- (parla, parlèrent), -i- (finit, finirent), -u- (voulut, voulurent).',
    'Неправильные: fut, eut, fit, dit, vit, prit, vint, put, naquit, vécut.',
    'Passé simple — сюжет, imparfait — фон.',
    'Passé antérieur (eut fini) — после dès que, quand, après que в литературе.',
    'Imparfait du subjonctif (qu’il fût) — только узнавать.'
  ]
});
