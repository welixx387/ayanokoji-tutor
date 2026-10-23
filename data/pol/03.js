L('pol', 3, {
  m: 40,
  intro: 'Творительный (narzędnik) и местный (miejscownik) падежи почти полностью совпадают по смыслу с русскими творительным и предложным. Но в польском есть несколько важных особенностей: творительный после «быть» с профессией, транспорт без предлога, местный падеж только с предлогами и чередование согласных: Warszawa — w Warszawie, Kraków — w Krakowie.',
  intro2: 'Senpai, «Jestem studentem» — «я студент» ♡ Поляки всегда ставят профессию в творительный, как в русском «он работает учителем». А «w Warszawie» — смотри, как «w» превратилось в «wie»! Сейчас разберём эти превращения.',
  goals: [
    'Образовывать творительный падеж и использовать его после być',
    'Использовать творительный для транспорта и с предлогами места',
    'Образовывать местный падеж с чередованием согласных',
    'Выбирать w или na с местным падежом'
  ],
  c: `
<h3>Narzędnik — творительный</h3>
<div class="tbl"><table><thead><tr><th>Род</th><th>Ед. ч.</th><th>Мн. ч.</th></tr></thead><tbody>
<tr><td>Мужской / средний</td><td><b>-em</b>: <span lang="pl">studentem, bratem, oknem, morzem</span>; м. р. на -a — <b>-ą</b>: <span lang="pl">kolegą</span></td><td><b>-ami</b>: <span lang="pl">studentami, oknami</span></td></tr>
<tr><td>Женский</td><td><b>-ą</b>: <span lang="pl">mamą, kobietą, nocą</span></td><td><b>-ami</b>: <span lang="pl">kobietami</span>; исключения <b>-mi</b>: <span lang="pl">ludźmi, dziećmi, przyjaciółmi</span></td></tr>
</tbody></table></div>
<ul class="ex-l">
<li><span lang="pl">Jestem studentem. Ona jest lekarką.</span><span class="tr">Профессия после być — творительный.</span></li>
<li><span lang="pl">Jadę autobusem / pociągiem / tramwajem.</span><span class="tr">Транспорт — без предлога.</span></li>
<li><span lang="pl">Idę do kina z bratem i z siostrą.</span><span class="tr">z + творительный = «с».</span></li>
<li><span lang="pl">Kot śpi pod stołem. Lampa wisi nad stołem. Czekam przed kinem.</span><span class="tr">pod, nad, przed, za, między + творительный (где?).</span></li>
</ul>
<div class="warn"><p>После <span lang="pl">to</span> — именительный: <span lang="pl">To jest student.</span> После <span lang="pl">być</span> с существительным — творительный: <span lang="pl">On jest studentem.</span> А с прилагательным — именительный: <span lang="pl">On jest wysoki.</span></p></div>

<h3>Miejscownik — местный</h3>
<p>Употребляется только с предлогами <span lang="pl">w, na, o, po, przy</span>.</p>
<div class="tbl"><table><thead><tr><th>Окончание</th><th>Когда</th><th>Примеры</th></tr></thead><tbody>
<tr><td><b>-e</b> + чередование</td><td>большинство твёрдых основ</td><td lang="pl">Warszawa → w Warszawie, Kraków → w Krakowie, las → w lesie, miasto → w mieście, stół → na stole, biuro → w biurze, Polska → w Polsce</td></tr>
<tr><td><b>-u</b></td><td>м. и ср. р. на k, g, ch и мягкие</td><td lang="pl">w parku, w domu, o synu, na dworcu, w Gdańsku</td></tr>
<tr><td><b>-i / -y</b></td><td>ж. р. на мягкие и -ca, -sza</td><td lang="pl">w kuchni, na ulicy, w nocy</td></tr>
<tr><td><b>-ach</b></td><td>множественное число</td><td lang="pl">w sklepach, na ulicach</td></tr>
</tbody></table></div>
<div class="ichika">Чередования — как в русском «рука — в руке» ♡ <span lang="pl">r → rz</span> (biuro → w biurze), <span lang="pl">t → ci</span> (miasto → w mieście), <span lang="pl">d → dzi</span> (woda → w wodzie), <span lang="pl">k → c</span> (Polska → w Polsce), <span lang="pl">g → dz</span> (noga → na nodze). Произнеси вслух — и рука сама запомнит!</div>

<h3>w или na</h3>
<div class="two"><div><h4>w</h4><p lang="pl">w szkole, w domu, w sklepie, w Polsce, w Krakowie, w kinie</p></div><div><h4>na</h4><p lang="pl">na uniwersytecie, na poczcie, na dworcu, na lotnisku, na koncercie, na Mazurach, na wsi</p></div></div>
<p>Почти как в русском, но есть различия: <span lang="pl">na uniwersytecie</span> (в университете), <span lang="pl">na lekcji</span> (на уроке — совпадает), <span lang="pl">na wsi</span> (в деревне). Направление (куда?) после <span lang="pl">w, na</span> — винительный: <span lang="pl">idę na pocztę</span>; с городами и странами — <span lang="pl">do</span> + родительный (урок 7).</p>
<div class="ayano">Местный падеж кажется трудным из-за чередований, но их всего около десятка, и все они есть в русском в той или иной форме. Составь список городов и мест, где ты бываешь, и проговори каждое с предлогом: <span lang="pl">w Krakowie, w Gdańsku, na dworcu, w pracy</span>. Личные примеры запоминаются в разы лучше таблиц.</div>
`,
  p: [
    { q: 'Скажи, кто ты по профессии или занятию: «Я школьник / студентка».', a: '<span lang="pl">Jestem uczniem.</span> / <span lang="pl">Jestem studentką.</span>' },
    { q: 'Дополни: <span lang="pl">Jadę do pracy (rower).</span>', a: '<span lang="pl">rowerem</span>' },
    { q: 'Дополни: <span lang="pl">Rozmawiam z (koleżanka).</span>', a: '<span lang="pl">z koleżanką</span>' },
    { q: 'Местный падеж: <span lang="pl">Mieszkam w (Wrocław). Pracuję w (biuro).</span>', a: '<span lang="pl">we Wrocławiu</span> (перед w + согласный предлог становится we), <span lang="pl">w biurze</span>' },
    { q: 'Местный падеж: <span lang="pl">Studiuję na (uniwersytet).</span>', a: '<span lang="pl">na uniwersytecie</span>' },
    { q: 'Переведи: «Кот спит под кроватью».', a: '<span lang="pl">Kot śpi pod łóżkiem.</span>' }
  ],
  q: [
    { q: '<span lang="pl">On jest ___ .</span> (lekarz)', o: ['lekarz', 'lekarzem', 'lekarza', 'lekarzu'], a: 1, e: 'После być — творительный.' },
    { q: '<span lang="pl">Jadę ___ .</span> (поездом)', o: ['z pociągiem', 'pociągiem', 'na pociąg', 'w pociągu'], a: 1, e: 'Транспорт без предлога.' },
    { q: '<span lang="pl">Mieszkam w ___ .</span> (Warszawa)', o: ['Warszawa', 'Warszawie', 'Warszawy', 'Warszawą'], a: 1, e: 'Местный падеж.' },
    { q: '<span lang="pl">Jestem na ___ .</span> (poczta)', o: ['poczta', 'poczcie', 'pocztą', 'poczty'], a: 1, e: 't → c: poczcie.' },
    { q: 'Творительный мн. ч. от ludzie:', o: ['ludziami', 'ludźmi', 'ludziach', 'ludzi'], a: 1, e: 'Исключение -mi.' }
  ],
  s: [
    'Творительный: -em (м., ср. р.), -ą (ж. р.), -ami (мн. ч.); ludźmi, dziećmi.',
    'Jestem studentem — профессия после być в творительном.',
    'Транспорт без предлога: autobusem; z + творительный = «с».',
    'pod, nad, przed, za, między + творительный — местонахождение.',
    'Местный только с w, na, o, po, przy; -e с чередованием, -u, -i/-y, -ach.',
    'na uniwersytecie, na poczcie, na dworcu; w szkole, w Polsce.'
  ]
});
