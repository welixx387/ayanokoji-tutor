L('cpp', 3, {
  m: 40,
  intro: 'Функции в C++ гибче, чем в C. Несколько функций могут носить одно имя, если различаются параметрами, — это перегрузка. Параметры могут иметь значения по умолчанию. А главное — появляется выбор способа передачи аргумента: по значению, по ссылке или по константной ссылке. Правильный выбор влияет и на корректность, и на скорость программы.',
  intro2: 'Сэмпай, перегрузка — это когда у разных блюд одинаковое название ♡ «Сок» из апельсина и «сок» из яблока — компилятор сам поймёт, какой нужен, по ингредиентам. А передача по ссылке — дать подруге свою тетрадь, а не ксерокопию!',
  goals: [
    'Перегружать функции и понимать, как компилятор выбирает вариант',
    'Использовать параметры по умолчанию',
    'Выбирать способ передачи: по значению, по ссылке, по константной ссылке',
    'Возвращать несколько значений через структуры и std::pair'
  ],
  c: `
<h3>Перегрузка</h3>
<pre class="code" data-lang="cpp">#include <iostream>
#include <string>

void print(int x)                { std::cout << "int: " << x << '\\n'; }
void print(double x)             { std::cout << "double: " << x << '\\n'; }
void print(const std::string& s) { std::cout << "string: " << s << '\\n'; }

int main() {
    print(42);                  /* int */
    print(3.14);                /* double */
    print(std::string("hi"));   /* string */
}</pre>
<p>Компилятор выбирает функцию по типам аргументов. Тип возвращаемого значения в выборе не участвует: две функции, отличающиеся только им, — ошибка. Если подходят несколько вариантов одинаково хорошо, компилятор сообщит о неоднозначности.</p>

<h3>Параметры по умолчанию</h3>
<pre class="code" data-lang="cpp">std::string repeat(const std::string& s, int times = 2, const std::string& sep = " ") {
    std::string out;
    for (int i = 0; i < times; i++) {
        if (i) out += sep;
        out += s;
    }
    return out;
}

repeat("ha");             /* "ha ha" */
repeat("ha", 3);          /* "ha ha ha" */
repeat("ha", 3, "-");     /* "ha-ha-ha" */</pre>
<p>Значения по умолчанию задаются справа налево: после параметра со значением по умолчанию все следующие тоже должны его иметь. Указывай их в объявлении функции (в заголовке), а не в определении.</p>

<h3>Способы передачи аргументов</h3>
<div class="tbl"><table><thead><tr><th>Объявление</th><th>Когда использовать</th></tr></thead><tbody>
<tr><td><code>void f(int x)</code></td><td>маленькие типы (числа, указатели) — копия дешевле ссылки</td></tr>
<tr><td><code>void f(const std::string&amp; s)</code></td><td>большие объекты только для чтения — без копирования</td></tr>
<tr><td><code>void f(std::vector&lt;int&gt;&amp; v)</code></td><td>функция должна изменить аргумент вызывающего</td></tr>
<tr><td><code>void f(std::string s)</code></td><td>функции всё равно нужна своя копия (например, чтобы сохранить)</td></tr>
</tbody></table></div>
<pre class="code" data-lang="cpp">void normalize(std::vector<double>& v) {     /* изменяет вектор вызывающего */
    double mx = 0;
    for (double x : v) mx = std::max(mx, x);
    if (mx == 0) return;
    for (double& x : v) x /= mx;              /* ссылка на элемент */
}

double sum(const std::vector<double>& v) {    /* только читает */
    double s = 0;
    for (double x : v) s += x;
    return s;
}</pre>
<div class="ichika">Видишь <code>&amp;</code> в параметре без <code>const</code> — жди, что функция изменит твою переменную ♡ Это сигнал читателю. Поэтому для чтения всегда пиши <code>const&amp;</code>, даже если «и так понятно»!</div>

<h3>Несколько результатов</h3>
<pre class="code" data-lang="cpp">#include <utility>

struct Stats { double min, max, mean; };

Stats stats(const std::vector<double>& v) {
    Stats s{v[0], v[0], 0};
    for (double x : v) {
        s.min = std::min(s.min, x);
        s.max = std::max(s.max, x);
        s.mean += x;
    }
    s.mean /= v.size();
    return s;                 /* возврат структуры дёшев: компилятор не копирует */
}

std::pair<int, int> divmod(int a, int b) { return {a / b, a % b}; }

auto [q, r] = divmod(17, 5);          /* структурное связывание (C++17): q = 3, r = 2 */
auto [mn, mx, avg] = stats(values);</pre>
<p>В современном C++ возврат значения предпочтительнее выходных параметров по ссылке: код читается проще, а компилятор устраняет копирование. <code>std::pair</code> и <code>std::tuple</code> удобны для быстрых случаев, именованная структура — для понятного кода.</p>
<div class="warn"><p>Никогда не возвращай ссылку на локальную переменную: <code>const std::string&amp; f() { std::string s = "x"; return s; }</code> — висячая ссылка. Возвращай по значению.</p></div>
<div class="ayano">Сигнатура функции — это документация, которую проверяет компилятор. По одной строке <code>Stats stats(const std::vector&lt;double&gt;&amp; v)</code> понятно: функция читает вектор, не изменяет его и возвращает три числа. Выбирай типы параметров так, чтобы сигнатура говорила правду о поведении.</div>
`,
  p: [
    { q: `Перегрузи функцию <code>area</code> для круга (радиус) и прямоугольника (две стороны).`, a: `<pre class="code" data-lang="cpp">double area(double r) { return 3.141592653589793 * r * r; }
double area(double w, double h) { return w * h; }</pre>` },
    { q: `Напиши функцию <code>swap_values</code>, меняющую местами два <code>int</code> через ссылки.`, a: `<pre class="code" data-lang="cpp">void swap_values(int& a, int& b) {
    int t = a;
    a = b;
    b = t;
}</pre> В реальном коде используют <code>std::swap</code>.` },
    { q: `Какой способ передачи выбрать для параметра <code>std::vector&lt;std::string&gt;</code>, который функция только читает?`, a: `<code>const std::vector&lt;std::string&gt;&amp;</code>: без копирования и с гарантией неизменности.` },
    { q: `Почему нельзя перегрузить <code>int f(int)</code> и <code>double f(int)</code>?`, a: `Тип результата не участвует в выборе перегрузки; по вызову <code>f(1)</code> компилятор не сможет понять, какую выбрать.` },
    { q: `Верни из функции минимум и максимум вектора через <code>std::pair</code> и распакуй результат.`, a: `<pre class="code" data-lang="cpp">std::pair<int, int> min_max(const std::vector<int>& v) {
    auto [mn, mx] = std::minmax_element(v.begin(), v.end());
    return {*mn, *mx};
}
auto [lo, hi] = min_max(data);</pre>` },
    { q: `Добавь в функцию <code>log(msg)</code> необязательный уровень важности со значением «info».`, a: `<pre class="code" data-lang="cpp">void log(const std::string& msg, const std::string& level = "info") {
    std::cerr << "[" << level << "] " << msg << '\\n';
}</pre>` }
  ],
  q: [
    { q: `Перегрузка различает функции по:`, o: [`имени`, `типам и числу параметров`, `типу результата`, `порядку объявления`], a: 1, e: `Сигнатура.` },
    { q: `Большой объект только для чтения передают как:`, o: [`<code>T</code>`, `<code>T&amp;</code>`, `<code>const T&amp;</code>`, `<code>T*</code>`], a: 2, e: `Без копии.` },
    { q: `Параметры по умолчанию задаются:`, o: [`слева направо`, `справа налево`, `в любом порядке`, `только первый`], a: 1, e: `Хвост списка.` },
    { q: `<code>auto [a, b] = f();</code> — это:`, o: [`лямбда`, `структурное связывание`, `массив`, `шаблон`], a: 1, e: `C++17.` },
    { q: `Возврат ссылки на локальную переменную:`, o: [`быстро и безопасно`, `висячая ссылка`, `ошибка компиляции всегда`, `копирование`], a: 1, e: `Объект уничтожен.` }
  ],
  s: [
    `Перегрузка — одно имя, разные параметры; тип результата не учитывается.`,
    `Параметры по умолчанию — справа, в объявлении.`,
    `Маленькие типы — по значению, большие для чтения — <code>const T&amp;</code>, для изменения — <code>T&amp;</code>.`,
    `<code>&amp;</code> без <code>const</code> — сигнал «функция изменит аргумент».`,
    `Несколько результатов — структура, <code>std::pair</code>, <code>std::tuple</code> и структурное связывание.`,
    `Не возвращай ссылки на локальные переменные.`
  ]
});
