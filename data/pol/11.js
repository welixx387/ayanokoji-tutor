L('pol', 11, {
  m: 40,
  intro: 'Причастия (imiesłowy) в польском почти полностью соответствуют русским: действительные «читающий», страдательные «прочитанный» и деепричастия «читая», «прочитав». Это делает тему лёгкой для русскоговорящих, но есть нюансы: другие суффиксы, мужско-личные формы и строгое правило одного подлежащего для деепричастий.',
  intro2: 'Senpai, «czytając książkę, zasnęłam» — «читая книгу, я уснула» ♡ Польские деепричастия ведут себя как русские, только звучат мягче. А «przeczytawszy» — «прочитав» — немного старомодно, но очень элегантно!',
  goals: [
    'Образовывать действительные причастия на -ący',
    'Образовывать страдательные причастия на -ny, -ony, -ty',
    'Образовывать деепричастия на -ąc и -wszy / -łszy',
    'Соблюдать правило одного подлежащего'
  ],
  c: `
<h3>Четыре вида причастий</h3>
<div class="tbl"><table><thead><tr><th>Тип</th><th>Образование</th><th>Пример</th><th>По-русски</th></tr></thead><tbody>
<tr><td>Действительное (przymiotnikowy czynny)</td><td>3-е л. мн. ч. наст. + -cy: czytają → czytający</td><td lang="pl">czytający chłopiec</td><td>читающий</td></tr>
<tr><td>Страдательное (przymiotnikowy bierny)</td><td>-ny, -ony, -ty</td><td lang="pl">przeczytana książka</td><td>прочитанный</td></tr>
<tr><td>Деепричастие одновременное (współczesny)</td><td>3-е л. мн. ч. наст. + -c: czytają → czytając</td><td lang="pl">Czytając, słucham muzyki.</td><td>читая</td></tr>
<tr><td>Деепричастие предшествования (uprzedni)</td><td>основа прош. вр. + -wszy / -łszy</td><td lang="pl">Przeczytawszy list, wyszedł.</td><td>прочитав</td></tr>
</tbody></table></div>

<h3>Страдательные причастия</h3>
<div class="tbl"><table><thead><tr><th>Суффикс</th><th>Когда</th><th>Примеры</th></tr></thead><tbody>
<tr><td lang="pl">-ny</td><td>глаголы на -ać, -eć</td><td lang="pl">czytany, przeczytany, widziany, zapomniany</td></tr>
<tr><td lang="pl">-ony</td><td>глаголы на -ić, -yć и с согласной основой</td><td lang="pl">zrobiony, kupiony, zaproszony, przyniesiony</td></tr>
<tr><td lang="pl">-ty</td><td>часть односложных и на -nąć, -ąć</td><td lang="pl">umyty, otwarty, zajęty, wzięty, zamknięty</td></tr>
</tbody></table></div>
<p>Склоняются как прилагательные, включая мужско-личную форму с чередованием: <span lang="pl">zaproszeni goście, zmęczeni studenci</span>, но <span lang="pl">zaproszone koleżanki</span>.</p>
<div class="ichika">Как в русском «приглашённый — приглашённые» ♡ Только у польских мужчин снова смягчение: <span lang="pl">zaproszony → zaproszeni</span>, <span lang="pl">zmęczony → zmęczeni</span>. Мужско-личный род повсюду, привыкай!</div>

<h3>Деепричастия</h3>
<ul class="ex-l">
<li><span lang="pl">Idąc do szkoły, spotkałem kolegę.</span><span class="tr">Идя в школу, я встретил друга (одновременно).</span></li>
<li><span lang="pl">Wróciwszy do domu, zjadł obiad.</span><span class="tr">Вернувшись домой, он пообедал (предшествование, книжно).</span></li>
<li><span lang="pl">Przyszedłszy na dworzec, zobaczyła, że pociąg odjechał.</span><span class="tr">Придя на вокзал… (-łszy после согласной).</span></li>
</ul>
<p>Деепричастие на -ąc образуется только от несовершенного вида, на -wszy/-łszy — от совершенного. В разговорной речи вместо -wszy чаще говорят <span lang="pl">Kiedy wrócił do domu, zjadł obiad.</span></p>
<div class="warn"><p>Главное правило: у деепричастия и основного глагола одно подлежащее. Неверно: <s>Wracając do domu, zaczął padać deszcz.</s> (Дождь не шёл домой!) Правильно: <span lang="pl">Kiedy wracałem do domu, zaczął padać deszcz.</span> Как в русском: «Подъезжая к станции, у меня слетела шляпа» — ошибка.</p></div>

<h3>Запятые</h3>
<p>Деепричастный оборот (imiesłowowy równoważnik zdania) всегда отделяется запятой: <span lang="pl">Słuchając muzyki, odrabiam lekcje.</span> Причастный оборот после существительного — тоже: <span lang="pl">Chłopiec, czytający książkę, nie zauważył mnie.</span></p>
<div class="ayano">Причастия — тема, где русский язык работает на тебя почти полностью. Сосредоточься только на различиях: суффиксы -ący / -ąc, выбор -ny / -ony / -ty и мужско-личные формы. Возьми десять глаголов и образуй от каждого все четыре причастия — это займёт пятнадцать минут и закроет тему.</div>
`,
  p: [
    { q: 'Действительное причастие: pisać, śpiewać.', a: '<span lang="pl">piszący, śpiewający</span>' },
    { q: 'Страдательное причастие: napisać, zrobić, otworzyć, zamknąć.', a: '<span lang="pl">napisany, zrobiony, otwarty, zamknięty</span>' },
    { q: 'Мужско-личная форма: <span lang="pl">zaproszony gość → (мн. ч.)</span>', a: '<span lang="pl">zaproszeni goście</span>' },
    { q: 'Деепричастие: <span lang="pl">Kiedy jem śniadanie, czytam wiadomości.</span>', a: '<span lang="pl">Jedząc śniadanie, czytam wiadomości.</span>' },
    { q: 'Исправь: <i>Czytając książkę, zadzwonił telefon.</i>', a: '<span lang="pl">Kiedy czytałem książkę, zadzwonił telefon.</span>' },
    { q: 'Деепричастие предшествования: <span lang="pl">Kiedy skończył pracę, poszedł do domu.</span>', a: '<span lang="pl">Skończywszy pracę, poszedł do domu.</span>' }
  ],
  q: [
    { q: 'Деепричастие от czytać:', o: ['czytający', 'czytając', 'czytany', 'czytawszy'], a: 1, e: '-ąc.' },
    { q: 'Страдательное от kupić:', o: ['kupiony', 'kupiący', 'kupny', 'kupiąc'], a: 0, e: '-ony.' },
    { q: 'Страдательное от otworzyć:', o: ['otworzony', 'otwarty', 'otwierany', 'otwierający'], a: 1, e: '-ty.' },
    { q: 'Деепричастие на -ąc образуется от:', o: ['совершенного вида', 'несовершенного вида', 'любого', 'только от модальных'], a: 1, e: 'Несовершенный вид.' },
    { q: 'Ошибка:', o: ['Idąc do pracy, kupiłem kawę.', 'Idąc do pracy, padał deszcz.', 'Słuchając muzyki, odpoczywam.', 'Wróciwszy, zasnął.'], a: 1, e: 'Разные подлежащие.' }
  ],
  s: [
    'Действительное: czytający (-ący); страдательное: przeczytany, zrobiony, otwarty.',
    '-ny (ać/eć), -ony (ić/yć, согласные), -ty (часть глаголов).',
    'Мужско-личные формы: zaproszeni, zmęczeni.',
    'Деепричастия: czytając (несов., одновременно), przeczytawszy / przyszedłszy (сов., раньше).',
    'Одно подлежащее у деепричастия и глагола.',
    'Обороты отделяются запятыми.'
  ]
});
