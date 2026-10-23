L('sysprog', 12, {
  m: 45,
  intro: 'Сетевое соединение в Linux — тоже файловый дескриптор. Сокет создаётся вызовом socket, а дальше в него пишут и из него читают привычными read и write. Сегодня напишем TCP-сервер, который возвращает клиенту всё, что тот прислал, и клиента к нему. Разберём, какие вызовы нужны серверу и клиенту и почему порядок байтов снова важен.',
  intro2: 'Сэмпай, TCP-сервер — как телефонная справочная ♡ Сначала ставишь телефон (socket), получаешь номер (bind), включаешь звонок (listen) и снимаешь трубку на каждый звонок (accept). А клиент просто набирает номер — connect!',
  goals: [
    'Знать последовательность вызовов TCP-сервера и клиента',
    'Написать эхо-сервер и проверить его через nc',
    'Понимать роль адреса, порта и сетевого порядка байтов',
    'Понимать, что TCP — поток байтов без границ сообщений'
  ],
  c: `
<h3>Схема вызовов</h3>
<div class="tbl"><table><thead><tr><th>Сервер</th><th>Клиент</th></tr></thead><tbody>
<tr><td><code>socket</code> — создать сокет</td><td><code>socket</code></td></tr>
<tr><td><code>bind</code> — привязать к адресу и порту</td><td></td></tr>
<tr><td><code>listen</code> — перейти в режим ожидания</td><td></td></tr>
<tr><td><code>accept</code> — получить новое соединение (новый дескриптор)</td><td><code>connect</code> — подключиться</td></tr>
<tr><td><code>read</code>/<code>write</code></td><td><code>read</code>/<code>write</code></td></tr>
<tr><td><code>close</code></td><td><code>close</code></td></tr>
</tbody></table></div>
<p>Слушающий сокет только принимает соединения. Каждый вызов <code>accept</code> возвращает <b>новый</b> дескриптор для общения с конкретным клиентом.</p>

<h3>Эхо-сервер</h3>
<pre class="code" data-lang="c">#include <arpa/inet.h>
#include <netinet/in.h>
#include <stdio.h>
#include <sys/socket.h>
#include <unistd.h>

int main(void) {
    int srv = socket(AF_INET, SOCK_STREAM, 0);
    if (srv < 0) { perror("socket"); return 1; }
    int yes = 1;
    setsockopt(srv, SOL_SOCKET, SO_REUSEADDR, &yes, sizeof yes);

    struct sockaddr_in addr = {0};
    addr.sin_family = AF_INET;
    addr.sin_port = htons(5555);                  /* порт в сетевом порядке */
    addr.sin_addr.s_addr = htonl(INADDR_LOOPBACK); /* 127.0.0.1 */
    if (bind(srv, (struct sockaddr *)&addr, sizeof addr) < 0) { perror("bind"); return 1; }
    if (listen(srv, 16) < 0) { perror("listen"); return 1; }
    printf("listening on 127.0.0.1:5555\\n");

    for (;;) {
        int cli = accept(srv, NULL, NULL);
        if (cli < 0) { perror("accept"); continue; }
        char buf[1024];
        ssize_t n;
        while ((n = read(cli, buf, sizeof buf)) > 0)
            write(cli, buf, (size_t)n);           /* вернуть то же самое */
        close(cli);
    }
}</pre>
<pre class="code" data-lang="sh">$ gcc -Wall -o echo echo.c && ./echo
# в другом терминале:
$ nc 127.0.0.1 5555
привет
привет
$ ss -tlnp | grep 5555          # кто слушает порт</pre>
<p><code>SO_REUSEADDR</code> позволяет сразу перезапустить сервер на том же порту, не дожидаясь, пока старые соединения выйдут из состояния TIME-WAIT.</p>

<h3>Клиент</h3>
<pre class="code" data-lang="c">int s = socket(AF_INET, SOCK_STREAM, 0);
struct sockaddr_in addr = {0};
addr.sin_family = AF_INET;
addr.sin_port = htons(5555);
inet_pton(AF_INET, "127.0.0.1", &addr.sin_addr);
if (connect(s, (struct sockaddr *)&addr, sizeof addr) < 0) { perror("connect"); return 1; }
write(s, "ping\\n", 5);
char buf[64];
ssize_t n = read(s, buf, sizeof buf);
printf("%.*s", (int)n, buf);
close(s);</pre>
<p>Для подключения по имени хоста используют <code>getaddrinfo</code>: она сама разрешает имя через DNS и поддерживает и IPv4, и IPv6.</p>

<h3>TCP — поток, а не сообщения</h3>
<div class="warn"><p>Если клиент дважды отправил по 100 байт, сервер может получить их одним <code>read</code> на 200 байт или тремя кусками по 50, 120 и 30. TCP гарантирует порядок и доставку байтов, но не сохраняет границы сообщений. Протокол поверх TCP обязан сам размечать сообщения: разделителем (например, переводом строки) или заголовком с длиной.</p></div>
<div class="ichika">Наш сервер обслуживает клиентов по одному ♡ Пока первый болтает, второй ждёт в очереди. Чтобы обслуживать многих сразу, есть три пути: fork на каждого клиента, поток на каждого клиента или poll — о нём в следующем уроке!</div>
<div class="ayano">Сетевой код живёт во враждебной среде: клиент может прислать что угодно, оборвать соединение посреди сообщения или не прислать ничего. Всегда ограничивай размер входных данных, обрабатывай частичные чтения и записи и не доверяй длине, которую прислал клиент, без проверки.</div>
`,
  p: [
    { q: `Зачем нужен <code>htons(5555)</code>, а не просто 5555?`, a: `Порт в структуре адреса хранится в сетевом порядке байтов (big-endian), а x86-64 — little-endian. <code>htons</code> переставляет байты.` },
    { q: `Чем дескриптор от <code>accept</code> отличается от дескриптора <code>srv</code>?`, a: `<code>srv</code> — слушающий сокет, он только принимает соединения. <code>accept</code> возвращает новый сокет для обмена данными с конкретным клиентом.` },
    { q: `Как сделать сервер доступным не только с локальной машины?`, a: `Привязать к <code>INADDR_ANY</code> (0.0.0.0): <code>addr.sin_addr.s_addr = htonl(INADDR_ANY);</code> — и открыть порт в брандмауэре.` },
    { q: `Клиент отправил «hello» и «world» двумя вызовами <code>write</code>. Сколько <code>read</code> понадобится серверу?`, a: `Неизвестно заранее: от одного (получит «helloworld») до нескольких. TCP — поток байтов, границы сообщений не сохраняются.` },
    { q: `Как обслуживать нескольких клиентов одновременно простейшим способом?`, a: `После <code>accept</code> вызвать <code>fork</code>: потомок обслуживает клиента и завершается, родитель закрывает дескриптор клиента и снова вызывает <code>accept</code>. Не забыть забирать зомби (обработчик SIGCHLD или <code>waitpid</code> с <code>WNOHANG</code>).` },
    { q: `<code>bind</code> вернул «Address already in use». Что проверить?`, a: `<pre class="code" data-lang="sh">$ ss -tlnp | grep 5555</pre> Порт занят другим процессом или старым экземпляром; помогает также <code>SO_REUSEADDR</code>.` }
  ],
  q: [
    { q: `Вызов, переводящий сокет в режим ожидания соединений:`, o: [`<code>bind</code>`, `<code>listen</code>`, `<code>connect</code>`, `<code>open</code>`], a: 1, e: `listen.` },
    { q: `Клиент подключается вызовом:`, o: [`<code>accept</code>`, `<code>connect</code>`, `<code>listen</code>`, `<code>bind</code>`], a: 1, e: `connect.` },
    { q: `TCP сохраняет границы сообщений?`, o: [`да`, `нет, это поток байтов`, `только для коротких`, `только в локальной сети`], a: 1, e: `Нужна своя разметка.` },
    { q: `Утилита для ручной проверки TCP-сервера:`, o: [`<code>nc</code>`, `<code>ls</code>`, `<code>gcc</code>`, `<code>make</code>`], a: 0, e: `netcat.` },
    { q: `<code>SOCK_STREAM</code> означает:`, o: [`UDP`, `TCP`, `ICMP`, `файл`], a: 1, e: `Потоковый сокет.` }
  ],
  s: [
    `Сервер: socket → bind → listen → accept → read/write → close.`,
    `Клиент: socket → connect → read/write → close.`,
    `<code>accept</code> возвращает новый дескриптор для каждого клиента.`,
    `Порты и адреса — в сетевом порядке: <code>htons</code>, <code>htonl</code>, <code>inet_pton</code>.`,
    `TCP — поток байтов: размечай сообщения сам.`,
    `Проверка: <code>nc</code>, <code>ss -tlnp</code>; <code>SO_REUSEADDR</code> для быстрого перезапуска.`
  ]
});
