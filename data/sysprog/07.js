L('sysprog', 7, {
  m: 40,
  intro: 'Системные вызовы сообщают об ошибках единообразно: возвращают −1 и записывают причину в переменную errno. А ядро умеет посылать процессу асинхронные уведомления — сигналы: «тебя просят завершиться», «ты обратился к чужой памяти», «твой потомок закончил работу». Сегодня научимся правильно сообщать об ошибках и аккуратно обрабатывать сигналы.',
  intro2: 'Сэмпай, сигнал — как звонок в дверь посреди урока ♡ Ты можешь открыть, можешь сделать вид, что тебя нет, но на некоторые звонки нельзя не ответить — SIGKILL выносит дверь без спроса! Главное — в обработчике делать как можно меньше.',
  goals: [
    'Понимать соглашение «−1 и errno» и выводить понятные сообщения об ошибках',
    'Знать основные сигналы и их действия по умолчанию',
    'Устанавливать обработчик через sigaction',
    'Понимать ограничения кода внутри обработчика сигнала'
  ],
  c: `
<h3>errno, perror, strerror</h3>
<p>При ошибке большинство системных вызовов возвращают −1 и записывают код причины в <code>errno</code> (из <code>errno.h</code>). Значение <code>errno</code> имеет смысл <b>только сразу после неудачного вызова</b>: успешные вызовы его не обнуляют, а следующие могут перезаписать.</p>
<pre class="code" data-lang="c">#include <errno.h>
#include <fcntl.h>
#include <stdio.h>
#include <string.h>

int main(void) {
    int fd = open("/etc/shadow", O_RDONLY);
    if (fd < 0) {
        int err = errno;                              /* сохранить сразу */
        perror("open /etc/shadow");                   /* open /etc/shadow: Permission denied */
        fprintf(stderr, "code %d: %s\\n", err, strerror(err));
        return 1;
    }
    return 0;
}</pre>
<div class="tbl"><table><thead><tr><th>Код</th><th>Смысл</th></tr></thead><tbody>
<tr><td><code>ENOENT</code></td><td>нет такого файла или каталога</td></tr>
<tr><td><code>EACCES</code></td><td>нет прав</td></tr>
<tr><td><code>EEXIST</code></td><td>уже существует</td></tr>
<tr><td><code>EINTR</code></td><td>вызов прерван сигналом — часто стоит повторить</td></tr>
<tr><td><code>EAGAIN</code></td><td>ресурс временно недоступен (неблокирующий ввод-вывод)</td></tr>
<tr><td><code>ENOMEM</code></td><td>не хватает памяти</td></tr>
</tbody></table></div>

<h3>Сигналы</h3>
<p><b>Сигнал</b> — асинхронное уведомление процессу. Его посылает ядро (ошибка памяти, завершение потомка), другой процесс (<code>kill</code>) или терминал (Ctrl+C).</p>
<div class="tbl"><table><thead><tr><th>Сигнал</th><th>Номер</th><th>Когда</th><th>По умолчанию</th></tr></thead><tbody>
<tr><td><code>SIGINT</code></td><td>2</td><td>Ctrl+C</td><td>завершить</td></tr>
<tr><td><code>SIGTERM</code></td><td>15</td><td>вежливая просьба завершиться</td><td>завершить</td></tr>
<tr><td><code>SIGKILL</code></td><td>9</td><td>принудительное убийство</td><td>завершить, нельзя перехватить</td></tr>
<tr><td><code>SIGSEGV</code></td><td>11</td><td>обращение к недопустимой памяти</td><td>завершить с дампом</td></tr>
<tr><td><code>SIGCHLD</code></td><td>17</td><td>потомок завершился</td><td>игнорировать</td></tr>
<tr><td><code>SIGPIPE</code></td><td>13</td><td>запись в закрытый канал</td><td>завершить</td></tr>
</tbody></table></div>
<pre class="code" data-lang="sh">$ kill -TERM 1234     # попросить завершиться
$ kill -9 1234        # убить безусловно — крайняя мера
$ kill -l             # список сигналов</pre>

<h3>Обработчик через sigaction</h3>
<pre class="code" data-lang="c">#include <signal.h>
#include <stdio.h>
#include <unistd.h>

static volatile sig_atomic_t stop = 0;

static void on_signal(int sig) {
    (void)sig;
    stop = 1;                     /* только поставить флаг */
}

int main(void) {
    struct sigaction sa = {0};
    sa.sa_handler = on_signal;
    sigemptyset(&sa.sa_mask);
    sigaction(SIGINT, &sa, NULL);
    sigaction(SIGTERM, &sa, NULL);

    while (!stop) {
        printf("работаю...\\n");
        sleep(1);
    }
    printf("сохраняю данные и выхожу\\n");
    return 0;
}</pre>
<p>Обработчик прерывает программу в <b>произвольном месте</b> — возможно, посреди <code>printf</code> или <code>malloc</code>. Поэтому в нём разрешены только <b>async-signal-safe</b> функции (например, <code>write</code>, <code>_exit</code>), а лучше всего — просто поставить флаг типа <code>volatile sig_atomic_t</code> и обработать его в основном цикле.</p>
<div class="warn"><p>Функция <code>signal()</code> исторически ведёт себя по-разному на разных системах. В новом коде используй <code>sigaction</code>. И помни: <code>SIGKILL</code> и <code>SIGSTOP</code> нельзя ни перехватить, ни игнорировать.</p></div>
<div class="ichika">Хороший сервер на SIGTERM отвечает «сейчас, только допишу файл» ♡ А на SIGKILL никто ничего не успевает. Поэтому systemd сначала шлёт TERM, ждёт, и только потом KILL. Вежливость прежде всего!</div>
<div class="ayano">Сообщение об ошибке должно отвечать на три вопроса: что делали, с каким объектом и почему не вышло. «open config.yaml: No such file or directory» — хорошо. «Ошибка!» — плохо. А для сигналов правило одно: обработчик только сообщает о событии, вся работа — в основном коде, где состояние программы известно.</div>
`,
  p: [
    { q: `Почему нужно сохранять <code>errno</code> в переменную сразу после ошибки?`, a: `Любой следующий вызов (даже <code>printf</code>) может изменить <code>errno</code>, и причина первой ошибки потеряется.` },
    { q: `Напиши обёртку <code>xopen</code>, которая при ошибке печатает причину с именем файла и завершает программу с кодом 1.`, a: `<pre class="code" data-lang="c">int xopen(const char *path, int flags) {
    int fd = open(path, flags);
    if (fd < 0) {
        perror(path);
        exit(1);
    }
    return fd;
}</pre>` },
    { q: `Чем <code>kill -15</code> отличается от <code>kill -9</code>?`, a: `15 (SIGTERM) можно перехватить и аккуратно завершиться; 9 (SIGKILL) убивает процесс сразу, без возможности сохранить данные.` },
    { q: `Почему в обработчике сигнала нельзя вызывать <code>printf</code>?`, a: `Сигнал может прийти посреди другого <code>printf</code> или <code>malloc</code>; повторный вход испортит их внутреннее состояние. <code>printf</code> не является async-signal-safe.` },
    { q: `Как заставить программу игнорировать <code>SIGPIPE</code>, чтобы запись в закрытый сокет возвращала ошибку <code>EPIPE</code>?`, a: `<pre class="code" data-lang="c">signal(SIGPIPE, SIG_IGN);</pre> Для простого игнорирования <code>signal</code> безопасна; можно и через <code>sigaction</code> с <code>SIG_IGN</code>.` },
    { q: `Повтори вызов <code>read</code>, если он прерван сигналом.`, a: `<pre class="code" data-lang="c">ssize_t n;
do {
    n = read(fd, buf, sizeof buf);
} while (n < 0 && errno == EINTR);</pre>` }
  ],
  q: [
    { q: `При ошибке системный вызов обычно возвращает:`, o: [`0`, `−1`, `NULL всегда`, `код ошибки`], a: 1, e: `А причина в errno.` },
    { q: `Ctrl+C посылает:`, o: [`<code>SIGTERM</code>`, `<code>SIGINT</code>`, `<code>SIGKILL</code>`, `<code>SIGSTOP</code>`], a: 1, e: `Interrupt.` },
    { q: `Какой сигнал нельзя перехватить?`, o: [`<code>SIGINT</code>`, `<code>SIGTERM</code>`, `<code>SIGKILL</code>`, `<code>SIGCHLD</code>`], a: 2, e: `И SIGSTOP.` },
    { q: `Код <code>ENOENT</code> означает:`, o: [`нет прав`, `нет такого файла`, `нет памяти`, `прерван сигналом`], a: 1, e: `No entry.` },
    { q: `Тип флага, изменяемого в обработчике:`, o: [`<code>int</code>`, `<code>volatile sig_atomic_t</code>`, `<code>static char</code>`, `<code>bool</code>`], a: 1, e: `Атомарная запись.` }
  ],
  s: [
    `Ошибка вызова: −1 и код в <code>errno</code>; сохраняй его сразу.`,
    `<code>perror</code> и <code>strerror</code> превращают код в текст.`,
    `Сигналы: SIGINT, SIGTERM, SIGKILL, SIGSEGV, SIGCHLD, SIGPIPE.`,
    `<code>sigaction</code> вместо <code>signal</code>; SIGKILL и SIGSTOP не перехватываются.`,
    `В обработчике — только флаг <code>volatile sig_atomic_t</code> или safe-функции.`,
    `<code>EINTR</code> — повтори вызов.`
  ]
});
