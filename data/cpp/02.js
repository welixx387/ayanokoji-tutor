L('cpp', 2, {
  m: 40,
  intro: 'Типы C++ во многом совпадают с типами C, но язык добавляет несколько важных возможностей. Ссылки позволяют работать с переменной под другим именем без синтаксиса указателей. auto выводит тип из инициализатора. const и constexpr выражают неизменность и вычисления во время компиляции. А фигурная инициализация защищает от незаметной потери данных.',
  intro2: 'Сэмпай, ссылка — это прозвище переменной ♡ Аянокоджи и «Киётака» — один и тот же человек: позовёшь по прозвищу — откликнется он же. В отличие от указателя, ссылку не нужно разыменовывать, и она не бывает пустой!',
  goals: [
    'Использовать ссылки и понимать их отличие от указателей',
    'Применять auto там, где тип очевиден или громоздок',
    'Различать const и constexpr и использовать их по назначению',
    'Инициализировать переменные фигурными скобками и избегать сужающих преобразований'
  ],
  c: `
<h3>Ссылки</h3>
<pre class="code" data-lang="cpp">int x = 10;
int& r = x;        /* r — другое имя для x */
r = 20;            /* x теперь 20 */

const int& cr = x; /* ссылка только для чтения */
// cr = 5;         /* ошибка компиляции */</pre>
<div class="tbl"><table><thead><tr><th></th><th>Ссылка <code>T&amp;</code></th><th>Указатель <code>T*</code></th></tr></thead><tbody>
<tr><td>Может быть пустой</td><td>нет, должна быть инициализирована</td><td>да, <code>nullptr</code></td></tr>
<tr><td>Можно перенаправить</td><td>нет</td><td>да</td></tr>
<tr><td>Синтаксис доступа</td><td>как к обычной переменной</td><td><code>*p</code>, <code>p-&gt;</code></td></tr>
<tr><td>Когда использовать</td><td>параметры, псевдонимы</td><td>необязательные значения, низкоуровневый код</td></tr>
</tbody></table></div>
<div class="warn"><p>Ссылка не продлевает жизнь объекта (кроме особого случая с временными объектами и <code>const&amp;</code>). Возвращать ссылку на локальную переменную так же опасно, как указатель на неё: получится висячая ссылка.</p></div>

<h3>auto</h3>
<pre class="code" data-lang="cpp">auto n = 42;              /* int */
auto pi = 3.14;           /* double */
auto name = std::string("Ichika");
auto it = scores.begin(); /* вместо std::vector<int>::iterator */

for (const auto& s : names)   /* перебор без копирования */
    std::cout << s << '\\n';</pre>
<p><code>auto</code> выводит тип из инициализатора. Он особенно удобен для итераторов и сложных шаблонных типов. Но <code>auto</code> отбрасывает ссылки и <code>const</code> верхнего уровня: <code>auto x = r;</code> создаёт копию. Нужна ссылка — пиши <code>auto&amp;</code> или <code>const auto&amp;</code>.</p>

<h3>const и constexpr</h3>
<pre class="code" data-lang="cpp">const int max_users = read_config();     /* значение известно при запуске */
constexpr int buffer_size = 4096;        /* значение известно при компиляции */
constexpr double pi = 3.141592653589793;

constexpr int square(int x) { return x * x; }
int table[square(8)];                    /* вычислено компилятором: 64 */
static_assert(square(5) == 25);          /* проверка при компиляции */</pre>
<p><code>const</code> означает «нельзя изменить после инициализации». <code>constexpr</code> требует, чтобы значение вычислялось при компиляции, — его можно использовать в размерах массивов, параметрах шаблонов и <code>static_assert</code>. Это современная замена <code>#define</code> для констант: у <code>constexpr</code> есть тип и область видимости.</p>
<div class="ichika">Правило хорошего тона ♡ Всё, что не должно меняться, объявляй <code>const</code>. Компилятор будет охранять это обещание, а читатель сразу поймёт, что значение одно на всю функцию. Меньше движущихся частей — меньше ошибок!</div>

<h3>Фигурная инициализация</h3>
<pre class="code" data-lang="cpp">int a = 3.7;     /* компилируется: a = 3, дробь потеряна молча */
int b{3.7};      /* ошибка компиляции: сужающее преобразование */
int c{};         /* ноль */
double d{5};     /* 5.0 — расширение допустимо */
std::vector<int> v{1, 2, 3};

auto big = 3'000'000'000LL;   /* разделители разрядов, long long */</pre>
<p>Инициализация через <code>{}</code> запрещает сужающие преобразования: потерю дробной части, выход за диапазон. Пустые скобки дают нулевое значение. Явные преобразования в C++ делают через <code>static_cast</code>:</p>
<pre class="code" data-lang="cpp">double avg = static_cast<double>(sum) / count;</pre>
<p><code>static_cast</code> заметнее, чем приведение в стиле C <code>(double)sum</code>, и его легко найти поиском. Для низкоуровневых трюков есть <code>reinterpret_cast</code> и <code>const_cast</code> — в обычном коде они почти не нужны.</p>
<div class="ayano">Типы — это проверки, которые компилятор выполняет бесплатно. Фигурная инициализация ловит потерю данных, <code>const</code> — случайные изменения, <code>constexpr</code> и <code>static_assert</code> — ошибки в константах. Каждая ошибка, найденная компилятором, — ошибка, которую не придётся искать в отладчике.</div>
`,
  p: [
    { q: `Что напечатает код?<pre class="code" data-lang="cpp">int x = 1;
int& r = x;
int y = r;
r = 5;
std::cout << x << ' ' << y;</pre>`, a: `«5 1»: <code>r</code> — псевдоним <code>x</code>, а <code>y</code> — отдельная копия, сделанная до изменения.` },
    { q: `Перепиши цикл без копирования строк:<pre class="code" data-lang="cpp">for (std::string s : names) std::cout << s;</pre>`, a: `<pre class="code" data-lang="cpp">for (const auto& s : names) std::cout << s;</pre>` },
    { q: `Объяви константу времени компиляции для числа секунд в сутках и проверь её через <code>static_assert</code>.`, a: `<pre class="code" data-lang="cpp">constexpr int seconds_per_day = 24 * 60 * 60;
static_assert(seconds_per_day == 86400);</pre>` },
    { q: `Почему <code>int n{2.5};</code> не компилируется, а <code>int n = 2.5;</code> компилируется?`, a: `Фигурная инициализация запрещает сужающие преобразования (потерю дробной части), а копирующая инициализация молча отбрасывает дробь.` },
    { q: `Вычисли среднее целых <code>sum</code> и <code>n</code> как <code>double</code> в стиле C++.`, a: `<pre class="code" data-lang="cpp">double avg = static_cast<double>(sum) / n;</pre>` },
    { q: `Какой тип выведет <code>auto x = r;</code>, если <code>r</code> — <code>const int&amp;</code>?`, a: `<code>int</code>: <code>auto</code> отбрасывает ссылку и <code>const</code> верхнего уровня, <code>x</code> — независимая изменяемая копия.` }
  ],
  q: [
    { q: `Ссылка в C++:`, o: [`может быть nullptr`, `должна быть инициализирована при объявлении`, `можно перенаправить`, `занимает 0 байт всегда`], a: 1, e: `Псевдоним.` },
    { q: `Значение вычисляется при компиляции:`, o: [`<code>const</code>`, `<code>constexpr</code>`, `<code>auto</code>`, `<code>static</code>`], a: 1, e: `constexpr.` },
    { q: `<code>int x{};</code> даёт:`, o: [`мусор`, `0`, `ошибку`, `1`], a: 1, e: `Нулевая инициализация.` },
    { q: `Явное преобразование типа в стиле C++:`, o: [`<code>(double)x</code>`, `<code>static_cast&lt;double&gt;(x)</code>`, `<code>double:x</code>`, `<code>to_double(x)</code>`], a: 1, e: `<code>static_cast</code>.` },
    { q: `Перебор контейнера без копирования элементов:`, o: [`<code>for (auto x : v)</code>`, `<code>for (const auto&amp; x : v)</code>`, `<code>for (auto* x : v)</code>`, `<code>for (x in v)</code>`], a: 1, e: `Константная ссылка.` }
  ],
  s: [
    `Ссылка <code>T&amp;</code> — псевдоним; не бывает пустой и не перенаправляется.`,
    `<code>const T&amp;</code> — чтение без копирования.`,
    `<code>auto</code> выводит тип, но отбрасывает ссылки; нужна ссылка — <code>auto&amp;</code>.`,
    `<code>const</code> — не меняется; <code>constexpr</code> — известно при компиляции; <code>static_assert</code>.`,
    `<code>{}</code> запрещает сужающие преобразования.`,
    `Явные преобразования — <code>static_cast</code>.`
  ]
});
