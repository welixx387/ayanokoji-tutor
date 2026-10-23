L('linux', 9, {
  m: 35,
  intro: 'В Linux программы почти никогда не скачивают с сайтов вручную: их ставят менеджером пакетов из проверенных репозиториев. Он сам находит зависимости, обновляет всё одной командой и чисто удаляет ненужное. В этом уроке — apt в Ubuntu и Debian, устройство репозиториев, поиск пакетов и сборка программы из исходников, когда пакета нет.',
  intro2: 'Сэмпай, менеджер пакетов — как магазин приложений, только быстрее и без рекламы ♡ Одна команда — и программа установлена со всеми зависимостями. А обновить всю систему можно, пока пьёшь чай!',
  goals: [
    'Устанавливать, обновлять и удалять программы через apt',
    'Искать пакеты и узнавать информацию о них',
    'Понимать, что такое репозиторий и зависимости',
    'Собирать программу из исходников по схеме configure, make, make install'
  ],
  c: `
<h3>Основные команды apt</h3>
<pre class="code" data-lang="sh">$ sudo apt update                # обновить список пакетов из репозиториев
$ sudo apt upgrade               # обновить установленные программы
$ sudo apt install htop tree     # установить пакеты
$ sudo apt remove tree           # удалить (настройки останутся)
$ sudo apt purge tree            # удалить вместе с настройками
$ sudo apt autoremove            # удалить ненужные зависимости
$ apt search json                # поиск по названию и описанию
$ apt show htop                  # описание, версия, зависимости
$ apt list --installed | grep gcc</pre>
<div class="warn"><p><code>apt update</code> ничего не устанавливает — он только скачивает свежий список доступных версий. Сначала <code>update</code>, потом <code>upgrade</code> или <code>install</code>, иначе apt может искать устаревшие версии.</p></div>

<h3>Репозитории и зависимости</h3>
<p><b>Репозиторий</b> — сервер с пакетами, подписанными ключом дистрибутива. Список источников лежит в <code>/etc/apt/sources.list</code> и <code>/etc/apt/sources.list.d/</code>. <b>Зависимости</b> — другие пакеты, нужные программе: apt ставит их автоматически.</p>
<div class="tbl"><table><thead><tr><th>Инструмент</th><th>Уровень</th><th>Пример</th></tr></thead><tbody>
<tr><td><code>dpkg</code></td><td>низкий: ставит один .deb-файл, зависимости не ищет</td><td><code>sudo dpkg -i file.deb</code></td></tr>
<tr><td><code>apt</code></td><td>высокий: репозитории и зависимости</td><td><code>sudo apt install ./file.deb</code></td></tr>
<tr><td><code>snap</code>, <code>flatpak</code></td><td>самодостаточные пакеты с зависимостями внутри</td><td><code>sudo snap install code --classic</code></td></tr>
</tbody></table></div>
<div class="ichika">Где лежит установленная программа? ♡ <code>which htop</code> покажет путь к команде, а <code>dpkg -L htop</code> — все файлы пакета. Удобно, когда хочешь понять, куда что разложилось!</div>

<h3>Набор для разработки</h3>
<pre class="code" data-lang="sh">$ sudo apt install build-essential gdb valgrind git python3 python3-pip
$ gcc --version
$ make --version</pre>
<p><code>build-essential</code> — gcc, g++, make и заголовки библиотеки C: всё, что нужно для курсов по C и C++.</p>

<h3>Сборка из исходников</h3>
<p>Если пакета нет или нужна новейшая версия, программу собирают сами. Классическая схема для проектов на autotools:</p>
<pre class="code" data-lang="sh">$ tar -xzf tool-1.2.tar.gz
$ cd tool-1.2
$ ./configure --prefix=$HOME/.local   # проверить систему и подготовить сборку
$ make -j$(nproc)                       # собрать на всех ядрах
$ make install                          # установить в ~/.local</pre>
<p>Установка в <code>~/.local</code> не требует sudo и не смешивает самосборные программы с системными. Чтобы команды находились, каталог <code>~/.local/bin</code> должен быть в переменной <code>PATH</code>.</p>
<div class="ayano">Правило выбора: сначала пакет из репозитория дистрибутива, затем официальный репозиторий разработчиков, и только потом сборка из исходников. Пакеты обновляются вместе с системой и получают исправления безопасности; самосборную программу обновлять придётся тебе. Не скачивай .deb с неизвестных сайтов — это прямой путь к вредоносному коду.</div>
`,
  p: [
    { q: `Обнови список пакетов и установи <code>curl</code> и <code>tree</code>.`, a: `<pre class="code" data-lang="sh">$ sudo apt update
$ sudo apt install curl tree</pre>` },
    { q: `Удали <code>tree</code> вместе с его настройками и ненужными зависимостями.`, a: `<pre class="code" data-lang="sh">$ sudo apt purge tree
$ sudo apt autoremove</pre>` },
    { q: `Какая версия <code>git</code> доступна в репозитории и от чего он зависит?`, a: `<pre class="code" data-lang="sh">$ apt show git</pre>` },
    { q: `Установлен ли пакет <code>gcc</code>?`, a: `<pre class="code" data-lang="sh">$ apt list --installed | grep gcc
$ gcc --version</pre>` },
    { q: `Где находится исполняемый файл команды <code>python3</code>?`, a: `<pre class="code" data-lang="sh">$ which python3</pre>` },
    { q: `Собери программу из исходников и установи её в домашний каталог без sudo.`, a: `<pre class="code" data-lang="sh">$ ./configure --prefix=$HOME/.local
$ make -j$(nproc)
$ make install</pre>` }
  ],
  q: [
    { q: `<code>apt update</code>:`, o: [`обновляет программы`, `обновляет список доступных пакетов`, `удаляет старое`, `обновляет ядро`], a: 1, e: `Только список.` },
    { q: `Удалить пакет вместе с настройками:`, o: [`<code>apt remove</code>`, `<code>apt purge</code>`, `<code>apt clean</code>`, `<code>dpkg -l</code>`], a: 1, e: `purge.` },
    { q: `Пакет с gcc, g++ и make в Ubuntu:`, o: [`<code>gcc-all</code>`, `<code>build-essential</code>`, `<code>devtools</code>`, `<code>make</code>`], a: 1, e: `build-essential.` },
    { q: `Схема сборки из исходников:`, o: [`make, configure, install`, `configure, make, make install`, `install, make`, `apt build`], a: 1, e: `Классика autotools.` },
    { q: `Безопаснее всего ставить программы:`, o: [`с любых сайтов`, `из репозиториев дистрибутива`, `из вложений в письмах`, `из торрентов`], a: 1, e: `Подписанные пакеты.` }
  ],
  s: [
    `<code>apt update</code> → <code>apt upgrade</code>/<code>install</code>; <code>remove</code>, <code>purge</code>, <code>autoremove</code>.`,
    `<code>apt search</code>, <code>apt show</code>, <code>apt list --installed</code>, <code>which</code>, <code>dpkg -L</code>.`,
    `Репозитории: <code>/etc/apt/sources.list(.d)</code>; зависимости ставятся автоматически.`,
    `<code>dpkg</code> — один .deb без зависимостей; snap и flatpak — самодостаточные пакеты.`,
    `<code>build-essential</code> — всё для C и C++.`,
    `Из исходников: <code>./configure --prefix=$HOME/.local</code>, <code>make</code>, <code>make install</code>.`
  ]
});
