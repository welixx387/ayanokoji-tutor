L('rust', 7, {
  m: 40,
  intro: 'Структуры в Rust объединяют связанные данные в один тип, а методы описываются отдельно, в блоке impl. В Rust нет классов и наследования в привычном смысле, но есть всё нужное для моделирования: структуры, методы, ассоциированные функции-конструкторы и автоматически выводимые возможности через derive. Сегодня построим несколько типов и научимся выбирать, как метод получает self.',
  intro2: 'Сэмпай, в Rust данные и поведение живут в разных комнатах ♡ struct — это описание, что лежит в шкафу, а impl — инструкция, что со шкафом можно делать. А derive — волшебная кнопка «научи шкаф печататься и сравниваться» одной строчкой!',
  goals: [
    'Объявлять структуры, создавать и изменять их экземпляры',
    'Писать методы с self, ссылкой на self и изменяемой ссылкой на self',
    'Создавать ассоциированные функции, в том числе конструктор new',
    'Выводить Debug, Clone и PartialEq через derive'
  ],
  c: `
<h3>Структуры</h3>
<pre class="code" data-lang="rust">#[derive(Debug, Clone, PartialEq)]
struct Student {
    name: String,
    grade: u8,
    points: i32,
}

fn main() {
    let mut s = Student {
        name: String::from("Kiyotaka"),
        grade: 10,
        points: 80,
    };
    s.points += 5;                               // нужна let mut для всей структуры
    println!("{:?}", s);                         // благодаря derive(Debug)
    println!("{:#?}", s);                        // многострочный вывод

    let name = String::from("Ichika");
    let grade = 9;
    let t = Student { name, grade, points: 95 };   // сокращённая запись полей
    let u = Student { points: 0, ..t.clone() };    // остальные поля — из t
    println!("{}", t == u);                        // false: derive(PartialEq)
}</pre>
<p>Изменяемость задаётся для всей переменной, а не для отдельных полей. Структуры-кортежи <code>struct Point(i32, i32);</code> полезны для простых обёрток, а «единичные» <code>struct Marker;</code> — для типов без данных.</p>

<h3>impl: методы</h3>
<pre class="code" data-lang="rust">struct Rect {
    w: f64,
    h: f64,
}

impl Rect {
    fn new(w: f64, h: f64) -> Self {          // ассоциированная функция (нет self)
        Rect { w, h }
    }
    fn square(side: f64) -> Self {
        Self { w: side, h: side }
    }
    fn area(&self) -> f64 {                   // читает
        self.w * self.h
    }
    fn scale(&mut self, k: f64) {             // изменяет
        self.w *= k;
        self.h *= k;
    }
    fn into_square(self) -> Rect {            // забирает владение
        let side = self.w.max(self.h);
        Rect::square(side)
    }
}

fn main() {
    let mut r = Rect::new(3.0, 4.0);          // вызов через ::
    println!("{}", r.area());                 // вызов метода через .
    r.scale(2.0);
    let sq = r.into_square();                 // r больше нельзя использовать
    println!("{}", sq.area());
}</pre>
<div class="tbl"><table><thead><tr><th>Первый параметр</th><th>Смысл</th><th>Пример</th></tr></thead><tbody>
<tr><td><code>&amp;self</code></td><td>читает объект</td><td>геттеры, вычисления</td></tr>
<tr><td><code>&amp;mut self</code></td><td>изменяет объект</td><td>сеттеры, <code>push</code></td></tr>
<tr><td><code>self</code></td><td>забирает владение</td><td>преобразования <code>into</code>, сборщики</td></tr>
<tr><td>нет</td><td>ассоциированная функция</td><td>конструкторы <code>new</code></td></tr>
</tbody></table></div>
<p><code>Self</code> внутри <code>impl</code> — псевдоним текущего типа. Конструктор по соглашению называют <code>new</code>, но это обычная функция, а не особая конструкция языка.</p>

<h3>Инкапсуляция</h3>
<pre class="code" data-lang="rust">mod bank {
    pub struct Account {
        owner: String,          // приватное поле: снаружи модуля недоступно
        balance: i64,
    }
    impl Account {
        pub fn new(owner: &str) -> Self {
            Account { owner: owner.to_string(), balance: 0 }
        }
        pub fn deposit(&mut self, amount: i64) {
            assert!(amount > 0, "сумма должна быть положительной");
            self.balance += amount;
        }
        pub fn balance(&self) -> i64 { self.balance }
    }
}

let mut acc = bank::Account::new("Kiyotaka");
acc.deposit(500);
// acc.balance = 1_000_000;    // ошибка: поле приватное</pre>
<p>Приватность в Rust действует на уровне модулей: поля и функции без <code>pub</code> видны только внутри своего модуля. Так защищают инварианты, как <code>private</code> в C++.</p>
<div class="ichika">Самые полезные derive ♡ <code>Debug</code> — печать через <code>{:?}</code>, <code>Clone</code> — метод <code>clone()</code>, <code>PartialEq</code> — сравнение <code>==</code>, <code>Default</code> — значение по умолчанию, <code>Copy</code> — копирование для маленьких типов. Одна строчка вместо десятков строк кода!</div>
<div class="ayano">Выбирая тип <code>self</code>, ты описываешь контракт метода. <code>&amp;self</code> обещает ничего не менять, <code>&amp;mut self</code> предупреждает об изменениях, <code>self</code> — что объект после вызова исчезнет. Пользователь твоего типа узнаёт это из сигнатуры, не читая реализацию, а компилятор гарантирует, что обещание выполнено.</div>
`,
  p: [
    { q: `Объяви структуру <code>Book</code> с названием, автором и годом и выведи её через <code>{:?}</code>.`, a: `<pre class="code" data-lang="rust">#[derive(Debug)]
struct Book {
    title: String,
    author: String,
    year: u16,
}
let b = Book { title: "Dune".into(), author: "Herbert".into(), year: 1965 };
println!("{:?}", b);</pre>` },
    { q: `Добавь в <code>Rect</code> метод <code>can_hold(&amp;self, other: &amp;Rect) -&gt; bool</code>.`, a: `<pre class="code" data-lang="rust">fn can_hold(&self, other: &Rect) -> bool {
    self.w >= other.w && self.h >= other.h
}</pre>` },
    { q: `Почему после <code>r.into_square()</code> переменную <code>r</code> нельзя использовать?`, a: `Метод принимает <code>self</code> по значению и забирает владение; <code>r</code> перемещена в метод.` },
    { q: `Напиши структуру <code>Counter</code> с методами <code>new</code>, <code>inc</code> и <code>get</code>.`, a: `<pre class="code" data-lang="rust">struct Counter { value: u32 }

impl Counter {
    fn new() -> Self { Counter { value: 0 } }
    fn inc(&mut self) { self.value += 1; }
    fn get(&self) -> u32 { self.value }
}</pre>` },
    { q: `Чем ассоциированная функция отличается от метода?`, a: `У ассоциированной функции нет параметра <code>self</code>; её вызывают через имя типа: <code>Rect::new(...)</code>. Метод вызывают у экземпляра через точку.` },
    { q: `Создай копию студента с другим числом баллов, используя синтаксис обновления.`, a: `<pre class="code" data-lang="rust">let updated = Student { points: 100, ..s.clone() };</pre> Без <code>clone</code> поле <code>name</code> (<code>String</code>) переместилось бы из <code>s</code>.` }
  ],
  q: [
    { q: `Методы структуры объявляются в блоке:`, o: [`<code>class</code>`, `<code>impl</code>`, `<code>trait</code>`, `<code>mod</code>`], a: 1, e: `impl.` },
    { q: `Метод, изменяющий объект, принимает:`, o: [`<code>&amp;self</code>`, `<code>&amp;mut self</code>`, `<code>self</code>`, `ничего`], a: 1, e: `Изменяемая ссылка.` },
    { q: `Вызов ассоциированной функции:`, o: [`<code>r.new()</code>`, `<code>Rect::new()</code>`, `<code>new Rect()</code>`, `<code>Rect.new()</code>`], a: 1, e: `Через ::.` },
    { q: `Печать структуры через <code>{:?}</code> требует:`, o: [`<code>#[derive(Debug)]</code>`, `<code>impl Print</code>`, `<code>pub</code>`, `ничего`], a: 0, e: `Debug.` },
    { q: `Приватность в Rust действует на уровне:`, o: [`объекта`, `модуля`, `файла всегда`, `функции`], a: 1, e: `pub открывает.` }
  ],
  s: [
    `<code>struct</code> с именованными полями; изменяемость — для всей переменной.`,
    `Сокращённая запись полей и синтаксис обновления <code>..other</code>.`,
    `<code>impl</code>: методы с <code>&amp;self</code>, <code>&amp;mut self</code>, <code>self</code>; функции без self — через <code>::</code>.`,
    `<code>Self</code> — текущий тип; конструктор по соглашению <code>new</code>.`,
    `Приватность по модулям; <code>pub</code> открывает.`,
    `<code>derive</code>: Debug, Clone, PartialEq, Default, Copy.`
  ]
});
