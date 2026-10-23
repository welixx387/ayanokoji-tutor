L('sysprog', 14, {
  m: 40,
  intro: 'Реальная программа состоит из десятков файлов и пользуется чужими библиотеками. Библиотеку можно включить в программу при сборке — статически, а можно подгружать при запуске — динамически. А чтобы не набирать длинные команды gcc и не пересобирать всё после каждой правки, используют make. Сегодня соберём свою библиотеку обоими способами и напишем Makefile.',
  intro2: 'Сэмпай, статическая библиотека — как напечатать нужные главы прямо в своей книге ♡ А динамическая — как сноска «см. библиотеку на полке». Книга тоньше, но без полки её не дочитать! А make — это умный помощник, который пересобирает только то, что изменилось.',
  goals: [
    'Создавать статические библиотеки через ar и подключать их',
    'Создавать динамические библиотеки и понимать, как загрузчик их находит',
    'Писать Makefile с переменными, правилами и зависимостями',
    'Понимать плюсы и минусы статической и динамической компоновки'
  ],
  c: `
<h3>Статическая библиотека</h3>
<pre class="code" data-lang="c">/* mathx.h */
#ifndef MATHX_H
#define MATHX_H
int gcd(int a, int b);
int lcm(int a, int b);
#endif

/* mathx.c */
#include "mathx.h"
int gcd(int a, int b) { while (b) { int t = a % b; a = b; b = t; } return a; }
int lcm(int a, int b) { return a / gcd(a, b) * b; }</pre>
<pre class="code" data-lang="sh">$ gcc -c -O2 mathx.c                  # mathx.o
$ ar rcs libmathx.a mathx.o           # архив объектных файлов
$ gcc main.c -L. -lmathx -o app       # -L где искать, -l имя без lib и .a
$ ./app</pre>
<p>Статическая библиотека — просто архив объектных файлов. Компоновщик копирует из неё в программу нужные функции. Программа самодостаточна, но каждая программа несёт свою копию кода.</p>

<h3>Динамическая библиотека</h3>
<pre class="code" data-lang="sh">$ gcc -c -fPIC -O2 mathx.c                  # позиционно-независимый код
$ gcc -shared -o libmathx.so mathx.o
$ gcc main.c -L. -lmathx -o app
$ ./app
./app: error while loading shared libraries: libmathx.so: cannot open shared object file
$ LD_LIBRARY_PATH=. ./app                   # подсказать загрузчику каталог
$ gcc main.c -L. -lmathx -Wl,-rpath,'$ORIGIN' -o app   # или вшить путь в программу</pre>
<p>Код динамической библиотеки загружается при запуске и делится между всеми процессами. Исправил ошибку в библиотеке — обновились все программы без пересборки. Загрузчик ищет библиотеки в путях из <code>rpath</code>, в <code>LD_LIBRARY_PATH</code>, в кэше <code>/etc/ld.so.cache</code> (обновляется командой <code>ldconfig</code>) и в системных каталогах.</p>
<div class="tbl"><table><thead><tr><th></th><th>Статическая (.a)</th><th>Динамическая (.so)</th></tr></thead><tbody>
<tr><td>Размер программы</td><td>больше</td><td>меньше</td></tr>
<tr><td>Зависимости при запуске</td><td>нет</td><td>нужна библиотека нужной версии</td></tr>
<tr><td>Обновление библиотеки</td><td>пересборка всех программ</td><td>замена одного файла</td></tr>
<tr><td>Память</td><td>копия в каждом процессе</td><td>одна копия на всех</td></tr>
</tbody></table></div>

<h3>Makefile</h3>
<pre class="code" data-lang="make">CC      = gcc
CFLAGS  = -Wall -Wextra -O2 -g -MMD
LDLIBS  = -lm
OBJS    = main.o mathx.o io.o

app: $(OBJS)
	$(CC) $(OBJS) -o $@ $(LDLIBS)

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

-include $(OBJS:.o=.d)

.PHONY: clean
clean:
	rm -f app $(OBJS) $(OBJS:.o=.d)</pre>
<div class="tbl"><table><thead><tr><th>Элемент</th><th>Смысл</th></tr></thead><tbody>
<tr><td><code>цель: зависимости</code></td><td>правило: как получить цель из зависимостей</td></tr>
<tr><td><code>$@</code></td><td>имя цели</td></tr>
<tr><td><code>$&lt;</code></td><td>первая зависимость</td></tr>
<tr><td><code>%.o: %.c</code></td><td>шаблонное правило для всех .c</td></tr>
<tr><td><code>-MMD</code></td><td>gcc записывает зависимости от заголовков в .d-файлы</td></tr>
<tr><td><code>.PHONY</code></td><td>цель — не файл, выполнять всегда</td></tr>
</tbody></table></div>
<p>make сравнивает время изменения файлов: если <code>mathx.c</code> новее <code>mathx.o</code>, пересобирается только он, а потом компонуется программа. <code>make -j8</code> собирает в 8 потоков.</p>
<div class="warn"><p>Строки команд в Makefile начинаются с символа <b>табуляции</b>, а не с пробелов. Ошибка «missing separator» почти всегда означает пробелы вместо таба.</p></div>
<div class="ichika">Защита заголовка через <code>#ifndef</code> — обязательна ♡ Иначе если заголовок подключат дважды, компилятор возмутится повторными определениями. Это как подписывать тетрадку, чтобы не взять чужую!</div>
<div class="ayano">Заголовок — это контракт библиотеки, а .c-файл — реализация. Пользователь видит только заголовок, поэтому он должен быть минимальным и понятным. Всё, что не входит в контракт, объявляй <code>static</code> в .c-файле — так внутренние функции не попадут в таблицу символов и не столкнутся с чужими именами.</div>
`,
  p: [
    { q: `Собери статическую библиотеку <code>libstr.a</code> из <code>trim.c</code> и <code>split.c</code>.`, a: `<pre class="code" data-lang="sh">$ gcc -c -O2 trim.c split.c
$ ar rcs libstr.a trim.o split.o</pre>` },
    { q: `Программа падает с «cannot open shared object file». Назови три способа исправить.`, a: `1) Запустить с <code>LD_LIBRARY_PATH=путь</code>. 2) Собрать с <code>-Wl,-rpath,путь</code>. 3) Установить библиотеку в системный каталог (например, <code>/usr/local/lib</code>) и выполнить <code>sudo ldconfig</code>.` },
    { q: `Зачем флаг <code>-fPIC</code> при сборке динамической библиотеки?`, a: `Библиотека загружается по разным адресам в разных процессах; позиционно-независимый код работает с любого адреса без исправления.` },
    { q: `Что означают <code>$@</code> и <code>$&lt;</code> в правиле Makefile?`, a: `<code>$@</code> — имя цели, <code>$&lt;</code> — первая зависимость.` },
    { q: `После изменения <code>mathx.h</code> make ничего не пересобирает. Почему и как исправить?`, a: `make не знает, что .o зависят от заголовка. Решение — флаг <code>-MMD</code> и строка <code>-include $(OBJS:.o=.d)</code>: gcc сам запишет зависимости от заголовков.` },
    { q: `Зачем объявлять внутренние функции библиотеки как <code>static</code>?`, a: `Они становятся видимыми только внутри файла: не засоряют глобальное пространство имён и не конфликтуют с функциями других библиотек и программы.` }
  ],
  q: [
    { q: `Статическая библиотека создаётся утилитой:`, o: [`<code>ar</code>`, `<code>ld.so</code>`, `<code>nm</code>`, `<code>strip</code>`], a: 0, e: `Архив .o.` },
    { q: `<code>-lmathx</code> ищет файл:`, o: [`<code>mathx.lib</code>`, `<code>libmathx.so</code> или <code>libmathx.a</code>`, `<code>mathx.h</code>`, `<code>mathx.c</code>`], a: 1, e: `Префикс lib.` },
    { q: `Переменная окружения с путями поиска .so:`, o: [`<code>PATH</code>`, `<code>LD_LIBRARY_PATH</code>`, `<code>HOME</code>`, `<code>CFLAGS</code>`], a: 1, e: `Для загрузчика.` },
    { q: `Строки команд в Makefile начинаются:`, o: [`с пробела`, `с табуляции`, `с решётки`, `с $`], a: 1, e: `Tab.` },
    { q: `Обновить общую библиотеку для всех программ без пересборки можно у:`, o: [`статической`, `динамической`, `обеих`, `ни одной`], a: 1, e: `Заменить .so.` }
  ],
  s: [
    `Статическая: <code>ar rcs libX.a *.o</code>, код копируется в программу.`,
    `Динамическая: <code>-fPIC</code> + <code>-shared</code>, загружается при запуске, одна копия на всех.`,
    `Поиск .so: rpath, <code>LD_LIBRARY_PATH</code>, <code>ldconfig</code>, системные каталоги.`,
    `Подключение: <code>-L</code> каталог, <code>-l</code> имя.`,
    `Makefile: цель, зависимости, команды с табуляцией; <code>$@</code>, <code>$&lt;</code>, <code>-MMD</code>, <code>.PHONY</code>.`,
    `Заголовок — контракт с защитой <code>#ifndef</code>; внутреннее — <code>static</code>.`
  ]
});
