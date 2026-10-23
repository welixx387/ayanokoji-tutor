L('pol', 10, {
  m: 35,
  intro: 'Повелительное наклонение — инструмент повседневной речи: просьбы, советы, инструкции. В польском его формы похожи на русские, но вежливые просьбы строятся иначе: через proszę + инфинитив, niech pan / niech pani и условное наклонение. Знать, как попросить мягко и при этом естественно, — навык уровня B2.',
  intro2: 'Senpai, в польском автобусе ты услышишь «Proszę nie wychylać się z okna» — «Просьба не высовываться из окна» ♡ Даже запреты по-польски начинаются с «пожалуйста». Сегодня учимся просить и командовать вежливо!',
  goals: [
    'Образовывать повелительное наклонение для ty, my, wy',
    'Знать неправильные формы: bądź, miej, jedz, idź, weź',
    'Выбирать вид глагола в утвердительных и отрицательных просьбах',
    'Вежливо просить: proszę + инфинитив, niech pan, czy mógłby pan'
  ],
  c: `
<h3>Образование</h3>
<div class="rule" data-t="основа 3-го лица ед. ч. настоящего времени без окончания"><p>Для ty — основа (иногда с -j или -ij), для my — + -my, для wy — + -cie.</p></div>
<div class="tbl"><table><thead><tr><th>Инфинитив</th><th>on (наст.)</th><th>ty</th><th>my</th><th>wy</th></tr></thead><tbody>
<tr><td lang="pl">czytać</td><td lang="pl">czyta</td><td lang="pl">czytaj!</td><td lang="pl">czytajmy!</td><td lang="pl">czytajcie!</td></tr>
<tr><td lang="pl">robić</td><td lang="pl">robi</td><td lang="pl">rób!</td><td lang="pl">róbmy!</td><td lang="pl">róbcie!</td></tr>
<tr><td lang="pl">pisać</td><td lang="pl">pisze</td><td lang="pl">pisz!</td><td lang="pl">piszmy!</td><td lang="pl">piszcie!</td></tr>
<tr><td lang="pl">zamknąć</td><td lang="pl">zamknie</td><td lang="pl">zamknij!</td><td lang="pl">zamknijmy!</td><td lang="pl">zamknijcie!</td></tr>
</tbody></table></div>
<div class="tbl"><table><thead><tr><th>Неправильные</th><th>ty</th><th>wy</th></tr></thead><tbody>
<tr><td lang="pl">być</td><td lang="pl">bądź</td><td lang="pl">bądźcie</td></tr>
<tr><td lang="pl">mieć</td><td lang="pl">miej</td><td lang="pl">miejcie</td></tr>
<tr><td lang="pl">jeść</td><td lang="pl">jedz</td><td lang="pl">jedzcie</td></tr>
<tr><td lang="pl">iść / pójść</td><td lang="pl">idź / pójdź (чаще chodź!)</td><td lang="pl">idźcie / chodźcie</td></tr>
<tr><td lang="pl">wziąć</td><td lang="pl">weź</td><td lang="pl">weźcie</td></tr>
<tr><td lang="pl">wiedzieć</td><td lang="pl">wiedz</td><td lang="pl">wiedzcie</td></tr>
</tbody></table></div>
<div class="ichika">Ласковое приглашение ♡ <span lang="pl">Chodź tu!</span> — «Иди сюда!» и <span lang="pl">Chodźmy!</span> — «Пойдём!» Очень частые слова. А <span lang="pl">Weź!</span> в разговоре часто значит что-то вроде «да ну!»: <span lang="pl">Weź przestań!</span> — «Да хватит тебе!»</div>

<h3>Вид в просьбах</h3>
<div class="tbl"><table><thead><tr><th>Ситуация</th><th>Вид</th><th>Пример</th></tr></thead><tbody>
<tr><td>Конкретная однократная просьба</td><td>совершенный</td><td lang="pl">Zamknij drzwi! Zadzwoń do mnie!</td></tr>
<tr><td>Общий совет, привычка, приглашение «давай уже»</td><td>несовершенный</td><td lang="pl">Czytaj więcej! Siadaj, proszę!</td></tr>
<tr><td>Запрет</td><td>несовершенный</td><td lang="pl">Nie zamykaj drzwi! Nie dzwoń!</td></tr>
<tr><td>Предостережение</td><td>совершенный</td><td lang="pl">Nie zapomnij paszportu!</td></tr>
</tbody></table></div>

<h3>Вежливые просьбы</h3>
<ul class="ex-l">
<li><span lang="pl">Proszę usiąść. Proszę nie palić.</span><span class="tr">Садитесь, пожалуйста. Просьба не курить.</span></li>
<li><span lang="pl">Niech pan usiądzie. Niech pani spróbuje.</span><span class="tr">Садитесь (вы). Попробуйте (вы).</span></li>
<li><span lang="pl">Niech żyje król! Niech to szlag trafi!</span><span class="tr">niech + 3-е лицо: «да здравствует», «пусть», а также ругательство «чёрт побери».</span></li>
<li><span lang="pl">Czy mógłby pan mówić wolniej?</span><span class="tr">Не могли бы вы говорить медленнее?</span></li>
<li><span lang="pl">Bądź tak dobry i podaj mi sól.</span><span class="tr">Будь добр, передай соль.</span></li>
</ul>
<div class="warn"><p>Прямой императив в адрес незнакомого взрослого (<s>Zamknij okno!</s>) звучит грубо. С pan/pani используй <span lang="pl">proszę + инфинитив</span>, <span lang="pl">niech pan …</span> или условное наклонение.</p></div>
<div class="ayano">В польском одна просьба может звучать в пяти степенях вежливости: от <span lang="pl">Zamknij okno!</span> до <span lang="pl">Czy mógłby pan ewentualnie zamknąć okno?</span>. Выбирай по ситуации, а не по максимуму: чрезмерная вежливость с другом звучит как ирония. С незнакомыми — <span lang="pl">proszę</span> и условное наклонение, с друзьями — простой императив с <span lang="pl">proszę</span> или <span lang="pl">może</span>.</div>
`,
  p: [
    { q: 'Повелительное (ty): czekać, pisać, zrobić.', a: '<span lang="pl">czekaj, pisz, zrób</span>' },
    { q: 'Повелительное (wy): być cicho.', a: '<span lang="pl">Bądźcie cicho!</span>' },
    { q: 'Предложи: «Давайте пойдём в кино!»', a: '<span lang="pl">Chodźmy do kina!</span>' },
    { q: 'Запрет (ty): «Не ешь это!»', a: '<span lang="pl">Nie jedz tego!</span>' },
    { q: 'Вежливо попроси незнакомую женщину подождать.', a: '<span lang="pl">Proszę chwilę poczekać.</span> / <span lang="pl">Niech pani chwilę poczeka.</span>' },
    { q: 'Предостереги: «Не забудь ключи!»', a: '<span lang="pl">Nie zapomnij kluczy!</span>' }
  ],
  q: [
    { q: 'Повелительное от być (ty):', o: ['bądź', 'będź', 'bydź', 'jest'], a: 0, e: 'bądź.' },
    { q: 'Повелительное от jeść (ty):', o: ['jedź', 'jedz', 'jeść', 'jadaj'], a: 1, e: 'jedz (не путать с jedź — езжай).' },
    { q: 'Запрет:', o: ['Nie zadzwoń!', 'Nie dzwoń!', 'Nie zadzwonić!', 'Nie dzwonisz!'], a: 1, e: 'Несовершенный.' },
    { q: 'Вежливая просьба к незнакомому мужчине:', o: ['Usiądź!', 'Niech pan usiądzie.', 'Siadaj!', 'Usiądźcie!'], a: 1, e: 'niech pan…' },
    { q: '<span lang="pl">Proszę nie ___ .</span>', o: ['palisz', 'palić', 'pal', 'palcie'], a: 1, e: 'proszę + инфинитив.' }
  ],
  s: [
    'Императив: основа 3-го лица: czytaj, rób, pisz, zamknij; + -my, + -cie.',
    'Неправильные: bądź, miej, jedz, idź/chodź, weź, wiedz.',
    'Однократная просьба — совершенный; запрет — несовершенный.',
    'Предостережение — совершенный в отрицании: Nie zapomnij!',
    'Вежливо: proszę + инфинитив; niech pan/pani + 3-е лицо; Czy mógłby pan…?',
    'Прямой императив незнакомому взрослому звучит грубо.'
  ]
});
