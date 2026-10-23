L('cpp', 16, {
  m: 45,
  intro: 'Финальная контрольная курса C++ — проект «Библиотека»: консольная программа учёта книг и читателей с сохранением в файл, собранная через CMake и покрытая тестами. В нём сходятся классы и инварианты, контейнеры STL и алгоритмы, умные указатели, лямбды, исключения и модули. Вторая часть урока — вопросы, которые задают на собеседовании junior-разработчику на C++.',
  intro2: 'Сэмпай, финальный проект! ♡ Сделай его так, будто покажешь будущему работодателю: аккуратные классы, понятные ошибки, тесты, README. А потом — серия вопросов, как на настоящем собеседовании. Я буду строгой, но справедливой!',
  goals: [
    'Спроектировать модель предметной области из нескольких классов',
    'Реализовать операции через контейнеры, алгоритмы и исключения',
    'Организовать проект с CMake, тестами и разделением на модули',
    'Ответить на типовые вопросы собеседования по C++'
  ],
  c: `
<h3>Требования</h3>
<ul class="ex-l">
<li>Книга: ISBN (уникальный), название, автор, год, выдана или нет.</li>
<li>Читатель: номер билета, имя, список взятых книг (не больше 3).</li>
<li>Операции: добавить книгу, зарегистрировать читателя, выдать, вернуть, поиск по автору, список должников.</li>
<li>Ошибки (нет книги, книга уже выдана, лимит) — исключения с понятным текстом.</li>
<li>Сохранение и загрузка в текстовый файл; сборка CMake; тесты на основные сценарии.</li>
</ul>

<h3>Модель</h3>
<pre class="code" data-lang="cpp">// library.hpp
#pragma once
#include <map>
#include <optional>
#include <stdexcept>
#include <string>
#include <vector>

struct Book {
    std::string isbn, title, author;
    int year = 0;
    std::optional<int> borrowed_by;           /* номер билета или пусто */
};

struct Reader {
    int card = 0;
    std::string name;
    std::vector<std::string> books;           /* ISBN взятых книг */
};

class LibraryError : public std::runtime_error {
    using std::runtime_error::runtime_error;
};

class Library {
public:
    static constexpr std::size_t kMaxBooks = 3;

    void add_book(Book b);
    int register_reader(std::string name);
    void lend(const std::string& isbn, int card);
    void give_back(const std::string& isbn);
    std::vector<const Book*> by_author(const std::string& author) const;

private:
    Book& book(const std::string& isbn);
    Reader& reader(int card);
    std::map<std::string, Book> books_;       /* ключ — ISBN */
    std::map<int, Reader> readers_;
    int next_card_ = 1;
};</pre>

<h3>Ключевые операции</h3>
<pre class="code" data-lang="cpp">// library.cpp
#include "library.hpp"
#include <algorithm>

Book& Library::book(const std::string& isbn) {
    auto it = books_.find(isbn);
    if (it == books_.end()) throw LibraryError("нет книги с ISBN " + isbn);
    return it->second;
}

void Library::add_book(Book b) {
    if (books_.contains(b.isbn)) throw LibraryError("ISBN уже есть: " + b.isbn);
    std::string key = b.isbn;
    books_.emplace(std::move(key), std::move(b));
}

void Library::lend(const std::string& isbn, int card) {
    Book& b = book(isbn);
    Reader& r = reader(card);
    if (b.borrowed_by) throw LibraryError("книга уже выдана");
    if (r.books.size() >= kMaxBooks) throw LibraryError(r.name + ": лимит книг");
    r.books.push_back(isbn);                  /* сначала то, что может бросить */
    b.borrowed_by = card;                     /* потом то, что не бросает */
}

void Library::give_back(const std::string& isbn) {
    Book& b = book(isbn);
    if (!b.borrowed_by) throw LibraryError("книга не выдана");
    std::erase(reader(*b.borrowed_by).books, isbn);
    b.borrowed_by.reset();
}

std::vector<const Book*> Library::by_author(const std::string& author) const {
    std::vector<const Book*> out;
    for (const auto& [isbn, b] : books_)
        if (b.author == author) out.push_back(&b);
    std::sort(out.begin(), out.end(), [](const Book* x, const Book* y) { return x->year < y->year; });
    return out;
}</pre>
<p>Обрати внимание на порядок в <code>lend</code>: <code>push_back</code> может бросить <code>std::bad_alloc</code>, поэтому он выполняется раньше изменения книги. Если он не удастся, ни книга, ни читатель не изменятся — строгая гарантия. <code>by_author</code> возвращает указатели без владения: книги принадлежат библиотеке.</p>
<div class="warn"><p>Указатели и ссылки на элементы <code>std::map</code> остаются действительными при вставке других элементов — в отличие от <code>std::vector</code>. Но после удаления книги указатель на неё станет висячим. Документируй, сколько живут возвращаемые указатели.</p></div>

<h3>Тест</h3>
<pre class="code" data-lang="cpp">// tests/test_library.cpp — без фреймворка, на assert
#include <cassert>
#include "library.hpp"

int main() {
    Library lib;
    lib.add_book({"111", "Dune", "Herbert", 1965});
    int card = lib.register_reader("Kiyotaka");
    lib.lend("111", card);
    bool thrown = false;
    try { lib.lend("111", card); } catch (const LibraryError&) { thrown = true; }
    assert(thrown);                           /* повторная выдача запрещена */
    lib.give_back("111");
    lib.lend("111", card);                    /* снова можно */
    return 0;
}</pre>
<div class="ichika">Сохранение напиши сам ♡ Формат — строки вида <code>B|isbn|title|author|year|card</code> и <code>R|card|name</code>. Не забудь безопасную запись через временный файл и проверку каждой строки при загрузке. Ты уже делал это в курсе C!</div>

<h3>Вопросы собеседования</h3>
<div class="tbl"><table><thead><tr><th>Вопрос</th><th>Суть ответа</th></tr></thead><tbody>
<tr><td>Что такое RAII?</td><td>Ресурс захватывается в конструкторе и освобождается в деструкторе</td></tr>
<tr><td>Ссылка и указатель?</td><td>Ссылка — псевдоним, не пустая, не перенаправляется; указатель может быть nullptr</td></tr>
<tr><td>Зачем виртуальный деструктор?</td><td>Корректное удаление наследника через указатель на базовый класс</td></tr>
<tr><td>Правило трёх/пяти/нуля?</td><td>Свой деструктор — нужны копирование и перемещение; лучше не писать ни одной функции</td></tr>
<tr><td>Что делает <code>std::move</code>?</td><td>Приводит к rvalue, разрешая забрать ресурсы; сам ничего не перемещает</td></tr>
<tr><td><code>unique_ptr</code> и <code>shared_ptr</code>?</td><td>Единственный владелец против подсчёта ссылок</td></tr>
<tr><td>Как устроен <code>std::vector</code>?</td><td>Непрерывный массив, удвоение ёмкости, амортизированный O(1) <code>push_back</code></td></tr>
<tr><td><code>map</code> и <code>unordered_map</code>?</td><td>Дерево O(log n) с порядком против хеш-таблицы O(1) в среднем</td></tr>
<tr><td>Что такое инвалидация итераторов?</td><td>После изменения контейнера итераторы и ссылки могут стать недействительными</td></tr>
</tbody></table></div>
<div class="ayano">На собеседовании по C++ ценят не знание экзотики, а уверенное владение основами и честность о границах своих знаний. Покажи проект, объясни, почему выбрал именно такие контейнеры и где проходят границы владения, — это говорит о тебе больше, чем заученные определения. Дальше: «A Tour of C++» Страуструпа, «Effective Modern C++» Мейерса и свои проекты.</div>
`,
  p: [
    { q: `Реализуй метод <code>reader</code> по аналогии с <code>book</code>.`, a: `<pre class="code" data-lang="cpp">Reader& Library::reader(int card) {
    auto it = readers_.find(card);
    if (it == readers_.end()) throw LibraryError("нет читателя " + std::to_string(card));
    return it->second;
}</pre>` },
    { q: `Реализуй <code>register_reader</code>.`, a: `<pre class="code" data-lang="cpp">int Library::register_reader(std::string name) {
    int card = next_card_++;
    readers_.emplace(card, Reader{card, std::move(name), {}});
    return card;
}</pre>` },
    { q: `Добавь метод, возвращающий имена читателей, у которых больше одной книги.`, a: `<pre class="code" data-lang="cpp">std::vector<std::string> Library::heavy_readers() const {
    std::vector<std::string> out;
    for (const auto& [card, r] : readers_)
        if (r.books.size() > 1) out.push_back(r.name);
    return out;
}</pre>` },
    { q: `Вопрос собеседования: почему <code>by_author</code> возвращает <code>const Book*</code>, а не копии?`, a: `Чтобы не копировать книги и показать, что вызывающий получает доступ без владения и без права изменять. Минус — указатели станут висячими после удаления книги, это нужно оговорить.` },
    { q: `Вопрос собеседования: что будет, если в <code>lend</code> поменять местами <code>push_back</code> и присваивание <code>borrowed_by</code>?`, a: `Если <code>push_back</code> бросит исключение, книга останется помеченной как выданная, а у читателя её не будет — нарушение инварианта. Текущий порядок даёт строгую гарантию.` },
    { q: `Опиши CMakeLists.txt для этого проекта.`, a: `<pre class="code" data-lang="cmake">cmake_minimum_required(VERSION 3.20)
project(Library LANGUAGES CXX)
set(CMAKE_CXX_STANDARD 20)
add_library(library src/library.cpp src/storage.cpp)
target_include_directories(library PUBLIC include)
add_executable(libapp src/main.cpp)
target_link_libraries(libapp PRIVATE library)
enable_testing()
add_executable(library_tests tests/test_library.cpp)
target_link_libraries(library_tests PRIVATE library)
add_test(NAME library COMMAND library_tests)</pre>` }
  ],
  q: [
    { q: `Необязательное значение «кому выдана книга» лучше хранить как:`, o: [`<code>int</code> с −1`, `<code>std::optional&lt;int&gt;</code>`, `<code>int*</code>`, `строку`], a: 1, e: `Явное «нет значения».` },
    { q: `Указатели на элементы <code>std::map</code> после вставки других элементов:`, o: [`становятся недействительными`, `остаются действительными`, `обнуляются`, `зависят от размера`], a: 1, e: `Узлы не перемещаются.` },
    { q: `Строгая гарантия в <code>lend</code> достигается:`, o: [`try-catch внутри`, `порядком: сначала бросающие операции`, `мьютексом`, `глобальной переменной`], a: 1, e: `Всё или ничего.` },
    { q: `<code>std::erase(vec, value)</code> появился в:`, o: [`C++11`, `C++14`, `C++17`, `C++20`], a: 3, e: `C++20.` },
    { q: `Своё исключение библиотеки лучше наследовать от:`, o: [`<code>int</code>`, `<code>std::runtime_error</code>`, `<code>std::string</code>`, `ничего`], a: 1, e: `Ловится как std::exception.` }
  ],
  s: [
    `Модель: <code>Book</code>, <code>Reader</code>, <code>Library</code>; инварианты в методах.`,
    `<code>std::map</code> по ключу, <code>std::optional</code> для «нет значения».`,
    `Ошибки — своё исключение от <code>std::runtime_error</code>.`,
    `Порядок операций даёт строгую гарантию.`,
    `CMake, тесты, README — признаки готового проекта.`,
    `Собеседование: RAII, владение, перемещение, контейнеры, инвалидация итераторов.`
  ]
});
