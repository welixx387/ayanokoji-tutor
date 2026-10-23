L('rust', 14, {
  m: 40,
  intro: 'Программа из одного файла main.rs быстро становится неудобной. Rust организует код в модули внутри крейта, а крейты — в пакеты, описанные в Cargo.toml. Сторонние библиотеки подключаются одной строкой из реестра crates.io. А тесты встроены в язык: модульные тесты живут рядом с кодом, интеграционные — в отдельной папке, и всё запускается командой cargo test.',
  intro2: 'Сэмпай, модули — это папки в шкафу, крейт — сам шкаф, а crates.io — огромный магазин готовых шкафов ♡ И тесты в Rust — не отдельная бюрократия, а маленькие функции с пометкой #[test] прямо рядом с кодом. Очень удобно!',
  goals: [
    'Организовывать код в модули и управлять видимостью через pub и use',
    'Разделять проект на библиотеку и исполняемый файл',
    'Подключать зависимости в Cargo.toml',
    'Писать модульные и интеграционные тесты'
  ],
  c: `
<h3>Модули</h3>
<pre class="code" data-lang="rust">mod geometry {
    pub struct Point { pub x: f64, pub y: f64 }

    pub fn distance(a: &Point, b: &Point) -> f64 {
        ((a.x - b.x).powi(2) + (a.y - b.y).powi(2)).sqrt()
    }

    pub mod shapes {
        use super::Point;              // super — родительский модуль
        pub struct Circle { pub center: Point, pub r: f64 }
    }

    fn helper() {}                     // приватная: видна только внутри geometry
}

use geometry::{distance, Point};
use geometry::shapes::Circle;

fn main() {
    let a = Point { x: 0.0, y: 0.0 };
    let b = Point { x: 3.0, y: 4.0 };
    println!("{}", distance(&a, &b));      // 5
    let c = Circle { center: a, r: 1.0 };
    println!("{}", c.r);
}</pre>
<p>Всё в модуле по умолчанию приватно; <code>pub</code> открывает элемент для внешнего кода. У структур видимость задаётся для каждого поля отдельно. <code>use</code> вводит короткие имена; <code>crate::</code> — путь от корня крейта, <code>super::</code> — от родителя, <code>self::</code> — от текущего модуля.</p>

<h3>Модули в файлах</h3>
<pre class="code" data-lang="txt">my_app/
├── Cargo.toml
├── src/
│   ├── main.rs          // исполняемый файл: fn main
│   ├── lib.rs           // библиотека крейта: pub mod geometry;
│   ├── geometry.rs      // содержимое модуля geometry
│   └── geometry/
│       └── shapes.rs    // подмодуль geometry::shapes
└── tests/
    └── integration.rs   // интеграционные тесты</pre>
<p>Строка <code>mod geometry;</code> в <code>lib.rs</code> говорит компилятору подключить файл <code>geometry.rs</code>. Распространённая структура — тонкий <code>main.rs</code>, который разбирает аргументы и вызывает функции из <code>lib.rs</code>. Тогда вся логика доступна тестам и другим программам.</p>

<h3>Cargo.toml и зависимости</h3>
<pre class="code" data-lang="toml">[package]
name = "my_app"
version = "0.1.0"
edition = "2021"

[dependencies]
rand = "0.8"                                    # совместимые версии 0.8.x
serde = { version = "1", features = ["derive"] }

[dev-dependencies]                              # только для тестов
pretty_assertions = "1"</pre>
<pre class="code" data-lang="sh">$ cargo add rand                 # добавить зависимость командой
$ cargo build                    # скачает и соберёт зависимости
$ cargo tree                     # дерево зависимостей
$ cargo doc --open               # документация проекта и зависимостей</pre>
<p>Точные версии всех зависимостей фиксируются в <code>Cargo.lock</code> — его коммитят для приложений, чтобы сборка была воспроизводимой. Перед добавлением крейта посмотри на его популярность, дату обновления и лицензию на crates.io.</p>

<h3>Тесты</h3>
<pre class="code" data-lang="rust">pub fn is_leap(year: u32) -> bool {
    (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
}

#[cfg(test)]                       // компилируется только для cargo test
mod tests {
    use super::*;

    #[test]
    fn regular_leap_year() {
        assert!(is_leap(2024));
    }

    #[test]
    fn century_is_not_leap() {
        assert!(!is_leap(1900));
        assert_eq!(is_leap(2000), true, "2000 делится на 400");
    }

    #[test]
    #[should_panic]
    fn index_out_of_bounds_panics() {
        let v: Vec<i32> = Vec::new();
        let _ = v[0];
    }
}

fn main() {
    println!("{}", is_leap(2026));
}</pre>
<pre class="code" data-lang="sh">$ cargo test
running 3 tests
test tests::regular_leap_year ... ok
test tests::century_is_not_leap ... ok
test tests::index_out_of_bounds_panics - should panic ... ok
$ cargo test leap               # только тесты, в имени которых есть «leap»</pre>
<div class="ichika">Интеграционные тесты в папке <code>tests/</code> видят твой крейт как внешний пользователь ♡ Им доступно только то, что помечено <code>pub</code>. Отличная проверка, что публичный интерфейс удобен!</div>
<div class="ayano">Тесты в Rust дёшевы — пиши их сразу вместе с функцией. Хороший набор покрывает обычный случай, граничные значения и ошибочный ввод. Когда находишь ошибку, сначала напиши тест, который её воспроизводит, потом исправляй. Такой тест навсегда защитит от возвращения той же ошибки.</div>
`,
  p: [
    { q: `Почему вызов <code>geometry::helper()</code> из <code>main</code> не скомпилируется?`, a: `<code>helper</code> объявлена без <code>pub</code> и видна только внутри модуля <code>geometry</code> и его подмодулей.` },
    { q: `Как вынести модуль <code>geometry</code> из <code>main.rs</code> в отдельный файл?`, a: `Перенести содержимое блока в <code>src/geometry.rs</code>, а в <code>main.rs</code> (или <code>lib.rs</code>) оставить строку <code>mod geometry;</code>.` },
    { q: `Напиши тест для функции <code>fn add(a: i32, b: i32) -&gt; i32</code>.`, a: `<pre class="code" data-lang="rust">#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn adds_numbers() {
        assert_eq!(add(2, 3), 5);
        assert_eq!(add(-1, 1), 0);
    }
}</pre>` },
    { q: `Зачем <code>#[cfg(test)]</code> перед модулем тестов?`, a: `Модуль компилируется только при <code>cargo test</code> и не попадает в обычную сборку — меньше размер и время компиляции.` },
    { q: `Добавь зависимость <code>regex</code> версии 1.`, a: `<pre class="code" data-lang="sh">$ cargo add regex</pre> или вручную в <code>Cargo.toml</code>: <pre class="code" data-lang="toml">[dependencies]
regex = "1"</pre>` },
    { q: `Зачем держать логику в <code>lib.rs</code>, а в <code>main.rs</code> оставлять минимум?`, a: `Функции библиотеки доступны интеграционным тестам и другим программам; <code>main.rs</code> только разбирает аргументы, вызывает библиотеку и печатает результат или ошибку.` }
  ],
  q: [
    { q: `Элементы модуля по умолчанию:`, o: [`публичные`, `приватные`, `статические`, `глобальные`], a: 1, e: `Нужен pub.` },
    { q: `Путь от корня крейта начинается с:`, o: [`<code>self::</code>`, `<code>super::</code>`, `<code>crate::</code>`, `<code>root::</code>`], a: 2, e: `crate.` },
    { q: `Файл с точными версиями зависимостей:`, o: [`<code>Cargo.toml</code>`, `<code>Cargo.lock</code>`, `<code>deps.txt</code>`, `<code>lib.rs</code>`], a: 1, e: `Воспроизводимость.` },
    { q: `Функцию-тест помечают атрибутом:`, o: [`<code>#[test]</code>`, `<code>#[check]</code>`, `<code>@test</code>`, `<code>#[cfg]</code>`], a: 0, e: `test.` },
    { q: `Интеграционные тесты лежат в папке:`, o: [`<code>src/</code>`, `<code>tests/</code>`, `<code>target/</code>`, `<code>bin/</code>`], a: 1, e: `tests.` }
  ],
  s: [
    `<code>mod</code> — модуль, <code>pub</code> — видимость, <code>use</code> — короткие имена; <code>crate::</code>, <code>super::</code>.`,
    `<code>mod name;</code> подключает файл <code>name.rs</code>.`,
    `Логика — в <code>lib.rs</code>, тонкий <code>main.rs</code>.`,
    `Зависимости — в <code>Cargo.toml</code>, версии фиксирует <code>Cargo.lock</code>; <code>cargo add</code>.`,
    `Тесты: <code>#[test]</code>, <code>assert!</code>, <code>assert_eq!</code>, <code>#[should_panic]</code>; <code>cargo test</code>.`,
    `Найдя баг — сначала тест, потом исправление.`
  ]
});
