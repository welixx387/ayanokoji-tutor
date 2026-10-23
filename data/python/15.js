L('python', 15, {
  m: 45,
  intro: 'В Python многие ошибки проявляются только во время выполнения, поэтому автоматические тесты здесь особенно важны. Стандарт индустрии — pytest. Не менее важен единый стиль: PEP 8 делает код любого Python-разработчика привычным для других, а форматтеры и линтеры поддерживают его автоматически. Аннотации типов вместе с mypy ловят целый класс ошибок ещё до запуска программы.',
  intro2: 'Сэмпай, тест — это записка самому себе из будущего ♡ «Эта функция должна делать вот так». Через полгода ты изменишь код, запустишь pytest — и тесты сразу скажут, не сломалось ли что-нибудь. Спокойный сон программиста!',
  goals: [
    'Писать тесты на pytest: функции, assert, проверку исключений',
    'Использовать фикстуры и параметризацию тестов',
    'Следовать PEP 8 и применять форматтер и линтер',
    'Добавлять аннотации типов и проверять их через mypy'
  ],
  c: `
<h3>pytest</h3>
<pre class="code" data-lang="py"># grades.py
def average(marks: list[int]) -> float:
    if not marks:
        raise ValueError("список оценок пуст")
    return sum(marks) / len(marks)

def letter(avg: float) -> str:
    if avg >= 4.5:
        return "отлично"
    if avg >= 3.5:
        return "хорошо"
    return "удовлетворительно"</pre>
<pre class="code" data-lang="py"># test_grades.py
import pytest
from grades import average, letter

def test_average_simple():
    assert average([5, 4, 3]) == 4

def test_average_float():
    assert average([5, 4]) == pytest.approx(4.5)

def test_average_empty_raises():
    with pytest.raises(ValueError, match="пуст"):
        average([])

@pytest.mark.parametrize("avg, expected", [
    (5.0, "отлично"),
    (4.5, "отлично"),          # граница
    (4.49, "хорошо"),
    (3.5, "хорошо"),
    (2.0, "удовлетворительно"),
])
def test_letter(avg, expected):
    assert letter(avg) == expected</pre>
<pre class="code" data-lang="sh">(.venv) $ pip install pytest
(.venv) $ pytest -q
.........                                  [100%]
9 passed in 0.03s
(.venv) $ pytest -k letter -v               # только тесты с «letter» в имени</pre>
<p>pytest находит файлы <code>test_*.py</code> и функции, начинающиеся с <code>test</code>. Проверки — обычный <code>assert</code>: при падении pytest покажет, какие значения сравнивались. Параметризация превращает одну функцию в набор тестов для разных входов, а границы диапазонов — самое важное, что стоит проверить.</p>

<h3>Фикстуры</h3>
<pre class="code" data-lang="py">import json
import pytest

@pytest.fixture
def config_file(tmp_path):                 # tmp_path — встроенная фикстура: временный каталог
    path = tmp_path / "config.json"
    path.write_text(json.dumps({"port": 8080}), encoding="utf-8")
    return path

def load_port(path):
    return json.loads(path.read_text(encoding="utf-8"))["port"]

def test_load_port(config_file):           # pytest передаст результат фикстуры по имени
    assert load_port(config_file) == 8080</pre>
<p><b>Фикстура</b> готовит окружение для теста: временные файлы, тестовые данные, объекты. Тест получает её, просто назвав параметр её именем. Встроенные фикстуры <code>tmp_path</code>, <code>monkeypatch</code> и <code>capsys</code> избавляют от работы с настоящими файлами, переменными окружения и выводом.</p>
<div class="ichika">Хороший тест проверяет одну вещь и называется так, что по имени понятно, что сломалось ♡ <code>test_average_empty_raises</code> сразу говорит: «пустой список должен вызывать ошибку». Если такой тест упал — ты уже знаешь, где искать!</div>

<h3>PEP 8 и инструменты</h3>
<div class="tbl"><table><thead><tr><th>Что</th><th>Правило PEP 8</th></tr></thead><tbody>
<tr><td>Переменные, функции, модули</td><td><code>snake_case</code></td></tr>
<tr><td>Классы</td><td><code>CamelCase</code></td></tr>
<tr><td>Константы</td><td><code>UPPER_CASE</code></td></tr>
<tr><td>Отступ</td><td>4 пробела</td></tr>
<tr><td>Длина строки</td><td>до 79–99 символов (по договорённости в проекте)</td></tr>
<tr><td>Импорты</td><td>в начале файла: стандартные, сторонние, свои — группами</td></tr>
</tbody></table></div>
<pre class="code" data-lang="sh">(.venv) $ pip install ruff mypy
(.venv) $ ruff format .            # автоформатирование
(.venv) $ ruff check .             # линтер: неиспользуемые импорты, ошибки стиля, подозрительный код
(.venv) $ mypy grades.py           # проверка типов</pre>

<h3>Аннотации типов</h3>
<pre class="code" data-lang="py">from dataclasses import dataclass

@dataclass
class Student:
    name: str
    marks: list[int]

def best(students: list[Student]) -> Student | None:
    if not students:
        return None
    return max(students, key=lambda s: sum(s.marks) / len(s.marks))

def greet(s: Student | None) -> str:
    if s is None:
        return "никого нет"
    return f"Лучший — {s.name}"

result: Student | None = best([])
print(greet(result))
# print(result.name)   # mypy: Item "None" of "Student | None" has no attribute "name"</pre>
<div class="warn"><p>Python не проверяет аннотации во время выполнения: <code>average("abc")</code> всё равно запустится и упадёт внутри. Аннотации — документация для людей, редакторов и статических анализаторов вроде <code>mypy</code>. Пользу они приносят, только если анализатор действительно запускается — например, в CI.</p></div>
<div class="ayano">Тесты, единый стиль и типы — это то, что превращает скрипт в проект, над которым могут работать несколько человек. На собеседовании junior-разработчика на Python почти всегда спросят, как ты тестируешь код. Ответ «pytest, проверяю обычные и граничные случаи, запускаю ruff и mypy в CI» — уже хороший ответ.</div>
`,
  p: [
    { q: `Напиши тест для функции <code>is_palindrome(s)</code> с параметризацией.`, a: `<pre class="code" data-lang="py">@pytest.mark.parametrize("s, expected", [
    ("шалаш", True),
    ("Шалаш", True),
    ("abc", False),
    ("", True),
])
def test_is_palindrome(s, expected):
    assert is_palindrome(s) == expected</pre>` },
    { q: `Проверь, что функция бросает <code>ZeroDivisionError</code>.`, a: `<pre class="code" data-lang="py">def test_divide_by_zero():
    with pytest.raises(ZeroDivisionError):
        divide(1, 0)</pre>` },
    { q: `Почему <code>assert 0.1 + 0.2 == 0.3</code> упадёт и как исправить?`, a: `Дробные числа приближённые. Используй <code>assert 0.1 + 0.2 == pytest.approx(0.3)</code>.` },
    { q: `Протестируй функцию, которая печатает приветствие, с помощью <code>capsys</code>.`, a: `<pre class="code" data-lang="py">def test_greeting(capsys):
    say_hello("Ichika")
    out = capsys.readouterr().out
    assert "Ichika" in out</pre>` },
    { q: `Добавь аннотации типов к функции <code>def merge(a, b): return {**a, **b}</code> для словарей «строка → число».`, a: `<pre class="code" data-lang="py">def merge(a: dict[str, int], b: dict[str, int]) -> dict[str, int]:
    return {**a, **b}</pre>` },
    { q: `Переименуй по PEP 8: <code>class student_record</code>, <code>def CalcAvg()</code>, <code>maxValue = 100</code> (константа).`, a: `<code>class StudentRecord</code>, <code>def calc_avg()</code>, <code>MAX_VALUE = 100</code>.` }
  ],
  q: [
    { q: `pytest ищет тесты в файлах:`, o: [`<code>*_spec.py</code>`, `<code>test_*.py</code>`, `<code>tests.txt</code>`, `любых`], a: 1, e: `Соглашение об именах.` },
    { q: `Проверка исключения в pytest:`, o: [`<code>assertRaises</code>`, `<code>with pytest.raises(...)</code>`, `<code>try/except</code> в тесте всегда`, `<code>@raises</code>`], a: 1, e: `Контекстный менеджер.` },
    { q: `Временный каталог для теста даёт фикстура:`, o: [`<code>tmp_path</code>`, `<code>tempdir</code>`, `<code>os.tmp</code>`, `<code>tmp</code>`], a: 0, e: `<code>tmp_path</code>.` },
    { q: `Имена классов по PEP 8:`, o: [`<code>snake_case</code>`, `<code>CamelCase</code>`, `<code>UPPER_CASE</code>`, `<code>lowercase</code>`], a: 1, e: `CamelCase.` },
    { q: `Аннотации типов Python во время выполнения:`, o: [`строго проверяются`, `не проверяются`, `вызывают ошибку при несовпадении`, `ускоряют код`], a: 1, e: `Нужен mypy.` }
  ],
  s: [
    `pytest: файлы <code>test_*.py</code>, функции <code>test_*</code>, <code>assert</code>, <code>pytest.approx</code>, <code>pytest.raises</code>.`,
    `Параметризация для множества случаев; проверяй границы.`,
    `Фикстуры готовят окружение; встроенные <code>tmp_path</code>, <code>monkeypatch</code>, <code>capsys</code>.`,
    `PEP 8: <code>snake_case</code>, <code>CamelCase</code>, <code>UPPER_CASE</code>, 4 пробела, порядок импортов.`,
    `<code>ruff format</code>, <code>ruff check</code>, <code>mypy</code> — автоматически и в CI.`,
    `Аннотации — документация и статическая проверка, не проверка во время работы.`
  ]
});
