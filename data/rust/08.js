L('rust', 8, {
  m: 45,
  intro: 'Контрольная точка первой половины курса. Напишем консольный конвертер единиц: программа читает строки вида «100 c f» или «5 km mi», переводит значение и печатает результат, а на неверный ввод отвечает понятным сообщением. В проекте пригодятся функции, владение и заимствование, строки и срезы, структуры с методами. Сначала попробуй сам, потом сверься с разбором.',
  intro2: 'Сэмпай, сегодня ты пишешь первую полезную программу на Rust ♡ И она не упадёт от неверного ввода, потому что мы аккуратно проверим каждое число. Компилятор поможет, а я подбодрю!',
  goals: [
    'Читать строки из стандартного ввода до конца',
    'Разбирать ввод на части и преобразовывать числа с обработкой ошибок',
    'Организовать код в структуры и функции',
    'Проверить программу на корректном и некорректном вводе'
  ],
  c: `
<h3>Задание</h3>
<ul class="ex-l">
<li>Каждая строка ввода: <b>значение</b>, <b>из какой единицы</b>, <b>в какую</b>.</li>
<li>Поддерживаемые пары: температура <code>c</code> ↔ <code>f</code>, длина <code>km</code> ↔ <code>mi</code>, масса <code>kg</code> ↔ <code>lb</code>.</li>
<li>Результат с двумя знаками после запятой: <code>100.00 c = 212.00 f</code>.</li>
<li>Неверное число, неизвестная пара или неверный формат — сообщение в stderr с номером строки, программа продолжает работу.</li>
<li>Пустые строки пропускаются.</li>
</ul>

<h3>Решение</h3>
<pre class="code" data-lang="rust">use std::io::{self, BufRead};

struct Conversion {
    from: &'static str,
    to: &'static str,
    convert: fn(f64) -> f64,          // указатель на функцию
}

static TABLE: [Conversion; 6] = [
    Conversion { from: "c",  to: "f",  convert: |x| x * 9.0 / 5.0 + 32.0 },
    Conversion { from: "f",  to: "c",  convert: |x| (x - 32.0) * 5.0 / 9.0 },
    Conversion { from: "km", to: "mi", convert: |x| x / 1.609_344 },
    Conversion { from: "mi", to: "km", convert: |x| x * 1.609_344 },
    Conversion { from: "kg", to: "lb", convert: |x| x / 0.453_592_37 },
    Conversion { from: "lb", to: "kg", convert: |x| x * 0.453_592_37 },
];

fn find(from: &str, to: &str) -> Option<&'static Conversion> {
    TABLE.iter().find(|c| c.from == from && c.to == to)
}

fn process(line: &str) -> Result<String, String> {
    let parts: Vec<&str> = line.split_whitespace().collect();
    if parts.len() != 3 {
        return Err(format!("ожидалось 3 части, получено {}", parts.len()));
    }
    let value: f64 = parts[0]
        .parse()
        .map_err(|_| format!("не число: {}", parts[0]))?;
    let (from, to) = (parts[1].to_lowercase(), parts[2].to_lowercase());
    let conv = find(&from, &to).ok_or_else(|| format!("неизвестная пара: {from} → {to}"))?;
    Ok(format!("{:.2} {} = {:.2} {}", value, from, (conv.convert)(value), to))
}

fn main() {
    let stdin = io::stdin();
    for (n, line) in stdin.lock().lines().enumerate() {
        let line = line.expect("ошибка чтения");
        if line.trim().is_empty() {
            continue;
        }
        match process(&line) {
            Ok(text) => println!("{text}"),
            Err(e) => eprintln!("строка {}: {e}", n + 1),
        }
    }
}</pre>
<p>Здесь впервые встречаются <code>Option</code>, <code>Result</code>, <code>match</code> и оператор <code>?</code> — подробно мы разберём их в уроках 9 и 10. Пока достаточно понимать: <code>process</code> возвращает либо готовую строку <code>Ok</code>, либо описание ошибки <code>Err</code>, а <code>?</code> досрочно возвращает ошибку, если она произошла.</p>
<div class="warn"><p>Таблица объявлена как <code>static</code>, а не <code>const</code>. Константа подставляется в каждое место использования как новое временное значение, а <code>static</code> существует в одном экземпляре всё время работы программы — поэтому на её элементы можно возвращать ссылки с временем жизни <code>'static</code>. И запусти <code>cargo clippy</code>: он подсказал бы, например, заменить <code>ok_or(format!(...))</code> на ленивый <code>ok_or_else</code>.</p></div>

<h3>Проверка</h3>
<pre class="code" data-lang="sh">$ cargo run
100 c f
100.00 c = 212.00 f
-40 F c
-40.00 f = -40.00 c
abc km mi
строка 3: не число: abc
5 km kg
строка 4: неизвестная пара: km → kg
$ printf "1 mi km\\n2 kg lb\\n" | cargo run -q</pre>
<div class="ichika">Обрати внимание на <code>-40</code> ♡ Это единственная температура, одинаковая по Цельсию и Фаренгейту! Хороший тест — если твоя программа выдаёт −40 = −40, формулы верны.</div>

<h3>Вопросы для самопроверки</h3>
<ol>
<li>Почему <code>process</code> принимает <code>&amp;str</code>, а не <code>String</code>?</li>
<li>Что хранит поле <code>convert</code> и почему туда можно записать замыкание без захвата?</li>
<li>Зачем <code>to_lowercase</code> для единиц?</li>
<li>Почему программа не падает на неверной строке, а продолжает работу?</li>
</ol>
<div class="ayano">Посмотри, как устроена обработка ошибок: функция <code>process</code> не печатает и не завершает программу, она лишь возвращает результат. Решение, что делать с ошибкой, принимает <code>main</code>. Такое разделение делает функцию тестируемой: можно вызвать её со строкой и проверить ответ, не перехватывая вывод.</div>
`,
  p: [
    { q: `Ответь на вопрос 1.`, a: `Функция только читает строку; <code>&amp;str</code> позволяет передать и <code>&amp;String</code>, и литерал, не перемещая владение и не копируя данные.` },
    { q: `Ответь на вопрос 2.`, a: `Указатель на функцию <code>fn(f64) -&gt; f64</code>. Замыкание, которое ничего не захватывает из окружения, можно привести к обычному указателю на функцию.` },
    { q: `Добавь пару метров и футов (1 фут = 0.3048 м).`, a: `Добавь в таблицу две записи и увеличь размер массива до 8: <pre class="code" data-lang="rust">Conversion { from: "m",  to: "ft", convert: |x| x / 0.3048 },
Conversion { from: "ft", to: "m",  convert: |x| x * 0.3048 },</pre>` },
    { q: `Напиши тест для <code>process</code>.`, a: `<pre class="code" data-lang="rust">#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn celsius_to_fahrenheit() {
        assert_eq!(process("100 c f").unwrap(), "100.00 c = 212.00 f");
    }
    #[test]
    fn bad_number() {
        assert!(process("x c f").is_err());
    }
}</pre> Запуск: <code>cargo test</code>.` },
    { q: `Как поддержать слитную запись «100c f»?`, a: `Разделить первое слово на числовую часть и буквы: найти позицию первой буквы через <code>find(|c: char| c.is_alphabetic())</code> и разрезать срезами по ней.` },
    { q: `Почему здесь используется <code>eprintln!</code>, а не <code>println!</code>?`, a: `Ошибки идут в поток stderr, а результаты — в stdout. Так при перенаправлении вывода в файл туда попадут только результаты, а ошибки останутся видны в терминале.` }
  ],
  q: [
    { q: `Чтение строк из stdin:`, o: [`<code>stdin().lines()</code> через <code>BufRead</code>`, `<code>scanf</code>`, `<code>input()</code>`, `<code>read_all</code>`], a: 0, e: `BufRead.` },
    { q: `<code>"3.5".parse::&lt;f64&gt;()</code> возвращает:`, o: [`<code>f64</code>`, `<code>Result&lt;f64, _&gt;</code>`, `<code>Option&lt;f64&gt;</code>`, `строку`], a: 1, e: `Может не получиться.` },
    { q: `Формат с двумя знаками после запятой:`, o: [`<code>{:2}</code>`, `<code>{:.2}</code>`, `<code>%.2f</code>`, `<code>{.2}</code>`], a: 1, e: `Точность.` },
    { q: `Ошибки печатают макросом:`, o: [`<code>println!</code>`, `<code>eprintln!</code>`, `<code>panic!</code> всегда`, `<code>dbg!</code>`], a: 1, e: `stderr.` },
    { q: `Линтер Rust:`, o: [`<code>cargo fmt</code>`, `<code>cargo clippy</code>`, `<code>rustup</code>`, `<code>cargo doc</code>`], a: 1, e: `Clippy.` }
  ],
  s: [
    `Чтение строк: <code>io::stdin().lock().lines()</code>.`,
    `Разбор: <code>split_whitespace</code>, <code>parse</code>, <code>to_lowercase</code>.`,
    `Таблица преобразований — массив структур с указателями на функции.`,
    `Функция возвращает <code>Result</code>, а решение об ошибке принимает <code>main</code>.`,
    `Ошибки — в stderr с номером строки; программа продолжает работу.`,
    `Тесты <code>#[test]</code> и <code>cargo clippy</code> — часть решения.`
  ]
});
