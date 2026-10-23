L('linux', 12, {
  m: 40,
  intro: 'Почти вся работа программиста связана с сетью: обращение к API, подключение к серверу, проверка, почему сервис недоступен. В этом уроке — сетевые интерфейсы и адреса, проверка связи, порты и прослушивающие процессы, HTTP-запросы из терминала, DNS и главное — SSH: безопасный вход на удалённые машины по ключам и копирование файлов.',
  intro2: 'Сэмпай, SSH — это волшебная дверь в любой сервер мира ♡ А ключ к ней — буквально ключ, файл на твоём компьютере. Пароли оставим в прошлом, они слишком легко угадываются!',
  goals: [
    'Смотреть адреса и маршруты: ip, проверять связь ping',
    'Находить открытые порты и процессы: ss',
    'Делать HTTP-запросы curl и проверять DNS',
    'Подключаться по SSH с ключами и копировать файлы scp и rsync'
  ],
  c: `
<h3>Адреса и связь</h3>
<pre class="code" data-lang="sh">$ ip a                 # интерфейсы и IP-адреса
$ ip route             # маршруты, шлюз по умолчанию
$ ping -c 4 8.8.8.8    # есть ли связь (4 пакета)
$ ping -c 4 ya.ru      # работает ли DNS
$ cat /etc/hosts       # локальные имена (localhost = 127.0.0.1)</pre>
<p>Если <code>ping 8.8.8.8</code> работает, а <code>ping ya.ru</code> — нет, проблема в DNS, а не в сети.</p>

<h3>Порты: ss</h3>
<pre class="code" data-lang="sh">$ ss -tulpn              # слушающие TCP и UDP порты и процессы
$ sudo ss -tlpn | grep :80
$ ss -tn state established   # текущие соединения</pre>
<p>Ключи: <code>-t</code> TCP, <code>-u</code> UDP, <code>-l</code> слушающие, <code>-p</code> процесс, <code>-n</code> числа вместо имён. Известные порты: 22 — SSH, 80 — HTTP, 443 — HTTPS, 5432 — PostgreSQL.</p>

<h3>HTTP и DNS</h3>
<pre class="code" data-lang="sh">$ curl https://example.com              # тело ответа
$ curl -I https://example.com           # только заголовки
$ curl -fsSL https://site/x.sh -o x.sh  # скачать файл
$ curl -X POST -H "Content-Type: application/json" -d '{"name":"Anna"}' http://localhost:8000/api
$ dig +short ya.ru                      # IP-адрес по имени</pre>

<h3>SSH и ключи</h3>
<pre class="code" data-lang="sh">$ ssh-keygen -t ed25519 -C "anna@laptop"   # создать пару ключей
$ ssh-copy-id anna@203.0.113.10             # отправить открытый ключ на сервер
$ ssh anna@203.0.113.10                     # войти без пароля
$ ssh -p 2222 anna@server                    # другой порт</pre>
<p>Создаются два файла: <code>~/.ssh/id_ed25519</code> — <b>закрытый</b> ключ (никому не показывать, права 600) и <code>~/.ssh/id_ed25519.pub</code> — <b>открытый</b>, его кладут на серверы в <code>~/.ssh/authorized_keys</code>.</p>
<p>Удобные имена в <code>~/.ssh/config</code>:</p>
<pre class="code" data-lang="txt">Host prod
    HostName 203.0.113.10
    User anna
    Port 22
    IdentityFile ~/.ssh/id_ed25519</pre>
<p>Теперь достаточно <code>ssh prod</code>.</p>
<div class="ichika">Закрытый ключ — как ключ от квартиры ♡ Открытый — как замок: его можно поставить на сколько угодно дверей (серверов). Замок показывать не страшно, а ключ — никогда, даже лучшей подруге!</div>

<h3>Копирование файлов</h3>
<pre class="code" data-lang="sh">$ scp report.pdf prod:~/docs/          # на сервер
$ scp prod:/var/log/app.log .          # с сервера
$ rsync -avz --progress site/ prod:/var/www/site/   # синхронизировать каталог</pre>
<div class="warn"><p>Слеш в конце имеет значение для rsync: <code>site/</code> — копировать содержимое каталога, <code>site</code> — сам каталог внутрь назначения. Перед первым запуском добавь <code>--dry-run</code>, чтобы увидеть, что будет сделано.</p></div>
<div class="ayano">Диагностику сети веди снизу вверх: есть ли адрес (<code>ip a</code>) → есть ли связь с шлюзом и интернетом (<code>ping</code>) → работает ли DNS (<code>dig</code>) → слушает ли сервис порт (<code>ss</code>) → отвечает ли он (<code>curl</code>). Перескакивая через шаги, легко полчаса чинить сервер, у которого просто нет сети.</div>
`,
  p: [
    { q: `Узнай IP-адрес своей машины и шлюз по умолчанию.`, a: `<pre class="code" data-lang="sh">$ ip a
$ ip route | grep default</pre>` },
    { q: `Какой процесс слушает порт 8080?`, a: `<pre class="code" data-lang="sh">$ sudo ss -tlpn | grep :8080</pre>` },
    { q: `Проверь код ответа сайта, не скачивая тело.`, a: `<pre class="code" data-lang="sh">$ curl -I https://example.com</pre> Первая строка, например <code>HTTP/2 200</code>.` },
    { q: `Создай ключ SSH и настрой вход на сервер 198.51.100.5 под пользователем dev без пароля.`, a: `<pre class="code" data-lang="sh">$ ssh-keygen -t ed25519
$ ssh-copy-id dev@198.51.100.5
$ ssh dev@198.51.100.5</pre>` },
    { q: `Скопируй каталог <code>build/</code> на сервер <code>prod</code> в <code>/srv/app/</code>, передавая только изменения.`, a: `<pre class="code" data-lang="sh">$ rsync -avz build/ prod:/srv/app/</pre>` },
    { q: `<code>ping 8.8.8.8</code> работает, <code>ping google.com</code> — нет. В чём проблема?`, a: `В разрешении имён (DNS): сеть есть, но имя не превращается в адрес. Проверить <code>/etc/resolv.conf</code> и <code>dig google.com</code>.` }
  ],
  q: [
    { q: `Порт SSH по умолчанию:`, o: [`21`, `22`, `80`, `443`], a: 1, e: `22.` },
    { q: `Показать слушающие TCP-порты с процессами:`, o: [`<code>ip a</code>`, `<code>ss -tlpn</code>`, `<code>ping -l</code>`, `<code>curl -p</code>`], a: 1, e: `ss.` },
    { q: `Какой ключ нельзя никому передавать?`, o: [`<code>id_ed25519.pub</code>`, `<code>id_ed25519</code>`, `<code>authorized_keys</code>`, `<code>known_hosts</code>`], a: 1, e: `Закрытый.` },
    { q: `Только заголовки HTTP-ответа:`, o: [`<code>curl -H</code>`, `<code>curl -I</code>`, `<code>curl -X</code>`, `<code>curl -d</code>`], a: 1, e: `-I.` },
    { q: `Синхронизация каталогов с передачей только изменений:`, o: [`<code>scp</code>`, `<code>rsync</code>`, `<code>cp</code>`, `<code>ftp</code>`], a: 1, e: `rsync.` }
  ],
  s: [
    `<code>ip a</code>, <code>ip route</code>, <code>ping -c</code>, <code>/etc/hosts</code>; ping по IP без имени — проблема DNS.`,
    `<code>ss -tulpn</code> — порты и процессы; 22 SSH, 80 HTTP, 443 HTTPS.`,
    `<code>curl</code> (-I, -o, -X, -H, -d), <code>dig +short</code>.`,
    `SSH-ключи: <code>ssh-keygen -t ed25519</code>, <code>ssh-copy-id</code>; закрытый ключ — права 600 и никому.`,
    `<code>~/.ssh/config</code> — короткие имена серверов.`,
    `<code>scp</code>, <code>rsync -avz</code> (слеш в конце важен, <code>--dry-run</code>).`
  ]
});
