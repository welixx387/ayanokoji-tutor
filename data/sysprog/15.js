L('sysprog', 15, {
  m: 40,
  intro: 'Junior-разработчик отличается от новичка не тем, что не делает ошибок, а тем, что умеет их быстро находить. В Linux для этого есть мощный набор инструментов: отладчик gdb, трассировщик системных вызовов strace, детектор ошибок памяти Valgrind и санитайзеры компилятора. Сегодня разберём одну программу с ошибками всеми четырьмя способами.',
  intro2: 'Сэмпай, отладка — это детективная работа ♡ gdb — допрос подозреваемого шаг за шагом, strace — запись всех его телефонных звонков, а санитайзеры — камеры наблюдения, которые сразу кричат «вот он!». Сегодня ты станешь детективом!',
  goals: [
    'Собирать программы с отладочной информацией',
    'Использовать gdb: точки останова, пошаговое выполнение, стек вызовов, просмотр переменных',
    'Находить ошибки памяти через AddressSanitizer и Valgrind',
    'Анализировать падения по дампу памяти и поведение программы через strace'
  ],
  c: `
<h3>Подопытная программа</h3>
<pre class="code" data-lang="c">#include <stdio.h>
#include <stdlib.h>

int sum(const int *a, int n) {
    int s = 0;
    for (int i = 0; i <= n; i++)     /* ошибка: выход за границу */
        s += a[i];
    return s;
}

int main(void) {
    int *a = malloc(5 * sizeof *a);
    for (int i = 0; i < 5; i++) a[i] = i + 1;
    printf("%d\\n", sum(a, 5));
    return 0;                        /* ошибка: нет free — утечка */
}</pre>
<p>Программа может даже напечатать правдоподобное число — ошибка памяти не обязана приводить к падению. Именно поэтому нужны инструменты.</p>

<h3>gdb</h3>
<pre class="code" data-lang="sh">$ gcc -g -O0 bug.c -o bug        # -g: отладочная информация, -O0: без оптимизаций
$ gdb ./bug
(gdb) break sum                  # остановиться при входе в sum
(gdb) run
(gdb) next                       # следующая строка
(gdb) print i
(gdb) print a[0]@5               # пять элементов массива
(gdb) bt                         # стек вызовов
(gdb) watch s                    # остановиться при изменении s
(gdb) continue
(gdb) quit</pre>
<div class="tbl"><table><thead><tr><th>Команда</th><th>Сокращение</th><th>Что делает</th></tr></thead><tbody>
<tr><td><code>break файл.c:12</code></td><td><code>b</code></td><td>точка останова</td></tr>
<tr><td><code>run</code></td><td><code>r</code></td><td>запустить программу</td></tr>
<tr><td><code>next</code> / <code>step</code></td><td><code>n</code> / <code>s</code></td><td>строка без захода / с заходом в функции</td></tr>
<tr><td><code>finish</code></td><td></td><td>выполнить до выхода из функции</td></tr>
<tr><td><code>print выражение</code></td><td><code>p</code></td><td>вывести значение</td></tr>
<tr><td><code>backtrace</code></td><td><code>bt</code></td><td>стек вызовов</td></tr>
<tr><td><code>frame N</code></td><td><code>f</code></td><td>перейти в кадр стека</td></tr>
<tr><td><code>info locals</code></td><td></td><td>все локальные переменные</td></tr>
</tbody></table></div>
<p>Если программа упала, дамп памяти позволяет исследовать момент падения: разреши дампы <code>ulimit -c unlimited</code> и открой <code>gdb ./prog core</code>. В системах с systemd дампы собирает <code>coredumpctl</code>: команда <code>coredumpctl gdb</code> открывает последний.</p>

<h3>Санитайзеры и Valgrind</h3>
<pre class="code" data-lang="sh">$ gcc -g -fsanitize=address,undefined bug.c -o bug && ./bug
==4711==ERROR: AddressSanitizer: heap-buffer-overflow
READ of size 4 ... in sum bug.c:6
...
==4711==ERROR: LeakSanitizer: detected memory leaks
Direct leak of 20 byte(s) ... in main bug.c:12</pre>
<p><b>AddressSanitizer</b> встраивает проверки в программу при компиляции: выход за границы массива, использование освобождённой памяти, двойной <code>free</code>, утечки. Замедление — примерно вдвое. <b>UndefinedBehaviorSanitizer</b> ловит переполнение знаковых чисел, неверные сдвиги, деление на ноль.</p>
<pre class="code" data-lang="sh">$ gcc -g -O0 bug.c -o bug
$ valgrind --leak-check=full ./bug
Invalid read of size 4
   at sum (bug.c:6)
...
definitely lost: 20 bytes in 1 blocks</pre>
<p><b>Valgrind</b> работает с уже собранной программой без перекомпиляции, но медленнее в 20–50 раз. Удобен, когда исходников нет или пересобрать сложно.</p>

<h3>strace на практике</h3>
<pre class="code" data-lang="sh">$ strace -f -e trace=openat,execve ./server   # -f: следить и за потомками
openat(AT_FDCWD, "/etc/server.conf", O_RDONLY) = -1 ENOENT (No such file or directory)
$ strace -p 1234                               # подключиться к работающему процессу
$ ltrace ./prog                                # вызовы функций библиотек</pre>
<div class="warn"><p>Отладочная сборка (<code>-g -O0</code>) и релизная (<code>-O2</code>) могут вести себя по-разному: неопределённое поведение часто проявляется только с оптимизациями. Поэтому тесты стоит гонять и с санитайзерами, и в релизной конфигурации.</p></div>
<div class="ichika">Мой любимый приём ♡ Собрать с <code>-fsanitize=address,undefined</code> и прогнать все тесты. Половина загадочных багов находится за пять минут, и даже gdb не нужен. Включай санитайзеры по умолчанию в отладочной сборке, сэмпай!</div>
<div class="ayano">Отладка — метод, а не удача. Воспроизведи ошибку стабильно. Уменьши пример до минимального. Сформулируй гипотезу: «здесь выход за границу». Проверь её инструментом, а не догадкой. Исправь и добавь тест, чтобы ошибка не вернулась. Беспорядочные <code>printf</code> по всему коду — признак того, что метода нет.</div>
`,
  p: [
    { q: `Зачем флаги <code>-g -O0</code> при отладке?`, a: `<code>-g</code> добавляет отладочную информацию (имена переменных, номера строк), <code>-O0</code> отключает оптимизации, чтобы код выполнялся строка за строкой и переменные не исчезали.` },
    { q: `Программа упала с segfault. Как узнать, в какой строке?`, a: `<pre class="code" data-lang="sh">$ gcc -g -O0 prog.c -o prog
$ gdb ./prog
(gdb) run
(gdb) bt</pre> Стек вызовов покажет функцию и строку падения.` },
    { q: `Остановись в функции <code>parse</code>, только когда аргумент <code>len</code> больше 100.`, a: `<pre class="code" data-lang="sh">(gdb) break parse if len > 100</pre>` },
    { q: `Чем AddressSanitizer отличается от Valgrind?`, a: `ASan встраивается при компиляции (<code>-fsanitize=address</code>), работает быстро (около 2×). Valgrind запускает готовую программу на виртуальном процессоре, перекомпиляция не нужна, но он в 20–50 раз медленнее.` },
    { q: `Сервер не стартует без сообщения об ошибке. Как быстро понять, какой файл он не может открыть?`, a: `<pre class="code" data-lang="sh">$ strace -f -e trace=openat ./server 2>&1 | grep ENOENT</pre>` },
    { q: `Исправь обе ошибки в подопытной программе.`, a: `Условие цикла <code>i &lt; n</code> вместо <code>i &lt;= n</code> и <code>free(a)</code> перед <code>return 0</code>.` }
  ],
  q: [
    { q: `Стек вызовов в gdb:`, o: [`<code>bt</code>`, `<code>ls</code>`, `<code>run</code>`, `<code>step</code>`], a: 0, e: `backtrace.` },
    { q: `Флаг AddressSanitizer:`, o: [`<code>-fsanitize=address</code>`, `<code>-Wall</code>`, `<code>-O3</code>`, `<code>-static</code>`], a: 0, e: `ASan.` },
    { q: `<code>step</code> в отличие от <code>next</code>:`, o: [`заходит внутрь вызываемых функций`, `пропускает строку`, `завершает программу`, `ставит точку останова`], a: 0, e: `Step into.` },
    { q: `Valgrind сообщает «definitely lost». Это:`, o: [`выход за границу`, `утечка памяти`, `двойной free`, `гонка`], a: 1, e: `Leak.` },
    { q: `Следить за системными вызовами потомков в strace:`, o: [`<code>-c</code>`, `<code>-f</code>`, `<code>-p</code>`, `<code>-e</code>`], a: 1, e: `Follow forks.` }
  ],
  s: [
    `Отладочная сборка: <code>-g -O0</code>.`,
    `gdb: <code>break</code>, <code>run</code>, <code>next</code>/<code>step</code>, <code>print</code>, <code>bt</code>, <code>watch</code>.`,
    `Дампы памяти: <code>ulimit -c unlimited</code>, <code>coredumpctl gdb</code>.`,
    `Санитайзеры: <code>-fsanitize=address,undefined</code> — быстро и точно.`,
    `Valgrind — без перекомпиляции, но медленно.`,
    `strace <code>-f</code>, <code>-e</code>, <code>-p</code>; отладка — метод: воспроизвести, сузить, проверить гипотезу.`
  ]
});
