L('python', 11, {
  m: 45,
  intro: 'В Python всё — объекты: числа, строки, функции, модули. Классы позволяют создавать свои типы объектов с данными и поведением. Сегодня изучим объявление классов, метод инициализации, атрибуты экземпляра и класса, наследование и вызов родителя через super, а также магические методы, которые позволяют своим объектам печататься, сравниваться и складываться как встроенные типы. Отдельно — удобные классы данных dataclass.',
  intro2: 'Сэмпай, магические методы — это как научить свою игрушку понимать обычные команды ♡ Напишешь метод сложения — и твои векторы будут складываться через плюс. Напишешь метод строкового представления — и print покажет их красиво. Python будто признаёт их своими!',
  goals: [
    'Объявлять классы с методом инициализации, атрибутами и методами',
    'Наследовать классы и вызывать методы родителя через super',
    'Реализовывать магические методы: представление, сравнение, арифметика, длина',
    'Использовать dataclass и property'
  ],
  c: `
<h3>Класс и экземпляры</h3>
<pre class="code" data-lang="py">class Student:
    school = "ANHS"                      # атрибут класса: общий для всех

    def __init__(self, name, grade):     # инициализация экземпляра
        self.name = name                 # атрибуты экземпляра
        self.grade = grade
        self.points = 0

    def add_points(self, n):             # метод: первый параметр — self
        if n <= 0:
            raise ValueError("баллы должны быть положительными")
        self.points += n

    def describe(self):
        return f"{self.name}, {self.grade} класс, {self.points} баллов ({self.school})"


k = Student("Kiyotaka", 10)
k.add_points(50)
print(k.describe())
print(isinstance(k, Student))            # True</pre>
<p><code>self</code> — ссылка на сам объект; Python передаёт её автоматически при вызове <code>k.add_points(50)</code>. Методу <code>__init__</code> не нужно ничего возвращать — он заполняет уже созданный объект.</p>
<p>В Python нет настоящих приватных полей. По соглашению имя с одним подчёркиванием в начале (<code>_balance</code>) означает «внутреннее, не трогай снаружи».</p>

<h3>Наследование</h3>
<pre class="code" data-lang="py">class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

    def introduce(self):
        return f"{self.name}: {self.speak()}"


class Cat(Animal):
    def speak(self):                      # переопределение
        return "мяу"


class Robot(Animal):
    def __init__(self, name, version):
        super().__init__(name)            # вызвать инициализацию родителя
        self.version = version

    def speak(self):
        return f"бип v{self.version}"


for a in [Cat("Мурка"), Robot("R2", 2), Animal("Некто")]:
    print(a.introduce())                  # полиморфизм: у каждого своё</pre>
<p>В Python методы по умолчанию «виртуальные»: вызывается версия фактического класса объекта. Часто полиморфизм достигается и без наследования — достаточно, чтобы у объектов был метод с нужным именем («утиная типизация»).</p>

<h3>Магические методы</h3>
<pre class="code" data-lang="py">class Vector:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __repr__(self):                   # для отладки и print в коллекциях
        return f"Vector({self.x}, {self.y})"

    def __str__(self):                    # для print и str()
        return f"({self.x}; {self.y})"

    def __add__(self, other):             # v1 + v2
        return Vector(self.x + other.x, self.y + other.y)

    def __mul__(self, k):                 # v * 3
        return Vector(self.x * k, self.y * k)

    def __eq__(self, other):              # v1 == v2
        return isinstance(other, Vector) and (self.x, self.y) == (other.x, other.y)

    def __abs__(self):                    # abs(v)
        return (self.x ** 2 + self.y ** 2) ** 0.5


v = Vector(3, 4)
print(v + Vector(1, 1), v * 2, abs(v), v == Vector(3, 4))
print([v])                                # [Vector(3, 4)] — используется __repr__</pre>
<div class="tbl"><table><thead><tr><th>Метод</th><th>Когда вызывается</th></tr></thead><tbody>
<tr><td><code>__init__</code></td><td>создание объекта</td></tr>
<tr><td><code>__repr__</code>, <code>__str__</code></td><td>отладочное и пользовательское представление</td></tr>
<tr><td><code>__eq__</code>, <code>__lt__</code></td><td><code>==</code>, <code>&lt;</code> и сортировка</td></tr>
<tr><td><code>__add__</code>, <code>__mul__</code></td><td><code>+</code>, <code>*</code></td></tr>
<tr><td><code>__len__</code>, <code>__getitem__</code>, <code>__iter__</code></td><td><code>len()</code>, индексация, цикл <code>for</code></td></tr>
<tr><td><code>__enter__</code>, <code>__exit__</code></td><td>конструкция <code>with</code></td></tr>
</tbody></table></div>

<h3>dataclass и property</h3>
<pre class="code" data-lang="py">from dataclasses import dataclass, field

@dataclass(order=True)
class Book:
    year: int
    title: str
    author: str = "неизвестен"
    tags: list = field(default_factory=list)   # изменяемое значение по умолчанию — так

books = [Book(1965, "Dune", "Herbert"), Book(1949, "1984", "Orwell")]
print(sorted(books)[0])           # сравнение по полям сверху вниз: сначала год


class Account:
    def __init__(self, owner):
        self.owner = owner
        self._balance = 0

    @property
    def balance(self):            # читается как атрибут: acc.balance
        return self._balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("сумма должна быть положительной")
        self._balance += amount</pre>
<div class="ichika"><code>@dataclass</code> сам пишет <code>__init__</code>, <code>__repr__</code> и <code>__eq__</code> ♡ Для классов, которые в основном хранят данные, это огромная экономия. А <code>@property</code> делает атрибут только для чтения — изменить баланс можно лишь через <code>deposit</code>!</div>
<div class="ayano">В Python класс нужен не всегда. Если данные просто хранятся — подойдёт <code>dataclass</code> или словарь. Если поведение — одна функция — пусть будет функция. Класс оправдан, когда есть состояние с правилами (инвариантами) и несколько операций над ним. Не создавай классы ради классов: это частая ошибка тех, кто пришёл из Java.</div>
`,
  p: [
    { q: `Напиши класс <code>Rectangle</code> с методами <code>area</code> и <code>perimeter</code> и красивым <code>__str__</code>.`, a: `<pre class="code" data-lang="py">class Rectangle:
    def __init__(self, w, h):
        if w <= 0 or h <= 0:
            raise ValueError("стороны должны быть положительными")
        self.w, self.h = w, h

    def area(self):
        return self.w * self.h

    def perimeter(self):
        return 2 * (self.w + self.h)

    def __str__(self):
        return f"Прямоугольник {self.w}×{self.h}"</pre>` },
    { q: `Создай класс <code>Square</code>, наследующий <code>Rectangle</code>.`, a: `<pre class="code" data-lang="py">class Square(Rectangle):
    def __init__(self, side):
        super().__init__(side, side)</pre>` },
    { q: `Чем <code>__repr__</code> отличается от <code>__str__</code>?`, a: `<code>__repr__</code> — однозначное представление для разработчика (используется в отладке и при печати коллекций), <code>__str__</code> — удобное для пользователя (используется в <code>print</code> и <code>str()</code>). Если <code>__str__</code> нет, используется <code>__repr__</code>.` },
    { q: `Сделай так, чтобы объекты <code>Student</code> сортировались по баллам через <code>sorted</code>.`, a: `<pre class="code" data-lang="py">def __lt__(self, other):
    return self.points < other.points</pre> Или без изменения класса: <code>sorted(students, key=lambda s: s.points)</code>.` },
    { q: `Перепиши класс точки с помощью <code>dataclass</code>.`, a: `<pre class="code" data-lang="py">from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float</pre> <code>__init__</code>, <code>__repr__</code> и <code>__eq__</code> создаются автоматически.` },
    { q: `Реализуй класс <code>Playlist</code>, который поддерживает <code>len()</code> и цикл <code>for</code>.`, a: `<pre class="code" data-lang="py">class Playlist:
    def __init__(self, songs=None):
        self.songs = list(songs or [])

    def __len__(self):
        return len(self.songs)

    def __iter__(self):
        return iter(self.songs)</pre>` }
  ],
  q: [
    { q: `Метод инициализации экземпляра:`, o: [`<code>__new__</code> всегда`, `<code>__init__</code>`, `<code>constructor</code>`, `<code>init()</code>`], a: 1, e: `Заполняет объект.` },
    { q: `Первый параметр обычного метода:`, o: [`<code>this</code>`, `<code>self</code>`, `<code>cls</code>`, `<code>me</code>`], a: 1, e: `Соглашение.` },
    { q: `Вызвать метод родителя:`, o: [`<code>parent()</code>`, `<code>super()</code>`, `<code>base()</code>`, `<code>this.parent</code>`], a: 1, e: `super().` },
    { q: `Оператор <code>+</code> для своего класса реализует:`, o: [`<code>__plus__</code>`, `<code>__add__</code>`, `<code>__sum__</code>`, `<code>__concat__</code>`], a: 1, e: `add.` },
    { q: `Атрибут только для чтения удобно сделать через:`, o: [`<code>@property</code>`, `<code>const</code>`, `<code>private</code>`, `<code>final</code>`], a: 0, e: `property.` }
  ],
  s: [
    `Класс: <code>__init__</code>, атрибуты через <code>self</code>, методы; атрибуты класса общие.`,
    `Соглашение <code>_name</code> — внутреннее; приватности как в C++ нет.`,
    `Наследование, переопределение, <code>super()</code>; утиная типизация.`,
    `Магические методы: <code>__repr__</code>, <code>__str__</code>, <code>__eq__</code>, <code>__lt__</code>, <code>__add__</code>, <code>__len__</code>, <code>__iter__</code>.`,
    `<code>@dataclass</code> для классов данных; <code>field(default_factory=list)</code>.`,
    `<code>@property</code> — вычисляемые и защищённые атрибуты; не создавай классы без нужды.`
  ]
});
