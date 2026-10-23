L('clang', 9, {
  m: 40,
  intro: 'Массивы фиксированного размера и локальные переменные живут на стеке и исчезают при выходе из функции. Но часто размер данных известен только во время работы программы, а данные должны жить дольше функции. Для этого есть динамическая память — куча. Сегодня изучим malloc, calloc, realloc и free и научимся не терять память и не портить её.',
  intro2: 'Сэмпай, куча — это склад, где можно арендовать место ♡ malloc — взять в аренду, free — вернуть ключи. Не вернёшь — склад постепенно заполнится (утечка). Вернёшь и продолжишь пользоваться — там уже кто-то другой (использование после освобождения)!',
  goals: [
    'Выделять память через malloc и calloc и проверять результат',
    'Изменять размер блока через realloc без потери данных',
    'Освобождать память через free и избегать утечек и двойного освобождения',
    'Реализовать динамически растущий массив'
  ],
  c: `
<h3>malloc и free</h3>
<pre class="code" data-lang="c">#include <stdio.h>
#include <stdlib.h>

int main(void) {
    size_t n;
    if (scanf("%zu", &n) != 1 || n == 0) return 1;

    int *a = malloc(n * sizeof *a);     /* место под n int */
    if (a == NULL) {
        perror("malloc");
        return 1;
    }
    for (size_t i = 0; i < n; i++) a[i] = (int)(i * i);
    printf("last = %d\\n", a[n - 1]);

    free(a);                             /* вернуть память */
    a = NULL;                            /* защита от повторного использования */
    return 0;
}</pre>
<p><code>malloc(size)</code> возвращает указатель на блок из <code>size</code> байт или <code>NULL</code>, если памяти нет. Содержимое блока не инициализировано. Запись <code>sizeof *a</code> вместо <code>sizeof(int)</code> безопаснее: при смене типа <code>a</code> размер исправится сам.</p>

<h3>calloc и realloc</h3>
<div class="tbl"><table><thead><tr><th>Функция</th><th>Что делает</th></tr></thead><tbody>
<tr><td><code>malloc(size)</code></td><td>блок без инициализации</td></tr>
<tr><td><code>calloc(n, size)</code></td><td>блок из n элементов, заполненный нулями; проверяет переполнение <code>n * size</code></td></tr>
<tr><td><code>realloc(p, size)</code></td><td>изменить размер блока; данные сохраняются, адрес может измениться</td></tr>
<tr><td><code>free(p)</code></td><td>освободить; <code>free(NULL)</code> ничего не делает</td></tr>
</tbody></table></div>
<pre class="code" data-lang="c">int *tmp = realloc(a, new_n * sizeof *a);
if (tmp == NULL) {
    /* a всё ещё действителен — освободить или продолжить со старым размером */
    free(a);
    return 1;
}
a = tmp;</pre>
<div class="warn"><p>Никогда не пиши <code>a = realloc(a, ...)</code>: если <code>realloc</code> вернёт <code>NULL</code>, указатель на старый блок потеряется — утечка. Всегда используй временную переменную.</p></div>

<h3>Динамический массив</h3>
<pre class="code" data-lang="c">typedef struct {
    int *data;
    size_t len, cap;
} IntVec;

int vec_push(IntVec *v, int x) {
    if (v->len == v->cap) {
        size_t ncap = v->cap ? v->cap * 2 : 8;     /* удвоение ёмкости */
        int *nd = realloc(v->data, ncap * sizeof *nd);
        if (!nd) return -1;
        v->data = nd;
        v->cap = ncap;
    }
    v->data[v->len++] = x;
    return 0;
}

void vec_free(IntVec *v) {
    free(v->data);
    v->data = NULL;
    v->len = v->cap = 0;
}

/* использование */
IntVec v = {0};
int x;
while (scanf("%d", &x) == 1)
    if (vec_push(&v, x) < 0) { perror("push"); break; }
printf("прочитано %zu чисел\\n", v.len);
vec_free(&v);</pre>
<p>Удвоение ёмкости даёт амортизированную стоимость O(1) на добавление: копирований мало, хотя каждое иногда дорогое. Так устроены <code>std::vector</code> в C++, <code>Vec</code> в Rust и списки Python.</p>
<div class="ichika">Структуру <code>typedef struct</code> мы подробно разберём в следующем уроке ♡ А пока главное: длина — сколько элементов лежит, ёмкость — сколько поместится. Это как количество гостей и количество стульев!</div>

<h3>Ошибки работы с кучей</h3>
<div class="tbl"><table><thead><tr><th>Ошибка</th><th>Последствие</th></tr></thead><tbody>
<tr><td>Утечка: нет <code>free</code></td><td>память растёт, долгоживущая программа падает</td></tr>
<tr><td>Использование после <code>free</code></td><td>порча данных, уязвимости</td></tr>
<tr><td>Двойной <code>free</code></td><td>разрушение структур кучи, падение</td></tr>
<tr><td>Выход за границу блока</td><td>порча соседних блоков</td></tr>
<tr><td><code>free</code> не того указателя</td><td>падение: освобождать можно только то, что вернул malloc</td></tr>
</tbody></table></div>
<p>Все эти ошибки ловит AddressSanitizer: собирай отладочные версии с <code>-fsanitize=address</code>.</p>
<div class="ayano">Для каждого <code>malloc</code> должен быть ясен владелец — код, который обязан вызвать <code>free</code>. Хорошее правило: кто выделил, тот и освобождает, а функции, возвращающие выделенную память, документируют это явно. Пары «создать — уничтожить», как <code>vec_push</code> и <code>vec_free</code>, делают владение очевидным.</div>
`,
  p: [
    { q: `Выдели память под строку длины <code>n</code> символов и заполни её символом «*».`, a: `<pre class="code" data-lang="c">char *s = malloc(n + 1);
if (!s) return NULL;
memset(s, '*', n);
s[n] = '\\0';</pre>` },
    { q: `Чем <code>calloc(n, sizeof(int))</code> отличается от <code>malloc(n * sizeof(int))</code>?`, a: `<code>calloc</code> заполняет память нулями и проверяет переполнение при умножении; <code>malloc</code> оставляет мусор.` },
    { q: `Найди ошибку:<pre class="code" data-lang="c">char *p = malloc(10);
free(p);
p[0] = 'x';</pre>`, a: `Использование после освобождения: после <code>free</code> блок больше не принадлежит программе. Нужно обнулить указатель и не обращаться к нему.` },
    { q: `Напиши функцию <code>str_dup</code> — копию строки в новой памяти.`, a: `<pre class="code" data-lang="c">char *str_dup(const char *s) {
    size_t n = strlen(s) + 1;
    char *d = malloc(n);
    if (d) memcpy(d, s, n);
    return d;          /* вызывающий обязан сделать free */
}</pre>` },
    { q: `Почему ёмкость массива удваивают, а не увеличивают на 1?`, a: `При росте на 1 каждое добавление копирует весь массив — O(n²) на n добавлений. Удвоение даёт O(n) суммарно, то есть O(1) в среднем на элемент.` },
    { q: `Как найти утечки в программе?`, a: `<pre class="code" data-lang="sh">$ gcc -g -fsanitize=address prog.c -o prog && ./prog
$ valgrind --leak-check=full ./prog</pre>` }
  ],
  q: [
    { q: `<code>malloc</code> при нехватке памяти возвращает:`, o: [`0 байт`, `<code>NULL</code>`, `−1`, `завершает программу`], a: 1, e: `Проверяй результат.` },
    { q: `Память, заполненную нулями, выделяет:`, o: [`<code>malloc</code>`, `<code>calloc</code>`, `<code>realloc</code>`, `<code>alloca</code>`], a: 1, e: `calloc.` },
    { q: `<code>free(NULL)</code>:`, o: [`падение`, `ничего не делает`, `утечка`, `UB`], a: 1, e: `Безопасно.` },
    { q: `Правильное использование realloc:`, o: [`<code>a = realloc(a, n)</code>`, `через временную переменную`, `только после free`, `только для строк`], a: 1, e: `Иначе утечка при NULL.` },
    { q: `Двойной <code>free</code> одного указателя:`, o: [`безопасен`, `неопределённое поведение`, `освобождает вдвое больше`, `игнорируется`], a: 1, e: `Порча кучи.` }
  ],
  s: [
    `<code>malloc</code> — блок без инициализации, <code>calloc</code> — с нулями; проверяй на <code>NULL</code>.`,
    `<code>realloc</code> — через временный указатель.`,
    `Каждому <code>malloc</code> — ровно один <code>free</code>; после free обнуляй указатель.`,
    `Динамический массив: длина, ёмкость, удвоение при заполнении.`,
    `Ошибки: утечки, use-after-free, двойной free, выход за границу — ловит ASan.`,
    `У каждого блока должен быть понятный владелец.`
  ]
});
