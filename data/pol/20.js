L('pol', 20, {
  m: 40,
  intro: 'Порядок слов в польском свободный, но не случайный: он показывает, что в предложении известно, а что новое и важное. Кроме того, есть строгие правила для коротких безударных слов — się, mi, cię, go, — которые не могут стоять где угодно. На C1 эти тонкости отличают естественную польскую речь от «перевода с русского».',
  intro2: 'Senpai, «Kocham cię» и «Ciebie kocham» — оба «я люблю тебя» ♡ Но второе значит «именно тебя, а не другую»! Порядок слов в польском — это интонация, записанная на бумаге. Очень романтично.',
  goals: [
    'Строить предложения по принципу «известное — новое»',
    'Правильно ставить się и краткие местоимения',
    'Различать краткие и полные формы местоимений',
    'Строить деепричастные обороты без ошибок в подлежащем'
  ],
  c: `
<h3>Известное — новое</h3>
<div class="rule" data-t="Новая и важная информация — в конце"><p>Начало предложения связывает с предыдущим контекстом, конец — сообщает главное.</p></div>
<ul class="ex-l">
<li><span lang="pl">Ania kupiła książkę.</span><span class="tr">Что сделала Аня? — Купила книгу.</span></li>
<li><span lang="pl">Książkę kupiła Ania.</span><span class="tr">Кто купил книгу? — Аня.</span></li>
<li><span lang="pl">Wczoraj przyjechał do nas wujek z Ameryki.</span><span class="tr">Новое — кто приехал; в конце.</span></li>
</ul>

<h3>Краткие формы местоимений</h3>
<div class="tbl"><table><thead><tr><th>Полная (ударная)</th><th>Краткая (безударная)</th><th>Когда полная</th></tr></thead><tbody>
<tr><td lang="pl">mnie</td><td lang="pl">mi (дат.)</td><td>в начале, после предлога, при контрасте</td></tr>
<tr><td lang="pl">ciebie / tobie</td><td lang="pl">cię / ci</td><td lang="pl">Ciebie kocham, nie ją. Dam to tobie, nie jemu.</td></tr>
<tr><td lang="pl">jego / jemu</td><td lang="pl">go / mu</td><td lang="pl">Jego nie widziałem, ale ją tak.</td></tr>
</tbody></table></div>
<p>После предлогов — только полные формы: <span lang="pl">dla ciebie, do niego, z nią, o tobie</span>. Для третьего лица после предлога — формы с n-: <span lang="pl">do niego, z nim, dla niej</span>.</p>
<div class="ichika">Краткие формы прячутся в середине фразы ♡ <span lang="pl">Daj mi to!</span> — нормально. <span lang="pl">Mi to daj</span> — неправильно, краткое слово не может стоять первым. Если хочешь начать — бери полное: <span lang="pl">Mnie to daj, nie jemu!</span></div>

<h3>Место się</h3>
<ul class="ex-l">
<li><span lang="pl">Bardzo mi się podoba.</span><span class="tr">Się обычно стоит ближе к началу, после первого ударного слова.</span></li>
<li><span lang="pl">Jak się nazywasz?</span><span class="tr">Не <s>Się nazywasz…</s> — się не бывает первым.</span></li>
<li><span lang="pl">Nie wiem, jak to się nazywa.</span><span class="tr">В конце фразы się допустимо, но в стилистически тщательной речи его стараются поставить раньше: <span lang="pl">jak się to nazywa</span>.</span></li>
</ul>
<div class="warn"><p>Типичная ошибка русскоговорящих — ставить się сразу после глагола, как русское «-ся»: <span lang="pl">Ja się uczę</span> и <span lang="pl">Uczę się</span> — обе формы правильны, но <span lang="pl">Uczę się polskiego od roku</span> и <span lang="pl">Od roku uczę się polskiego</span> звучат естественнее, чем <s>Uczę polskiego się</s>.</p></div>

<h3>Деепричастные обороты</h3>
<ul class="ex-l">
<li><span lang="pl">Wracając do domu, spotkałem sąsiada.</span><span class="tr">Правильно: один и тот же человек возвращался и встретил.</span></li>
<li><span lang="pl">Przeczytawszy umowę, podpisała ją.</span><span class="tr">Книжно, но точно.</span></li>
<li><s>Będąc chorym, nikt mnie nie odwiedził.</s><span class="tr">Ошибка: болел я, а «nikt» не болел. Правильно: <span lang="pl">Kiedy byłem chory, nikt mnie nie odwiedził.</span></span></li>
</ul>
<div class="ayano">Порядок слов на C1 — это управление вниманием. Когда пишешь, задай себе вопрос: что читатель уже знает, а что я хочу ему сообщить? Известное — в начало, новое — в конец. Этот принцип работает и в польском, и в русском, поэтому русская интуиция тут скорее помогает, чем мешает.</div>
`,
  p: [
    { q: 'Ответь, выделив исполнителя: «Кто написал «Пана Тадеуша»?» — «Мицкевич».', a: '<span lang="pl">Pana Tadeusza napisał Adam Mickiewicz.</span>' },
    { q: 'Исправь: <i>Mi to się podoba.</i>', a: '<span lang="pl">Podoba mi się to.</span> / <span lang="pl">To mi się podoba.</span>' },
    { q: 'Выдели контрастом: «Я тебе это даю, а не ему».', a: '<span lang="pl">Tobie to daję, nie jemu.</span>' },
    { q: 'Поставь местоимение после предлога: <span lang="pl">To jest prezent dla (on).</span>', a: '<span lang="pl">dla niego</span>' },
    { q: 'Исправь: <i>Będąc w Krakowie, padał deszcz.</i>', a: '<span lang="pl">Kiedy byłem w Krakowie, padał deszcz.</span>' },
    { q: 'Переставь естественнее: <i>Się nazywam Anna.</i>', a: '<span lang="pl">Nazywam się Anna.</span>' }
  ],
  q: [
    { q: 'Новая информация в польском предложении обычно:', o: ['в начале', 'в конце', 'в середине', 'где угодно'], a: 1, e: 'Принцип известное — новое.' },
    { q: 'После предлога:', o: ['dla cię', 'dla ciebie', 'dla ci', 'dla tobie'], a: 1, e: 'Полная форма.' },
    { q: 'Может ли się стоять первым словом?', o: ['да', 'нет', 'только в вопросах', 'только в письме'], a: 1, e: 'Безударное слово.' },
    { q: '<span lang="pl">Idę do ___ .</span> (он)', o: ['go', 'jego', 'niego', 'mu'], a: 2, e: 'После предлога — niego.' },
    { q: 'Ошибка в деепричастии:', o: ['Czytając, słucham muzyki.', 'Będąc zmęczonym, zasnął szybko.', 'Wracając do domu, zgubiłem klucze.', 'Jadąc pociągiem, mama zadzwoniła do mnie.'], a: 3, e: 'Ехала не мама.' }
  ],
  s: [
    'Известное — в начале, новое и важное — в конце.',
    'Краткие формы (mi, cię, go, mu) не стоят первыми и не стоят после предлога.',
    'После предлогов: dla ciebie, do niego, z nią.',
    'Полные формы — при контрасте: Ciebie kocham, nie ją.',
    'się — не первым; обычно после первого ударного слова.',
    'Деепричастный оборот — только при одном подлежащем.'
  ]
});
