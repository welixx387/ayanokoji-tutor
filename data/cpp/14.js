L('cpp', 14, {
  m: 40,
  intro: 'В C ошибки возвращают кодами, и их легко проигнорировать. C++ предлагает исключения: функция, не способная выполнить свою работу, бросает объект-исключение, а обработчик выше по стеку его ловит. Промежуточный код при этом не загромождён проверками, а RAII гарантирует освобождение ресурсов по пути. Сегодня изучим try, throw и catch, иерархию стандартных исключений, гарантии безопасности и альтернативы исключениям.',
  intro2: 'Сэмпай, исключение — это пожарная тревога ♡ Кто-то на пятом этаже нажал кнопку, и все этажи между ним и охраной эвакуируются по порядку, закрывая за собой двери — это RAII! А охрана внизу ловит тревогу и решает, что делать.',
  goals: [
    'Бросать и ловить исключения, перехватывать их по константной ссылке',
    'Знать иерархию стандартных исключений и создавать свои',
    'Понимать раскрутку стека и роль RAII',
    'Знать гарантии безопасности исключений и альтернативы: optional и expected'
  ],
  c: `
<h3>throw, try, catch</h3>
<pre class="code" data-lang="cpp">#include <iostream>
#include <stdexcept>
#include <string>

int parse_age(const std::string& s) {
    std::size_t pos = 0;
    int age = std::stoi(s, &pos);            /* сама бросает при мусоре */
    if (pos != s.size()) throw std::invalid_argument("лишние символы: " + s);
    if (age < 0 || age > 150) throw std::out_of_range("возраст вне диапазона");
    return age;
}

int main() {
    for (std::string s : {"17", "abc", "200", "42x"}) {
        try {
            std::cout << parse_age(s) << '\\n';
        } catch (const std::out_of_range& e) {      /* более конкретный — раньше */
            std::cerr << "диапазон: " << e.what() << '\\n';
        } catch (const std::exception& e) {          /* все стандартные */
            std::cerr << "ошибка: " << e.what() << '\\n';
        }
    }
}</pre>
<p>Обработчики проверяются по порядку, срабатывает первый подходящий, поэтому конкретные типы пишут раньше общих. Ловят по <b>константной ссылке</b>: без копирования и без срезки наследника до базового класса.</p>

<h3>Стандартные исключения</h3>
<div class="tbl"><table><thead><tr><th>Класс</th><th>Когда</th></tr></thead><tbody>
<tr><td><code>std::exception</code></td><td>база всех стандартных, метод <code>what()</code></td></tr>
<tr><td><code>std::logic_error</code> → <code>std::invalid_argument</code>, <code>std::out_of_range</code></td><td>ошибка в аргументах, нарушение условий</td></tr>
<tr><td><code>std::runtime_error</code></td><td>ошибки, видимые только при работе: файл, сеть</td></tr>
<tr><td><code>std::bad_alloc</code></td><td>не удалось выделить память</td></tr>
</tbody></table></div>
<pre class="code" data-lang="cpp">class ConfigError : public std::runtime_error {
public:
    ConfigError(const std::string& file, int line, const std::string& msg)
        : std::runtime_error(file + ":" + std::to_string(line) + ": " + msg), line_(line) {}
    int line() const { return line_; }
private:
    int line_;
};

throw ConfigError("app.conf", 12, "неизвестный ключ 'colr'");</pre>

<h3>Раскрутка стека и RAII</h3>
<p>После <code>throw</code> выполнение выходит из функций одна за другой, пока не найдётся подходящий <code>catch</code>, — это <b>раскрутка стека</b>. Для всех локальных объектов на пути вызываются деструкторы. Поэтому код на RAII автоматически безопасен: файлы закрываются, мьютексы освобождаются, память возвращается. Если обработчик так и не найден, программа завершается вызовом <code>std::terminate</code>.</p>
<pre class="code" data-lang="cpp">void process(const std::string& path) {
    std::ifstream in(path);                       /* закроется при любом выходе */
    auto buffer = std::make_unique<char[]>(1 << 20);   /* освободится */
    std::lock_guard lock(m);                      /* разблокируется */
    parse(in, buffer.get());                      /* может бросить */
}</pre>

<h3>Гарантии безопасности</h3>
<div class="tbl"><table><thead><tr><th>Гарантия</th><th>Смысл</th></tr></thead><tbody>
<tr><td>Без исключений (<code>noexcept</code>)</td><td>операция никогда не бросает: деструкторы, перемещение, <code>swap</code></td></tr>
<tr><td>Строгая</td><td>при исключении состояние как до вызова — «всё или ничего»</td></tr>
<tr><td>Базовая</td><td>при исключении нет утечек и инварианты целы, но состояние могло измениться</td></tr>
</tbody></table></div>
<p>Строгую гарантию часто получают приёмом «сделай копию, измени копию, обменяй»: все опасные действия выполняются над копией, а обмен <code>noexcept</code> уже не может провалиться.</p>
<div class="warn"><p>Исключения — для исключительных ситуаций, а не для обычного управления потоком. Не бросай их в цикле поиска «не нашёл — бросил». Ожидаемое отсутствие результата лучше выражать возвращаемым значением.</p></div>

<h3>Альтернативы: optional и expected</h3>
<pre class="code" data-lang="cpp">#include <optional>
std::optional<int> find_index(const std::vector<int>& v, int x) {
    for (std::size_t i = 0; i < v.size(); i++)
        if (v[i] == x) return static_cast<int>(i);
    return std::nullopt;                 /* «нет значения» — нормальный исход */
}
if (auto i = find_index(v, 7)) std::cout << "индекс " << *i << '\\n';

#include <expected>                      /* C++23 */
std::expected<int, std::string> safe_div(int a, int b) {
    if (b == 0) return std::unexpected("деление на ноль");
    return a / b;
}
auto r = safe_div(10, 0);
if (!r) std::cerr << r.error() << '\\n';</pre>
<div class="ichika">Когда что выбирать ♡ Значения может просто не быть — <code>std::optional</code>. Ошибка ожидаема и вызывающий обязан её разобрать — <code>std::expected</code>. Что-то пошло совсем не так и обработать можно только высоко наверху — исключение!</div>
<div class="ayano">Ловить исключение стоит там, где ты действительно можешь что-то сделать: повторить попытку, показать сообщение пользователю, перейти к следующему файлу. Перехватить и молча проглотить — худший вариант: ошибка исчезает, а программа продолжает работать с неверным состоянием. Обычно достаточно одного обработчика на верхнем уровне и RAII везде ниже.</div>
`,
  p: [
    { q: `Напиши функцию <code>sqrt_checked</code>, бросающую <code>std::domain_error</code> для отрицательного аргумента, и вызови её в <code>try</code>.`, a: `<pre class="code" data-lang="cpp">double sqrt_checked(double x) {
    if (x < 0) throw std::domain_error("корень из отрицательного");
    return std::sqrt(x);
}
try {
    std::cout << sqrt_checked(-4);
} catch (const std::exception& e) {
    std::cerr << e.what() << '\\n';
}</pre>` },
    { q: `Почему исключения ловят по <code>const&amp;</code>, а не по значению?`, a: `По значению исключение копируется, а объект производного класса срезается до базового — теряется конкретный тип и данные. Константная ссылка сохраняет полный объект без копии.` },
    { q: `Почему порядок <code>catch (const std::exception&amp;)</code> перед <code>catch (const std::out_of_range&amp;)</code> неправильный?`, a: `<code>std::out_of_range</code> — наследник <code>std::exception</code>, поэтому первый обработчик перехватит всё, и второй никогда не сработает.` },
    { q: `Перепиши функцию поиска пользователя, чтобы отсутствие не было исключением.`, a: `<pre class="code" data-lang="cpp">std::optional<User> find_user(const std::string& login) {
    auto it = users.find(login);
    if (it == users.end()) return std::nullopt;
    return it->second;
}</pre>` },
    { q: `Обеспечь строгую гарантию для метода, который заменяет содержимое вектора <code>items_</code> отфильтрованной версией.`, a: `<pre class="code" data-lang="cpp">void keep_positive() {
    std::vector<int> tmp;
    for (int x : items_) if (x > 0) tmp.push_back(x);   /* может бросить — items_ не тронут */
    items_.swap(tmp);                                   /* noexcept */
}</pre>` },
    { q: `Что произойдёт, если исключение не будет поймано ни одним обработчиком?`, a: `Вызовется <code>std::terminate</code>, и программа аварийно завершится; раскрутка стека при этом может не выполниться.` }
  ],
  q: [
    { q: `Ловить исключения правильно:`, o: [`по значению`, `по константной ссылке`, `по указателю`, `через void`], a: 1, e: `Без копии и срезки.` },
    { q: `Базовый класс стандартных исключений:`, o: [`<code>std::error</code>`, `<code>std::exception</code>`, `<code>std::throwable</code>`, `<code>std::fault</code>`], a: 1, e: `Метод what().` },
    { q: `При исключении деструкторы локальных объектов:`, o: [`не вызываются`, `вызываются при раскрутке стека`, `вызываются в конце программы`, `зависят от компилятора`], a: 1, e: `Основа RAII.` },
    { q: `Строгая гарантия означает:`, o: [`никаких исключений`, `при ошибке состояние не изменилось`, `нет утечек, состояние любое`, `программа завершится`], a: 1, e: `Всё или ничего.` },
    { q: `Отсутствие значения как нормальный исход выражают через:`, o: [`исключение`, `<code>std::optional</code>`, `<code>std::terminate</code>`, `глобальную переменную`], a: 1, e: `optional.` }
  ],
  s: [
    `<code>throw</code> — сообщить, <code>try</code>/<code>catch</code> — обработать; ловить по <code>const&amp;</code>.`,
    `Конкретные обработчики — раньше общих; свои исключения наследуют от стандартных.`,
    `Раскрутка стека вызывает деструкторы — RAII делает код безопасным.`,
    `Гарантии: <code>noexcept</code>, строгая, базовая; приём «копия и обмен».`,
    `Ожидаемые неудачи — <code>std::optional</code>, <code>std::expected</code>.`,
    `Лови там, где можешь обработать; не глотай ошибки молча.`
  ]
});
