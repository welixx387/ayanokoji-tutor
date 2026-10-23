L('python', 12, {
  m: 45,
  intro: 'Цикл for в Python работает с любым итерируемым объектом благодаря протоколу итераторов. Генераторы позволяют создавать последовательности «на лету», не храня их в памяти целиком, — так можно обработать файл в десятки гигабайт или бесконечный поток данных. Декораторы позволяют добавлять функциям поведение — замер времени, кэширование, проверку прав — не меняя их код. Это три инструмента, которые отличают уверенного Python-разработчика.',
  intro2: 'Сэмпай, генератор — это кран, а не бочка с водой ♡ Список хранит все значения сразу, а генератор выдаёт их по одному, когда попросишь. Поэтому можно «налить» хоть бесконечность — памяти не хватит только у бочки!',
  goals: [
    'Понимать протокол итераторов: iter, next и StopIteration',
    'Писать функции-генераторы с yield и генераторные выражения',
    'Строить ленивые конвейеры обработки данных',
    'Писать и применять декораторы, использовать <code>functools.wraps</code> и <code>lru_cache</code>'
  ],
  c: `
<h3>Протокол итераторов</h3>
<pre class="code" data-lang="py">nums = [10, 20, 30]
it = iter(nums)          # получить итератор
print(next(it))          # 10
print(next(it))          # 20
print(next(it))          # 30
# next(it)               # StopIteration — элементы кончились</pre>
<p>Цикл <code>for</code> делает ровно это: вызывает <code>iter()</code>, затем <code>next()</code>, пока не получит <code>StopIteration</code>. Итерируемы списки, строки, словари, файлы, <code>range</code> и любые объекты с методом <code>__iter__</code>.</p>

<h3>Генераторы</h3>
<pre class="code" data-lang="py">def countdown(n):
    while n > 0:
        yield n           # отдать значение и «заснуть» до следующего next
        n -= 1

for x in countdown(3):
    print(x)              # 3 2 1

def fibonacci():
    a, b = 0, 1
    while True:           # бесконечная последовательность — это нормально
        yield a
        a, b = b, a + b

from itertools import islice
print(list(islice(fibonacci(), 10)))   # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

squares = (x * x for x in range(10 ** 9))   # генераторное выражение: память не тратится
print(next(squares), next(squares))        # 0 1
total = sum(x * x for x in range(1000))    # скобки вызова можно не дублировать</pre>
<p>Функция с <code>yield</code> при вызове не выполняется, а возвращает объект-генератор. Код идёт до очередного <code>yield</code>, отдаёт значение и замирает, сохраняя все локальные переменные. Генератор можно пройти только один раз.</p>

<h3>Ленивые конвейеры</h3>
<pre class="code" data-lang="py">def read_lines(path):
    with open(path, encoding="utf-8") as f:
        for line in f:
            yield line.rstrip("\\n")

def errors_only(lines):
    return (ln for ln in lines if "ERROR" in ln)

def parse(lines):
    for ln in lines:
        date, _, message = ln.partition(" ")
        yield date, message

# файл в 10 ГБ обрабатывается по строке, память почти не расходуется
for date, msg in parse(errors_only(read_lines("app.log"))):
    print(date, msg)</pre>
<div class="ichika">Генератор и список отличаются скобками ♡ <code>[x for x in data]</code> — сразу строит весь список, <code>(x for x in data)</code> — выдаёт по одному. Для <code>sum</code>, <code>max</code>, <code>any</code> лучше круглые: быстрее и без лишней памяти!</div>

<h3>Декораторы</h3>
<pre class="code" data-lang="py">import functools
import time

def timed(func):
    @functools.wraps(func)                 # сохранить имя и docstring функции
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        print(f"{func.__name__}: {time.perf_counter() - start:.4f} с")
        return result
    return wrapper

@timed                                     # то же, что slow_sum = timed(slow_sum)
def slow_sum(n):
    return sum(range(n))

slow_sum(10 ** 6)

@functools.lru_cache(maxsize=None)         # готовый декоратор: кэш результатов
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)

print(fib(200))                            # мгновенно благодаря кэшу</pre>
<p><b>Декоратор</b> — функция, которая принимает функцию и возвращает новую, обычно обёртку вокруг исходной. Запись <code>@timed</code> над определением — сокращение для <code>slow_sum = timed(slow_sum)</code>. Так устроены <code>@property</code>, <code>@dataclass</code>, <code>@lru_cache</code> и маршруты в веб-фреймворках.</p>
<div class="warn"><p>Без <code>functools.wraps</code> обёрнутая функция теряет своё имя и документацию: <code>slow_sum.__name__</code> станет <code>"wrapper"</code>. Это ломает отладку, документацию и некоторые библиотеки. Всегда используй <code>wraps</code> в своих декораторах.</p></div>
<div class="ayano">Ленивость — ключевая идея для работы с большими данными: не загружай всё, обрабатывай потоком. А декораторы — способ отделить «что функция делает» от сквозных задач: журналирования, замера времени, повторных попыток. Но не увлекайся: стопка из пяти декораторов над функцией превращает её поведение в загадку.</div>
`,
  p: [
    { q: `Напиши генератор <code>even_numbers(limit)</code>, выдающий чётные числа до limit.`, a: `<pre class="code" data-lang="py">def even_numbers(limit):
    for n in range(0, limit + 1, 2):
        yield n</pre>` },
    { q: `Почему второй цикл ничего не печатает?<pre class="code" data-lang="py">g = (x for x in range(3))
for x in g: print(x)
for x in g: print(x)</pre>`, a: `Генератор одноразовый: первый цикл исчерпал его, второй сразу получает <code>StopIteration</code>. Нужен новый генератор или список.` },
    { q: `Посчитай сумму длин всех строк большого файла без загрузки его в память.`, a: `<pre class="code" data-lang="py">with open("big.txt", encoding="utf-8") as f:
    total = sum(len(line) for line in f)</pre>` },
    { q: `Напиши декоратор <code>logged</code>, печатающий имя функции и аргументы при каждом вызове.`, a: `<pre class="code" data-lang="py">def logged(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"вызов {func.__name__}{args} {kwargs}")
        return func(*args, **kwargs)
    return wrapper</pre>` },
    { q: `Напиши декоратор <code>retry(times)</code>, повторяющий вызов при исключении.`, a: `<pre class="code" data-lang="py">def retry(times):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, times + 1):
                try:
                    return func(*args, **kwargs)
                except Exception:
                    if attempt == times:
                        raise
        return wrapper
    return decorator

@retry(3)
def flaky(): ...</pre>` },
    { q: `Чем <code>[x * 2 for x in data]</code> отличается от <code>(x * 2 for x in data)</code>?`, a: `Квадратные скобки сразу строят список всех значений в памяти; круглые создают ленивый генератор, выдающий значения по одному при переборе.` }
  ],
  q: [
    { q: `Функция с <code>yield</code> при вызове возвращает:`, o: [`первое значение`, `объект-генератор`, `список`, `None`], a: 1, e: `Ленивость.` },
    { q: `Когда итератор исчерпан, <code>next()</code> бросает:`, o: [`<code>IndexError</code>`, `<code>StopIteration</code>`, `<code>ValueError</code>`, `<code>EOFError</code>`], a: 1, e: `StopIteration.` },
    { q: `<code>@timed</code> над функцией f эквивалентно:`, o: [`<code>timed()</code>`, `<code>f = timed(f)</code>`, `<code>timed = f(timed)</code>`, `<code>f.timed()</code>`], a: 1, e: `Подмена функции.` },
    { q: `Сохранить имя и docstring обёрнутой функции:`, o: [`<code>functools.wraps</code>`, `<code>functools.partial</code>`, `<code>copy.copy</code>`, `<code>@property</code>`], a: 0, e: `wraps.` },
    { q: `Кэширование результатов функции:`, o: [`<code>@functools.lru_cache</code>`, `<code>@cache_me</code>`, `<code>@memory</code>`, `<code>@static</code>`], a: 0, e: `<code>lru_cache</code>.` }
  ],
  s: [
    `<code>for</code> работает через <code>iter()</code> и <code>next()</code> до <code>StopIteration</code>.`,
    `Генератор: функция с <code>yield</code> или <code>(expr for x in seq)</code>; одноразовый и ленивый.`,
    `Конвейеры генераторов обрабатывают большие данные потоком.`,
    `Декоратор — функция над функцией; <code>@d</code> = <code>f = d(f)</code>.`,
    `<code>functools.wraps</code> в каждом декораторе; <code>lru_cache</code> — готовый кэш.`,
    `Декораторы с параметрами — три уровня вложенности.`
  ]
});
