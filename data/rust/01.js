L('rust', 1, {
  m: 35,
  intro: 'Rust — современный системный язык, который сочетает скорость C и C++ с безопасностью памяти. Компилятор Rust проверяет владение и заимствование данных и не пропускает программы с висячими указателями, гонками данных и двойным освобождением. На Rust пишут части ядра Linux, браузеров, облачной инфраструктуры и инструменты командной строки. Начнём с установки и первой программы.',
  intro2: 'Сэмпай, компилятор Rust — строгий, но заботливый учитель ♡ Он не даст сдать работу с ошибкой памяти, зато объяснит, где ошибка и как её исправить. Сначала будет казаться, что он придирается. Потом поймёшь, что он спас тебя от бессонных ночей с отладчиком!',
  goals: [
    'Установить Rust через rustup и проверить установку',
    'Создать проект через cargo, собрать и запустить его',
    'Разобрать структуру первой программы и макрос println',
    'Читать сообщения компилятора Rust'
  ],
  c: `
<h3>Установка</h3>
<pre class="code" data-lang="sh">$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
$ rustc --version
rustc 1.xx.0
$ cargo --version</pre>
<p><b>rustup</b> устанавливает и обновляет инструменты Rust: компилятор <code>rustc</code>, менеджер проектов и пакетов <code>cargo</code>, стандартную библиотеку и документацию (<code>rustup doc</code>). Команда установки скачивает и запускает скрипт — перед запуском скриптов из интернета убедись, что адрес официальный: <code>rustup.rs</code>. В Windows удобнее работать в WSL.</p>

<h3>Первый проект</h3>
<pre class="code" data-lang="sh">$ cargo new hello
$ cd hello
$ tree
.
├── Cargo.toml
└── src
    └── main.rs
$ cargo run
   Compiling hello v0.1.0
    Finished dev [unoptimized + debuginfo]
     Running target/debug/hello
Hello, world!</pre>
<pre class="code" data-lang="rust">fn main() {
    println!("Hello, world!");
}</pre>
<div class="tbl"><table><thead><tr><th>Элемент</th><th>Смысл</th></tr></thead><tbody>
<tr><td><code>fn main()</code></td><td>точка входа программы</td></tr>
<tr><td><code>println!</code></td><td>макрос вывода строки; восклицательный знак — признак макроса</td></tr>
<tr><td><code>;</code></td><td>конец инструкции</td></tr>
<tr><td><code>Cargo.toml</code></td><td>описание проекта: имя, версия, зависимости</td></tr>
</tbody></table></div>
<pre class="code" data-lang="toml">[package]
name = "hello"
version = "0.1.0"
edition = "2021"

[dependencies]</pre>

<h3>Команды cargo</h3>
<div class="tbl"><table><thead><tr><th>Команда</th><th>Что делает</th></tr></thead><tbody>
<tr><td><code>cargo build</code></td><td>собрать отладочную версию в <code>target/debug</code></td></tr>
<tr><td><code>cargo run</code></td><td>собрать и запустить</td></tr>
<tr><td><code>cargo check</code></td><td>быстро проверить код без сборки исполняемого файла</td></tr>
<tr><td><code>cargo build --release</code></td><td>оптимизированная сборка в <code>target/release</code></td></tr>
<tr><td><code>cargo test</code></td><td>запустить тесты</td></tr>
<tr><td><code>cargo fmt</code>, <code>cargo clippy</code></td><td>форматирование и линтер</td></tr>
</tbody></table></div>
<div class="ichika">Мой совет ♡ Пока пишешь код, запускай <code>cargo check</code> — он в разы быстрее полной сборки. А перед коммитом — <code>cargo fmt</code> и <code>cargo clippy</code>. Clippy знает сотни советов, как сделать код идиоматичнее!</div>

<h3>Вывод и форматирование</h3>
<pre class="code" data-lang="rust">fn main() {
    let name = "Kiyotaka";
    let score = 87;
    println!("{} набрал {} баллов", name, score);
    println!("{name} набрал {score} баллов");          // имена прямо в строке
    println!("{:>8}|{:<8}|{:^8}", "right", "left", "mid"); // выравнивание
    println!("{:.2}", 3.14159);                        // 3.14
    println!("{:?}", vec![1, 2, 3]);                   // отладочный вывод: [1, 2, 3]
    eprintln!("это в stderr");
}</pre>
<p>Комментарии пишутся через <code>//</code>. Формат <code>{:?}</code> выводит значение в отладочном виде — работает для большинства стандартных типов и для своих, помеченных <code>#[derive(Debug)]</code>.</p>

<h3>Ошибки компилятора</h3>
<pre class="code" data-lang="txt">error[E0425]: cannot find value 'scor' in this scope
 --> src/main.rs:4:30
  |
4 |     println!("{}", scor);
  |                    ^^^^ help: a local variable with a similar name exists: 'score'</pre>
<p>Сообщения Rust подробные: код ошибки, точное место, подсказка исправления. Пояснение к любому коду — <code>rustc --explain E0425</code>. Читай сообщения целиком: в большинстве случаев решение уже написано в них.</p>
<div class="ayano">Rust учат дольше, чем Python, потому что компилятор требует продумать владение данными заранее. Но эти требования — не бюрократия: каждая отклонённая программа содержала бы ошибку, которую в C пришлось бы искать в отладчике. Воспринимай компилятор как напарника по ревью, который никогда не устаёт.</div>
`,
  p: [
    { q: `Создай проект <code>greeter</code>, который выводит «Привет, Rust!», и запусти его.`, a: `<pre class="code" data-lang="sh">$ cargo new greeter
$ cd greeter</pre> В <code>src/main.rs</code>: <pre class="code" data-lang="rust">fn main() {
    println!("Привет, Rust!");
}</pre> Затем <code>cargo run</code>.` },
    { q: `Чем <code>cargo check</code> отличается от <code>cargo build</code>?`, a: `<code>check</code> только проверяет код (типы, заимствования) без генерации машинного кода — это намного быстрее. <code>build</code> создаёт исполняемый файл.` },
    { q: `Выведи число π с четырьмя знаками после запятой.`, a: `<pre class="code" data-lang="rust">println!("{:.4}", std::f64::consts::PI);   // 3.1416</pre>` },
    { q: `Почему <code>println</code> пишется с восклицательным знаком?`, a: `Это макрос, а не функция: он разворачивается при компиляции и проверяет строку формата и число аргументов.` },
    { q: `Где лежит оптимизированный исполняемый файл после <code>cargo build --release</code>?`, a: `В <code>target/release/</code> — например, <code>target/release/hello</code>.` },
    { q: `Выведи таблицу из имени и балла, выровненную по ширине 10 символов.`, a: `<pre class="code" data-lang="rust">println!("{:<10}{:>10}", "Имя", "Балл");
println!("{:<10}{:>10}", "Kiyotaka", 87);
println!("{:<10}{:>10}", "Ichika", 95);</pre>` }
  ],
  q: [
    { q: `Менеджер проектов и пакетов Rust:`, o: [`<code>pip</code>`, `<code>cargo</code>`, `<code>npm</code>`, `<code>make</code>`], a: 1, e: `cargo.` },
    { q: `Файл с описанием проекта и зависимостями:`, o: [`<code>package.json</code>`, `<code>Cargo.toml</code>`, `<code>Makefile</code>`, `<code>main.rs</code>`], a: 1, e: `TOML.` },
    { q: `Восклицательный знак в <code>println!</code> означает:`, o: [`важность`, `макрос`, `отрицание`, `небезопасный код`], a: 1, e: `Макрос.` },
    { q: `Быстрая проверка без сборки:`, o: [`<code>cargo run</code>`, `<code>cargo check</code>`, `<code>cargo new</code>`, `<code>cargo fmt</code>`], a: 1, e: `check.` },
    { q: `Отладочный вывод значения:`, o: [`<code>{}</code>`, `<code>{:?}</code>`, `<code>%d</code>`, `<code>{debug}</code>`], a: 1, e: `Debug.` }
  ],
  s: [
    `rustup ставит <code>rustc</code>, <code>cargo</code> и документацию.`,
    `<code>cargo new</code>, <code>run</code>, <code>check</code>, <code>build --release</code>, <code>test</code>, <code>fmt</code>, <code>clippy</code>.`,
    `<code>fn main()</code> — точка входа; <code>println!</code> — макрос.`,
    `Формат: <code>{}</code>, <code>{name}</code>, <code>{:.2}</code>, <code>{:?}</code>, выравнивание.`,
    `Сообщения компилятора подробные; <code>rustc --explain</code>.`,
    `Компилятор — напарник по ревью, а не противник.`
  ]
});
