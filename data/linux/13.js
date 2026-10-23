L('linux', 13, {
  m: 40,
  intro: 'Веб-сервер, база данных, планировщик, SSH — всё это сервисы, которые работают в фоне и запускаются вместе с системой. В современном Linux ими управляет systemd. В этом уроке — как смотреть состояние сервиса, запускать и перезапускать его, включать автозапуск, писать свой unit-файл для приложения и читать журналы через journalctl.',
  intro2: 'Сэмпай, systemd — как дежурный по школе ♡ Он будит все сервисы утром, следит, чтобы никто не упал, а если упал — поднимает снова. И записывает всё в журнал. Строгий, но надёжный!',
  goals: [
    'Управлять сервисами через systemctl',
    'Включать и отключать автозапуск',
    'Писать unit-файл для своего приложения',
    'Читать журналы: journalctl -u, -f, --since, -p'
  ],
  c: `
<h3>systemctl</h3>
<pre class="code" data-lang="sh">$ systemctl status ssh         # состояние, PID, последние строки журнала
$ sudo systemctl start nginx   # запустить
$ sudo systemctl stop nginx    # остановить
$ sudo systemctl restart nginx # перезапустить
$ sudo systemctl reload nginx  # перечитать настройки без остановки (если поддерживается)
$ sudo systemctl enable nginx  # включить автозапуск при загрузке
$ sudo systemctl disable nginx # выключить автозапуск
$ systemctl list-units --type=service --state=running
$ systemctl --failed           # упавшие сервисы</pre>
<p>В выводе <code>status</code> смотри на строку <b>Active</b>: <code>active (running)</code> — работает, <code>inactive (dead)</code> — остановлен, <code>failed</code> — упал.</p>
<div class="warn"><p><code>start</code> и <code>enable</code> — разные вещи. <code>start</code> запускает сейчас, <code>enable</code> — при следующей загрузке. Чтобы и то и другое: <code>sudo systemctl enable --now nginx</code>.</p></div>

<h3>Свой сервис</h3>
<p>Допустим, есть приложение <code>/opt/notes/server.py</code>. Создадим <code>/etc/systemd/system/notes.service</code>:</p>
<pre class="code" data-lang="txt">[Unit]
Description=Notes web app
After=network.target

[Service]
User=notes
WorkingDirectory=/opt/notes
ExecStart=/usr/bin/python3 /opt/notes/server.py
Restart=on-failure
RestartSec=3
Environment=PORT=8000

[Install]
WantedBy=multi-user.target</pre>
<pre class="code" data-lang="sh">$ sudo systemctl daemon-reload        # перечитать unit-файлы
$ sudo systemctl enable --now notes
$ systemctl status notes</pre>
<div class="tbl"><table><thead><tr><th>Параметр</th><th>Смысл</th></tr></thead><tbody>
<tr><td><code>After=network.target</code></td><td>запускать после поднятия сети</td></tr>
<tr><td><code>User=</code></td><td>от какого пользователя (не root!)</td></tr>
<tr><td><code>ExecStart=</code></td><td>команда запуска — полный путь</td></tr>
<tr><td><code>Restart=on-failure</code></td><td>перезапускать при падении</td></tr>
<tr><td><code>WantedBy=multi-user.target</code></td><td>к какой цели привязан автозапуск</td></tr>
</tbody></table></div>
<div class="ichika">Сервис от root — плохая идея ♡ Если в приложении найдут уязвимость, взломщик получит всю систему. Создай отдельного пользователя: <code>sudo useradd -r -s /usr/sbin/nologin notes</code> — и пусть приложение живёт со своими скромными правами.</div>

<h3>journalctl</h3>
<pre class="code" data-lang="sh">$ journalctl -u notes              # журнал сервиса
$ journalctl -u notes -f           # в реальном времени
$ journalctl -u notes --since "1 hour ago"
$ journalctl -p err -b             # только ошибки с последней загрузки
$ journalctl --disk-usage          # сколько места занимает журнал</pre>
<p>Всё, что приложение пишет в stdout и stderr, systemd собирает в журнал — отдельные файлы логов настраивать не обязательно.</p>
<div class="ayano">Когда сервис не стартует, порядок такой: <code>systemctl status</code> — что случилось и с каким кодом; <code>journalctl -u имя -n 50</code> — последние сообщения; запустить команду из <code>ExecStart</code> вручную от того же пользователя — увидеть ошибку напрямую. В девяти случаях из десяти причина — неверный путь, права или забытый <code>daemon-reload</code>.</div>
`,
  p: [
    { q: `Проверь, работает ли сервис <code>cron</code>.`, a: `<pre class="code" data-lang="sh">$ systemctl status cron</pre>` },
    { q: `Включи автозапуск <code>postgresql</code> и сразу запусти его.`, a: `<pre class="code" data-lang="sh">$ sudo systemctl enable --now postgresql</pre>` },
    { q: `Ты изменил файл <code>notes.service</code>. Какие две команды нужны, чтобы изменения вступили в силу?`, a: `<pre class="code" data-lang="sh">$ sudo systemctl daemon-reload
$ sudo systemctl restart notes</pre>` },
    { q: `Покажи ошибки сервиса <code>nginx</code> за последние 30 минут.`, a: `<pre class="code" data-lang="sh">$ journalctl -u nginx -p err --since "30 min ago"</pre>` },
    { q: `Какой параметр заставит systemd поднимать упавшее приложение?`, a: `<code>Restart=on-failure</code> (или <code>always</code>) в секции <code>[Service]</code>.` },
    { q: `Перечисли упавшие сервисы.`, a: `<pre class="code" data-lang="sh">$ systemctl --failed</pre>` }
  ],
  q: [
    { q: `Включить автозапуск:`, o: [`<code>start</code>`, `<code>enable</code>`, `<code>reload</code>`, `<code>status</code>`], a: 1, e: `enable.` },
    { q: `После изменения unit-файла нужно:`, o: [`перезагрузить компьютер`, `<code>systemctl daemon-reload</code>`, `<code>apt update</code>`, `ничего`], a: 1, e: `Перечитать конфигурацию.` },
    { q: `Журнал сервиса в реальном времени:`, o: [`<code>journalctl -u app -f</code>`, `<code>tail app</code>`, `<code>systemctl log app</code>`, `<code>dmesg app</code>`], a: 0, e: `-f = follow.` },
    { q: `Секция с командой запуска:`, o: [`<code>[Unit]</code>`, `<code>[Service]</code>`, `<code>[Install]</code>`, `<code>[Run]</code>`], a: 1, e: `ExecStart в [Service].` },
    { q: `Состояние <code>failed</code> означает:`, o: [`сервис выключен вручную`, `сервис упал`, `сервис обновляется`, `сервис работает`], a: 1, e: `Упал.` }
  ],
  s: [
    `<code>systemctl status/start/stop/restart/reload/enable/disable</code>; <code>enable --now</code>.`,
    `<code>systemctl --failed</code>, <code>list-units --type=service</code>.`,
    `Unit-файл в <code>/etc/systemd/system</code>: [Unit], [Service] (User, ExecStart, Restart), [Install].`,
    `После правки — <code>daemon-reload</code>; сервисы — не от root.`,
    `<code>journalctl -u имя -f --since -p err -b</code>.`,
    `Диагностика: status → journalctl → ручной запуск ExecStart.`
  ]
});
