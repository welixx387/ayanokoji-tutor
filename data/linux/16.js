L('linux', 16, {
  m: 45,
  intro: 'Финал курса — проект, который делает каждый начинающий DevOps-инженер и бэкенд-разработчик: подготовить чистый сервер к работе. Новый пользователь, вход по ключам, файрвол, веб-сервер, сервис и мониторинг журналов. А во второй половине — вопросы, которые задают на собеседовании Junior по Linux, с короткими ответами.',
  intro2: 'Сэмпай, финальный босс курса — голый сервер ♡ Ни пользователей, ни защиты, ни сайта. Через час он будет защищён, настроен и будет показывать твою страничку. А потом — тренировка собеседования. Готов?',
  goals: [
    'Безопасно настроить сервер: пользователь, SSH-ключи, файрвол',
    'Установить и запустить веб-сервер как сервис',
    'Проверить работу: порты, журналы, curl',
    'Ответить на частые вопросы собеседования по Linux'
  ],
  c: `
<h3>Шаг 1. Пользователь и SSH</h3>
<pre class="code" data-lang="sh"># на сервере, под root
$ adduser anna
$ usermod -aG sudo anna
# на своём компьютере
$ ssh-copy-id anna@SERVER_IP
$ ssh anna@SERVER_IP</pre>
<p>Убедившись, что вход по ключу работает, запрети вход по паролю и под root в <code>/etc/ssh/sshd_config</code>:</p>
<pre class="code" data-lang="txt">PermitRootLogin no
PasswordAuthentication no</pre>
<pre class="code" data-lang="sh">$ sudo systemctl restart ssh</pre>
<div class="warn"><p>Не закрывай текущую SSH-сессию, пока не проверишь вход в новом окне. Ошибка в настройке sshd может отрезать тебя от сервера.</p></div>

<h3>Шаг 2. Файрвол и обновления</h3>
<pre class="code" data-lang="sh">$ sudo apt update && sudo apt upgrade -y
$ sudo ufw allow OpenSSH
$ sudo ufw allow 80/tcp
$ sudo ufw enable
$ sudo ufw status</pre>

<h3>Шаг 3. Веб-сервер</h3>
<pre class="code" data-lang="sh">$ sudo apt install -y nginx
$ systemctl status nginx
$ echo "<h1>Hello from Anna</h1>" | sudo tee /var/www/html/index.html
$ curl -I http://localhost
$ sudo ss -tlpn | grep :80
$ journalctl -u nginx --since "10 min ago"</pre>
<div class="ichika">Почему <code>sudo tee</code>, а не <code>sudo echo … &gt; файл</code>? ♡ Потому что перенаправление <code>&gt;</code> делает твоя оболочка — без прав root! А <code>tee</code> сам открывает файл и запускается через sudo. Это любимый вопрос на собеседованиях!</div>

<h3>Вопросы собеседования</h3>
<div class="tbl"><table><thead><tr><th>Вопрос</th><th>Короткий ответ</th></tr></thead><tbody>
<tr><td>Чем жёсткая ссылка отличается от символической?</td><td>Жёсткая — второе имя того же inode; символическая — файл с путём, может указывать на каталоги и в другие разделы, «повисает» при удалении цели.</td></tr>
<tr><td>Что означают права 755?</td><td>Владелец: rwx; группа и остальные: r-x.</td></tr>
<tr><td>Как узнать, какой процесс слушает порт 8080?</td><td><code>sudo ss -tlpn | grep 8080</code> или <code>lsof -i :8080</code>.</td></tr>
<tr><td>Чем SIGTERM отличается от SIGKILL?</td><td>TERM можно перехватить и корректно завершиться; KILL убивает сразу и не перехватывается.</td></tr>
<tr><td>Что такое load average?</td><td>Среднее число процессов, готовых к выполнению, за 1, 5 и 15 минут; сравнивается с числом ядер.</td></tr>
<tr><td>Что происходит, когда вводишь <code>ls</code>?</td><td>Shell ищет программу в PATH, делает fork, в дочернем процессе exec загружает <code>/usr/bin/ls</code>, родитель ждёт его завершения и получает код возврата.</td></tr>
<tr><td>Что такое zombie-процесс?</td><td>Завершённый процесс, код возврата которого ещё не забрал родитель через wait.</td></tr>
<tr><td>Как найти, что заняло диск?</td><td><code>df -h</code>, затем пошагово <code>du -sh</code> по каталогам; проверить удалённые открытые файлы через <code>lsof</code>.</td></tr>
<tr><td>Что значат 0 и не-0 коды возврата?</td><td>0 — успех, остальное — ошибка; <code>$?</code>, <code>&amp;&amp;</code>, <code>||</code>, <code>set -e</code>.</td></tr>
<tr><td>Как добавить задачу по расписанию?</td><td><code>crontab -e</code>, строка «мин час день мес день-недели команда» с полными путями.</td></tr>
</tbody></table></div>
<div class="ayano">На собеседовании Junior ценят не заученные определения, а умение рассуждать: «я бы сначала проверил df, потом…». Отвечай вслух по шагам, как диагностировал бы реальную проблему. Если не знаешь — скажи, как бы искал ответ: man, журналы, эксперимент. Честное «я бы проверил так» звучит лучше уверенной ошибки.</div>
`,
  p: [
    { q: `Добавь пользователя <code>dev</code> в группу <code>sudo</code>.`, a: `<pre class="code" data-lang="sh">$ sudo usermod -aG sudo dev</pre> Флаг <code>-a</code> обязателен: без него пользователь потеряет остальные группы.` },
    { q: `Разреши в ufw входящий HTTPS.`, a: `<pre class="code" data-lang="sh">$ sudo ufw allow 443/tcp</pre>` },
    { q: `Почему <code>sudo echo "x" &gt; /etc/file</code> выдаёт Permission denied?`, a: `Перенаправление выполняет текущая оболочка без прав root; sudo получает только echo. Правильно: <code>echo "x" | sudo tee /etc/file</code>.` },
    { q: `Проверь, что nginx отвечает локально, и посмотри его последние ошибки.`, a: `<pre class="code" data-lang="sh">$ curl -I http://localhost
$ journalctl -u nginx -p err -n 20</pre>` },
    { q: `Объясни, что происходит при выполнении команды <code>ls</code> в shell.`, a: `Shell разбирает строку, находит <code>ls</code> в каталогах PATH, вызывает fork, в дочернем процессе exec запускает программу, родитель ждёт через wait и получает код возврата.` },
    { q: `Как отключить вход по паролю на сервере SSH?`, a: `В <code>/etc/ssh/sshd_config</code> задать <code>PasswordAuthentication no</code>, затем <code>sudo systemctl restart ssh</code> — проверив вход по ключу в отдельной сессии.` }
  ],
  q: [
    { q: `Добавить пользователя в группу, сохранив остальные:`, o: [`<code>usermod -G</code>`, `<code>usermod -aG</code>`, `<code>groupadd</code>`, `<code>chgrp</code>`], a: 1, e: `-a = append.` },
    { q: `Файл настроек SSH-сервера:`, o: [`<code>~/.ssh/config</code>`, `<code>/etc/ssh/sshd_config</code>`, `<code>/etc/ssh/ssh_known</code>`, `<code>/etc/hosts</code>`], a: 1, e: `<code>sshd_config</code>.` },
    { q: `Записать в защищённый файл через конвейер:`, o: [`<code>sudo echo &gt;</code>`, `<code>| sudo tee</code>`, `<code>sudo &gt;&gt;</code>`, `<code>su &gt;</code>`], a: 1, e: `tee от root.` },
    { q: `Zombie-процесс:`, o: [`завис и грузит CPU`, `завершился, но родитель не забрал код возврата`, `вредоносный`, `спит`], a: 1, e: `Ждёт wait.` },
    { q: `Простой файрвол в Ubuntu:`, o: [`<code>ufw</code>`, `<code>fw</code>`, `<code>netctl</code>`, `<code>ipconfig</code>`], a: 0, e: `Uncomplicated Firewall.` }
  ],
  s: [
    `Сервер: пользователь с sudo, вход по ключу, <code>PermitRootLogin no</code>, <code>PasswordAuthentication no</code>.`,
    `Проверяй вход в новой сессии, прежде чем закрыть старую.`,
    `<code>ufw allow</code> → <code>ufw enable</code>; обновления <code>apt upgrade</code>.`,
    `nginx: <code>systemctl status</code>, <code>curl -I</code>, <code>ss -tlpn</code>, <code>journalctl -u</code>.`,
    `<code>| sudo tee</code> вместо <code>sudo echo &gt;</code>.`,
    `На собеседовании рассуждай по шагам диагностики.`
  ]
});
