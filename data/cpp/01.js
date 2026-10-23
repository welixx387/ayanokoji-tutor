L('cpp', 1, {
  m: 35,
  intro: 'C++ вырос из C и почти полностью с ним совместим, но добавляет мощные инструменты: классы, шаблоны, стандартную библиотеку контейнеров, автоматическое управление ресурсами. На C++ написаны браузеры, игровые движки, базы данных и компиляторы. Мы будем изучать современный C++ — стандарт C++17 и новее, — где многие опасности C закрыты удобными и безопасными средствами.',
  intro2: 'Сэмпай, если C — это набор отличных инструментов, то C++ — целая мастерская ♡ Там есть и старые инструменты из C, и умные станки, которые сами следят за памятью. Мы сразу будем учиться пользоваться станками, а не пилить руками!',
  goals: [
    'Компилировать программы на C++ через g++ с нужным стандартом',
    'Выводить и вводить данные через iostream',
    'Понимать пространства имён и квалификатор std::',
    'Знать главные отличия современного C++ от C'
  ],
  c: `
<h3>Первая программа</h3>
<pre class="code" data-lang="cpp">#include <iostream>
#include <string>

int main() {
    std::string name;
    std::cout << "Как тебя зовут? ";
    std::getline(std::cin, name);
    std::cout << "Привет, " << name << "!\\n";
    return 0;
}</pre>
<pre class="code" data-lang="sh">$ g++ -std=c++20 -Wall -Wextra -o hello hello.cpp
$ ./hello
Как тебя зовут? Киётака
Привет, Киётака!</pre>
<div class="tbl"><table><thead><tr><th>Элемент</th><th>Смысл</th></tr></thead><tbody>
<tr><td><code>#include &lt;iostream&gt;</code></td><td>потоки ввода-вывода (заголовки C++ без .h)</td></tr>
<tr><td><code>std::cout &lt;&lt; x</code></td><td>вывод: оператор «вставить в поток»</td></tr>
<tr><td><code>std::cin &gt;&gt; x</code></td><td>ввод слова или числа</td></tr>
<tr><td><code>std::getline(std::cin, s)</code></td><td>ввод целой строки</td></tr>
<tr><td><code>std::string</code></td><td>строка, сама управляющая памятью</td></tr>
</tbody></table></div>
<p>Файлы C++ обычно имеют расширение <code>.cpp</code>, заголовки — <code>.hpp</code> или <code>.h</code>. Компилятор — <code>g++</code> или <code>clang++</code>. Флаг <code>-std=c++20</code> выбирает стандарт: C++11 принёс современный язык, C++14 и C++17 его доработали, C++20 и C++23 добавили модули, концепты и диапазоны.</p>

<h3>Пространства имён</h3>
<p>Все имена стандартной библиотеки находятся в пространстве имён <code>std</code>. Пространства имён решают проблему конфликтов: твоя функция <code>sort</code> не столкнётся с <code>std::sort</code>.</p>
<pre class="code" data-lang="cpp">namespace geometry {
    double area(double w, double h) { return w * h; }
}

int main() {
    std::cout << geometry::area(3, 4) << '\\n';
    using std::cout;                  /* можно ввести отдельное имя */
    cout << "ok\\n";
}</pre>
<div class="warn"><p>Строка <code>using namespace std;</code> в учебниках встречается часто, но в заголовочных файлах её писать нельзя: она вываливает тысячи имён в каждый файл, подключивший заголовок, и вызывает конфликты. В небольших .cpp-файлах допустимо, но привычка писать <code>std::</code> полезнее.</p></div>

<h3>Ввод чисел с проверкой</h3>
<pre class="code" data-lang="cpp">#include <iostream>

int main() {
    int a, b;
    if (!(std::cin >> a >> b)) {
        std::cerr << "нужно два целых числа\\n";
        return 1;
    }
    std::cout << a << " + " << b << " = " << a + b << '\\n';
}</pre>
<p>Поток в логическом контексте ложен, если чтение не удалось. <code>std::cerr</code> — поток ошибок. В <code>main</code> можно не писать <code>return 0</code> — это единственная функция, для которой он подразумевается.</p>
<div class="ichika"><code>std::endl</code> не только переводит строку, но и сбрасывает буфер ♡ В циклах это медленно! Пиши <code>'\\n'</code>, а <code>std::endl</code> — только когда вывод нужен прямо сейчас.</div>

<h3>Что меняется по сравнению с C</h3>
<div class="tbl"><table><thead><tr><th>В C</th><th>В современном C++</th></tr></thead><tbody>
<tr><td><code>char[]</code> и <code>strcpy</code></td><td><code>std::string</code></td></tr>
<tr><td><code>malloc</code> и ручной массив</td><td><code>std::vector</code></td></tr>
<tr><td><code>malloc</code>/<code>free</code></td><td>RAII и умные указатели</td></tr>
<tr><td><code>printf</code></td><td><code>std::cout</code>, <code>std::format</code> (C++20), <code>std::print</code> (C++23)</td></tr>
<tr><td><code>#define</code> для констант</td><td><code>constexpr</code></td></tr>
<tr><td>указатели для изменения аргументов</td><td>ссылки</td></tr>
<tr><td><code>NULL</code></td><td><code>nullptr</code></td></tr>
</tbody></table></div>
<div class="ayano">C++ — большой язык, и знать его целиком не нужно никому. Задача junior-разработчика — уверенно владеть современным подмножеством: стандартные контейнеры, классы с RAII, умные указатели, алгоритмы. Если в новом коде ты пишешь <code>new</code>, <code>delete</code> или <code>malloc</code> — остановись и подумай, нет ли стандартного средства.</div>
`,
  p: [
    { q: `Напиши программу, которая спрашивает возраст и выводит, сколько лет осталось до 18 (или «уже взрослый»).`, a: `<pre class="code" data-lang="cpp">#include <iostream>

int main() {
    int age;
    std::cout << "Возраст: ";
    if (!(std::cin >> age)) return 1;
    if (age >= 18) std::cout << "уже взрослый\\n";
    else std::cout << "осталось " << 18 - age << '\\n';
}</pre>` },
    { q: `Скомпилируй <code>main.cpp</code> по стандарту C++17 со всеми предупреждениями и отладочной информацией.`, a: `<pre class="code" data-lang="sh">$ g++ -std=c++17 -Wall -Wextra -g -o main main.cpp</pre>` },
    { q: `Почему после <code>std::cin &gt;&gt; n</code> следующий <code>std::getline</code> возвращает пустую строку?`, a: `<code>&gt;&gt;</code> оставляет в потоке перевод строки, и <code>getline</code> сразу его читает. Решение — пропустить остаток: <code>std::cin.ignore(10000, '\\n');</code> или <code>std::getline(std::cin &gt;&gt; std::ws, s)</code>.` },
    { q: `Объяви пространство имён <code>school</code> с функцией <code>greet</code> и вызови её.`, a: `<pre class="code" data-lang="cpp">namespace school {
    void greet() { std::cout << "Добро пожаловать в ANHS\\n"; }
}
int main() { school::greet(); }</pre>` },
    { q: `Чем <code>std::endl</code> отличается от <code>'\\n'</code>?`, a: `<code>std::endl</code> выводит перевод строки и сбрасывает буфер потока; <code>'\\n'</code> только переводит строку. Частые сбросы замедляют вывод.` },
    { q: `Почему нельзя писать <code>using namespace std;</code> в заголовочном файле?`, a: `Директива попадёт во все файлы, подключающие заголовок, и откроет все имена <code>std</code> — это вызывает неожиданные конфликты имён у пользователей заголовка.` }
  ],
  q: [
    { q: `Компилятор C++ из GCC:`, o: [`<code>gcc</code> только`, `<code>g++</code>`, `<code>cpp</code>`, `<code>ld</code>`], a: 1, e: `g++.` },
    { q: `Вывод в стандартный поток в C++:`, o: [`<code>std::cin &gt;&gt;</code>`, `<code>std::cout &lt;&lt;</code>`, `<code>print()</code>`, `<code>echo</code>`], a: 1, e: `cout.` },
    { q: `Имена стандартной библиотеки находятся в пространстве:`, o: [`<code>stl</code>`, `<code>std</code>`, `<code>cpp</code>`, `глобальном`], a: 1, e: `std.` },
    { q: `Нулевой указатель в современном C++:`, o: [`<code>NULL</code>`, `<code>0</code>`, `<code>nullptr</code>`, `<code>none</code>`], a: 2, e: `Типобезопасный.` },
    { q: `Строка, сама управляющая памятью:`, o: [`<code>char*</code>`, `<code>std::string</code>`, `<code>char[]</code>`, `<code>const char*</code>`], a: 1, e: `std::string.` }
  ],
  s: [
    `Сборка: <code>g++ -std=c++20 -Wall -Wextra</code>.`,
    `Ввод-вывод: <code>std::cout</code>, <code>std::cin</code>, <code>std::cerr</code>, <code>std::getline</code>.`,
    `Пространства имён избегают конфликтов; стандартная библиотека — в <code>std</code>.`,
    `Не пиши <code>using namespace std;</code> в заголовках.`,
    `<code>'\\n'</code> быстрее <code>std::endl</code>.`,
    `Современный C++: <code>std::string</code>, <code>std::vector</code>, RAII, <code>nullptr</code>, <code>constexpr</code>.`
  ]
});
