L('sysprog', 10, {
  m: 40,
  intro: 'Процессы изолированы друг от друга, и обмен данными между ними требует каналов или файлов. Потоки — другой способ параллельной работы: несколько потоков выполнения внутри одного процесса с общей памятью. Это быстро и удобно, но открывает целый класс новых ошибок — гонки данных. Сегодня создадим потоки и своими глазами увидим гонку.',
  intro2: 'Сэмпай, потоки — как несколько поваров на одной кухне ♡ Холодильник общий, плита общая, работа идёт быстрее. Но если двое одновременно возьмут последнее яйцо… кто-то останется без омлета! Это и есть гонка данных.',
  goals: [
    'Отличать потоки от процессов',
    'Создавать потоки через <code>pthread_create</code> и дожидаться их через <code>pthread_join</code>',
    'Передавать аргументы в поток и получать результат',
    'Понимать, что такое гонка данных, и находить её ThreadSanitizer'
  ],
  c: `
<h3>Потоки и процессы</h3>
<div class="tbl"><table><thead><tr><th></th><th>Процессы</th><th>Потоки</th></tr></thead><tbody>
<tr><td>Память</td><td>у каждого своя</td><td>общая (кроме стека каждого потока)</td></tr>
<tr><td>Создание</td><td>дороже (<code>fork</code>)</td><td>дешевле</td></tr>
<tr><td>Обмен данными</td><td>каналы, сокеты, файлы</td><td>просто общие переменные</td></tr>
<tr><td>Ошибка в одном</td><td>падает один процесс</td><td>падает весь процесс</td></tr>
<tr><td>Главный риск</td><td>накладные расходы</td><td>гонки данных</td></tr>
</tbody></table></div>

<h3>Создание потоков: <code>pthread_create</code> и <code>pthread_join</code></h3>
<pre class="code" data-lang="c">#include <pthread.h>
#include <stdio.h>

struct task { int from, to; long sum; };

static void *worker(void *arg) {
    struct task *t = arg;
    for (int i = t->from; i < t->to; i++)
        t->sum += i;
    return NULL;
}

int main(void) {
    pthread_t th[4];
    struct task tasks[4];
    for (int k = 0; k < 4; k++) {
        tasks[k] = (struct task){ k * 250000, (k + 1) * 250000, 0 };
        pthread_create(&th[k], NULL, worker, &tasks[k]);
    }
    long total = 0;
    for (int k = 0; k < 4; k++) {
        pthread_join(th[k], NULL);       /* дождаться потока */
        total += tasks[k].sum;
    }
    printf("sum = %ld\\n", total);
    return 0;
}</pre>
<pre class="code" data-lang="sh">$ gcc -Wall -O2 -pthread sum.c -o sum
$ ./sum
sum = 499999500000</pre>
<p>Каждый поток получает свою структуру и пишет только в неё — поэтому результат корректен. Поток можно не только ждать, но и сделать «отсоединённым» (<code>pthread_detach</code>), если результат не нужен.</p>
<div class="warn"><p>Не передавай в поток адрес переменной цикла: <code>pthread_create(&amp;th[k], NULL, f, &amp;k)</code>. Пока поток стартует, <code>k</code> уже изменится. Передавай указатель на отдельную ячейку массива, как в примере.</p></div>

<h3>Гонка данных</h3>
<pre class="code" data-lang="c">#include <pthread.h>
#include <stdio.h>

static long counter = 0;

static void *inc(void *arg) {
    (void)arg;
    for (int i = 0; i < 1000000; i++)
        counter++;              /* прочитать, прибавить, записать — не атомарно */
    return NULL;
}

int main(void) {
    pthread_t a, b;
    pthread_create(&a, NULL, inc, NULL);
    pthread_create(&b, NULL, inc, NULL);
    pthread_join(a, NULL);
    pthread_join(b, NULL);
    printf("%ld\\n", counter);   /* ожидаем 2000000, получаем меньше */
    return 0;
}</pre>
<p><code>counter++</code> — это три шага: загрузить значение в регистр, увеличить, сохранить. Если два потока загрузят одно и то же значение, одно из увеличений потеряется. <b>Гонка данных</b> — одновременный доступ к общей памяти, где хотя бы один доступ — запись, без синхронизации. В C это неопределённое поведение.</p>
<pre class="code" data-lang="sh">$ gcc -g -fsanitize=thread -pthread race.c -o race
$ ./race
WARNING: ThreadSanitizer: data race ...</pre>
<div class="ichika">Самое коварное — гонка может не проявляться неделями ♡ На твоём ноутбуке всё работает, а на сервере с 64 ядрами числа «плывут». Поэтому не надейся на удачу, сэмпай: запускай ThreadSanitizer!</div>
<div class="ayano">Лучший способ избежать гонок — не делить изменяемые данные. Раздай каждому потоку свой кусок работы и свою память, а результаты объедини после <code>join</code>, как в первом примере. Синхронизация, о которой пойдёт речь в следующем уроке, нужна там, где без общего состояния не обойтись.</div>
`,
  p: [
    { q: `Какой флаг gcc нужен для программ с pthread?`, a: `<code>-pthread</code> — он и подключает библиотеку, и настраивает компиляцию.` },
    { q: `Создай поток, который печатает переданную ему строку, и дождись его.`, a: `<pre class="code" data-lang="c">static void *say(void *arg) {
    puts((const char *)arg);
    return NULL;
}
/* в main: */
pthread_t t;
pthread_create(&t, NULL, say, "hello from thread");
pthread_join(t, NULL);</pre>` },
    { q: `Почему в примере с гонкой результат меньше 2000000?`, a: `<code>counter++</code> не атомарна: потоки читают одно и то же старое значение, оба прибавляют 1 и записывают — одно увеличение теряется.` },
    { q: `Верни из потока результат через <code>pthread_join</code>.`, a: `<pre class="code" data-lang="c">static void *square(void *arg) {
    long x = (long)(intptr_t)arg;
    return (void *)(intptr_t)(x * x);
}
void *res;
pthread_create(&t, NULL, square, (void *)(intptr_t)7);
pthread_join(t, &res);
printf("%ld\\n", (long)(intptr_t)res);   /* 49 */</pre>` },
    { q: `Что общее у потоков одного процесса, а что у каждого своё?`, a: `Общие: куча, глобальные переменные, код, открытые файлы. Своё: стек, регистры, счётчик команд, <code>errno</code>.` },
    { q: `Как найти гонку данных автоматически?`, a: `Собрать с <code>-fsanitize=thread -g</code> и запустить: ThreadSanitizer сообщит о гонке с указанием строк обоих доступов.` }
  ],
  q: [
    { q: `Память потоков одного процесса:`, o: [`полностью раздельная`, `общая, кроме стеков`, `общая только для стека`, `копируется при создании`], a: 1, e: `Общая куча и глобальные.` },
    { q: `Дождаться завершения потока:`, o: [`<code>wait</code>`, `<code>pthread_join</code>`, `<code>sleep</code>`, `<code>pthread_exit</code>`], a: 1, e: `join.` },
    { q: `<code>counter++</code> из двух потоков без защиты:`, o: [`безопасно`, `гонка данных`, `ошибка компиляции`, `всегда медленно`], a: 1, e: `Не атомарно.` },
    { q: `Инструмент поиска гонок:`, o: [`<code>-fsanitize=thread</code>`, `<code>strace</code>`, `<code>ldd</code>`, `<code>nm</code>`], a: 0, e: `TSan.` },
    { q: `Если поток вызвал segfault:`, o: [`падает только поток`, `падает весь процесс`, `поток перезапускается`, `ничего`], a: 1, e: `Общий процесс.` }
  ],
  s: [
    `Потоки делят память процесса; у каждого свой стек и регистры.`,
    `<code>pthread_create</code> + <code>pthread_join</code>; компиляция с <code>-pthread</code>.`,
    `Передавай каждому потоку свои данные, не адрес переменной цикла.`,
    `Гонка данных: одновременный доступ с записью без синхронизации — UB.`,
    `<code>counter++</code> не атомарна.`,
    `ThreadSanitizer: <code>-fsanitize=thread</code>.`
  ]
});
