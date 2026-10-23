L('fra', 3, {
  m: 40,
  intro: 'Plus-que-parfait показывает, что одно действие в прошлом произошло раньше другого: «когда я пришёл, фильм уже начался». А согласование причастия прошедшего времени — одна из самых известных тем французской орфографии: когда писать «écrite», а когда «écrit». На слух разница часто не видна, но на письме её проверяют всегда.',
  intro2: 'Senpai, «Les lettres que j’ai écrites» — откуда это -es на конце? ♡ Причастие подсмотрело, о чём речь, и переоделось под письма. Французские причастия — модники. Разберёмся, когда им можно переодеваться!',
  goals: [
    'Образовывать plus-que-parfait и использовать его в рассказе',
    'Согласовывать причастие с подлежащим при être',
    'Согласовывать причастие с прямым дополнением, стоящим перед avoir',
    'Согласовывать причастие местоименных глаголов'
  ],
  c: `
<h3>Plus-que-parfait</h3>
<div class="rule" data-t="avoir / être (imparfait) + participe passé"><p>Выбор avoir/être — как в passé composé: <span lang="fr">j’avais fini, elle était partie, nous nous étions rencontrés</span>.</p></div>
<ul class="ex-l">
<li><span lang="fr">Quand je suis arrivé, le film avait déjà commencé.</span><span class="tr">Когда я пришёл, фильм уже начался.</span></li>
<li><span lang="fr">Elle était fatiguée parce qu’elle n’avait pas dormi.</span><span class="tr">Она устала, потому что не спала.</span></li>
<li><span lang="fr">Si j’avais su !</span><span class="tr">Если бы я знал! (сожаление — урок 11)</span></li>
</ul>

<h3>Согласование с être</h3>
<p>Причастие согласуется с подлежащим в роде и числе: +e для женского рода, +s для множественного.</p>
<ul class="ex-l">
<li><span lang="fr">Il est venu. Elle est venue. Ils sont venus. Elles sont venues.</span><span class="tr">Пришёл, пришла, пришли, пришли.</span></li>
</ul>

<h3>Согласование с avoir</h3>
<div class="rule" data-t="С avoir — только если прямое дополнение стоит ДО глагола"><p>Прямое дополнение (COD) может оказаться впереди в виде местоимения (la, les, l’), относительного que или в вопросе с quel.</p></div>
<div class="tbl"><table><thead><tr><th>COD после глагола — без согласования</th><th>COD перед глаголом — согласование</th></tr></thead><tbody>
<tr><td lang="fr">J’ai écrit une lettre.</td><td lang="fr">La lettre que j’ai écrite est longue.</td></tr>
<tr><td lang="fr">J’ai vu tes amies.</td><td lang="fr">Je les ai vues hier.</td></tr>
<tr><td lang="fr">Tu as acheté quelles chaussures ?</td><td lang="fr">Quelles chaussures as-tu achetées ?</td></tr>
</tbody></table></div>
<div class="warn"><p>С косвенным дополнением (lui, leur) согласования нет: <span lang="fr">Je leur ai parlé.</span> С en тоже нет: <span lang="fr">Des pommes ? J’en ai mangé.</span></p></div>
<div class="ichika">Правило «посмотри назад» ♡ Причастие с avoir оглядывается: если позади уже прозвучало, ЧТО именно, — оно согласуется. Если «что» ещё впереди — причастие не знает, под кого одеваться, и остаётся в базовой форме.</div>

<h3>Местоименные глаголы</h3>
<ul class="ex-l">
<li><span lang="fr">Elle s’est lavée.</span><span class="tr">Помылась: se — прямое дополнение (кого? себя) → согласование.</span></li>
<li><span lang="fr">Elle s’est lavé les mains.</span><span class="tr">Помыла руки: прямое дополнение — les mains после глагола → без согласования.</span></li>
<li><span lang="fr">Ils se sont parlé.</span><span class="tr">Поговорили друг с другом: parler à — se косвенное → без согласования.</span></li>
<li><span lang="fr">Elles se sont rencontrées.</span><span class="tr">Встретились: rencontrer quelqu’un — прямое → согласование.</span></li>
</ul>
<div class="ayano">На слух согласование часто не слышно — écrit и écrite звучат по-разному, а parlé и parlés одинаково. Поэтому это навык письма, а не речи. Перед сдачей текста пройди по всем причастиям с avoir и спроси: есть ли прямое дополнение и где оно стоит? Эта проверка занимает минуту и спасает баллы на DELF.</div>
`,
  p: [
    { q: 'Plus-que-parfait: <span lang="fr">Quand nous sommes arrivés, le train (partir).</span>', a: '<span lang="fr">le train était parti</span>' },
    { q: 'Plus-que-parfait: <span lang="fr">Il n’avait pas faim, il (manger) avant.</span>', a: '<span lang="fr">il avait mangé avant</span>' },
    { q: 'Согласуй: <span lang="fr">Les photos que tu as (prendre) sont belles.</span>', a: '<span lang="fr">prises</span> — que = les photos, женский мн. ч.' },
    { q: 'Согласуй: <span lang="fr">Ma voiture ? Je l’ai (vendre).</span>', a: '<span lang="fr">vendue</span>' },
    { q: 'Согласуй: <span lang="fr">Elles se sont (téléphoner).</span>', a: '<span lang="fr">téléphoné</span> — téléphoner à quelqu’un, se косвенное.' },
    { q: 'Согласуй: <span lang="fr">Marie s’est (couper) le doigt.</span>', a: '<span lang="fr">coupé</span> — прямое дополнение le doigt после глагола.' }
  ],
  q: [
    { q: 'Plus-que-parfait от finir (je):', o: ['j’ai fini', 'j’avais fini', 'je finissais', 'j’aurai fini'], a: 1, e: 'avoir в imparfait + причастие.' },
    { q: '<span lang="fr">Les fleurs que j’ai ___ .</span>', o: ['acheté', 'achetée', 'achetées', 'achetés'], a: 2, e: 'que = les fleurs (ж. р., мн. ч.).' },
    { q: '<span lang="fr">J’ai ___ une chanson.</span>', o: ['écrit', 'écrite', 'écrits', 'écrites'], a: 0, e: 'COD после глагола.' },
    { q: '<span lang="fr">Je leur ai ___ .</span>', o: ['parlé', 'parlés', 'parlées', 'parlée'], a: 0, e: 'leur — косвенное.' },
    { q: '<span lang="fr">Elle s’est ___ les cheveux.</span>', o: ['lavée', 'lavé', 'lavés', 'lavées'], a: 1, e: 'COD les cheveux после глагола.' }
  ],
  s: [
    'Plus-que-parfait = avoir/être в imparfait + participe passé: раньше другого прошедшего.',
    'С être причастие согласуется с подлежащим.',
    'С avoir — только с прямым дополнением, стоящим перед глаголом (la, les, que, quel).',
    'С lui, leur, en — без согласования.',
    'Местоименные: se прямое → согласование; se косвенное или COD после глагола → нет.',
    'Согласование — навык письма: проверяй все причастия перед сдачей текста.'
  ]
});
