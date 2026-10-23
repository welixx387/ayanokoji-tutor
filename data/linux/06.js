L('linux', 6, {
  m: 35,
  intro: 'На серверах нет графического интерфейса, поэтому файлы настроек редактируют прямо в терминале. В этом уроке — два главных редактора: простой nano и мощный vim, а также встроенная справка man, которая отвечает на вопрос «как работает эта команда» быстрее любого поисковика. Без этих навыков на сервере не обойтись.',
  intro2: 'Сэмпай, есть старая шутка: «Как выйти из vim? Никак, живи там теперь» ♡ Сегодня я открою тебе секрет выхода. И ещё научу nano — он добрый и всё подсказывает внизу экрана.',
  goals: [
    'Редактировать файлы в nano',
    'Освоить базовые режимы и команды vim',
    'Пользоваться справкой: man, --help, tldr',
    'Понимать структуру страницы man'
  ],
  c: `
<h3>nano — простой редактор</h3>
<pre class="code" data-lang="sh">$ nano notes.txt</pre>
<p>Подсказки внизу экрана: символ <code>^</code> означает Ctrl.</p>
<div class="tbl"><table><thead><tr><th>Клавиши</th><th>Действие</th></tr></thead><tbody>
<tr><td>Ctrl+O, затем Enter</td><td>сохранить</td></tr>
<tr><td>Ctrl+X</td><td>выйти</td></tr>
<tr><td>Ctrl+W</td><td>поиск</td></tr>
<tr><td>Ctrl+K / Ctrl+U</td><td>вырезать строку / вставить</td></tr>
<tr><td>Alt+U</td><td>отменить</td></tr>
</tbody></table></div>

<h3>vim — режимы</h3>
<p>Главная особенность vim — режимы. В <b>нормальном</b> режиме клавиши — это команды, в режиме <b>вставки</b> — текст.</p>
<div class="tbl"><table><thead><tr><th>Режим</th><th>Как войти</th><th>Для чего</th></tr></thead><tbody>
<tr><td>Нормальный</td><td>Esc</td><td>перемещение, удаление, копирование</td></tr>
<tr><td>Вставка</td><td><code>i</code> (перед курсором), <code>a</code> (после), <code>o</code> (новая строка)</td><td>ввод текста</td></tr>
<tr><td>Командная строка</td><td><code>:</code> из нормального</td><td>сохранение, выход, замена</td></tr>
</tbody></table></div>
<div class="tbl"><table><thead><tr><th>Команда</th><th>Действие</th></tr></thead><tbody>
<tr><td><code>:w</code> / <code>:q</code> / <code>:wq</code></td><td>сохранить / выйти / сохранить и выйти</td></tr>
<tr><td><code>:q!</code></td><td>выйти без сохранения</td></tr>
<tr><td><code>h j k l</code></td><td>влево, вниз, вверх, вправо</td></tr>
<tr><td><code>dd</code> / <code>yy</code> / <code>p</code></td><td>удалить строку / скопировать строку / вставить</td></tr>
<tr><td><code>u</code> / Ctrl+R</td><td>отменить / повторить</td></tr>
<tr><td><code>/слово</code>, затем <code>n</code></td><td>поиск и следующее совпадение</td></tr>
<tr><td><code>gg</code> / <code>G</code></td><td>в начало / в конец файла</td></tr>
<tr><td><code>:%s/old/new/g</code></td><td>заменить во всём файле</td></tr>
</tbody></table></div>
<div class="ichika">Секрет выхода из vim ♡ Нажми Esc (можно несколько раз), затем набери <code>:q!</code> и Enter — выйдешь без сохранения. А <code>:wq</code> — с сохранением. Всё, ты свободен! Встроенный тренажёр: команда <code>vimtutor</code>, 30 минут — и vim перестанет пугать.</div>

<h3>Справка: man и --help</h3>
<pre class="code" data-lang="sh">$ man ls            # полная справка, выход — q, поиск — /слово
$ ls --help         # краткая справка от самой программы
$ man -k password   # поиск страниц по ключевому слову
$ man 2 open        # раздел 2: системные вызовы
$ man 3 printf      # раздел 3: функции библиотеки C</pre>
<div class="tbl"><table><thead><tr><th>Раздел man</th><th>Содержимое</th></tr></thead><tbody>
<tr><td>1</td><td>команды пользователя (<code>ls</code>, <code>grep</code>)</td></tr>
<tr><td>2</td><td>системные вызовы (<code>open</code>, <code>fork</code>)</td></tr>
<tr><td>3</td><td>функции библиотек (<code>printf</code>, <code>malloc</code>)</td></tr>
<tr><td>5</td><td>форматы файлов (<code>passwd</code>, <code>fstab</code>)</td></tr>
<tr><td>8</td><td>команды администратора (<code>mount</code>)</td></tr>
</tbody></table></div>
<p>Структура страницы: NAME, SYNOPSIS (синтаксис, необязательное в <code>[ ]</code>), DESCRIPTION, OPTIONS, EXAMPLES, SEE ALSO.</p>
<div class="warn"><p>Справка в man описывает именно ту версию программы, что установлена у тебя. Статья из интернета может относиться к другой версии или другой ОС (например, macOS), где ключи отличаются.</p></div>
<div class="ayano">Привычка открывать man прежде, чем искать в интернете, — признак инженера. Поначалу страницы кажутся сухими, но в них всегда есть ответ, и он точный. Для быстрых примеров можно поставить утилиту <code>tldr</code>, но разбираться в деталях всё равно придётся по man.</div>
`,
  p: [
    { q: `Ты открыл файл в vim и случайно что-то напечатал. Как выйти без сохранения?`, a: `Esc, затем <code>:q!</code> и Enter.` },
    { q: `Как в nano сохранить файл и выйти?`, a: `Ctrl+O, Enter (сохранить), затем Ctrl+X (выйти).` },
    { q: `Замени в vim все вхождения <code>localhost</code> на <code>127.0.0.1</code>.`, a: `В нормальном режиме: <code>:%s/localhost/127.0.0.1/g</code> и Enter.` },
    { q: `Найди в справке, как сделать <code>ls</code> с сортировкой по размеру.`, a: `<code>man ls</code>, затем <code>/size</code> — найдётся ключ <code>-S</code>: <code>ls -lS</code>.` },
    { q: `Как открыть справку по системному вызову <code>write</code>, а не по команде <code>write</code>?`, a: `<pre class="code" data-lang="sh">$ man 2 write</pre>` },
    { q: `Удали в vim текущую строку и вставь её двумя строками ниже.`, a: `<code>dd</code>, затем <code>j</code> (вниз), затем <code>p</code> — вставка под курсором.` }
  ],
  q: [
    { q: `Выйти из vim без сохранения:`, o: [`<code>:wq</code>`, `<code>:q!</code>`, `<code>Ctrl+X</code>`, `<code>exit</code>`], a: 1, e: `:q!` },
    { q: `Режим вставки в vim включает клавиша:`, o: [`Esc`, `<code>i</code>`, `<code>:</code>`, `<code>v</code> только`], a: 1, e: `i = insert.` },
    { q: `В nano символ <code>^</code> означает:`, o: [`Shift`, `Ctrl`, `Alt`, `Tab`], a: 1, e: `Ctrl.` },
    { q: `Раздел man с функциями библиотеки C:`, o: [`1`, `2`, `3`, `8`], a: 2, e: `3.` },
    { q: `Поиск страниц man по ключевому слову:`, o: [`<code>man -k</code>`, `<code>man -s</code>`, `<code>man --find</code>`, `<code>man -h</code>`], a: 0, e: `apropos.` }
  ],
  s: [
    `nano: Ctrl+O сохранить, Ctrl+X выйти, Ctrl+W поиск.`,
    `vim: нормальный режим (Esc), вставка (i, a, o), командная строка (:).`,
    `<code>:w</code>, <code>:q</code>, <code>:wq</code>, <code>:q!</code>; <code>dd</code>, <code>yy</code>, <code>p</code>, <code>u</code>, <code>/поиск</code>, <code>:%s/a/b/g</code>.`,
    `<code>vimtutor</code> — встроенный тренажёр.`,
    `<code>man команда</code>, <code>--help</code>, <code>man -k</code>; разделы 1, 2, 3, 5, 8.`,
    `man описывает именно твою версию программы.`
  ]
});
