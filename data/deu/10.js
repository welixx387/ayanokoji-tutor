L('deu', 10, {
  m: 35,
  intro: 'Пассив с модальными глаголами — «должно быть сделано», «может быть решено» — постоянно встречается в правилах, инструкциях и официальных письмах. Кроме того, у немецкого пассива есть элегантные заменители: man, sein + zu + инфинитив, sich lassen и прилагательные на -bar. Владение ими — признак уровня B2.',
  intro2: 'Senpai, «Das Problem lässt sich lösen» — проблема «даёт себя решить» ♡ Так немцы говорят «это решаемо». Красиво и коротко. Сегодня соберём целую коллекцию таких формул!',
  goals: [
    'Строить пассив с модальными глаголами в настоящем и прошедшем',
    'Ставить модальный пассив в придаточное предложение',
    'Заменять пассив конструкциями man, sein + zu, sich lassen',
    'Использовать прилагательные на -bar и -lich'
  ],
  c: `
<h3>Модальный глагол + пассив</h3>
<div class="rule" data-t="модальный глагол + Partizip II + werden"><p>Модальный глагол спрягается и стоит на втором месте, в конце — Partizip II и инфинитив werden.</p></div>
<div class="tbl"><table><thead><tr><th>Время</th><th>Пример</th><th>Перевод</th></tr></thead><tbody>
<tr><td>Präsens</td><td lang="de">Die Rechnung muss bis Freitag bezahlt werden.</td><td>Счёт должен быть оплачен до пятницы.</td></tr>
<tr><td>Präteritum</td><td lang="de">Das Problem konnte nicht gelöst werden.</td><td>Проблему не удалось решить.</td></tr>
<tr><td>Придаточное</td><td lang="de">Ich weiß, dass das Formular unterschrieben werden muss.</td><td>Я знаю, что форму нужно подписать.</td></tr>
</tbody></table></div>
<ul class="ex-l">
<li><span lang="de">Hier darf nicht geparkt werden.</span><span class="tr">Здесь нельзя парковаться.</span></li>
<li><span lang="de">Der Antrag soll online gestellt werden.</span><span class="tr">Заявление следует подавать онлайн.</span></li>
</ul>
<div class="ichika">Посмотри на конец предложения: <span lang="de">…bezahlt werden muss</span> — три глагола в ряд ♡ Читай их с конца: muss — werden — bezahlt: «должно — быть — оплачено». Немецкий иногда надо читать задом наперёд!</div>

<h3>Заменители пассива</h3>
<div class="tbl"><table><thead><tr><th>Конструкция</th><th>Значение</th><th>Пример</th></tr></thead><tbody>
<tr><td lang="de">man + актив</td><td>неопределённое лицо</td><td lang="de">Man muss die Rechnung bezahlen.</td></tr>
<tr><td lang="de">sein + zu + Infinitiv</td><td>нужно / можно</td><td lang="de">Die Rechnung ist bis Freitag zu bezahlen. Das Problem ist leicht zu lösen.</td></tr>
<tr><td lang="de">sich lassen + Infinitiv</td><td>можно</td><td lang="de">Das Problem lässt sich lösen.</td></tr>
<tr><td lang="de">прилагательное на -bar / -lich</td><td>можно</td><td lang="de">Das Problem ist lösbar. Der Text ist verständlich.</td></tr>
</tbody></table></div>
<div class="warn"><p><span lang="de">sein + zu</span> двусмысленно: <span lang="de">Die Aufgabe ist zu lösen</span> — «задачу нужно решить» или «задачу можно решить». Смысл подсказывает контекст: в инструкциях — обязанность, с leicht/schwer/kaum — возможность.</p></div>

<h3>Прилагательные возможности</h3>
<ul class="ex-l">
<li><span lang="de">machbar, essbar, trinkbar, lesbar, erreichbar, unvermeidbar</span><span class="tr">выполнимый, съедобный, питьевой, читаемый, достижимый, неизбежный</span></li>
<li><span lang="de">verständlich, erhältlich, unverzeihlich</span><span class="tr">понятный, доступный в продаже, непростительный</span></li>
<li><span lang="de">Diese Pilze sind nicht essbar.</span><span class="tr">Эти грибы несъедобны.</span></li>
</ul>

<h3>Стиль</h3>
<div class="ex" data-t="Одно правило — четыре способа"><ol><li><span lang="de">Die Hausaufgaben müssen bis Montag abgegeben werden.</span></li><li><span lang="de">Man muss die Hausaufgaben bis Montag abgeben.</span></li><li><span lang="de">Die Hausaufgaben sind bis Montag abzugeben.</span></li><li><span lang="de">Die Abgabe der Hausaufgaben erfolgt bis Montag.</span> — номинальный стиль, урок 17.</li></ol></div>
<div class="ayano">В эссе B2 варьируй конструкции: если в абзаце три раза «muss … werden», замени одну на sein + zu, другую на man. Разнообразие грамматики — отдельный критерий оценки на экзамене. Но не жертвуй ясностью: простая конструкция, которую ты строишь без ошибок, лучше сложной с ошибкой.</div>
`,
  p: [
    { q: 'Пассив с können: <span lang="de">Man kann den Fehler korrigieren.</span>', a: '<span lang="de">Der Fehler kann korrigiert werden.</span>' },
    { q: 'Präteritum: <span lang="de">Man musste das Konzert absagen.</span>', a: '<span lang="de">Das Konzert musste abgesagt werden.</span>' },
    { q: 'В придаточное: <span lang="de">Ich glaube, … (Das Fenster muss repariert werden.)</span>', a: '<span lang="de">Ich glaube, dass das Fenster repariert werden muss.</span>' },
    { q: 'Замени через sich lassen: <span lang="de">Das Problem kann leicht gelöst werden.</span>', a: '<span lang="de">Das Problem lässt sich leicht lösen.</span>' },
    { q: 'Замени через sein + zu: <span lang="de">Die Formulare müssen ausgefüllt werden.</span>', a: '<span lang="de">Die Formulare sind auszufüllen.</span>' },
    { q: 'Замени прилагательным: <span lang="de">Das Ziel kann erreicht werden.</span>', a: '<span lang="de">Das Ziel ist erreichbar.</span>' }
  ],
  q: [
    { q: '<span lang="de">Das Paket muss heute ___ .</span>', o: ['geschickt werden', 'werden geschickt', 'geschickt worden', 'schicken werden'], a: 0, e: 'Partizip II + werden.' },
    { q: '<span lang="de">…, dass die Tür geschlossen werden ___ .</span>', o: ['muss', 'müssen', 'gemusst', 'musste werden'], a: 0, e: 'Модальный — в самом конце.' },
    { q: '<span lang="de">Das lässt sich ___ .</span>', o: ['machen', 'gemacht', 'zu machen', 'machbar'], a: 0, e: 'sich lassen + инфинитив.' },
    { q: '«Съедобный»:', o: ['essbar', 'essig', 'esslich', 'gegessen'], a: 0, e: '-bar = можно.' },
    { q: '<span lang="de">Die Miete ist am Monatsanfang ___ .</span>', o: ['zahlen', 'zu zahlen', 'gezahlt', 'zahlbar werden'], a: 1, e: 'sein + zu + инфинитив.' }
  ],
  s: [
    'Модальный пассив: muss/kann/darf + Partizip II + werden.',
    'Präteritum: konnte … gelöst werden; в придаточном: …gelöst werden muss.',
    'man + актив — простая замена пассива.',
    'sein + zu + инфинитив — «нужно» или «можно».',
    'sich lassen + инфинитив — «можно»: Das lässt sich machen.',
    '-bar / -lich: lösbar, machbar, verständlich.'
  ]
});
