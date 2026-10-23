L('eng', 21, {
  m: 40,
  intro: 'Академический английский отличается от разговорного не сложными словами, а другой логикой: действия превращаются в существительные, автор осторожен в утверждениях, а личные эмоции уходят в тень. Номинализация, безличные конструкции и hedging — смягчение утверждений — нужны для эссе C1, IELTS Writing и любой учёбы на английском.',
  intro2: 'Senpai, учёные никогда не пишут «это точно так» ♡ Они пишут «the data suggest that it may be the case». Звучит скромно, но на самом деле это броня: попробуй-ка опровергни! Сегодня научимся писать как исследователь.',
  goals: [
    'Превращать глаголы и прилагательные в существительные (номинализация)',
    'Использовать безличные конструкции академического текста',
    'Смягчать утверждения с помощью hedging и не злоупотреблять усилителями',
    'Заменять разговорные фразовые глаголы нейтральными синонимами'
  ],
  c: `
<h3>Номинализация</h3>
<p>В академическом тексте действие часто выражено существительным. Так текст становится плотнее, а в центре — понятия, а не люди.</p>
<div class="tbl"><table><thead><tr><th>Разговорно</th><th>Академично</th></tr></thead><tbody>
<tr><td lang="en">Prices rose quickly, and people were worried.</td><td lang="en">The rapid rise in prices caused widespread concern.</td></tr>
<tr><td lang="en">We analysed the data and found that…</td><td lang="en">Analysis of the data revealed that…</td></tr>
<tr><td lang="en">If we invest more in schools, children will learn better.</td><td lang="en">Greater investment in education leads to improved learning outcomes.</td></tr>
<tr><td lang="en">The government decided to close the factory, so many people lost their jobs.</td><td lang="en">The government’s decision to close the factory resulted in significant job losses.</td></tr>
</tbody></table></div>
<div class="warn"><p>Не переусердствуй: цепочка из пяти существительных подряд (<s>the implementation of the evaluation of the reduction of…</s>) нечитаема. Номинализация хороша, когда сжимает мысль, а не прячет её.</p></div>

<h3>Безличный стиль</h3>
<ul class="ex-l">
<li><span lang="en">It can be seen from the graph that…</span><span class="tr">Из графика видно, что…</span></li>
<li><span lang="en">There is growing evidence that…</span><span class="tr">Появляется всё больше данных, что…</span></li>
<li><span lang="en">It is widely accepted that…</span><span class="tr">Общепризнано, что…</span></li>
<li><span lang="en">This essay will argue that…</span><span class="tr">В этом эссе доказывается, что…</span></li>
<li><span lang="en">The findings indicate that…</span><span class="tr">Результаты указывают на то, что…</span></li>
</ul>
<div class="tbl"><table><thead><tr><th>Разговорный глагол</th><th>Нейтральный / академический</th></tr></thead><tbody>
<tr><td lang="en">find out</td><td lang="en">discover, determine</td></tr>
<tr><td lang="en">look into</td><td lang="en">investigate, examine</td></tr>
<tr><td lang="en">set up</td><td lang="en">establish</td></tr>
<tr><td lang="en">go up / go down</td><td lang="en">increase, rise / decrease, decline</td></tr>
<tr><td lang="en">cut down on</td><td lang="en">reduce</td></tr>
<tr><td lang="en">get rid of</td><td lang="en">eliminate, remove</td></tr>
<tr><td lang="en">a lot of</td><td lang="en">a considerable number of, a great deal of, numerous</td></tr>
</tbody></table></div>

<h3>Hedging: осторожность в утверждениях</h3>
<div class="tbl"><table><thead><tr><th>Средство</th><th>Примеры</th></tr></thead><tbody>
<tr><td>Модальные глаголы</td><td lang="en">may, might, could</td></tr>
<tr><td>Глаголы видимости</td><td lang="en">appear to, seem to, tend to, suggest, indicate</td></tr>
<tr><td>Наречия</td><td lang="en">possibly, probably, arguably, relatively, generally, to some extent</td></tr>
<tr><td>Прилагательные</td><td lang="en">likely, possible, potential</td></tr>
<tr><td>Количество</td><td lang="en">approximately, roughly, the majority of, in most cases</td></tr>
</tbody></table></div>
<div class="ex" data-t="Было → стало"><p><span lang="en">Social media makes teenagers depressed.</span></p><p><span lang="en">Excessive use of social media may contribute to depression in some teenagers.</span></p><p>Утверждение стало точнее: не «все подростки» и не «прямая причина», а возможный фактор для части группы.</p></div>
<div class="ichika">Усилители тоже нужны, но дозированно ♡ <span lang="en">clearly, undoubtedly, it is evident that</span> — только когда у тебя есть железные доказательства. Если в каждом абзаце «очевидно», читатель начнёт сомневаться.</div>
<div class="ayano">Hedging — это не неуверенность, а точность. Сильное утверждение без данных легко опровергнуть одним контрпримером. Осторожная формулировка говорит ровно столько, сколько доказано, и поэтому выдерживает критику. На экзамене это выглядит как зрелость мышления, и экзаменаторы это видят.</div>
`,
  p: [
    { q: 'Номинализируй: <span lang="en">Unemployment increased sharply.</span>', a: '<span lang="en">There was a sharp increase in unemployment.</span>' },
    { q: 'Номинализируй: <span lang="en">The company failed because it was managed badly.</span>', a: '<span lang="en">The company’s failure was due to poor management.</span>' },
    { q: 'Замени фразовый глагол: <span lang="en">Scientists are looking into the causes.</span>', a: '<span lang="en">Scientists are investigating the causes.</span>' },
    { q: 'Смягчи: <span lang="en">Video games cause violence.</span>', a: 'Например: <span lang="en">Some studies suggest that violent video games may contribute to aggressive behaviour.</span>' },
    { q: 'Сделай безличным: <span lang="en">I think this policy is wrong.</span>', a: 'Например: <span lang="en">It could be argued that this policy is misguided.</span>' },
    { q: 'Замени «a lot of» на академический вариант: <span lang="en">a lot of research</span>', a: '<span lang="en">a considerable amount of research</span> / <span lang="en">a great deal of research</span> (research — неисчисляемое).' }
  ],
  q: [
    { q: 'Номинализация от «decide»:', o: ['decisive', 'decision', 'decidedly', 'deciding'], a: 1, e: 'decision.' },
    { q: 'Академический синоним «find out»:', o: ['get', 'determine', 'figure', 'look'], a: 1, e: 'determine, discover.' },
    { q: 'Hedging:', o: ['This proves that…', 'This clearly shows…', 'This appears to suggest that…', 'Everyone knows that…'], a: 2, e: 'Осторожная формулировка.' },
    { q: 'Безличная конструкция:', o: ['I believe that…', 'It is widely accepted that…', 'You know that…', 'We all think…'], a: 1, e: 'Без личного местоимения.' },
    { q: 'Чего стоит избегать в эссе C1?', o: ['hedging', 'номинализации', 'разговорных сокращений и kids, stuff', 'связок'], a: 2, e: 'Регистр нарушается.' }
  ],
  s: [
    'Номинализация: действие → существительное (rise → a rise in, decide → decision).',
    'Безличный стиль: It can be seen…, There is evidence…, The findings indicate…',
    'Фразовые глаголы → нейтральные: investigate, establish, reduce, eliminate.',
    'Hedging: may, appear to, tend to, suggest, arguably, to some extent.',
    'Усилители — только при сильных доказательствах.',
    'Цель — точность: утверждай ровно столько, сколько можешь доказать.'
  ]
});
