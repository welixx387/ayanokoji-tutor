L('fra', 6, {
  m: 40,
  intro: 'Conditionnel présent — французское «бы». Без него невозможно вежливо попросить, дать совет, помечтать и строить гипотезы. А ещё у него есть особое «газетное» значение — непроверенная информация. Вторая половина урока — условные предложения с si и железное правило: после si никогда не ставится conditionnel.',
  intro2: 'Senpai, «Je voudrais un café, s’il vous plaît» — и парижский официант уже не такой суровый ♡ Conditionnel — это шёлковая перчатка французского языка. Вежливость, мечты и немного сплетен.',
  goals: [
    'Образовывать conditionnel présent',
    'Использовать его для вежливости, совета, желания и непроверенной информации',
    'Строить условные предложения с si: реальное и гипотетическое условие',
    'Не ставить conditionnel после si'
  ],
  c: `
<h3>Образование</h3>
<div class="rule" data-t="основа futur simple + окончания imparfait"><p>-ais, -ais, -ait, -ions, -iez, -aient: <span lang="fr">je parlerais, tu finirais, il serait, nous aurions, vous pourriez, ils voudraient</span>.</p></div>
<p>Все неправильные основы — те же, что в futur: ser-, aur-, ir-, fer-, pourr-, voudr-, viendr-, verr-, devr-, saur-.</p>

<h3>Значения</h3>
<div class="tbl"><table><thead><tr><th>Значение</th><th>Пример</th><th>Перевод</th></tr></thead><tbody>
<tr><td>Вежливость</td><td lang="fr">Je voudrais un renseignement. Pourriez-vous m’aider ?</td><td>Я хотел бы… Не могли бы вы…?</td></tr>
<tr><td>Совет</td><td lang="fr">Tu devrais te reposer. À ta place, je partirais.</td><td>Тебе стоило бы… На твоём месте я бы…</td></tr>
<tr><td>Желание</td><td lang="fr">J’aimerais visiter le Japon.</td><td>Я бы хотел…</td></tr>
<tr><td>Непроверенная информация</td><td lang="fr">Selon la presse, le ministre démissionnerait.</td><td>По данным прессы, министр якобы уходит.</td></tr>
<tr><td>Будущее в прошедшем</td><td lang="fr">Il a dit qu’il viendrait.</td><td>Он сказал, что придёт (урок 13).</td></tr>
</tbody></table></div>
<div class="ichika">Газетный conditionnel — хитрая штука ♡ <span lang="fr">L’acteur se marierait en juin</span> — это не «женился бы», а «по слухам, женится». Журналист как бы говорит: «я передаю, но не ручаюсь». Французская светская хроника на нём держится!</div>

<h3>Условные предложения с si</h3>
<div class="tbl"><table><thead><tr><th>Тип</th><th>Si + …</th><th>Главное</th><th>Пример</th></tr></thead><tbody>
<tr><td>Реальное</td><td>présent</td><td>présent / futur / impératif</td><td lang="fr">Si tu viens, on ira au cinéma.</td></tr>
<tr><td>Гипотеза о настоящем/будущем</td><td>imparfait</td><td>conditionnel présent</td><td lang="fr">Si j’avais de l’argent, j’achèterais une maison.</td></tr>
<tr><td>Нереальное прошлое</td><td>plus-que-parfait</td><td>conditionnel passé</td><td lang="fr">Si j’avais su, je serais venu. (урок 11)</td></tr>
</tbody></table></div>
<div class="warn"><p>Главное правило: после <span lang="fr">si</span> в значении «если» никогда не бывает futur и conditionnel. Неверно: <s>Si j’aurais le temps…</s>, <s>S’il pleuvra…</s>. Правильно: <span lang="fr">Si j’avais le temps…, S’il pleut…</span> Перед il, ils si сокращается: <span lang="fr">s’il</span>, но перед elle — нет: <span lang="fr">si elle</span>.</p></div>

<h3>Мечты и гипотезы</h3>
<ul class="ex-l">
<li><span lang="fr">Si j’étais président, je rendrais les transports gratuits.</span><span class="tr">Если бы я был президентом…</span></li>
<li><span lang="fr">Qu’est-ce que tu ferais si tu gagnais au loto ?</span><span class="tr">Что бы ты сделал, если бы выиграл в лотерею?</span></li>
<li><span lang="fr">Et si on partait en week-end ?</span><span class="tr">А что если нам уехать на выходные? (предложение)</span></li>
</ul>
<div class="ayano">Различай реальное и гипотетическое условие по своей оценке шансов. «Если пойдёт дождь» — вполне возможно, значит si + présent. «Если бы я жил в Париже» — не живу, значит si + imparfait. Русское «если» одно на оба случая, поэтому каждый раз задавай себе вопрос: насколько это реально?</div>
`,
  p: [
    { q: 'Сделай вежливее: <span lang="fr">Je veux un thé.</span>', a: '<span lang="fr">Je voudrais un thé, s’il vous plaît.</span>' },
    { q: 'Дай совет: друг плохо спит.', a: '<span lang="fr">Tu devrais te coucher plus tôt.</span>' },
    { q: 'Передай непроверенную новость: «По сведениям газеты, певица переезжает в Канаду».', a: '<span lang="fr">Selon le journal, la chanteuse s’installerait au Canada.</span>' },
    { q: 'Реальное условие: <span lang="fr">Si tu (finir) tôt, nous (aller) au parc.</span>', a: '<span lang="fr">Si tu finis tôt, nous irons au parc.</span>' },
    { q: 'Гипотеза: <span lang="fr">Si je (avoir) plus de temps, je (apprendre) le piano.</span>', a: '<span lang="fr">Si j’avais plus de temps, j’apprendrais le piano.</span>' },
    { q: 'Исправь: <i>Si j’aurais su, je viendrais.</i>', a: 'О настоящем: <span lang="fr">Si je savais, je viendrais.</span> О прошлом: <span lang="fr">Si j’avais su, je serais venu.</span>' }
  ],
  q: [
    { q: 'Conditionnel от pouvoir (vous):', o: ['vous pouvez', 'vous pourriez', 'vous pourrez', 'vous pouviez'], a: 1, e: 'pourr- + -iez.' },
    { q: '<span lang="fr">Si j’___ riche, je voyagerais.</span>', o: ['serais', 'étais', 'suis', 'serai'], a: 1, e: 'si + imparfait.' },
    { q: '<span lang="fr">S’il ___ demain, on restera à la maison.</span>', o: ['pleut', 'pleuvra', 'pleuvrait', 'pleuvait'], a: 0, e: 'Реальное условие — présent.' },
    { q: 'Газетное значение conditionnel:', o: ['приказ', 'непроверенная информация', 'прошлое', 'вопрос'], a: 1, e: 'Selon… il serait…' },
    { q: '«Тебе следовало бы»:', o: ['Tu dois', 'Tu devrais', 'Tu devras', 'Tu devais'], a: 1, e: 'Совет — conditionnel.' }
  ],
  s: [
    'Conditionnel = основа futur + окончания imparfait (-ais, -ait, -ions, -iez, -aient).',
    'Значения: вежливость, совет, желание, непроверенная информация, будущее в прошедшем.',
    'Si + présent → présent/futur/impératif (реальное).',
    'Si + imparfait → conditionnel présent (гипотеза).',
    'После si никогда futur и conditionnel.',
    's’il, s’ils — но si elle.'
  ]
});
