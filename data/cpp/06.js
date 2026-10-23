L('cpp', 6, {
  m: 40,
  intro: 'Главная идея C++, отличающая его от C, — RAII: захват ресурса есть инициализация. Ресурс — память, файл, сокет, мьютекс — получается в конструкторе объекта и освобождается в деструкторе. Деструктор вызывается автоматически, когда объект выходит из области видимости, даже при ошибке. Поэтому в правильном C++ утечки и забытые закрытия почти невозможны.',
  intro2: 'Сэмпай, RAII — как библиотечная книга с таймером ♡ Взял книгу — и в момент, когда выходишь из читального зала, она сама возвращается на полку. Забыть вернуть невозможно, даже если ты выбежал по пожарной тревоге!',
  goals: [
    'Понимать время жизни автоматических, динамических и статических объектов',
    'Писать деструкторы и знать, когда они вызываются',
    'Применять идиому RAII для управления ресурсами',
    'Видеть RAII в стандартной библиотеке: контейнеры, файлы, блокировки'
  ],
  c: `
<h3>Время жизни объектов</h3>
<div class="tbl"><table><thead><tr><th>Вид</th><th>Создаётся</th><th>Уничтожается</th></tr></thead><tbody>
<tr><td>Автоматический (локальный)</td><td>при объявлении</td><td>при выходе из блока <code>{ }</code></td></tr>
<tr><td>Статический (глобальный, <code>static</code>)</td><td>до <code>main</code> или при первом проходе</td><td>после завершения <code>main</code></td></tr>
<tr><td>Динамический (<code>new</code>)</td><td><code>new</code></td><td><code>delete</code> — вручную</td></tr>
<tr><td>Член класса</td><td>вместе с объектом</td><td>вместе с объектом</td></tr>
</tbody></table></div>

<h3>Деструктор</h3>
<pre class="code" data-lang="cpp">#include <iostream>
#include <string>

class Noisy {
public:
    explicit Noisy(std::string name) : name_(std::move(name)) {
        std::cout << "+ " << name_ << '\\n';
    }
    ~Noisy() { std::cout << "- " << name_ << '\\n'; }   /* деструктор */
private:
    std::string name_;
};

int main() {
    Noisy a{"a"};
    {
        Noisy b{"b"};
        Noisy c{"c"};
    }                       /* здесь уничтожаются c, затем b */
    std::cout << "конец main\\n";
}                           /* здесь уничтожается a */</pre>
<pre class="code" data-lang="txt">+ a
+ b
+ c
- c
- b
конец main
- a</pre>
<p>Деструктор — метод <code>~ИмяКласса()</code> без параметров. Объекты уничтожаются в порядке, <b>обратном</b> созданию. Деструктор вызывается при любом выходе из блока: обычном, через <code>return</code>, <code>break</code> или исключение.</p>

<h3>RAII своими руками</h3>
<pre class="code" data-lang="cpp">#include <cstdio>
#include <stdexcept>

class File {
public:
    File(const char* path, const char* mode) : f_(std::fopen(path, mode)) {
        if (!f_) throw std::runtime_error(std::string("не открыть ") + path);
    }
    ~File() { if (f_) std::fclose(f_); }

    File(const File&) = delete;              /* копировать нельзя: два владельца */
    File& operator=(const File&) = delete;

    void write(const std::string& s) { std::fputs(s.c_str(), f_); }
private:
    std::FILE* f_;
};

void save_report() {
    File out("report.txt", "w");
    out.write("строка 1\\n");
    might_throw();                 /* даже если здесь исключение — файл закроется */
    out.write("строка 2\\n");
}                                  /* fclose вызывается автоматически */</pre>
<p>Обрати внимание на <code>= delete</code> для копирования: если скопировать <code>File</code>, два объекта закроют один и тот же файл дважды. Правила копирования и перемещения — тема урока 9.</p>
<div class="ichika">Сравни с C ♡ Там на каждый ранний <code>return</code> нужно не забыть <code>fclose</code>, <code>free</code> и <code>unlock</code>. А в C++ просто пишешь логику — уборка происходит сама. Именно поэтому опытные программисты так любят RAII!</div>

<h3>RAII в стандартной библиотеке</h3>
<div class="tbl"><table><thead><tr><th>Ресурс</th><th>RAII-обёртка</th></tr></thead><tbody>
<tr><td>динамический массив</td><td><code>std::vector</code>, <code>std::string</code></td></tr>
<tr><td>один объект в куче</td><td><code>std::unique_ptr</code>, <code>std::shared_ptr</code></td></tr>
<tr><td>файл</td><td><code>std::ifstream</code>, <code>std::ofstream</code></td></tr>
<tr><td>мьютекс</td><td><code>std::lock_guard</code>, <code>std::scoped_lock</code></td></tr>
<tr><td>поток выполнения</td><td><code>std::jthread</code> (C++20)</td></tr>
</tbody></table></div>
<pre class="code" data-lang="cpp">#include <fstream>
#include <mutex>

std::mutex m;
void add(std::vector<int>& v, int x) {
    std::lock_guard<std::mutex> lock(m);   /* захват в конструкторе */
    v.push_back(x);
}                                          /* освобождение в деструкторе */

void copy_file(const std::string& from, const std::string& to) {
    std::ifstream in(from);
    std::ofstream out(to);
    out << in.rdbuf();
}                                          /* оба файла закрываются сами */</pre>
<div class="warn"><p>Деструктор не должен бросать исключения: если он вызывается во время обработки другого исключения, программа аварийно завершится. Деструкторы по умолчанию неявно помечены <code>noexcept</code>.</p></div>
<div class="ayano">Правило современного C++: каждый ресурс сразу передаётся во владение объекту. Голые <code>new</code>/<code>delete</code>, <code>fopen</code>/<code>fclose</code>, <code>lock</code>/<code>unlock</code> в прикладном коде — признак того, что владение не оформлено. Когда у каждого ресурса есть владелец с деструктором, код становится безопасным при любых путях выполнения.</div>
`,
  p: [
    { q: `В каком порядке будут вызваны деструкторы?<pre class="code" data-lang="cpp">Noisy x{"x"};
Noisy y{"y"};
Noisy z{"z"};</pre>`, a: `z, y, x — в порядке, обратном созданию.` },
    { q: `Напиши RAII-класс <code>Timer</code>, который печатает время жизни объекта в миллисекундах.`, a: `<pre class="code" data-lang="cpp">#include <chrono>

class Timer {
public:
    explicit Timer(std::string label)
        : label_(std::move(label)), start_(std::chrono::steady_clock::now()) {}
    ~Timer() {
        auto ms = std::chrono::duration_cast<std::chrono::milliseconds>(
            std::chrono::steady_clock::now() - start_).count();
        std::cout << label_ << ": " << ms << " ms\\n";
    }
private:
    std::string label_;
    std::chrono::steady_clock::time_point start_;
};
/* { Timer t{"сортировка"}; std::sort(...); } */</pre>` },
    { q: `Почему у класса <code>File</code> запрещено копирование?`, a: `Копия получила бы тот же <code>FILE*</code>, и оба деструктора вызвали бы <code>fclose</code> для одного файла — двойное освобождение ресурса.` },
    { q: `Перепиши код через RAII:<pre class="code" data-lang="cpp">m.lock();
if (queue.empty()) { m.unlock(); return; }
process(queue.front());
m.unlock();</pre>`, a: `<pre class="code" data-lang="cpp">std::lock_guard<std::mutex> lock(m);
if (queue.empty()) return;
process(queue.front());</pre> Мьютекс освобождается при любом выходе, включая исключение в <code>process</code>.` },
    { q: `Когда уничтожается объект, созданный через <code>new</code>?`, a: `Только при явном <code>delete</code>. Если его забыть — утечка; поэтому вместо <code>new</code> используют умные указатели (урок 10).` },
    { q: `Прочитай файл построчно через <code>std::ifstream</code> и посчитай строки.`, a: `<pre class="code" data-lang="cpp">std::ifstream in("data.txt");
if (!in) { std::cerr << "не открыть\\n"; return 1; }
std::string line;
int n = 0;
while (std::getline(in, line)) n++;
std::cout << n << '\\n';</pre>` }
  ],
  q: [
    { q: `Деструктор локального объекта вызывается:`, o: [`вручную`, `при выходе из блока`, `при завершении программы всегда`, `никогда`], a: 1, e: `Автоматически.` },
    { q: `Порядок уничтожения локальных объектов:`, o: [`как создавались`, `обратный созданию`, `случайный`, `по алфавиту`], a: 1, e: `Как стопка тарелок.` },
    { q: `RAII означает:`, o: [`ресурс захватывается в конструкторе, освобождается в деструкторе`, `рекурсивный алгоритм`, `ручное управление памятью`, `сборщик мусора`], a: 0, e: `Resource Acquisition Is Initialization.` },
    { q: `RAII-обёртка для мьютекса:`, o: [`<code>std::mutex</code> сама`, `<code>std::lock_guard</code>`, `<code>std::thread</code>`, `<code>std::atomic</code>`], a: 1, e: `<code>lock_guard</code>.` },
    { q: `Бросать исключения из деструктора:`, o: [`рекомендуется`, `нельзя — возможен аварийный выход`, `обязательно`, `только в main`], a: 1, e: `noexcept по умолчанию.` }
  ],
  s: [
    `Автоматические объекты живут до конца блока; уничтожаются в обратном порядке.`,
    `Деструктор <code>~T()</code> вызывается при любом выходе: return, break, исключение.`,
    `RAII: ресурс в конструкторе, освобождение в деструкторе.`,
    `Объекты-владельцы ресурсов часто нельзя копировать (<code>= delete</code>).`,
    `Стандартные RAII-типы: контейнеры, умные указатели, <code>fstream</code>, <code>lock_guard</code>.`,
    `Деструктор не бросает исключений.`
  ]
});
