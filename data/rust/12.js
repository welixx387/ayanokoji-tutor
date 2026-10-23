L('rust', 12, {
  m: 45,
  intro: 'Трейты описывают общее поведение: «умеет выводиться на экран», «умеет сравниваться», «имеет площадь». Это аналог интерфейсов в других языках. Обобщённые типы позволяют писать функции и структуры для любых типов, обладающих нужными трейтами. Вместе они дают полиморфизм без наследования: статический, через обобщения, и динамический, через трейт-объекты dyn.',
  intro2: 'Сэмпай, трейт — это навык в резюме ♡ «Умею готовить», «Умею петь». Функции всё равно, кто ты — повар или студент, ей важно, есть ли у тебя нужный навык. А обобщённая функция говорит: «Приму любого, кто умеет петь»!',
  goals: [
    'Объявлять трейты и реализовывать их для своих и стандартных типов',
    'Писать обобщённые функции и структуры с ограничениями трейтов',
    'Реализовывать стандартные трейты Display, PartialOrd и другие',
    'Выбирать между обобщениями и трейт-объектами'
  ],
  c: `
<h3>Объявление и реализация трейта</h3>
<pre class="code" data-lang="rust">trait Shape {
    fn area(&self) -> f64;
    fn name(&self) -> String {                 // метод по умолчанию
        String::from("фигура")
    }
}

struct Circle { r: f64 }
struct Square { side: f64 }

impl Shape for Circle {
    fn area(&self) -> f64 { std::f64::consts::PI * self.r * self.r }
    fn name(&self) -> String { "круг".into() }
}

impl Shape for Square {
    fn area(&self) -> f64 { self.side * self.side }   // name — по умолчанию
}

fn main() {
    let c = Circle { r: 1.0 };
    let s = Square { side: 2.0 };
    println!("{}: {:.2}", c.name(), c.area());
    println!("{}: {:.2}", s.name(), s.area());
}</pre>

<h3>Обобщения и ограничения</h3>
<pre class="code" data-lang="rust">fn print_area<T: Shape>(shape: &T) {               // T — любой тип с трейтом Shape
    println!("{} → {:.2}", shape.name(), shape.area());
}

fn largest<T: PartialOrd + Copy>(xs: &[T]) -> T {  // несколько ограничений
    let mut best = xs[0];
    for &x in xs {
        if x > best { best = x; }
    }
    best
}

fn describe(item: &impl std::fmt::Display) {      // короткая запись
    println!("[{item}]");
}

fn total_area<T>(shapes: &[T]) -> f64
where
    T: Shape,                                      // where — для длинных ограничений
{
    shapes.iter().map(|s| s.area()).sum()
}

struct Pair<T> { a: T, b: T }
impl<T: PartialOrd + std::fmt::Display> Pair<T> {
    fn show_max(&self) {
        let m = if self.a > self.b { &self.a } else { &self.b };
        println!("max = {m}");
    }
}</pre>
<p>Компилятор создаёт отдельную версию обобщённой функции для каждого типа — <b>мономорфизация</b>, как у шаблонов C++. Вызовы статические и быстрые. Но в отличие от C++, ограничения проверяются сразу: внутри <code>largest</code> можно пользоваться только тем, что обещают <code>PartialOrd</code> и <code>Copy</code>.</p>

<h3>Стандартные трейты</h3>
<div class="tbl"><table><thead><tr><th>Трейт</th><th>Даёт</th><th>Как получить</th></tr></thead><tbody>
<tr><td><code>Debug</code></td><td><code>{:?}</code></td><td><code>#[derive(Debug)]</code></td></tr>
<tr><td><code>Display</code></td><td><code>{}</code> и <code>to_string()</code></td><td>только вручную</td></tr>
<tr><td><code>Clone</code>, <code>Copy</code></td><td>копирование</td><td>derive</td></tr>
<tr><td><code>PartialEq</code>, <code>Eq</code></td><td><code>==</code></td><td>derive</td></tr>
<tr><td><code>PartialOrd</code>, <code>Ord</code></td><td><code>&lt;</code>, сортировка</td><td>derive</td></tr>
<tr><td><code>Hash</code></td><td>ключ <code>HashMap</code></td><td>derive</td></tr>
<tr><td><code>Default</code></td><td><code>T::default()</code></td><td>derive</td></tr>
<tr><td><code>From</code>/<code>Into</code></td><td>преобразования</td><td>вручную</td></tr>
</tbody></table></div>
<pre class="code" data-lang="rust">use std::fmt;

struct Money { kop: i64 }

impl fmt::Display for Money {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}.{:02} ₽", self.kop / 100, self.kop % 100)
    }
}

impl From<i64> for Money {
    fn from(kop: i64) -> Self { Money { kop } }
}

fn main() {
    let m: Money = 12345.into();          // Into получаем бесплатно из From
    println!("{m}");                      // 123.45 ₽
}</pre>

<h3>Трейт-объекты: dyn</h3>
<pre class="code" data-lang="rust">// Shape, Circle и Square — из примера выше
fn main() {
    let shapes: Vec<Box<dyn Shape>> = vec![
        Box::new(Circle { r: 1.0 }),
        Box::new(Square { side: 2.0 }),
    ];
    for s in &shapes {
        println!("{}: {:.2}", s.name(), s.area());     // вызов через таблицу методов
    }
}</pre>
<p><code>Vec&lt;T&gt;</code> хранит элементы одного типа. Чтобы сложить в один вектор круги и квадраты, используют <b>трейт-объект</b> <code>Box&lt;dyn Shape&gt;</code>: указатель на данные плюс указатель на таблицу методов, как vtable в C++. Вызов определяется во время выполнения.</p>
<div class="ichika">Как выбрать ♡ Все элементы одного типа или тип известен при компиляции — обобщения <code>&lt;T: Shape&gt;</code>: быстрее. Нужна смесь разных типов в одной коллекции — <code>Box&lt;dyn Shape&gt;</code>: гибче. Как шаблоны и виртуальные функции в C++!</div>
<div class="warn"><p>Нельзя реализовать чужой трейт для чужого типа: например, <code>Display</code> для <code>Vec&lt;i32&gt;</code>. Хотя бы трейт или тип должны быть объявлены в твоём крейте — это «правило сироты», защищающее от конфликтов реализаций. Обходной путь — обёртка: <code>struct Scores(Vec&lt;i32&gt;);</code>.</p></div>
<div class="ayano">Трейты заменяют наследование композицией возможностей. Тип не «является» фигурой по происхождению — он «умеет» то, что требует трейт. Это делает код гибче: к любому своему типу можно добавить новое поведение, а функции зависят от минимального набора нужных возможностей, а не от целой иерархии классов.</div>
`,
  p: [
    { q: `Объяви трейт <code>Speak</code> с методом <code>speak(&amp;self) -&gt; String</code> и реализуй его для <code>Cat</code> и <code>Dog</code>.`, a: `<pre class="code" data-lang="rust">trait Speak {
    fn speak(&self) -> String;
}
struct Cat;
struct Dog;
impl Speak for Cat { fn speak(&self) -> String { "мяу".into() } }
impl Speak for Dog { fn speak(&self) -> String { "гав".into() } }</pre>` },
    { q: `Напиши обобщённую функцию, которая печатает все элементы среза, реализующие <code>Display</code>, через запятую.`, a: `<pre class="code" data-lang="rust">fn join_all<T: std::fmt::Display>(xs: &[T]) -> String {
    xs.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(", ")
}</pre>` },
    { q: `Почему <code>largest</code> требует <code>Copy</code>?`, a: `Функция копирует элементы из среза в <code>best</code> (<code>let mut best = xs[0]</code>). Без <code>Copy</code> это было бы перемещение из заимствованного среза, что запрещено. Альтернатива — возвращать <code>&amp;T</code>.` },
    { q: `Реализуй <code>Display</code> для структуры <code>Point { x: i32, y: i32 }</code> в виде «(x, y)».`, a: `<pre class="code" data-lang="rust">impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}</pre>` },
    { q: `Сделай свою структуру ключом <code>HashMap</code>.`, a: `<pre class="code" data-lang="rust">#[derive(PartialEq, Eq, Hash)]
struct Coord { x: i32, y: i32 }
let mut grid: HashMap<Coord, char> = HashMap::new();</pre>` },
    { q: `Когда нужен <code>Box&lt;dyn Trait&gt;</code>, а не обобщение?`, a: `Когда в одной коллекции или переменной нужно хранить значения разных типов, реализующих трейт, и выбор типа происходит во время выполнения (например, по вводу пользователя).` }
  ],
  q: [
    { q: `Трейт в Rust ближе всего к:`, o: [`классу`, `интерфейсу`, `макросу`, `модулю`], a: 1, e: `Набор поведения.` },
    { q: `<code>fn f&lt;T: Display&gt;(x: T)</code> означает:`, o: [`T любой`, `T реализует Display`, `T — строка`, `ошибку`], a: 1, e: `Ограничение.` },
    { q: `Вывод через <code>{}</code> требует трейта:`, o: [`<code>Debug</code>`, `<code>Display</code>`, `<code>Clone</code>`, `<code>Copy</code>`], a: 1, e: `Пишется вручную.` },
    { q: `Хранить в одном векторе разные типы с общим трейтом:`, o: [`<code>Vec&lt;T&gt;</code>`, `<code>Vec&lt;Box&lt;dyn Trait&gt;&gt;</code>`, `<code>Vec&lt;impl Trait&gt;</code>`, `невозможно`], a: 1, e: `Трейт-объекты.` },
    { q: `Мономорфизация — это:`, o: [`проверка заимствований`, `создание версии обобщённой функции для каждого типа`, `сборка мусора`, `динамический вызов`], a: 1, e: `Как шаблоны C++.` }
  ],
  s: [
    `Трейт — набор методов; методы по умолчанию; <code>impl Trait for Type</code>.`,
    `Обобщения: <code>&lt;T: Trait&gt;</code>, <code>impl Trait</code>, <code>where</code>; мономорфизация.`,
    `Стандартные трейты: Debug, Display, Clone, PartialEq, Ord, Hash, Default, From.`,
    `<code>Box&lt;dyn Trait&gt;</code> — динамический полиморфизм для смешанных коллекций.`,
    `Правило сироты: чужой трейт для чужого типа — через обёртку.`,
    `Композиция возможностей вместо наследования.`
  ]
});
