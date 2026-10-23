L('eng', 18, {
  m: 35,
  intro: 'В русском мы выделяем главное порядком слов и интонацией: «Это Таня разбила вазу». В английском порядок слов жёстче, поэтому для выделения есть специальные конструкции — cleft sentences, «расщеплённые» предложения. Плюс эмфатическое do, вынесение вперёд и усилители. На C1 эти средства нужны и в речи, и в письме.',
  intro2: 'Senpai, «It was Ayanokoji-kun who solved the case» — и сразу понятно, кто тут герой ♡ Сегодня научимся направлять прожектор на нужное слово. Как на сцене!',
  goals: [
    'Строить it-cleft: It was … who/that …',
    'Строить wh-cleft: What I need is …, What happened was …',
    'Использовать эмфатическое do и вынесение вперёд',
    'Применять усилители: the very, whatsoever, on earth'
  ],
  c: `
<h3>It-cleft</h3>
<div class="rule" data-t="It + be + выделяемая часть + who/that + остальное"><p>Выделить можно подлежащее, дополнение, обстоятельство.</p></div>
<p>Исходное: <span lang="en">Tom broke the vase in the kitchen yesterday.</span></p>
<ul class="ex-l">
<li><span lang="en">It was Tom who broke the vase.</span><span class="tr">Именно Том разбил вазу (а не кто-то другой).</span></li>
<li><span lang="en">It was the vase that Tom broke.</span><span class="tr">Том разбил именно вазу.</span></li>
<li><span lang="en">It was yesterday that Tom broke the vase.</span><span class="tr">Именно вчера.</span></li>
<li><span lang="en">It was in the kitchen that it happened.</span><span class="tr">Это случилось именно на кухне.</span></li>
</ul>
<p>Полезно для исправления: <span lang="en">It wasn’t me who forgot — it was you!</span> С причиной: <span lang="en">It was because of the rain that we stayed in.</span></p>

<h3>Wh-cleft</h3>
<div class="tbl"><table><thead><tr><th>Модель</th><th>Пример</th><th>Перевод</th></tr></thead><tbody>
<tr><td>What + подлежащее + глагол + be</td><td lang="en">What I need is a long holiday.</td><td>Что мне нужно, так это долгий отпуск.</td></tr>
<tr><td>What … do is (to) + V</td><td lang="en">What she did was (to) call the police.</td><td>Она взяла и вызвала полицию.</td></tr>
<tr><td>What happened was (that)</td><td lang="en">What happened was that the bus broke down.</td><td>А случилось вот что: автобус сломался.</td></tr>
<tr><td>All … is</td><td lang="en">All I want is some peace and quiet.</td><td>Всё, чего я хочу, — немного тишины.</td></tr>
<tr><td>The thing / The reason / The place</td><td lang="en">The reason (why) I called is that I need advice.</td><td>Я звоню потому, что мне нужен совет.</td></tr>
<tr><td>Обратный порядок</td><td lang="en">A long holiday is what I need.</td><td>Долгий отпуск — вот что мне нужно.</td></tr>
</tbody></table></div>
<div class="warn"><p>В формальном письме: <span lang="en">The reason is that…</span>, а не <s>The reason is because…</s>. После wh-cleft глагол be обычно согласуется с what: <span lang="en">What we need is more teachers</span> (в разговоре встречается и are).</p></div>

<h3>Другие способы выделения</h3>
<ul class="ex-l">
<li><span lang="en">I do like your new haircut!</span><span class="tr">Мне правда нравится! (эмфатическое do)</span></li>
<li><span lang="en">She did call — I saw the missed call.</span><span class="tr">Она же звонила! (возражение)</span></li>
<li><span lang="en">Do sit down.</span><span class="tr">Садитесь же, пожалуйста (тёплая вежливость).</span></li>
<li><span lang="en">That I can’t accept.</span><span class="tr">Вот этого я принять не могу (вынесение дополнения вперёд).</span></li>
<li><span lang="en">This is the very book I was looking for.</span><span class="tr">Это та самая книга.</span></li>
<li><span lang="en">There’s no evidence whatsoever.</span><span class="tr">Нет абсолютно никаких доказательств.</span></li>
<li><span lang="en">What on earth are you doing?</span><span class="tr">Что ты вообще творишь?</span></li>
</ul>
<div class="ichika">В речи главное — ударение ♡ Скажи <span lang="en">I didn’t say she stole the money</span>, каждый раз выделяя голосом другое слово. Получится: «не я говорила», «не говорила, а намекала», «не она», «не украла, а одолжила»… Попробуй вслух!</div>
<div class="ayano">Расщеплённые предложения — это управление вниманием собеседника. В презентации фраза <span lang="en">What I want to show you today is…</span> задаёт ожидание, а в споре <span lang="en">It’s not the price that worries me, it’s the quality</span> точно переносит разговор на нужную тему. Используй их как навигацию, а не украшение.</div>
`,
  p: [
    { q: 'Выдели подлежащее: <span lang="en">My brother told me the news.</span>', a: '<span lang="en">It was my brother who told me the news.</span>' },
    { q: 'Выдели время: <span lang="en">We met in 2019.</span>', a: '<span lang="en">It was in 2019 that we met.</span>' },
    { q: 'Построй wh-cleft: <span lang="en">I need some sleep.</span>', a: '<span lang="en">What I need is some sleep.</span>' },
    { q: 'Построй wh-cleft с do: <span lang="en">He sold his car.</span>', a: '<span lang="en">What he did was (to) sell his car.</span>' },
    { q: 'Возрази с эмфатическим do: «Ты не сделал домашку!» — «Сделал!»', a: '<span lang="en">I did do it!</span>' },
    { q: 'Перепиши с All: <span lang="en">I only want to sleep.</span>', a: '<span lang="en">All I want is to sleep.</span> / <span lang="en">All I want to do is sleep.</span>' }
  ],
  q: [
    { q: '<span lang="en">It was Anna ___ called you.</span>', o: ['which', 'who', 'what', 'whom'], a: 1, e: 'Выделено лицо-подлежащее.' },
    { q: '<span lang="en">___ I like about him is his honesty.</span>', o: ['That', 'What', 'Which', 'It'], a: 1, e: 'Wh-cleft.' },
    { q: 'Эмфатическое do:', o: ['I do my homework.', 'I do love this song!', 'Do you love it?', 'I don’t love it.'], a: 1, e: 'do усиливает утверждение.' },
    { q: 'Формально верно:', o: ['The reason is because he was ill.', 'The reason is that he was ill.', 'The reason is why he was ill.', 'The reason is so he was ill.'], a: 1, e: 'The reason is that…' },
    { q: '<span lang="en">There is no doubt ___.</span>', o: ['whatever', 'whatsoever', 'at least', 'on earth'], a: 1, e: 'no … whatsoever — абсолютно никакого.' }
  ],
  s: [
    'It-cleft: It was X who/that… — выделяет подлежащее, дополнение, время, место.',
    'Wh-cleft: What I need is…, What she did was (to)…, What happened was that…',
    'All I want is…; The reason (why)… is that…',
    'Эмфатическое do: I do like it, She did call, Do sit down.',
    'Вынесение вперёд и усилители: the very, whatsoever, on earth.',
    'В речи выделение делается ударением.'
  ]
});
