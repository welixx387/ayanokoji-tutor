L('cpp', 15, {
  m: 40,
  intro: 'Настоящий проект на C++ — это десятки файлов, внешние библиотеки, отладочные и релизные сборки и тесты. Собирать его вручную командами g++ невозможно. Сегодня разберём, как разделять код на заголовки и файлы реализации по правилу одного определения, и научимся описывать сборку в CMake — стандарте де-факто для проектов на C и C++.',
  intro2: 'Сэмпай, CMake — это не сборщик, а составитель инструкций для сборщика ♡ Ты описываешь, из чего состоит проект, а CMake пишет за тебя Makefile или файлы для Ninja и Visual Studio. Одно описание — сборка где угодно!',
  goals: [
    'Разделять код на заголовки и файлы реализации',
    'Понимать правило одного определения и роль inline',
    'Писать CMakeLists.txt для программы и библиотеки',
    'Собирать отладочную и релизную версии и подключать тесты'
  ],
  c: `
<h3>Заголовки и реализация</h3>
<pre class="code" data-lang="cpp">// geometry.hpp
#pragma once                        /* защита от повторного включения */
#include <string>

namespace geo {
struct Point { double x, y; };

double distance(Point a, Point b);  /* объявление */

class Polygon {
public:
    void add(Point p);
    double perimeter() const;
    std::size_t size() const { return pts_.size(); }   /* короткие методы — прямо в классе */
private:
    std::vector<Point> pts_;
};
}</pre>
<pre class="code" data-lang="cpp">// geometry.cpp
#include "geometry.hpp"
#include <cmath>

namespace geo {
double distance(Point a, Point b) {
    return std::hypot(a.x - b.x, a.y - b.y);
}
void Polygon::add(Point p) { pts_.push_back(p); }
double Polygon::perimeter() const {
    double s = 0;
    for (std::size_t i = 0; i < pts_.size(); i++)
        s += distance(pts_[i], pts_[(i + 1) % pts_.size()]);
    return s;
}
}</pre>
<p>В заголовке — интерфейс: объявления функций, определения классов, шаблоны, <code>inline</code>-функции и <code>constexpr</code>-константы. В .cpp — реализация. Каждый .cpp компилируется отдельно, поэтому изменение реализации не требует пересборки всех файлов, подключающих заголовок.</p>
<div class="warn"><p>Заметил ошибку? В <code>geometry.hpp</code> используется <code>std::vector</code>, но <code>&lt;vector&gt;</code> не подключён. Код соберётся, если кто-то случайно подключил его раньше, и сломается в другом файле. Правило: каждый заголовок подключает всё, что использует сам.</p></div>

<h3>Правило одного определения</h3>
<p><b>ODR</b>: каждая функция и глобальная переменная должна иметь ровно одно определение во всей программе. Если определить обычную функцию в заголовке, подключённом в два .cpp, компоновщик сообщит «multiple definition». Исключения: функции, помеченные <code>inline</code>, методы, определённые внутри класса, шаблоны и <code>constexpr</code> — их определения могут повторяться, если одинаковы.</p>
<pre class="code" data-lang="cpp">// utils.hpp
inline int clamp_percent(int x) { return x < 0 ? 0 : x > 100 ? 100 : x; }   /* можно в заголовке */
inline constexpr double kPi = 3.141592653589793;</pre>

<h3>CMake</h3>
<pre class="code" data-lang="cmake">cmake_minimum_required(VERSION 3.20)
project(Geometry VERSION 1.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_library(geometry STATIC src/geometry.cpp)          # библиотека
target_include_directories(geometry PUBLIC include)    # где её заголовки
target_compile_options(geometry PRIVATE -Wall -Wextra)

add_executable(app src/main.cpp)                       # программа
target_link_libraries(app PRIVATE geometry)            # зависимость от библиотеки

enable_testing()
add_executable(geometry_tests tests/test_geometry.cpp)
target_link_libraries(geometry_tests PRIVATE geometry)
add_test(NAME geometry COMMAND geometry_tests)</pre>
<pre class="code" data-lang="sh">$ cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug     # сгенерировать сборку в каталоге build
$ cmake --build build -j                           # собрать
$ ctest --test-dir build                           # запустить тесты
$ cmake -S . -B build-rel -DCMAKE_BUILD_TYPE=Release</pre>
<div class="tbl"><table><thead><tr><th>Команда</th><th>Назначение</th></tr></thead><tbody>
<tr><td><code>add_executable</code></td><td>программа из исходников</td></tr>
<tr><td><code>add_library</code></td><td>библиотека (<code>STATIC</code> или <code>SHARED</code>)</td></tr>
<tr><td><code>target_link_libraries</code></td><td>зависимости цели</td></tr>
<tr><td><code>target_include_directories</code></td><td>каталоги заголовков</td></tr>
<tr><td><code>PUBLIC</code> / <code>PRIVATE</code></td><td>передаётся ли настройка тем, кто зависит от цели</td></tr>
</tbody></table></div>
<p>Современный CMake строится вокруг <b>целей</b> (targets): у каждой цели свои исходники, флаги и зависимости, и они наследуются через <code>target_link_libraries</code>. Сборка ведётся в отдельном каталоге (<code>build</code>), исходники остаются чистыми.</p>
<div class="ichika">Типичная структура проекта ♡ <code>include/</code> — публичные заголовки, <code>src/</code> — реализация, <code>tests/</code> — тесты, <code>CMakeLists.txt</code> в корне, а <code>build/</code> добавлен в <code>.gitignore</code>. Увидишь такую почти в любом проекте на GitHub!</div>

<h3>Зависимости и тесты</h3>
<p>Внешние библиотеки подключают через <code>find_package</code> (если они установлены в системе) или скачивают при сборке модулем <code>FetchContent</code>. Для тестов популярны GoogleTest и Catch2: тест — это маленькая программа, проверяющая функции на известных входных данных, а <code>ctest</code> запускает все тесты разом.</p>
<div class="ayano">Сборка — часть кода, и к ней те же требования: читаемость, воспроизводимость, отсутствие магии. Новый участник должен собрать проект тремя командами из README. Если для сборки нужно «вот тут подправить путь у себя», — проект не готов к работе в команде.</div>
`,
  p: [
    { q: `Почему определение обычной функции в заголовке приводит к «multiple definition»?`, a: `Заголовок подключается в несколько .cpp, и каждый получает своё определение. Компоновщик видит несколько определений одного символа — нарушение ODR. Решение: оставить в заголовке объявление или пометить функцию <code>inline</code>.` },
    { q: `Напиши минимальный CMakeLists.txt для программы из <code>main.cpp</code> и <code>util.cpp</code> на C++20.`, a: `<pre class="code" data-lang="cmake">cmake_minimum_required(VERSION 3.20)
project(Hello LANGUAGES CXX)
set(CMAKE_CXX_STANDARD 20)
add_executable(hello main.cpp util.cpp)</pre>` },
    { q: `Собери проект в релизной конфигурации.`, a: `<pre class="code" data-lang="sh">$ cmake -S . -B build-release -DCMAKE_BUILD_TYPE=Release
$ cmake --build build-release -j</pre>` },
    { q: `Чем <code>PUBLIC</code> отличается от <code>PRIVATE</code> в <code>target_include_directories</code>?`, a: `<code>PRIVATE</code> — каталог нужен только для сборки самой цели. <code>PUBLIC</code> — также передаётся всем целям, которые зависят от неё (им тоже нужны эти заголовки).` },
    { q: `Найди ошибку в заголовке <code>geometry.hpp</code> из урока и исправь.`, a: `Используется <code>std::vector</code>, но не подключён <code>&lt;vector&gt;</code>. Нужно добавить <code>#include &lt;vector&gt;</code> в сам заголовок.` },
    { q: `Подключи санитайзеры к отладочной сборке через CMake.`, a: `<pre class="code" data-lang="cmake">target_compile_options(app PRIVATE -fsanitize=address,undefined -fno-omit-frame-pointer)
target_link_options(app PRIVATE -fsanitize=address,undefined)</pre>` }
  ],
  q: [
    { q: `ODR требует, чтобы обычная функция имела:`, o: [`одно объявление`, `ровно одно определение в программе`, `определение в каждом файле`, `inline`], a: 1, e: `One Definition Rule.` },
    { q: `Определение функции в заголовке допустимо, если она:`, o: [`static в классе`, `<code>inline</code>`, `длинная`, `возвращает void`], a: 1, e: `inline разрешает повторы.` },
    { q: `Программа в CMake объявляется командой:`, o: [`<code>add_library</code>`, `<code>add_executable</code>`, `<code>project</code>`, `<code>add_test</code>`], a: 1, e: `Исполняемая цель.` },
    { q: `Сгенерировать сборку в каталог build:`, o: [`<code>cmake -S . -B build</code>`, `<code>make build</code>`, `<code>g++ build</code>`, `<code>cmake --run</code>`], a: 0, e: `Отдельный каталог.` },
    { q: `Запуск тестов CMake:`, o: [`<code>ctest</code>`, `<code>gtest</code>`, `<code>make check</code> всегда`, `<code>cmake --test</code>`], a: 0, e: `CTest.` }
  ],
  s: [
    `Заголовок — интерфейс, .cpp — реализация; заголовок подключает всё, что использует.`,
    `<code>#pragma once</code> или include guard.`,
    `ODR: одно определение; <code>inline</code>, шаблоны и методы в классе — исключения.`,
    `CMake: цели <code>add_executable</code>, <code>add_library</code>, <code>target_link_libraries</code>.`,
    `Сборка вне исходников: <code>cmake -S . -B build</code>, <code>cmake --build build</code>, <code>ctest</code>.`,
    `Проект должен собираться тремя командами из README.`
  ]
});
