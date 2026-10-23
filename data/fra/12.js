L('fra', 12, {
  m: 35,
  intro: 'Во французском пассив используют реже, чем в английском: язык предпочитает другие способы убрать действующее лицо. Это местоимение on, местоименный пассив («ce plat se mange froid») и конструкция se faire + инфинитив. На B2 нужно владеть всеми этими средствами и выбирать подходящее по стилю.',
  intro2: 'Senpai, «Il s’est fait voler son portable» — «у него украли телефон» ♡ Звучит так, будто он сам это устроил, но нет! Французский любит такие хитрые конструкции. Сегодня их разгадаем.',
  goals: [
    'Строить пассив être + participe passé во всех основных временах',
    'Выбирать между par и de для действующего лица',
    'Использовать on и местоименный пассив',
    'Использовать se faire + инфинитив'
  ],
  c: `
<h3>Пассив: être + participe passé</h3>
<div class="tbl"><table><thead><tr><th>Время</th><th>Пример</th></tr></thead><tbody>
<tr><td>Présent</td><td lang="fr">La maison est construite par une entreprise locale.</td></tr>
<tr><td>Passé composé</td><td lang="fr">La maison a été construite en 1990.</td></tr>
<tr><td>Imparfait</td><td lang="fr">La maison était entourée d’un jardin.</td></tr>
<tr><td>Futur</td><td lang="fr">La maison sera vendue l’année prochaine.</td></tr>
</tbody></table></div>
<p>Причастие согласуется с подлежащим: <span lang="fr">Les lettres ont été envoyées.</span> Время показывает глагол être.</p>
<div class="two"><div><h4>par</h4><p>Конкретное действие.</p><p lang="fr">Il a été mordu par un chien.</p></div><div><h4>de</h4><p>Состояние, чувства, описание.</p><p lang="fr">Elle est aimée de tous. La table est couverte de livres.</p></div></div>

<h3>on</h3>
<ul class="ex-l">
<li><span lang="fr">On a construit un nouveau pont.</span><span class="tr">Построили новый мост (кто — неважно).</span></li>
<li><span lang="fr">Ici, on parle français.</span><span class="tr">Здесь говорят по-французски.</span></li>
<li><span lang="fr">On va au cinéma ce soir ?</span><span class="tr">Пойдём в кино? (разговорное «on» = nous)</span></li>
</ul>
<div class="ichika">В разговоре французы почти всегда говорят <span lang="fr">on</span> вместо <span lang="fr">nous</span> ♡ <span lang="fr">On y va !</span> — «Пошли!» Глагол при этом в третьем лице единственного числа, а прилагательное может согласоваться по смыслу: <span lang="fr">On est fatigués.</span></div>

<h3>Местоименный пассив</h3>
<ul class="ex-l">
<li><span lang="fr">Ce livre se vend bien.</span><span class="tr">Эта книга хорошо продаётся.</span></li>
<li><span lang="fr">Ce vin se boit frais.</span><span class="tr">Это вино пьют охлаждённым.</span></li>
<li><span lang="fr">Ça ne se fait pas !</span><span class="tr">Так не делают! (норма поведения)</span></li>
<li><span lang="fr">Ce mot ne s’écrit pas comme ça.</span><span class="tr">Это слово так не пишется.</span></li>
</ul>

<h3>se faire + инфинитив</h3>
<div class="tbl"><table><thead><tr><th>Пример</th><th>Значение</th></tr></thead><tbody>
<tr><td lang="fr">Il s’est fait voler son portefeuille.</td><td>У него украли кошелёк (с ним случилось).</td></tr>
<tr><td lang="fr">Je me suis fait couper les cheveux.</td><td>Я подстригся (у парикмахера).</td></tr>
<tr><td lang="fr">Elle s’est fait remarquer.</td><td>Она привлекла к себе внимание.</td></tr>
</tbody></table></div>
<div class="warn"><p>В <span lang="fr">se faire + инфинитив</span> причастие fait не согласуется: <span lang="fr">Elle s’est fait couper les cheveux</span>, а не <s>faite</s>.</p></div>
<div class="ayano">Выбор зависит от стиля. В новостях и официальных текстах — пассив и местоименный пассив. В разговоре — on. В рассказах о неприятностях — se faire. Если переводишь русское неопределённо-личное «построили», «говорят», по умолчанию бери on: это самая естественная французская замена.</div>
`,
  p: [
    { q: 'В пассив: <span lang="fr">Le directeur a signé le contrat.</span>', a: '<span lang="fr">Le contrat a été signé par le directeur.</span>' },
    { q: 'В пассив: <span lang="fr">Tout le monde respecte cette professeure.</span>', a: '<span lang="fr">Cette professeure est respectée de tous.</span>' },
    { q: 'Через on: <span lang="fr">Le musée a été rénové.</span>', a: '<span lang="fr">On a rénové le musée.</span>' },
    { q: 'Местоименный пассив: «Этот суп едят горячим».', a: '<span lang="fr">Cette soupe se mange chaude.</span>' },
    { q: 'se faire: «У неё украли сумку».', a: '<span lang="fr">Elle s’est fait voler son sac.</span>' },
    { q: 'Переведи: «Так не говорят».', a: '<span lang="fr">Ça ne se dit pas.</span>' }
  ],
  q: [
    { q: '<span lang="fr">Les résultats ___ publiés demain.</span>', o: ['sont', 'seront', 'ont été', 'étaient'], a: 1, e: 'Будущее — seront.' },
    { q: '<span lang="fr">La montagne est couverte ___ neige.</span>', o: ['par', 'de', 'avec', 'en'], a: 1, e: 'Описание состояния — de.' },
    { q: '<span lang="fr">Ici, ___ ne fume pas.</span>', o: ['nous', 'on', 'il', 'ils'], a: 1, e: 'Неопределённо-личное.' },
    { q: '<span lang="fr">Ce mot ___ prononce comment ?</span>', o: ['se', 'on', 'est', 's’est'], a: 0, e: 'Местоименный пассив.' },
    { q: '<span lang="fr">Elle s’est ___ couper les cheveux.</span>', o: ['faite', 'fait', 'faites', 'faits'], a: 1, e: 'fait не согласуется.' }
  ],
  s: [
    'Пассив = être (в нужном времени) + participe passé, согласование с подлежащим.',
    'par — действие; de — состояние, чувства (aimé de tous, couvert de neige).',
    'on — неопределённо-личное и разговорное «мы».',
    'Местоименный пассив: Ce livre se vend bien. Ça ne se fait pas.',
    'se faire + инфинитив: Il s’est fait voler… (fait не согласуется).',
    'Новости — пассив; разговор — on; неприятности — se faire.'
  ]
});
