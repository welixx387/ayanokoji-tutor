L('clang', 4, {
  m: 40,
  intro: 'Программа без ветвлений и циклов выполняет инструкции строго сверху вниз — этого хватает только для простейших вычислений. Сегодня изучим операторы управления: if и switch для выбора, циклы for, while и do-while для повторения, а также break и continue. Напишем несколько классических программ: угадай число, таблицу умножения и проверку простоты числа.',
  intro2: 'Сэмпай, циклы — это сила компьютера ♡ Человек устанет считать до миллиона, а цикл сделает это за миллисекунду и не пожалуется. Главное — не забыть условие выхода, а то будет считать вечно!',
  goals: [
    'Писать ветвления if, else if, else и switch',
    'Выбирать подходящий цикл: for, while или do-while',
    'Управлять циклом через break и continue',
    'Избегать типичных ошибок: бесконечных циклов и выхода за границу на единицу'
  ],
  c: `
<h3>if и else</h3>
<pre class="code" data-lang="c">int score = 78;
if (score >= 90) {
    printf("отлично\\n");
} else if (score >= 70) {
    printf("хорошо\\n");
} else {
    printf("нужно подтянуть\\n");
}</pre>
<p>Фигурные скобки можно опустить, если в ветке одна инструкция, но лучше ставить их всегда: так меньше шансов ошибиться при добавлении второй строки. Для простого выбора значения есть тернарный оператор: <code>int max = a &gt; b ? a : b;</code></p>

<h3>switch</h3>
<pre class="code" data-lang="c">char op = '*';
switch (op) {
case '+': result = a + b; break;
case '-': result = a - b; break;
case '*': result = a * b; break;
case '/':
    if (b == 0) { fprintf(stderr, "деление на ноль\\n"); return 1; }
    result = a / b;
    break;
default:
    fprintf(stderr, "неизвестная операция %c\\n", op);
    return 1;
}</pre>
<div class="warn"><p>Без <code>break</code> выполнение «проваливается» в следующую ветку. Иногда это делают намеренно (несколько <code>case</code> с общим кодом), но забытый <code>break</code> — частая ошибка. Флаг <code>-Wimplicit-fallthrough</code> предупреждает о ней. <code>switch</code> работает только с целыми значениями и символами, не со строками.</p></div>

<h3>Циклы</h3>
<pre class="code" data-lang="c">/* for: известно число повторений */
for (int i = 1; i <= 10; i++)
    printf("%d x 7 = %d\\n", i, i * 7);

/* while: повторять, пока условие истинно */
int n = 12345, digits = 0;
while (n > 0) {
    n /= 10;
    digits++;
}

/* do-while: тело выполняется хотя бы один раз */
int guess;
do {
    printf("введи число от 1 до 10: ");
    if (scanf("%d", &guess) != 1) return 1;
} while (guess < 1 || guess > 10);</pre>
<div class="tbl"><table><thead><tr><th>Цикл</th><th>Когда использовать</th></tr></thead><tbody>
<tr><td><code>for</code></td><td>счётчик, перебор индексов массива</td></tr>
<tr><td><code>while</code></td><td>число повторений заранее неизвестно</td></tr>
<tr><td><code>do-while</code></td><td>нужно выполнить хотя бы раз (ввод с проверкой)</td></tr>
</tbody></table></div>

<h3>break, continue и вложенные циклы</h3>
<pre class="code" data-lang="c">/* проверка простоты: перебор делителей до корня */
int is_prime = n >= 2;
for (int d = 2; d * d <= n; d++) {
    if (n % d == 0) {
        is_prime = 0;
        break;                    /* дальше проверять незачем */
    }
}

/* сумма только положительных */
for (int i = 0; i < count; i++) {
    if (a[i] <= 0) continue;      /* перейти к следующей итерации */
    sum += a[i];
}</pre>
<p><code>break</code> выходит только из ближайшего цикла. Чтобы выйти из вложенных циклов, используют флаг или выносят код в функцию и делают <code>return</code>.</p>
<div class="ichika">Ошибка на единицу — королева багов ♡ Массив из 10 элементов имеет индексы от 0 до 9, поэтому <code>i &lt; 10</code>, а не <code>i &lt;= 10</code>. Пиши циклы в форме <code>for (i = 0; i &lt; n; i++)</code> — так безопаснее, сэмпай!</div>
<div class="ayano">Перед тем как написать цикл, ответь на три вопроса: с какого значения он начинается, что меняется на каждом шаге и почему он гарантированно закончится. Если на третий вопрос нет чёткого ответа — у тебя потенциально бесконечный цикл. Особенно внимательно с циклами, где условие зависит от ввода пользователя.</div>
`,
  p: [
    { q: `Напиши программу, которая печатает числа от 1 до 100, но вместо кратных 3 — «Fizz», кратных 5 — «Buzz», кратных обоим — «FizzBuzz».`, a: `<pre class="code" data-lang="c">for (int i = 1; i <= 100; i++) {
    if (i % 15 == 0) printf("FizzBuzz\\n");
    else if (i % 3 == 0) printf("Fizz\\n");
    else if (i % 5 == 0) printf("Buzz\\n");
    else printf("%d\\n", i);
}</pre>` },
    { q: `Посчитай сумму цифр числа <code>n</code>.`, a: `<pre class="code" data-lang="c">int sum = 0;
while (n > 0) {
    sum += n % 10;
    n /= 10;
}</pre>` },
    { q: `Что напечатает код?<pre class="code" data-lang="c">int x = 2;
switch (x) {
case 1: printf("one ");
case 2: printf("two ");
case 3: printf("three ");
default: printf("other");
}</pre>`, a: `«two three other»: нет <code>break</code>, выполнение проваливается во все следующие ветки.` },
    { q: `Напиши игру «угадай число»: программа загадывает число от 1 до 100 и подсказывает «больше» или «меньше».`, a: `<pre class="code" data-lang="c">#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(void) {
    srand((unsigned)time(NULL));
    int secret = rand() % 100 + 1, guess, tries = 0;
    do {
        printf("твоё число: ");
        if (scanf("%d", &guess) != 1) return 1;
        tries++;
        if (guess < secret) printf("больше\\n");
        else if (guess > secret) printf("меньше\\n");
    } while (guess != secret);
    printf("угадал за %d попыток\\n", tries);
    return 0;
}</pre>` },
    { q: `Выведи таблицу умножения 9 × 9 вложенными циклами.`, a: `<pre class="code" data-lang="c">for (int i = 1; i <= 9; i++) {
    for (int j = 1; j <= 9; j++)
        printf("%4d", i * j);
    printf("\\n");
}</pre>` },
    { q: `Почему цикл <code>for (unsigned i = 10; i &gt;= 0; i--)</code> бесконечный?`, a: `Беззнаковое число всегда больше или равно нулю: после 0 оно «заворачивается» в 4294967295, и условие остаётся истинным.` }
  ],
  q: [
    { q: `Цикл, тело которого выполнится хотя бы раз:`, o: [`<code>for</code>`, `<code>while</code>`, `<code>do-while</code>`, `любой`], a: 2, e: `Условие в конце.` },
    { q: `<code>continue</code>:`, o: [`выходит из цикла`, `переходит к следующей итерации`, `выходит из функции`, `перезапускает программу`], a: 1, e: `Пропуск остатка тела.` },
    { q: `Без <code>break</code> в switch:`, o: [`ошибка компиляции`, `выполнение проваливается дальше`, `выход из switch`, `бесконечный цикл`], a: 1, e: `Fallthrough.` },
    { q: `Правильный перебор массива из n элементов:`, o: [`<code>i = 1; i &lt;= n</code>`, `<code>i = 0; i &lt; n</code>`, `<code>i = 0; i &lt;= n</code>`, `<code>i = 1; i &lt; n</code>`], a: 1, e: `Индексы 0…n−1.` },
    { q: `<code>switch</code> работает со:`, o: [`строками`, `целыми и символами`, `дробными`, `массивами`], a: 1, e: `Целочисленные типы.` }
  ],
  s: [
    `<code>if</code>/<code>else if</code>/<code>else</code>; фигурные скобки ставь всегда.`,
    `<code>switch</code> по целым и символам; не забывай <code>break</code>; <code>default</code> — для прочего.`,
    `<code>for</code> — счётчик, <code>while</code> — неизвестное число повторений, <code>do-while</code> — хотя бы раз.`,
    `<code>break</code> выходит из ближайшего цикла, <code>continue</code> — к следующей итерации.`,
    `Индексы от 0 до n−1: <code>i &lt; n</code>.`,
    `Каждый цикл должен иметь ясное условие завершения.`
  ]
});
