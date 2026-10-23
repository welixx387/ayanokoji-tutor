L('cpp', 4, {
  m: 40,
  intro: 'Два класса стандартной библиотеки используются в C++ буквально везде: std::string для текста и std::vector для динамических массивов. Оба сами управляют памятью, растут по мере надобности и знают свой размер. Сегодня научимся работать с ними, перебирать элементы циклом range-for и узнаем, какие операции дешёвые, а какие — нет.',
  intro2: 'Сэмпай, помнишь, сколько мучений было с malloc, realloc и нулевым символом в C? ♡ В C++ всё это делают string и vector — сами растут, сами освобождают память. Ты просто добавляешь элементы. Это как переехать из палатки в квартиру с отоплением!',
  goals: [
    'Работать с std::string: конкатенация, поиск, подстроки, сравнение',
    'Использовать std::vector: добавление, доступ, размер, удаление',
    'Перебирать контейнеры циклом range-for без лишних копий',
    'Понимать разницу между размером и ёмкостью и стоимость операций'
  ],
  c: `
<h3>std::string</h3>
<pre class="code" data-lang="cpp">#include <iostream>
#include <string>

int main() {
    std::string first = "Kiyotaka", last = "Ayanokoji";
    std::string full = first + " " + last;        /* конкатенация */
    full += "!";

    std::cout << full.size() << '\\n';             /* длина: 19 */
    std::cout << full[0] << full.back() << '\\n';   /* K! */
    std::cout << full.substr(0, 8) << '\\n';       /* Kiyotaka */

    auto pos = full.find("Ayano");                /* индекс или std::string::npos */
    if (pos != std::string::npos)
        std::cout << "найдено с позиции " << pos << '\\n';

    if (first == "Kiyotaka") std::cout << "совпадает\\n";   /* сравнение содержимого */
    int n = std::stoi("42");                      /* строка в число */
    std::string s = std::to_string(3.5);          /* число в строку */
    (void)n; (void)s;
}</pre>
<div class="tbl"><table><thead><tr><th>Метод</th><th>Что делает</th></tr></thead><tbody>
<tr><td><code>size()</code>, <code>empty()</code></td><td>длина, проверка на пустоту</td></tr>
<tr><td><code>s[i]</code>, <code>s.at(i)</code></td><td>символ; <code>at</code> проверяет границы и бросает исключение</td></tr>
<tr><td><code>find</code>, <code>rfind</code></td><td>поиск подстроки</td></tr>
<tr><td><code>substr(pos, len)</code></td><td>подстрока</td></tr>
<tr><td><code>insert</code>, <code>erase</code>, <code>replace</code></td><td>изменение</td></tr>
<tr><td><code>c_str()</code></td><td>указатель на строку C для старых функций</td></tr>
</tbody></table></div>
<p><code>std::string</code> хранит байты. Для русского текста в UTF-8 одна буква занимает 2 байта, поэтому <code>size()</code> вернёт число байт, а <code>s[i]</code> — отдельный байт, а не букву.</p>

<h3>std::vector</h3>
<pre class="code" data-lang="cpp">#include <vector>

std::vector<int> v;                 /* пустой */
std::vector<int> w(5, 0);           /* пять нулей */
std::vector<std::string> names{"Kiyotaka", "Ichika", "Suzune"};

v.push_back(10);                    /* добавить в конец */
v.push_back(20);
v.emplace_back(30);                 /* создать элемент прямо в векторе */
v.pop_back();                       /* убрать последний */

std::cout << v.size() << ' ' << v.front() << ' ' << v.back() << '\\n';
v.insert(v.begin(), 5);             /* вставка в начало: O(n) */
v.erase(v.begin() + 1);             /* удаление по позиции: O(n) */
v.clear();                          /* очистить */</pre>
<p><code>std::vector</code> — это динамический массив из урока 9 курса C, только готовый и безопасный: элементы лежат подряд, ёмкость удваивается, память освобождается автоматически.</p>
<div class="tbl"><table><thead><tr><th>Операция</th><th>Сложность</th></tr></thead><tbody>
<tr><td>доступ <code>v[i]</code></td><td>O(1)</td></tr>
<tr><td><code>push_back</code>, <code>pop_back</code></td><td>O(1) в среднем</td></tr>
<tr><td><code>insert</code>, <code>erase</code> в середине</td><td>O(n) — сдвиг элементов</td></tr>
<tr><td>поиск значения</td><td>O(n)</td></tr>
</tbody></table></div>

<h3>range-for</h3>
<pre class="code" data-lang="cpp">for (const auto& name : names)    /* чтение без копий */
    std::cout << name << '\\n';

for (auto& x : v)                 /* изменение элементов */
    x *= 2;

for (std::size_t i = 0; i < v.size(); i++)   /* когда нужен индекс */
    std::cout << i << ": " << v[i] << '\\n';</pre>
<div class="warn"><p>Нельзя добавлять или удалять элементы вектора внутри range-for по нему же: при росте вектор может переехать в новую память, и цикл продолжит читать старую. Это неопределённое поведение. Ссылки и указатели на элементы тоже становятся недействительными после <code>push_back</code>, вызвавшего рост.</p></div>

<h3>Размер и ёмкость</h3>
<pre class="code" data-lang="cpp">std::vector<int> big;
big.reserve(1000000);     /* выделить память сразу: никаких перевыделений */
for (int i = 0; i < 1000000; i++) big.push_back(i);
std::cout << big.size() << ' ' << big.capacity() << '\\n';</pre>
<div class="ichika"><code>size</code> — сколько элементов лежит, <code>capacity</code> — сколько поместится без переезда ♡ Если заранее знаешь размер, вызови <code>reserve</code> — вектор не будет переезжать по пути. Это бесплатное ускорение!</div>
<div class="ayano"><code>std::vector</code> — контейнер по умолчанию в C++. Если не знаешь, что выбрать, выбирай его: данные лежат подряд, кэш процессора работает идеально, и для небольших объёмов он часто быстрее даже «теоретически лучших» структур. Другой контейнер выбирай, когда есть конкретная причина, — о них в уроке 12.</div>
`,
  p: [
    { q: `Прочитай строки до конца ввода в вектор и выведи их в обратном порядке.`, a: `<pre class="code" data-lang="cpp">std::vector<std::string> lines;
std::string line;
while (std::getline(std::cin, line))
    lines.push_back(line);
for (auto it = lines.rbegin(); it != lines.rend(); ++it)
    std::cout << *it << '\\n';</pre>` },
    { q: `Посчитай, сколько раз подстрока <code>"ab"</code> встречается в строке <code>s</code>.`, a: `<pre class="code" data-lang="cpp">int count = 0;
for (auto pos = s.find("ab"); pos != std::string::npos; pos = s.find("ab", pos + 1))
    count++;</pre>` },
    { q: `Удвой все элементы вектора циклом range-for.`, a: `<pre class="code" data-lang="cpp">for (auto& x : v) x *= 2;</pre> Без <code>&amp;</code> изменялась бы копия.` },
    { q: `Чем <code>v[i]</code> отличается от <code>v.at(i)</code>?`, a: `<code>at</code> проверяет индекс и бросает <code>std::out_of_range</code> при выходе за границы; <code>[]</code> не проверяет — выход за границы приводит к неопределённому поведению.` },
    { q: `Почему в UTF-8 <code>std::string("Привет").size()</code> равно 12?`, a: `<code>size</code> считает байты, а каждая кириллическая буква в UTF-8 занимает 2 байта: 6 букв × 2 = 12.` },
    { q: `Раздели строку по пробелам на слова.`, a: `<pre class="code" data-lang="cpp">#include <sstream>

std::vector<std::string> split(const std::string& s) {
    std::istringstream in(s);
    std::vector<std::string> words;
    std::string w;
    while (in >> w) words.push_back(w);
    return words;
}</pre>` }
  ],
  q: [
    { q: `Добавить элемент в конец вектора:`, o: [`<code>add</code>`, `<code>push_back</code>`, `<code>append</code> только`, `<code>insert_end</code>`], a: 1, e: `Или <code>emplace_back</code>.` },
    { q: `<code>find</code> у строки при неудаче возвращает:`, o: [`−1 как int`, `<code>std::string::npos</code>`, `0`, `исключение`], a: 1, e: `npos.` },
    { q: `Вставка в начало вектора стоит:`, o: [`O(1)`, `O(n)`, `O(log n)`, `бесплатно`], a: 1, e: `Сдвиг всех элементов.` },
    { q: `Заранее выделить память в векторе:`, o: [`<code>resize</code>`, `<code>reserve</code>`, `<code>capacity</code>`, `<code>alloc</code>`], a: 1, e: `reserve не меняет size.` },
    { q: `Изменять вектор внутри range-for по нему:`, o: [`безопасно`, `неопределённое поведение при росте`, `ошибка компиляции`, `автоматически копирует`], a: 1, e: `Итераторы инвалидируются.` }
  ],
  s: [
    `<code>std::string</code>: <code>+</code>, <code>size</code>, <code>find</code>, <code>substr</code>, <code>==</code>, <code>stoi</code>, <code>to_string</code>.`,
    `<code>size</code> строки — в байтах; в UTF-8 буквы бывают многобайтовыми.`,
    `<code>std::vector</code>: <code>push_back</code>, <code>emplace_back</code>, <code>pop_back</code>, <code>at</code>, <code>[]</code>.`,
    `range-for: <code>const auto&amp;</code> — читать, <code>auto&amp;</code> — изменять.`,
    `Не меняй размер вектора во время обхода; рост делает ссылки недействительными.`,
    `<code>reserve</code> избавляет от перевыделений; vector — контейнер по умолчанию.`
  ]
});
