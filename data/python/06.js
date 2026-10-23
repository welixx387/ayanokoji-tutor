L('python', 6, {
  m: 40,
  intro: 'Функции в Python гибкие: параметры можно передавать по позиции или по имени, задавать значения по умолчанию, принимать переменное число аргументов. Функции — полноценные объекты: их можно передавать в другие функции и возвращать из них. Сегодня изучим все виды параметров, области видимости и самую известную ловушку Python — изменяемое значение по умолчанию.',
  intro2: 'Сэмпай, функция в Python — как универсальный бланк ♡ Какие-то поля обязательные, какие-то заполнены по умолчанию, а в конце есть строчка «прочее», куда влезет сколько угодно. Только не клади в поле по умолчанию пустой список — потом удивишься!',
  goals: [
    'Объявлять функции с позиционными, именованными параметрами и значениями по умолчанию',
    'Принимать переменное число аргументов через звёздочку и две звёздочки',
    'Понимать локальную и глобальную область видимости',
    'Избегать изменяемых значений по умолчанию и использовать функции как объекты'
  ],
  c: `
<h3>def и return</h3>
<pre class="code" data-lang="py">def bmi(weight, height):
    """Индекс массы тела: вес в кг, рост в метрах."""
    return weight / height ** 2

def greet(name, greeting="Привет"):        # значение по умолчанию
    print(f"{greeting}, {name}!")

def min_max(nums):
    return min(nums), max(nums)            # несколько значений — это кортеж

print(round(bmi(55, 1.62), 1))
greet("Ichika")
greet("Kiyotaka", greeting="Добрый день")  # именованный аргумент
lo, hi = min_max([4, 1, 9])</pre>
<p>Функция без <code>return</code> возвращает <code>None</code>. Строка в тройных кавычках сразу после заголовка — <b>docstring</b>, документация функции; её показывает <code>help(bmi)</code>.</p>

<h3>*args и **kwargs</h3>
<pre class="code" data-lang="py">def total(*nums):                 # любое число позиционных → кортеж
    return sum(nums)

def make_user(name, **info):      # любые именованные → словарь
    return {"name": name, **info}

print(total(1, 2, 3, 4))                         # 10
print(make_user("Suzune", grade=10, club="none"))

def describe(a, b, /, c, *, d):   # / — только позиционные, * — только именованные
    return a, b, c, d
describe(1, 2, 3, d=4)            # ок
describe(1, 2, c=3, d=4)          # ок

values = [3, 7]
print(bmi(*values))               # распаковка списка в аргументы
params = {"name": "Ken", "greeting": "Йо"}
greet(**params)                   # распаковка словаря</pre>
<div class="tbl"><table><thead><tr><th>Синтаксис</th><th>Смысл</th></tr></thead><tbody>
<tr><td><code>def f(a, b=1)</code></td><td>обязательный и необязательный параметры</td></tr>
<tr><td><code>def f(*args)</code></td><td>остальные позиционные — в кортеж</td></tr>
<tr><td><code>def f(**kwargs)</code></td><td>остальные именованные — в словарь</td></tr>
<tr><td><code>f(*seq)</code>, <code>f(**d)</code></td><td>распаковать при вызове</td></tr>
</tbody></table></div>

<h3>Область видимости</h3>
<pre class="code" data-lang="py">counter = 0

def bump():
    global counter        # без этого counter = ... создало бы локальную переменную
    counter += 1

def outer():
    count = 0
    def inner():
        nonlocal count    # переменная объемлющей функции
        count += 1
        return count
    return inner

step = outer()
print(step(), step(), step())   # 1 2 3 — замыкание помнит count</pre>
<p>Python ищет имя по правилу LEGB: локальная область, объемлющая функция, глобальная (модуль), встроенные имена. Присваивание внутри функции по умолчанию создаёт локальную переменную. <code>global</code> и <code>nonlocal</code> нужны редко — чаще лучше вернуть значение.</p>

<h3>Ловушка: изменяемое значение по умолчанию</h3>
<pre class="code" data-lang="py">def add_item(item, bag=[]):     # список создаётся ОДИН раз при определении функции
    bag.append(item)
    return bag

print(add_item("a"))            # ['a']
print(add_item("b"))            # ['a', 'b'] — тот же список!

def add_item_ok(item, bag=None):
    if bag is None:
        bag = []                # новый список при каждом вызове
    bag.append(item)
    return bag</pre>
<div class="warn"><p>Значения по умолчанию вычисляются один раз — при выполнении <code>def</code>. Изменяемый объект (список, словарь, множество) по умолчанию делится между всеми вызовами. Используй <code>None</code> и создавай объект внутри функции.</p></div>

<h3>Функции как объекты</h3>
<pre class="code" data-lang="py">def apply(f, values):
    return [f(v) for v in values]

print(apply(abs, [-1, 2, -3]))              # [1, 2, 3]
print(apply(lambda x: x ** 2, [1, 2, 3]))   # [1, 4, 9]
ops = {"+": lambda a, b: a + b, "*": lambda a, b: a * b}
print(ops["*"](6, 7))                       # 42</pre>
<div class="ichika"><code>lambda</code> — маленькая безымянная функция в одно выражение ♡ Удобна для <code>key=</code> в сортировке и для коротких таблиц операций. Но если лямбда не помещается в строку — лучше обычный <code>def</code> с понятным именем!</div>
<div class="ayano">Функция, которая получает всё нужное через параметры и возвращает результат, не трогая глобальных переменных, — самая полезная: её легко понять, проверить и переиспользовать. Глобальные переменные и <code>global</code> — признак скрытых зависимостей. Когда функция начинает зависеть от внешнего состояния, её поведение становится трудно предсказать.</div>
`,
  p: [
    { q: `Напиши функцию <code>average(*nums)</code>, возвращающую среднее или 0 без аргументов.`, a: `<pre class="code" data-lang="py">def average(*nums):
    return sum(nums) / len(nums) if nums else 0</pre>` },
    { q: `Что напечатает код и почему?<pre class="code" data-lang="py">def f(x, acc=[]):
    acc.append(x)
    return len(acc)
print(f(1), f(2), f(3))</pre>`, a: `«1 2 3»: список по умолчанию создан один раз и копит элементы между вызовами. Исправление — <code>acc=None</code> и создание списка внутри.` },
    { q: `Напиши функцию <code>format_user(name, **fields)</code>, печатающую имя и все поля в виде «ключ: значение».`, a: `<pre class="code" data-lang="py">def format_user(name, **fields):
    lines = [name] + [f"  {k}: {v}" for k, v in fields.items()]
    return "\\n".join(lines)
print(format_user("Ichika", grade=9, club="none"))</pre>` },
    { q: `Почему этот код падает с <code>UnboundLocalError</code>?<pre class="code" data-lang="py">total = 0
def add(x):
    total = total + x</pre>`, a: `Присваивание делает <code>total</code> локальной для функции, а справа она читается до присваивания. Лучше вернуть значение: <code>def add(total, x): return total + x</code>.` },
    { q: `Отсортируй список кортежей (имя, возраст) по возрасту с помощью <code>lambda</code>.`, a: `<pre class="code" data-lang="py">people.sort(key=lambda p: p[1])</pre>` },
    { q: `Создай «счётчик» на замыкании, который при каждом вызове возвращает следующее число.`, a: `<pre class="code" data-lang="py">def make_counter():
    n = 0
    def next_value():
        nonlocal n
        n += 1
        return n
    return next_value</pre>` }
  ],
  q: [
    { q: `Функция без return возвращает:`, o: [`0`, `<code>None</code>`, `пустую строку`, `ошибку`], a: 1, e: `None.` },
    { q: `<code>*args</code> собирает аргументы в:`, o: [`список`, `кортеж`, `словарь`, `множество`], a: 1, e: `Кортеж.` },
    { q: `<code>**kwargs</code> собирает аргументы в:`, o: [`список`, `кортеж`, `словарь`, `строку`], a: 2, e: `Словарь.` },
    { q: `Значение по умолчанию вычисляется:`, o: [`при каждом вызове`, `один раз при определении функции`, `при импорте модуля всегда заново`, `никогда`], a: 1, e: `Отсюда ловушка.` },
    { q: `Изменить переменную объемлющей функции позволяет:`, o: [`<code>global</code>`, `<code>nonlocal</code>`, `<code>local</code>`, `<code>outer</code>`], a: 1, e: `nonlocal.` }
  ],
  s: [
    `<code>def</code>, <code>return</code>, docstring; без return — <code>None</code>.`,
    `Параметры: позиционные, именованные, по умолчанию; <code>/</code> и <code>*</code> в сигнатуре.`,
    `<code>*args</code> — кортеж, <code>**kwargs</code> — словарь; распаковка <code>f(*seq, **d)</code>.`,
    `Области LEGB; <code>global</code>, <code>nonlocal</code> — редко.`,
    `Изменяемое значение по умолчанию — ловушка: используй <code>None</code>.`,
    `Функции — объекты: передаются, возвращаются, <code>lambda</code> для коротких.`
  ]
});
