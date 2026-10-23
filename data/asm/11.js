L('asm', 11, {
  m: 45,
  intro: 'На практике ассемблер почти никогда не используют в одиночку: критичную по скорости функцию пишут на ассемблере и вызывают из C, или из ассемблерного кода обращаются к библиотеке C ради printf и malloc. Благодаря общему соглашению о вызовах это просто. Сегодня свяжем ассемблер и C в обе стороны и разберёмся с компоновкой, позиционно-независимым кодом и вызовами через PLT.',
  intro2: 'Сэмпай, сегодня строим мост между мирами ♡ С одной стороны — удобный C с printf, с другой — твой ассемблер. Соглашение о вызовах — это общий язык, на котором они договорятся. Перейдёшь этот мост — и сможешь встраивать ассемблер куда угодно!',
  goals: [
    'Писать функции на ассемблере и вызывать их из C',
    'Вызывать функции библиотеки C, в том числе printf, из ассемблера',
    'Собирать смешанные проекты через gcc',
    'Понимать default rel, PLT и требования PIE'
  ],
  c: `
<h3>Функция на ассемблере, вызываемая из C</h3>
<pre class="code" data-lang="asm">; sum.asm
section .text
global sum_array                    ; сделать символ видимым компоновщику

; long sum_array(const long *a, size_t n);   a — rdi, n — rsi
sum_array:
    xor eax, eax
    test rsi, rsi
    jz  .done
.loop:
    add rax, [rdi]
    add rdi, 8
    dec rsi
    jnz .loop
.done:
    ret</pre>
<pre class="code" data-lang="c">/* main.c */
#include <stdio.h>

long sum_array(const long *a, size_t n);    /* объявление: тело на ассемблере */

int main(void) {
    long v[] = {4, 8, 15, 16, 23, 42};
    printf("%ld\\n", sum_array(v, sizeof v / sizeof v[0]));
    return 0;
}</pre>
<pre class="code" data-lang="sh">$ nasm -f elf64 sum.asm -o sum.o
$ gcc -Wall main.c sum.o -o app
$ ./app
108</pre>
<p>Компилятор C видит только объявление, а компоновщик находит символ <code>sum_array</code> в объектном файле от NASM. Функция не обращается к глобальным данным, поэтому без изменений работает и в позиционно-независимой программе, которую gcc собирает по умолчанию.</p>

<h3>Вызов printf из ассемблера</h3>
<pre class="code" data-lang="asm">; hello_printf.asm — main на ассемблере, компоновка через gcc
default rel                         ; адресация данных относительно rip (нужно для PIE)
extern printf                       ; символ из библиотеки C
global main

section .rodata
fmt     db  "%s: %ld", 10, 0        ; строка формата C с завершающим нулём
name    db  "answer", 0

section .text
main:
    push rbp                        ; выравнивание: при входе rsp = 16k − 8, после push — 16k
    mov  rbp, rsp
    lea  rdi, [fmt]                 ; 1-й аргумент — формат
    lea  rsi, [name]                ; 2-й — строка
    mov  edx, 42                    ; 3-й — число
    xor  eax, eax                   ; число векторных регистров с аргументами (для функций с ...)
    call printf wrt ..plt           ; вызов через PLT — таблицу переходов к библиотекам
    xor  eax, eax                   ; return 0
    pop  rbp
    ret</pre>
<pre class="code" data-lang="sh">$ nasm -f elf64 hello_printf.asm -o hello_printf.o
$ gcc hello_printf.o -o hello_printf      # gcc добавит стартовый код и libc
$ ./hello_printf
answer: 42</pre>
<div class="tbl"><table><thead><tr><th>Деталь</th><th>Зачем</th></tr></thead><tbody>
<tr><td><code>main</code> вместо <code>_start</code></td><td>стартовый код libc сам вызовет <code>main</code> и затем <code>exit</code> с её результатом</td></tr>
<tr><td><code>default rel</code> и <code>lea rdi, [fmt]</code></td><td>программа PIE загружается по случайному адресу — адреса только относительно <code>rip</code></td></tr>
<tr><td><code>wrt ..plt</code></td><td><code>printf</code> находится в разделяемой библиотеке; вызов идёт через PLT, адрес подставит загрузчик</td></tr>
<tr><td><code>xor eax, eax</code></td><td>для функций с переменным числом аргументов <code>al</code> = число векторных регистров с аргументами</td></tr>
<tr><td><code>push rbp</code></td><td>выравнивание стека по 16 перед <code>call</code></td></tr>
</tbody></table></div>
<div class="warn"><p>Если собрать без <code>default rel</code> и <code>wrt ..plt</code>, компоновщик выдаст ошибку вида «relocation … can not be used when making a PIE object». Альтернатива — собрать не-PIE программу флагом <code>gcc -no-pie</code>, но правильнее писать позиционно-независимый код.</p></div>

<h3>Встроенный ассемблер</h3>
<pre class="code" data-lang="c">static inline unsigned long long rdtsc(void) {
    unsigned int lo, hi;
    __asm__ volatile ("rdtsc" : "=a"(lo), "=d"(hi));   /* счётчик тактов процессора */
    return ((unsigned long long)hi << 32) | lo;
}</pre>
<p>gcc и clang позволяют вставлять отдельные инструкции прямо в код на C с указанием, какие регистры используются. Это нужно редко: для специальных инструкций, которых нет в C. Синтаксис сложный и легко ошибиться, поэтому сначала проверь, нет ли встроенной функции компилятора (<code>__builtin_popcount</code>, <code>__rdtsc</code>).</p>
<div class="ichika">Так устроены многие быстрые библиотеки ♡ Основная логика на C или Rust, а самые горячие функции — <code>memcpy</code>, кодирование видео, криптография — на ассемблере с векторными инструкциями. И всё это благодаря соглашению о вызовах!</div>
<div class="ayano">Писать на ассемблере стоит только то, что действительно нельзя сделать на C: специальные инструкции, точный контроль над кодом, системные трамплины. Прежде чем переписывать функцию на ассемблере ради скорости, посмотри, что генерирует компилятор с <code>-O2</code> — очень часто он уже сделал лучше.</div>
`,
  p: [
    { q: `Напиши на ассемблере <code>long max_array(const long *a, size_t n)</code> (n ≥ 1) для вызова из C.`, a: `<pre class="code" data-lang="asm">global max_array
max_array:
    mov  rax, [rdi]
    dec  rsi
    jz   .done
.loop:
    add  rdi, 8
    mov  rcx, [rdi]
    cmp  rcx, rax
    cmovg rax, rcx
    dec  rsi
    jnz  .loop
.done:
    ret</pre>` },
    { q: `Почему в <code>main</code> на ассемблере не нужен системный вызов exit?`, a: `<code>main</code> вызывает стартовый код библиотеки C; после <code>ret</code> он сам вызовет <code>exit</code> с возвращённым значением и сбросит буферы stdio.` },
    { q: `Что будет, если вызвать <code>printf</code> при невыровненном стеке?`, a: `Может работать, а может упасть: если <code>printf</code> использует инструкции SSE, требующие выравнивания по 16 (например, при выводе <code>double</code>), процессор сгенерирует исключение — ошибка сегментации.` },
    { q: `Зачем <code>xor eax, eax</code> перед вызовом <code>printf</code>?`, a: `Для функций с переменным числом аргументов <code>al</code> сообщает, сколько векторных регистров (<code>xmm</code>) содержат аргументы. Дробных аргументов нет — 0.` },
    { q: `Как собрать программу из <code>main.c</code> и <code>fast.asm</code>?`, a: `<pre class="code" data-lang="sh">$ nasm -f elf64 fast.asm -o fast.o
$ gcc -O2 -Wall main.c fast.o -o app</pre>` },
    { q: `Ошибка <code>relocation R_X86_64_32 against .data can not be used when making a PIE object</code>. Как исправить?`, a: `Добавить <code>default rel</code> и обращаться к данным относительно <code>rip</code> (<code>lea rdi, [msg]</code> вместо <code>mov rdi, msg</code>); внешние функции вызывать через <code>wrt ..plt</code>. Либо собрать с <code>-no-pie</code>.` }
  ],
  q: [
    { q: `Сделать символ из ассемблера видимым для C:`, o: [`<code>extern</code>`, `<code>global</code>`, `<code>public</code>`, `<code>export</code>`], a: 1, e: `global.` },
    { q: `Использовать функцию из библиотеки C в NASM:`, o: [`<code>global printf</code>`, `<code>extern printf</code>`, `<code>import printf</code>`, `<code>#include</code>`], a: 1, e: `extern.` },
    { q: `Вызов функции разделяемой библиотеки в PIE:`, o: [`<code>call printf wrt ..plt</code>`, `<code>jmp printf</code>`, `<code>call [printf]</code>`, `<code>syscall printf</code>`], a: 0, e: `PLT.` },
    { q: `Перед вызовом printf <code>al</code> должен содержать:`, o: [`длину строки`, `число векторных регистров с аргументами`, `код символа`, `1`], a: 1, e: `Для вариадических функций.` },
    { q: `Точка входа, если компоновать через gcc с libc:`, o: [`<code>_start</code>`, `<code>main</code>`, `<code>entry</code>`, `<code>init</code>`], a: 1, e: `Стартовый код вызывает main.` }
  ],
  s: [
    `<code>global</code> — экспорт символа, <code>extern</code> — импорт.`,
    `Функция на ассемблере + объявление в C + <code>gcc main.c f.o</code>.`,
    `Из ассемблера: <code>main</code>, <code>default rel</code>, <code>lea</code> для данных, <code>call f wrt ..plt</code>.`,
    `Вариадические функции: <code>al</code> = число векторных аргументов.`,
    `Стек кратен 16 перед вызовом функций libc.`,
    `Встроенный ассемблер — только для специальных инструкций.`
  ]
});
