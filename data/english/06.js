L('english', 6, {
  m: 35,
  intro: 'Пассивный залог (Passive Voice) используют, когда важно действие или его результат, а не тот, кто его совершил: «Дом построили в 1900 году», «Письмо отправлено». В английском пассив очень распространён в новостях, науке и официальных текстах. Разберём образование во всех основных временах, употребление и конструкции have something done.',
  intro2: 'Senpai, «Harry Potter was written by J. K. Rowling» ♡ Главное здесь — книга, поэтому она стоит в начале, а автор появляется в конце после by. Пассив — это просто способ поставить в центр внимания предмет, а не человека. Формула одна на все времена: be в нужном времени + третья форма.',
  goals: [
    'Образовывать пассивный залог в разных временах',
    'Понимать, когда используется пассив',
    'Переводить предложения из активного залога в пассивный',
    'Употреблять пассив с модальными глаголами и конструкцию have something done'
  ],
  c: `
<h3>Образование</h3>
<div class="rule" data-t="Формула"><p><b>be</b> (в нужном времени) + <b>V3</b> (третья форма глагола). Деятель, если нужен, вводится предлогом <b>by</b>, инструмент — <b>with</b>.</p></div>
<div class="tbl"><table><thead><tr><th>Время</th><th>Пассив</th><th>Пример</th></tr></thead><tbody>
<tr><td>Present Simple</td><td>am/is/are + V3</td><td>English is spoken all over the world.</td></tr>
<tr><td>Past Simple</td><td>was/were + V3</td><td>The bridge was built in 1890.</td></tr>
<tr><td>Future Simple</td><td>will be + V3</td><td>The results will be announced tomorrow.</td></tr>
<tr><td>Present Continuous</td><td>am/is/are being + V3</td><td>The road is being repaired.</td></tr>
<tr><td>Past Continuous</td><td>was/were being + V3</td><td>The house was being painted when we arrived.</td></tr>
<tr><td>Present Perfect</td><td>have/has been + V3</td><td>The letter has been sent.</td></tr>
<tr><td>Past Perfect</td><td>had been + V3</td><td>The work had been finished by 5 o’clock.</td></tr>
<tr><td>С модальными</td><td>modal + be + V3</td><td>The rules must be followed. It can be done.</td></tr>
</tbody></table></div>
<div class="ichika">Хитрость ♡ Время показывает глагол be, а смысл — третья форма. «The cake is being eaten» — торт едят прямо сейчас (is being — Present Continuous). «The cake has been eaten» — торт уже съели (has been — Present Perfect). Внимание к be — и время понятно.</div>

<h3>Когда используется</h3>
<ul><li>Деятель неизвестен или неважен: <i>My bike was stolen.</i></li><li>Деятель очевиден: <i>He was arrested</i> (понятно, что полицией).</li><li>Важен результат или процесс, а не исполнитель: <i>The museum was opened in 1852.</i></li><li>Официальный, научный, новостной стиль: <i>The experiment was carried out…</i></li></ul>

<h3>Из активного в пассивный</h3>
<div class="ex" data-t="Алгоритм"><ol><li>Активное: <i>Shakespeare <b>wrote</b> Hamlet.</i></li><li>Дополнение (Hamlet) становится подлежащим.</li><li>Глагол: be в том же времени (Past Simple → was) + V3 (written).</li><li>Деятель — после by, если важен.</li><li>Пассив: <i>Hamlet <b>was written</b> by Shakespeare.</i></li></ol></div>
<p>Вопросы и отрицания образуются с помощью be: <i>Was the letter sent? The room hasn’t been cleaned.</i></p>
<div class="warn"><p>Глаголы с двумя дополнениями (give, show, tell, offer) дают два варианта пассива. Чаще подлежащим становится человек: <i>I was given a book</i> (мне дали книгу). Возможно и <i>A book was given to me</i>. Непереходные глаголы (happen, arrive, die) пассива не образуют.</p></div>

<h3>Have something done</h3>
<p>Конструкция <b>have/get + объект + V3</b> означает, что действие выполняет кто-то другой для нас (обычно за плату): <i>I had my hair cut</i> (меня подстригли). <i>We are having our house painted. She got her phone repaired.</i></p>
<div class="ex" data-t="Сравним"><ol><li><i>I cut my hair</i> — я сам себя подстриг.</li><li><i>I had my hair cut</i> — меня подстриг парикмахер.</li></ol></div>
<p>Безличные конструкции новостного стиля: <i>It is said that…, He is believed to be…, She is known to have…</i> (говорят, что…; считается, что он…).</p>
<div class="ayano">Пассив на экзамене чаще всего проверяют в задании на грамматику: в пропуск нужно вставить глагол в правильной форме. Порядок действий: определи, кто совершает действие. Если подлежащее само ничего не делает (книгу пишут, мост строят), — пассив. Затем определи время по маркерам и поставь be в это время. Две проверки — и ошибки нет.</div>
`,
  p: [
    { q: 'Переведите в пассив: They grow coffee in Brazil.', a: 'Coffee is grown in Brazil.' },
    { q: 'Переведите в пассив: Someone has stolen my wallet.', a: 'My wallet has been stolen.' },
    { q: 'Поставьте глагол: The new school (build) now.', a: 'is being built — Present Continuous Passive.' },
    { q: 'Поставьте глагол: The Mona Lisa (paint) by Leonardo da Vinci.', a: 'was painted.' },
    { q: 'Скажите иначе: A mechanic repaired my car (используйте have something done).', a: 'I had my car repaired.' },
    { q: 'Пассив с модальным: You must do this exercise.', a: 'This exercise must be done.' }
  ],
  q: [
    { q: 'The letter ___ yesterday.', o: ['sent', 'was sent', 'has sent', 'is sending'], a: 1, e: 'Past Simple Passive.' },
    { q: 'The room ___ right now.', o: ['is cleaned', 'is being cleaned', 'has been cleaned', 'was cleaned'], a: 1, e: 'Сейчас — Present Continuous Passive.' },
    { q: 'The results ___ next week.', o: ['will announce', 'will be announced', 'are announcing', 'announced'], a: 1, e: 'Future Passive.' },
    { q: 'This book ___ into 50 languages.', o: ['has translated', 'has been translated', 'translated', 'is translating'], a: 1, e: 'Present Perfect Passive.' },
    { q: 'I ___ my eyes tested last week.', o: ['had', 'was', 'did', 'have been'], a: 0, e: 'have something done.' }
  ],
  s: [
    'Пассив: be в нужном времени + V3; деятель — by.',
    'Present: is done; Past: was done; Future: will be done; Continuous: is being done; Perfect: has been done.',
    'С модальными: must be done, can be done.',
    'Используется, когда деятель неизвестен, очевиден или неважен; в новостях и науке.',
    'Непереходные глаголы (happen, arrive) пассива не образуют.',
    'have something done — действие выполняет кто-то для нас.'
  ]
});
