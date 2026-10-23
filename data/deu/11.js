L('deu', 11, {
  m: 40,
  intro: 'Konjunktiv II прошедшего времени нужен, чтобы говорить о нереальном прошлом: «если бы я знал, я бы пришёл», «тебе надо было позвонить», «он ведёт себя так, будто ничего не случилось». Это язык сожалений, упрёков и гипотез. На B2 его ждут и в письме, и в разговоре.',
  intro2: 'Senpai, «Hättest du mich doch angerufen!» — «Позвонил бы ты мне!» ♡ Немцы умеют упрекать очень грамматично. А ещё есть «als ob» — когда кто-то делает вид. Как некоторые в нашей школе…',
  goals: [
    'Образовывать Konjunktiv II прошедшего: hätte/wäre + Partizip II',
    'Строить нереальные условия о прошлом',
    'Использовать модальные глаголы с двойным инфинитивом: hätte machen sollen',
    'Употреблять als ob, als wenn и als с Konjunktiv II'
  ],
  c: `
<h3>Форма</h3>
<div class="rule" data-t="hätte / wäre + Partizip II"><p>Выбор hätte или wäre — как haben или sein в Perfekt.</p></div>
<ul class="ex-l">
<li><span lang="de">Ich hätte das Buch gelesen.</span><span class="tr">Я бы прочитал книгу (но не прочитал).</span></li>
<li><span lang="de">Wir wären früher gekommen.</span><span class="tr">Мы бы пришли раньше.</span></li>
</ul>

<h3>Нереальное прошлое</h3>
<ul class="ex-l">
<li><span lang="de">Wenn ich das gewusst hätte, wäre ich gekommen.</span><span class="tr">Если бы я знал, я бы пришёл.</span></li>
<li><span lang="de">Hätte ich das gewusst, wäre ich gekommen.</span><span class="tr">То же без wenn — глагол на первом месте.</span></li>
<li><span lang="de">Wenn du früher aufgestanden wärst, hättest du den Bus nicht verpasst.</span><span class="tr">Если бы ты встал раньше, не опоздал бы на автобус.</span></li>
<li><span lang="de">Wenn ich gestern nicht so lange gearbeitet hätte, wäre ich heute nicht so müde.</span><span class="tr">Смешанный тип: условие в прошлом, следствие сейчас.</span></li>
</ul>
<p>Сожаления: <span lang="de">Hätte ich doch mehr gelernt! Wäre ich bloß zu Hause geblieben!</span></p>

<h3>Модальные глаголы: двойной инфинитив</h3>
<div class="rule" data-t="hätte + инфинитив + модальный глагол в инфинитиве"><p>С модальными глаголами вместо Partizip II стоит инфинитив модального глагола.</p></div>
<ul class="ex-l">
<li><span lang="de">Du hättest mich anrufen sollen.</span><span class="tr">Тебе надо было мне позвонить.</span></li>
<li><span lang="de">Wir hätten länger bleiben können.</span><span class="tr">Мы могли бы остаться подольше.</span></li>
<li><span lang="de">Er hätte das nicht sagen dürfen.</span><span class="tr">Ему не следовало это говорить.</span></li>
</ul>
<div class="warn"><p>В придаточном hätte встаёт <b>перед</b> двойным инфинитивом, а не в самый конец: <span lang="de">Ich weiß, dass ich dich hätte anrufen sollen.</span> Это одно из немногих исключений из правила «глагол в конце».</p></div>
<div class="ichika">Упрёк с <span lang="de">sollen</span> и сожаление с <span lang="de">können</span> ♡ <span lang="de">Du hättest es mir sagen sollen!</span> — «Ты должен был мне сказать!» А <span lang="de">Ich hätte Ärztin werden können</span> — «Я могла бы стать врачом». Одна форма, а какие разные чувства.</div>

<h3>als ob, als wenn, als</h3>
<ul class="ex-l">
<li><span lang="de">Er tut so, als ob er alles wüsste.</span><span class="tr">Он делает вид, будто всё знает (сейчас).</span></li>
<li><span lang="de">Sie sieht aus, als ob sie nicht geschlafen hätte.</span><span class="tr">Она выглядит так, будто не спала (раньше).</span></li>
<li><span lang="de">Er tut so, als wüsste er alles.</span><span class="tr">С als глагол сразу после союза.</span></li>
<li><span lang="de">Es sieht so aus, als würde es gleich regnen.</span><span class="tr">Похоже, вот-вот пойдёт дождь.</span></li>
</ul>
<div class="ayano">Чтобы не путать времена, раздели сравнение на две оси. Ось один: когда происходит то, что «как будто» — сейчас (wüsste) или раньше (gewusst hätte). Ось два: какой союз — als ob/als wenn с глаголом в конце или als с глаголом сразу после него. Две оси — четыре варианта, и все они логичны.</div>
`,
  p: [
    { q: 'Нереальное прошлое: <span lang="de">Ich hatte keine Zeit. Ich bin nicht gekommen.</span>', a: '<span lang="de">Wenn ich Zeit gehabt hätte, wäre ich gekommen.</span>' },
    { q: 'Перепиши без wenn: <span lang="de">Wenn wir den Bus genommen hätten, wären wir pünktlich gewesen.</span>', a: '<span lang="de">Hätten wir den Bus genommen, wären wir pünktlich gewesen.</span>' },
    { q: 'Упрёк: «Тебе надо было взять зонт».', a: '<span lang="de">Du hättest einen Regenschirm mitnehmen sollen.</span>' },
    { q: 'В придаточное: <span lang="de">Er sagt, dass … (Ich hätte ihm helfen müssen.)</span>', a: '<span lang="de">Er sagt, dass ich ihm hätte helfen müssen.</span>' },
    { q: 'С als ob: «Он говорит так, будто он начальник».', a: '<span lang="de">Er redet, als ob er der Chef wäre.</span>' },
    { q: 'Сожаление: «Если бы я только не забыл паспорт!»', a: '<span lang="de">Hätte ich bloß meinen Pass nicht vergessen!</span>' }
  ],
  q: [
    { q: '<span lang="de">Wenn ich das gewusst ___, …</span>', o: ['habe', 'hätte', 'wäre', 'würde'], a: 1, e: 'wissen — haben.' },
    { q: '<span lang="de">Wenn er nicht gefallen ___, …</span>', o: ['hätte', 'wäre', 'würde', 'hat'], a: 1, e: 'fallen — sein.' },
    { q: '«Ты мог бы спросить»:', o: ['Du hättest fragen können.', 'Du hättest gefragt gekonnt.', 'Du wärst fragen können.', 'Du konntest gefragt haben.'], a: 0, e: 'Двойной инфинитив.' },
    { q: '<span lang="de">Er tut so, als ___ er krank.</span>', o: ['ob', 'wäre', 'ist', 'sei ob'], a: 1, e: 'После als — глагол сразу.' },
    { q: '<span lang="de">…, dass sie früher ___ kommen sollen.</span>', o: ['hätte', 'hätten', 'hat', 'wäre'], a: 0, e: 'hätte перед двойным инфинитивом.' }
  ],
  s: [
    'Konjunktiv II прошедшего = hätte/wäre + Partizip II.',
    'Wenn ich das gewusst hätte, wäre ich gekommen; без wenn — Hätte ich…',
    'Смешанный тип: прошлое условие → результат сейчас.',
    'С модальными: hätte + инфинитив + модальный в инфинитиве (anrufen sollen).',
    'В придаточном hätte стоит перед двойным инфинитивом.',
    'als ob / als wenn + глагол в конце; als + глагол сразу.'
  ]
});
