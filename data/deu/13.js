L('deu', 13, {
  m: 40,
  intro: 'Инфинитивные конструкции и причастия делают немецкую речь компактной. Вместо двух предложений — одно: «Я пытаюсь выучить», «чтобы сдать экзамен», «не попрощавшись», «улыбающаяся девочка». На уровне B2 важно знать, когда нужен zu, где он стоит у отделяемых глаголов, и различать um … zu и damit.',
  intro2: 'Senpai, «Ich habe vergessen, dich anzurufen» — этот маленький zu влез прямо в середину слова anrufen! ♡ Немецкие глаголы иногда как матрёшки. Сегодня научимся их собирать.',
  goals: [
    'Использовать инфинитив с zu после глаголов, существительных и прилагательных',
    'Ставить zu в глаголах с отделяемой приставкой',
    'Различать um … zu и damit, ohne … zu и ohne dass, statt … zu',
    'Использовать Partizip I и Partizip II в роли определения'
  ],
  c: `
<h3>Инфинитив с zu</h3>
<ul class="ex-l">
<li><span lang="de">Ich versuche, jeden Tag Deutsch zu sprechen.</span><span class="tr">После глаголов: versuchen, vergessen, hoffen, anfangen, aufhören, vorhaben, beschließen.</span></li>
<li><span lang="de">Ich habe keine Lust, heute zu kochen.</span><span class="tr">После существительных: Lust, Zeit, Angst, die Möglichkeit, die Absicht.</span></li>
<li><span lang="de">Es ist wichtig, regelmäßig zu üben.</span><span class="tr">После es ist + прилагательное: wichtig, schwer, leicht, verboten.</span></li>
<li><span lang="de">Ich habe vergessen, dich anzurufen.</span><span class="tr">Отделяемая приставка: an-zu-rufen — одним словом.</span></li>
</ul>
<div class="warn"><p>Без zu: после модальных глаголов (<span lang="de">ich muss gehen</span>), после werden, lassen, после глаголов движения (<span lang="de">ich gehe einkaufen</span>) и восприятия (<span lang="de">ich höre ihn singen</span>).</p></div>

<h3>Цель: um … zu или damit</h3>
<div class="two"><div><h4>um … zu</h4><p>Подлежащее одно и то же.</p><p lang="de">Ich lerne Deutsch, um in Wien zu studieren.</p></div><div><h4>damit</h4><p>Подлежащие разные (или ясность важнее).</p><p lang="de">Ich spreche langsam, damit du mich verstehst.</p></div></div>
<div class="tbl"><table><thead><tr><th>Конструкция</th><th>Значение</th><th>Пример</th></tr></thead><tbody>
<tr><td lang="de">ohne … zu / ohne dass</td><td>не делая</td><td lang="de">Er ging, ohne sich zu verabschieden. / Er ging, ohne dass ich es merkte.</td></tr>
<tr><td lang="de">(an)statt … zu / statt dass</td><td>вместо того чтобы</td><td lang="de">Statt zu lernen, spielt er am Handy.</td></tr>
</tbody></table></div>
<div class="ichika">Тест для um … zu ♡ Спроси: кто делает оба действия? «Я учу немецкий, чтобы я учился в Вене» — один человек, значит um … zu. «Я говорю медленно, чтобы ты понял» — два человека, значит damit. Просто, правда?</div>

<h3>Причастия как определения</h3>
<div class="tbl"><table><thead><tr><th>Причастие</th><th>Образование</th><th>Смысл</th><th>Пример</th></tr></thead><tbody>
<tr><td>Partizip I</td><td>инфинитив + d</td><td>активное, одновременное</td><td lang="de">das lachende Kind, die steigenden Preise</td></tr>
<tr><td>Partizip II</td><td>ge-t / ge-en</td><td>пассивное или завершённое</td><td lang="de">das gekochte Ei, die gestohlene Tasche, der angekommene Zug</td></tr>
</tbody></table></div>
<p>Причастия склоняются как обычные прилагательные: <span lang="de">mit dem schlafenden Hund, ein gut bezahlter Job</span>.</p>
<ul class="ex-l">
<li><span lang="de">Sie kam lachend ins Zimmer.</span><span class="tr">Как обстоятельство: вошла смеясь (не склоняется).</span></li>
<li><span lang="de">Vom Lärm geweckt, stand er auf.</span><span class="tr">Причастный оборот (книжный стиль).</span></li>
</ul>
<div class="ayano">Инфинитивный оборот отделяется запятой, если он расширен: <span lang="de">Ich versuche, morgen früher aufzustehen.</span> В немецкой пунктуации есть варианты, но запятая перед um … zu, ohne … zu, statt … zu обязательна. Ставь её всегда — это проще, чем помнить исключения, и никогда не будет ошибкой.</div>
`,
  p: [
    { q: 'Продолжи с zu: <span lang="de">Ich habe vor, … (nächstes Jahr nach Deutschland fahren)</span>', a: '<span lang="de">Ich habe vor, nächstes Jahr nach Deutschland zu fahren.</span>' },
    { q: 'С отделяемым глаголом: <span lang="de">Vergiss nicht, … (das Licht ausmachen)</span>', a: '<span lang="de">Vergiss nicht, das Licht auszumachen.</span>' },
    { q: 'um … zu или damit: <span lang="de">Ich spare Geld. Ich will ein Fahrrad kaufen.</span>', a: '<span lang="de">Ich spare Geld, um ein Fahrrad zu kaufen.</span>' },
    { q: 'um … zu или damit: <span lang="de">Die Mutter erklärt es langsam. Das Kind soll es verstehen.</span>', a: '<span lang="de">Die Mutter erklärt es langsam, damit das Kind es versteht.</span>' },
    { q: 'С ohne … zu: <span lang="de">Er hat die Prüfung bestanden. Er hat nicht gelernt.</span>', a: '<span lang="de">Er hat die Prüfung bestanden, ohne zu lernen.</span>' },
    { q: 'Образуй причастие-определение: der Hund, der bellt → …', a: '<span lang="de">der bellende Hund</span>' }
  ],
  q: [
    { q: '<span lang="de">Es ist schwer, früh ___ .</span>', o: ['aufstehen', 'aufzustehen', 'zu aufstehen', 'aufgestanden'], a: 1, e: 'zu внутри отделяемого глагола.' },
    { q: 'Без zu:', o: ['Ich versuche … kommen', 'Ich muss … kommen', 'Ich hoffe … kommen', 'Ich vergesse … kommen'], a: 1, e: 'После модальных глаголов.' },
    { q: '<span lang="de">Ich rufe dich an, ___ du nicht wartest.</span>', o: ['um', 'damit', 'ohne', 'statt'], a: 1, e: 'Разные подлежащие.' },
    { q: '«Варёное яйцо»:', o: ['das kochende Ei', 'das gekochte Ei', 'das kochte Ei', 'das zu kochen Ei'], a: 1, e: 'Partizip II — результат.' },
    { q: '<span lang="de">___ zu arbeiten, schläft er.</span>', o: ['Um', 'Statt', 'Damit', 'Ob'], a: 1, e: 'Вместо того чтобы.' }
  ],
  s: [
    'zu + инфинитив после versuchen, vergessen, anfangen, Lust haben, es ist wichtig.',
    'Отделяемые: an-zu-rufen, auf-zu-stehen.',
    'Без zu: модальные, werden, lassen, движение, восприятие.',
    'um … zu — одно подлежащее, damit — разные.',
    'ohne … zu, statt … zu; ohne dass, statt dass.',
    'Partizip I (lachend) — активное, Partizip II (gekocht) — пассивное/завершённое.'
  ]
});
