L('clang', 16, {
  m: 45,
  intro: 'Финальная контрольная курса C — небольшой, но настоящий проект: консольный менеджер задач, который хранит список дел в файле. В нём сходятся все темы: аргументы командной строки, структуры, динамическая память, файлы, модули и обработка ошибок. Вторая часть урока — типичные вопросы собеседования на позицию junior-разработчика на C.',
  intro2: 'Сэмпай, это твой выпускной проект ♡ Программа, которой можно реально пользоваться каждый день! Сделай её аккуратно: понятные сообщения, никаких утечек, файл не портится. А потом проверим тебя вопросами с собеседований!',
  goals: [
    'Спроектировать и реализовать консольную утилиту из нескольких модулей',
    'Хранить данные в текстовом файле и безопасно его обновлять',
    'Проверить проект санитайзерами и набором ручных тестов',
    'Ответить на типовые вопросы собеседования по C'
  ],
  c: `
<h3>Требования</h3>
<pre class="code" data-lang="sh">$ todo add "Купить молоко"
добавлено: #1
$ todo add "Сделать урок по C"
добавлено: #2
$ todo list
  1 [ ] Купить молоко
  2 [ ] Сделать урок по C
$ todo done 1
$ todo list
  1 [x] Купить молоко
  2 [ ] Сделать урок по C
$ todo remove 1</pre>
<ul class="ex-l">
<li>Данные хранятся в <code>~/.todo.txt</code>, по строке на задачу: <code>0|текст</code> или <code>1|текст</code>.</li>
<li>Неизвестная команда или неверный номер — сообщение в stderr и код 1.</li>
<li>Файл перезаписывается безопасно: сначала во временный файл, потом <code>rename</code>.</li>
<li>Модули: <code>tasks.c</code> (список задач в памяти), <code>store.c</code> (загрузка и сохранение), <code>main.c</code> (команды).</li>
</ul>

<h3>Модуль задач</h3>
<pre class="code" data-lang="c">/* tasks.h */
#ifndef TASKS_H
#define TASKS_H
#include <stddef.h>

typedef struct { int done; char *text; } Task;
typedef struct { Task *items; size_t len, cap; } TaskList;

int  tasks_add(TaskList *l, const char *text, int done);
int  tasks_remove(TaskList *l, size_t index);
void tasks_free(TaskList *l);
#endif</pre>
<pre class="code" data-lang="c">/* tasks.c */
#include <stdlib.h>
#include <string.h>
#include "tasks.h"

int tasks_add(TaskList *l, const char *text, int done) {
    if (l->len == l->cap) {
        size_t nc = l->cap ? l->cap * 2 : 8;
        Task *ni = realloc(l->items, nc * sizeof *ni);
        if (!ni) return -1;
        l->items = ni;
        l->cap = nc;
    }
    char *copy = strdup(text);
    if (!copy) return -1;
    l->items[l->len++] = (Task){ done, copy };
    return 0;
}

int tasks_remove(TaskList *l, size_t i) {
    if (i >= l->len) return -1;
    free(l->items[i].text);
    memmove(&l->items[i], &l->items[i + 1], (l->len - i - 1) * sizeof *l->items);
    l->len--;
    return 0;
}

void tasks_free(TaskList *l) {
    for (size_t i = 0; i < l->len; i++) free(l->items[i].text);
    free(l->items);
    *l = (TaskList){0};
}</pre>

<h3>Безопасное сохранение</h3>
<pre class="code" data-lang="c">/* store.c (фрагмент) */
int store_save(const char *path, const TaskList *l) {
    char tmp[512];
    snprintf(tmp, sizeof tmp, "%s.tmp", path);
    FILE *f = fopen(tmp, "w");
    if (!f) return -1;
    for (size_t i = 0; i < l->len; i++)
        fprintf(f, "%d|%s\\n", l->items[i].done, l->items[i].text);
    if (fclose(f) != 0) { remove(tmp); return -1; }
    return rename(tmp, path);    /* атомарная замена: старый файл цел до последнего момента */
}</pre>
<p>Если программа упадёт посреди записи, пострадает только временный файл, а основной останется прежним. <code>rename</code> в пределах одной файловой системы заменяет файл атомарно. Загрузку напиши сам: <code>fgets</code>, отрезать перевод строки, разделить по первому символу <code>|</code>, проверить формат.</p>
<div class="ichika">Номера задач для пользователя начинаются с 1, а индексы в массиве — с 0 ♡ Не забудь перевести, иначе <code>todo done 1</code> отметит вторую задачу. И проверь, что номер — число в допустимых пределах, через <code>strtol</code>!</div>

<h3>Проверка проекта</h3>
<pre class="code" data-lang="sh">$ gcc -Wall -Wextra -g -fsanitize=address,undefined main.c tasks.c store.c -o todo
$ HOME=/tmp/todotest ./todo list           # пустой список, файла ещё нет
$ ./todo add ""; echo $?                   # пустой текст — твоё решение
$ ./todo done 99; echo $?                  # несуществующий номер — код 1
$ ./todo add "текст с | чертой"            # символ-разделитель внутри текста
$ ./todo frobnicate; echo $?               # неизвестная команда</pre>

<h3>Вопросы собеседования</h3>
<div class="tbl"><table><thead><tr><th>Вопрос</th><th>Суть ответа</th></tr></thead><tbody>
<tr><td>Стек и куча — разница?</td><td>Стек — автоматическая память кадров функций, быстрая и ограниченная; куча — <code>malloc</code>/<code>free</code>, время жизни задаёт программист</td></tr>
<tr><td>Что такое указатель и <code>NULL</code>?</td><td>Переменная с адресом; <code>NULL</code> — гарантированно недействительный адрес</td></tr>
<tr><td>Массив и указатель — одно и то же?</td><td>Нет: массив — память под элементы, имя превращается в указатель в выражениях; <code>sizeof</code> отличается</td></tr>
<tr><td>Что делает <code>static</code>?</td><td>Внутри функции — сохраняет значение; на уровне файла — скрывает имя</td></tr>
<tr><td>Что такое UB? Пример?</td><td>Поведение без требований стандарта: выход за границы, знаковое переполнение</td></tr>
<tr><td>Как найти утечку?</td><td>AddressSanitizer, Valgrind</td></tr>
<tr><td>Зачем <code>volatile</code>?</td><td>Запрещает оптимизировать доступ: регистры устройств, флаги из обработчиков сигналов; не заменяет синхронизацию потоков</td></tr>
<tr><td>Что выведет <code>sizeof</code> для массива-параметра функции?</td><td>Размер указателя: массив в параметре — это указатель</td></tr>
</tbody></table></div>
<div class="ayano">Готовность к junior-позиции проверяется не знанием ответов, а способностью довести проект до конца: чтобы он собирался без предупреждений, не тёк, не портил данные и понятно сообщал об ошибках. Сделай этот проект полностью, выложи на GitHub с README и тестами — это лучший аргумент на собеседовании. Дальше: книга Кернигана и Ритчи, «Modern C» Йенса Густедта и курс C++ на этом сайте.</div>
`,
  p: [
    { q: `Напиши функцию загрузки задач из файла.`, a: `<pre class="code" data-lang="c">int store_load(const char *path, TaskList *l) {
    FILE *f = fopen(path, "r");
    if (!f) return errno == ENOENT ? 0 : -1;   /* нет файла — пустой список */
    char line[1024];
    int lineno = 0;
    while (fgets(line, sizeof line, f)) {
        lineno++;
        line[strcspn(line, "\\n")] = '\\0';
        if ((line[0] != '0' && line[0] != '1') || line[1] != '|') {
            fprintf(stderr, "строка %d повреждена, пропущена\\n", lineno);
            continue;
        }
        if (tasks_add(l, line + 2, line[0] == '1') < 0) { fclose(f); return -1; }
    }
    fclose(f);
    return 0;
}</pre>` },
    { q: `Разбери номер задачи из <code>argv[2]</code> с проверкой.`, a: `<pre class="code" data-lang="c">char *end;
long num = strtol(argv[2], &end, 10);
if (*end != '\\0' || num < 1 || (size_t)num > list.len) {
    fprintf(stderr, "нет задачи с номером %s\\n", argv[2]);
    return 1;
}
size_t idx = (size_t)num - 1;</pre>` },
    { q: `Почему символ <code>|</code> внутри текста задачи не ломает наш формат?`, a: `При загрузке разделитель ищется только во второй позиции строки (<code>line[1]</code>), а весь остаток считается текстом. А вот перевод строки внутри текста формат сломал бы — его надо запретить при добавлении.` },
    { q: `Вопрос собеседования: что выведет программа?<pre class="code" data-lang="c">void f(int a[10]) { printf("%zu\\n", sizeof a); }</pre>`, a: `8 на x86-64: параметр-массив на самом деле указатель, <code>sizeof</code> даёт размер указателя.` },
    { q: `Вопрос собеседования: чем <code>memcpy</code> отличается от <code>memmove</code>?`, a: `<code>memmove</code> корректно работает с перекрывающимися областями, <code>memcpy</code> — нет (для перекрытия — UB). Поэтому в <code>tasks_remove</code> используется <code>memmove</code>.` },
    { q: `Вопрос собеседования: что не так с кодом?<pre class="code" data-lang="c">char *greet(void) {
    char buf[32];
    strcpy(buf, "hello");
    return buf;
}</pre>`, a: `Возвращается адрес локального массива — после выхода из функции он недействителен. Нужно <code>malloc</code> (и документировать, что вызывающий освобождает) или принимать буфер параметром.` }
  ],
  q: [
    { q: `Атомарно заменить файл после записи во временный:`, o: [`<code>fopen</code>`, `<code>rename</code>`, `<code>remove</code>`, `<code>fflush</code>`], a: 1, e: `В пределах одной ФС.` },
    { q: `Перекрывающиеся области копирует корректно:`, o: [`<code>memcpy</code>`, `<code>memmove</code>`, `<code>strcpy</code>`, `<code>strcat</code>`], a: 1, e: `memmove.` },
    { q: `<code>sizeof</code> параметра <code>int a[10]</code> на x86-64:`, o: [`40`, `10`, `8`, `4`], a: 2, e: `Это указатель.` },
    { q: `<code>strdup</code> возвращает память, которую нужно:`, o: [`не трогать`, `освободить через <code>free</code>`, `закрыть <code>fclose</code>`, `обнулить`], a: 1, e: `Выделена malloc.` },
    { q: `<code>volatile</code> гарантирует потокобезопасность?`, o: [`да`, `нет`, `только для int`, `только с -O2`], a: 1, e: `Нужны атомики или мьютексы.` }
  ],
  s: [
    `Проект: модули <code>tasks</code>, <code>store</code>, <code>main</code>; данные в текстовом файле.`,
    `Безопасное сохранение: временный файл + <code>rename</code>.`,
    `Проверяй номера через <code>strtol</code>; пользователю — с 1, массиву — с 0.`,
    `Собирай с <code>-Wall -Wextra</code> и санитайзерами; тестируй крайние случаи.`,
    `Собеседование: стек и куча, указатели и массивы, <code>static</code>, UB, <code>volatile</code>, <code>memmove</code>.`,
    `Законченный проект на GitHub — лучший аргумент junior-разработчика.`
  ]
});
