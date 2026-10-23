L('rust', 11, {
  m: 45,
  intro: 'Коллекции стандартной библиотеки — Vec, HashMap, HashSet — хранят данные в куче и растут по мере надобности. Итераторы позволяют обрабатывать их цепочками преобразований: отфильтровать, преобразовать, сгруппировать, посчитать. Итераторы ленивые и после компиляции работают так же быстро, как ручные циклы. Сегодня освоим основные коллекции, замыкания и самые полезные адаптеры итераторов.',
  intro2: 'Сэмпай, итератор — это конвейер на фабрике ♡ Детали едут по ленте, одна станция отбраковывает лишние (filter), другая красит (map), а в конце всё складывают в коробку (collect). И пока никто не нажал «пуск», лента стоит — это и есть ленивость!',
  goals: [
    'Работать с Vec, HashMap и HashSet',
    'Различать <code>iter</code>, <code>iter_mut</code> и <code>into_iter</code>',
    'Писать цепочки map, filter, collect, sum и другие',
    'Использовать замыкания и API entry у HashMap'
  ],
  c: `
<h3>Vec</h3>
<pre class="code" data-lang="rust">let mut v: Vec<i32> = Vec::new();
v.push(3);
v.push(1);
v.extend([4, 1, 5]);
let w = vec![9, 2, 6];                 // макрос для готового списка

println!("{} {:?}", v.len(), v.first());       // 5 Some(3)
println!("{:?}", v.get(10));                   // None — безопасный доступ
v.sort();
v.dedup();                                     // убрать соседние дубликаты
v.retain(|&x| x > 1);                          // оставить подходящие
let last = v.pop();                            // Option<i32>
println!("{:?} {:?} {:?}", v, last, w);</pre>

<h3>Три способа перебора</h3>
<div class="tbl"><table><thead><tr><th>Вызов</th><th>Элементы</th><th>Коллекция после</th></tr></thead><tbody>
<tr><td><code>v.iter()</code> / <code>for x in &amp;v</code></td><td><code>&amp;T</code></td><td>не изменена</td></tr>
<tr><td><code>v.iter_mut()</code> / <code>for x in &amp;mut v</code></td><td><code>&amp;mut T</code></td><td>элементы можно менять</td></tr>
<tr><td><code>v.into_iter()</code> / <code>for x in v</code></td><td><code>T</code></td><td>перемещена, больше недоступна</td></tr>
</tbody></table></div>

<h3>Адаптеры итераторов</h3>
<pre class="code" data-lang="rust">let scores = vec![87, 45, 92, 60, 73, 98];

let passed: Vec<i32> = scores.iter().filter(|&&s| s >= 60).cloned().collect();
let total: i32 = scores.iter().sum();
let avg = total as f64 / scores.len() as f64;
let max = scores.iter().max();                          // Some(&98)
let squares: Vec<i32> = scores.iter().map(|s| s * s).collect();
let count_a = scores.iter().filter(|&&s| s >= 90).count();
let all_pos = scores.iter().all(|&s| s > 0);
let first_bad = scores.iter().position(|&s| s < 50);    // Some(1)
let top3: Vec<_> = { let mut s = scores.clone(); s.sort_by(|a, b| b.cmp(a)); s.into_iter().take(3).collect() };
println!("{passed:?} {avg:.1} {max:?} {count_a} {all_pos} {first_bad:?} {top3:?} {}", squares.len());</pre>
<p>Адаптеры (<code>map</code>, <code>filter</code>, <code>take</code>, <code>skip</code>, <code>zip</code>, <code>enumerate</code>, <code>rev</code>) строят новый итератор и ничего не вычисляют, пока цепочку не «потребит» финальный метод: <code>collect</code>, <code>sum</code>, <code>count</code>, <code>max</code>, <code>for</code>. Компилятор сливает цепочку в один цикл без промежуточных коллекций.</p>
<div class="ichika">Двойные амперсанды в <code>|&amp;&amp;s|</code> пугают ♡ <code>iter()</code> выдаёт <code>&amp;i32</code>, а <code>filter</code> передаёт в замыкание ссылку на элемент — получается <code>&amp;&amp;i32</code>. Шаблон <code>&amp;&amp;s</code> просто распаковывает обе ссылки. Можно писать и <code>|s| **s &gt;= 60</code> — как удобнее!</div>

<h3>Замыкания</h3>
<pre class="code" data-lang="rust">let threshold = 70;
let is_good = |s: &i32| *s >= threshold;          // захватывает threshold по ссылке
let good: Vec<&i32> = scores.iter().filter(|s| is_good(s)).collect();

let mut log = Vec::new();
let mut record = |msg: &str| log.push(msg.to_string());   // изменяет захваченное
record("старт");
record("финиш");

let name = String::from("Ichika");
let greet = move || println!("Привет, {name}");   // move: забрать владение
greet();</pre>
<p>Замыкание захватывает переменные окружения так «слабо», как получится: по ссылке, по изменяемой ссылке или, с <code>move</code>, по значению. <code>move</code> нужен, когда замыкание переживает текущую функцию — например, уходит в другой поток.</p>

<h3>HashMap и HashSet</h3>
<pre class="code" data-lang="rust">use std::collections::{HashMap, HashSet};

let text = "the cat and the dog and the bird";
let mut freq: HashMap<&str, usize> = HashMap::new();
for w in text.split_whitespace() {
    *freq.entry(w).or_insert(0) += 1;            // вставить 0, если нет, и увеличить
}
println!("{:?}", freq.get("the"));                // Some(3)

let mut pairs: Vec<_> = freq.iter().collect();
pairs.sort_by(|a, b| b.1.cmp(a.1).then(a.0.cmp(b.0)));
println!("{:?}", &pairs[..2]);                    // [("the", 3), ("and", 2)]

let unique: HashSet<char> = "hello".chars().collect();
println!("{}", unique.len());                     // 4</pre>
<div class="warn"><p>Порядок обхода <code>HashMap</code> не определён и меняется между запусками — это защита от атак на хеш-таблицы. Если нужен порядок ключей, используй <code>BTreeMap</code> или отсортируй результат.</p></div>
<div class="ayano">Цепочка итераторов читается как описание того, что нужно получить, а не как набор шагов. «Возьми баллы, оставь проходные, посчитай среднее» — и код выглядит так же. Но не переусердствуй: если цепочка не помещается в несколько строк и требует комментариев, обычный цикл <code>for</code> может оказаться понятнее.</div>
`,
  p: [
    { q: `Получи вектор длин всех слов строки.`, a: `<pre class="code" data-lang="rust">let lens: Vec<usize> = s.split_whitespace().map(|w| w.chars().count()).collect();</pre>` },
    { q: `Посчитай сумму квадратов чётных чисел от 1 до 100 одной цепочкой.`, a: `<pre class="code" data-lang="rust">let s: u32 = (1..=100).filter(|n| n % 2 == 0).map(|n| n * n).sum();</pre>` },
    { q: `Сгруппируй учеников по классам: из пар (имя, класс) получи <code>HashMap&lt;u8, Vec&lt;String&gt;&gt;</code>.`, a: `<pre class="code" data-lang="rust">let mut by_class: HashMap<u8, Vec<String>> = HashMap::new();
for (name, class) in students {
    by_class.entry(class).or_default().push(name);
}</pre>` },
    { q: `Почему после <code>for x in v</code> вектор <code>v</code> нельзя использовать?`, a: `<code>for x in v</code> вызывает <code>into_iter()</code>, который забирает владение вектором и отдаёт элементы по значению. Чтобы сохранить вектор, перебирай <code>&amp;v</code>.` },
    { q: `Объедини два вектора имён и баллов в вектор пар.`, a: `<pre class="code" data-lang="rust">let pairs: Vec<(&str, i32)> = names.iter().copied().zip(scores.iter().copied()).collect();</pre>` },
    { q: `Найди слова, которые встречаются в обоих текстах.`, a: `<pre class="code" data-lang="rust">let a: HashSet<&str> = t1.split_whitespace().collect();
let b: HashSet<&str> = t2.split_whitespace().collect();
let common: Vec<&&str> = a.intersection(&b).collect();</pre>` }
  ],
  q: [
    { q: `Безопасный доступ к элементу вектора без паники:`, o: [`<code>v[i]</code>`, `<code>v.get(i)</code>`, `<code>v.at(i)</code>`, `<code>v.index(i)</code>`], a: 1, e: `Возвращает Option.` },
    { q: `Итератор, отдающий элементы по значению и забирающий коллекцию:`, o: [`<code>iter()</code>`, `<code>iter_mut()</code>`, `<code>into_iter()</code>`, `<code>cloned()</code>`], a: 2, e: `Перемещение.` },
    { q: `Адаптеры итераторов вычисляются:`, o: [`сразу`, `лениво, при потреблении`, `в отдельном потоке`, `при компиляции`], a: 1, e: `Нужен collect, sum и т. п.` },
    { q: `Увеличить счётчик слова в HashMap:`, o: [`<code>map[w] += 1</code>`, `<code>*map.entry(w).or_insert(0) += 1</code>`, `<code>map.inc(w)</code>`, `<code>map.push(w)</code>`], a: 1, e: `Entry API.` },
    { q: `Замыкание забирает владение захваченными переменными с ключевым словом:`, o: [`<code>own</code>`, `<code>move</code>`, `<code>take</code>`, `<code>static</code>`], a: 1, e: `move.` }
  ],
  s: [
    `<code>Vec</code>: <code>push</code>, <code>get</code>, <code>sort</code>, <code>retain</code>, <code>pop</code>.`,
    `<code>iter</code> — ссылки, <code>iter_mut</code> — изменяемые ссылки, <code>into_iter</code> — значения с перемещением.`,
    `Адаптеры ленивые: <code>map</code>, <code>filter</code>, <code>zip</code>, <code>take</code>; потребители: <code>collect</code>, <code>sum</code>, <code>count</code>.`,
    `Замыкания захватывают окружение; <code>move</code> — по значению.`,
    `<code>HashMap</code> + <code>entry().or_insert()</code>; <code>HashSet</code> для уникальных.`,
    `Порядок HashMap не определён; нужен порядок — <code>BTreeMap</code>.`
  ]
});
