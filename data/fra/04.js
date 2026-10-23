L('fra', 4, {
  m: 35,
  intro: 'О будущем во французском говорят тремя способами. Futur proche — «собираюсь сделать», ближайшие планы. Futur simple — прогнозы, обещания, официальные планы. Futur antérieur — действие, которое завершится к определённому моменту в будущем. Плюс важная особенность: после quand и dès que о будущем говорят в будущем времени, а не в настоящем, как в английском.',
  intro2: 'Senpai, «Quand je serai grande, je serai astronaute» ♡ Во французском даже после «когда» будущее остаётся будущим. Логично, правда? Сегодня строим планы на будущее — по-французски!',
  goals: [
    'Образовывать futur simple, включая неправильные основы',
    'Выбирать между futur proche и futur simple',
    'Образовывать и использовать futur antérieur',
    'Использовать будущее после quand, lorsque, dès que'
  ],
  c: `
<h3>Futur simple</h3>
<div class="rule" data-t="инфинитив + -ai, -as, -a, -ons, -ez, -ont"><p>У глаголов на -re отбрасывается e: prendre → je prendrai. Окончания похожи на présent глагола avoir.</p></div>
<div class="tbl"><table><thead><tr><th>Глагол</th><th>Основа</th><th>Глагол</th><th>Основа</th></tr></thead><tbody>
<tr><td lang="fr">être</td><td lang="fr">ser- (je serai)</td><td lang="fr">pouvoir</td><td lang="fr">pourr-</td></tr>
<tr><td lang="fr">avoir</td><td lang="fr">aur-</td><td lang="fr">vouloir</td><td lang="fr">voudr-</td></tr>
<tr><td lang="fr">aller</td><td lang="fr">ir-</td><td lang="fr">venir</td><td lang="fr">viendr-</td></tr>
<tr><td lang="fr">faire</td><td lang="fr">fer-</td><td lang="fr">voir</td><td lang="fr">verr-</td></tr>
<tr><td lang="fr">savoir</td><td lang="fr">saur-</td><td lang="fr">devoir</td><td lang="fr">devr-</td></tr>
<tr><td lang="fr">falloir</td><td lang="fr">faudr- (il faudra)</td><td lang="fr">envoyer</td><td lang="fr">enverr-</td></tr>
</tbody></table></div>

<h3>Futur proche или futur simple</h3>
<div class="two"><div><h4>Futur proche: aller + инфинитив</h4><p>Ближайшее, уже решённое, разговорное.</p><p lang="fr">Attention, il va tomber !</p><p lang="fr">Ce soir, je vais regarder un film.</p></div><div><h4>Futur simple</h4><p>Прогнозы, обещания, далёкое будущее, официальный стиль.</p><p lang="fr">Demain, il pleuvra dans le nord.</p><p lang="fr">Je t’aiderai, c’est promis.</p></div></div>
<div class="ichika">В живом разговоре французы очень любят futur proche ♡ <span lang="fr">On va voir !</span> — «посмотрим!» А futur simple звучит чуть торжественнее: прогноз погоды, клятвы, планы правительства. И, конечно, романтика: <span lang="fr">Je t’aimerai toujours.</span></div>

<h3>Futur antérieur</h3>
<div class="rule" data-t="avoir / être (futur simple) + participe passé"><p>Действие завершится раньше другого будущего действия или к определённому моменту.</p></div>
<ul class="ex-l">
<li><span lang="fr">Quand tu auras fini tes devoirs, tu pourras sortir.</span><span class="tr">Когда закончишь уроки, сможешь пойти гулять.</span></li>
<li><span lang="fr">À 20 heures, nous serons arrivés à Lyon.</span><span class="tr">К восьми вечера мы уже приедем в Лион.</span></li>
<li><span lang="fr">Il n’est pas là ? Il aura oublié.</span><span class="tr">Его нет? Наверное, забыл (предположение о прошлом).</span></li>
</ul>

<h3>Будущее после quand</h3>
<div class="warn"><p>После <span lang="fr">quand, lorsque, dès que, aussitôt que, tant que</span> о будущем говорят в будущем времени: <span lang="fr">Quand je serai à Paris, je t’appellerai.</span> Нельзя: <s>Quand je suis à Paris, je t’appellerai</s>. Но после <span lang="fr">si</span> (если) — настоящее: <span lang="fr">Si j’ai le temps, je t’appellerai.</span></p></div>
<div class="ayano">Чтобы выучить неправильные основы futur, не учи двенадцать форм по отдельности. Заметь, что почти все они заканчиваются на -r- или -rr-: ser, aur, ir, fer, pourr, verr, enverr, voudr, viendr. Это звуковой «маркер будущего». Произнеси их подряд вслух несколько раз — запомнится ритмом.</div>
`,
  p: [
    { q: 'Futur simple: <span lang="fr">Nous (avoir) des vacances en juillet.</span>', a: '<span lang="fr">Nous aurons des vacances en juillet.</span>' },
    { q: 'Futur simple: <span lang="fr">Je (faire) de mon mieux.</span>', a: '<span lang="fr">Je ferai de mon mieux.</span>' },
    { q: 'Futur proche: «Я сейчас позвоню маме».', a: '<span lang="fr">Je vais appeler ma mère.</span>' },
    { q: 'Время после quand: <span lang="fr">Quand tu (être) grand, tu comprendras.</span>', a: '<span lang="fr">Quand tu seras grand, tu comprendras.</span>' },
    { q: 'Futur antérieur: <span lang="fr">Dès que je (finir), je t’enverrai le fichier.</span>', a: '<span lang="fr">Dès que j’aurai fini, je t’enverrai le fichier.</span>' },
    { q: 'Переведи: «Если будет хорошая погода, мы пойдём в парк».', a: '<span lang="fr">S’il fait beau, nous irons au parc.</span>' }
  ],
  q: [
    { q: 'Futur simple от voir (je):', o: ['je voirai', 'je verrai', 'je voyerai', 'je vais voir — единственный вариант'], a: 1, e: 'Основа verr-.' },
    { q: 'Futur simple от aller (nous):', o: ['nous allerons', 'nous irons', 'nous irions', 'nous allons'], a: 1, e: 'Основа ir-.' },
    { q: '<span lang="fr">Quand il ___, nous mangerons.</span>', o: ['arrive', 'arrivera', 'arrivait', 'arriverait'], a: 1, e: 'Будущее после quand.' },
    { q: '<span lang="fr">Si tu ___, je viendrai.</span>', o: ['veux', 'voudras', 'voudrais', 'veuilles'], a: 0, e: 'После si — présent.' },
    { q: '<span lang="fr">Quand j’___ mon bac, je partirai en voyage.</span>', o: ['ai', 'aurai eu', 'avais', 'aurais'], a: 1, e: 'Futur antérieur — раньше другого будущего.' }
  ],
  s: [
    'Futur simple = инфинитив + -ai, -as, -a, -ons, -ez, -ont.',
    'Неправильные основы: ser-, aur-, ir-, fer-, pourr-, voudr-, viendr-, verr-, saur-, devr-.',
    'Futur proche (aller + инф.) — ближайшее и разговорное; futur simple — прогнозы, обещания.',
    'Futur antérieur = aurai/serai + причастие: завершится раньше другого будущего.',
    'После quand, lorsque, dès que — будущее время.',
    'После si (если) — présent.'
  ]
});
