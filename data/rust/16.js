L('rust', 16, {
  m: 45,
  intro: 'Финальная контрольная курса Rust — консольная утилита textstat, которая анализирует текстовые файлы: считает строки, слова и символы и выводит самые частые слова. Проект объединяет всё изученное: аргументы командной строки, чтение файлов, свои типы ошибок с оператором вопросительного знака, коллекции и итераторы, модули, тесты и многопоточную обработку нескольких файлов. Вторая часть урока — вопросы собеседования.',
  intro2: 'Сэмпай, это твой выпускной проект на Rust ♡ Маленькая, но настоящая утилита: она не падает на несуществующем файле, понятно сообщает об ошибках и проверена тестами. А потом я спрошу тебя, как на собеседовании. Готов?',
  goals: [
    'Спроектировать утилиту с библиотекой и тонким main',
    'Обрабатывать ошибки ввода-вывода и аргументов без паники',
    'Применить коллекции, итераторы и потоки к реальной задаче',
    'Ответить на типовые вопросы собеседования по Rust'
  ],
  c: `
<h3>Требования</h3>
<pre class="code" data-lang="sh">$ textstat --top 3 book.txt notes.txt
book.txt: 120 строк, 1840 слов, 10 532 символов
notes.txt: 14 строк, 96 слов, 611 символов
итого: 134 строк, 1936 слов
топ-3: the (88), and (51), of (40)
$ textstat missing.txt
ошибка: missing.txt: No such file or directory (os error 2)
$ echo $?
1</pre>
<ul class="ex-l">
<li>Аргументы: необязательный <code>--top N</code> (по умолчанию 5) и один или больше файлов.</li>
<li>Слова сравниваются без учёта регистра; знаки препинания по краям слова отбрасываются.</li>
<li>Каждый файл обрабатывается в отдельном потоке.</li>
<li>Любая ошибка — сообщение в stderr и код возврата 1, без паники.</li>
</ul>

<h3>Библиотека</h3>
<pre class="code" data-lang="rust">use std::collections::HashMap;
use std::fmt;

#[derive(Debug, Default, Clone)]
pub struct Stats {
    pub lines: usize,
    pub words: usize,
    pub chars: usize,
    pub freq: HashMap<String, usize>,
}

pub fn analyze(text: &str) -> Stats {
    let mut s = Stats { lines: text.lines().count(), chars: text.chars().count(), ..Default::default() };
    for raw in text.split_whitespace() {
        let w = raw.trim_matches(|c: char| !c.is_alphanumeric()).to_lowercase();
        if w.is_empty() { continue; }
        s.words += 1;
        *s.freq.entry(w).or_insert(0) += 1;
    }
    s
}

pub fn merge(total: &mut Stats, part: &Stats) {
    total.lines += part.lines;
    total.words += part.words;
    total.chars += part.chars;
    for (w, n) in &part.freq {
        *total.freq.entry(w.clone()).or_insert(0) += n;
    }
}

pub fn top(stats: &Stats, n: usize) -> Vec<(&str, usize)> {
    let mut v: Vec<(&str, usize)> = stats.freq.iter().map(|(w, c)| (w.as_str(), *c)).collect();
    v.sort_by(|a, b| b.1.cmp(&a.1).then(a.0.cmp(b.0)));   // по частоте, затем по алфавиту
    v.truncate(n);
    v
}

#[derive(Debug)]
pub enum CliError {
    Usage(String),
    Io { path: String, source: std::io::Error },
}

impl fmt::Display for CliError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            CliError::Usage(m) => write!(f, "{m}\\nиспользование: textstat [--top N] ФАЙЛ..."),
            CliError::Io { path, source } => write!(f, "{path}: {source}"),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn counts_words_ignoring_case_and_punctuation() {
        let s = analyze("The cat. the CAT!\\nA dog");
        assert_eq!(s.lines, 2);
        assert_eq!(s.words, 6);
        assert_eq!(s.freq["the"], 2);
        assert_eq!(s.freq["cat"], 2);
    }

    #[test]
    fn top_is_sorted_by_count_then_word() {
        let s = analyze("b a b c a b");
        assert_eq!(top(&s, 2), vec![("b", 3), ("a", 2)]);
    }
}

fn main() {}  // в настоящем проекте этот код лежит в lib.rs, а main — в main.rs</pre>

<h3>Главная программа</h3>
<pre class="code" data-lang="rust">// Stats, analyze, merge, top и CliError — из примера выше (src/lib.rs)
use std::{env, fs, process, thread};

fn parse_args(args: &[String]) -> Result<(usize, Vec<String>), CliError> {
    let mut top_n = 5;
    let mut files = Vec::new();
    let mut it = args.iter();
    while let Some(a) = it.next() {
        if a == "--top" {
            let v = it.next().ok_or_else(|| CliError::Usage("после --top нужно число".into()))?;
            top_n = v.parse().map_err(|_| CliError::Usage(format!("не число: {v}")))?;
        } else {
            files.push(a.clone());
        }
    }
    if files.is_empty() {
        return Err(CliError::Usage("не указаны файлы".into()));
    }
    Ok((top_n, files))
}

fn run() -> Result<(), CliError> {
    let args: Vec<String> = env::args().skip(1).collect();
    let (top_n, files) = parse_args(&args)?;
    let handles: Vec<_> = files.into_iter().map(|path| thread::spawn(move || {
        fs::read_to_string(&path)
            .map(|text| (path.clone(), analyze(&text)))
            .map_err(|source| CliError::Io { path, source })
    })).collect();

    let mut total = Stats::default();
    for h in handles {
        let (path, s) = h.join().expect("поток упал")?;
        println!("{path}: {} строк, {} слов, {} символов", s.lines, s.words, s.chars);
        merge(&mut total, &s);
    }
    println!("итого: {} строк, {} слов", total.lines, total.words);
    let list: Vec<String> = top(&total, top_n).iter().map(|(w, n)| format!("{w} ({n})")).collect();
    println!("топ-{top_n}: {}", list.join(", "));
    Ok(())
}

fn main() {
    if let Err(e) = run() {
        eprintln!("ошибка: {e}");
        process::exit(1);
    }
}</pre>
<div class="ichika">Посмотри на <code>main</code> ♡ Всего четыре строки: запустить, при ошибке сообщить и выйти с кодом 1. Вся логика — в <code>run</code>, который возвращает <code>Result</code> и пользуется знаком вопроса. Это очень распространённый шаблон в Rust-утилитах!</div>
<div class="warn"><p><code>expect("поток упал")</code> здесь допустим: поток паникует только при ошибке программиста, ведь все ожидаемые ошибки возвращаются как <code>Result</code>. Для настоящей утилиты обычно берут крейт <code>clap</code> для разбора аргументов вместо ручного цикла.</p></div>

<h3>Вопросы собеседования</h3>
<div class="tbl"><table><thead><tr><th>Вопрос</th><th>Суть ответа</th></tr></thead><tbody>
<tr><td>Правила владения?</td><td>Один владелец; при выходе из области — drop; присваивание перемещает</td></tr>
<tr><td>Правила заимствования?</td><td>Много <code>&amp;T</code> или одна <code>&amp;mut T</code>; ссылка не переживает данные</td></tr>
<tr><td><code>String</code> и <code>&amp;str</code>?</td><td>Владеющая строка против заимствованного среза UTF-8</td></tr>
<tr><td><code>Option</code> и <code>Result</code>?</td><td>Отсутствие значения и ожидаемая ошибка вместо null и исключений</td></tr>
<tr><td>Что делает <code>?</code></td><td>Возвращает ошибку наверх с преобразованием через <code>From</code></td></tr>
<tr><td>Трейты и обобщения?</td><td>Общее поведение; статическая диспетчеризация против <code>dyn</code></td></tr>
<tr><td><code>Box</code>, <code>Rc</code>, <code>Arc</code>?</td><td>Один владелец в куче; подсчёт ссылок; атомарный подсчёт для потоков</td></tr>
<tr><td>Что такое <code>Send</code> и <code>Sync</code>?</td><td>Можно передать в поток; можно делить ссылку между потоками</td></tr>
<tr><td>Когда нужен <code>unsafe</code>?</td><td>FFI, низкоуровневые структуры; программист берёт ответственность за инварианты</td></tr>
</tbody></table></div>
<div class="ayano">Rust-проекты ценят за то, что они не падают. Поэтому на собеседовании смотрят, как ты обращаешься с ошибками и владением: нет ли лишних <code>clone</code> и <code>unwrap</code>, понятны ли типы. Доведи textstat до конца, добавь README и выложи. Дальше — «The Rust Programming Language» (официальная книга), «Rust by Example» и Rustlings.</div>
`,
  p: [
    { q: `Почему <code>analyze</code> принимает <code>&amp;str</code>, а не путь к файлу?`, a: `Так функцию легко тестировать на строках без файлов, а чтение файла и его ошибки остаются в <code>run</code>. Разделение вычислений и ввода-вывода.` },
    { q: `Почему в потоке используется <code>move</code> и <code>path.clone()</code>?`, a: `Поток должен владеть путём (<code>move</code>). Путь нужен и в успешном результате, и в ошибке; в <code>map</code> берётся копия, а оригинал перемещается в <code>map_err</code>.` },
    { q: `Добавь флаг <code>--min N</code>, исключающий слова короче N символов.`, a: `В <code>parse_args</code> разобрать флаг так же, как <code>--top</code>, передать значение в <code>analyze</code> и пропускать слова, у которых <code>w.chars().count() &lt; min</code>.` },
    { q: `Напиши тест: пустой текст даёт нулевую статистику.`, a: `<pre class="code" data-lang="rust">#[test]
fn empty_text() {
    let s = analyze("");
    assert_eq!((s.lines, s.words, s.chars), (0, 0, 0));
    assert!(s.freq.is_empty());
}</pre>` },
    { q: `Вопрос собеседования: чем <code>clone</code> отличается от <code>Copy</code>?`, a: `<code>Copy</code> — неявное побитовое копирование для простых типов при присваивании. <code>Clone</code> — явный вызов <code>.clone()</code>, который может выполнять дорогую глубокую копию (например, <code>String</code>).` },
    { q: `Вопрос собеседования: как Rust предотвращает висячие ссылки без сборщика мусора?`, a: `Проверка заимствований при компиляции: у каждой ссылки есть время жизни, и компилятор не допускает, чтобы она пережила значение. Память освобождает владелец при выходе из области видимости.` }
  ],
  q: [
    { q: `Код возврата при ошибке задаёт:`, o: [`<code>panic!</code>`, `<code>process::exit(1)</code>`, `<code>return 1</code> из main всегда`, `<code>break</code>`], a: 1, e: `Явный выход.` },
    { q: `Аргументы командной строки:`, o: [`<code>env::args()</code>`, `<code>argv</code>`, `<code>sys.argv</code>`, `<code>args!()</code>`], a: 0, e: `Итератор строк.` },
    { q: `Объединить результаты потоков:`, o: [`<code>join()</code> каждого потока`, `<code>sleep</code>`, `глобальная переменная`, `<code>drop</code>`], a: 0, e: `join возвращает результат.` },
    { q: `Обрезать знаки препинания по краям слова:`, o: [`<code>trim()</code>`, `<code>trim_matches(...)</code>`, `<code>split()</code>`, `<code>strip()</code>`], a: 1, e: `С предикатом.` },
    { q: `Популярный крейт для разбора аргументов:`, o: [`<code>serde</code>`, `<code>clap</code>`, `<code>tokio</code>`, `<code>rand</code>`], a: 1, e: `clap.` }
  ],
  s: [
    `Утилита: библиотека с <code>analyze</code>, <code>merge</code>, <code>top</code> + тонкий <code>main</code>.`,
    `Ошибки — свой <code>enum</code> с <code>Display</code>; <code>run() -&gt; Result</code>, в <code>main</code> — сообщение и код 1.`,
    `Потоки на файлы: <code>thread::spawn(move || ...)</code> и <code>join</code>.`,
    `<code>HashMap</code> + <code>entry</code>, сортировка по частоте и алфавиту.`,
    `Тесты на логику без файлов.`,
    `Собеседование: владение, заимствование, Option/Result, трейты, умные указатели, Send/Sync.`
  ]
});
