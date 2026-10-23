L('cpp', 13, {
  m: 40,
  intro: 'Лямбда-выражение — функция, написанная прямо в месте использования. Лямбды сделали алгоритмы STL по-настоящему удобными: условие поиска или правило сортировки пишется рядом с вызовом, а не в отдельной функции где-то в файле. Сегодня изучим синтаксис лямбд, захват переменных по значению и по ссылке, функциональные объекты и std::function, а также главную ловушку — висячие ссылки в захвате.',
  intro2: 'Сэмпай, лямбда — это записка с инструкцией прямо на полях тетради ♡ Не нужно заводить отдельную страницу для правила «сравни по баллам» — пишешь его там, где оно нужно. А захват — это то, что записка помнит из окружающего текста!',
  goals: [
    'Писать лямбды и использовать их с алгоритмами',
    'Захватывать переменные по значению и по ссылке осознанно',
    'Понимать функциональные объекты и std::function',
    'Избегать висячих ссылок в захвате'
  ],
  c: `
<h3>Синтаксис</h3>
<pre class="code" data-lang="cpp">auto square = [](int x) { return x * x; };
std::cout << square(5) << '\\n';            /* 25 */

auto divide = [](double a, double b) -> double {   /* явный тип результата */
    if (b == 0) return 0;
    return a / b;
};

std::vector<int> v{5, -3, 8, -1};
std::sort(v.begin(), v.end(), [](int a, int b) { return std::abs(a) < std::abs(b); });
auto neg = std::count_if(v.begin(), v.end(), [](int x) { return x < 0; });</pre>
<p>Части лямбды: <code>[захват]</code>, <code>(параметры)</code>, необязательный <code>-&gt; тип</code> и <code>{ тело }</code>. Обычно тип результата выводится сам. Каждая лямбда имеет свой уникальный тип, поэтому её сохраняют в <code>auto</code>.</p>

<h3>Захват переменных</h3>
<div class="tbl"><table><thead><tr><th>Захват</th><th>Смысл</th></tr></thead><tbody>
<tr><td><code>[]</code></td><td>ничего не захватывать</td></tr>
<tr><td><code>[x]</code></td><td>копия x на момент создания лямбды</td></tr>
<tr><td><code>[&amp;x]</code></td><td>ссылка на x</td></tr>
<tr><td><code>[=]</code>, <code>[&amp;]</code></td><td>все используемые переменные по значению / по ссылке</td></tr>
<tr><td><code>[this]</code></td><td>доступ к полям объекта</td></tr>
<tr><td><code>[n = v.size()]</code></td><td>инициализирующий захват: новая переменная</td></tr>
<tr><td><code>[p = std::move(ptr)]</code></td><td>переместить владение в лямбду</td></tr>
</tbody></table></div>
<pre class="code" data-lang="cpp">int threshold = 10;
auto above = [threshold](int x) { return x > threshold; };   /* копия: 10 */
threshold = 100;
std::cout << above(50) << '\\n';     /* 1 — лямбда помнит 10 */

int total = 0;
std::for_each(v.begin(), v.end(), [&total](int x) { total += x; });   /* меняем внешнюю */

int calls = 0;
auto counter = [calls]() mutable { return ++calls; };   /* mutable: меняем свою копию */
counter(); counter();               /* 1, 2; внешняя calls по-прежнему 0 */</pre>
<div class="ichika">Явный список захвата <code>[threshold]</code> лучше, чем <code>[=]</code> или <code>[&amp;]</code> ♡ Сразу видно, от чего зависит лямбда. А <code>[&amp;]</code> в длинной лямбде — это как разрешить записке читать всю тетрадь сразу. Слишком много свободы!</div>

<h3>Висячие ссылки</h3>
<pre class="code" data-lang="cpp">std::function<int()> make_counter() {
    int count = 0;
    return [&count]() { return ++count; };   /* ОШИБКА: ссылка на локальную переменную */
}

std::function<int()> make_counter_ok() {
    int count = 0;
    return [count]() mutable { return ++count; };   /* копия живёт внутри лямбды */
}</pre>
<div class="warn"><p>Лямбда, захватившая по ссылке, не продлевает жизнь переменной. Если лямбда переживает область видимости — её вернули из функции, сохранили в поле, передали в другой поток, — захват по ссылке превращается в висячую ссылку. В таких случаях захватывай по значению или перемещением.</p></div>

<h3>Функциональные объекты и std::function</h3>
<pre class="code" data-lang="cpp">struct ByLength {                              /* функтор: класс с operator() */
    bool operator()(const std::string& a, const std::string& b) const {
        return a.size() < b.size();
    }
};
std::sort(words.begin(), words.end(), ByLength{});

#include <functional>
std::map<std::string, std::function<double(double, double)>> ops{
    {"+", [](double a, double b) { return a + b; }},
    {"*", [](double a, double b) { return a * b; }},
    {"max", [](double a, double b) { return std::max(a, b); }},
};
std::cout << ops["*"](3, 4) << '\\n';           /* 12 */

auto twice = [](auto f, auto x) { return f(f(x)); };   /* обобщённая лямбда */
std::cout << twice(square, 3) << '\\n';         /* 81 */</pre>
<p>Лямбда — это и есть функциональный объект: компилятор создаёт для неё безымянный класс с <code>operator()</code>, а захваченные переменные становятся его полями. <code>std::function</code> — обёртка, способная хранить любую вызываемую сущность с подходящей сигнатурой. Она удобна для таблиц и обратных вызовов, но немного медленнее прямого вызова; в шаблонах алгоритмов лямбды передают напрямую.</p>
<div class="ayano">Лямбда хороша, пока она короткая. Если тело занимает больше нескольких строк или повторяется в разных местах, дай ей имя: вынеси в именованную переменную или обычную функцию. Имя — это документация. <code>std::sort(v, by_score_desc)</code> понятнее, чем пятнадцать строк условия внутри вызова.</div>
`,
  p: [
    { q: `Отсортируй вектор строк по длине, а при равной длине — по алфавиту.`, a: `<pre class="code" data-lang="cpp">std::sort(w.begin(), w.end(), [](const std::string& a, const std::string& b) {
    if (a.size() != b.size()) return a.size() < b.size();
    return a < b;
});</pre>` },
    { q: `Удали из вектора все числа, меньшие заданного <code>limit</code>.`, a: `<pre class="code" data-lang="cpp">std::erase_if(v, [limit](int x) { return x < limit; });</pre>` },
    { q: `Что напечатает код?<pre class="code" data-lang="cpp">int a = 1;
auto f = [a]() { return a * 10; };
auto g = [&a]() { return a * 10; };
a = 5;
std::cout << f() << ' ' << g();</pre>`, a: `«10 50»: <code>f</code> захватила копию a = 1, <code>g</code> — ссылку и видит новое значение 5.` },
    { q: `Почему <code>make_counter</code> с захватом <code>[&amp;count]</code> — ошибка?`, a: `<code>count</code> — локальная переменная функции; после возврата она уничтожена, а лямбда хранит ссылку на неё. Вызов лямбды — неопределённое поведение.` },
    { q: `Напиши функцию <code>make_adder(n)</code>, возвращающую лямбду, прибавляющую n.`, a: `<pre class="code" data-lang="cpp">auto make_adder(int n) {
    return [n](int x) { return x + n; };
}
auto add5 = make_adder(5);
std::cout << add5(10);   /* 15 */</pre>` },
    { q: `Преобразуй вектор цен в вектор цен со скидкой <code>discount</code> процентов.`, a: `<pre class="code" data-lang="cpp">std::vector<double> out(prices.size());
std::transform(prices.begin(), prices.end(), out.begin(),
               [discount](double p) { return p * (100 - discount) / 100; });</pre>` }
  ],
  q: [
    { q: `<code>[x]</code> в лямбде:`, o: [`ссылка на x`, `копия x`, `запрет на x`, `перемещение x`], a: 1, e: `По значению.` },
    { q: `Изменять захваченную по значению переменную позволяет:`, o: [`<code>const</code>`, `<code>mutable</code>`, `<code>static</code>`, `<code>auto</code>`], a: 1, e: `Меняется копия.` },
    { q: `Лямбду возвращают из функции. Безопасный захват:`, o: [`по ссылке`, `по значению`, `<code>[&amp;]</code>`, `любой`], a: 1, e: `Иначе висячая ссылка.` },
    { q: `Хранит любую вызываемую сущность с нужной сигнатурой:`, o: [`<code>auto</code>`, `<code>std::function</code>`, `<code>void*</code>`, `<code>std::any</code> только`], a: 1, e: `Обёртка.` },
    { q: `Лямбда внутри устроена как:`, o: [`макрос`, `класс с <code>operator()</code>`, `указатель на код`, `строка`], a: 1, e: `Функтор.` }
  ],
  s: [
    `Лямбда: <code>[захват](параметры) { тело }</code>; хранится в <code>auto</code>.`,
    `<code>[x]</code> — копия, <code>[&amp;x]</code> — ссылка; явный список лучше <code>[=]</code> и <code>[&amp;]</code>.`,
    `<code>mutable</code> разрешает менять свою копию.`,
    `Лямбда, переживающая область, — только захват по значению или перемещением.`,
    `Функторы и <code>std::function</code> — для таблиц и обратных вызовов.`,
    `Длинной лямбде дай имя.`
  ]
});
