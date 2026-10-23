L('sysprog', 5, {
  m: 40,
  intro: 'В Linux почти всё представлено как файл: обычные файлы, терминал, каналы между процессами, сетевые соединения, устройства. Работа со всеми ними идёт через один и тот же набор системных вызовов — open, read, write, close. Программа обращается к открытому файлу по маленькому целому числу — файловому дескриптору. Сегодня напишем свою утилиту копирования без стандартной библиотеки ввода-вывода.',
  intro2: 'Сэмпай, дескриптор — это номерок в гардеробе ♡ Отдаёшь ядру имя файла, получаешь номерок 3. Дальше говоришь «прочитай из номерка 3», а ядро само знает, где лежит пальто. И номерки 0, 1 и 2 уже заняты с самого начала!',
  goals: [
    'Понимать, что такое файловый дескриптор и стандартные потоки 0, 1, 2',
    'Открывать файлы с нужными флагами и правами доступа',
    'Правильно обрабатывать результаты read и write, включая частичные операции',
    'Писать программы, которые проверяют ошибки каждого системного вызова'
  ],
  c: `
<h3>Файловые дескрипторы</h3>
<p><b>Файловый дескриптор</b> — неотрицательное целое число, индекс в таблице открытых файлов процесса. Ядро хранит за ним всё остальное: какой это файл, текущую позицию, режим доступа.</p>
<div class="tbl"><table><thead><tr><th>Номер</th><th>Поток</th><th>Константа</th></tr></thead><tbody>
<tr><td>0</td><td>стандартный ввод</td><td><code>STDIN_FILENO</code></td></tr>
<tr><td>1</td><td>стандартный вывод</td><td><code>STDOUT_FILENO</code></td></tr>
<tr><td>2</td><td>поток ошибок</td><td><code>STDERR_FILENO</code></td></tr>
</tbody></table></div>
<p><code>open</code> всегда возвращает наименьший свободный номер, поэтому первый открытый файл обычно получает 3. Список дескрипторов процесса виден в <code>/proc/PID/fd</code>.</p>

<h3>open и его флаги</h3>
<pre class="code" data-lang="c">int fd = open("data.txt", O_RDONLY);                         /* только чтение */
int out = open("log.txt", O_WRONLY | O_CREAT | O_APPEND, 0644); /* дописывать */
int tmp = open("out.bin", O_WRONLY | O_CREAT | O_TRUNC, 0600);  /* перезаписать */</pre>
<div class="tbl"><table><thead><tr><th>Флаг</th><th>Смысл</th></tr></thead><tbody>
<tr><td><code>O_RDONLY</code>, <code>O_WRONLY</code>, <code>O_RDWR</code></td><td>режим доступа (ровно один)</td></tr>
<tr><td><code>O_CREAT</code></td><td>создать, если нет; тогда нужен третий аргумент — права</td></tr>
<tr><td><code>O_TRUNC</code></td><td>обрезать существующий файл до нуля</td></tr>
<tr><td><code>O_APPEND</code></td><td>каждая запись — в конец файла</td></tr>
<tr><td><code>O_EXCL</code></td><td>вместе с <code>O_CREAT</code>: ошибка, если файл уже есть</td></tr>
</tbody></table></div>
<p>Права <code>0644</code> записаны в восьмеричной системе (ведущий ноль!): владелец читает и пишет, остальные только читают. Итоговые права дополнительно урезаются маской <code>umask</code>.</p>

<h3>read, write и частичные операции</h3>
<div class="tbl"><table><thead><tr><th>Результат <code>read</code></th><th>Значение</th></tr></thead><tbody>
<tr><td>больше 0</td><td>прочитано столько байт (может быть меньше запрошенного)</td></tr>
<tr><td>0</td><td>конец файла (EOF)</td></tr>
<tr><td>−1</td><td>ошибка, причина в <code>errno</code></td></tr>
</tbody></table></div>
<p>Программа копирования файла на системных вызовах:</p>
<pre class="code" data-lang="c">#include <fcntl.h>
#include <stdio.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
    if (argc != 3) {
        fprintf(stderr, "usage: %s SRC DST\\n", argv[0]);
        return 2;
    }
    int in = open(argv[1], O_RDONLY);
    if (in < 0) { perror(argv[1]); return 1; }
    int out = open(argv[2], O_WRONLY | O_CREAT | O_TRUNC, 0644);
    if (out < 0) { perror(argv[2]); close(in); return 1; }

    char buf[4096];
    ssize_t n;
    while ((n = read(in, buf, sizeof buf)) > 0) {
        if (write(out, buf, n) != n) { perror("write"); return 1; }
    }
    if (n < 0) perror("read");
    close(in);
    close(out);
    return n < 0;
}</pre>
<div class="warn"><p>Для каналов и сокетов <code>write</code> может записать меньше, чем просили, а <code>read</code> почти всегда возвращает «сколько есть». Надёжный код записывает в цикле, пока не отдаст все байты. Для обычных файлов это редкость, но привычка писать правильно окупится в сетевом коде.</p></div>
<pre class="code" data-lang="c">/* записать ровно len байт или вернуть -1 */
ssize_t write_all(int fd, const char *buf, size_t len) {
    size_t done = 0;
    while (done < len) {
        ssize_t w = write(fd, buf + done, len - done);
        if (w < 0) return -1;
        done += (size_t)w;
    }
    return (ssize_t)done;
}</pre>

<h3>close и позиция в файле</h3>
<p>Каждый <code>open</code> должен закончиться <code>close</code>: число дескрипторов на процесс ограничено (<code>ulimit -n</code>, часто 1024). Позицию чтения меняет <code>lseek(fd, 0, SEEK_SET)</code> — вернуться в начало; <code>lseek(fd, 0, SEEK_END)</code> возвращает размер файла.</p>
<div class="ichika">Утечка дескрипторов — тихий убийца ♡ Сервер работает неделю, открывает файлы и не закрывает, а потом внезапно «Too many open files». Закрыл то, что открыл, — хороший тон, сэмпай!</div>
<div class="ayano">Проверяй результат каждого системного вызова. Код без проверок работает на твоей машине и молча портит данные у пользователя: диск заполнен, файла нет, прав не хватает. Минимальный стандарт — <code>perror</code> с именем файла и ненулевой код возврата. Пользователь должен понять, что пошло не так, без отладчика.</div>
`,
  p: [
    { q: `Какой дескриптор получит первый <code>open</code> в программе и почему?`, a: `Обычно 3: дескрипторы 0, 1, 2 уже заняты стандартными потоками, а <code>open</code> выдаёт наименьший свободный номер.` },
    { q: `Открой файл <code>notes.txt</code> для дозаписи, создав его с правами rw-r----- при отсутствии.`, a: `<pre class="code" data-lang="c">int fd = open("notes.txt", O_WRONLY | O_CREAT | O_APPEND, 0640);
if (fd < 0) { perror("notes.txt"); return 1; }</pre>` },
    { q: `Что означает результат 0 у <code>read</code>?`, a: `Достигнут конец файла (EOF): данных больше нет. Это не ошибка.` },
    { q: `Напиши функцию, которая возвращает размер открытого файла по дескриптору через <code>lseek</code>.`, a: `<pre class="code" data-lang="c">off_t file_size(int fd) {
    off_t cur = lseek(fd, 0, SEEK_CUR);
    off_t end = lseek(fd, 0, SEEK_END);
    lseek(fd, cur, SEEK_SET);      /* вернуть позицию */
    return end;
}</pre> Ещё удобнее — <code>fstat</code> и поле <code>st_size</code>.` },
    { q: `Почему права пишут как <code>0644</code>, а не <code>644</code>?`, a: `Ведущий ноль делает литерал восьмеричным. Десятичное 644 — это совсем другие биты прав.` },
    { q: `Как посмотреть, какие файлы открыты у процесса с PID 1234?`, a: `<pre class="code" data-lang="sh">$ ls -l /proc/1234/fd
$ lsof -p 1234</pre>` }
  ],
  q: [
    { q: `Дескриптор потока ошибок:`, o: [`0`, `1`, `2`, `3`], a: 2, e: `stderr = 2.` },
    { q: `<code>read</code> вернул −1. Это:`, o: [`конец файла`, `ошибка`, `файл пуст`, `прочитан один байт`], a: 1, e: `Смотри errno.` },
    { q: `Флаг «создать, если файла нет»:`, o: [`<code>O_TRUNC</code>`, `<code>O_CREAT</code>`, `<code>O_APPEND</code>`, `<code>O_RDONLY</code>`], a: 1, e: `Нужны права третьим аргументом.` },
    { q: `Может ли <code>write</code> в сокет записать меньше запрошенного?`, o: [`нет, никогда`, `да, нужен цикл`, `только при ошибке`, `только для файлов`], a: 1, e: `Частичная запись.` },
    { q: `Ограничение на число открытых дескрипторов смотрят командой:`, o: [`<code>ulimit -n</code>`, `<code>ulimit -s</code>`, `<code>df -h</code>`, `<code>free</code>`], a: 0, e: `-n.` }
  ],
  s: [
    `Дескриптор — номер в таблице открытых файлов процесса; 0, 1, 2 — стандартные потоки.`,
    `<code>open</code>: режим + флаги (<code>O_CREAT</code>, <code>O_TRUNC</code>, <code>O_APPEND</code>) + права в восьмеричной записи.`,
    `<code>read</code>: больше 0 — байты, 0 — EOF, −1 — ошибка.`,
    `<code>write</code> может быть частичным — пиши в цикле.`,
    `Каждый <code>open</code> парой к <code>close</code>; число дескрипторов ограничено.`,
    `Проверяй каждый вызов и сообщай ошибки через <code>perror</code>.`
  ]
});
