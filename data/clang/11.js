L('clang', 11, {
  m: 40,
  intro: 'Указатель может указывать не только на число, но и на другой указатель или на функцию. Указатели на указатели нужны, когда функция должна изменить сам указатель вызывающего или когда мы работаем с массивом строк — например, с аргументами командной строки argv. Указатели на функции позволяют передавать поведение как параметр: так устроены qsort, обработчики событий и таблицы команд.',
  intro2: 'Сэмпай, указатель на указатель — это записка с адресом другой записки ♡ Звучит запутанно, но ты уже пользовался им: char *argv[] в main! А указатель на функцию — это записка «позвони вот по этому номеру», когда придёт время.',
  goals: [
    'Использовать указатели на указатели для изменения указателя вызывающего',
    'Работать с массивами строк и аргументами командной строки',
    'Объявлять и вызывать указатели на функции',
    'Строить таблицы обработчиков и передавать функции как параметры'
  ],
  c: `
<h3>Указатель на указатель</h3>
<pre class="code" data-lang="c">int x = 5;
int *p = &x;
int **pp = &p;
printf("%d\\n", **pp);     /* 5 */

/* функция, которая выделяет память и возвращает её через параметр */
int make_buffer(char **out, size_t n) {
    char *b = malloc(n);
    if (!b) return -1;
    b[0] = '\\0';
    *out = b;              /* меняем указатель вызывающего */
    return 0;
}

char *buf = NULL;
if (make_buffer(&buf, 256) == 0) { /* ... */ free(buf); }</pre>
<p>Если функции нужно изменить <code>int</code> — ей передают <code>int *</code>. Если нужно изменить <code>char *</code> — передают <code>char **</code>. Логика та же, просто на уровень выше.</p>

<h3>Массивы строк и argv</h3>
<pre class="code" data-lang="c">#include <stdio.h>
#include <string.h>

int main(int argc, char *argv[]) {        /* или char **argv */
    printf("программа: %s\\n", argv[0]);
    for (int i = 1; i < argc; i++)
        printf("аргумент %d: %s (%zu символов)\\n", i, argv[i], strlen(argv[i]));

    const char *days[] = { "пн", "вт", "ср", "чт", "пт" };
    size_t n = sizeof days / sizeof days[0];
    for (size_t i = 0; i < n; i++)
        printf("%s ", days[i]);
    printf("\\n");
    return 0;
}</pre>
<pre class="code" data-lang="sh">$ ./args hello "two words" 42
программа: ./args
аргумент 1: hello (5 символов)
аргумент 2: two words (9 символов)
аргумент 3: 42 (2 символов)</pre>
<p><code>argv</code> — массив указателей на строки, последний элемент <code>argv[argc]</code> равен <code>NULL</code>. Числа приходят строками; для преобразования используй <code>strtol</code> с проверкой ошибок, а не <code>atoi</code>, которая молча возвращает 0 на мусоре.</p>
<pre class="code" data-lang="c">char *end;
errno = 0;
long v = strtol(argv[1], &end, 10);
if (errno || *end != '\\0' || end == argv[1]) {
    fprintf(stderr, "не число: %s\\n", argv[1]);
    return 1;
}</pre>

<h3>Указатели на функции</h3>
<pre class="code" data-lang="c">int add(int a, int b) { return a + b; }
int mul(int a, int b) { return a * b; }

int (*op)(int, int) = add;        /* op — указатель на функцию (int, int) -> int */
printf("%d\\n", op(3, 4));        /* 7 */
op = mul;
printf("%d\\n", op(3, 4));        /* 12 */

typedef int (*BinOp)(int, int);   /* typedef делает запись читаемой */

int fold(const int *a, size_t n, int init, BinOp f) {
    int acc = init;
    for (size_t i = 0; i < n; i++) acc = f(acc, a[i]);
    return acc;
}
/* fold(arr, 5, 0, add) — сумма, fold(arr, 5, 1, mul) — произведение */</pre>

<h3>Таблица команд</h3>
<pre class="code" data-lang="c">typedef struct {
    const char *name;
    int (*run)(int argc, char *argv[]);
} Command;

static int cmd_hello(int argc, char *argv[]) { (void)argc; (void)argv; puts("hello"); return 0; }
static int cmd_count(int argc, char *argv[]) { (void)argv; printf("%d\\n", argc); return 0; }

static const Command COMMANDS[] = {
    { "hello", cmd_hello },
    { "count", cmd_count },
};

int dispatch(const char *name, int argc, char *argv[]) {
    for (size_t i = 0; i < sizeof COMMANDS / sizeof COMMANDS[0]; i++)
        if (strcmp(COMMANDS[i].name, name) == 0)
            return COMMANDS[i].run(argc, argv);
    fprintf(stderr, "неизвестная команда: %s\\n", name);
    return 1;
}</pre>
<p>Добавить команду — значит добавить строку в таблицу, не трогая логику выбора. Так устроены <code>git</code> с подкомандами, интерпретаторы и драйверы в ядре Linux, где структура операций — это набор указателей на функции.</p>
<div class="ichika">Синтаксис указателей на функции страшный ♡ <code>int (*f)(int, int)</code> — скобки вокруг <code>*f</code> обязательны, иначе это функция, возвращающая указатель! Поэтому все пишут typedef и спят спокойно, сэмпай.</div>
<div class="ayano">Указатель на функцию — способ отделить «что делать» от «когда и с чем». <code>qsort</code> умеет сортировать что угодно, потому что не знает, как сравнивать, — это знание ей передают. Такой приём называется обратным вызовом, и на нём построены все расширяемые системы.</div>
`,
  p: [
    { q: `Напиши функцию <code>void reset(int **pp)</code>, которая освобождает память и обнуляет указатель вызывающего.`, a: `<pre class="code" data-lang="c">void reset(int **pp) {
    free(*pp);
    *pp = NULL;
}
/* вызов: reset(&ptr); */</pre>` },
    { q: `Напиши программу <code>sum</code>, которая складывает все числа из аргументов командной строки.`, a: `<pre class="code" data-lang="c">int main(int argc, char *argv[]) {
    long s = 0;
    for (int i = 1; i < argc; i++) {
        char *end;
        long v = strtol(argv[i], &end, 10);
        if (*end != '\\0' || end == argv[i]) {
            fprintf(stderr, "не число: %s\\n", argv[i]);
            return 1;
        }
        s += v;
    }
    printf("%ld\\n", s);
    return 0;
}</pre>` },
    { q: `Почему <code>atoi("abc")</code> опасна для проверки ввода?`, a: `Она возвращает 0 и для «0», и для мусора — ошибку невозможно отличить. <code>strtol</code> сообщает, где закончилось число, и выставляет <code>errno</code> при переполнении.` },
    { q: `Объяви указатель на функцию, принимающую <code>double</code> и возвращающую <code>double</code>, и вызови через него <code>sqrt</code>.`, a: `<pre class="code" data-lang="c">double (*f)(double) = sqrt;
printf("%f\\n", f(2.0));</pre>` },
    { q: `Напиши функцию <code>apply</code>, применяющую функцию к каждому элементу массива.`, a: `<pre class="code" data-lang="c">void apply(int *a, size_t n, int (*f)(int)) {
    for (size_t i = 0; i < n; i++)
        a[i] = f(a[i]);
}
int square(int x) { return x * x; }
/* apply(arr, n, square); */</pre>` },
    { q: `Отсортируй массив строк <code>const char *names[]</code> по алфавиту через <code>qsort</code>.`, a: `<pre class="code" data-lang="c">static int cmp_str(const void *a, const void *b) {
    return strcmp(*(const char *const *)a, *(const char *const *)b);
}
qsort(names, n, sizeof names[0], cmp_str);</pre> Элементы массива — указатели, поэтому компаратор получает указатели на указатели.` }
  ],
  q: [
    { q: `Чтобы функция изменила <code>char *p</code> вызывающего, ей передают:`, o: [`<code>char</code>`, `<code>char *</code>`, `<code>char **</code>`, `<code>char ***</code>`], a: 2, e: `Адрес указателя.` },
    { q: `<code>argv[argc]</code> равен:`, o: [`последнему аргументу`, `<code>NULL</code>`, `имени программы`, `пустой строке`], a: 1, e: `Признак конца.` },
    { q: `Надёжное преобразование строки в число:`, o: [`<code>atoi</code>`, `<code>strtol</code>`, `<code>(int)str</code>`, `<code>printf</code>`], a: 1, e: `С проверкой ошибок.` },
    { q: `<code>int (*f)(int)</code> — это:`, o: [`функция, возвращающая указатель`, `указатель на функцию`, `массив функций`, `ошибка`], a: 1, e: `Скобки вокруг *f.` },
    { q: `В <code>qsort</code> функцию сравнения передают как:`, o: [`строку`, `указатель на функцию`, `макрос`, `глобальную переменную`], a: 1, e: `Обратный вызов.` }
  ],
  s: [
    `<code>T **</code> — чтобы функция изменила указатель <code>T *</code> вызывающего.`,
    `<code>argv</code> — массив строк, <code>argv[argc] == NULL</code>; числа — через <code>strtol</code>.`,
    `Указатель на функцию: <code>int (*f)(int, int)</code>; удобнее через <code>typedef</code>.`,
    `Функции как параметры — обратные вызовы (<code>qsort</code>, <code>fold</code>, <code>apply</code>).`,
    `Таблица «имя — функция» заменяет длинные цепочки if.`,
    `Отделяй «что делать» от «когда и с чем».`
  ]
});
