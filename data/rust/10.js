L('rust', 10, {
  m: 45,
  intro: 'В Rust нет исключений. Ошибки делятся на два вида: неисправимые, когда программа не может продолжать работу, — для них есть паника, и ожидаемые, которые вызывающий должен обработать, — для них есть тип Result. Оператор ? делает обработку ошибок короткой, а система типов не даёт молча проигнорировать ошибку. Сегодня научимся создавать свои типы ошибок и строить надёжные функции.',
  intro2: 'Сэмпай, Result — это конверт с ответом ♡ Внутри либо «Ok, вот результат», либо «Err, вот что пошло не так». Нельзя просто взять результат, не открыв конверт. А знак вопроса — это «если там ошибка, передай конверт дальше начальству»!',
  goals: [
    'Различать панику и ошибки Result и выбирать подходящий способ',
    'Обрабатывать Result через match и комбинаторы',
    'Распространять ошибки оператором вопросительного знака',
    'Создавать собственные типы ошибок с Display и From'
  ],
  c: `
<h3>Паника</h3>
<pre class="code" data-lang="rust">fn main() {
    let v = vec![1, 2, 3];
    // v[10];                       // паника: index out of bounds
    // panic!("что-то сломалось");  // явная паника
}</pre>
<p><b>Паника</b> — аварийная остановка потока с сообщением и (по желанию) трассировкой стека: <code>RUST_BACKTRACE=1 cargo run</code>. Её используют для ошибок программиста — нарушенных инвариантов, «невозможных» ситуаций, — а не для ситуаций, которые могут случиться при нормальной работе: файл не найден, пользователь ввёл буквы.</p>

<h3>Result</h3>
<pre class="code" data-lang="rust">// enum Result<T, E> { Ok(T), Err(E) }

use std::fs;

fn main() {
    match fs::read_to_string("config.txt") {
        Ok(text) => println!("прочитано {} байт", text.len()),
        Err(e) => eprintln!("не удалось прочитать config.txt: {e}"),
    }
}</pre>
<p>Функции, которые могут не справиться, возвращают <code>Result</code>. Получить значение, не разобрав возможную ошибку, нельзя. Если же результат вообще проигнорировать, компилятор выдаст предупреждение «unused Result that must be used».</p>

<h3>Оператор ?</h3>
<pre class="code" data-lang="rust">use std::fs;
use std::io;

fn read_number(path: &str) -> Result<i64, String> {
    let text = fs::read_to_string(path).map_err(|e| format!("{path}: {e}"))?;
    let n = text.trim().parse::<i64>().map_err(|e| format!("{path}: не число ({e})"))?;
    Ok(n)
}

fn count_lines(path: &str) -> io::Result<usize> {   // io::Result<T> = Result<T, io::Error>
    let text = fs::read_to_string(path)?;           // ошибка того же типа — просто ?
    Ok(text.lines().count())
}</pre>
<p><code>?</code> после <code>Result</code> означает: если там <code>Ok(v)</code> — взять <code>v</code>; если <code>Err(e)</code> — немедленно вернуть ошибку из текущей функции (преобразовав её через <code>From</code>, если типы отличаются). Работает и с <code>Option</code> в функциях, возвращающих <code>Option</code>.</p>
<div class="ichika">Сравни с C ♡ Там после каждого вызова <code>if (rc &lt; 0) { ... return -1; }</code>, и стоит забыть одну проверку — ошибка потерялась. В Rust один символ <code>?</code> — и ошибка гарантированно уходит наверх. Коротко и надёжно!</div>

<h3>Свой тип ошибки</h3>
<pre class="code" data-lang="rust">use std::fmt;
use std::num::ParseIntError;

#[derive(Debug)]
enum AgeError {
    NotANumber(ParseIntError),
    OutOfRange(i64),
}

impl fmt::Display for AgeError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            AgeError::NotANumber(e) => write!(f, "не число: {e}"),
            AgeError::OutOfRange(n) => write!(f, "возраст {n} вне диапазона 0–150"),
        }
    }
}

impl std::error::Error for AgeError {}

impl From<ParseIntError> for AgeError {     // позволяет ? преобразовывать ошибку
    fn from(e: ParseIntError) -> Self {
        AgeError::NotANumber(e)
    }
}

fn parse_age(s: &str) -> Result<u8, AgeError> {
    let n: i64 = s.trim().parse()?;          // ParseIntError → AgeError через From
    if !(0..=150).contains(&n) {
        return Err(AgeError::OutOfRange(n));
    }
    Ok(n as u8)
}

fn main() -> Result<(), Box<dyn std::error::Error>> {   // main тоже может вернуть Result
    println!("{}", parse_age("17")?);
    match parse_age("200") {
        Ok(a) => println!("{a}"),
        Err(e) => eprintln!("ошибка: {e}"),
    }
    Ok(())
}</pre>
<p><code>Box&lt;dyn std::error::Error&gt;</code> — «любая ошибка»: удобно в <code>main</code> и небольших программах. В библиотеках заводят свой <code>enum</code> ошибок, чтобы вызывающий мог разобрать конкретные случаи. В реальных проектах популярны крейты <code>thiserror</code> (для библиотек) и <code>anyhow</code> (для приложений), которые убирают шаблонный код.</p>
<div class="warn"><p><code>unwrap()</code> и <code>expect()</code> у <code>Result</code> превращают ошибку в панику. Это уместно в тестах, в коротких примерах и там, где ошибка действительно означает баг. Для ввода пользователя, файлов и сети — обрабатывай ошибку.</p></div>
<div class="ayano">Хорошая функция честно сообщает в типе, что может пойти не так. Сигнатура <code>fn parse_age(s: &amp;str) -&gt; Result&lt;u8, AgeError&gt;</code> рассказывает всё: что принимается, что возвращается и какие бывают ошибки. Вызывающий код не может об этом забыть — компилятор не даст.</div>
`,
  p: [
    { q: `Напиши функцию <code>divide(a: f64, b: f64) -&gt; Result&lt;f64, String&gt;</code> с ошибкой при делении на ноль.`, a: `<pre class="code" data-lang="rust">fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err("деление на ноль".to_string())
    } else {
        Ok(a / b)
    }
}</pre>` },
    { q: `Перепиши с оператором <code>?</code>:<pre class="code" data-lang="rust">fn sum_two(a: &str, b: &str) -> Result<i32, std::num::ParseIntError> {
    let x = match a.parse::<i32>() { Ok(v) => v, Err(e) => return Err(e) };
    let y = match b.parse::<i32>() { Ok(v) => v, Err(e) => return Err(e) };
    Ok(x + y)
}</pre>`, a: `<pre class="code" data-lang="rust">fn sum_two(a: &str, b: &str) -> Result<i32, std::num::ParseIntError> {
    Ok(a.parse::<i32>()? + b.parse::<i32>()?)
}</pre>` },
    { q: `Когда уместна паника, а когда <code>Result</code>?`, a: `Паника — для ошибок программиста и нарушенных инвариантов, когда продолжать бессмысленно. <code>Result</code> — для ожидаемых неудач: нет файла, неверный ввод, сбой сети, — которые вызывающий может обработать.` },
    { q: `Почему <code>?</code> в <code>parse_age</code> работает, хотя <code>parse</code> возвращает <code>ParseIntError</code>, а функция — <code>AgeError</code>?`, a: `Для <code>AgeError</code> реализован <code>From&lt;ParseIntError&gt;</code>; оператор <code>?</code> автоматически вызывает это преобразование.` },
    { q: `Прочитай файл и верни сумму чисел по строкам, передавая любые ошибки наверх.`, a: `<pre class="code" data-lang="rust">fn sum_file(path: &str) -> Result<i64, Box<dyn std::error::Error>> {
    let text = std::fs::read_to_string(path)?;
    let mut total = 0;
    for line in text.lines().filter(|l| !l.trim().is_empty()) {
        total += line.trim().parse::<i64>()?;
    }
    Ok(total)
}</pre>` },
    { q: `Как получить трассировку стека при панике?`, a: `<pre class="code" data-lang="sh">$ RUST_BACKTRACE=1 cargo run</pre>` }
  ],
  q: [
    { q: `Ожидаемые ошибки в Rust возвращают через:`, o: [`исключения`, `<code>Result&lt;T, E&gt;</code>`, `глобальный errno`, `<code>panic!</code>`], a: 1, e: `Ok или Err.` },
    { q: `Оператор <code>?</code> при <code>Err(e)</code>:`, o: [`паникует`, `возвращает ошибку из текущей функции`, `игнорирует ошибку`, `повторяет вызов`], a: 1, e: `Распространение.` },
    { q: `Чтобы <code>?</code> преобразовал тип ошибки, нужна реализация:`, o: [`<code>Display</code>`, `<code>From</code>`, `<code>Clone</code>`, `<code>Copy</code>`], a: 1, e: `From.` },
    { q: `Паника уместна при:`, o: [`неверном вводе пользователя`, `нарушенном инварианте программы`, `отсутствии файла`, `сетевой ошибке`], a: 1, e: `Баг программиста.` },
    { q: `«Любая ошибка» в main:`, o: [`<code>Box&lt;dyn std::error::Error&gt;</code>`, `<code>String</code> только`, `<code>Option</code>`, `<code>()</code>`], a: 0, e: `Трейт-объект.` }
  ],
  s: [
    `Паника — неисправимые ошибки программиста; <code>RUST_BACKTRACE=1</code>.`,
    `<code>Result&lt;T, E&gt;</code> — ожидаемые ошибки; игнорировать нельзя.`,
    `<code>?</code> возвращает ошибку наверх и преобразует её через <code>From</code>.`,
    `Свой тип ошибки: <code>enum</code> + <code>Display</code> + <code>Error</code> + <code>From</code>.`,
    `<code>main</code> может возвращать <code>Result</code>; <code>Box&lt;dyn Error&gt;</code> — любая ошибка.`,
    `<code>unwrap</code>/<code>expect</code> — только когда ошибка означает баг.`
  ]
});
