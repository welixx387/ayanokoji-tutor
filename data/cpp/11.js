L('cpp', 11, {
  m: 40,
  intro: 'Функция max для int, для double, для строк — одинаковый код с разными типами. Шаблоны позволяют написать его один раз, а компилятор сам создаст нужные версии. На шаблонах построена вся стандартная библиотека: vector, map, sort. Сегодня научимся писать шаблоны функций и классов, узнаем, как компилятор выводит типы, и познакомимся с концептами C++20, которые делают ошибки в шаблонах понятными.',
  intro2: 'Сэмпай, шаблон — это формочка для печенья ♡ Форма одна, а тесто можно взять любое: шоколадное, ванильное, имбирное. Компилятор сам испечёт печенье нужного вкуса, когда ты попросишь!',
  goals: [
    'Писать шаблоны функций и понимать вывод типов',
    'Создавать шаблоны классов',
    'Ограничивать шаблоны концептами C++20',
    'Понимать, почему шаблоны пишут в заголовочных файлах'
  ],
  c: `
<h3>Шаблоны функций</h3>
<pre class="code" data-lang="cpp">#include <iostream>
#include <string>

template <typename T>
T max_of(const T& a, const T& b) {
    return a < b ? b : a;
}

int main() {
    std::cout << max_of(3, 7) << '\\n';                       /* T = int */
    std::cout << max_of(2.5, 1.5) << '\\n';                   /* T = double */
    std::cout << max_of(std::string("ab"), std::string("b")) << '\\n';   /* T = std::string */
    std::cout << max_of<double>(3, 2.5) << '\\n';             /* T задан явно */
}</pre>
<p>Компилятор <b>выводит</b> параметр шаблона из аргументов и создаёт (инстанцирует) отдельную функцию для каждого используемого типа. Вызов <code>max_of(3, 2.5)</code> не скомпилируется: T не может быть одновременно <code>int</code> и <code>double</code>. Требования к типу неявные: здесь T должен поддерживать <code>&lt;</code> и копирование.</p>

<h3>Шаблоны классов</h3>
<pre class="code" data-lang="cpp">#include <stdexcept>
#include <vector>

template <typename T>
class Stack {
public:
    void push(T value) { items_.push_back(std::move(value)); }
    T pop() {
        if (items_.empty()) throw std::out_of_range("стек пуст");
        T top = std::move(items_.back());
        items_.pop_back();
        return top;
    }
    bool empty() const { return items_.empty(); }
    std::size_t size() const { return items_.size(); }
private:
    std::vector<T> items_;
};

Stack<int> numbers;
numbers.push(1);
Stack<std::string> words;
words.push("hello");</pre>
<p>Для шаблона класса аргумент обычно указывают явно в угловых скобках. С C++17 компилятор умеет выводить его из конструктора: <code>std::vector v{1, 2, 3};</code> — это <code>std::vector&lt;int&gt;</code>.</p>
<pre class="code" data-lang="cpp">template <typename T, std::size_t N>      /* параметр-значение */
struct FixedArray {
    T data[N];
    constexpr std::size_t size() const { return N; }
};
FixedArray<double, 3> point{1.0, 2.0, 3.0};</pre>

<h3>Концепты (C++20)</h3>
<pre class="code" data-lang="cpp">#include <concepts>

template <std::integral T>             /* только целые типы */
T gcd(T a, T b) {
    while (b != 0) { T t = a % b; a = b; b = t; }
    return a;
}

template <typename T>
concept Printable = requires(std::ostream& os, const T& x) {
    os << x;                            /* тип должен выводиться в поток */
};

template <Printable T>
void print_all(const std::vector<T>& v) {
    for (const auto& x : v) std::cout << x << ' ';
    std::cout << '\\n';
}

gcd(12, 18);        /* ок */
// gcd(1.5, 2.5);   /* понятная ошибка: double не удовлетворяет std::integral */</pre>
<p>Без концептов ошибка в шаблоне выдаётся из глубины его реализации — сотни строк сообщений. Концепт проверяет требования сразу при вызове и сообщает, какое из них не выполнено.</p>
<div class="ichika">Помнишь <code>void*</code> и <code>qsort</code> в C? ♡ Там компилятор не знал типов, и ошибка в компараторе всплывала во время работы. Шаблоны проверяются при компиляции и ещё и быстрее — компилятор может встроить сравнение прямо в сортировку!</div>

<h3>Где писать шаблоны</h3>
<div class="warn"><p>Компилятор создаёт код шаблона в момент использования, поэтому ему нужно видеть всё определение, а не только объявление. Шаблоны пишут целиком в заголовочных файлах (.hpp). Если вынести тело в .cpp, компоновщик выдаст <code>undefined reference</code> для каждой используемой версии.</p></div>
<div class="ayano">Не превращай всё в шаблоны заранее. Пиши обычную функцию для одного типа, а шаблон делай, когда действительно понадобится второй. Обобщённый код сложнее читать, медленнее компилировать и труднее отлаживать. Шаблоны оправданы в библиотеках и в местах, где один алгоритм реально работает с разными типами.</div>
`,
  p: [
    { q: `Напиши шаблон функции <code>sum</code>, складывающей элементы вектора любого числового типа.`, a: `<pre class="code" data-lang="cpp">template <typename T>
T sum(const std::vector<T>& v) {
    T s{};
    for (const auto& x : v) s += x;
    return s;
}</pre>` },
    { q: `Почему <code>max_of(3, 2.5)</code> не компилируется и как это исправить?`, a: `Из аргументов выводятся разные типы для T: <code>int</code> и <code>double</code>. Исправления: указать тип явно <code>max_of&lt;double&gt;(3, 2.5)</code> или привести аргумент.` },
    { q: `Напиши шаблон класса <code>Pair</code> с двумя полями разных типов и методом <code>swap_copy()</code>, возвращающим пару с переставленными полями.`, a: `<pre class="code" data-lang="cpp">template <typename A, typename B>
struct Pair {
    A first;
    B second;
    Pair<B, A> swap_copy() const { return {second, first}; }
};
Pair<int, std::string> p{1, "one"};
auto q = p.swap_copy();     /* Pair<std::string, int> */</pre>` },
    { q: `Ограничь шаблон <code>average</code> только арифметическими типами.`, a: `<pre class="code" data-lang="cpp">template <typename T>
    requires std::is_arithmetic_v<T>
double average(const std::vector<T>& v) {
    double s = 0;
    for (T x : v) s += x;
    return v.empty() ? 0 : s / v.size();
}</pre>` },
    { q: `Ты вынес тело шаблонной функции в <code>utils.cpp</code>, а объявление оставил в <code>utils.hpp</code>. Что произойдёт?`, a: `Ошибка компоновки <code>undefined reference</code>: в файле, где функция вызывается, компилятор видит только объявление и не может создать нужную версию, а в <code>utils.cpp</code> версия для этого типа не создана.` },
    { q: `Что делает <code>T s{};</code> в шаблоне?`, a: `Инициализирует значение по умолчанию для любого типа: 0 для чисел, пустую строку для <code>std::string</code>.` }
  ],
  q: [
    { q: `Шаблон функции объявляется через:`, o: [`<code>generic</code>`, `<code>template &lt;typename T&gt;</code>`, `<code>auto T</code>`, `<code>class&lt;T&gt;</code> только`], a: 1, e: `typename или class.` },
    { q: `Код шаблона создаётся компилятором:`, o: [`один раз для всех типов`, `для каждого используемого типа`, `во время выполнения`, `только для int`], a: 1, e: `Инстанцирование.` },
    { q: `Концепты появились в стандарте:`, o: [`C++11`, `C++14`, `C++17`, `C++20`], a: 3, e: `C++20.` },
    { q: `Определения шаблонов обычно размещают:`, o: [`в .cpp`, `в заголовках`, `в main`, `в Makefile`], a: 1, e: `Нужны при инстанцировании.` },
    { q: `<code>std::vector v{1, 2, 3};</code> в C++17 — это:`, o: [`ошибка`, `<code>std::vector&lt;int&gt;</code>`, `<code>std::vector&lt;double&gt;</code>`, `массив`], a: 1, e: `Вывод аргументов шаблона класса.` }
  ],
  s: [
    `Шаблон — обобщённый код; компилятор создаёт версию для каждого типа.`,
    `Тип выводится из аргументов или указывается явно в угловых скобках.`,
    `Шаблоны классов: <code>Stack&lt;int&gt;</code>; параметры могут быть значениями.`,
    `Концепты (<code>std::integral</code>, <code>requires</code>) дают понятные ошибки.`,
    `Шаблоны пишут целиком в заголовках.`,
    `Обобщай, когда действительно нужен второй тип.`
  ]
});
