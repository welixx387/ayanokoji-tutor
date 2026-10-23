L('linux', 5, {
  m: 40,
  intro: 'Философия Unix: каждая программа делает одно дело хорошо, а программы соединяются в цепочки через конвейеры. Маленькие утилиты grep, sort, uniq, wc, cut, head и tail вместе решают задачи, для которых в других системах пишут отдельные программы: найти ошибки в журнале, посчитать уникальных посетителей, вытащить колонку из таблицы. Плюс перенаправление ввода и вывода.',
  intro2: 'Сэмпай, конвейер в Linux — как цепочка роботов на заводе ♡ Первый достаёт строки, второй фильтрует, третий сортирует, четвёртый считает. Ставишь между ними палочку | — и магия готова!',
  goals: [
    'Понимать стандартные потоки stdin, stdout, stderr',
    'Перенаправлять вывод: >, >>, <, 2>, 2>&1',
    'Соединять команды конвейером |',
    'Использовать grep, sort, uniq, wc, cut, head, tail для обработки текста'
  ],
  c: `
<h3>Стандартные потоки</h3>
<div class="tbl"><table><thead><tr><th>Поток</th><th>Номер</th><th>По умолчанию</th></tr></thead><tbody>
<tr><td>stdin — ввод</td><td>0</td><td>клавиатура</td></tr>
<tr><td>stdout — вывод</td><td>1</td><td>экран</td></tr>
<tr><td>stderr — ошибки</td><td>2</td><td>экран</td></tr>
</tbody></table></div>
<pre class="code" data-lang="sh">$ ls -l > list.txt          # stdout в файл (перезаписать)
$ echo "ещё" >> list.txt    # дописать в конец
$ sort < names.txt          # stdin из файла
$ ls /nope 2> errors.txt    # только ошибки в файл
$ make > build.log 2>&1     # и вывод, и ошибки в один файл
$ find / -name "*.conf" 2>/dev/null   # выбросить ошибки</pre>
<p><code>/dev/null</code> — «чёрная дыра»: всё записанное туда исчезает.</p>

<h3>Конвейеры</h3>
<p>Символ <code>|</code> передаёт stdout одной команды на stdin следующей:</p>
<pre class="code" data-lang="sh">$ ls -l /usr/bin | wc -l               # сколько файлов
$ history | grep ssh                   # найти команды с ssh
$ cat access.log | head -n 3</pre>

<h3>Утилиты для текста</h3>
<div class="tbl"><table><thead><tr><th>Команда</th><th>Что делает</th><th>Пример</th></tr></thead><tbody>
<tr><td><code>grep</code></td><td>строки по шаблону</td><td><code>grep -i error app.log</code></td></tr>
<tr><td><code>wc</code></td><td>считает строки, слова, байты</td><td><code>wc -l file</code></td></tr>
<tr><td><code>sort</code></td><td>сортирует</td><td><code>sort -n</code> (числа), <code>-r</code> (обратно)</td></tr>
<tr><td><code>uniq</code></td><td>убирает повторы подряд</td><td><code>uniq -c</code> (с подсчётом)</td></tr>
<tr><td><code>cut</code></td><td>вырезает колонки</td><td><code>cut -d',' -f2 data.csv</code></td></tr>
<tr><td><code>tr</code></td><td>заменяет символы</td><td><code>tr 'a-z' 'A-Z'</code></td></tr>
</tbody></table></div>
<p>Полезные ключи grep: <code>-i</code> без учёта регистра, <code>-n</code> номера строк, <code>-v</code> строки без шаблона, <code>-r</code> поиск по каталогу, <code>-c</code> количество.</p>
<div class="warn"><p><code>uniq</code> убирает только соседние повторы. Поэтому перед ним почти всегда стоит <code>sort</code>: <code>sort | uniq -c</code>.</p></div>

<h3>Реальная задача</h3>
<p>Журнал веб-сервера, где первая колонка — IP-адрес. Найдём пять самых активных адресов:</p>
<pre class="code" data-lang="sh">$ cut -d' ' -f1 access.log | sort | uniq -c | sort -rn | head -n 5
    842 192.168.1.15
    301 10.0.0.7
    ...</pre>
<ol>
<li><code>cut</code> вытаскивает первое поле (IP).</li>
<li><code>sort</code> группирует одинаковые адреса рядом.</li>
<li><code>uniq -c</code> считает повторы.</li>
<li><code>sort -rn</code> сортирует по числу по убыванию.</li>
<li><code>head</code> оставляет пять первых.</li>
</ol>
<div class="ichika">Этот конвейер из пяти команд спрашивают на собеседованиях на позицию системного администратора ♡ Выучи его как стишок: cut, sort, uniq -c, sort -rn, head. Звучит как заклинание!</div>
<div class="ayano">Строй конвейеры постепенно: добавь первую команду, посмотри результат, затем вторую. Если сразу написать цепочку из шести звеньев, ошибку будет трудно найти. Каждое звено должно выдавать то, что ты ожидаешь, — проверяй это по одному шагу.</div>
`,
  p: [
    { q: `Сохрани список файлов <code>/etc</code> в <code>etc.txt</code>, а ошибки выброси.`, a: `<pre class="code" data-lang="sh">$ ls /etc > etc.txt 2>/dev/null</pre>` },
    { q: `Посчитай, сколько строк в <code>app.log</code> содержат слово ERROR (без учёта регистра).`, a: `<pre class="code" data-lang="sh">$ grep -ic error app.log</pre>` },
    { q: `Выведи строки <code>app.log</code>, в которых нет слова DEBUG.`, a: `<pre class="code" data-lang="sh">$ grep -v DEBUG app.log</pre>` },
    { q: `В файле <code>words.txt</code> по слову на строке. Выведи уникальные слова с количеством, самые частые сверху.`, a: `<pre class="code" data-lang="sh">$ sort words.txt | uniq -c | sort -rn</pre>` },
    { q: `Из CSV <code>users.csv</code> (разделитель запятая) выведи только третью колонку.`, a: `<pre class="code" data-lang="sh">$ cut -d',' -f3 users.csv</pre>` },
    { q: `Найди во всех файлах <code>.c</code> текущего каталога строки с <code>malloc</code> и номерами строк.`, a: `<pre class="code" data-lang="sh">$ grep -n malloc *.c
$ grep -rn malloc .        # рекурсивно по всем подкаталогам</pre>` }
  ],
  q: [
    { q: `Номер потока ошибок:`, o: [`0`, `1`, `2`, `3`], a: 2, e: `stderr = 2.` },
    { q: `Дописать вывод в конец файла:`, o: [`<code>&gt;</code>`, `<code>&gt;&gt;</code>`, `<code>&lt;</code>`, `<code>|</code>`], a: 1, e: `>> добавляет.` },
    { q: `Перед <code>uniq</code> обычно нужен:`, o: [`<code>grep</code>`, `<code>sort</code>`, `<code>cut</code>`, `<code>wc</code>`], a: 1, e: `uniq убирает только соседние повторы.` },
    { q: `<code>grep -v</code> показывает:`, o: [`номера строк`, `строки без шаблона`, `только количество`, `версию`], a: 1, e: `Инверсия.` },
    { q: `Отправить и вывод, и ошибки в файл:`, o: [`<code>cmd &gt; f 2&gt;&amp;1</code>`, `<code>cmd 2&gt; f</code>`, `<code>cmd | f</code>`, `<code>cmd &lt; f</code>`], a: 0, e: `Сначала stdout в файл, затем stderr туда же.` }
  ],
  s: [
    `Потоки: stdin 0, stdout 1, stderr 2.`,
    `<code>&gt;</code> перезаписать, <code>&gt;&gt;</code> дописать, <code>&lt;</code> ввод из файла, <code>2&gt;</code> ошибки, <code>2&gt;&amp;1</code> ошибки туда же.`,
    `<code>/dev/null</code> — выбросить вывод.`,
    `Конвейер <code>|</code>: stdout → stdin следующей команды.`,
    `grep (-i -n -v -r -c), wc -l, sort (-n -r), uniq -c, cut -d -f, tr.`,
    `Классика: <code>cut | sort | uniq -c | sort -rn | head</code>.`
  ]
});
