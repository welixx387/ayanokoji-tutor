L('linux', 14, {
  m: 35,
  intro: 'Закончившееся место на диске — одна из самых частых причин падения серверов: база не может записать данные, журнал перестаёт писаться, приложение молча ломается. В этом уроке — как найти, что занимает место, как устроены разделы и монтирование, что такое inode и чем жёсткая ссылка отличается от символической.',
  intro2: 'Сэмпай, диск заканчивается всегда в самый неподходящий момент ♡ Обычно в пятницу вечером! Научимся находить, кто съел всё место, быстрее, чем начальник заметит, что сайт лежит.',
  goals: [
    'Смотреть свободное место и размеры каталогов: df, du',
    'Видеть диски и разделы: lsblk, mount, /etc/fstab',
    'Понимать inode и файловые ссылки',
    'Создавать жёсткие и символические ссылки: ln и ln -s'
  ],
  c: `
<h3>Сколько места</h3>
<pre class="code" data-lang="sh">$ df -h                    # свободное место на всех файловых системах
$ df -h /                  # только на корневой
$ du -sh ~/projects        # размер каталога
$ du -sh * | sort -h       # размеры всего в текущем каталоге по возрастанию
$ sudo du -xh / --max-depth=1 | sort -h | tail   # крупнейшие каталоги корня</pre>
<div class="warn"><p>Бывает, что <code>df</code> показывает заполненный диск, а <code>du</code> не находит крупных файлов. Причина — удалённый файл, который всё ещё открыт процессом (например, огромный журнал). Место освободится, когда процесс закроет файл: найти его помогает <code>sudo lsof | grep deleted</code>.</p></div>

<h3>Диски, разделы, монтирование</h3>
<pre class="code" data-lang="sh">$ lsblk                    # дерево дисков и разделов
NAME   SIZE TYPE MOUNTPOINT
sda    100G disk
├─sda1   1G part /boot
└─sda2  99G part /
sdb     50G disk
└─sdb1  50G part
$ sudo mkdir /mnt/data
$ sudo mount /dev/sdb1 /mnt/data   # подключить раздел к каталогу
$ sudo umount /mnt/data            # отключить</pre>
<p>В Linux раздел не получает букву: его содержимое «подвешивается» в любой каталог дерева — точку монтирования. Чтобы раздел монтировался при загрузке, его прописывают в <code>/etc/fstab</code>:</p>
<pre class="code" data-lang="txt">UUID=3f1c…  /mnt/data  ext4  defaults  0  2</pre>
<p>UUID раздела показывает <code>sudo blkid</code>. Ошибка в fstab может помешать загрузке, поэтому после правки проверь: <code>sudo mount -a</code>.</p>

<h3>inode и ссылки</h3>
<p>Файл в Linux — это <b>inode</b>: структура с правами, владельцем, размером и адресами блоков данных. Имя файла — лишь запись в каталоге, указывающая на inode. Номер inode показывает <code>ls -i</code>.</p>
<div class="tbl"><table><thead><tr><th></th><th>Жёсткая ссылка <code>ln a b</code></th><th>Символическая <code>ln -s a b</code></th></tr></thead><tbody>
<tr><td>Что это</td><td>второе имя того же inode</td><td>отдельный файл, хранящий путь</td></tr>
<tr><td>Если удалить оригинал</td><td>данные живы, пока есть хоть одно имя</td><td>ссылка «повисает»</td></tr>
<tr><td>На каталог</td><td>нельзя</td><td>можно</td></tr>
<tr><td>Между разделами</td><td>нельзя</td><td>можно</td></tr>
</tbody></table></div>
<pre class="code" data-lang="sh">$ ln -s /opt/app/releases/v2 /opt/app/current   # «текущая версия»
$ ls -l /opt/app/current
lrwxrwxrwx 1 root root 20 Oct 24 current -> /opt/app/releases/v2</pre>
<div class="ichika">Символическая ссылка — как ярлык на рабочем столе ♡ А жёсткая — как второе имя у человека: Ичика и Амасава — это всё ещё я! Пока помнят хоть одно имя — я существую.</div>
<p>Inode тоже могут закончиться — при миллионах мелких файлов: <code>df -i</code> покажет их использование.</p>
<div class="ayano">Поиск «кто съел диск» — это бинарный поиск по дереву: <code>du -sh</code> на верхнем уровне, заходи в самый большой каталог и повторяй. За четыре-пять шагов находится виновник: обычно разросшиеся журналы, кэши или забытые архивы. Перед удалением убедись, что файл не нужен работающему сервису.</div>
`,
  p: [
    { q: `Сколько свободного места на корневом разделе?`, a: `<pre class="code" data-lang="sh">$ df -h /</pre>` },
    { q: `Найди 5 самых больших каталогов в <code>/var</code>.`, a: `<pre class="code" data-lang="sh">$ sudo du -h /var --max-depth=1 | sort -h | tail -n 5</pre>` },
    { q: `Создай символическую ссылку <code>~/logs</code>, указывающую на <code>/var/log/myapp</code>.`, a: `<pre class="code" data-lang="sh">$ ln -s /var/log/myapp ~/logs</pre>` },
    { q: `Ты удалил оригинал, на который указывала символическая ссылка. Что с ней?`, a: `Она «повисает» (broken link): путь ведёт в никуда, а <code>ls -l</code> подсвечивает её как битую.` },
    { q: `Подключи раздел <code>/dev/sdc1</code> в каталог <code>/mnt/backup</code>.`, a: `<pre class="code" data-lang="sh">$ sudo mkdir -p /mnt/backup
$ sudo mount /dev/sdc1 /mnt/backup</pre>` },
    { q: `<code>df</code> показывает 100%, а <code>du</code> не видит больших файлов. В чём может быть причина?`, a: `Удалённый, но всё ещё открытый процессом файл. Найти: <code>sudo lsof | grep deleted</code>, затем перезапустить этот процесс.` }
  ],
  q: [
    { q: `Размер каталога в удобном виде:`, o: [`<code>df -h dir</code>`, `<code>du -sh dir</code>`, `<code>ls -s dir</code>`, `<code>size dir</code>`], a: 1, e: `du -sh.` },
    { q: `Файл автомонтирования разделов:`, o: [`<code>/etc/mtab</code> только`, `<code>/etc/fstab</code>`, `<code>/etc/mounts</code>`, `<code>/boot/fs</code>`], a: 1, e: `fstab.` },
    { q: `Символическая ссылка:`, o: [`<code>ln a b</code>`, `<code>ln -s a b</code>`, `<code>cp -l a b</code>`, `<code>link a b</code>`], a: 1, e: `-s = symbolic.` },
    { q: `Жёсткую ссылку нельзя создать:`, o: [`на обычный файл`, `на каталог`, `в том же каталоге`, `с другим именем`], a: 1, e: `Только на файлы и в пределах раздела.` },
    { q: `Использование inode:`, o: [`<code>df -i</code>`, `<code>du -i</code>`, `<code>ls -i</code> всего диска`, `<code>lsblk -i</code>`], a: 0, e: `df -i.` }
  ],
  s: [
    `<code>df -h</code> — свободное место; <code>du -sh</code> — размер каталога; <code>sort -h</code>.`,
    `Удалённый, но открытый файл держит место: <code>lsof | grep deleted</code>.`,
    `<code>lsblk</code>, <code>mount</code>/<code>umount</code>, <code>/etc/fstab</code> с UUID (<code>blkid</code>), проверка <code>mount -a</code>.`,
    `inode — данные файла; имя — запись в каталоге; <code>ls -i</code>, <code>df -i</code>.`,
    `Жёсткая ссылка — второе имя inode; символическая — путь (можно на каталоги и между разделами).`,
    `Поиск «пожирателя» диска — пошаговый <code>du</code> по дереву.`
  ]
});
