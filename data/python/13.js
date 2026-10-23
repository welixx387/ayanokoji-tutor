L('python', 13, {
  m: 45,
  intro: 'Python часто называют языком «с батарейками в комплекте»: стандартная библиотека решает огромную часть повседневных задач без сторонних пакетов. Сегодня освоим четыре модуля, которые нужны почти в каждом проекте: pathlib для работы с путями и файлами, json для обмена данными, datetime для дат и времени и collections со специализированными контейнерами.',
  intro2: 'Сэмпай, прежде чем искать пакет в интернете, загляни в стандартную библиотеку ♡ Там уже есть почти всё: пути, JSON, даты, архивы, сеть, базы данных SQLite. Это как обнаружить, что в твоей комнате давно лежит нужная книга!',
  goals: [
    'Работать с путями и файлами через pathlib',
    'Сохранять и загружать данные в формате JSON',
    'Вычислять и форматировать даты и интервалы через datetime',
    'Применять Counter, defaultdict, deque и namedtuple'
  ],
  c: `
<h3>pathlib</h3>
<pre class="code" data-lang="py">from pathlib import Path

home = Path.home()
project = Path("reports") / "2026" / "october"       # оператор / склеивает пути
project.mkdir(parents=True, exist_ok=True)            # создать с родителями

report = project / "summary.txt"
report.write_text("Итоги месяца\\n", encoding="utf-8")
print(report.read_text(encoding="utf-8"))
print(report.name, report.stem, report.suffix, report.parent)   # summary.txt summary .txt reports/2026/october
print(report.exists(), report.is_file(), report.stat().st_size)

for p in Path(".").rglob("*.py"):                     # рекурсивный поиск файлов
    print(p)</pre>
<p><code>Path</code> заменяет строки и функции из <code>os.path</code>: пути склеиваются оператором <code>/</code> одинаково в Linux и Windows, а частые операции — методы самого пути.</p>

<h3>json</h3>
<pre class="code" data-lang="py">import json

data = {"name": "Ichika", "grade": 9, "clubs": [], "active": True, "rating": None}
text = json.dumps(data, ensure_ascii=False, indent=2)   # объект → строка
print(text)
back = json.loads(text)                                  # строка → объект

with open("student.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)     # прямо в файл
with open("student.json", encoding="utf-8") as f:
    loaded = json.load(f)</pre>
<div class="tbl"><table><thead><tr><th>JSON</th><th>Python</th></tr></thead><tbody>
<tr><td>object</td><td><code>dict</code></td></tr>
<tr><td>array</td><td><code>list</code></td></tr>
<tr><td>string, number</td><td><code>str</code>, <code>int</code>/<code>float</code></td></tr>
<tr><td>true, false, null</td><td><code>True</code>, <code>False</code>, <code>None</code></td></tr>
</tbody></table></div>
<p><code>ensure_ascii=False</code> сохраняет кириллицу читаемой, иначе она превратится в коды вида <code>\\u041f</code>. Множества, даты и свои объекты JSON не поддерживает — их нужно преобразовать, например дату — в строку ISO.</p>

<h3>datetime</h3>
<pre class="code" data-lang="py">from datetime import date, datetime, timedelta, timezone

today = date.today()
exam = date(2026, 12, 20)
print((exam - today).days, "дней до экзамена")

now = datetime.now(timezone.utc)                     # время с часовым поясом
deadline = now + timedelta(days=3, hours=2)
print(deadline.isoformat())
print(now.strftime("%d.%m.%Y %H:%M"))                # 24.10.2026 15:30

parsed = datetime.strptime("24.10.2026 18:00", "%d.%m.%Y %H:%M")
print(parsed.weekday())                              # 0 — понедельник … 6 — воскресенье</pre>
<div class="warn"><p>Время без часового пояса («наивное») — частый источник ошибок: на сервере и на ноутбуке оно означает разное. Храни и передавай время в UTC с поясом (<code>timezone.utc</code>), а в местное переводи только для показа пользователю.</p></div>

<h3>collections</h3>
<pre class="code" data-lang="py">from collections import Counter, defaultdict, deque, namedtuple

votes = Counter(["Ichika", "Kiyotaka", "Ichika", "Suzune", "Ichika"])
print(votes.most_common(1))            # [('Ichika', 3)]

graph = defaultdict(list)
for a, b in [("A", "B"), ("A", "C"), ("B", "C")]:
    graph[a].append(b)

recent = deque(maxlen=3)               # очередь, хранящая только последние 3
for page in ["home", "news", "about", "contacts"]:
    recent.append(page)
print(list(recent))                    # ['news', 'about', 'contacts']
recent.appendleft("start")             # O(1) в оба конца

Point = namedtuple("Point", "x y")
p = Point(3, 4)
print(p.x, p.y, p)                     # 3 4 Point(x=3, y=4)</pre>
<div class="ichika"><code>deque</code> — правильная очередь ♡ Удаление из начала списка <code>list.pop(0)</code> сдвигает все элементы и стоит O(n), а <code>deque.popleft()</code> — O(1). Для обхода графа в ширину только <code>deque</code>!</div>
<div class="ayano">Знание стандартной библиотеки экономит дни работы и избавляет от лишних зависимостей. Хорошая привычка — перед написанием утилитной функции спросить себя: «Нет ли этого в стандартной библиотеке?». Чаще всего ответ — да, и готовая реализация лучше протестирована, чем твоя.</div>
`,
  p: [
    { q: `Найди все файлы <code>.txt</code> в каталоге <code>docs</code> и его подкаталогах и посчитай их суммарный размер.`, a: `<pre class="code" data-lang="py">from pathlib import Path
total = sum(p.stat().st_size for p in Path("docs").rglob("*.txt"))
print(total, "байт")</pre>` },
    { q: `Сохрани список учеников в JSON с отступами и кириллицей, затем загрузи его обратно.`, a: `<pre class="code" data-lang="py">import json
from pathlib import Path
students = [{"name": "Айано", "grade": 10}]
Path("students.json").write_text(json.dumps(students, ensure_ascii=False, indent=2), encoding="utf-8")
loaded = json.loads(Path("students.json").read_text(encoding="utf-8"))</pre>` },
    { q: `Сколько полных недель осталось до 1 января следующего года?`, a: `<pre class="code" data-lang="py">from datetime import date
today = date.today()
ny = date(today.year + 1, 1, 1)
print((ny - today).days // 7)</pre>` },
    { q: `Почему <code>json.dumps({"date": date.today()})</code> падает и как исправить?`, a: `JSON не знает тип даты: <code>TypeError: Object of type date is not JSON serializable</code>. Преобразуй в строку: <code>{"date": date.today().isoformat()}</code> или передай <code>default=str</code>.` },
    { q: `Храни 5 последних введённых команд и выводи их по запросу.`, a: `<pre class="code" data-lang="py">from collections import deque
history = deque(maxlen=5)
while (cmd := input("> ")) != "quit":
    if cmd == "history":
        print(list(history))
    else:
        history.append(cmd)</pre>` },
    { q: `Найди три самых частых слова в файле.`, a: `<pre class="code" data-lang="py">from collections import Counter
from pathlib import Path
words = Path("text.txt").read_text(encoding="utf-8").lower().split()
print(Counter(words).most_common(3))</pre>` }
  ],
  q: [
    { q: `Склеить пути в pathlib:`, o: [`<code>+</code>`, `<code>/</code>`, `<code>join()</code> только`, `<code>&amp;</code>`], a: 1, e: `Оператор деления.` },
    { q: `Объект Python → строка JSON:`, o: [`<code>json.loads</code>`, `<code>json.dumps</code>`, `<code>json.parse</code>`, `<code>str()</code>`], a: 1, e: `dump string.` },
    { q: `Сохранить кириллицу в JSON читаемой:`, o: [`<code>indent=2</code>`, `<code>ensure_ascii=False</code>`, `<code>utf8=True</code>`, `<code>sort_keys=True</code>`], a: 1, e: `Без \\u-кодов.` },
    { q: `Интервал «3 дня» в datetime:`, o: [`<code>timedelta(days=3)</code>`, `<code>date(3)</code>`, `<code>days(3)</code>`, `<code>interval(3)</code>`], a: 0, e: `timedelta.` },
    { q: `Эффективная очередь с удалением из начала:`, o: [`<code>list</code>`, `<code>deque</code>`, `<code>tuple</code>`, `<code>set</code>`], a: 1, e: `O(1) в оба конца.` }
  ],
  s: [
    `<code>pathlib.Path</code>: <code>/</code>, <code>mkdir</code>, <code>read_text</code>, <code>write_text</code>, <code>rglob</code>, <code>name</code>, <code>suffix</code>.`,
    `<code>json.dumps</code>/<code>loads</code>, <code>dump</code>/<code>load</code>; <code>ensure_ascii=False</code>, <code>indent</code>.`,
    `<code>datetime</code>: <code>date</code>, <code>timedelta</code>, <code>strftime</code>/<code>strptime</code>; храни время в UTC.`,
    `<code>Counter</code>, <code>defaultdict</code>, <code>deque(maxlen=...)</code>, <code>namedtuple</code>.`,
    `JSON не умеет даты и множества — преобразуй их.`,
    `Сначала ищи решение в стандартной библиотеке.`
  ]
});
