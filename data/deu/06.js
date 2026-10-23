L('deu', 6, {
  m: 40,
  intro: 'Konjunktiv II — немецкое сослагательное наклонение, «бы» в русском. Без него невозможно вежливо попросить, дать совет, помечтать или описать нереальную ситуацию. Хорошая новость: в большинстве случаев достаточно конструкции würde + инфинитив, а собственные формы нужны лишь десятку частых глаголов.',
  intro2: 'Senpai, «Ich hätte gern einen Kaffee» — и официант улыбается ♡ А «Ich will Kaffee» звучит как требование. Одно маленькое hätte — и ты вежливый немец. Учим магические слова!',
  goals: [
    'Образовывать Konjunktiv II с würde и собственные формы частых глаголов',
    'Вежливо просить и предлагать: Könnten Sie…? Hätten Sie…?',
    'Выражать желания и давать советы',
    'Строить нереальные условные предложения в настоящем'
  ],
  c: `
<h3>Формы</h3>
<div class="rule" data-t="würde + Infinitiv"><p>Универсальная форма для большинства глаголов: <span lang="de">ich würde kommen, du würdest kommen, er würde kommen, wir würden kommen</span>.</p></div>
<div class="tbl"><table><thead><tr><th>Глагол</th><th>Präteritum</th><th>Konjunktiv II</th></tr></thead><tbody>
<tr><td lang="de">sein</td><td lang="de">war</td><td lang="de">wäre</td></tr>
<tr><td lang="de">haben</td><td lang="de">hatte</td><td lang="de">hätte</td></tr>
<tr><td lang="de">können</td><td lang="de">konnte</td><td lang="de">könnte</td></tr>
<tr><td lang="de">müssen</td><td lang="de">musste</td><td lang="de">müsste</td></tr>
<tr><td lang="de">dürfen</td><td lang="de">durfte</td><td lang="de">dürfte</td></tr>
<tr><td lang="de">sollen / wollen</td><td lang="de">sollte / wollte</td><td lang="de">sollte / wollte (совпадают)</td></tr>
<tr><td lang="de">wissen, kommen, gehen, geben</td><td lang="de">wusste, kam, ging, gab</td><td lang="de">wüsste, käme, ginge, gäbe</td></tr>
</tbody></table></div>
<p>С sein, haben и модальными глаголами würde не используют: <span lang="de">ich wäre</span>, а не <s>ich würde sein</s>.</p>

<h3>Вежливость</h3>
<ul class="ex-l">
<li><span lang="de">Könnten Sie mir bitte helfen?</span><span class="tr">Не могли бы вы мне помочь?</span></li>
<li><span lang="de">Hätten Sie einen Moment Zeit?</span><span class="tr">У вас не найдётся минутки?</span></li>
<li><span lang="de">Ich hätte gern ein Stück Kuchen.</span><span class="tr">Я бы хотел кусок пирога.</span></li>
<li><span lang="de">Würden Sie bitte das Fenster schließen?</span><span class="tr">Не закроете ли окно?</span></li>
<li><span lang="de">Dürfte ich kurz stören?</span><span class="tr">Можно вас ненадолго отвлечь? (очень вежливо)</span></li>
</ul>
<div class="ichika">Шкала вежливости ♡ <span lang="de">Hilf mir!</span> — приказ. <span lang="de">Kannst du mir helfen?</span> — по-дружески. <span lang="de">Könntest du mir helfen?</span> — мягко. <span lang="de">Könnten Sie mir vielleicht helfen?</span> — супервежливо. С незнакомыми выбирай последние два!</div>

<h3>Желания и советы</h3>
<ul class="ex-l">
<li><span lang="de">Wenn ich doch mehr Zeit hätte!</span><span class="tr">Если бы у меня было больше времени!</span></li>
<li><span lang="de">Ich wünschte, du wärst hier.</span><span class="tr">Жаль, что тебя здесь нет.</span></li>
<li><span lang="de">Du solltest mehr schlafen.</span><span class="tr">Тебе следовало бы больше спать.</span></li>
<li><span lang="de">An deiner Stelle würde ich den Arzt anrufen.</span><span class="tr">На твоём месте я бы позвонил врачу.</span></li>
</ul>

<h3>Нереальные условия</h3>
<div class="rule" data-t="Wenn + Konjunktiv II …, (dann) + Konjunktiv II"><p>Ситуация в настоящем или будущем, которая маловероятна или невозможна.</p></div>
<ul class="ex-l">
<li><span lang="de">Wenn ich reich wäre, würde ich um die Welt reisen.</span><span class="tr">Если бы я был богат, я бы путешествовал по миру.</span></li>
<li><span lang="de">Wenn es nicht regnen würde, könnten wir grillen.</span><span class="tr">Если бы не дождь, мы бы жарили шашлыки.</span></li>
<li><span lang="de">Hätte ich ein Auto, würde ich dich abholen.</span><span class="tr">Без wenn — глагол на первом месте.</span></li>
</ul>
<div class="warn"><p>Сравни реальное и нереальное: <span lang="de">Wenn ich Zeit habe, komme ich</span> (вполне возможно) и <span lang="de">Wenn ich Zeit hätte, würde ich kommen</span> (времени нет). Русское «если» одно, а в немецком выбор формы показывает твою оценку ситуации.</p></div>
<div class="ayano">Достаточно выучить шесть форм: wäre, hätte, könnte, müsste, sollte, würde. Ими можно выразить почти всё: просьбу, совет, мечту, условие. Остальные собственные формы — wüsste, käme, ginge — нужны для чтения и стиля, их можно добавлять постепенно.</div>
`,
  p: [
    { q: 'Сделай вежливее: <span lang="de">Können Sie das wiederholen?</span>', a: '<span lang="de">Könnten Sie das bitte wiederholen?</span>' },
    { q: 'Закажи вежливо: «Я бы хотел чай».', a: '<span lang="de">Ich hätte gern einen Tee.</span>' },
    { q: 'Дай совет: друг всё время устаёт.', a: '<span lang="de">Du solltest früher ins Bett gehen.</span> / <span lang="de">An deiner Stelle würde ich mehr schlafen.</span>' },
    { q: 'Нереальное условие: <span lang="de">Ich habe kein Geld. Ich kaufe kein neues Handy.</span>', a: '<span lang="de">Wenn ich Geld hätte, würde ich ein neues Handy kaufen.</span>' },
    { q: 'Выскажи желание: «Если бы сейчас было лето!»', a: '<span lang="de">Wenn doch jetzt Sommer wäre!</span>' },
    { q: 'Перепиши без wenn: <span lang="de">Wenn ich Zeit hätte, würde ich kommen.</span>', a: '<span lang="de">Hätte ich Zeit, würde ich kommen.</span>' }
  ],
  q: [
    { q: 'Konjunktiv II от sein (ich):', o: ['würde sein', 'wäre', 'war', 'sei'], a: 1, e: 'wäre.' },
    { q: 'Самая вежливая просьба:', o: ['Gib mir das!', 'Kannst du mir das geben?', 'Könnten Sie mir das bitte geben?', 'Sie geben mir das.'], a: 2, e: 'Konjunktiv II + bitte.' },
    { q: '<span lang="de">Wenn ich du ___, würde ich das nicht machen.</span>', o: ['bin', 'wäre', 'war', 'würde'], a: 1, e: 'Нереальное условие.' },
    { q: '«Тебе следовало бы» —', o: ['Du musst', 'Du solltest', 'Du willst', 'Du darfst'], a: 1, e: 'Совет.' },
    { q: 'Konjunktiv II от wissen (ich):', o: ['wusste', 'wüsste', 'würde wissen — единственный вариант', 'weiß'], a: 1, e: 'wüsste.' }
  ],
  s: [
    'Konjunktiv II: würde + инфинитив или собственные формы.',
    'Собственные: wäre, hätte, könnte, müsste, dürfte, sollte, wüsste, käme.',
    'Вежливость: Könnten Sie…? Hätten Sie…? Ich hätte gern…',
    'Совет: Du solltest… An deiner Stelle würde ich…',
    'Желание: Wenn ich doch… hätte! Ich wünschte, …',
    'Нереальное условие: Wenn ich reich wäre, würde ich…'
  ]
});
