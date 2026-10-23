L('python', 14, {
  m: 45,
  intro: 'Python — любимый язык системных администраторов и DevOps-инженеров. Когда bash-скрипт разрастается и в нём появляются массивы, словари и обработка ошибок, его переписывают на Python. Сегодня научимся запускать внешние программы через subprocess, делать удобный интерфейс командной строки с argparse, работать с переменными окружения и файлами через shutil и правильно сообщать о результате кодом возврата.',
  intro2: 'Сэмпай, сегодня соединяем Python с курсом Linux ♡ Скрипт, который сам собирает архив, проверяет диски, запускает команды и пишет понятный отчёт, — мечта любого администратора. И помни: со скриптами, которые удаляют файлы, — только осторожно!',
  goals: [
    'Запускать внешние команды через subprocess.run и обрабатывать результат',
    'Создавать интерфейс командной строки с argparse',
    'Работать с окружением, файлами и каталогами через os и shutil',
    'Писать безопасные скрипты с кодами возврата и журналированием'
  ],
  c: `
<h3>subprocess.run</h3>
<pre class="code" data-lang="py">import subprocess

result = subprocess.run(["git", "status", "--short"],
                        capture_output=True, text=True, timeout=30)
print("код:", result.returncode)
print(result.stdout)
if result.returncode != 0:
    print("ошибка:", result.stderr)

# check=True — бросить исключение при ненулевом коде возврата
try:
    subprocess.run(["ls", "/nonexistent"], check=True, capture_output=True, text=True)
except subprocess.CalledProcessError as e:
    print("команда упала с кодом", e.returncode, e.stderr.strip())</pre>
<div class="warn"><p>Передавай команду <b>списком аргументов</b>, а не строкой с <code>shell=True</code>. Если в строку попадёт ввод пользователя, например имя файла <code>x; rm -rf ~</code>, shell выполнит вторую команду — это внедрение команд. Список аргументов передаётся программе напрямую, без интерпретации shell.</p></div>

<h3>argparse</h3>
<pre class="code" data-lang="py">import argparse
from pathlib import Path

def parse_args():
    p = argparse.ArgumentParser(description="Найти большие файлы в каталоге")
    p.add_argument("directory", type=Path, help="где искать")
    p.add_argument("-m", "--min-size", type=int, default=100, help="минимальный размер, МБ")
    p.add_argument("-n", "--top", type=int, default=10, help="сколько показать")
    p.add_argument("-v", "--verbose", action="store_true", help="подробный вывод")
    return p.parse_args()

def main():
    args = parse_args()
    limit = args.min_size * 1024 * 1024
    files = [(f.stat().st_size, f) for f in args.directory.rglob("*")
             if f.is_file() and f.stat().st_size >= limit]
    for size, f in sorted(files, reverse=True)[:args.top]:
        print(f"{size / 2 ** 20:8.1f} МБ  {f}")
    if args.verbose:
        print(f"всего найдено: {len(files)}")

if __name__ == "__main__":
    main()</pre>
<pre class="code" data-lang="sh">$ python bigfiles.py --help
usage: bigfiles.py [-h] [-m MIN_SIZE] [-n TOP] [-v] directory
$ python bigfiles.py ~/Downloads -m 500 -n 5</pre>
<p><code>argparse</code> сам разбирает аргументы, проверяет типы, генерирует справку <code>--help</code> и сообщения об ошибках. Дефис в имени опции превращается в подчёркивание в атрибуте: <code>--min-size</code> → <code>args.min_size</code>.</p>

<h3>Окружение, файлы, коды возврата</h3>
<pre class="code" data-lang="py">import logging
import os
import shutil
import sys
from datetime import datetime
from pathlib import Path

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("backup")

def backup(src: Path, dest_root: Path) -> Path:
    stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    archive = shutil.make_archive(str(dest_root / f"{src.name}-{stamp}"), "gztar", root_dir=src)
    log.info("архив создан: %s", archive)
    return Path(archive)

def main():
    src = Path(os.environ.get("BACKUP_SRC", Path.home() / "projects"))
    dest = Path(os.environ.get("BACKUP_DEST", "/tmp/backups"))
    if not src.is_dir():
        log.error("нет каталога %s", src)
        sys.exit(2)                       # ненулевой код — сигнал ошибки для cron и CI
    dest.mkdir(parents=True, exist_ok=True)
    free = shutil.disk_usage(dest).free
    if free < 1024 ** 3:
        log.warning("меньше 1 ГБ свободного места")
    backup(src, dest)

if __name__ == "__main__":
    main()</pre>
<div class="tbl"><table><thead><tr><th>Задача</th><th>Средство</th></tr></thead><tbody>
<tr><td>Копировать, переместить</td><td><code>shutil.copy2</code>, <code>shutil.move</code></td></tr>
<tr><td>Удалить дерево каталогов</td><td><code>shutil.rmtree</code> — осторожно!</td></tr>
<tr><td>Архив</td><td><code>shutil.make_archive</code>, модули <code>zipfile</code>, <code>tarfile</code></td></tr>
<tr><td>Переменные окружения</td><td><code>os.environ.get("NAME", default)</code></td></tr>
<tr><td>Код завершения</td><td><code>sys.exit(code)</code></td></tr>
<tr><td>Журнал</td><td>модуль <code>logging</code> вместо <code>print</code></td></tr>
</tbody></table></div>
<div class="ichika">Перед любым удалением добавь режим «сухого прогона» ♡ Флаг <code>--dry-run</code>, при котором скрипт только печатает, что бы он удалил. Запусти сначала с ним, проверь список — и только потом по-настоящему. Так поступают все опытные администраторы!</div>
<div class="ayano">Системный скрипт должен быть предсказуемым: понятная справка, явные параметры вместо зашитых путей, журнал действий, ненулевой код возврата при ошибке и никакой опасной операции без подтверждения или сухого прогона. Такой скрипт можно спокойно поставить в cron или CI — и знать, что он не устроит сюрпризов.</div>
`,
  p: [
    { q: `Запусти <code>df -h</code> и выведи только строку с корневым разделом.`, a: `<pre class="code" data-lang="py">import subprocess
out = subprocess.run(["df", "-h"], capture_output=True, text=True, check=True).stdout
for line in out.splitlines():
    if line.endswith(" /"):
        print(line)</pre>` },
    { q: `Почему опасно <code>subprocess.run(f"cat {name}", shell=True)</code>?`, a: `Если <code>name</code> пришёл от пользователя, он может содержать <code>; rm -rf ~</code> или другие команды — shell их выполнит. Безопасно: <code>subprocess.run(["cat", name])</code>.` },
    { q: `Добавь в <code>bigfiles.py</code> опцию <code>--ext</code>, ограничивающую поиск расширением.`, a: `<pre class="code" data-lang="py">p.add_argument("--ext", help="например .iso")
# при отборе файлов:
if args.ext and f.suffix != args.ext:
    continue</pre>` },
    { q: `Напиши скрипт, удаляющий файлы старше 30 дней в каталоге, с флагом <code>--dry-run</code>.`, a: `<pre class="code" data-lang="py">import argparse, time
from pathlib import Path

p = argparse.ArgumentParser()
p.add_argument("directory", type=Path)
p.add_argument("--dry-run", action="store_true")
args = p.parse_args()
limit = time.time() - 30 * 24 * 3600
for f in args.directory.iterdir():
    if f.is_file() and f.stat().st_mtime < limit:
        print(("удалил бы " if args.dry_run else "удаляю ") + str(f))
        if not args.dry_run:
            f.unlink()</pre>` },
    { q: `Зачем скрипту возвращать ненулевой код при ошибке?`, a: `Код возврата — сигнал для shell, cron, CI и других программ. По нему <code>&amp;&amp;</code> решает, запускать ли следующую команду, а CI помечает сборку как упавшую.` },
    { q: `Почему для журнала лучше <code>logging</code>, а не <code>print</code>?`, a: `<code>logging</code> добавляет время и уровень важности, позволяет фильтровать сообщения, писать их в файл и выключать подробный вывод без правки кода.` }
  ],
  q: [
    { q: `Безопасный способ передать команду в subprocess:`, o: [`строкой с <code>shell=True</code>`, `списком аргументов`, `через <code>os.system</code>`, `через <code>eval</code>`], a: 1, e: `Без интерпретации shell.` },
    { q: `Бросить исключение при ненулевом коде возврата:`, o: [`<code>check=True</code>`, `<code>strict=True</code>`, `<code>raise=True</code>`, `<code>text=True</code>`], a: 0, e: `CalledProcessError.` },
    { q: `Опция <code>--min-size</code> доступна как:`, o: [`<code>args.min-size</code>`, `<code>args.min_size</code>`, `<code>args["min-size"]</code>`, `<code>args.minsize</code>`], a: 1, e: `Дефис → подчёркивание.` },
    { q: `Флаг без значения в argparse:`, o: [`<code>type=bool</code>`, `<code>action="store_true"</code>`, `<code>flag=True</code>`, `<code>nargs=0</code>`], a: 1, e: `<code>store_true</code>.` },
    { q: `Завершить скрипт с кодом 2:`, o: [`<code>return 2</code> в модуле`, `<code>sys.exit(2)</code>`, `<code>exit_code = 2</code>`, `<code>raise 2</code>`], a: 1, e: `sys.exit.` }
  ],
  s: [
    `<code>subprocess.run([...], capture_output=True, text=True, check=True, timeout=...)</code>.`,
    `Никакого <code>shell=True</code> с пользовательским вводом.`,
    `<code>argparse</code>: позиционные и опции, типы, значения по умолчанию, <code>--help</code>.`,
    `<code>os.environ</code>, <code>shutil</code> (копирование, архивы, место на диске), <code>pathlib</code>.`,
    `<code>logging</code> вместо print; <code>sys.exit(код)</code> при ошибке.`,
    `Опасные операции — только с <code>--dry-run</code> и проверкой.`
  ]
});
