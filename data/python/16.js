L('python', 16, {
  m: 45,
  intro: 'Финальная контрольная курса Python — утилита loglens для анализа журналов веб-сервера: она читает файлы журналов любого размера, считает запросы по кодам ответа и адресам, находит самые медленные страницы и выводит отчёт в консоль или JSON. Проект объединяет argparse, pathlib, генераторы, dataclass, collections, исключения, тесты и аннотации типов. Вторая часть урока — вопросы собеседования junior-разработчика на Python.',
  intro2: 'Сэмпай, это твой выпускной проект ♡ Такие утилиты администраторы пишут постоянно: что-то тормозит, и нужно быстро понять, какие страницы медленные и откуда идут ошибки. Сделай её аккуратно — и смело показывай на собеседовании!',
  goals: [
    'Спроектировать утилиту с разделением на разбор, анализ и вывод',
    'Обрабатывать большие файлы потоком через генераторы',
    'Сообщать об ошибках понятно и возвращать правильный код',
    'Покрыть логику тестами и ответить на вопросы собеседования'
  ],
  c: `
<h3>Формат журнала и требования</h3>
<pre class="code" data-lang="txt">2026-10-24T10:15:02 192.168.1.5 GET /index.html 200 35
2026-10-24T10:15:03 192.168.1.9 GET /api/users 500 812
2026-10-24T10:15:04 10.0.0.2 POST /api/login 401 120</pre>
<p>Поля: время, IP-адрес, метод, путь, код ответа, время обработки в миллисекундах.</p>
<pre class="code" data-lang="sh">$ python loglens.py access.log access.log.1 --top 3
запросов: 15 230, ошибок 5xx: 42 (0.3%)
коды: 200 — 14 102, 404 — 870, 401 — 216, 500 — 42
медленные: /api/report 2 140 мс, /api/users 812 мс, /search 640 мс
$ python loglens.py access.log --json > report.json</pre>

<h3>Разбор и анализ</h3>
<pre class="code" data-lang="py">from __future__ import annotations

import argparse
import json
import sys
from collections import Counter
from dataclasses import dataclass, field
from pathlib import Path
from typing import Iterable, Iterator


@dataclass(frozen=True)
class Entry:
    ip: str
    method: str
    path: str
    status: int
    ms: int


def parse_line(line: str) -> Entry | None:
    parts = line.split()
    if len(parts) != 6:
        return None
    _, ip, method, path, status, ms = parts
    try:
        return Entry(ip, method, path, int(status), int(ms))
    except ValueError:
        return None


def read_entries(paths: Iterable[Path], bad: Counter) -> Iterator[Entry]:
    for p in paths:
        with p.open(encoding="utf-8", errors="replace") as f:
            for line in f:
                if not line.strip():
                    continue
                entry = parse_line(line)
                if entry is None:
                    bad[str(p)] += 1
                else:
                    yield entry


@dataclass
class Report:
    total: int = 0
    statuses: Counter = field(default_factory=Counter)
    ips: Counter = field(default_factory=Counter)
    slowest: dict[str, int] = field(default_factory=dict)

    def add(self, e: Entry) -> None:
        self.total += 1
        self.statuses[e.status] += 1
        self.ips[e.ip] += 1
        if e.ms > self.slowest.get(e.path, -1):
            self.slowest[e.path] = e.ms

    @property
    def errors(self) -> int:
        return sum(n for code, n in self.statuses.items() if code >= 500)

    def top_slow(self, n: int) -> list[tuple[str, int]]:
        return sorted(self.slowest.items(), key=lambda kv: kv[1], reverse=True)[:n]


def analyze(entries: Iterable[Entry]) -> Report:
    report = Report()
    for e in entries:
        report.add(e)
    return report</pre>

<h3>Интерфейс командной строки</h3>
<pre class="code" data-lang="py">def num(n: int) -> str:
    return f"{n:,}".replace(",", " ")       # 15230 → «15 230»


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description="Анализ журналов веб-сервера")
    ap.add_argument("files", nargs="+", type=Path)
    ap.add_argument("--top", type=int, default=5)
    ap.add_argument("--json", action="store_true", help="вывод в формате JSON")
    args = ap.parse_args(argv)

    missing = [p for p in args.files if not p.is_file()]
    if missing:
        print(f"нет файла: {', '.join(map(str, missing))}", file=sys.stderr)
        return 2

    bad: Counter = Counter()
    rep = analyze(read_entries(args.files, bad))
    if args.json:
        json.dump({"total": rep.total, "errors": rep.errors,
                   "statuses": dict(rep.statuses), "slowest": rep.top_slow(args.top)},
                  sys.stdout, ensure_ascii=False, indent=2)
        print()
    else:
        share = rep.errors / rep.total if rep.total else 0
        print(f"запросов: {num(rep.total)}, ошибок 5xx: {rep.errors} ({share:.1%})")
        print("коды:", ", ".join(f"{c} — {num(n)}" for c, n in rep.statuses.most_common()))
        print("медленные:", ", ".join(f"{p} {num(ms)} мс" for p, ms in rep.top_slow(args.top)))
    for name, n in bad.items():
        print(f"предупреждение: {name}: пропущено строк: {n}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())</pre>
<div class="ichika"><code>main</code> принимает список аргументов и возвращает код ♡ Поэтому её можно вызвать прямо из теста: <code>main(["log.txt", "--json"])</code>, — без запуска отдельного процесса. Маленькая хитрость, которая делает CLI тестируемым!</div>

<h3>Тесты</h3>
<pre class="code" data-lang="py"># test_loglens.py
from collections import Counter
from loglens import analyze, main, parse_line, read_entries

LINE = "2026-10-24T10:15:03 192.168.1.9 GET /api/users 500 812"

def test_parse_line_ok():
    e = parse_line(LINE)
    assert e is not None and e.status == 500 and e.ms == 812

def test_parse_line_bad():
    assert parse_line("мусор") is None
    assert parse_line(LINE.replace("812", "abc")) is None

def test_report_counts(tmp_path):
    log = tmp_path / "a.log"
    log.write_text(LINE + "\\n" + LINE.replace("500", "200") + "\\nbroken\\n", encoding="utf-8")
    bad = Counter()
    rep = analyze(read_entries([log], bad))
    assert rep.total == 2 and rep.errors == 1
    assert bad[str(log)] == 1

def test_main_missing_file(capsys):
    assert main(["nope.log"]) == 2
    assert "нет файла" in capsys.readouterr().err</pre>
<div class="warn"><p>Чтение файла с <code>errors="replace"</code> не падает на случайных байтах в журнале, а заменяет их символом-заменителем. Для журналов, которые пишут разные программы, это разумный выбор; для данных, где важна каждая буква, лучше явная ошибка.</p></div>

<h3>Вопросы собеседования</h3>
<div class="tbl"><table><thead><tr><th>Вопрос</th><th>Суть ответа</th></tr></thead><tbody>
<tr><td>Изменяемые и неизменяемые типы?</td><td><code>list</code>, <code>dict</code>, <code>set</code> — изменяемые; <code>int</code>, <code>str</code>, <code>tuple</code> — нет; ключи словаря только неизменяемые</td></tr>
<tr><td>Как передаются аргументы?</td><td>Передаётся ссылка на объект; изменение изменяемого объекта видно снаружи, переприсваивание — нет</td></tr>
<tr><td>Ловушка значения по умолчанию?</td><td>Вычисляется один раз; изменяемое значение делится между вызовами — используй <code>None</code></td></tr>
<tr><td>Генератор и список?</td><td>Ленивая одноразовая последовательность против хранения всех элементов</td></tr>
<tr><td>Что такое декоратор?</td><td>Функция, принимающая функцию и возвращающая обёртку</td></tr>
<tr><td><code>is</code> и <code>==</code>?</td><td>Тот же объект против равного содержимого</td></tr>
<tr><td>Что такое GIL?</td><td>Блокировка интерпретатора CPython: потоки не ускоряют вычисления на CPU, но помогают при ожидании ввода-вывода; для CPU — процессы</td></tr>
<tr><td>Как изолировать зависимости?</td><td>Виртуальное окружение и файл зависимостей</td></tr>
</tbody></table></div>
<div class="ayano">Junior на Python — это человек, который пишет понятный, проверенный код без ловушек языка и знает стандартную библиотеку. Доведи loglens до конца, добавь README, тесты и запуск <code>ruff</code> и <code>mypy</code>, выложи на GitHub. Дальше — «Fluent Python» Лучано Рамальо, официальная документация и свои проекты: автоматизация, бот, небольшой веб-сервис.</div>
`,
  p: [
    { q: `Почему <code>read_entries</code> — генератор, а не функция, возвращающая список?`, a: `Журналы бывают огромными; генератор отдаёт записи по одной, и память не зависит от размера файла.` },
    { q: `Зачем <code>Entry</code> объявлен с <code>frozen=True</code>?`, a: `Запись журнала не должна меняться после разбора; замороженный dataclass запрещает изменение атрибутов и делает объекты хешируемыми.` },
    { q: `Добавь в отчёт пять IP-адресов с наибольшим числом запросов.`, a: `<pre class="code" data-lang="py">print("активные IP:", ", ".join(f"{ip} ({n})" for ip, n in rep.ips.most_common(5)))</pre>` },
    { q: `Добавь фильтр <code>--status 5xx</code>, оставляющий только ошибки сервера.`, a: `Добавь аргумент, а перед анализом оберни поток генератором: <code>entries = (e for e in entries if e.status &gt;= 500)</code>. Ленивость сохраняется.` },
    { q: `Вопрос собеседования: что напечатает код?<pre class="code" data-lang="py">def f(x):
    x.append(1)
    x = [9]
a = []
f(a)
print(a)</pre>`, a: `<code>[1]</code>: функция изменила список через переданную ссылку, а затем переприсвоила локальное имя <code>x</code>, что на <code>a</code> не влияет.` },
    { q: `Вопрос собеседования: ускорят ли потоки подсчёт простых чисел в CPython?`, a: `Нет: из-за GIL в каждый момент байткод выполняет один поток. Для вычислений на CPU используют процессы (<code>multiprocessing</code>, <code>concurrent.futures.ProcessPoolExecutor</code>); потоки полезны при ожидании ввода-вывода.` }
  ],
  q: [
    { q: `Обработка файла любого размера без загрузки в память:`, o: [`<code>f.read()</code>`, `генератор по строкам`, `<code>list(f)</code>`, `<code>json.load</code>`], a: 1, e: `Поток.` },
    { q: `<code>main(argv)</code>, возвращающая код, удобна потому что:`, o: [`быстрее`, `её можно вызвать из теста`, `так требует Python`, `не нужен argparse`], a: 1, e: `Тестируемость.` },
    { q: `<code>Counter.most_common(3)</code> возвращает:`, o: [`словарь`, `три самых частых пары`, `число`, `множество`], a: 1, e: `Список пар.` },
    { q: `Неизменяемый dataclass:`, o: [`<code>@dataclass(frozen=True)</code>`, `<code>@dataclass(const=True)</code>`, `<code>@immutable</code>`, `<code>@final</code>`], a: 0, e: `frozen.` },
    { q: `GIL мешает ускорению за счёт потоков:`, o: [`ввода-вывода`, `вычислений на CPU`, `чтения файлов`, `сетевых запросов`], a: 1, e: `Для CPU — процессы.` }
  ],
  s: [
    `Структура: разбор (<code>parse_line</code>), поток (<code>read_entries</code>), анализ (<code>Report</code>), вывод (<code>main</code>).`,
    `Генераторы — обработка файлов любого размера.`,
    `<code>dataclass</code>, <code>Counter</code>, аннотации типов делают код ясным.`,
    `Ошибки — в stderr, коды возврата, предупреждения о пропущенных строках.`,
    `<code>main(argv) -&gt; int</code> и pytest с <code>tmp_path</code>, <code>capsys</code>.`,
    `Собеседование: изменяемость, передача ссылок, генераторы, декораторы, <code>is</code>, GIL, окружения.`
  ]
});
