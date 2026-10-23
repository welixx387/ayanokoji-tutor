L('deu', 19, {
  m: 35,
  intro: 'Модальные частицы — doch, ja, mal, eben, halt, denn, wohl, schon — маленькие слова, которые не переводятся напрямую, но передают эмоцию и отношение говорящего. Без них немецкая речь звучит сухо, как из учебника. С ними — живо и естественно. Это последний штрих к разговорному C1.',
  intro2: 'Senpai, «Komm doch mit!», «Das ist ja toll!», «Mach mal Pause!» ♡ Эти словечки — как специи. Без них блюдо съедобное, но скучное. Сегодня я научу тебя солить немецкий правильно!',
  goals: [
    'Понимать значения частиц doch, ja, mal, denn, eben, halt, wohl, schon',
    'Ставить частицы на правильное место в предложении',
    'Использовать частицы для смягчения, удивления и уговоров',
    'Различать частицу doch и ответ doch на отрицательный вопрос'
  ],
  c: `
<h3>Главные частицы</h3>
<div class="tbl"><table><thead><tr><th>Частица</th><th>Оттенок</th><th>Пример</th><th>Примерно по-русски</th></tr></thead><tbody>
<tr><td lang="de">doch</td><td>уговор, возражение, напоминание</td><td lang="de">Komm doch mit! Das weißt du doch!</td><td>да пойдём же! ты же знаешь!</td></tr>
<tr><td lang="de">ja</td><td>общеизвестно; удивление</td><td lang="de">Du bist ja schon da! Das ist ja toll!</td><td>ты уже здесь! вот это да!</td></tr>
<tr><td lang="de">mal</td><td>смягчает просьбу</td><td lang="de">Kannst du mal kommen? Schau mal!</td><td>подойди-ка, глянь-ка</td></tr>
<tr><td lang="de">denn</td><td>интерес, живость в вопросе</td><td lang="de">Was machst du denn hier?</td><td>а что ты тут делаешь?</td></tr>
<tr><td lang="de">eben / halt</td><td>так уж есть, ничего не поделать</td><td lang="de">Das ist eben so. Dann musst du halt warten.</td><td>ну так уж вышло; ну подождёшь</td></tr>
<tr><td lang="de">wohl</td><td>предположение</td><td lang="de">Er ist wohl krank.</td><td>он, наверное, болен</td></tr>
<tr><td lang="de">schon</td><td>успокоение, уверенность</td><td lang="de">Das wird schon klappen.</td><td>да всё получится</td></tr>
<tr><td lang="de">eigentlich</td><td>кстати, вообще-то</td><td lang="de">Wie heißt du eigentlich?</td><td>а как тебя, кстати, зовут?</td></tr>
<tr><td lang="de">bloß / nur</td><td>предупреждение, сильное желание</td><td lang="de">Mach das bloß nicht! Wenn ich nur Zeit hätte!</td><td>только не делай этого! если б только…</td></tr>
</tbody></table></div>
<div class="ichika">Частица <span lang="de">mal</span> — лучший друг вежливости ♡ <span lang="de">Gib mir das Salz!</span> звучит как команда. <span lang="de">Gib mir mal das Salz?</span> — уже по-дружески. А <span lang="de">Könntest du mir mal das Salz geben?</span> — и вовсе мило!</div>

<h3>Место и ударение</h3>
<ul class="ex-l">
<li><span lang="de">Ich habe es dir doch gestern gesagt!</span><span class="tr">Частица — в середине предложения, обычно после местоимений.</span></li>
<li><span lang="de">Das ist ja interessant.</span><span class="tr">Частицы безударны: ударение на interessant.</span></li>
<li><span lang="de">Komm doch mal vorbei!</span><span class="tr">Можно сочетать: doch + mal — «заходи как-нибудь».</span></li>
</ul>
<div class="warn"><p>Частица никогда не стоит на первом месте. А ударное <span lang="de">DOCH</span> — это уже не частица, а ответ «нет, да!» на отрицательный вопрос: <span lang="de">Kommst du nicht? — Doch!</span> (Ты не придёшь? — Приду!)</p></div>

<h3>Один вопрос — разные эмоции</h3>
<div class="ex" data-t="Сравни"><ol><li><span lang="de">Wo bist du?</span> — нейтрально, информация.</li><li><span lang="de">Wo bist du denn?</span> — с интересом или лёгким беспокойством.</li><li><span lang="de">Wo bist du denn bloß?</span> — с тревогой: «да где же ты?!»</li></ol></div>
<div class="ayano">Частицы нельзя выучить по таблице — их нужно услышать. Смотри немецкие сериалы и выписывай фразы с частицами вместе с ситуацией: кто сказал, кому, с какой эмоцией. Начни использовать в речи только две — <span lang="de">mal</span> и <span lang="de">doch</span>. Они дают максимум естественности при минимуме риска ошибиться.</div>
`,
  p: [
    { q: 'Смягчи просьбу: <span lang="de">Hilf mir!</span>', a: '<span lang="de">Hilf mir mal!</span> / <span lang="de">Kannst du mir mal helfen?</span>' },
    { q: 'Уговори: «Да останься же ещё!»', a: '<span lang="de">Bleib doch noch!</span>' },
    { q: 'Вырази удивление: «Ты же уже дома!»', a: '<span lang="de">Du bist ja schon zu Hause!</span>' },
    { q: 'Ответь утвердительно на <span lang="de">Hast du keine Zeit?</span> (время есть)', a: '<span lang="de">Doch, ich habe Zeit.</span>' },
    { q: 'Вырази смирение: «Ну так уж вышло».', a: '<span lang="de">Das ist eben so.</span> / <span lang="de">Das ist halt so.</span>' },
    { q: 'Выскажи предположение: «Он, наверное, опять опоздал».', a: '<span lang="de">Er hat sich wohl wieder verspätet.</span>' }
  ],
  q: [
    { q: 'Частица, смягчающая просьбу:', o: ['denn', 'mal', 'wohl', 'eben'], a: 1, e: 'Schau mal!' },
    { q: '<span lang="de">Kommst du nicht mit? — ___, ich komme!</span>', o: ['Ja', 'Doch', 'Nein', 'Schon'], a: 1, e: 'Возражение на отрицательный вопрос.' },
    { q: 'Частица для предположения:', o: ['wohl', 'mal', 'ja', 'bloß'], a: 0, e: 'Er ist wohl krank.' },
    { q: '<span lang="de">Was ist ___ los?</span> — живой интерес', o: ['denn', 'halt', 'mal', 'eben'], a: 0, e: 'denn в вопросе.' },
    { q: 'Может ли частица стоять на первом месте?', o: ['да, всегда', 'нет', 'только doch', 'только mal'], a: 1, e: 'Только в середине предложения.' }
  ],
  s: [
    'Модальные частицы передают отношение говорящего.',
    'doch — уговор/возражение; ja — известно/удивление; mal — смягчение.',
    'denn — интерес в вопросе; eben/halt — так уж есть; wohl — предположение.',
    'schon — успокоение; eigentlich — кстати; bloß/nur — предупреждение, желание.',
    'Частицы безударны и стоят в середине предложения.',
    'Ударное Doch! — утвердительный ответ на отрицательный вопрос.'
  ]
});
