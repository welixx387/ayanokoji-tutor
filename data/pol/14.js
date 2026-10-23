L('pol', 14, {
  m: 40,
  intro: 'Сложные предложения — основа связной речи на B2. Большинство польских союзов похожи на русские: że — что, żeby — чтобы, który — который, chociaż — хотя. Но есть два важных отличия: после żeby и gdyby идут формы на -ł с личными окончаниями, а запятая в польском ставится перед каждым придаточным — правила пунктуации здесь строже.',
  intro2: 'Senpai, «Chcę, żebyś wiedział, że cię lubię» ♡ Три союза, две запятые — и такое признание! Польские сложные предложения могут быть очень романтичными. И очень строгими к запятым.',
  goals: [
    'Использовать że и żeby / aby / by',
    'Склонять który в относительных придаточных',
    'Использовать союзы причины, уступки, времени и следствия',
    'Ставить запятые по польским правилам'
  ],
  c: `
<h3>że или żeby</h3>
<div class="two"><div><h4>że — факт</h4><p lang="pl">Wiem, że jesteś zmęczony.</p><p lang="pl">Mówi, że przyjdzie.</p></div><div><h4>żeby — желание, цель, просьба</h4><p lang="pl">Chcę, żebyś odpoczął.</p><p lang="pl">Mówi, żebym przyszedł.</p></div></div>
<p>Сравни: <span lang="pl">Mówi, że przyjdę</span> — говорит, что я приду. <span lang="pl">Mówi, żebym przyszedł</span> — говорит, чтобы я пришёл. Формальные синонимы żeby: <span lang="pl">aby, by</span>.</p>

<h3>który</h3>
<div class="tbl"><table><thead><tr><th>Падеж</th><th>м. р.</th><th>ж. р.</th><th>мн. ч. (м.-лич. / нем.-лич.)</th></tr></thead><tbody>
<tr><td>Им.</td><td lang="pl">który</td><td lang="pl">która</td><td lang="pl">którzy / które</td></tr>
<tr><td>Род.</td><td lang="pl">którego</td><td lang="pl">której</td><td lang="pl">których</td></tr>
<tr><td>Дат.</td><td lang="pl">któremu</td><td lang="pl">której</td><td lang="pl">którym</td></tr>
<tr><td>Твор.</td><td lang="pl">którym</td><td lang="pl">którą</td><td lang="pl">którymi</td></tr>
</tbody></table></div>
<ul class="ex-l">
<li><span lang="pl">To jest kolega, z którym gram w piłkę.</span><span class="tr">Это друг, с которым я играю в футбол.</span></li>
<li><span lang="pl">Studenci, którzy zdali egzamin, dostali dyplomy.</span><span class="tr">Студенты, которые сдали…</span></li>
<li><span lang="pl">To jest miasto, w którym się urodziłem.</span><span class="tr">Город, в котором я родился.</span></li>
</ul>
<div class="ichika">В разговоре иногда говорят «co» вместо «który»: <span lang="pl">ten człowiek, co tu mieszka</span> ♡ Это просторечие — понимать надо, но в письме используй только <span lang="pl">który</span>. Как русское «тот, что…» против «который».</div>

<h3>Другие союзы</h3>
<div class="tbl"><table><thead><tr><th>Значение</th><th>Союзы</th><th>Пример</th></tr></thead><tbody>
<tr><td>Причина</td><td lang="pl">bo, ponieważ, gdyż</td><td lang="pl">Nie przyszedłem, ponieważ byłem chory.</td></tr>
<tr><td>Следствие</td><td lang="pl">więc, dlatego, zatem</td><td lang="pl">Padało, więc zostaliśmy w domu.</td></tr>
<tr><td>Уступка</td><td lang="pl">chociaż, choć, mimo że</td><td lang="pl">Chociaż było zimno, poszliśmy na spacer.</td></tr>
<tr><td>Время</td><td lang="pl">kiedy, gdy, zanim, dopóki nie, odkąd</td><td lang="pl">Zanim wyjdziesz, zamknij okno.</td></tr>
<tr><td>Условие</td><td lang="pl">jeśli, jeżeli, gdyby</td><td lang="pl">Jeśli chcesz, pomogę ci.</td></tr>
</tbody></table></div>
<div class="warn"><p><span lang="pl">bo</span> — разговорное, в официальном тексте лучше <span lang="pl">ponieważ</span> или <span lang="pl">gdyż</span>. И не начинай с <span lang="pl">bo</span> и <span lang="pl">więc</span> предложение в формальном письме.</p></div>

<h3>Запятые</h3>
<ul class="ex-l">
<li><span lang="pl">Myślę, że masz rację.</span><span class="tr">Запятая перед каждым подчинительным союзом: że, żeby, który, gdy, bo, ponieważ, chociaż, jeśli.</span></li>
<li><span lang="pl">Kupiłem chleb i mleko.</span><span class="tr">Перед i, oraz, lub, albo, ani (одиночными) — без запятой.</span></li>
<li><span lang="pl">Byłem zmęczony, ale poszedłem.</span><span class="tr">Перед противительными ale, lecz, jednak, a, więc — запятая.</span></li>
</ul>
<div class="ayano">Польская пунктуация строже русской в одном: запятая ставится перед любым придаточным, даже очень коротким. Но мягче в другом: перед одиночным <span lang="pl">i</span> между простыми предложениями запятая обычно не нужна. Проверяй каждое письменное предложение: есть ли второй глагол? Если есть и он в придаточном — запятая обязательна.</div>
`,
  p: [
    { q: 'że или żeby: <span lang="pl">Mama prosi, ___ zadzwonił.</span>', a: '<span lang="pl">żebyś</span> (или żebym/żeby — по лицу)' },
    { q: 'że или żeby: <span lang="pl">Wiem, ___ to trudne.</span>', a: '<span lang="pl">że</span>' },
    { q: 'Соедини с który: <span lang="pl">To jest pani. Rozmawiałem z tą panią.</span>', a: '<span lang="pl">To jest pani, z którą rozmawiałem.</span>' },
    { q: 'Соедини с chociaż: <span lang="pl">Byłam zmęczona. Skończyłam pracę.</span>', a: '<span lang="pl">Chociaż byłam zmęczona, skończyłam pracę.</span>' },
    { q: 'Сделай формальнее: <span lang="pl">Nie przyszedłem, bo byłem chory.</span>', a: '<span lang="pl">Nie przyszedłem, ponieważ byłem chory.</span>' },
    { q: 'Расставь запятые: <span lang="pl">Kiedy wróciłem do domu zobaczyłem że nikogo nie ma.</span>', a: '<span lang="pl">Kiedy wróciłem do domu, zobaczyłem, że nikogo nie ma.</span>' }
  ],
  q: [
    { q: '<span lang="pl">Chcę, ___ przyszła.</span>', o: ['że', 'żebyś', 'który', 'bo'], a: 1, e: 'Желание.' },
    { q: '<span lang="pl">Ludzie, ___ tu mieszkają, …</span>', o: ['który', 'którzy', 'które', 'której'], a: 1, e: 'Мужско-личный мн. ч.' },
    { q: 'Формальное «потому что»:', o: ['bo', 'ponieważ', 'więc', 'czyli'], a: 1, e: 'ponieważ, gdyż.' },
    { q: 'Нужна ли запятая: <span lang="pl">Wiem że wiesz.</span>', o: ['нет', 'да, перед że', 'только в вопросе', 'по желанию'], a: 1, e: 'Перед каждым подчинительным союзом.' },
    { q: '<span lang="pl">Zanim ___ , zadzwoń.</span>', o: ['wychodzisz', 'wyjdziesz', 'wyszedłeś', 'wyjść'], a: 1, e: 'zanim + будущее (сов. вид).' }
  ],
  s: [
    'że — факт; żeby/aby/by + форма на -ł — желание, цель, просьба.',
    'który склоняется: którego, któremu, z którym, którzy/które.',
    'Причина: bo (разг.), ponieważ, gdyż; следствие: więc, dlatego.',
    'Уступка: chociaż, mimo że; время: zanim, dopóki nie, odkąd.',
    'Запятая перед каждым придаточным и перед ale, lecz, a.',
    'Без запятой перед одиночными i, oraz, lub, albo.'
  ]
});
