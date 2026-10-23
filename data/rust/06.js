L('rust', 6, {
  m: 40,
  intro: 'В Rust два основных строковых типа. String — владеющая, изменяемая строка в куче. str, обычно в виде ссылки &str, — заимствованный кусок текста: литерал в программе или часть другой строки. Обе всегда содержат корректный UTF-8. Сегодня разберёмся, когда какой использовать, научимся работать со срезами строк и массивов и поймём, почему строку нельзя индексировать числом.',
  intro2: 'Сэмпай, String — это твоя тетрадь, в которую можно дописывать ♡ А &str — это закладка на нужные строчки в чьей-то тетради или в учебнике. Закладку можно показать кому угодно, но писать через неё нельзя!',
  goals: [
    'Различать String и &str и выбирать тип параметров функций',
    'Создавать срезы строк, массивов и векторов',
    'Работать с UTF-8: символы, байты и безопасные границы',
    'Использовать основные методы строк'
  ],
  c: `
<h3>String и &amp;str</h3>
<div class="tbl"><table><thead><tr><th></th><th><code>String</code></th><th><code>&amp;str</code></th></tr></thead><tbody>
<tr><td>Владение</td><td>владеет данными</td><td>заимствует</td></tr>
<tr><td>Изменяемость</td><td>можно дописывать</td><td>только чтение</td></tr>
<tr><td>Где данные</td><td>в куче</td><td>где угодно: в бинарнике, в чужой <code>String</code></td></tr>
<tr><td>Пример</td><td><code>String::from("hi")</code></td><td><code>"hi"</code>, <code>&amp;s[0..2]</code></td></tr>
</tbody></table></div>
<pre class="code" data-lang="rust">let literal: &str = "Ayanokoji";             // литерал — &'static str
let mut owned: String = String::from("Kiyotaka");
owned.push(' ');
owned.push_str(literal);                      // дописать &str
let also = "Ichika".to_string();              // &str → String
let view: &str = &owned;                      // String → &str (дёшево)
let joined = format!("{owned} и {also}");     // склейка без потери владения</pre>

<h3>Какой тип принимать в функции</h3>
<pre class="code" data-lang="rust">fn shout(s: &str) -> String {      // принимает и String, и литералы
    s.to_uppercase()
}

let a = String::from("hi");
shout(&a);          // &String автоматически превращается в &str
shout("hello");     // литерал</pre>
<div class="ichika">Правило простое ♡ Функция только читает текст — параметр <code>&amp;str</code>. Функция должна сохранить или вернуть свою строку — <code>String</code>. Так функцию можно вызывать с чем угодно, не создавая лишних копий!</div>

<h3>Срезы</h3>
<pre class="code" data-lang="rust">let s = String::from("hello world");
let hello: &str = &s[0..5];        // байты с 0 по 4
let world = &s[6..];               // до конца
let all = &s[..];

let nums = [10, 20, 30, 40, 50];
let mid: &[i32] = &nums[1..4];     // [20, 30, 40]

fn sum(xs: &[i32]) -> i32 {        // срез принимает и массивы, и векторы
    xs.iter().sum()
}
sum(&nums);
sum(&vec![1, 2, 3]);</pre>
<p><b>Срез</b> — ссылка на непрерывную часть последовательности: указатель и длина. Срез заимствует данные, поэтому пока он жив, исходную строку нельзя изменить. Параметр <code>&amp;[T]</code> — универсальный способ принять «последовательность элементов».</p>

<h3>UTF-8 и индексы</h3>
<pre class="code" data-lang="rust">let word = String::from("Привет");
println!("{}", word.len());              // 12 — байты, не буквы
// let c = word[0];                      // ошибка: строки нельзя индексировать числом
println!("{}", word.chars().count());    // 6 — символы
let first: char = word.chars().next().unwrap();   // 'П'
for (i, c) in word.char_indices() { print!("{i}:{c} "); }   // 0:П 2:р 4:и ...
// let bad = &word[0..1];                // паника: граница внутри символа</pre>
<div class="warn"><p>Срез строки задаётся в <b>байтах</b>, и границы должны приходиться на начало символов. Срез посреди двухбайтовой буквы вызывает панику. Для работы с символами используй <code>chars()</code>, <code>char_indices()</code> или безопасный <code>word.get(0..2)</code>, возвращающий <code>None</code> при неверной границе.</p></div>

<h3>Полезные методы</h3>
<div class="tbl"><table><thead><tr><th>Метод</th><th>Что делает</th></tr></thead><tbody>
<tr><td><code>trim</code>, <code>to_lowercase</code>, <code>to_uppercase</code></td><td>обрезать пробелы, сменить регистр</td></tr>
<tr><td><code>contains</code>, <code>starts_with</code>, <code>find</code></td><td>поиск</td></tr>
<tr><td><code>split</code>, <code>split_whitespace</code>, <code>lines</code></td><td>разбить на части (итератор)</td></tr>
<tr><td><code>replace</code></td><td>замена, возвращает новую <code>String</code></td></tr>
<tr><td><code>parse</code></td><td>преобразовать в число и другие типы</td></tr>
</tbody></table></div>
<pre class="code" data-lang="rust">let line = "  Kiyotaka 87 92 78  ";
let parts: Vec<&str> = line.split_whitespace().collect();   // ["Kiyotaka", "87", "92", "78"]
let name = parts[0];
let total: i32 = parts[1..].iter().map(|p| p.parse::<i32>().unwrap()).sum();
println!("{name}: {total}");</pre>
<div class="ayano">Различие между <code>String</code> и <code>&amp;str</code> — частный случай общего принципа Rust: владение и заимствование видны в типе. Посмотрев на сигнатуру <code>fn f(s: &amp;str) -&gt; String</code>, ты точно знаешь: функция читает переданный текст и отдаёт новую строку, за которую теперь отвечаешь ты.</div>
`,
  p: [
    { q: `Напиши функцию, возвращающую первое слово строки как срез.`, a: `<pre class="code" data-lang="rust">fn first_word(s: &str) -> &str {
    s.split_whitespace().next().unwrap_or("")
}</pre>` },
    { q: `Почему <code>"Привет".len()</code> равно 12?`, a: `<code>len</code> возвращает длину в байтах; каждая кириллическая буква в UTF-8 занимает 2 байта. Число символов — <code>chars().count()</code>.` },
    { q: `Переверни строку по символам.`, a: `<pre class="code" data-lang="rust">let rev: String = s.chars().rev().collect();</pre>` },
    { q: `Какой тип параметра выбрать для функции, считающей сумму элементов массива или вектора?`, a: `Срез <code>&amp;[i32]</code>: он принимает и <code>&amp;[i32; N]</code>, и <code>&amp;Vec&lt;i32&gt;</code> без копирования.` },
    { q: `Проверь, является ли строка палиндромом без учёта регистра и пробелов.`, a: `<pre class="code" data-lang="rust">fn is_palindrome(s: &str) -> bool {
    let clean: Vec<char> = s.chars()
        .filter(|c| !c.is_whitespace())
        .flat_map(|c| c.to_lowercase())
        .collect();
    clean.iter().eq(clean.iter().rev())
}</pre>` },
    { q: `Почему этот код не компилируется?<pre class="code" data-lang="rust">let mut s = String::from("hello");
let w = &s[0..2];
s.clear();
println!("{w}");</pre>`, a: `<code>w</code> — срез, заимствующий <code>s</code>. <code>clear</code> требует изменяемого заимствования, пока жива общая ссылка <code>w</code>. Иначе <code>w</code> указывал бы на удалённые данные.` }
  ],
  q: [
    { q: `Владеющая изменяемая строка:`, o: [`<code>&amp;str</code>`, `<code>String</code>`, `<code>char</code>`, `<code>[u8]</code> всегда`], a: 1, e: `String.` },
    { q: `Лучший тип параметра функции, которая только читает текст:`, o: [`<code>String</code>`, `<code>&amp;str</code>`, `<code>&amp;mut String</code>`, `<code>Vec&lt;char&gt;</code>`], a: 1, e: `Универсально.` },
    { q: `<code>s[0]</code> для <code>String</code>:`, o: [`первый символ`, `первый байт`, `ошибка компиляции`, `паника`], a: 2, e: `Индексация запрещена.` },
    { q: `Индексы среза строки измеряются в:`, o: [`символах`, `байтах`, `словах`, `строках`], a: 1, e: `Границы символов!` },
    { q: `Число символов в строке:`, o: [`<code>len()</code>`, `<code>chars().count()</code>`, `<code>size()</code>`, `<code>bytes()</code>`], a: 1, e: `chars.` }
  ],
  s: [
    `<code>String</code> — владеет и растёт; <code>&amp;str</code> — заимствованный текст.`,
    `Параметры для чтения — <code>&amp;str</code> и <code>&amp;[T]</code>.`,
    `Срез — указатель + длина; пока жив, источник не изменить.`,
    `Строки — UTF-8: <code>len</code> в байтах, символы — <code>chars()</code>.`,
    `Индексация строки числом запрещена; срез по неверной границе — паника.`,
    `Методы: <code>trim</code>, <code>split_whitespace</code>, <code>parse</code>, <code>format!</code>.`
  ]
});
