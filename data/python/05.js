L('python', 5, {
  m: 40,
  intro: 'Словарь хранит пары «ключ — значение» и находит значение по ключу почти мгновенно, сколько бы элементов в нём ни было. Множество хранит уникальные элементы и быстро отвечает на вопрос «есть ли такой». Обе структуры построены на хеш-таблицах — той же идее, что хеш-таблицы в C++ и HashMap в Rust. Сегодня научимся пользоваться ими и узнаем, какие объекты могут быть ключами.',
  intro2: 'Сэмпай, словарь — это школьный журнал ♡ По фамилии сразу находишь оценки, не листая весь журнал. А множество — список присутствующих: каждый отмечен один раз, и легко проверить, пришёл ли кто-то!',
  goals: [
    'Создавать словари, читать, добавлять и удалять пары',
    'Перебирать словари и использовать get, setdefault и Counter',
    'Работать с множествами и операциями над ними',
    'Понимать, какие объекты могут быть ключами и элементами множеств'
  ],
  c: `
<h3>Словари</h3>
<pre class="code" data-lang="py">points = {"Kiyotaka": 80, "Ichika": 95}
points["Suzune"] = 90            # добавить
points["Kiyotaka"] += 5          # изменить
print(points["Ichika"])          # 95
# points["Kakeru"]               # KeyError — ключа нет
print(points.get("Kakeru"))      # None
print(points.get("Kakeru", 0))   # 0 — значение по умолчанию
print("Suzune" in points)        # True — проверка ключа
del points["Suzune"]             # удалить
score = points.pop("Ichika")     # удалить и вернуть
print(len(points), points)</pre>
<p>Поиск, вставка и удаление по ключу выполняются в среднем за O(1). С Python 3.7 словарь сохраняет порядок вставки ключей.</p>

<h3>Перебор</h3>
<pre class="code" data-lang="py">grades = {"Kiyotaka": [5, 4, 5], "Ichika": [5, 5, 5], "Haruka": [3, 4]}
for name in grades:                         # по ключам
    print(name)
for name, marks in grades.items():          # пары
    print(f"{name}: {sum(marks) / len(marks):.2f}")
best = max(grades, key=lambda n: sum(grades[n]) / len(grades[n]))
print("лучший:", best)

avg = {name: sum(m) / len(m) for name, m in grades.items()}   # генератор словаря
top = {n: a for n, a in avg.items() if a >= 4.5}</pre>

<h3>Подсчёт и группировка</h3>
<pre class="code" data-lang="py">text = "the cat and the dog and the bird"
freq = {}
for w in text.split():
    freq[w] = freq.get(w, 0) + 1
print(freq)                                  # {'the': 3, 'cat': 1, 'and': 2, ...}

from collections import Counter, defaultdict
c = Counter(text.split())
print(c.most_common(2))                      # [('the', 3), ('and', 2)]

by_len = defaultdict(list)                   # словарь со значением по умолчанию
for w in text.split():
    by_len[len(w)].append(w)
print(dict(by_len))                          # {3: ['the', 'cat', ...], 4: ['bird']}</pre>
<div class="ichika"><code>Counter</code> и <code>defaultdict</code> — мои любимцы ♡ Подсчёт частот одной строкой, группировка без проверок «а есть ли уже такой ключ». Они живут в модуле <code>collections</code>, о нём ещё поговорим в уроке 13!</div>

<h3>Множества</h3>
<pre class="code" data-lang="py">a = {"python", "c", "rust"}
b = {"rust", "cpp", "python"}
print(a | b)            # объединение
print(a & b)            # пересечение: {'python', 'rust'}
print(a - b)            # разность: {'c'}
print(a ^ b)            # симметрическая разность: {'c', 'cpp'}
a.add("asm")
a.discard("java")       # удалить, если есть (без ошибки)
print("c" in a)         # быстрая проверка

unique = set([3, 1, 3, 2, 1])      # {1, 2, 3}
empty = set()                      # {} — это пустой словарь, а не множество!</pre>
<p>Проверка <code>x in множество</code> выполняется за O(1), а <code>x in список</code> — за O(n). Если программа много раз проверяет принадлежность, преврати список в множество.</p>

<h3>Что может быть ключом</h3>
<div class="tbl"><table><thead><tr><th>Можно (хешируемые)</th><th>Нельзя</th></tr></thead><tbody>
<tr><td><code>int</code>, <code>float</code>, <code>str</code>, <code>bool</code>, <code>None</code></td><td><code>list</code></td></tr>
<tr><td><code>tuple</code> из хешируемых</td><td><code>dict</code></td></tr>
<tr><td><code>frozenset</code></td><td><code>set</code></td></tr>
</tbody></table></div>
<div class="warn"><p>Ключ словаря и элемент множества должны быть неизменяемыми: от значения ключа вычисляется хеш, и если бы ключ изменился, словарь не нашёл бы его. Для составного ключа используй кортеж: <code>distances[("Москва", "Казань")] = 820</code>.</p></div>
<div class="ayano">Выбор структуры данных в Python так же важен, как в C++. Списком удобно хранить последовательность, словарём — соответствие, множеством — набор уникальных значений. Типичная ошибка новичка — искать в списке в цикле там, где нужен словарь. На тысяче элементов разница незаметна, на миллионе — это секунды против часов.</div>
`,
  p: [
    { q: `Посчитай, сколько раз встречается каждая буква в слове, без <code>Counter</code>.`, a: `<pre class="code" data-lang="py">counts = {}
for ch in "abracadabra":
    counts[ch] = counts.get(ch, 0) + 1
print(counts)   # {'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1}</pre>` },
    { q: `Найди слова, которые есть в обоих текстах.`, a: `<pre class="code" data-lang="py">common = set(t1.lower().split()) & set(t2.lower().split())</pre>` },
    { q: `Инвертируй словарь <code>{"a": 1, "b": 2}</code> → <code>{1: "a", 2: "b"}</code>.`, a: `<pre class="code" data-lang="py">inv = {v: k for k, v in d.items()}</pre> Если значения повторяются, останется последний ключ.` },
    { q: `Почему <code>d[[1, 2]] = "x"</code> вызывает ошибку?`, a: `Список изменяем и не хешируем, поэтому не может быть ключом: <code>TypeError: unhashable type: 'list'</code>. Используй кортеж <code>(1, 2)</code>.` },
    { q: `Сгруппируй учеников по классам: из списка пар (имя, класс) получи словарь «класс → список имён».`, a: `<pre class="code" data-lang="py">from collections import defaultdict
by_class = defaultdict(list)
for name, cls in students:
    by_class[cls].append(name)</pre>` },
    { q: `Удали дубликаты из списка, сохранив порядок первых появлений.`, a: `<pre class="code" data-lang="py">unique = list(dict.fromkeys(items))</pre> Словарь хранит порядок вставки и уникальные ключи.` }
  ],
  q: [
    { q: `Безопасно получить значение без KeyError:`, o: [`<code>d[k]</code>`, `<code>d.get(k)</code>`, `<code>d.find(k)</code>`, `<code>d.key(k)</code>`], a: 1, e: `Или get(k, default).` },
    { q: `<code>{}</code> создаёт:`, o: [`пустое множество`, `пустой словарь`, `пустой список`, `ошибку`], a: 1, e: `Множество — set().` },
    { q: `Пересечение множеств:`, o: [`<code>a | b</code>`, `<code>a &amp; b</code>`, `<code>a - b</code>`, `<code>a + b</code>`], a: 1, e: `&.` },
    { q: `Ключом словаря может быть:`, o: [`список`, `кортеж`, `словарь`, `множество`], a: 1, e: `Неизменяемый и хешируемый.` },
    { q: `Проверка <code>x in set</code> в среднем:`, o: [`O(n)`, `O(1)`, `O(log n)`, `O(n²)`], a: 1, e: `Хеш-таблица.` }
  ],
  s: [
    `Словарь: <code>d[k]</code>, <code>get</code>, <code>in</code>, <code>del</code>, <code>pop</code>; O(1) в среднем; порядок вставки.`,
    `Перебор <code>items()</code>; генератор словаря <code>{k: v for ...}</code>.`,
    `<code>Counter</code> — подсчёт, <code>defaultdict</code> — группировка.`,
    `Множество: уникальные элементы, <code>| &amp; - ^</code>, быстрое <code>in</code>; пустое — <code>set()</code>.`,
    `Ключи — только неизменяемые (хешируемые) объекты; составной ключ — кортеж.`,
    `Выбирай структуру по операциям: список, словарь, множество.`
  ]
});
