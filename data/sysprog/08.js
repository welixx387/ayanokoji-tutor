L('sysprog', 8, {
  m: 45,
  intro: 'Контрольная точка первой половины курса. Напишем две классические утилиты Unix — cat и wc — только на системных вызовах open, read, write, close, без функций ввода-вывода из stdio. Проект проверяет всё изученное: дескрипторы, обработку ошибок, коды возврата, частичные записи. Сначала попробуй сам, потом сверься с решением.',
  intro2: 'Сэмпай, сегодня ты пишешь настоящие утилиты Unix ♡ Те самые, которым по пятьдесят лет! Только чур не подглядывать в решение сразу — сначала сам, потом сравним. Я буду держать за тебя кулачки!',
  goals: [
    'Самостоятельно написать mycat с поддержкой нескольких файлов и стандартного ввода',
    'Написать mywc, считающую строки, слова и байты',
    'Проверить программы с помощью diff и strace',
    'Ответить на контрольные вопросы по первой половине курса'
  ],
  c: `
<h3>Задание 1: mycat</h3>
<ul class="ex-l">
<li>Без аргументов читает стандартный ввод и пишет в стандартный вывод.</li>
<li>С аргументами выводит файлы по очереди; аргумент <code>-</code> означает стандартный ввод.</li>
<li>Если файл не открылся — сообщение в stderr, переход к следующему файлу, итоговый код возврата 1.</li>
<li>Используй буфер 64 КБ и функцию полной записи.</li>
</ul>
<pre class="code" data-lang="c">#include <fcntl.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>

static int write_all(int fd, const char *buf, size_t len) {
    while (len > 0) {
        ssize_t w = write(fd, buf, len);
        if (w < 0) return -1;
        buf += w;
        len -= (size_t)w;
    }
    return 0;
}

static int copy_fd(int in, const char *name) {
    static char buf[65536];
    ssize_t n;
    while ((n = read(in, buf, sizeof buf)) > 0)
        if (write_all(STDOUT_FILENO, buf, (size_t)n) < 0) { perror("write"); return -1; }
    if (n < 0) { perror(name); return -1; }
    return 0;
}

int main(int argc, char *argv[]) {
    if (argc == 1) return copy_fd(STDIN_FILENO, "stdin") < 0;
    int rc = 0;
    for (int i = 1; i < argc; i++) {
        if (strcmp(argv[i], "-") == 0) { rc |= copy_fd(STDIN_FILENO, "stdin") < 0; continue; }
        int fd = open(argv[i], O_RDONLY);
        if (fd < 0) { perror(argv[i]); rc = 1; continue; }
        rc |= copy_fd(fd, argv[i]) < 0;
        close(fd);
    }
    return rc;
}</pre>

<h3>Задание 2: mywc</h3>
<p>Считай строки (символы <code>'\\n'</code>), слова (переходы от пробельного символа к непробельному) и байты. Вывод — как у <code>wc</code>: три числа и имя файла.</p>
<pre class="code" data-lang="c">#include <ctype.h>
#include <fcntl.h>
#include <stdio.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
    int fd = argc > 1 ? open(argv[1], O_RDONLY) : STDIN_FILENO;
    if (fd < 0) { perror(argv[1]); return 1; }

    char buf[65536];
    long lines = 0, words = 0, bytes = 0;
    int in_word = 0;
    ssize_t n;
    while ((n = read(fd, buf, sizeof buf)) > 0) {
        bytes += n;
        for (ssize_t i = 0; i < n; i++) {
            unsigned char c = (unsigned char)buf[i];
            if (c == '\\n') lines++;
            if (isspace(c)) in_word = 0;
            else if (!in_word) { in_word = 1; words++; }
        }
    }
    if (n < 0) { perror("read"); return 1; }
    printf("%7ld %7ld %7ld %s\\n", lines, words, bytes, argc > 1 ? argv[1] : "");
    return 0;
}</pre>
<div class="warn"><p>Обрати внимание: состояние <code>in_word</code> живёт <b>между</b> вызовами <code>read</code>. Слово может оказаться разрезанным границей буфера — если сбрасывать состояние на каждом чтении, такое слово посчитается дважды.</p></div>

<h3>Проверка</h3>
<pre class="code" data-lang="sh">$ gcc -Wall -Wextra -O2 -o mycat mycat.c
$ ./mycat /etc/passwd | diff - /etc/passwd && echo OK
$ ./mycat nofile /etc/hostname; echo "code $?"
$ ./mywc /etc/services; wc /etc/services          # числа должны совпасть
$ strace -c ./mycat big.iso > /dev/null           # мало вызовов read благодаря буферу
$ head -c 100000000 /dev/urandom > big.bin
$ time ./mycat big.bin > /dev/null</pre>
<div class="ichika">Сравни время с настоящим cat, сэмпай ♡ Если твой буфер 64 КБ, разницы почти не будет! А попробуй буфер на 1 байт — и увидишь, сколько стоят системные вызовы. Это лучше любой теории!</div>

<h3>Контрольные вопросы</h3>
<ol>
<li>Чем системный вызов отличается от функции библиотеки?</li>
<li>Что делает компоновщик и откуда берётся <code>undefined reference</code>?</li>
<li>Где хранятся локальные переменные, а где память от <code>malloc</code>?</li>
<li>Что возвращает <code>fork</code> родителю и потомку?</li>
<li>Почему после <code>exec</code> код не продолжается?</li>
<li>Что такое зомби-процесс?</li>
<li>Почему в обработчике сигнала нельзя вызывать <code>printf</code>?</li>
</ol>
<div class="ayano">Не читай решение построчно, как рецепт. Сначала напиши своё, даже если оно хуже. Затем сравни: где я забыл проверку ошибки, где состояние сбрасывается не вовремя, где возможна частичная запись. Разница между твоим кодом и эталоном — это и есть то, чему ты сегодня научился.</div>
`,
  p: [
    { q: `Добавь в <code>mycat</code> флаг <code>-n</code>, нумерующий строки. Какое состояние нужно хранить между буферами?`, a: `Номер текущей строки и признак «мы в начале строки». Номер печатается перед первым символом каждой строки, а признак выставляется после каждого <code>'\\n'</code>, даже если он последний в буфере.` },
    { q: `Почему <code>mycat</code> с буфером в 1 байт работает в сотни раз медленнее?`, a: `На каждый байт — два системных вызова (<code>read</code> и <code>write</code>), а переключение в ядро стоит сотни наносекунд.` },
    { q: `Как проверить, что <code>mycat</code> корректно копирует двоичные файлы?`, a: `<pre class="code" data-lang="sh">$ ./mycat /bin/ls > copy
$ cmp copy /bin/ls && echo identical</pre>` },
    { q: `Ответь на вопрос 4: что возвращает <code>fork</code>?`, a: `Родителю — PID потомка, потомку — 0, при ошибке — −1 (потомок не создан).` },
    { q: `Ответь на вопрос 2: откуда берётся <code>undefined reference</code>?`, a: `Компоновщик не нашёл определения символа: не передан объектный файл или не подключена библиотека (<code>-lm</code>, <code>-lpthread</code>).` },
    { q: `Добавь в <code>mywc</code> обработку нескольких файлов со строкой «total» в конце, как у настоящего <code>wc</code>.`, a: `Вынеси подсчёт в функцию <code>count(int fd, long out[3])</code>, вызывай её для каждого файла, печатай результат и копи суммы. Если файлов больше одного, в конце выведи суммы и слово «total».` }
  ],
  q: [
    { q: `Аргумент <code>-</code> в cat означает:`, o: [`пустой файл`, `стандартный ввод`, `ошибку`, `текущий каталог`], a: 1, e: `Соглашение Unix.` },
    { q: `Состояние «внутри слова» в mywc нужно хранить:`, o: [`внутри одного буфера`, `между вызовами read`, `в файле`, `не нужно`], a: 1, e: `Слово может быть разрезано.` },
    { q: `Утилита сравнения двух файлов побайтно:`, o: [`<code>cmp</code>`, `<code>wc</code>`, `<code>cat</code>`, `<code>tee</code>`], a: 0, e: `cmp.` },
    { q: `Если один из файлов не открылся, cat должен:`, o: [`упасть сразу`, `сообщить и продолжить, код 1`, `молча пропустить, код 0`, `удалить файл`], a: 1, e: `Как настоящий cat.` },
    { q: `Большой буфер ускоряет программу, потому что:`, o: [`больше памяти — быстрее`, `меньше системных вызовов`, `диск быстрее`, `компилятор оптимизирует`], a: 1, e: `Вызовы дорогие.` }
  ],
  s: [
    `mycat: stdin без аргументов, <code>-</code> как stdin, ошибки в stderr, продолжение работы.`,
    `Полная запись через цикл <code>write_all</code>.`,
    `mywc: состояние «в слове» сохраняется между буферами.`,
    `Проверка: <code>diff</code>, <code>cmp</code>, сравнение с <code>wc</code>, <code>strace -c</code>, <code>time</code>.`,
    `Размер буфера резко влияет на скорость — системные вызовы дорогие.`,
    `Сначала своё решение, потом сравнение с эталоном.`
  ]
});
