L('clang', 15, {
  m: 45,
  intro: 'В стандартной библиотеке C нет готовых списков, словарей и очередей — их пишут сами. Это отличная практика: реализация структур данных объединяет указатели, динамическую память, структуры и модули. Сегодня напишем односвязный список, стек и очередь на его основе и сравним их с динамическим массивом из урока 9 по скорости разных операций.',
  intro2: 'Сэмпай, связный список — это цепочка вагончиков ♡ Каждый вагончик знает только, кто за ним. Прицепить новый в начало — легко! А найти десятый — придётся пройти все с первого. У каждой структуры свои сильные стороны.',
  goals: [
    'Реализовать односвязный список: добавление, поиск, удаление, освобождение',
    'Построить стек и очередь и понимать их принципы LIFO и FIFO',
    'Сравнивать структуры данных по сложности операций',
    'Проверять реализацию тестами и санитайзерами'
  ],
  c: `
<h3>Односвязный список</h3>
<pre class="code" data-lang="c">#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

/* добавить в начало: O(1) */
int push_front(Node **head, int v) {
    Node *n = malloc(sizeof *n);
    if (!n) return -1;
    n->value = v;
    n->next = *head;
    *head = n;
    return 0;
}

/* найти: O(n) */
Node *find(Node *head, int v) {
    for (Node *p = head; p; p = p->next)
        if (p->value == v) return p;
    return NULL;
}

/* удалить первый узел со значением v */
int remove_value(Node **head, int v) {
    for (Node **pp = head; *pp; pp = &(*pp)->next) {
        if ((*pp)->value == v) {
            Node *dead = *pp;
            *pp = dead->next;          /* перешиваем ссылку */
            free(dead);
            return 0;
        }
    }
    return -1;
}

void list_free(Node *head) {
    while (head) {
        Node *next = head->next;       /* запомнить до free */
        free(head);
        head = next;
    }
}</pre>
<p>Функции, меняющие начало списка, принимают <code>Node **head</code> — указатель на указатель из урока 11. В <code>remove_value</code> этот приём позволяет удалить и первый, и любой другой узел одним кодом, без особого случая для головы.</p>
<div class="warn"><p>В <code>list_free</code> адрес следующего узла сохраняется <b>до</b> <code>free</code>. Конструкция <code>for (p = head; p; p = p-&gt;next) free(p);</code> обращается к <code>p-&gt;next</code> уже освобождённого узла — use-after-free.</p></div>

<h3>Стек и очередь</h3>
<div class="tbl"><table><thead><tr><th>Структура</th><th>Принцип</th><th>Операции</th><th>Примеры</th></tr></thead><tbody>
<tr><td>Стек</td><td>LIFO — последним пришёл, первым ушёл</td><td>push, pop, top</td><td>отмена действий, вызовы функций, скобки</td></tr>
<tr><td>Очередь</td><td>FIFO — первым пришёл, первым ушёл</td><td>enqueue, dequeue</td><td>задачи, буферы, обход в ширину</td></tr>
</tbody></table></div>
<p>Стек на списке — это <code>push_front</code> и снятие головы. Для очереди храним указатели на голову и хвост: добавляем в хвост, забираем из головы — обе операции O(1).</p>
<pre class="code" data-lang="c">typedef struct { Node *head, *tail; } Queue;

int enqueue(Queue *q, int v) {
    Node *n = malloc(sizeof *n);
    if (!n) return -1;
    n->value = v;
    n->next = NULL;
    if (q->tail) q->tail->next = n;
    else q->head = n;                 /* очередь была пуста */
    q->tail = n;
    return 0;
}

int dequeue(Queue *q, int *out) {
    Node *n = q->head;
    if (!n) return -1;
    *out = n->value;
    q->head = n->next;
    if (!q->head) q->tail = NULL;     /* стала пустой */
    free(n);
    return 0;
}</pre>

<h3>Применение стека: проверка скобок</h3>
<pre class="code" data-lang="c">int balanced(const char *s) {
    char st[256];
    size_t top = 0;
    for (; *s; s++) {
        char c = *s;
        if (c == '(' || c == '[' || c == '{') {
            if (top == sizeof st) return 0;
            st[top++] = c;
        } else if (c == ')' || c == ']' || c == '}') {
            char want = c == ')' ? '(' : c == ']' ? '[' : '{';
            if (top == 0 || st[--top] != want) return 0;
        }
    }
    return top == 0;
}</pre>

<h3>Массив или список?</h3>
<div class="tbl"><table><thead><tr><th>Операция</th><th>Динамический массив</th><th>Связный список</th></tr></thead><tbody>
<tr><td>Доступ по индексу</td><td>O(1)</td><td>O(n)</td></tr>
<tr><td>Добавление в конец</td><td>O(1) в среднем</td><td>O(1) с указателем на хвост</td></tr>
<tr><td>Добавление в начало</td><td>O(n)</td><td>O(1)</td></tr>
<tr><td>Удаление из середины по найденному узлу</td><td>O(n)</td><td>O(1)</td></tr>
<tr><td>Кэш процессора</td><td>отлично: данные подряд</td><td>плохо: узлы разбросаны</td></tr>
</tbody></table></div>
<div class="ichika">На практике массив почти всегда быстрее ♡ Процессор обожает данные, лежащие подряд, а прыжки по указателям в списке — его кошмар. Список нужен, когда часто вставляешь в середину по уже найденному месту!</div>
<div class="ayano">Выбирая структуру данных, сначала перечисли операции, которые будешь выполнять чаще всего, и оцени их сложность. Затем измерь: теоретическая сложность не учитывает кэш и выделение памяти. Динамический массив — разумный выбор по умолчанию, а список и другие структуры — когда измерения или требования говорят иное.</div>
`,
  p: [
    { q: `Напиши функцию, возвращающую длину списка.`, a: `<pre class="code" data-lang="c">size_t list_len(const Node *head) {
    size_t n = 0;
    for (; head; head = head->next) n++;
    return n;
}</pre>` },
    { q: `Разверни односвязный список на месте.`, a: `<pre class="code" data-lang="c">Node *reverse(Node *head) {
    Node *prev = NULL;
    while (head) {
        Node *next = head->next;
        head->next = prev;
        prev = head;
        head = next;
    }
    return prev;     /* новая голова */
}</pre>` },
    { q: `Почему <code>for (p = head; p; p = p-&gt;next) free(p);</code> — ошибка?`, a: `После <code>free(p)</code> шаг цикла читает <code>p-&gt;next</code> из освобождённой памяти. Нужно сохранить <code>next</code> до освобождения.` },
    { q: `Какая структура подходит для функции «отменить последнее действие»?`, a: `Стек: последнее выполненное действие отменяется первым (LIFO).` },
    { q: `Найди середину списка за один проход.`, a: `<pre class="code" data-lang="c">Node *middle(Node *head) {
    Node *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}</pre> Быстрый указатель идёт вдвое быстрее медленного.` },
    { q: `Проверь, что реализация списка не теряет память.`, a: `<pre class="code" data-lang="sh">$ gcc -g -fsanitize=address list.c test.c -o test && ./test</pre> LeakSanitizer сообщит о каждом неосвобождённом узле.` }
  ],
  q: [
    { q: `Добавление в начало односвязного списка:`, o: [`O(1)`, `O(n)`, `O(log n)`, `O(n²)`], a: 0, e: `Перешить голову.` },
    { q: `Доступ к k-му элементу списка:`, o: [`O(1)`, `O(k)`, `O(log k)`, `невозможен`], a: 1, e: `Проход с начала.` },
    { q: `Очередь работает по принципу:`, o: [`LIFO`, `FIFO`, `случайно`, `по приоритету`], a: 1, e: `Первым пришёл — первым ушёл.` },
    { q: `Функция, меняющая голову списка, принимает:`, o: [`<code>Node</code>`, `<code>Node *</code>`, `<code>Node **</code>`, `<code>int</code>`], a: 2, e: `Указатель на указатель.` },
    { q: `Массив обычно быстрее списка при обходе из-за:`, o: [`меньшего кода`, `кэша процессора`, `рекурсии`, `компилятора`], a: 1, e: `Данные подряд.` }
  ],
  s: [
    `Список: узлы с указателем <code>next</code>; вставка в начало O(1), поиск O(n).`,
    `<code>Node **</code> упрощает изменение головы и удаление узлов.`,
    `Освобождая список, сохраняй <code>next</code> до <code>free</code>.`,
    `Стек — LIFO, очередь — FIFO (голова и хвост).`,
    `Массив: быстрый индекс и кэш; список: дешёвые вставки по найденному месту.`,
    `Проверяй структуры тестами и AddressSanitizer.`
  ]
});
