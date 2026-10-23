L('fra', 11, {
  m: 35,
  intro: 'Conditionnel passé — язык сожалений, упрёков и нереального прошлого: «я должен был», «ты мог бы предупредить», «если бы я знал, я бы пришёл». А в новостях он сообщает о непроверенных событиях в прошлом: «авария якобы унесла три жизни». На B2 эта форма нужна и в разговоре, и в письме.',
  intro2: 'Senpai, «J’aurais dû t’écouter…» — «Мне следовало тебя послушать» ♡ Самая частая фраза после неудачного решения. Сегодня научимся сожалеть красиво. И упрекать тоже — но вежливо!',
  goals: [
    'Образовывать conditionnel passé',
    'Выражать сожаление и упрёк: j’aurais dû, tu aurais pu',
    'Строить нереальные условия в прошлом и смешанный тип',
    'Понимать conditionnel passé в новостях'
  ],
  c: `
<h3>Образование</h3>
<div class="rule" data-t="avoir / être (conditionnel présent) + participe passé"><p><span lang="fr">j’aurais fait, tu aurais dit, elle serait venue, nous serions partis</span>. Выбор avoir/être и согласование — как в passé composé.</p></div>

<h3>Сожаление и упрёк</h3>
<div class="tbl"><table><thead><tr><th>Форма</th><th>Значение</th><th>Пример</th></tr></thead><tbody>
<tr><td lang="fr">j’aurais dû + инфинитив</td><td>мне следовало</td><td lang="fr">J’aurais dû partir plus tôt.</td></tr>
<tr><td lang="fr">tu aurais pu + инфинитив</td><td>ты мог бы (упрёк)</td><td lang="fr">Tu aurais pu me prévenir !</td></tr>
<tr><td lang="fr">j’aurais aimé / voulu</td><td>мне бы хотелось (несбывшееся)</td><td lang="fr">J’aurais aimé être là.</td></tr>
<tr><td lang="fr">il aurait mieux valu</td><td>лучше было бы</td><td lang="fr">Il aurait mieux valu ne rien dire.</td></tr>
</tbody></table></div>
<div class="ichika">Интонация всё решает ♡ <span lang="fr">Tu aurais pu m’appeler !</span> с возмущением — упрёк. А <span lang="fr">Ça aurait pu être pire</span> — утешение: «могло быть и хуже». Одна форма — две разные эмоции.</div>

<h3>Нереальное прошлое</h3>
<div class="rule" data-t="si + plus-que-parfait → conditionnel passé"><p>Условие и результат — оба в прошлом и не осуществились.</p></div>
<ul class="ex-l">
<li><span lang="fr">Si j’avais su, je serais venu.</span><span class="tr">Если бы я знал, я бы пришёл.</span></li>
<li><span lang="fr">Si tu m’avais demandé, je t’aurais aidé.</span><span class="tr">Если бы ты попросил, я бы помог.</span></li>
<li><span lang="fr">Si nous étions partis à l’heure, nous n’aurions pas raté le train.</span><span class="tr">Если бы мы вышли вовремя, не опоздали бы на поезд.</span></li>
</ul>
<div class="tbl"><table><thead><tr><th>Смешанный тип</th><th>Пример</th></tr></thead><tbody>
<tr><td>прошлое условие → результат сейчас</td><td lang="fr">Si j’avais étudié le droit, je serais avocat aujourd’hui.</td></tr>
<tr><td>постоянное условие → результат в прошлом</td><td lang="fr">Si j’étais plus courageux, je lui aurais dit la vérité.</td></tr>
</tbody></table></div>
<div class="warn"><p>Снова: после si — никакого conditionnel. Неверно: <s>Si j’aurais su…</s> Это одна из самых известных ошибок, над ней шутят даже во французских школах.</p></div>

<h3>Conditionnel passé в новостях</h3>
<ul class="ex-l">
<li><span lang="fr">L’accident aurait fait trois blessés.</span><span class="tr">По предварительным данным, в аварии пострадали три человека.</span></li>
<li><span lang="fr">Le suspect se serait enfui à l’étranger.</span><span class="tr">Подозреваемый, предположительно, бежал за границу.</span></li>
</ul>
<div class="ayano">Хороший способ тренировки — «анализ ошибок». Вспомни три своих решения за последний месяц, которые пошли не так, и опиши каждое двумя фразами: <span lang="fr">J’aurais dû …</span> и <span lang="fr">Si j’avais …, je …</span>. Это сразу и грамматика, и полезная привычка разбирать собственные ошибки.</div>
`,
  p: [
    { q: 'Сожаление: «Мне следовало взять зонт».', a: '<span lang="fr">J’aurais dû prendre un parapluie.</span>' },
    { q: 'Упрёк: «Ты мог бы сказать мне правду!»', a: '<span lang="fr">Tu aurais pu me dire la vérité !</span>' },
    { q: 'Нереальное прошлое: <span lang="fr">Je n’ai pas révisé. J’ai raté l’examen.</span>', a: '<span lang="fr">Si j’avais révisé, je n’aurais pas raté l’examen.</span>' },
    { q: 'Нереальное прошлое: <span lang="fr">Elle n’est pas venue. Elle n’a pas vu le spectacle.</span>', a: '<span lang="fr">Si elle était venue, elle aurait vu le spectacle.</span>' },
    { q: 'Смешанный тип: «Если бы я тогда переехал в Лион, я бы сейчас говорил по-французски лучше».', a: '<span lang="fr">Si j’avais déménagé à Lyon, je parlerais mieux français aujourd’hui.</span>' },
    { q: 'Переведи новость: «Пожар, по предварительным данным, начался в подвале».', a: '<span lang="fr">L’incendie aurait commencé dans la cave.</span>' }
  ],
  q: [
    { q: 'Conditionnel passé от venir (elle):', o: ['elle aurait venu', 'elle serait venue', 'elle serait venu', 'elle était venue'], a: 1, e: 'venir — être, согласование.' },
    { q: '<span lang="fr">Si tu m’avais appelé, je ___ venu.</span>', o: ['serais', 'aurais', 'suis', 'serai'], a: 0, e: 'Conditionnel passé с être.' },
    { q: '«Тебе следовало» —', o: ['Tu as dû', 'Tu aurais dû', 'Tu devras', 'Tu dois'], a: 1, e: 'Сожаление/упрёк.' },
    { q: 'Ошибка:', o: ['Si j’avais su…', 'Si j’aurais su…', 'Si je savais…', 'Si je sais…'], a: 1, e: 'После si — нет conditionnel.' },
    { q: '<span lang="fr">Le ministre aurait démissionné.</span> означает:', o: ['министр ушёл бы в отставку', 'по непроверенным данным, министр ушёл в отставку', 'министр должен уйти', 'министр ушёл (точно)'], a: 1, e: 'Газетный conditionnel.' }
  ],
  s: [
    'Conditionnel passé = aurais/serais + participe passé.',
    'J’aurais dû — сожаление; Tu aurais pu — упрёк; Ça aurait pu être pire — утешение.',
    'Si + plus-que-parfait → conditionnel passé: Si j’avais su, je serais venu.',
    'Смешанный тип: Si j’avais étudié…, je serais… aujourd’hui.',
    'После si — никогда conditionnel.',
    'В новостях conditionnel passé — непроверенное событие прошлого.'
  ]
});
