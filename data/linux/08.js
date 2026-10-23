L('linux', 8, {
  m: 45,
  intro: 'Контрольная точка основ. Проверим, можешь ли ты провести рабочий день в терминале без мыши: организовать проект, найти и обработать данные, разобраться с правами и процессами. Урок построен как практикум из реальных задач, а в конце — чек-лист навыков, которые должны быть отточены перед переходом к уровню Junior.',
  intro2: 'Сэмпай, сегодня экзамен на выживание в терминале ♡ Мышку убираем в ящик! Если справишься со всеми задачами — ты официально перестал бояться чёрного экрана. Я в тебя верю!',
  goals: [
    'Применить навигацию, работу с файлами и шаблоны в одной задаче',
    'Обработать журнал конвейером',
    'Настроить права и проверить их',
    'Найти и завершить «зависший» процесс'
  ],
  c: `
<h3>Задача 1. Структура проекта</h3>
<p>Создай проект с подкаталогами и файлами, затем убедись, что всё на месте:</p>
<pre class="code" data-lang="sh">$ mkdir -p ~/lab/{src,docs,logs,backup}
$ cd ~/lab
$ touch src/{main,utils}.c docs/README.md
$ ls -R
.:
backup  docs  logs  src
./docs:
README.md
./src:
main.c  utils.c</pre>

<h3>Задача 2. Журнал</h3>
<p>Сгенерируем учебный журнал и проанализируем его:</p>
<pre class="code" data-lang="sh">$ for i in $(seq 1 200); do echo "$((RANDOM % 5)) user$((RANDOM % 10)) $([ $((RANDOM % 4)) -eq 0 ] && echo ERROR || echo OK)"; done > logs/app.log
$ grep -c ERROR logs/app.log                       # сколько ошибок
$ grep ERROR logs/app.log | cut -d' ' -f2 | sort | uniq -c | sort -rn | head -n 3   # у кого больше всего</pre>
<div class="ichika">Не пугайся первой строки ♡ Это просто цикл, который печатает 200 случайных строк вида «3 user7 OK». <code>$RANDOM</code> — случайное число, <code>$((…))</code> — арифметика. Подробно про такие скрипты — в уроке 10!</div>

<h3>Задача 3. Права и резервная копия</h3>
<pre class="code" data-lang="sh">$ cat > backup.sh << 'EOF'
#!/bin/bash
tar -czf ~/lab/backup/src-$(date +%F).tar.gz -C ~/lab src
echo "Готово"
EOF
$ chmod 700 backup.sh       # только владелец
$ ./backup.sh
$ ls -l backup/</pre>
<p><code>tar -czf</code> создаёт сжатый архив, <code>date +%F</code> подставляет дату вида 2026-10-24. Права 700 — потому что скрипт личный.</p>

<h3>Задача 4. Зависший процесс</h3>
<pre class="code" data-lang="sh">$ yes > /dev/null &          # процесс, который грузит процессор
$ top                         # видим yes наверху по %CPU, выходим q
$ pgrep -a yes
$ kill $(pgrep yes)           # завершаем</pre>

<h3>Чек-лист основ</h3>
<ul class="ex-l">
<li>Перемещаюсь по файловой системе и знаю назначение <code>/etc</code>, <code>/var/log</code>, <code>/home</code>, <code>/tmp</code>.</li>
<li>Создаю, копирую, перемещаю и удаляю файлы, использую шаблоны и <code>find</code>.</li>
<li>Читаю и меняю права, понимаю 644, 755, 600, пользуюсь sudo осознанно.</li>
<li>Перенаправляю потоки и строю конвейеры из grep, sort, uniq, cut, wc.</li>
<li>Редактирую файлы в nano и выхожу из vim; нахожу ответы в man.</li>
<li>Смотрю процессы, завершаю их сигналами, управляю фоновыми задачами.</li>
</ul>
<div class="warn"><p>Если хотя бы один пункт вызывает сомнения, вернись к соответствующему уроку. Уровень Junior строится на этих навыках: скрипты, сеть и сервисы предполагают, что основы работают «на автомате».</p></div>
<div class="ayano">Самопроверка простая: выполни все четыре задачи, не подглядывая в решения, и засеки время. Если уложился в 20 минут без поиска в интернете — основы освоены. Если пришлось искать каждую команду — повтори уроки и попробуй через пару дней снова. Скорость приходит от повторения, а не от чтения.</div>
`,
  p: [
    { q: `Создай одной командой каталоги <code>project/src</code>, <code>project/tests</code> и <code>project/docs</code>.`, a: `<pre class="code" data-lang="sh">$ mkdir -p project/{src,tests,docs}</pre>` },
    { q: `Посчитай количество файлов <code>.c</code> во всех подкаталогах <code>~/lab</code>.`, a: `<pre class="code" data-lang="sh">$ find ~/lab -name "*.c" | wc -l</pre>` },
    { q: `Выведи 3 самых больших файла в <code>/var/log</code> (подсказка: <code>du</code> или <code>ls -S</code>).`, a: `<pre class="code" data-lang="sh">$ ls -lS /var/log | head -n 4
$ sudo du -a /var/log | sort -rn | head -n 3</pre>` },
    { q: `Сделай <code>deploy.sh</code> исполняемым для владельца и группы, но не для остальных.`, a: `<pre class="code" data-lang="sh">$ chmod 750 deploy.sh</pre>` },
    { q: `Найди процессы, занимающие больше всего памяти, без интерактивного top.`, a: `<pre class="code" data-lang="sh">$ ps aux --sort=-%mem | head -n 6</pre>` },
    { q: `Создай архив каталога <code>docs</code> с датой в имени.`, a: `<pre class="code" data-lang="sh">$ tar -czf docs-$(date +%F).tar.gz docs</pre>` }
  ],
  q: [
    { q: `<code>ls -R</code> показывает:`, o: [`файлы по размеру`, `содержимое каталогов рекурсивно`, `только скрытые`, `в обратном порядке`], a: 1, e: `Recursive.` },
    { q: `Создать сжатый архив:`, o: [`<code>tar -xzf</code>`, `<code>tar -czf</code>`, `<code>zip -d</code>`, `<code>gzip -l</code>`], a: 1, e: `c = create.` },
    { q: `Распаковать архив .tar.gz:`, o: [`<code>tar -czf</code>`, `<code>tar -xzf</code>`, `<code>tar -t</code>`, `<code>unzip</code>`], a: 1, e: `x = extract.` },
    { q: `<code>$(pgrep yes)</code> в команде означает:`, o: [`переменную`, `подстановку вывода команды`, `комментарий`, `ошибку`], a: 1, e: `Командная подстановка.` },
    { q: `Права 700 означают:`, o: [`всем всё`, `только владелец: читать, писать, выполнять`, `всем читать`, `никому ничего`], a: 1, e: `rwx------.` }
  ],
  s: [
    `<code>mkdir -p a/{b,c}</code>, <code>touch</code>, <code>ls -R</code> — структура проекта.`,
    `Анализ журнала: <code>grep</code>, <code>cut</code>, <code>sort</code>, <code>uniq -c</code>, <code>head</code>.`,
    `<code>tar -czf</code> — архив, <code>tar -xzf</code> — распаковка, <code>$(date +%F)</code> — дата в имени.`,
    `<code>chmod 700</code>/<code>750</code> по задаче; <code>$(команда)</code> — подстановка вывода.`,
    `Зависший процесс: <code>top</code> → <code>pgrep</code> → <code>kill</code>.`,
    `Все задачи за 20 минут без подсказок — основы освоены.`
  ]
});
