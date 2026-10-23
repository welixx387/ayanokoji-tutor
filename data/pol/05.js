L('pol', 5, {
  m: 35,
  intro: 'Будущее время в польском строится по той же логике, что в русском: для несовершенного вида — «буду делать», для совершенного — «сделаю». Но у польского «будущего сложного» есть две формы: będę robić и będę robił. А выбор вида в просьбах, после глаголов начала и конца и в отрицании — отдельная тема, в которой русская интуиция помогает лишь отчасти.',
  intro2: 'Senpai, «Będę na ciebie czekać» — «Я буду тебя ждать» ♡ А «Zadzwonię jutro» — «Позвоню завтра». Совсем как в русском! Но есть пара хитростей, на которых спотыкаются даже очень умные студенты. Как ты.',
  goals: [
    'Образовывать будущее время несовершенного вида двумя способами',
    'Образовывать будущее время совершенного вида',
    'Выбирать вид в будущем, после zacząć/skończyć и в отрицании',
    'Знать спряжение być в будущем'
  ],
  c: `
<h3>Będę + …</h3>
<div class="tbl"><table><thead><tr><th>Лицо</th><th>być</th><th>Пример (несов. вид)</th></tr></thead><tbody>
<tr><td lang="pl">ja</td><td lang="pl">będę</td><td lang="pl">będę czytać / będę czytał(a)</td></tr>
<tr><td lang="pl">ty</td><td lang="pl">będziesz</td><td lang="pl">będziesz pracować</td></tr>
<tr><td lang="pl">on / ona</td><td lang="pl">będzie</td><td lang="pl">będzie się uczyć</td></tr>
<tr><td lang="pl">my</td><td lang="pl">będziemy</td><td lang="pl">będziemy czekać / będziemy czekali</td></tr>
<tr><td lang="pl">wy</td><td lang="pl">będziecie</td><td lang="pl">będziecie mieszkać</td></tr>
<tr><td lang="pl">oni / one</td><td lang="pl">będą</td><td lang="pl">będą grać / będą grali (grały)</td></tr>
</tbody></table></div>
<p>Обе формы — с инфинитивом и с формой на -ł — правильные. С инфинитивом проще: не нужно помнить род. С модальными глаголами чаще форма на -ł: <span lang="pl">będę musiał, będziesz mogła</span>.</p>
<div class="warn"><p>Совершенный вид с będę не сочетается: <s>będę zrobić</s>. Будущее совершенного — простая форма: <span lang="pl">zrobię, napiszę, kupię</span>.</p></div>

<h3>Будущее совершенного вида</h3>
<ul class="ex-l">
<li><span lang="pl">Jutro napiszę list.</span><span class="tr">Завтра напишу письмо.</span></li>
<li><span lang="pl">Zadzwonię do ciebie wieczorem.</span><span class="tr">Позвоню тебе вечером.</span></li>
<li><span lang="pl">Kupimy bilety przez internet.</span><span class="tr">Купим билеты через интернет.</span></li>
<li><span lang="pl">Zobaczymy!</span><span class="tr">Посмотрим! (как в русском)</span></li>
</ul>
<div class="ichika">Тест «результат или процесс» работает как в русском ♡ «Завтра я буду учиться весь день» — <span lang="pl">Jutro będę się uczyć cały dzień.</span> «Завтра я выучу все слова» — <span lang="pl">Jutro nauczę się wszystkich słów.</span> Просто доверься своему русскому чутью.</div>

<h3>Выбор вида: особые случаи</h3>
<div class="tbl"><table><thead><tr><th>Ситуация</th><th>Вид</th><th>Пример</th></tr></thead><tbody>
<tr><td>После zacząć, skończyć, przestać</td><td>несовершенный инфинитив</td><td lang="pl">Zacząłem czytać. Skończyła pisać.</td></tr>
<tr><td>Повторение, привычка</td><td>несовершенный</td><td lang="pl">Będę dzwonić codziennie.</td></tr>
<tr><td>Отрицательный совет / запрет</td><td>обычно несовершенный</td><td lang="pl">Nie dzwoń do niego! Nie kupuj tego!</td></tr>
<tr><td>Однократный результат</td><td>совершенный</td><td lang="pl">Zadzwoń do mamy!</td></tr>
<tr><td>Предупреждение «как бы не»</td><td>совершенный в отрицании</td><td lang="pl">Nie zgub kluczy!</td></tr>
</tbody></table></div>

<h3>Будущее после kiedy и jeśli</h3>
<p>Как в русском: после <span lang="pl">kiedy, gdy, jeśli, jeżeli</span> о будущем говорят в будущем времени: <span lang="pl">Kiedy skończę szkołę, pojadę do Gdańska. Jeśli będzie ładna pogoda, pójdziemy na spacer.</span></p>
<div class="ayano">Будущее время в польском для русскоговорящего почти не требует новых усилий — кроме двух моментов: не ставить совершенный вид после będę и помнить форму będę/będziesz/będą. Сосредоточь силы на них и на произношении носового ę в będę: в конце слова оно звучит почти как обычное е.</div>
`,
  p: [
    { q: 'Будущее несовершенное (я, женщина): <span lang="pl">pracować w Warszawie</span>.', a: '<span lang="pl">Będę pracować w Warszawie.</span> / <span lang="pl">Będę pracowała w Warszawie.</span>' },
    { q: 'Будущее совершенное: <span lang="pl">(my) kupić prezent</span>.', a: '<span lang="pl">Kupimy prezent.</span>' },
    { q: 'Исправь: <i>Jutro będę zrobić zadanie.</i>', a: '<span lang="pl">Jutro zrobię zadanie.</span> / <span lang="pl">Jutro będę robić zadanie.</span>' },
    { q: 'Переведи: «Когда я приеду, я позвоню».', a: '<span lang="pl">Kiedy przyjadę, zadzwonię.</span>' },
    { q: 'Запрет: «Не покупай это!»', a: '<span lang="pl">Nie kupuj tego!</span>' },
    { q: 'Переведи: «Я начал учить польский».', a: '<span lang="pl">Zacząłem uczyć się polskiego.</span>' }
  ],
  q: [
    { q: '<span lang="pl">Oni ___ czekać.</span>', o: ['będzie', 'będą', 'będziemy', 'będziecie'], a: 1, e: 'oni → będą.' },
    { q: 'Будущее от napisać (ja):', o: ['będę napisać', 'napiszę', 'napisałem', 'piszę'], a: 1, e: 'Совершенный — простая форма.' },
    { q: '<span lang="pl">Skończyłem ___ .</span>', o: ['przeczytać', 'czytać', 'przeczytam', 'czytam'], a: 1, e: 'После skończyć — несовершенный.' },
    { q: 'Запрет «не звони!»:', o: ['Nie zadzwoń!', 'Nie dzwoń!', 'Nie dzwonić!', 'Nie zadzwonić!'], a: 1, e: 'Несовершенный в запрете.' },
    { q: '<span lang="pl">Jeśli ___ czas, przyjdę.</span>', o: ['mam', 'będę miał', 'miałem', 'mieć'], a: 1, e: 'Будущее после jeśli о будущем.' }
  ],
  s: [
    'Несовершенный: będę + инфинитив или форма на -ł (będę czytać / czytał).',
    'Совершенный: простая форма — zrobię, napiszę; będę + сов. вид — ошибка.',
    'być: będę, będziesz, będzie, będziemy, będziecie, będą.',
    'После zacząć, skończyć, przestać — несовершенный инфинитив.',
    'Запрет — обычно несовершенный: Nie dzwoń!; предупреждение — Nie zgub!',
    'После kiedy, jeśli о будущем — будущее время.'
  ]
});
