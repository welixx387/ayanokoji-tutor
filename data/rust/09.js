L('rust', 9, {
  m: 40,
  intro: 'Перечисления в Rust гораздо мощнее, чем enum в C: каждый вариант может нести свои данные. Вместе с сопоставлением с образцом match они позволяют точно описать состояния программы, а компилятор проверяет, что ни один вариант не забыт. На перечислении построен и Option — способ Rust обходиться без null. Сегодня изучим enum, match, if let и методы Option.',
  intro2: 'Сэмпай, enum в Rust — это коробка с этикеткой ♡ Этикетка говорит, какой это вариант, а внутри — данные именно этого варианта. А match — внимательный кладовщик: он не даст закрыть смену, пока не проверены все возможные этикетки!',
  goals: [
    'Объявлять перечисления с данными в вариантах',
    'Разбирать значения через match и понимать проверку полноты',
    'Использовать Option вместо null',
    'Применять if let, let else и методы Option'
  ],
  c: `
<h3>Перечисления с данными</h3>
<pre class="code" data-lang="rust">#[derive(Debug)]
enum Shape {
    Circle { r: f64 },
    Rect { w: f64, h: f64 },
    Triangle(f64, f64, f64),
    Dot,                                // вариант без данных
}

impl Shape {
    fn area(&self) -> f64 {
        match self {
            Shape::Circle { r } => std::f64::consts::PI * r * r,
            Shape::Rect { w, h } => w * h,
            Shape::Triangle(a, b, c) => {
                let p = (a + b + c) / 2.0;
                (p * (p - a) * (p - b) * (p - c)).sqrt()
            }
            Shape::Dot => 0.0,
        }
    }
}

fn main() {
    let shapes = vec![Shape::Circle { r: 1.0 }, Shape::Rect { w: 2.0, h: 3.0 }, Shape::Dot];
    for s in &shapes {
        println!("{:?}: {:.2}", s, s.area());
    }
}</pre>
<p>Такое перечисление называют <b>алгебраическим типом</b> или размеченным объединением — помнишь пару <code>enum</code> + <code>union</code> из курса C? В Rust тег и данные связаны языком: невозможно прочитать радиус у прямоугольника.</p>

<h3>match</h3>
<pre class="code" data-lang="rust">fn describe(n: i32) -> &'static str {
    match n {
        0 => "ноль",
        1 | 2 | 3 => "мало",               // несколько вариантов
        4..=9 => "несколько",              // диапазон
        x if x < 0 => "отрицательное",     // охранное условие
        _ => "много",                      // всё остальное
    }
}</pre>
<p><code>match</code> — выражение: каждая ветка возвращает значение одного типа. Ветки проверяются сверху вниз. Главное свойство — <b>полнота</b>: если какой-то вариант не покрыт, программа не скомпилируется. Добавил в <code>Shape</code> новый вариант — компилятор покажет все <code>match</code>, которые нужно дополнить.</p>
<div class="ichika">Шаблон <code>_</code> ловит всё остальное ♡ Но для своих перечислений лучше перечислять варианты явно, без <code>_</code>. Тогда при добавлении нового варианта компилятор напомнит обо всех местах, где его нужно обработать. Это бесплатная проверка!</div>

<h3>Option вместо null</h3>
<pre class="code" data-lang="rust">// enum Option<T> { Some(T), None }   — определён в стандартной библиотеке

fn find_student(names: &[&str], who: &str) -> Option<usize> {
    names.iter().position(|n| *n == who)
}

fn main() {
    let names = ["Kiyotaka", "Ichika", "Suzune"];
    match find_student(&names, "Ichika") {
        Some(i) => println!("найдена под номером {i}"),
        None => println!("нет такой"),
    }
}</pre>
<p>В Rust нет <code>null</code>. Значение, которого может не быть, имеет тип <code>Option&lt;T&gt;</code>, и компилятор не позволит использовать его как <code>T</code>, пока ты не разберёшь случай <code>None</code>. Ошибка «обращение к null» исчезает как класс — её изобретатель Тони Хоар назвал null своей «ошибкой на миллиард долларов».</p>

<h3>if let, let else и методы</h3>
<pre class="code" data-lang="rust">let maybe: Option<i32> = "42".parse().ok();

if let Some(v) = maybe {                       // когда интересен один вариант
    println!("число {v}");
}

fn first_char_upper(s: &str) -> Option<char> {
    let Some(c) = s.chars().next() else {      // let else: иначе выйти
        return None;
    };
    c.to_uppercase().next()
}

let x = maybe.unwrap_or(0);                    // значение по умолчанию
let doubled = maybe.map(|v| v * 2);            // Some(84) или None
let is_big = maybe.is_some_and(|v| v > 10);
let v = maybe.expect("ожидалось число");       // паника с сообщением при None</pre>
<div class="tbl"><table><thead><tr><th>Метод</th><th>Что делает</th></tr></thead><tbody>
<tr><td><code>unwrap_or(d)</code></td><td>значение или d</td></tr>
<tr><td><code>map(f)</code></td><td>преобразовать значение внутри</td></tr>
<tr><td><code>and_then(f)</code></td><td>цепочка операций, каждая из которых может вернуть None</td></tr>
<tr><td><code>ok_or(e)</code></td><td>превратить в <code>Result</code></td></tr>
<tr><td><code>unwrap()</code>, <code>expect(msg)</code></td><td>значение или паника — только когда None невозможен</td></tr>
</tbody></table></div>
<div class="warn"><p><code>unwrap</code> в рабочем коде — это обещание «здесь никогда не будет None». Если обещание нарушится, программа упадёт. В примерах и тестах он удобен, а в реальном коде предпочитай <code>match</code>, <code>if let</code>, <code>unwrap_or</code> или <code>?</code>.</p></div>
<div class="ayano">Сила перечислений — в том, что недопустимые состояния становятся непредставимыми. Вместо структуры с полями <code>is_connected</code>, <code>socket</code> и <code>error</code>, где возможны бессмысленные сочетания, опиши <code>enum Connection { Disconnected, Connected(Socket), Failed(String) }</code>. Тогда ни один код не сможет обратиться к сокету отключённого соединения.</div>
`,
  p: [
    { q: `Опиши перечисление <code>Command</code> для калькулятора: сложение и умножение двух чисел, выход.`, a: `<pre class="code" data-lang="rust">enum Command {
    Add(f64, f64),
    Mul(f64, f64),
    Quit,
}

fn run(cmd: Command) -> Option<f64> {
    match cmd {
        Command::Add(a, b) => Some(a + b),
        Command::Mul(a, b) => Some(a * b),
        Command::Quit => None,
    }
}</pre>` },
    { q: `Что произойдёт, если добавить вариант <code>Shape::Square</code> и не изменить <code>area</code>?`, a: `Ошибка компиляции «non-exhaustive patterns»: <code>match</code> обязан покрыть все варианты. Компилятор укажет место.` },
    { q: `Напиши функцию, возвращающую последний элемент среза или <code>None</code> для пустого.`, a: `<pre class="code" data-lang="rust">fn last(xs: &[i32]) -> Option<i32> {
    if xs.is_empty() { None } else { Some(xs[xs.len() - 1]) }
}</pre> В стандартной библиотеке есть <code>xs.last()</code>, возвращающий <code>Option&lt;&amp;i32&gt;</code>.` },
    { q: `Перепиши через <code>if let</code>:<pre class="code" data-lang="rust">match config.port {
    Some(p) => println!("порт {p}"),
    None => {}
}</pre>`, a: `<pre class="code" data-lang="rust">if let Some(p) = config.port {
    println!("порт {p}");
}</pre>` },
    { q: `Классифицируй оценку от 1 до 5 словами через <code>match</code> с диапазонами.`, a: `<pre class="code" data-lang="rust">let word = match mark {
    5 => "отлично",
    4 => "хорошо",
    3 => "удовлетворительно",
    1..=2 => "плохо",
    _ => "нет такой оценки",
};</pre>` },
    { q: `Получи длину первого слова строки или 0 одной цепочкой методов.`, a: `<pre class="code" data-lang="rust">let n = s.split_whitespace().next().map(|w| w.chars().count()).unwrap_or(0);</pre>` }
  ],
  q: [
    { q: `Вариант enum в Rust может содержать данные?`, o: [`нет`, `да, свои у каждого варианта`, `только числа`, `только один вариант`], a: 1, e: `Алгебраические типы.` },
    { q: `<code>match</code> без покрытия всех вариантов:`, o: [`работает`, `не компилируется`, `паника`, `возвращает None`], a: 1, e: `Полнота.` },
    { q: `Отсутствие значения в Rust выражают через:`, o: [`<code>null</code>`, `<code>Option&lt;T&gt;</code>`, `<code>0</code>`, `<code>void</code>`], a: 1, e: `Some или None.` },
    { q: `Шаблон «всё остальное»:`, o: [`<code>*</code>`, `<code>_</code>`, `<code>else</code>`, `<code>default</code>`], a: 1, e: `Подчёркивание.` },
    { q: `<code>None.unwrap()</code>:`, o: [`возвращает 0`, `паника`, `ошибка компиляции`, `возвращает None`], a: 1, e: `Аварийная остановка.` }
  ],
  s: [
    `<code>enum</code>: варианты с данными — размеченное объединение, проверяемое языком.`,
    `<code>match</code> — выражение; ветки сверху вниз; обязательно покрывает все варианты.`,
    `Шаблоны: <code>|</code>, диапазоны <code>..=</code>, охрана <code>if</code>, <code>_</code>.`,
    `<code>Option&lt;T&gt;</code> вместо null: <code>Some(v)</code> или <code>None</code>.`,
    `<code>if let</code>, <code>let else</code>, <code>map</code>, <code>unwrap_or</code>, <code>and_then</code>.`,
    `Делай недопустимые состояния непредставимыми.`
  ]
});
