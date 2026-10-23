L('fra', 5, {
  m: 45,
  intro: 'Французы не любят повторять существительные — вместо них работают местоимения-дополнения: le, la, les, lui, leur, y, en. Они стоят перед глаголом и выстраиваются в строгом порядке. Это одна из самых «французских» тем: без неё речь звучит громоздко, а с ней — естественно. На B1 нужно уверенно использовать одно местоимение, а постепенно и два сразу.',
  intro2: 'Senpai, «Tu me le donnes ?» — «Ты мне это дашь?» ♡ Три коротких слова перед глаголом, и всё понятно. Французские местоимения выстраиваются в очередь, как воспитанные школьники. Сейчас выучим, кто за кем стоит!',
  goals: [
    'Различать прямые (le, la, les) и косвенные (lui, leur) дополнения',
    'Использовать y и en',
    'Ставить два местоимения в правильном порядке',
    'Ставить местоимения в passé composé, с инфинитивом и в повелительном наклонении'
  ],
  c: `
<h3>Прямые и косвенные дополнения</h3>
<div class="tbl"><table><thead><tr><th>Тип</th><th>Местоимения</th><th>Вопрос</th><th>Пример</th></tr></thead><tbody>
<tr><td>COD — прямое</td><td lang="fr">me, te, le, la, nous, vous, les</td><td>кого? что?</td><td lang="fr">Tu vois Marie ? — Oui, je la vois.</td></tr>
<tr><td>COI — косвенное</td><td lang="fr">me, te, lui, nous, vous, leur</td><td>кому? (à + человек)</td><td lang="fr">Tu parles à Paul ? — Oui, je lui parle.</td></tr>
</tbody></table></div>
<div class="warn"><p>Глаголы управляются не всегда как в русском: <span lang="fr">aider quelqu’un</span> (помогать кому — но прямое: <span lang="fr">je l’aide</span>), <span lang="fr">téléphoner à quelqu’un</span> (звонить — косвенное: <span lang="fr">je lui téléphone</span>), <span lang="fr">écouter quelqu’un</span> (слушать — прямое).</p></div>

<h3>y и en</h3>
<div class="two"><div><h4>y</h4><p>Заменяет à + вещь или место.</p><p lang="fr">Tu vas à Paris ? — Oui, j’y vais.</p><p lang="fr">Tu penses à l’examen ? — Oui, j’y pense.</p></div><div><h4>en</h4><p>Заменяет de + вещь, а также количество.</p><p lang="fr">Tu as du pain ? — Oui, j’en ai.</p><p lang="fr">Tu as combien de frères ? — J’en ai deux.</p></div></div>
<p>О людях после <span lang="fr">penser à, parler de</span> — ударные местоимения: <span lang="fr">Je pense à lui. Elle parle de toi.</span></p>

<h3>Порядок местоимений</h3>
<div class="tbl"><table><thead><tr><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>глагол</th></tr></thead><tbody>
<tr><td lang="fr">me, te, se, nous, vous</td><td lang="fr">le, la, les</td><td lang="fr">lui, leur</td><td lang="fr">y</td><td lang="fr">en</td><td>+ глагол</td></tr>
</tbody></table></div>
<ul class="ex-l">
<li><span lang="fr">Il me le donne.</span><span class="tr">Он мне его даёт.</span></li>
<li><span lang="fr">Je le lui ai dit.</span><span class="tr">Я ему это сказал.</span></li>
<li><span lang="fr">Il y en a beaucoup.</span><span class="tr">Их там много.</span></li>
</ul>
<div class="ichika">Моя считалочка ♡ «Ме-ле-лю-и-ан» — me, le, lui, y, en. Повтори три раза — и порядок застрянет в голове, как песенка из рекламы!</div>

<h3>Место в разных конструкциях</h3>
<div class="tbl"><table><thead><tr><th>Конструкция</th><th>Место</th><th>Пример</th></tr></thead><tbody>
<tr><td>Passé composé</td><td>перед avoir/être</td><td lang="fr">Je l’ai vu. Je ne l’ai pas vu.</td></tr>
<tr><td>Глагол + инфинитив</td><td>перед инфинитивом</td><td lang="fr">Je vais le faire. Je veux lui parler.</td></tr>
<tr><td>Повелительное (утверждение)</td><td>после глагола через дефис; me → moi</td><td lang="fr">Donne-le-moi ! Vas-y ! Prends-en !</td></tr>
<tr><td>Повелительное (отрицание)</td><td>перед глаголом, обычный порядок</td><td lang="fr">Ne me le donne pas !</td></tr>
</tbody></table></div>
<div class="ayano">Не пытайся сразу строить цепочки из трёх местоимений. Сначала доведи до автоматизма одно местоимение в passé composé и с инфинитивом. Потом добавь пары «me le», «le lui». Носители тоже редко используют больше двух подряд — и это нормально, в разговоре часто проще повторить существительное.</div>
`,
  p: [
    { q: 'Замени: <span lang="fr">Je regarde le film.</span>', a: '<span lang="fr">Je le regarde.</span>' },
    { q: 'Замени: <span lang="fr">J’écris à mes grands-parents.</span>', a: '<span lang="fr">Je leur écris.</span>' },
    { q: 'Замени: <span lang="fr">Nous allons au cinéma ce soir.</span>', a: '<span lang="fr">Nous y allons ce soir.</span>' },
    { q: 'Замени: <span lang="fr">Elle a mangé trois croissants.</span>', a: '<span lang="fr">Elle en a mangé trois.</span>' },
    { q: 'Замени оба: <span lang="fr">J’ai donné le livre à Marc.</span>', a: '<span lang="fr">Je le lui ai donné.</span>' },
    { q: 'Повелительное: <span lang="fr">Donne-moi les clés !</span> → замени les clés; затем скажи отрицательно.', a: '<span lang="fr">Donne-les-moi !</span> / <span lang="fr">Ne me les donne pas !</span>' }
  ],
  q: [
    { q: '<span lang="fr">Tu téléphones à ta mère ? — Oui, je ___ téléphone.</span>', o: ['la', 'lui', 'le', 'y'], a: 1, e: 'téléphoner à — косвенное.' },
    { q: '<span lang="fr">Tu veux du café ? — Oui, j’___ veux.</span>', o: ['y', 'en', 'le', 'lui'], a: 1, e: 'du = de + вещь.' },
    { q: 'Порядок:', o: ['Je lui le donne.', 'Je le lui donne.', 'Je donne le lui.', 'Le je lui donne.'], a: 1, e: 'le перед lui.' },
    { q: '<span lang="fr">Je vais ___ .</span> (сделать это)', o: ['le faire', 'faire le', 'lefaire', 'faire-le'], a: 0, e: 'Перед инфинитивом.' },
    { q: 'Утвердительное повелительное:', o: ['Me le donne !', 'Donne-le-moi !', 'Donne-moi-le !', 'Le donne-moi !'], a: 1, e: 'Глагол-le-moi.' }
  ],
  s: [
    'COD: le, la, les (кого? что?); COI: lui, leur (à + человек).',
    'y = à + вещь/место; en = de + вещь, количество.',
    'Порядок: me/te/se/nous/vous → le/la/les → lui/leur → y → en → глагол.',
    'Passé composé: перед avoir/être; с инфинитивом: перед инфинитивом.',
    'Утвердительное повелительное: Donne-le-moi ! Отрицательное: Ne me le donne pas !',
    'Управление глагола проверяй: aider qqn (прямое), téléphoner à qqn (косвенное).'
  ]
});
