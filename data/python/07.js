L('python', 7, {
  m: 40,
  intro: 'Большая часть повседневных задач — это обработка текста: разобрать строку, очистить, найти, заменить, записать результат в файл. Сегодня изучим самые полезные методы строк, научимся читать и писать файлы с помощью with open, разберёмся с кодировками — источником вечных проблем с русским текстом — и поработаем с CSV-файлами.',
  intro2: 'Сэмпай, если когда-нибудь увидишь вместо букв «РџСЂРёРІРµС‚» — это не порча, а неверная кодировка ♡ Файл записан в UTF-8, а прочитан как что-то другое. Сегодня научимся всегда явно говорить Python, в какой кодировке файл!',
  goals: [
    'Использовать методы строк: split, join, strip, replace, find, startswith',
    'Читать и записывать файлы через with open',
    'Указывать кодировку и понимать ошибки декодирования',
    'Читать и записывать CSV через модуль csv'
  ],
  c: `
<h3>Методы строк</h3>
<div class="tbl"><table><thead><tr><th>Метод</th><th>Пример</th><th>Результат</th></tr></thead><tbody>
<tr><td><code>split</code></td><td><code>"a,b,c".split(",")</code></td><td><code>['a', 'b', 'c']</code></td></tr>
<tr><td><code>join</code></td><td><code>"-".join(["a", "b"])</code></td><td><code>'a-b'</code></td></tr>
<tr><td><code>strip</code></td><td><code>"  hi \\n".strip()</code></td><td><code>'hi'</code></td></tr>
<tr><td><code>replace</code></td><td><code>"2+2".replace("+", " + ")</code></td><td><code>'2 + 2'</code></td></tr>
<tr><td><code>lower</code>, <code>upper</code>, <code>title</code></td><td><code>"ichika".title()</code></td><td><code>'Ichika'</code></td></tr>
<tr><td><code>find</code>, <code>count</code></td><td><code>"banana".find("an")</code></td><td><code>1</code> (или −1)</td></tr>
<tr><td><code>startswith</code>, <code>endswith</code></td><td><code>"log.txt".endswith(".txt")</code></td><td><code>True</code></td></tr>
<tr><td><code>isdigit</code>, <code>isalpha</code></td><td><code>"123".isdigit()</code></td><td><code>True</code></td></tr>
</tbody></table></div>
<pre class="code" data-lang="py">line = "  Kiyotaka ; 87 ; Class D  "
name, score, cls = [part.strip() for part in line.split(";")]
print(f"{name} ({cls}): {int(score)}")
words = "мама мыла раму".split()          # по любым пробельным символам
print(" ".join(reversed(words)))          # раму мыла мама</pre>
<p>Строки неизменяемы, поэтому каждый метод возвращает новую строку. Собирать большой текст в цикле через <code>s += part</code> медленно; быстрее накопить части в списке и склеить <code>"".join(parts)</code>.</p>

<h3>Файлы: with open</h3>
<pre class="code" data-lang="py">with open("notes.txt", "w", encoding="utf-8") as f:     # запись
    f.write("первая строка\\n")
    print("вторая строка", file=f)

with open("notes.txt", encoding="utf-8") as f:          # чтение построчно
    for lineno, line in enumerate(f, start=1):
        print(lineno, line.rstrip("\\n"))

with open("notes.txt", encoding="utf-8") as f:
    text = f.read()                                     # весь файл целиком

with open("log.txt", "a", encoding="utf-8") as f:       # дозапись
    f.write("запуск\\n")</pre>
<div class="tbl"><table><thead><tr><th>Режим</th><th>Смысл</th></tr></thead><tbody>
<tr><td><code>"r"</code></td><td>чтение (по умолчанию)</td></tr>
<tr><td><code>"w"</code></td><td>запись с очисткой</td></tr>
<tr><td><code>"a"</code></td><td>дозапись</td></tr>
<tr><td><code>"x"</code></td><td>создать новый, ошибка если существует</td></tr>
<tr><td><code>"rb"</code>, <code>"wb"</code></td><td>двоичный режим: байты, без кодировки</td></tr>
</tbody></table></div>
<p>Конструкция <code>with</code> закрывает файл автоматически при выходе из блока — даже если внутри произошла ошибка. Это тот же RAII, что в C++. Перебор файла в цикле читает его построчно и не загружает в память целиком — так можно обработать файл любого размера.</p>

<h3>Кодировки</h3>
<pre class="code" data-lang="py">data = "Привет".encode("utf-8")      # str → bytes: b'\\xd0\\x9f\\xd1\\x80...'
print(len(data))                     # 12 байт
print(data.decode("utf-8"))          # bytes → str

# data.decode("ascii")               # UnicodeDecodeError
print(data.decode("cp1251"))         # «РџСЂРёРІРµС‚» — неверная кодировка, мусор</pre>
<div class="warn"><p>Без параметра <code>encoding</code> Python использует кодировку системы по умолчанию, а она на разных компьютерах разная (на Windows это часто не UTF-8). Всегда пиши <code>encoding="utf-8"</code> при открытии текстовых файлов — тогда программа будет вести себя одинаково везде.</p></div>

<h3>CSV</h3>
<pre class="code" data-lang="py">import csv

rows = [{"name": "Kiyotaka", "score": 87}, {"name": "Ichika", "score": 95}]
with open("scores.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["name", "score"])
    writer.writeheader()
    writer.writerows(rows)

with open("scores.csv", newline="", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        print(row["name"], int(row["score"]))</pre>
<div class="ichika">Не разбирай CSV через <code>split(",")</code> ♡ В CSV поле может содержать запятую в кавычках: <code>"Ayanokoji, Kiyotaka",87</code>. Модуль <code>csv</code> знает все эти правила, а самодельный разбор сломается на первом же хитром файле!</div>
<div class="ayano">Работа с текстом и файлами кажется простой, пока не встретятся реальные данные: лишние пробелы, пустые строки, другая кодировка, запятые внутри полей. Всегда очищай вход (<code>strip</code>), пропускай пустые строки, указывай кодировку и используй готовые парсеры для стандартных форматов. Это и отличает надёжный скрипт от одноразового.</div>
`,
  p: [
    { q: `Посчитай количество непустых строк в файле <code>data.txt</code>.`, a: `<pre class="code" data-lang="py">with open("data.txt", encoding="utf-8") as f:
    n = sum(1 for line in f if line.strip())
print(n)</pre>` },
    { q: `Преврати строку «  Hello,   World  » в «hello world».`, a: `<pre class="code" data-lang="py">s = "  Hello,   World  "
clean = " ".join(s.replace(",", "").lower().split())</pre> <code>split()</code> без аргумента схлопывает любые пробелы.` },
    { q: `Скопируй текстовый файл, пронумеровав строки.`, a: `<pre class="code" data-lang="py">with open("in.txt", encoding="utf-8") as src, open("out.txt", "w", encoding="utf-8") as dst:
    for i, line in enumerate(src, start=1):
        dst.write(f"{i:4}  {line}")</pre>` },
    { q: `Почему файл, записанный без <code>encoding</code> на Windows, может открыться с «кракозябрами» в Linux?`, a: `Без явной кодировки Python использует системную: на Windows это может быть cp1251, а в Linux файл читают как UTF-8. Байты интерпретируются по-разному.` },
    { q: `Прочитай CSV с колонками name и score и выведи средний балл.`, a: `<pre class="code" data-lang="py">import csv
with open("scores.csv", newline="", encoding="utf-8") as f:
    scores = [int(r["score"]) for r in csv.DictReader(f)]
print(sum(scores) / len(scores) if scores else 0)</pre>` },
    { q: `Почему <code>with open(...)</code> лучше, чем <code>f = open(...)</code> и <code>f.close()</code>?`, a: `<code>with</code> гарантированно закрывает файл при выходе из блока, в том числе при исключении. Ручной <code>close</code> легко забыть или не выполнить при ошибке.` }
  ],
  q: [
    { q: `<code>"a b  c".split()</code>:`, o: [`<code>['a', 'b', '', 'c']</code>`, `<code>['a', 'b', 'c']</code>`, `<code>'abc'</code>`, `ошибка`], a: 1, e: `Без аргумента — по любым пробелам.` },
    { q: `Склеить список строк через запятую:`, o: [`<code>list.join(",")</code>`, `<code>",".join(list)</code>`, `<code>concat(list)</code>`, `<code>list + ","</code>`], a: 1, e: `Метод разделителя.` },
    { q: `Режим дозаписи в файл:`, o: [`<code>"w"</code>`, `<code>"a"</code>`, `<code>"r"</code>`, `<code>"x"</code>`], a: 1, e: `Append.` },
    { q: `Файл в блоке <code>with</code> закрывается:`, o: [`вручную`, `автоматически при выходе из блока`, `при завершении программы`, `никогда`], a: 1, e: `Даже при ошибке.` },
    { q: `Преобразовать строку в байты UTF-8:`, o: [`<code>s.decode()</code>`, `<code>s.encode("utf-8")</code>`, `<code>bytes(s)</code> без кодировки`, `<code>s.utf8()</code>`], a: 1, e: `encode.` }
  ],
  s: [
    `Строки: <code>split</code>, <code>join</code>, <code>strip</code>, <code>replace</code>, <code>find</code>, <code>startswith</code>, <code>lower</code>.`,
    `Большой текст собирай через <code>"".join(parts)</code>.`,
    `<code>with open(path, mode, encoding="utf-8") as f</code>; перебор строк — построчное чтение.`,
    `Режимы <code>r</code>, <code>w</code>, <code>a</code>, <code>x</code>, <code>b</code>.`,
    `<code>encode</code>/<code>decode</code>; всегда указывай кодировку.`,
    `CSV — модуль <code>csv</code>, не <code>split(",")</code>.`
  ]
});
