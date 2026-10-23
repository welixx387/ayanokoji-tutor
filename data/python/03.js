L('python', 3, {
  m: 40,
  intro: 'Ветвления и циклы в Python устроены просто и выразительно. if, elif и else выбирают действие, while повторяет, пока условие истинно, а for перебирает элементы любой последовательности — без ручного счётчика. Сегодня изучим все три конструкции, функцию range, break и continue и необычную, но полезную ветку else у циклов.',
  intro2: 'Сэмпай, for в Python — это не «от i = 0 до n», а «для каждого элемента» ♡ Хочешь пройти по буквам строки — просто for letter in word. Счётчик нужен гораздо реже, чем кажется!',
  goals: [
    'Писать ветвления if, elif, else и условные выражения',
    'Использовать цикл while и защищаться от бесконечных циклов',
    'Перебирать последовательности циклом for и диапазоны через range',
    'Управлять циклами через break, continue и else'
  ],
  c: `
<h3>if, elif, else</h3>
<pre class="code" data-lang="py">score = int(input("Баллы: "))
if score >= 90:
    grade = "A"
elif score >= 70:
    grade = "B"
elif score >= 50:
    grade = "C"
else:
    grade = "F"
print(grade)

status = "сдал" if score >= 50 else "не сдал"   # условное выражение
if 0 <= score <= 100 and score % 5 == 0:         # цепочка сравнений
    print("круглое число в диапазоне")</pre>
<p>С Python 3.10 есть и сопоставление с образцом <code>match</code>/<code>case</code> — удобно для разбора команд и структур данных.</p>

<h3>while</h3>
<pre class="code" data-lang="py">import random

secret = random.randint(1, 100)
tries = 0
while True:
    guess = int(input("Число: "))
    tries += 1
    if guess < secret:
        print("больше")
    elif guess > secret:
        print("меньше")
    else:
        print(f"угадал за {tries} попыток")
        break</pre>
<p>Цикл <code>while True</code> с <code>break</code> внутри — обычный приём, когда условие выхода удобнее проверить в середине. Операторов <code>++</code> и <code>--</code> в Python нет: пиши <code>tries += 1</code>.</p>

<h3>for и range</h3>
<pre class="code" data-lang="py">for ch in "Ichika":           # по символам
    print(ch, end=" ")

for i in range(5):            # 0 1 2 3 4
    print(i, end=" ")
for i in range(1, 11, 3):     # 1 4 7 10
    print(i, end=" ")
for i in range(10, 0, -2):    # 10 8 6 4 2
    print(i, end=" ")

names = ["Kiyotaka", "Ichika", "Suzune"]
for i, name in enumerate(names, start=1):    # номер и значение
    print(f"{i}. {name}")
for name, score in zip(names, [87, 95, 90]): # параллельный перебор
    print(name, score)</pre>
<div class="tbl"><table><thead><tr><th>Вызов</th><th>Значения</th></tr></thead><tbody>
<tr><td><code>range(n)</code></td><td>0…n−1</td></tr>
<tr><td><code>range(a, b)</code></td><td>a…b−1</td></tr>
<tr><td><code>range(a, b, step)</code></td><td>с шагом, может быть отрицательным</td></tr>
</tbody></table></div>
<div class="ichika">Если тянет написать <code>for i in range(len(names))</code> — остановись ♡ Почти всегда лучше <code>for name in names</code>, а если нужен номер — <code>enumerate</code>. Код короче, и ошибиться на единицу невозможно!</div>

<h3>break, continue и else у цикла</h3>
<pre class="code" data-lang="py">n = int(input("n = "))
for d in range(2, int(n ** 0.5) + 1):
    if n % d == 0:
        print(f"{n} делится на {d}")
        break
else:                              # выполняется, если не было break
    print(f"{n} — простое" if n >= 2 else f"{n} — не простое")

for x in [3, -1, 4, -5, 9]:
    if x < 0:
        continue                   # пропустить отрицательные
    print(x)</pre>
<p>Ветка <code>else</code> у цикла выполняется, когда цикл завершился естественно, без <code>break</code>. Это избавляет от флага «нашли или нет» в задачах поиска.</p>
<div class="warn"><p>Не изменяй список, который перебираешь циклом <code>for</code>: удаление элементов во время обхода приводит к пропуску соседних элементов. Перебирай копию <code>for x in items[:]</code> или собирай новый список.</p></div>
<div class="ayano">В Python цикл по коллекции почти всегда понятнее цикла по индексам: ты описываешь, что делаешь с каждым элементом, а не как добраться до него. А функции вроде <code>enumerate</code>, <code>zip</code>, <code>sum</code>, <code>any</code>, <code>all</code> часто заменяют цикл целиком. Читаемость — главное достоинство Python, не теряй его.</div>
`,
  p: [
    { q: `Выведи таблицу умножения на 7 от 1 до 10.`, a: `<pre class="code" data-lang="py">for i in range(1, 11):
    print(f"7 x {i} = {7 * i}")</pre>` },
    { q: `Посчитай сумму цифр числа циклом <code>while</code>.`, a: `<pre class="code" data-lang="py">n = int(input())
s = 0
while n > 0:
    s += n % 10
    n //= 10
print(s)</pre>` },
    { q: `Выведи все чётные числа от 20 до 2 по убыванию с помощью <code>range</code>.`, a: `<pre class="code" data-lang="py">for i in range(20, 0, -2):
    print(i)</pre>` },
    { q: `Найди первое слово длиннее 5 букв в списке или сообщи, что его нет, используя <code>for</code>/<code>else</code>.`, a: `<pre class="code" data-lang="py">for w in words:
    if len(w) > 5:
        print("нашли:", w)
        break
else:
    print("нет длинных слов")</pre>` },
    { q: `Перепиши без <code>range(len(...))</code>:<pre class="code" data-lang="py">for i in range(len(names)):
    print(i + 1, names[i])</pre>`, a: `<pre class="code" data-lang="py">for i, name in enumerate(names, start=1):
    print(i, name)</pre>` },
    { q: `Напиши FizzBuzz от 1 до 30.`, a: `<pre class="code" data-lang="py">for i in range(1, 31):
    if i % 15 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)</pre>` }
  ],
  q: [
    { q: `<code>range(2, 8, 2)</code> даёт:`, o: [`2, 4, 6, 8`, `2, 4, 6`, `2, 3, …, 8`, `4, 6, 8`], a: 1, e: `Без правой границы.` },
    { q: `Ветка else у цикла for выполняется:`, o: [`всегда`, `если не было break`, `если был break`, `никогда`], a: 1, e: `Естественное завершение.` },
    { q: `Номер и элемент при обходе даёт:`, o: [`<code>zip</code>`, `<code>enumerate</code>`, `<code>range</code>`, `<code>index</code>`], a: 1, e: `enumerate.` },
    { q: `Увеличить счётчик на 1 в Python:`, o: [`<code>i++</code>`, `<code>i += 1</code>`, `<code>++i</code>`, `<code>inc(i)</code>`], a: 1, e: `Нет ++.` },
    { q: `Ключевое слово для «иначе если»:`, o: [`<code>else if</code>`, `<code>elif</code>`, `<code>elsif</code>`, `<code>elseif</code>`], a: 1, e: `elif.` }
  ],
  s: [
    `<code>if</code>/<code>elif</code>/<code>else</code>; условное выражение <code>a if cond else b</code>; цепочки сравнений.`,
    `<code>while</code>; <code>while True</code> + <code>break</code>; нет <code>++</code>.`,
    `<code>for x in коллекция</code>; <code>range(a, b, step)</code> без правой границы.`,
    `<code>enumerate</code> — номер и элемент, <code>zip</code> — параллельный обход.`,
    `<code>break</code>, <code>continue</code>, <code>else</code> у цикла — «не было break».`,
    `Не изменяй коллекцию во время обхода.`
  ]
});
