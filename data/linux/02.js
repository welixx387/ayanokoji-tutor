L('linux', 2, {
  m: 35,
  intro: 'В Linux нет дисков C: и D: — всё начинается с одного корня /, а остальное — ветви одного дерева: программы, настройки, домашние каталоги, даже устройства. В этом уроке разберём, где что лежит, чем абсолютный путь отличается от относительного и как перемещаться по файловой системе командами pwd, cd и ls.',
  intro2: 'Сэмпай, файловая система Linux — как огромное дерево, а ты белочка, которая прыгает по веткам ♡ Главное — всегда знать, на какой ты ветке. Для этого есть pwd!',
  goals: [
    'Знать назначение основных каталогов: /home, /etc, /bin, /usr, /var, /tmp',
    'Различать абсолютные и относительные пути',
    'Перемещаться по дереву: pwd, cd, специальные имена . .. ~ -',
    'Смотреть содержимое каталогов: ls и его ключи'
  ],
  c: `
<h3>Дерево каталогов</h3>
<div class="tbl"><table><thead><tr><th>Каталог</th><th>Что там лежит</th></tr></thead><tbody>
<tr><td><code>/</code></td><td>корень — начало всего дерева</td></tr>
<tr><td><code>/home</code></td><td>домашние каталоги пользователей: <code>/home/anna</code></td></tr>
<tr><td><code>/root</code></td><td>домашний каталог администратора root</td></tr>
<tr><td><code>/etc</code></td><td>настройки системы и программ (текстовые файлы)</td></tr>
<tr><td><code>/bin</code>, <code>/usr/bin</code></td><td>программы (команды)</td></tr>
<tr><td><code>/usr/lib</code></td><td>библиотеки</td></tr>
<tr><td><code>/var</code></td><td>изменяемые данные: журналы <code>/var/log</code>, кэши, базы</td></tr>
<tr><td><code>/tmp</code></td><td>временные файлы, очищаются при перезагрузке</td></tr>
<tr><td><code>/dev</code></td><td>устройства в виде файлов: диски, терминалы</td></tr>
<tr><td><code>/proc</code></td><td>виртуальные файлы с информацией о процессах и ядре</td></tr>
</tbody></table></div>
<div class="ichika">В Linux «всё есть файл» ♡ Даже диск — это файл <code>/dev/sda</code>, а информация о процессоре лежит в файле <code>/proc/cpuinfo</code>. Попробуй <code>cat /proc/cpuinfo</code> — увидишь свой процессор!</div>

<h3>Пути</h3>
<div class="two"><div><h4>Абсолютный путь</h4><p>Начинается с <code>/</code> и не зависит от того, где ты находишься.</p><p><code>/home/anna/projects/hello.c</code></p></div><div><h4>Относительный путь</h4><p>Отсчитывается от текущего каталога.</p><p><code>projects/hello.c</code>, <code>../docs</code></p></div></div>
<div class="tbl"><table><thead><tr><th>Имя</th><th>Значение</th></tr></thead><tbody>
<tr><td><code>.</code></td><td>текущий каталог</td></tr>
<tr><td><code>..</code></td><td>родительский каталог</td></tr>
<tr><td><code>~</code></td><td>домашний каталог</td></tr>
<tr><td><code>-</code> (в <code>cd -</code>)</td><td>предыдущий каталог</td></tr>
</tbody></table></div>

<h3>Навигация</h3>
<pre class="code" data-lang="sh">$ pwd                 # где я?
/home/anna
$ cd /etc             # абсолютный путь
$ cd ..               # на уровень вверх: теперь /
$ cd ~/projects       # в projects внутри домашнего каталога
$ cd                  # без аргументов — домой
$ cd -                # вернуться туда, где был</pre>

<h3>ls: что в каталоге</h3>
<pre class="code" data-lang="sh">$ ls                  # имена файлов
$ ls -l               # подробно: права, владелец, размер, дата
$ ls -a               # включая скрытые (имена с точки: .bashrc)
$ ls -lh              # размеры в K, M, G
$ ls -lt              # сортировка по времени изменения
$ ls /var/log         # содержимое другого каталога</pre>
<p>Разбор строки <code>ls -l</code>:</p>
<pre class="code" data-lang="txt">-rw-r--r-- 1 anna anna 1234 Oct 24 10:00 notes.txt
drwxr-xr-x 2 anna anna 4096 Oct 24 09:00 projects</pre>
<p>Первый символ — тип: <code>-</code> файл, <code>d</code> каталог, <code>l</code> ссылка. Дальше — права (урок 4), число ссылок, владелец, группа, размер, дата и имя.</p>
<div class="warn"><p>В Linux регистр букв важен: <code>Notes.txt</code> и <code>notes.txt</code> — разные файлы. Пробелы в именах приходится экранировать (<code>my\\ file</code>) или брать в кавычки, поэтому в именах файлов лучше использовать дефис или подчёркивание.</p></div>
<div class="ayano">Почти все ошибки «файл не найден» у новичков — из-за неверного текущего каталога. Прежде чем запускать команду с относительным путём, проверь, где ты: <code>pwd</code> и <code>ls</code>. Две секунды на проверку экономят десять минут поиска причины.</div>
`,
  p: [
    { q: `Где искать настройки программ в Linux?`, a: `В каталоге <code>/etc</code>, а пользовательские — в скрытых файлах домашнего каталога (<code>~/.bashrc</code>, <code>~/.config</code>).` },
    { q: `Ты в <code>/home/anna/projects</code>. Перейди в <code>/home/anna/docs</code> относительным путём.`, a: `<pre class="code" data-lang="sh">$ cd ../docs</pre>` },
    { q: `Покажи все файлы домашнего каталога, включая скрытые, с размерами в удобном виде.`, a: `<pre class="code" data-lang="sh">$ ls -lah ~</pre>` },
    { q: `Строка <code>ls -l</code> начинается с <code>d</code>. Что это значит?`, a: `Это каталог (directory).` },
    { q: `Как одной командой вернуться в каталог, где ты был до последнего <code>cd</code>?`, a: `<code>cd -</code>` },
    { q: `Где лежат журналы системы?`, a: `В <code>/var/log</code>.` }
  ],
  q: [
    { q: `Корневой каталог обозначается:`, o: [`<code>~</code>`, `<code>/</code>`, `<code>.</code>`, `<code>C:</code>`], a: 1, e: `Корень дерева.` },
    { q: `Родительский каталог:`, o: [`<code>.</code>`, `<code>..</code>`, `<code>~</code>`, `<code>-</code>`], a: 1, e: `Две точки.` },
    { q: `Показать скрытые файлы:`, o: [`<code>ls -l</code>`, `<code>ls -a</code>`, `<code>ls -h</code>`, `<code>ls -t</code>`], a: 1, e: `-a = all.` },
    { q: `Временные файлы хранятся в:`, o: [`<code>/var</code>`, `<code>/tmp</code>`, `<code>/etc</code>`, `<code>/home</code>`], a: 1, e: `/tmp.` },
    { q: `Какой путь абсолютный?`, o: [`<code>docs/a.txt</code>`, `<code>../a.txt</code>`, `<code>/home/anna/a.txt</code>`, `<code>./a.txt</code>`], a: 2, e: `Начинается с /.` }
  ],
  s: [
    `Одно дерево с корнем <code>/</code>: <code>/home</code>, <code>/etc</code>, <code>/usr/bin</code>, <code>/var/log</code>, <code>/tmp</code>, <code>/dev</code>, <code>/proc</code>.`,
    `Абсолютный путь начинается с <code>/</code>, относительный — от текущего каталога.`,
    `<code>.</code> текущий, <code>..</code> родительский, <code>~</code> домашний, <code>cd -</code> предыдущий.`,
    `<code>pwd</code> — где я; <code>cd</code> — перейти; <code>ls -lah</code> — подробно, со скрытыми, в удобных единицах.`,
    `Первый символ <code>ls -l</code>: <code>-</code> файл, <code>d</code> каталог, <code>l</code> ссылка.`,
    `Регистр важен; пробелы в именах лучше не использовать.`
  ]
});
