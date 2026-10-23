L('english', 10, {
  m: 35,
  intro: 'Past Perfect — «предпрошедшее» время: оно показывает, что одно действие в прошлом произошло раньше другого. А времена группы Perfect Continuous подчёркивают длительность действия до определённого момента. В этом уроке — Past Perfect, Past Perfect Continuous, Present Perfect Continuous и их сравнение с уже знакомыми временами.',
  intro2: 'Senpai, «When I arrived, the film had started» ♡ Фильм начался раньше, чем я пришёл, — я опоздал. А «When I arrived, the film started» — я пришёл, и тут он начался. Одно слово «had» меняет всю историю! Сегодня научимся показывать порядок событий в прошлом.',
  goals: [
    'Образовывать и употреблять Past Perfect',
    'Использовать by the time, before, after, already, just с Past Perfect',
    'Образовывать и употреблять Present и Past Perfect Continuous',
    'Различать Perfect и Perfect Continuous'
  ],
  c: `
<h3>Past Perfect</h3>
<p>Образование: <b>had + V3</b> для всех лиц. Отрицание: <i>hadn’t done</i>. Вопрос: <i>Had you done…?</i></p>
<div class="tbl"><table><thead><tr><th>Употребление</th><th>Пример</th></tr></thead><tbody>
<tr><td>Действие завершилось до другого действия в прошлом</td><td>When we got to the station, the train <b>had left</b>.</td></tr>
<tr><td>Действие завершилось к определённому моменту в прошлом</td><td>By 10 o’clock I <b>had finished</b> my homework.</td></tr>
<tr><td>В косвенной речи вместо Past Simple и Present Perfect</td><td>She said she <b>had seen</b> the film.</td></tr>
<tr><td>В третьем типе условных и после wish</td><td>If I <b>had known</b>, I would have helped. I wish I <b>had listened</b>.</td></tr>
</tbody></table></div>
<p>Маркеры: <b>by the time, by (5 o’clock), before, after, already, just, never… before, when</b>.</p>
<div class="ex" data-t="Порядок событий"><ol><li><i>When I came home, my mother <b>cooked</b> dinner.</i> — сначала я пришёл, потом мама приготовила.</li><li><i>When I came home, my mother <b>had cooked</b> dinner.</i> — ужин уже был готов, когда я пришёл.</li><li><i>When I came home, my mother <b>was cooking</b> dinner.</i> — мама была в процессе приготовления.</li></ol></div>
<div class="warn"><p>Если последовательность событий понятна из порядка рассказа или из слов before/after, можно использовать Past Simple: <i>I had breakfast and went to school.</i> Past Perfect нужен, когда мы «возвращаемся» к более раннему событию.</p></div>

<h3>Present Perfect Continuous</h3>
<p>Образование: <b>have/has been + V-ing</b>.</p>
<ul><li>Действие началось в прошлом и продолжается до сих пор, важна длительность: <i>I <b>have been learning</b> English for six years.</i></li><li>Действие недавно закончилось, и виден его результат: <i>You’re out of breath. <b>Have</b> you <b>been running</b>?</i></li></ul>
<div class="ichika">Сравни ♡ «I have read the book» — книга прочитана, результат. «I have been reading the book all day» — я весь день читал, важен процесс, и, может быть, ещё не дочитал. Perfect — результат, Perfect Continuous — процесс и длительность.</div>
<p>Вопрос о длительности: <i>How long have you been waiting?</i> Ответ: <i>For twenty minutes / Since 3 o’clock.</i></p>

<h3>Past Perfect Continuous</h3>
<p>Образование: <b>had been + V-ing</b>. Длительное действие продолжалось до определённого момента в прошлом: <i>She was tired because she <b>had been working</b> all day. They <b>had been walking</b> for two hours when it started to rain.</i></p>

<h3>Сводная таблица</h3>
<div class="tbl"><table><thead><tr><th>Время</th><th>Форма</th><th>Главная идея</th></tr></thead><tbody>
<tr><td>Present Perfect</td><td>have/has + V3</td><td>результат или опыт к настоящему</td></tr>
<tr><td>Present Perfect Continuous</td><td>have/has been + V-ing</td><td>длительность до настоящего</td></tr>
<tr><td>Past Perfect</td><td>had + V3</td><td>раньше другого момента в прошлом</td></tr>
<tr><td>Past Perfect Continuous</td><td>had been + V-ing</td><td>длительность до момента в прошлом</td></tr>
</tbody></table></div>
<div class="ayano">Perfect-времена удобно представлять как «взгляд назад» из определённой точки. Present Perfect смотрит назад из «сейчас», Past Perfect — из момента в прошлом, Future Perfect — из момента в будущем. Continuous добавляет к взгляду длительность. Одна идея — шесть времён. Когда видишь эту систему, формы перестают казаться случайными.</div>
`,
  p: [
    { q: 'Поставьте глаголы: When I (arrive) at the party, Tom (already / go) home.', a: 'arrived, had already gone.' },
    { q: 'Поставьте глагол: By the end of the year she (read) 50 books.', a: 'had read (если речь о прошлом году).' },
    { q: 'Поставьте глагол: I (wait) for you for an hour! Where have you been?', a: 'have been waiting — длительность до настоящего.' },
    { q: 'Поставьте глагол: His eyes were red because he (cry).', a: 'had been crying.' },
    { q: 'Объясните разницу: When I came, she left. — When I came, she had left.', a: 'В первом — она ушла после моего прихода; во втором — она ушла ещё до моего прихода.' },
    { q: 'Задайте вопрос о длительности: You are learning to drive.', a: 'How long have you been learning to drive?' }
  ],
  q: [
    { q: 'By the time we arrived, the concert ___.', o: ['started', 'had started', 'has started', 'was starting'], a: 1, e: 'Раньше другого действия в прошлом.' },
    { q: 'She ___ in this company since 2015.', o: ['works', 'has been working', 'had worked', 'is working'], a: 1, e: 'Длительность до настоящего.' },
    { q: 'I ___ never ___ snow before I went to Moscow.', o: ['have / seen', 'had / seen', 'did / see', 'was / seeing'], a: 1, e: 'Опыт до момента в прошлом.' },
    { q: 'They were exhausted because they ___ for hours.', o: ['have been walking', 'had been walking', 'walk', 'are walking'], a: 1, e: 'Past Perfect Continuous.' },
    { q: 'Форма Past Perfect:', o: ['have done', 'had done', 'did', 'was doing'], a: 1, e: 'had + V3.' }
  ],
  s: [
    'Past Perfect: had + V3 — действие раньше другого действия или момента в прошлом.',
    'Маркеры: by the time, by, before, after, already, just.',
    'Present Perfect Continuous: have/has been + V-ing — длительность до настоящего (for, since, how long).',
    'Past Perfect Continuous: had been + V-ing — длительность до момента в прошлом.',
    'Perfect — результат, Perfect Continuous — процесс и длительность.',
    'Perfect-времена — «взгляд назад» из точки в настоящем, прошлом или будущем.'
  ]
});
