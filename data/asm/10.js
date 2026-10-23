L('asm', 10, {
  m: 45,
  intro: 'Чтобы функции, написанные разными людьми, компиляторами и на разных языках, могли вызывать друг друга, нужен общий договор: где лежат аргументы, куда класть результат, какие регистры можно портить, а какие нужно сохранить. В Linux x86-64 это соглашение System V AMD64 ABI. Его используют gcc, clang, Rust и Go при вызове кода на C. Сегодня разберём его и напишем функции, которые его соблюдают.',
  intro2: 'Сэмпай, соглашение о вызовах — это правила этикета ♡ Гость (вызывающий) знает, что хозяин может переставить вещи в прихожей (rax, rcx, rdx…), но гостиную (rbx, r12–r15) хозяин обязан оставить как было. Все соблюдают правила — и никто не ссорится!',
  goals: [
    'Знать, в каких регистрах передаются аргументы и возвращается результат',
    'Различать регистры, сохраняемые вызывающим и вызываемым',
    'Писать функции, корректно сохраняющие регистры и выравнивание стека',
    'Понимать красную зону и передачу аргументов через стек'
  ],
  c: `
<h3>Аргументы и результат</h3>
<div class="tbl"><table><thead><tr><th>Что</th><th>Где</th></tr></thead><tbody>
<tr><td>Целые и указатели 1–6</td><td><code>rdi</code>, <code>rsi</code>, <code>rdx</code>, <code>rcx</code>, <code>r8</code>, <code>r9</code></td></tr>
<tr><td>Аргументы с 7-го</td><td>на стеке, справа налево</td></tr>
<tr><td>Дробные 1–8</td><td><code>xmm0</code>…<code>xmm7</code></td></tr>
<tr><td>Результат</td><td><code>rax</code> (128 бит — <code>rdx:rax</code>), дробный — <code>xmm0</code></td></tr>
</tbody></table></div>
<pre class="code" data-lang="c">long mix(long a, long b, long c, long d, long e, long f, long g);
/*        rdi     rsi     rdx     rcx     r8      r9      стек */</pre>
<p>Сравни с системными вызовами из урока 7: там четвёртый аргумент в <code>r10</code>, а здесь — в <code>rcx</code>. Это разные соглашения, хотя и похожие.</p>

<h3>Кто сохраняет регистры</h3>
<div class="tbl"><table><thead><tr><th>Группа</th><th>Регистры</th><th>Правило</th></tr></thead><tbody>
<tr><td>Сохраняемые вызывающим (volatile)</td><td><code>rax</code>, <code>rcx</code>, <code>rdx</code>, <code>rsi</code>, <code>rdi</code>, <code>r8</code>–<code>r11</code>, <code>xmm0</code>–<code>xmm15</code></td><td>функция может их портить; если значение нужно после вызова — сохрани сам</td></tr>
<tr><td>Сохраняемые вызываемым (non-volatile)</td><td><code>rbx</code>, <code>rbp</code>, <code>r12</code>–<code>r15</code>, <code>rsp</code></td><td>функция обязана вернуть их без изменений</td></tr>
</tbody></table></div>
<pre class="code" data-lang="asm">; long sum_squares(const long *a, long n) — пример функции, которой нужны «долгие» регистры
sum_squares:
    push rbx                    ; будем использовать rbx и r12 — сохранить
    push r12
    sub  rsp, 8                 ; выравнивание: 2 push + адрес возврата = 24 → +8 = 32
    mov  rbx, rdi               ; указатель
    mov  r12, rsi               ; счётчик
    xor  eax, eax
.loop:
    test r12, r12
    jz   .done
    mov  rcx, [rbx]
    imul rcx, rcx
    add  rax, rcx
    add  rbx, 8
    dec  r12
    jmp  .loop
.done:
    add  rsp, 8
    pop  r12                    ; восстановить в обратном порядке
    pop  rbx
    ret</pre>
<p>Здесь функция никого не вызывает, поэтому могла бы обойтись регистрами <code>rcx</code>, <code>rdx</code>, <code>r8</code> без сохранения. Сохраняемые вызываемым регистры нужны, когда значение должно пережить вызов другой функции: их не испортит ни одна корректная функция.</p>
<div class="ichika">Порядок <code>pop</code> — обратный порядку <code>push</code> ♡ Положил rbx, потом r12 — снимаешь r12, потом rbx. Перепутаешь — значения поменяются местами, и вызывающая функция получит чужие данные. Очень коварный баг!</div>

<h3>Вызов функции из функции</h3>
<pre class="code" data-lang="asm">; long hyp2(long a, long b) { return square(a) + square(b); }
square:
    mov  rax, rdi
    imul rax, rdi
    ret

hyp2:
    push rbx                    ; rbx переживёт вызовы; стек выровнен (8 + 8 = 16)
    push r12
    sub  rsp, 8                 ; ещё 8 — итого 32, кратно 16
    mov  r12, rsi               ; сохранить b: rsi может испортиться в square
    call square                 ; square(a): rdi уже содержит a
    mov  rbx, rax               ; результат в сохраняемый регистр
    mov  rdi, r12
    call square                 ; square(b)
    add  rax, rbx
    add  rsp, 8
    pop  r12
    pop  rbx
    ret</pre>

<h3>Красная зона</h3>
<p>Функция, которая никого не вызывает (листовая), может использовать 128 байт <b>ниже</b> <code>rsp</code> без <code>sub rsp</code> — это <b>красная зона</b>: ни обработчики сигналов, ни ядро её не трогают. Компиляторы этим пользуются, поэтому в дизассемблере листовых функций можно увидеть обращения к <code>[rsp − 8]</code> без выделения стека. В ядре Linux красная зона отключена.</p>
<div class="warn"><p>Ошибки соглашения проявляются не сразу и не там: испорченный <code>rbx</code> сломает вызывающую функцию через несколько инструкций, невыровненный стек уронит <code>printf</code> только при выводе дробного числа. Проверяй каждую функцию по списку: что сохранено, что восстановлено, выровнен ли стек перед <code>call</code>.</p></div>
<div class="ayano">ABI — то, что делает возможным весь мир системного софта: Python вызывает библиотеки на C, Rust — системные функции, отладчик понимает стек любой программы. Junior-разработчику достаточно помнить порядок аргументов, место результата и списки сохраняемых регистров — этого хватает, чтобы читать дизассемблер и писать совместимые функции.</div>
`,
  p: [
    { q: `В каких регистрах окажутся аргументы вызова <code>f(1, 2, 3)</code>?`, a: `<code>rdi</code> = 1, <code>rsi</code> = 2, <code>rdx</code> = 3.` },
    { q: `Функция использует <code>r13</code>. Что она обязана сделать?`, a: `<code>r13</code> сохраняется вызываемым: положить его на стек в начале (<code>push r13</code>) и восстановить перед <code>ret</code> (<code>pop r13</code>), учитывая выравнивание стека.` },
    { q: `Значение в <code>rcx</code> нужно после вызова <code>call g</code>. Что делать?`, a: `<code>rcx</code> может быть испорчен вызываемой функцией. Сохранить его перед вызовом (на стеке или в сохраняемом регистре вроде <code>rbx</code>) и восстановить после.` },
    { q: `Напиши функцию <code>long max2(long a, long b)</code> по соглашению.`, a: `<pre class="code" data-lang="asm">max2:
    mov   rax, rdi
    cmp   rsi, rdi
    cmovg rax, rsi
    ret</pre>` },
    { q: `Где передаётся седьмой целочисленный аргумент?`, a: `На стеке: при входе в функцию он лежит по адресу <code>[rsp + 8]</code> — сразу над адресом возврата.` },
    { q: `Почему в <code>hyp2</code> после двух <code>push</code> добавлен <code>sub rsp, 8</code>?`, a: `При входе <code>rsp</code> = 16k − 8. Два <code>push</code> дают 16k − 24, а перед <code>call</code> нужно кратное 16; ещё 8 байт делают 16k − 32.` }
  ],
  q: [
    { q: `Первый целочисленный аргумент функции:`, o: [`<code>rax</code>`, `<code>rdi</code>`, `<code>rcx</code>`, `<code>rsp</code>`], a: 1, e: `rdi.` },
    { q: `Четвёртый аргумент функции (не системного вызова):`, o: [`<code>r10</code>`, `<code>rcx</code>`, `<code>r8</code>`, `<code>rdx</code>`], a: 1, e: `rcx.` },
    { q: `Обязан сохранить вызываемый:`, o: [`<code>rax</code>`, `<code>rbx</code>`, `<code>rdi</code>`, `<code>r11</code>`], a: 1, e: `rbx, rbp, r12–r15.` },
    { q: `Дробный результат возвращается в:`, o: [`<code>rax</code>`, `<code>xmm0</code>`, `<code>st0</code>`, `<code>rdx</code>`], a: 1, e: `xmm0.` },
    { q: `Красная зона — это:`, o: [`128 байт ниже rsp для листовых функций`, `область ядра`, `запрещённая память`, `регистр флагов`], a: 0, e: `Red zone.` }
  ],
  s: [
    `Аргументы: <code>rdi</code>, <code>rsi</code>, <code>rdx</code>, <code>rcx</code>, <code>r8</code>, <code>r9</code>, далее стек; дробные — <code>xmm0</code>–<code>xmm7</code>.`,
    `Результат в <code>rax</code> (или <code>xmm0</code>).`,
    `Портить можно <code>rax</code>, <code>rcx</code>, <code>rdx</code>, <code>rsi</code>, <code>rdi</code>, <code>r8</code>–<code>r11</code>.`,
    `Сохранять обязаны <code>rbx</code>, <code>rbp</code>, <code>r12</code>–<code>r15</code>; pop в обратном порядке.`,
    `Перед <code>call</code> стек кратен 16.`,
    `Листовые функции могут использовать красную зону в 128 байт.`
  ]
});
