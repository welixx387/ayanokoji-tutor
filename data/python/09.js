L('python', 9, {
  m: 40,
  intro: 'Ошибки во время выполнения в Python оформлены как исключения: деление на ноль, отсутствующий файл, неверное число в строке. Исключение можно перехватить и обработать, а можно дать ему подняться выше. Сегодня изучим try, except, else и finally, иерархию встроенных исключений, научимся бросать свои исключения и разберём принцип «проще попросить прощения, чем разрешения».',
  intro2: 'Сэмпай, исключение в Python — как сработавшая сигнализация ♡ Можно её выключить и разобраться на месте (except), а можно передать охране этажом выше. Главное — никогда не выдёргивать провод и делать вид, что ничего не было!',
  goals: [
    'Перехватывать исключения конкретных типов через try и except',
    'Использовать else и finally по назначению',
    'Создавать и бросать собственные исключения',
    'Понимать стиль EAFP и не подавлять ошибки молча'
  ],
  c: `
<h3>try и except</h3>
<pre class="code" data-lang="py">def read_age():
    while True:
        text = input("Возраст: ")
        try:
            age = int(text)
        except ValueError:
            print(f"«{text}» — не целое число, попробуй ещё раз")
            continue
        if 0 <= age <= 150:
            return age
        print("возраст вне диапазона")

try:
    with open("config.txt", encoding="utf-8") as f:
        config = f.read()
except FileNotFoundError:
    config = ""                         # нет файла — работаем с настройками по умолчанию
except PermissionError as e:
    print(f"нет доступа: {e}")
    raise                               # пробросить дальше
</pre>
<p>Перехватывай <b>конкретные</b> исключения, которые умеешь обработать. Переменная после <code>as</code> содержит объект исключения с описанием. Голый <code>raise</code> внутри <code>except</code> пробрасывает то же исключение выше.</p>

<h3>Иерархия встроенных исключений</h3>
<div class="tbl"><table><thead><tr><th>Исключение</th><th>Когда</th></tr></thead><tbody>
<tr><td><code>ValueError</code></td><td>неверное значение: <code>int("abc")</code></td></tr>
<tr><td><code>TypeError</code></td><td>неверный тип: <code>"a" + 1</code></td></tr>
<tr><td><code>KeyError</code>, <code>IndexError</code></td><td>нет ключа в словаре, индекс вне списка</td></tr>
<tr><td><code>ZeroDivisionError</code></td><td>деление на ноль</td></tr>
<tr><td><code>FileNotFoundError</code>, <code>PermissionError</code></td><td>подклассы <code>OSError</code>: ошибки файлов и системы</td></tr>
<tr><td><code>AttributeError</code></td><td>нет атрибута у объекта</td></tr>
</tbody></table></div>
<p>Все они наследуют <code>Exception</code>. <code>except OSError</code> поймает и <code>FileNotFoundError</code>, и <code>PermissionError</code>. Порядок веток важен: сначала конкретные, потом общие.</p>

<h3>else и finally</h3>
<pre class="code" data-lang="py">def safe_divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("деление на ноль")
        return None
    else:                     # выполняется, если исключения не было
        print("успешно")
        return result
    finally:                  # выполняется всегда — даже после return
        print("операция завершена")</pre>
<p><code>else</code> отделяет код, который должен выполниться только при успехе, от кода, который может бросить исключение. <code>finally</code> — для обязательной уборки; но для файлов, соединений и замков удобнее <code>with</code>.</p>

<h3>Свои исключения</h3>
<pre class="code" data-lang="py">class BankError(Exception):
    """Базовая ошибка банковских операций."""

class InsufficientFunds(BankError):
    def __init__(self, balance, amount):
        super().__init__(f"на счёте {balance}, а нужно {amount}")
        self.balance = balance
        self.amount = amount

def withdraw(balance, amount):
    if amount <= 0:
        raise ValueError("сумма должна быть положительной")
    if amount > balance:
        raise InsufficientFunds(balance, amount)
    return balance - amount

try:
    withdraw(100, 500)
except InsufficientFunds as e:
    print("отказ:", e, "| не хватает", e.amount - e.balance)</pre>
<div class="ichika">Своя базовая ошибка вроде <code>BankError</code> — удобная вещь ♡ Вызывающий может поймать все ошибки банка одной строкой <code>except BankError</code>, а может разобрать конкретную. Как общий звонок «у банка проблемы» и отдельные сигналы!</div>

<h3>EAFP и антипаттерны</h3>
<pre class="code" data-lang="py"># LBYL: «посмотри, прежде чем прыгнуть»
if key in data:
    value = data[key]
else:
    value = default

# EAFP: «проще попросить прощения» — типичный стиль Python
try:
    value = data[key]
except KeyError:
    value = default</pre>
<div class="warn"><p>Никогда не пиши <code>except:</code> без типа или <code>except Exception: pass</code>. Такой код глотает все ошибки, включая опечатки в именах и нажатие Ctrl+C, и программа молча продолжает работать с неверными данными. Если действительно нужно поймать всё (например, на верхнем уровне сервера), хотя бы запиши ошибку в журнал.</p></div>
<div class="ayano">Исключение — сообщение о том, что функция не смогла выполнить своё обещание. Обрабатывай его там, где знаешь, что делать дальше: повторить ввод, взять значение по умолчанию, показать сообщение. Если не знаешь — не лови, пусть поднимается выше. Трассировка упавшей программы честнее, чем тихо испорченные данные.</div>
`,
  p: [
    { q: `Напиши функцию <code>to_int(s, default=0)</code>, возвращающую число или значение по умолчанию.`, a: `<pre class="code" data-lang="py">def to_int(s, default=0):
    try:
        return int(s)
    except (ValueError, TypeError):
        return default</pre>` },
    { q: `В каком порядке выполнятся блоки при <code>safe_divide(6, 3)</code>?`, a: `<code>try</code> (успешно) → <code>else</code> печатает «успешно» и готовит return → <code>finally</code> печатает «операция завершена» → функция возвращает 2.0.` },
    { q: `Почему <code>except Exception: pass</code> опасен?`, a: `Он молча скрывает любые ошибки, включая баги в собственном коде. Программа продолжит работу с неверным состоянием, а причину будет очень трудно найти.` },
    { q: `Создай исключение <code>ValidationError</code> и брось его, если имя пользователя короче 3 символов.`, a: `<pre class="code" data-lang="py">class ValidationError(Exception):
    pass

def check_name(name):
    if len(name.strip()) < 3:
        raise ValidationError(f"имя слишком короткое: {name!r}")
    return name.strip()</pre>` },
    { q: `Прочитай числа из файла построчно, пропуская строки, которые не являются числами, и сообщая их номер.`, a: `<pre class="code" data-lang="py">nums = []
with open("nums.txt", encoding="utf-8") as f:
    for i, line in enumerate(f, start=1):
        try:
            nums.append(float(line))
        except ValueError:
            print(f"строка {i}: не число: {line.strip()!r}")</pre>` },
    { q: `Как сохранить исходную причину, бросая своё исключение?`, a: `<pre class="code" data-lang="py">try:
    port = int(raw)
except ValueError as e:
    raise ConfigError(f"неверный порт: {raw}") from e</pre> <code>from e</code> сохраняет цепочку исключений в трассировке.` }
  ],
  q: [
    { q: `<code>int("abc")</code> бросает:`, o: [`<code>TypeError</code>`, `<code>ValueError</code>`, `<code>KeyError</code>`, `<code>SyntaxError</code>`], a: 1, e: `Неверное значение.` },
    { q: `Блок <code>finally</code> выполняется:`, o: [`только при ошибке`, `всегда`, `только без ошибки`, `при break`], a: 1, e: `Уборка.` },
    { q: `Блок <code>else</code> после <code>try</code> выполняется:`, o: [`при исключении`, `если исключения не было`, `всегда`, `никогда`], a: 1, e: `Успешный путь.` },
    { q: `Бросить исключение:`, o: [`<code>throw</code>`, `<code>raise</code>`, `<code>error</code>`, `<code>except</code>`], a: 1, e: `raise.` },
    { q: `Свои исключения наследуют от:`, o: [`<code>object</code>`, `<code>Exception</code>`, `<code>Error</code>`, `<code>BaseError</code>`], a: 1, e: `Exception.` }
  ],
  s: [
    `<code>try</code>/<code>except Тип as e</code> — перехватывай конкретные исключения.`,
    `Иерархия: <code>Exception</code> → <code>ValueError</code>, <code>TypeError</code>, <code>KeyError</code>, <code>OSError</code>…`,
    `<code>else</code> — при успехе, <code>finally</code> — всегда.`,
    `Свои исключения: класс от <code>Exception</code>; <code>raise ... from e</code>.`,
    `EAFP — типичный стиль Python.`,
    `Никогда не глотай ошибки молча.`
  ]
});
