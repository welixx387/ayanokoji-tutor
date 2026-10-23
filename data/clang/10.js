L('clang', 10, {
  m: 40,
  intro: 'Реальные данные редко бывают одним числом: у ученика есть имя, класс и оценки, у точки — две координаты. Структуры позволяют объединить разнородные поля в один тип. Сегодня изучим struct, научимся передавать структуры в функции, разберём выравнивание полей в памяти, а также познакомимся с enum для именованных констант, union для разделяемой памяти и typedef для удобных имён типов.',
  intro2: 'Сэмпай, структура — это анкета ♡ В одной анкете имя, возраст, класс — всё вместе, а не на разных листочках. А enum — это список вариантов ответа, чтобы никто не написал «пятничный» вместо «пятница»!',
  goals: [
    'Объявлять структуры, инициализировать их и обращаться к полям',
    'Передавать структуры в функции по значению и по указателю',
    'Понимать выравнивание и размер структур в памяти',
    'Использовать enum, union и typedef по назначению'
  ],
  c: `
<h3>struct</h3>
<pre class="code" data-lang="c">#include <stdio.h>
#include <string.h>

struct Student {
    char name[32];
    int grade;
    double avg;
};

int main(void) {
    struct Student s1 = { "Kiyotaka", 10, 4.2 };
    struct Student s2 = { .name = "Ichika", .grade = 9 };   /* остальные поля — 0 */
    s2.avg = 4.8;
    strcpy(s2.name, "Amasawa");
    printf("%s, %d класс, %.1f\\n", s1.name, s1.grade, s1.avg);

    struct Student group[2] = { s1, s2 };      /* массив структур */
    struct Student copy = s1;                  /* структуры копируются присваиванием */
    (void)group; (void)copy;
    return 0;
}</pre>
<p>Доступ к полю — через точку <code>s.field</code>, а через указатель — стрелкой <code>p-&gt;field</code>. Структуры можно присваивать и возвращать из функций целиком, но нельзя сравнивать оператором <code>==</code> — сравнивай поля.</p>

<h3>Структуры и функции</h3>
<pre class="code" data-lang="c">typedef struct { double x, y; } Point;

double dist(Point a, Point b) {             /* по значению: маленькая структура */
    double dx = a.x - b.x, dy = a.y - b.y;
    return sqrt(dx * dx + dy * dy);
}

void move(Point *p, double dx, double dy) {  /* по указателю: изменить */
    p->x += dx;
    p->y += dy;
}

void print_student(const struct Student *s) {  /* по указателю на const: большая, только чтение */
    printf("%s %d\\n", s->name, s->grade);
}</pre>
<p>Передача по значению копирует всю структуру. Для больших структур передают указатель — с <code>const</code>, если функция только читает.</p>

<h3>Выравнивание</h3>
<pre class="code" data-lang="c">struct A { char c; int i; char d; };   /* sizeof = 12 */
struct B { int i; char c; char d; };   /* sizeof = 8 */</pre>
<p>Процессор быстрее читает <code>int</code> по адресу, кратному 4. Поэтому компилятор вставляет между полями пустые байты — <b>выравнивание</b>. В <code>struct A</code> после <code>c</code> стоят 3 пустых байта, а в конце ещё 3. Упорядочивая поля от больших к меньшим, можно экономить память. Важное следствие: структуру нельзя записывать в файл или сеть «как есть», ожидая одинакового формата на разных платформах.</p>

<h3>enum, union, typedef</h3>
<pre class="code" data-lang="c">typedef enum { RED, GREEN, BLUE } Color;          /* 0, 1, 2 */
enum Weekday { MON = 1, TUE, WED, THU, FRI };     /* 1, 2, 3, 4, 5 */

const char *color_name(Color c) {
    switch (c) {
    case RED:   return "red";
    case GREEN: return "green";
    case BLUE:  return "blue";
    }
    return "?";
}

typedef enum { T_INT, T_DOUBLE, T_STR } Tag;
typedef struct {
    Tag tag;                 /* какое поле union сейчас действительно */
    union {
        int i;
        double d;
        const char *s;
    } as;
} Value;

void print_value(Value v) {
    switch (v.tag) {
    case T_INT:    printf("%d\\n", v.as.i); break;
    case T_DOUBLE: printf("%g\\n", v.as.d); break;
    case T_STR:    printf("%s\\n", v.as.s); break;
    }
}</pre>
<div class="tbl"><table><thead><tr><th>Конструкция</th><th>Назначение</th></tr></thead><tbody>
<tr><td><code>enum</code></td><td>именованные целые константы вместо «магических чисел»</td></tr>
<tr><td><code>union</code></td><td>все поля в одной памяти; в каждый момент действительно одно; размер = самое большое поле</td></tr>
<tr><td><code>typedef</code></td><td>новое имя для типа: <code>typedef struct {...} Point;</code></td></tr>
</tbody></table></div>
<div class="ichika">Связка «enum-тег + union» — это размеченное объединение ♡ Так в C делают значения, которые бывают разных типов: токены в компиляторах, значения в интерпретаторах. А в Rust это встроено прямо в язык — увидишь в курсе Rust!</div>
<div class="ayano">Хорошая структура — это модель предметной области. Если функции передаёт пять связанных параметров, скорее всего, им место в одной структуре. Если в структуре поля, которые никогда не используются вместе, — возможно, это две разные сущности. Правильные типы делают неправильный код трудным для написания.</div>
`,
  p: [
    { q: `Объяви структуру <code>Book</code> с полями: название (до 64 символов), автор (до 64), год, цена в копейках. Создай и выведи одну книгу.`, a: `<pre class="code" data-lang="c">typedef struct {
    char title[64];
    char author[64];
    int year;
    long price_kop;
} Book;

Book b = { "The C Programming Language", "Kernighan, Ritchie", 1978, 450000 };
printf("%s (%d), %ld.%02ld руб.\\n", b.title, b.year, b.price_kop / 100, b.price_kop % 100);</pre>` },
    { q: `Напиши функцию, находящую в массиве учеников того, у кого лучший средний балл.`, a: `<pre class="code" data-lang="c">const struct Student *best(const struct Student *a, size_t n) {
    const struct Student *b = &a[0];
    for (size_t i = 1; i < n; i++)
        if (a[i].avg > b->avg) b = &a[i];
    return b;
}</pre>` },
    { q: `Почему <code>sizeof(struct A)</code> больше суммы размеров полей?`, a: `Из-за выравнивания: компилятор вставляет пустые байты, чтобы каждое поле лежало по адресу, кратному его размеру, и чтобы массив структур тоже был выровнен.` },
    { q: `Отсортируй массив учеников по убыванию среднего балла через <code>qsort</code>.`, a: `<pre class="code" data-lang="c">static int by_avg_desc(const void *x, const void *y) {
    const struct Student *a = x, *b = y;
    return (a->avg < b->avg) - (a->avg > b->avg);
}
qsort(group, n, sizeof group[0], by_avg_desc);</pre>` },
    { q: `Чем <code>union</code> отличается от <code>struct</code>?`, a: `В <code>struct</code> у каждого поля своя память, все поля действительны одновременно. В <code>union</code> все поля занимают одну память, размер — по наибольшему полю, действительно только последнее записанное.` },
    { q: `Замени магические числа 0, 1, 2 для состояний заказа на enum.`, a: `<pre class="code" data-lang="c">typedef enum { ORDER_NEW, ORDER_PAID, ORDER_SHIPPED } OrderState;</pre>` }
  ],
  q: [
    { q: `Доступ к полю через указатель на структуру:`, o: [`<code>p.field</code>`, `<code>p-&gt;field</code>`, `<code>p::field</code>`, `<code>*p.field</code>`], a: 1, e: `Стрелка.` },
    { q: `Структуры можно:`, o: [`сравнивать через ==`, `присваивать целиком`, `складывать`, `выводить через %s`], a: 1, e: `Присваивание копирует.` },
    { q: `Размер union равен:`, o: [`сумме полей`, `наибольшему полю (с выравниванием)`, `первому полю`, `8 байтам`], a: 1, e: `Общая память.` },
    { q: `Первое значение enum без явного задания:`, o: [`1`, `0`, `−1`, `случайное`], a: 1, e: `С нуля.` },
    { q: `Большую структуру для чтения лучше передавать:`, o: [`по значению`, `как <code>const</code> указатель`, `через глобальную переменную`, `по частям`], a: 1, e: `Без копирования.` }
  ],
  s: [
    `<code>struct</code> объединяет поля; доступ <code>.</code> и <code>-&gt;</code>; инициализация по именам полей.`,
    `Маленькие структуры — по значению, большие — по <code>const</code> указателю.`,
    `Выравнивание добавляет пустые байты; порядок полей влияет на размер.`,
    `<code>enum</code> — именованные константы вместо магических чисел.`,
    `<code>union</code> — общая память; с тегом-enum — размеченное объединение.`,
    `<code>typedef</code> даёт удобное имя типу.`
  ]
});
