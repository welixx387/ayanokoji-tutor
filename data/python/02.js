L('python', 2, {
  m: 40,
  intro: 'Сегодня подробно разберём базовые типы Python: целые числа произвольной длины, вещественные числа с их особенностями, логический тип и строки. Научимся выполнять арифметику, преобразовывать типы и форматировать вывод с помощью f-строк — самого удобного способа собрать строку из значений.',
  intro2: 'Сэмпай, в Python целые числа не переполняются ♡ Хочешь посчитать 2 в степени 1000 — пожалуйста, Python просто выдаст все 302 цифры! После C это ощущается как магия. А вот дробные числа такие же хитрые, как везде.',
  goals: [
    'Выполнять арифметику с int и float, знать операторы деления и степени',
    'Понимать особенности вещественных чисел и округления',
    'Работать со строками: индексы, срезы, конкатенация, неизменяемость',
    'Форматировать вывод с помощью f-строк'
  ],
  c: `
<h3>Числа</h3>
<div class="tbl"><table><thead><tr><th>Оператор</th><th>Пример</th><th>Результат</th></tr></thead><tbody>
<tr><td><code>+ - *</code></td><td><code>7 * 3</code></td><td>21</td></tr>
<tr><td><code>/</code> — деление</td><td><code>7 / 2</code></td><td>3.5 (всегда float)</td></tr>
<tr><td><code>//</code> — целочисленное</td><td><code>7 // 2</code>, <code>-7 // 2</code></td><td>3, −4 (округление вниз)</td></tr>
<tr><td><code>%</code> — остаток</td><td><code>7 % 3</code>, <code>-7 % 3</code></td><td>1, 2 (знак как у делителя)</td></tr>
<tr><td><code>**</code> — степень</td><td><code>2 ** 10</code></td><td>1024</td></tr>
</tbody></table></div>
<pre class="code" data-lang="py">big = 2 ** 200
print(big)                    # 1606938044258990275541962092341162602522202993782792835301376
print(len(str(big)))          # 61 цифра — int не переполняется

price = 19.99
count = 3
print(price * count)          # 59.97
print(0.1 + 0.2)              # 0.30000000000000004
print(round(0.1 + 0.2, 2))    # 0.3
print(abs(-5), max(3, 9, 1), min(3, 9, 1))</pre>
<div class="warn"><p><code>float</code> хранит числа приближённо, как <code>double</code> в C. Не сравнивай дробные числа через <code>==</code> — используй <code>math.isclose(a, b)</code>. Для денег — целые копейки или модуль <code>decimal</code>.</p></div>

<h3>Преобразования и bool</h3>
<pre class="code" data-lang="py">int("42")        # 42
int("ff", 16)    # 255
float("3.5")     # 3.5
str(100)         # '100'
int(3.99)        # 3 — отбрасывание дробной части
int("3.5")       # ValueError: неверная строка для int

bool(0), bool(""), bool([]), bool(None)   # все False — «пустые» значения
bool(5), bool("a"), bool([0])             # True</pre>
<p>Логические операторы — словами: <code>and</code>, <code>or</code>, <code>not</code>. Сравнения можно объединять в цепочку: <code>0 &lt;= x &lt; 10</code>.</p>

<h3>Строки</h3>
<pre class="code" data-lang="py">s = "Ayanokoji"
print(s[0], s[-1])      # A i — отрицательный индекс считает с конца
print(s[0:4])           # Ayan — срез [начало:конец)
print(s[::-1])          # ijokonayA — разворот
print(len(s))           # 9
print("koji" in s)      # True

greeting = "Привет, " + s + "!"
line = "-" * 20
quote = 'одинарные или "двойные" кавычки'
multi = """многострочная
строка"""
# s[0] = "a"            # TypeError: строки неизменяемы
s2 = "a" + s[1:]        # создаём новую строку</pre>
<p>Строки в Python — неизменяемые последовательности символов Unicode: <code>len("Привет")</code> равно 6, а не 12, как в C или Rust. Любая «модификация» создаёт новую строку.</p>

<h3>f-строки</h3>
<pre class="code" data-lang="py">name, score, total = "Kiyotaka", 87, 100
pct = score / total
print(f"{name} набрал {score} из {total}")
print(f"Доля: {pct:.1%}")            # 87.0%
print(f"{name:>12}|{score:<5}|")     # выравнивание по ширине
print(f"{3.14159:.2f}")              # 3.14
print(f"{1234567:,}")                # 1,234,567
print(f"{score=}")                   # score=87 — удобно для отладки</pre>
<div class="ichika">После двоеточия в фигурных скобках — спецификация формата ♡ <code>.2f</code> — два знака после запятой, <code>&gt;12</code> — выровнять вправо по ширине 12, <code>.1%</code> — проценты. Почти как <code>printf</code> в C, только читать приятнее!</div>
<div class="ayano">Знай поведение операций на границах: <code>//</code> и <code>%</code> с отрицательными числами в Python работают иначе, чем в C, а <code>/</code> всегда даёт дробное. Когда переносишь алгоритм с другого языка, именно такие мелочи дают неверные ответы, которые не вызывают ошибок.</div>
`,
  p: [
    { q: `Переведи 125 минут в часы и минуты с помощью <code>//</code> и <code>%</code>.`, a: `<pre class="code" data-lang="py">m = 125
print(f"{m // 60} ч {m % 60} мин")   # 2 ч 5 мин</pre>` },
    { q: `Почему <code>0.1 + 0.2 == 0.3</code> ложно и как сравнивать правильно?`, a: `Дробные числа хранятся приближённо. Сравнивай с допуском: <code>math.isclose(0.1 + 0.2, 0.3)</code>.` },
    { q: `Выведи первую и последнюю букву строки и строку без них.`, a: `<pre class="code" data-lang="py">s = "Suzune"
print(s[0], s[-1], s[1:-1])   # S e uzun</pre>` },
    { q: `Проверь, является ли введённое слово палиндромом.`, a: `<pre class="code" data-lang="py">w = input().strip().lower()
print(w == w[::-1])</pre>` },
    { q: `Выведи таблицу «имя — балл — процент» с выравниванием.`, a: `<pre class="code" data-lang="py">for name, score in [("Kiyotaka", 87), ("Ichika", 95)]:
    print(f"{name:<10}{score:>5}{score / 100:>8.0%}")</pre>` },
    { q: `Сколько цифр в числе 3 в степени 500?`, a: `<pre class="code" data-lang="py">print(len(str(3 ** 500)))   # 239</pre>` }
  ],
  q: [
    { q: `<code>7 / 2</code> в Python 3:`, o: [`3`, `3.5`, `4`, `ошибка`], a: 1, e: `Всегда float.` },
    { q: `<code>2 ** 3</code>:`, o: [`6`, `8`, `9`, `1`], a: 1, e: `Степень.` },
    { q: `<code>"abc"[-1]</code>:`, o: [`<code>'a'</code>`, `<code>'c'</code>`, `ошибка`, `<code>''</code>`], a: 1, e: `С конца.` },
    { q: `Строки в Python:`, o: [`изменяемые`, `неизменяемые`, `массивы байт`, `списки`], a: 1, e: `Создаётся новая.` },
    { q: `<code>bool("")</code>:`, o: [`True`, `False`, `ошибка`, `None`], a: 1, e: `Пустая строка ложна.` }
  ],
  s: [
    `<code>/</code> — float, <code>//</code> — вниз, <code>%</code> — остаток, <code>**</code> — степень; int без переполнения.`,
    `float приближён: <code>math.isclose</code>, <code>round</code>, <code>decimal</code> для денег.`,
    `Преобразования: <code>int()</code>, <code>float()</code>, <code>str()</code>, <code>bool()</code>.`,
    `Строки: индексы с конца, срезы <code>[a:b:шаг]</code>, <code>in</code>, неизменяемость.`,
    `f-строки: <code>{x:.2f}</code>, <code>{x:&gt;10}</code>, <code>{x:.1%}</code>, <code>{x=}</code>.`,
    `Знай отличия операций от других языков.`
  ]
});
