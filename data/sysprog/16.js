L('sysprog', 16, {
  m: 45,
  intro: 'Финальная контрольная курса — собственный командный интерпретатор. Мини-shell соединяет почти всё, что мы изучили: чтение ввода, разбор строки, fork, exec, wait, коды возврата, встроенные команды, сигналы, а в расширенной версии — перенаправления и конвейеры. Вторая часть урока — вопросы, которые задают на собеседованиях на позицию junior-разработчика.',
  intro2: 'Сэмпай, ты дошёл до финала ♡ Сегодня пишешь свой shell — программу, которой пользуются каждый день миллионы людей. А потом я буду задавать тебе вопросы, как настоящий интервьюер. Только не нервничай!',
  goals: [
    'Написать мини-shell с запуском программ и встроенными командами cd и exit',
    'Расширить shell перенаправлениями, конвейером и обработкой Ctrl+C',
    'Уверенно отвечать на типовые вопросы собеседования по системному программированию',
    'Оценить свои знания и наметить дальнейшие шаги'
  ],
  c: `
<h3>Базовая версия</h3>
<pre class="code" data-lang="c">#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/wait.h>
#include <unistd.h>

#define MAX_ARGS 64

static int split(char *line, char *argv[]) {
    int argc = 0;
    for (char *t = strtok(line, " \\t\\n"); t && argc < MAX_ARGS - 1; t = strtok(NULL, " \\t\\n"))
        argv[argc++] = t;
    argv[argc] = NULL;
    return argc;
}

int main(void) {
    char *line = NULL;
    size_t cap = 0;
    int last = 0;
    for (;;) {
        printf("mysh[%d]$ ", last);
        fflush(stdout);
        if (getline(&line, &cap, stdin) < 0) break;       /* Ctrl+D */
        char *argv[MAX_ARGS];
        if (split(line, argv) == 0) continue;
        if (strcmp(argv[0], "exit") == 0) break;
        if (strcmp(argv[0], "cd") == 0) {                   /* встроенная команда */
            const char *dir = argv[1] ? argv[1] : getenv("HOME");
            if (chdir(dir) < 0) perror("cd");
            continue;
        }
        pid_t pid = fork();
        if (pid < 0) { perror("fork"); continue; }
        if (pid == 0) {
            execvp(argv[0], argv);
            perror(argv[0]);
            _exit(127);
        }
        int st;
        waitpid(pid, &st, 0);
        last = WIFEXITED(st) ? WEXITSTATUS(st) : 128 + WTERMSIG(st);
    }
    free(line);
    putchar('\\n');
    return 0;
}</pre>
<p>Почему <code>cd</code> — встроенная команда? Текущий каталог — свойство процесса. Если запустить <code>cd</code> в потомке, сменится каталог потомка, который тут же завершится, а shell останется на месте.</p>

<h3>Задания на расширение</h3>
<ol>
<li><b>Перенаправления</b> <code>&gt; file</code>, <code>&gt;&gt; file</code>, <code>&lt; file</code>: найти их среди аргументов, убрать из <code>argv</code>, в потомке открыть файл и сделать <code>dup2</code> (урок 9).</li>
<li><b>Конвейер</b> <code>a | b</code>: разделить строку по <code>|</code>, создать канал, два потомка, закрыть лишние концы (урок 9).</li>
<li><b>Ctrl+C</b>: shell игнорирует <code>SIGINT</code>, а потомок перед <code>exec</code> восстанавливает действие по умолчанию — тогда Ctrl+C прерывает запущенную программу, но не сам shell (урок 7).</li>
<li><b>Фоновый запуск</b> <code>cmd &amp;</code>: не ждать потомка сразу, а забирать завершившихся через <code>waitpid(-1, &amp;st, WNOHANG)</code> перед каждым приглашением.</li>
</ol>
<pre class="code" data-lang="c">/* фрагмент для Ctrl+C */
signal(SIGINT, SIG_IGN);           /* в main, один раз */
/* в потомке перед execvp: */
signal(SIGINT, SIG_DFL);</pre>
<pre class="code" data-lang="sh">$ gcc -Wall -Wextra -g -fsanitize=address,undefined mysh.c -o mysh
$ ./mysh
mysh[0]$ ls -l /tmp
mysh[0]$ nosuchcmd
nosuchcmd: No such file or directory
mysh[127]$ cd /usr && pwd       # && не поддерживается — хорошее задание на расширение
mysh[127]$ exit</pre>

<h3>Вопросы собеседования</h3>
<div class="tbl"><table><thead><tr><th>Вопрос</th><th>Суть ответа</th></tr></thead><tbody>
<tr><td>Процесс и поток — разница?</td><td>Процессы изолированы, у потоков общая память; поток дешевле, но нужна синхронизация</td></tr>
<tr><td>Что происходит при <code>fork</code>?</td><td>Копия процесса, память копируется лениво (copy-on-write), дескрипторы наследуются</td></tr>
<tr><td>Что такое системный вызов?</td><td>Контролируемый переход в ядро для действия, недоступного в пользовательском режиме</td></tr>
<tr><td>Стек и куча?</td><td>Стек — автоматически, кадры функций, ограничен; куча — <code>malloc</code>/<code>free</code>, вручную</td></tr>
<tr><td>Виртуальная память — зачем?</td><td>Изоляция процессов, защита страниц, ленивое выделение, общие библиотеки</td></tr>
<tr><td>Гонка данных и взаимоблокировка?</td><td>Одновременный доступ с записью без синхронизации; циклическое ожидание замков</td></tr>
<tr><td>Что такое файловый дескриптор?</td><td>Индекс в таблице открытых файлов процесса</td></tr>
<tr><td>Статическая и динамическая компоновка?</td><td>Код в программе против загрузки .so при запуске</td></tr>
<tr><td>Как найти утечку памяти?</td><td>AddressSanitizer/LeakSanitizer или <code>valgrind --leak-check=full</code></td></tr>
</tbody></table></div>
<div class="ichika">На собеседовании честное «не знаю, но вот как я бы выяснил» лучше уверенной ерунды ♡ Покажи, что знаешь инструменты: man, strace, gdb. Интервьюеры это обожают, сэмпай!</div>
<div class="ayano">Этот курс даёт фундамент, а не опыт. Junior-уровень — это когда ты сам, без подсказок, пишешь программы вроде мини-shell, эхо-сервера на poll или многопоточной очереди и отлаживаешь их инструментами. Следующие шаги: книга «Advanced Programming in the UNIX Environment», чтение исходников coreutils и собственный проект — например, HTTP-сервер на C.</div>
`,
  p: [
    { q: `Почему <code>cd</code> нельзя реализовать как внешнюю программу?`, a: `Текущий каталог — свойство процесса. Внешний <code>cd</code> сменит каталог потомка, который сразу завершится; у shell каталог останется прежним.` },
    { q: `Добавь перенаправление вывода <code>&gt; file</code> в мини-shell.`, a: `<pre class="code" data-lang="c">/* после split: найти ">" */
char *out = NULL;
for (int i = 0; argv[i]; i++)
    if (strcmp(argv[i], ">") == 0 && argv[i + 1]) {
        out = argv[i + 1];
        argv[i] = NULL;               /* обрезать аргументы */
        break;
    }
/* в потомке перед execvp: */
if (out) {
    int fd = open(out, O_WRONLY | O_CREAT | O_TRUNC, 0644);
    if (fd < 0) { perror(out); _exit(1); }
    dup2(fd, STDOUT_FILENO);
    close(fd);
}</pre>` },
    { q: `Почему Ctrl+C завершает и shell, и программу, и как это исправить?`, a: `Терминал посылает <code>SIGINT</code> всей группе процессов переднего плана. Исправление: shell игнорирует <code>SIGINT</code>, а потомок перед <code>exec</code> восстанавливает <code>SIG_DFL</code>.` },
    { q: `Как не накапливать зомби при фоновом запуске?`, a: `Перед каждым приглашением вызывать в цикле <code>waitpid(-1, &amp;st, WNOHANG)</code>, пока он возвращает положительный PID.` },
    { q: `Вопрос собеседования: что произойдёт, если записать в канал, у которого закрыт конец чтения?`, a: `Процесс получит <code>SIGPIPE</code> и по умолчанию завершится; если сигнал игнорируется, <code>write</code> вернёт −1 с <code>errno = EPIPE</code>.` },
    { q: `Вопрос собеседования: чем <code>exit</code> отличается от <code>_exit</code>?`, a: `<code>exit</code> вызывает обработчики <code>atexit</code> и сбрасывает буферы stdio, затем вызывает <code>_exit</code>. <code>_exit</code> сразу завершает процесс без этого — его используют в потомке после неудачного <code>exec</code>.` }
  ],
  q: [
    { q: `Встроенной командой shell обязана быть:`, o: [`<code>ls</code>`, `<code>cd</code>`, `<code>cat</code>`, `<code>grep</code>`], a: 1, e: `Меняет состояние самого shell.` },
    { q: `Чтение строки произвольной длины:`, o: [`<code>gets</code>`, `<code>getline</code>`, `<code>scanf("%s")</code>`, `<code>getchar</code> один раз`], a: 1, e: `gets опасна и удалена из стандарта.` },
    { q: `Забрать завершившихся фоновых потомков без блокировки:`, o: [`<code>wait(NULL)</code>`, `<code>waitpid(-1, &amp;st, WNOHANG)</code>`, `<code>sleep</code>`, `<code>kill</code>`], a: 1, e: `WNOHANG.` },
    { q: `Код возврата, если команда не найдена, по соглашению:`, o: [`0`, `1`, `127`, `255`], a: 2, e: `127.` },
    { q: `Copy-on-write при <code>fork</code> значит:`, o: [`память копируется сразу`, `страницы копируются при первой записи`, `память общая навсегда`, `память не копируется никогда`], a: 1, e: `Лениво.` }
  ],
  s: [
    `Мини-shell: <code>getline</code> → разбор → встроенные команды → fork/execvp/waitpid → код возврата.`,
    `<code>cd</code> и <code>exit</code> — встроенные: они меняют состояние самого shell.`,
    `Расширения: перенаправления (<code>dup2</code>), конвейер (<code>pipe</code>), Ctrl+C (<code>SIG_IGN</code>/<code>SIG_DFL</code>), фон (<code>WNOHANG</code>).`,
    `Собеседование: процессы и потоки, fork, системные вызовы, память, синхронизация, дескрипторы.`,
    `Отвечай честно и показывай, как бы выяснил ответ.`,
    `Дальше — APUE, исходники coreutils и свой проект.`
  ]
});
