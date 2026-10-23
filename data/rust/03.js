L('rust', 3, {
  m: 40,
  intro: 'Rust — язык, ориентированный на выражения: почти любая конструкция возвращает значение, включая if, блоки и даже циклы. Сегодня научимся писать функции с явными типами параметров и результата, поймём разницу между выражением и инструкцией и изучим управление потоком: if, loop, while и for с диапазонами.',
  intro2: 'Сэмпай, в Rust даже if умеет возвращать значение ♡ Не нужно заводить переменную, а потом присваивать её в двух ветках — просто let x = if ... else ... И точка с запятой здесь не формальность: она превращает выражение в инструкцию!',
  goals: [
    'Объявлять функции с типами параметров и результата',
    'Различать выражения и инструкции и возвращать значение без return',
    'Использовать if как выражение',
    'Писать циклы loop, while и for с диапазонами и метками'
  ],
  c: `
<h3>Функции</h3>
<pre class="code" data-lang="rust">fn add(a: i32, b: i32) -> i32 {
    a + b                 // последнее выражение без точки с запятой — результат
}

fn abs_diff(a: i32, b: i32) -> i32 {
    if a > b {
        return a - b;     // досрочный возврат
    }
    b - a
}

fn greet(name: &str) {    // нет результата: тип () — «пустой кортеж»
    println!("Привет, {name}!");
}

fn main() {
    println!("{}", add(2, 3));
    greet("Kiyotaka");
}</pre>
<p>Типы параметров указываются всегда, тип результата — после <code>-&gt;</code>. Функции можно объявлять в любом месте файла: порядок не важен, прототипы не нужны. Имена функций и переменных пишут в стиле snake case: строчными буквами через подчёркивание.</p>

<h3>Выражения и инструкции</h3>
<p><b>Выражение</b> вычисляет значение: <code>5</code>, <code>a + b</code>, вызов функции, блок <code>{ }</code>. <b>Инструкция</b> выполняет действие и значения не возвращает: <code>let x = 5;</code>. Точка с запятой превращает выражение в инструкцию.</p>
<pre class="code" data-lang="rust">let y = {
    let x = 3;
    x * x + 1             // значение блока: 10
};

fn broken(a: i32) -> i32 {
    a + 1;                // ошибка: точка с запятой — функция возвращает (), а не i32
}</pre>
<div class="ichika">Компилятор в этом случае подскажет: «remove this semicolon to return this value» ♡ Лишняя точка с запятой в конце функции — самая частая ошибка новичков в Rust. Теперь ты её не допустишь!</div>

<h3>if как выражение</h3>
<pre class="code" data-lang="rust">let score = 78;
let grade = if score >= 90 {
    'A'
} else if score >= 70 {
    'B'
} else {
    'C'
};                                  // обе ветки обязаны иметь один тип

// if score { }                     // ошибка: условие должно быть bool, не число</pre>
<p>Условие <code>if</code> обязано быть <code>bool</code> — никаких «ненулевое значит истина», как в C. Скобки вокруг условия не нужны, а фигурные скобки обязательны.</p>

<h3>Циклы</h3>
<pre class="code" data-lang="rust">// loop — бесконечный цикл, может вернуть значение через break
let mut n = 1;
let first_big = loop {
    n *= 3;
    if n > 100 {
        break n;                   // результат цикла: 243
    }
};

// while — пока условие истинно
let mut countdown = 3;
while countdown > 0 {
    println!("{countdown}...");
    countdown -= 1;
}

// for — по диапазону или коллекции
for i in 1..=5 { print!("{i} "); }          // 1 2 3 4 5 (включая 5)
for i in (0..10).step_by(3) { print!("{i} "); }   // 0 3 6 9
for i in (1..4).rev() { print!("{i} "); }   // 3 2 1
let names = ["Kiyotaka", "Ichika"];
for name in names { println!("{name}"); }
for (i, name) in names.iter().enumerate() { println!("{i}: {name}"); }</pre>
<div class="tbl"><table><thead><tr><th>Диапазон</th><th>Значения</th></tr></thead><tbody>
<tr><td><code>0..5</code></td><td>0, 1, 2, 3, 4 — без правой границы</td></tr>
<tr><td><code>0..=5</code></td><td>0…5 — включая правую границу</td></tr>
</tbody></table></div>

<h3>Метки циклов</h3>
<pre class="code" data-lang="rust">'outer: for i in 1..10 {
    for j in 1..10 {
        if i * j == 42 {
            println!("{i} × {j} = 42");
            break 'outer;          // выйти из внешнего цикла
        }
    }
}</pre>
<div class="ayano">Цикл <code>for</code> по коллекции или диапазону — основной в Rust. Он не может выйти за границу и не требует ручного счётчика. Индексный цикл <code>while i &lt; len</code> в Rust пишут редко: если тебе понадобился индекс, используй <code>enumerate</code>. Меньше ручных индексов — меньше ошибок на единицу.</div>
`,
  p: [
    { q: `Напиши функцию <code>is_even(n: i32) -&gt; bool</code> без <code>return</code>.`, a: `<pre class="code" data-lang="rust">fn is_even(n: i32) -> bool {
    n % 2 == 0
}</pre>` },
    { q: `Почему функция не компилируется?<pre class="code" data-lang="rust">fn square(x: i32) -> i32 {
    x * x;
}</pre>`, a: `Точка с запятой превращает выражение в инструкцию, и функция возвращает <code>()</code>, а не <code>i32</code>. Нужно убрать <code>;</code>.` },
    { q: `Напиши FizzBuzz от 1 до 15 с <code>if</code> как выражением.`, a: `<pre class="code" data-lang="rust">for i in 1..=15 {
    let s = if i % 15 == 0 {
        "FizzBuzz".to_string()
    } else if i % 3 == 0 {
        "Fizz".to_string()
    } else if i % 5 == 0 {
        "Buzz".to_string()
    } else {
        i.to_string()
    };
    println!("{s}");
}</pre>` },
    { q: `Найди первую степень двойки, большую 1000, с помощью <code>loop</code> и <code>break</code> со значением.`, a: `<pre class="code" data-lang="rust">let mut p = 1;
let result = loop {
    p *= 2;
    if p > 1000 { break p; }
};   // 1024</pre>` },
    { q: `Напиши рекурсивную функцию факториала для <code>u64</code>.`, a: `<pre class="code" data-lang="rust">fn factorial(n: u64) -> u64 {
    if n <= 1 { 1 } else { n * factorial(n - 1) }
}</pre>` },
    { q: `Выведи элементы массива с их номерами, начиная с 1.`, a: `<pre class="code" data-lang="rust">for (i, x) in arr.iter().enumerate() {
    println!("{}. {}", i + 1, x);
}</pre>` }
  ],
  q: [
    { q: `Результат функции в Rust — это:`, o: [`всегда return`, `последнее выражение без точки с запятой`, `первая строка`, `глобальная переменная`], a: 1, e: `Или явный return.` },
    { q: `Условие <code>if</code> должно иметь тип:`, o: [`любой числовой`, `<code>bool</code>`, `<code>i32</code>`, `любой`], a: 1, e: `Без неявных преобразований.` },
    { q: `<code>1..=3</code> даёт:`, o: [`1, 2`, `1, 2, 3`, `0, 1, 2, 3`, `2, 3`], a: 1, e: `Включая 3.` },
    { q: `Бесконечный цикл с возвратом значения:`, o: [`<code>while true</code>`, `<code>loop</code> с <code>break значение</code>`, `<code>for</code>`, `<code>repeat</code>`], a: 1, e: `loop.` },
    { q: `Функция без результата возвращает тип:`, o: [`<code>void</code>`, `<code>()</code>`, `<code>null</code>`, `<code>None</code>`], a: 1, e: `Пустой кортеж.` }
  ],
  s: [
    `<code>fn name(a: T) -&gt; R</code>; последнее выражение — результат.`,
    `Точка с запятой превращает выражение в инструкцию.`,
    `<code>if</code> — выражение; условие строго <code>bool</code>.`,
    `<code>loop</code> с <code>break значение</code>, <code>while</code>, <code>for</code> по диапазону или коллекции.`,
    `Диапазоны: <code>a..b</code> без b, <code>a..=b</code> с b; <code>rev</code>, <code>step_by</code>, <code>enumerate</code>.`,
    `Метки <code>'outer</code> для выхода из вложенных циклов.`
  ]
});
