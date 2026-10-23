L('cpp', 12, {
  m: 45,
  intro: 'Стандартная библиотека шаблонов (STL) — это контейнеры, итераторы и алгоритмы. Контейнеры хранят данные, алгоритмы обрабатывают их, а итераторы соединяют одно с другим. Сегодня изучим ассоциативные контейнеры map и set и их хеш-версии, научимся пользоваться итераторами и главными алгоритмами и узнаем, какой контейнер выбрать для задачи.',
  intro2: 'Сэмпай, STL — как хорошо оборудованная кухня ♡ Контейнеры — кастрюли разной формы, алгоритмы — ножи и блендеры, а итераторы — твои руки, которые подают продукты к инструментам. Ничего не надо мастерить самому!',
  goals: [
    'Использовать map, set и их неупорядоченные хеш-версии',
    'Понимать итераторы и полуоткрытые диапазоны',
    'Применять алгоритмы: sort, find, подсчёт, суммирование, преобразование',
    'Выбирать контейнер по сложности нужных операций'
  ],
  c: `
<h3><code>map</code> и <code>unordered_map</code></h3>
<pre class="code" data-lang="cpp">#include <iostream>
#include <map>
#include <string>
#include <unordered_map>

int main() {
    std::map<std::string, int> points{{"Kiyotaka", 80}, {"Ichika", 95}};
    points["Suzune"] = 90;                  /* вставка или изменение */
    points["Kiyotaka"] += 5;

    for (const auto& [name, p] : points)    /* обход в порядке ключей */
        std::cout << name << ": " << p << '\\n';

    if (auto it = points.find("Ichika"); it != points.end())
        std::cout << "найдена: " << it->second << '\\n';
    if (points.contains("Kakeru")) { }      /* C++20 */

    std::unordered_map<std::string, int> freq;   /* хеш-таблица */
    std::string w;
    while (std::cin >> w) ++freq[w];             /* частоты слов */
    std::cout << freq.size() << " разных слов\\n";
}</pre>
<div class="warn"><p>Оператор <code>[]</code> у <code>map</code> создаёт элемент со значением по умолчанию, если ключа нет. Для проверки наличия используй <code>find</code> или <code>contains</code>, иначе случайно наполнишь словарь пустыми записями. У константного <code>map</code> оператора <code>[]</code> нет вовсе — используй <code>at</code>.</p></div>

<h3>Какой контейнер выбрать</h3>
<div class="tbl"><table><thead><tr><th>Контейнер</th><th>Устройство</th><th>Поиск</th><th>Особенность</th></tr></thead><tbody>
<tr><td><code>std::vector</code></td><td>массив</td><td>O(n)</td><td>по умолчанию, быстрый обход</td></tr>
<tr><td><code>std::deque</code></td><td>блоки</td><td>O(n)</td><td>быстрые вставки в оба конца</td></tr>
<tr><td><code>std::map</code>, <code>std::set</code></td><td>сбалансированное дерево</td><td>O(log n)</td><td>ключи упорядочены</td></tr>
<tr><td><code>std::unordered_map</code>, <code>std::unordered_set</code></td><td>хеш-таблица</td><td>O(1) в среднем</td><td>без порядка, обычно быстрее</td></tr>
</tbody></table></div>
<pre class="code" data-lang="cpp">#include <set>
std::set<int> seen;
for (int x : {5, 1, 5, 3, 1}) seen.insert(x);   /* уникальные и отсортированные: 1 3 5 */</pre>

<h3>Итераторы</h3>
<p>Итератор — обобщённый указатель на элемент контейнера. <code>begin()</code> указывает на первый элемент, <code>end()</code> — на позицию <b>за</b> последним. Диапазон <code>[begin, end)</code> полуоткрытый: пустой контейнер — это <code>begin == end</code>.</p>
<pre class="code" data-lang="cpp">std::vector<int> v{4, 1, 3};
for (auto it = v.begin(); it != v.end(); ++it)
    *it *= 10;                    /* доступ как через указатель */
auto last = std::prev(v.end());   /* итератор на последний элемент */</pre>

<h3>Алгоритмы</h3>
<pre class="code" data-lang="cpp">#include <algorithm>
#include <numeric>

std::vector<int> v{5, 3, 8, 1, 9, 2};

std::sort(v.begin(), v.end());                              /* 1 2 3 5 8 9 */
std::sort(v.begin(), v.end(), std::greater<>());            /* по убыванию */
auto it = std::find(v.begin(), v.end(), 8);                 /* итератор или end() */
int big = std::count_if(v.begin(), v.end(), [](int x) { return x > 4; });
int total = std::accumulate(v.begin(), v.end(), 0);         /* сумма */
auto [mn, mx] = std::minmax_element(v.begin(), v.end());

std::vector<int> sq(v.size());
std::transform(v.begin(), v.end(), sq.begin(), [](int x) { return x * x; });

std::erase_if(v, [](int x) { return x % 2 == 0; });         /* C++20: удалить чётные */
std::ranges::sort(v);                                       /* C++20: без begin/end */</pre>
<p>Выражения вида <code>[](int x) { return x &gt; 4; }</code> — это лямбды, маленькие функции прямо на месте; подробно — в следующем уроке. Алгоритмы работают с любыми контейнерами через итераторы, поэтому <code>std::find</code> одинаково ищет в векторе, списке и множестве.</p>
<div class="ichika">Прежде чем писать цикл, загляни в <code>&lt;algorithm&gt;</code> ♡ Там больше сотни готовых алгоритмов, отлаженных и быстрых. Имя алгоритма к тому же говорит, что делает код: <code>count_if</code> понятнее, чем цикл с счётчиком!</div>

<h3>Пример: топ-3 слова</h3>
<pre class="code" data-lang="cpp">std::unordered_map<std::string, int> freq;
for (std::string w; std::cin >> w; ) ++freq[w];

std::vector<std::pair<std::string, int>> items(freq.begin(), freq.end());
std::sort(items.begin(), items.end(),
          [](const auto& a, const auto& b) { return a.second > b.second; });
for (std::size_t i = 0; i < std::min<std::size_t>(3, items.size()); i++)
    std::cout << items[i].first << ' ' << items[i].second << '\\n';</pre>
<div class="ayano">Выбор контейнера — это выбор того, какие операции будут быстрыми. Нужен поиск по ключу — хеш-таблица. Нужен порядок ключей или поиск ближайшего — дерево. Нужен обход и доступ по индексу — вектор. Сначала опиши, что программа делает с данными чаще всего, а контейнер подскажет сам себя.</div>
`,
  p: [
    { q: `Посчитай, сколько раз каждая буква встречается в строке, и выведи буквы по алфавиту.`, a: `<pre class="code" data-lang="cpp">std::map<char, int> cnt;
for (char c : text) ++cnt[c];
for (const auto& [c, n] : cnt) std::cout << c << ": " << n << '\\n';</pre> <code>std::map</code> обходит ключи в порядке возрастания.` },
    { q: `Удали дубликаты из вектора, сохранив сортировку.`, a: `<pre class="code" data-lang="cpp">std::sort(v.begin(), v.end());
v.erase(std::unique(v.begin(), v.end()), v.end());</pre> Или сложи элементы в <code>std::set</code>.` },
    { q: `Почему <code>if (m["key"] == 0)</code> — плохая проверка наличия ключа?`, a: `Оператор <code>[]</code> вставит ключ со значением 0, если его не было. Проверять нужно через <code>m.contains("key")</code> или <code>m.find("key") != m.end()</code>.` },
    { q: `Найди первое отрицательное число в векторе.`, a: `<pre class="code" data-lang="cpp">auto it = std::find_if(v.begin(), v.end(), [](int x) { return x < 0; });
if (it != v.end()) std::cout << *it << '\\n';</pre>` },
    { q: `Когда выбрать <code>std::map</code>, а когда <code>std::unordered_map</code>?`, a: `<code>unordered_map</code> — когда нужен только быстрый поиск по ключу (O(1) в среднем). <code>map</code> — когда важен порядок ключей, нужен диапазон или ближайший ключ (<code>lower_bound</code>), либо нет хорошей хеш-функции.` },
    { q: `Проверь, есть ли в двух векторах общие элементы, быстрее чем O(n·m).`, a: `<pre class="code" data-lang="cpp">std::unordered_set<int> s(a.begin(), a.end());
bool common = std::any_of(b.begin(), b.end(), [&](int x) { return s.contains(x); });</pre> Сложность O(n + m).` }
  ],
  q: [
    { q: `Поиск в <code>std::map</code>:`, o: [`O(1)`, `O(log n)`, `O(n)`, `O(n²)`], a: 1, e: `Дерево.` },
    { q: `<code>end()</code> указывает:`, o: [`на последний элемент`, `на позицию за последним`, `на первый`, `в никуда, это nullptr`], a: 1, e: `Полуоткрытый диапазон.` },
    { q: `Уникальные упорядоченные значения хранит:`, o: [`<code>std::vector</code>`, `<code>std::set</code>`, `<code>std::deque</code>`, `<code>std::stack</code>`], a: 1, e: `set.` },
    { q: `Сумма элементов:`, o: [`<code>std::sum</code>`, `<code>std::accumulate</code>`, `<code>std::count</code>`, `<code>std::add</code>`], a: 1, e: `numeric.` },
    { q: `<code>m["x"]</code> у <code>std::map</code> при отсутствии ключа:`, o: [`бросает исключение`, `вставляет элемент по умолчанию`, `возвращает nullptr`, `ошибка компиляции`], a: 1, e: `Осторожно.` }
  ],
  s: [
    `<code>map</code>/<code>set</code> — дерево, O(log n), порядок; <code>unordered_*</code> — хеш, O(1) в среднем.`,
    `<code>[]</code> у map вставляет; проверка — <code>contains</code> или <code>find</code>.`,
    `Итераторы: <code>[begin, end)</code>, <code>end</code> — за последним.`,
    `Алгоритмы: <code>sort</code>, <code>find</code>, <code>count_if</code>, <code>accumulate</code>, <code>transform</code>, <code>erase_if</code>.`,
    `Сначала ищи алгоритм, потом пиши цикл.`,
    `Контейнер выбирают по частым операциям.`
  ]
});
