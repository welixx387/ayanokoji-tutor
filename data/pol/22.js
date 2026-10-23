L('pol', 22, {
  m: 45,
  intro: 'Польская орфография — испытание даже для носителей: ó или u, rz или ż, ch или h, «nie» слитно или раздельно. Звуки одинаковые, буквы разные. Для письма уровня C1 нужно знать правила, которые закрывают большинство случаев, и привычку проверять остальное по словарю. Хорошая новость: многие правила основаны на чередованиях, знакомых по русскому.',
  intro2: 'Senpai, «morze» и «może» звучат одинаково, но первое — море, а второе — «может» ♡ Польские дети пишут диктанты именно на этом. Сегодня мы тоже станем немного польскими школьниками. Готовь ручку!',
  goals: [
    'Выбирать ó или u по правилам чередования',
    'Выбирать rz или ż',
    'Выбирать ch или h',
    'Писать nie слитно или раздельно'
  ],
  c: `
<h3>ó или u</h3>
<div class="tbl"><table><thead><tr><th>Правило</th><th>Примеры</th></tr></thead><tbody>
<tr><td><b>ó</b>, если в родственном слове чередуется с o, e, a</td><td lang="pl">stół — stoły, mój — moja, wróg — wrogowie, Bóg — boski</td></tr>
<tr><td><b>ó</b> в окончаниях -ów, -ówka, -ówna</td><td lang="pl">Kraków, domów, złotówka</td></tr>
<tr><td><b>u</b> в начале и в конце слова (почти всегда)</td><td lang="pl">ucho, uczeń, tu, temu</td></tr>
<tr><td><b>u</b> в суффиксах -unek, -utki, -uszek, -uchny</td><td lang="pl">rachunek, malutki, kwiatuszek</td></tr>
</tbody></table></div>
<div class="ichika">Фокус с чередованием ♡ Сомневаешься в слове <span lang="pl">stół</span>? Поставь во множественное: <span lang="pl">stoły</span> — появилось o, значит пишем ó. А <span lang="pl">góra</span>? <span lang="pl">górski</span>… хм, не помогает — тут просто запомнить. Так и в русском: «гора — горы», проверочное слово!</div>

<h3>rz или ż</h3>
<div class="tbl"><table><thead><tr><th>Правило</th><th>Примеры</th></tr></thead><tbody>
<tr><td><b>rz</b>, если чередуется с r</td><td lang="pl">morze — morski, dobrze — dobry, Piotrze — Piotr</td></tr>
<tr><td><b>rz</b> после b, p, d, t, g, k, ch, j, w</td><td lang="pl">brzeg, przed, drzwi, trzy, grzyb, krzesło, chrzest, wrzesień</td></tr>
<tr><td><b>rz</b> в суффиксах -arz, -erz, -mierz</td><td lang="pl">lekarz, żołnierz, Kazimierz</td></tr>
<tr><td><b>ż</b>, если чередуется с g, z, s, h, dz</td><td lang="pl">drożej — droga, mażę — mazać, wyżej — wysoki, każę — kazać</td></tr>
<tr><td><b>ż</b> после l, ł, r, n</td><td lang="pl">lżej, łże, rżeć</td></tr>
</tbody></table></div>
<p>Многие слова нужно просто запомнить: <span lang="pl">żaba, żona, żółw, rzeka, rzecz, rzadko</span>.</p>

<h3>ch или h</h3>
<ul class="ex-l">
<li><span lang="pl">dach, mech, ruch, groch</span><span class="tr">ch — в конце слов.</span></li>
<li><span lang="pl">schody, schować, schronisko</span><span class="tr">ch — после s.</span></li>
<li><span lang="pl">druh — drużyna</span><span class="tr">h — если чередуется с g, ż, z.</span></li>
<li><span lang="pl">historia, hotel, harmonia, humor</span><span class="tr">h — часто в заимствованиях.</span></li>
</ul>

<h3>nie слитно или раздельно</h3>
<div class="tbl"><table><thead><tr><th>Слитно</th><th>Раздельно</th></tr></thead><tbody>
<tr><td>с прилагательными и наречиями от них в положительной степени: <span lang="pl">niedobry, nieładnie</span></td><td>с глаголами: <span lang="pl">nie wiem, nie mam</span> (кроме <span lang="pl">nienawidzić, niepokoić</span> и др.)</td></tr>
<tr><td>с существительными: <span lang="pl">nieprzyjaciel, niepalący</span></td><td>со сравнительной и превосходной степенью: <span lang="pl">nie lepszy, nie najlepiej</span></td></tr>
<tr><td>с причастиями-прилагательными (всегда): <span lang="pl">nieprzeczytana książka, niepalący</span></td><td>с деепричастиями: <span lang="pl">nie wiedząc, nie zrobiwszy</span></td></tr>
<tr><td></td><td>с числительными и местоимениями: <span lang="pl">nie pięć, nie ten</span>; при противопоставлении: <span lang="pl">nie dobry, lecz zły</span></td></tr>
</tbody></table></div>
<div class="warn"><p>Правило про причастия изменилось в 1997 году: теперь <span lang="pl">nie</span> с причастиями на -ący, -ny, -ty пишется слитно всегда: <span lang="pl">niezrobiony, niepijący</span>. В старых книгах можно встретить раздельное написание — это не ошибка, а прежняя норма.</p></div>
<div class="ayano">Орфографию не учат одним рывком. Выпиши свои ошибки из последних трёх текстов и найди к каждой правило. Если правила нет — запиши слово в «словарь запоминания». Польские школьники для сомнительных случаев пользуются онлайн-словарём PWN — сделай так же: проверка занимает десять секунд.</div>
`,
  p: [
    { q: 'ó или u: <span lang="pl">st_ł (стол), _cho, Krak_w</span>.', a: '<span lang="pl">stół, ucho, Kraków</span>' },
    { q: 'rz или ż: <span lang="pl">mo_e (море), mo_e (может)</span>.', a: '<span lang="pl">morze</span> (morski), <span lang="pl">może</span> (mogę — чередование с g).' },
    { q: 'rz или ż: <span lang="pl">p_ed, t_y, k_esło</span>.', a: '<span lang="pl">przed, trzy, krzesło</span> — после p, t, k пишется rz.' },
    { q: 'ch или h: <span lang="pl">da_, _otel, s_ody</span>.', a: '<span lang="pl">dach, hotel, schody</span>' },
    { q: 'nie: <span lang="pl">(nie)mam, (nie)ładny, (nie)lepszy</span>.', a: '<span lang="pl">nie mam, nieładny, nie lepszy</span>' },
    { q: 'nie: <span lang="pl">(nie)przeczytany list, (nie)wiedząc</span>.', a: '<span lang="pl">nieprzeczytany list, nie wiedząc</span>' }
  ],
  q: [
    { q: 'Правильно:', o: ['gura', 'góra', 'gora', 'gúra'], a: 1, e: 'góra.' },
    { q: 'После p пишется:', o: ['ż', 'rz', 'ź', 'sz'], a: 1, e: 'przed, prze-.' },
    { q: '<span lang="pl">dro_ej</span> (дороже):', o: ['rz', 'ż', 'sz', 'z'], a: 1, e: 'droga — ż (g → ż).' },
    { q: 'Правильно:', o: ['nie dobry (без противопоставления)', 'niedobry', 'nie-dobry', 'niedobry и nie dobry одинаково'], a: 1, e: 'С прилагательными — слитно.' },
    { q: 'Правильно:', o: ['niewiem', 'nie wiem', 'nie-wiem', 'niew iem'], a: 1, e: 'С глаголами — раздельно.' }
  ],
  s: [
    'ó — при чередовании с o/e/a и в -ów, -ówka; u — в начале и в суффиксах -unek, -utki.',
    'rz — при чередовании с r, после b, p, d, t, g, k, ch, j, w, в -arz, -erz.',
    'ż — при чередовании с g, z, s, h, dz и после l, ł, r, n.',
    'ch — в конце слов и после s; h — при чередовании с g/ż/z и в заимствованиях.',
    'nie слитно: прилагательные, существительные, причастия (с 1997 года всегда).',
    'nie раздельно: глаголы, степени сравнения, деепричастия, числительные, противопоставление.'
  ]
});
