L('clang', 13, {
  m: 40,
  intro: 'Программа в одном файле на тысячу строк неудобна: её трудно читать, долго компилировать и невозможно разделить между людьми. Сегодня научимся разбивать код на модули — пары из заголовка .h и реализации .c, разберёмся с препроцессором: #include, #define, макросами и условной компиляцией, — а также с ключевыми словами static и extern, которые управляют видимостью имён между файлами.',
  intro2: 'Сэмпай, модуль — это отдел в компании ♡ Заголовок .h — табличка на двери: «Мы умеем вот это». А .c — то, что происходит внутри кабинета. Посетителям не нужно знать, как там всё устроено, — им достаточно таблички!',
  goals: [
    'Разделять программу на модули с заголовками и защитой от повторного включения',
    'Понимать работу препроцессора: include, define, условная компиляция',
    'Писать безопасные макросы и знать, когда лучше использовать функции',
    'Управлять видимостью имён через static и extern'
  ],
  c: `
<h3>Модуль: заголовок и реализация</h3>
<pre class="code" data-lang="c">/* stack.h — интерфейс */
#ifndef STACK_H
#define STACK_H

#include <stddef.h>

typedef struct Stack Stack;          /* неполный тип: устройство скрыто */

Stack *stack_new(size_t cap);
int    stack_push(Stack *s, int v);
int    stack_pop(Stack *s, int *out);
void   stack_free(Stack *s);

#endif</pre>
<pre class="code" data-lang="c">/* stack.c — реализация */
#include <stdlib.h>
#include "stack.h"

struct Stack { int *data; size_t len, cap; };

static int grow(Stack *s) {              /* static — видна только в этом файле */
    size_t nc = s->cap * 2;
    int *nd = realloc(s->data, nc * sizeof *nd);
    if (!nd) return -1;
    s->data = nd;
    s->cap = nc;
    return 0;
}

Stack *stack_new(size_t cap) {
    Stack *s = malloc(sizeof *s);
    if (!s) return NULL;
    s->data = malloc((cap ? cap : 1) * sizeof *s->data);
    if (!s->data) { free(s); return NULL; }
    s->len = 0;
    s->cap = cap ? cap : 1;
    return s;
}

int stack_push(Stack *s, int v) {
    if (s->len == s->cap && grow(s) < 0) return -1;
    s->data[s->len++] = v;
    return 0;
}

int stack_pop(Stack *s, int *out) {
    if (s->len == 0) return -1;
    *out = s->data[--s->len];
    return 0;
}

void stack_free(Stack *s) {
    if (s) { free(s->data); free(s); }
}</pre>
<pre class="code" data-lang="sh">$ gcc -Wall -c stack.c
$ gcc -Wall -c main.c
$ gcc stack.o main.o -o app</pre>
<p>Заголовок с угловыми скобками <code>&lt;stdio.h&gt;</code> ищется в системных каталогах, с кавычками <code>"stack.h"</code> — сначала рядом с файлом. Защита <code>#ifndef</code> не даёт включить заголовок дважды. Неполный тип <code>typedef struct Stack Stack;</code> скрывает поля: пользователи модуля работают только через функции и не могут сломать внутреннее состояние.</p>

<h3>Препроцессор</h3>
<p>Препроцессор обрабатывает текст до компиляции: подставляет файлы и макросы, вырезает участки кода. Результат можно посмотреть командой <code>gcc -E</code>.</p>
<pre class="code" data-lang="c">#define BUF_SIZE 4096
#define SQUARE(x) ((x) * (x))             /* скобки обязательны */
#define MAX(a, b) ((a) > (b) ? (a) : (b))

#ifdef DEBUG
#define LOG(msg) fprintf(stderr, "[%s:%d] %s\\n", __FILE__, __LINE__, msg)
#else
#define LOG(msg) ((void)0)
#endif</pre>
<pre class="code" data-lang="sh">$ gcc -DDEBUG main.c -o app       # определить DEBUG при компиляции</pre>
<div class="warn"><p>Макрос — текстовая подстановка, а не функция. <code>SQUARE(i++)</code> превратится в <code>((i++) * (i++))</code> — двойное изменение, неопределённое поведение. Без скобок <code>#define SQUARE(x) x * x</code> выражение <code>SQUARE(1 + 2)</code> даст 1 + 2 * 1 + 2 = 5. Для вычислений предпочитай функции с <code>static inline</code>, а для констант — <code>enum</code> или <code>const</code>.</p></div>

<h3>static и extern</h3>
<div class="tbl"><table><thead><tr><th>Объявление</th><th>Видимость</th></tr></thead><tbody>
<tr><td><code>int counter;</code> вне функций</td><td>глобальная, видна другим файлам</td></tr>
<tr><td><code>static int counter;</code> вне функций</td><td>только этот файл</td></tr>
<tr><td><code>extern int counter;</code></td><td>объявление: переменная определена в другом файле</td></tr>
<tr><td><code>static</code> функция</td><td>только этот файл</td></tr>
<tr><td><code>static</code> внутри функции</td><td>сохраняет значение между вызовами</td></tr>
</tbody></table></div>
<pre class="code" data-lang="c">/* config.c */
int verbose = 0;               /* определение — ровно в одном файле */

/* config.h */
extern int verbose;            /* объявление для всех, кто подключит заголовок */</pre>
<div class="ichika">Ошибка «multiple definition» значит, что определение попало в заголовок ♡ Заголовок подключили два .c-файла — и переменная родилась дважды. В .h — только объявления с extern, а определение — в одном .c!</div>
<div class="ayano">Хороший модуль открывает минимум. Всё, что не нужно пользователям, — <code>static</code> в .c-файле. Структуры, которые не должны меняться напрямую, — неполные типы. Чем меньше интерфейс, тем свободнее ты в изменении реализации, и тем меньше способов использовать модуль неправильно.</div>
`,
  p: [
    { q: `Почему в заголовке нельзя писать <code>int counter = 0;</code>?`, a: `Каждый .c-файл, подключивший заголовок, получит своё определение — компоновщик сообщит «multiple definition». В заголовке — <code>extern int counter;</code>, определение — в одном .c.` },
    { q: `Что вычислит <code>#define DOUBLE(x) x + x</code> в выражении <code>3 * DOUBLE(2)</code>?`, a: `8: подстановка даёт <code>3 * 2 + 2</code>. Правильно: <code>#define DOUBLE(x) ((x) + (x))</code>.` },
    { q: `Замени макрос <code>MAX</code> на безопасную функцию.`, a: `<pre class="code" data-lang="c">static inline int max_int(int a, int b) {
    return a > b ? a : b;
}</pre> Аргументы вычисляются ровно один раз, а компилятор проверяет типы.` },
    { q: `Напиши использование модуля <code>stack</code> в <code>main.c</code>.`, a: `<pre class="code" data-lang="c">#include <stdio.h>
#include "stack.h"

int main(void) {
    Stack *s = stack_new(4);
    if (!s) return 1;
    for (int i = 1; i <= 10; i++) stack_push(s, i);
    int v;
    while (stack_pop(s, &v) == 0) printf("%d ", v);
    printf("\\n");
    stack_free(s);
    return 0;
}</pre>` },
    { q: `Как включить отладочный вывод только при сборке с флагом?`, a: `Обернуть код в <code>#ifdef DEBUG</code> … <code>#endif</code> и собирать отладочную версию с <code>-DDEBUG</code>.` },
    { q: `Зачем в <code>stack.h</code> неполный тип вместо полного описания структуры?`, a: `Пользователи не видят поля и не могут изменить их напрямую. Реализацию можно поменять (например, на связный список), не перекомпилируя и не переписывая чужой код.` }
  ],
  q: [
    { q: `Защита заголовка от повторного включения:`, o: [`<code>#pragma comment</code>`, `<code>#ifndef X_H</code> / <code>#define X_H</code> / <code>#endif</code>`, `<code>static</code>`, `<code>extern</code>`], a: 1, e: `Include guard.` },
    { q: `<code>static</code> функция видна:`, o: [`везде`, `только в своём файле`, `только в main`, `только в заголовке`], a: 1, e: `Внутренняя связь.` },
    { q: `<code>extern int x;</code> — это:`, o: [`определение`, `объявление`, `инициализация`, `макрос`], a: 1, e: `Определено в другом месте.` },
    { q: `Посмотреть результат препроцессора:`, o: [`<code>gcc -E</code>`, `<code>gcc -S</code>`, `<code>gcc -c</code>`, `<code>gcc -g</code>`], a: 0, e: `-E.` },
    { q: `<code>SQUARE(i++)</code> для макроса <code>((x) * (x))</code>:`, o: [`квадрат i`, `неопределённое поведение`, `ошибка компиляции`, `i + 1`], a: 1, e: `Двойной инкремент.` }
  ],
  s: [
    `Модуль = заголовок (интерфейс) + .c (реализация); защита <code>#ifndef</code>.`,
    `Неполный тип скрывает устройство структуры.`,
    `Препроцессор: <code>#include</code>, <code>#define</code>, <code>#ifdef</code>; смотреть через <code>gcc -E</code>.`,
    `Макросы — подстановка текста: скобки вокруг аргументов, без побочных эффектов; лучше <code>static inline</code>.`,
    `<code>static</code> скрывает имя в файле; <code>extern</code> объявляет внешнее.`,
    `Определения переменных — в одном .c, в заголовке — только объявления.`
  ]
});
