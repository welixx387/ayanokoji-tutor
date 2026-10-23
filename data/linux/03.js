L('linux', 3, {
  m: 40,
  intro: 'Создавать, копировать, перемещать и удалять файлы — то, что в файловом менеджере делается мышкой, в терминале делается быстрее и точнее, особенно с сотнями файлов. В этом уроке — команды mkdir, touch, cp, mv, rm, просмотр файлов cat и less, поиск find и шаблоны имён, которые позволяют работать с группами файлов.',
  intro2: 'Сэмпай, команда rm удаляет файлы навсегда — без корзины ♡ Поэтому сегодня главное правило: думай, потом нажимай Enter. А в остальном — сплошное удовольствие, файлы будут летать!',
  goals: [
    'Создавать каталоги и файлы: mkdir, touch',
    'Копировать, перемещать, переименовывать и удалять: cp, mv, rm',
    'Просматривать файлы: cat, less, head, tail',
    'Искать файлы командой find и использовать шаблоны *, ?, []'
  ],
  c: `
<h3>Создание</h3>
<pre class="code" data-lang="sh">$ mkdir projects                 # каталог
$ mkdir -p projects/c/lesson1    # вся цепочка сразу
$ touch notes.txt                # пустой файл (или обновить время изменения)
$ echo "первая строка" > notes.txt   # записать текст в файл</pre>

<h3>Копирование, перемещение, удаление</h3>
<div class="tbl"><table><thead><tr><th>Команда</th><th>Действие</th></tr></thead><tbody>
<tr><td><code>cp a.txt b.txt</code></td><td>копировать файл</td></tr>
<tr><td><code>cp -r src/ backup/</code></td><td>копировать каталог рекурсивно</td></tr>
<tr><td><code>mv a.txt docs/</code></td><td>переместить в каталог</td></tr>
<tr><td><code>mv old.txt new.txt</code></td><td>переименовать</td></tr>
<tr><td><code>rm file.txt</code></td><td>удалить файл</td></tr>
<tr><td><code>rm -r dir/</code></td><td>удалить каталог со всем содержимым</td></tr>
<tr><td><code>rmdir dir/</code></td><td>удалить пустой каталог</td></tr>
</tbody></table></div>
<p>Безопасные ключи: <code>-i</code> — спрашивать подтверждение, <code>-v</code> — показывать, что делается: <code>cp -iv</code>, <code>rm -iv</code>.</p>
<div class="warn"><p><code>rm</code> удаляет без корзины. Особенно опасны <code>rm -rf</code> и шаблоны: <code>rm -rf ./*</code> в неверном каталоге уничтожит всё. Перед удалением по шаблону сначала выполни <code>ls</code> с тем же шаблоном и посмотри, что попадёт под удаление.</p></div>

<h3>Просмотр файлов</h3>
<pre class="code" data-lang="sh">$ cat notes.txt          # вывести файл целиком
$ less /var/log/syslog   # постранично: пробел — дальше, q — выход, /слово — поиск
$ head -n 5 data.csv     # первые 5 строк
$ tail -n 20 app.log     # последние 20 строк
$ tail -f app.log        # следить за файлом в реальном времени (Ctrl+C — выход)</pre>
<div class="ichika"><code>tail -f</code> — любимая команда тех, кто чинит серверы ♡ Запускаешь программу в одном окне, а в другом смотришь, как в журнал прилетают строки. Как сериал, только про ошибки!</div>

<h3>Шаблоны имён</h3>
<div class="tbl"><table><thead><tr><th>Шаблон</th><th>Значение</th><th>Пример</th></tr></thead><tbody>
<tr><td><code>*</code></td><td>любые символы</td><td><code>ls *.c</code> — все файлы на .c</td></tr>
<tr><td><code>?</code></td><td>ровно один символ</td><td><code>ls lesson?.txt</code></td></tr>
<tr><td><code>[abc]</code></td><td>один из символов</td><td><code>ls file[12].txt</code></td></tr>
<tr><td><code>{a,b}</code></td><td>варианты</td><td><code>mkdir {src,docs,tests}</code></td></tr>
</tbody></table></div>
<p>Шаблоны раскрывает сама оболочка до запуска команды: <code>cp *.c backup/</code> превращается в список конкретных файлов.</p>

<h3>Поиск: find</h3>
<pre class="code" data-lang="sh">$ find . -name "*.c"                 # все .c в текущем каталоге и ниже
$ find ~ -type d -name "build"       # каталоги с именем build
$ find /var/log -size +10M           # файлы больше 10 МБ
$ find . -name "*.tmp" -mtime +7     # .tmp старше 7 дней
$ find . -name "*.o" -delete         # найти и удалить</pre>
<div class="ayano">Прежде чем выполнять разрушительную команду, сделай «пробный прогон»: тот же <code>find</code> без <code>-delete</code>, тот же шаблон с <code>ls</code> вместо <code>rm</code>. Это привычка профессионалов, и она стоит дороже любой резервной копии. Проверка занимает секунды, восстановление — часы или никогда.</div>
`,
  p: [
    { q: `Создай одной командой каталоги <code>src</code>, <code>docs</code> и <code>tests</code>.`, a: `<pre class="code" data-lang="sh">$ mkdir src docs tests
$ mkdir {src,docs,tests}      # то же через фигурные скобки</pre>` },
    { q: `Скопируй все файлы <code>.c</code> из текущего каталога в <code>backup/</code>.`, a: `<pre class="code" data-lang="sh">$ cp *.c backup/</pre>` },
    { q: `Переименуй <code>draft.txt</code> в <code>final.txt</code>.`, a: `<pre class="code" data-lang="sh">$ mv draft.txt final.txt</pre>` },
    { q: `Покажи последние 50 строк журнала <code>app.log</code> и продолжай следить за ним.`, a: `<pre class="code" data-lang="sh">$ tail -n 50 -f app.log</pre>` },
    { q: `Найди в домашнем каталоге все файлы <code>.pdf</code> больше 5 МБ.`, a: `<pre class="code" data-lang="sh">$ find ~ -name "*.pdf" -size +5M</pre>` },
    { q: `Как безопасно удалить все <code>.tmp</code> файлы в каталоге?`, a: `Сначала посмотреть: <code>ls *.tmp</code> (или <code>find . -name "*.tmp"</code>), затем удалить: <code>rm *.tmp</code> (или добавить <code>-delete</code> к find).` }
  ],
  q: [
    { q: `Создать вложенные каталоги одной командой:`, o: [`<code>mkdir -r</code>`, `<code>mkdir -p</code>`, `<code>touch -p</code>`, `<code>md</code>`], a: 1, e: `-p = parents.` },
    { q: `Переименование файла:`, o: [`<code>rename</code> всегда`, `<code>mv</code>`, `<code>cp</code>`, `<code>rn</code>`], a: 1, e: `mv old new.` },
    { q: `Скопировать каталог:`, o: [`<code>cp dir new</code>`, `<code>cp -r dir new</code>`, `<code>mv -c dir new</code>`, `<code>copy dir</code>`], a: 1, e: `Рекурсивно.` },
    { q: `Шаблон <code>?</code> означает:`, o: [`любые символы`, `ровно один символ`, `ноль символов`, `вопросительный знак`], a: 1, e: `Один символ.` },
    { q: `Выйти из less:`, o: [`Esc`, `q`, `Ctrl+X`, `exit`], a: 1, e: `q.` }
  ],
  s: [
    `<code>mkdir -p</code> — каталоги цепочкой; <code>touch</code> — пустой файл.`,
    `<code>cp</code> (с <code>-r</code> для каталогов), <code>mv</code> — переместить или переименовать.`,
    `<code>rm</code> удаляет без корзины; <code>-i</code> спрашивает; сначала проверяй шаблон через <code>ls</code>.`,
    `Просмотр: <code>cat</code>, <code>less</code>, <code>head -n</code>, <code>tail -n</code>, <code>tail -f</code>.`,
    `Шаблоны <code>*</code>, <code>?</code>, <code>[..]</code>, <code>{a,b}</code> раскрывает оболочка.`,
    `<code>find путь -name -type -size -mtime</code>, действие <code>-delete</code>.`
  ]
});
