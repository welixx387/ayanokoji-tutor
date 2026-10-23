L('asm', 12, {
  m: 40,
  intro: 'Побитовые инструкции работают с отдельными битами регистров. Они нужны для флагов и масок, разбора форматов файлов и сетевых пакетов, работы с регистрами устройств и, конечно, для быстрой арифметики: сдвиг заменяет умножение и деление на степени двойки. Сегодня изучим and, or, xor, not, сдвиги и вращения, а также несколько классических битовых приёмов.',
  intro2: 'Сэмпай, биты — это ряд выключателей ♡ and выключает ненужные, or включает нужные, xor переключает, а сдвиг двигает весь ряд влево или вправо. Именно так хранятся права доступа к файлам — помнишь rwx из курса Linux?',
  goals: [
    'Использовать and, or, xor и not для работы с масками',
    'Применять логические и арифметические сдвиги',
    'Знать вращения и инструкции подсчёта битов',
    'Узнавать классические битовые приёмы в коде компилятора'
  ],
  c: `
<h3>Логические операции</h3>
<div class="tbl"><table><thead><tr><th>Инструкция</th><th>Действие</th><th>Применение</th></tr></thead><tbody>
<tr><td><code>and rax, mask</code></td><td>бит = 1, если 1 в обоих</td><td>оставить нужные биты, сбросить остальные</td></tr>
<tr><td><code>or rax, mask</code></td><td>бит = 1, если 1 хотя бы в одном</td><td>установить биты</td></tr>
<tr><td><code>xor rax, mask</code></td><td>бит = 1, если различны</td><td>переключить биты</td></tr>
<tr><td><code>not rax</code></td><td>инвертировать все биты</td><td>построить обратную маску</td></tr>
</tbody></table></div>
<pre class="code" data-lang="asm">; права доступа как в Linux: r = 4, w = 2, x = 1
    mov eax, 0o640          ; восьмеричная запись: rw-r-----
    or  eax, 0o004          ; разрешить чтение остальным: rw-r--r--
    and eax, ~0o020         ; запретить запись группе (NASM вычислит ~ при сборке)
    test eax, 0o100         ; есть ли x у владельца? ZF=1 — нет

    xor eax, eax            ; обнулить регистр — самая короткая форма
    and edi, 0xFF           ; оставить младший байт (то же, что movzx edi, dil)</pre>
<div class="ichika"><code>xor eax, eax</code> встречается в коде постоянно ♡ Любое число XOR само себя даёт ноль, а инструкция короче, чем <code>mov eax, 0</code>. Процессоры даже распознают её особо и выполняют практически бесплатно!</div>

<h3>Сдвиги</h3>
<pre class="code" data-lang="asm">mov rax, 5
shl rax, 3          ; 5 << 3 = 40 — умножение на 8
mov rbx, 100
shr rbx, 2          ; 100 >> 2 = 25 — беззнаковое деление на 4
mov rcx, -100
sar rcx, 2          ; −25 — арифметический сдвиг сохраняет знак
mov rdx, 1
mov cl, 10
shl rdx, cl         ; сдвиг на переменную величину — только через cl: 1 << 10 = 1024</pre>
<div class="tbl"><table><thead><tr><th>Инструкция</th><th>Смысл</th><th>Аналог в C</th></tr></thead><tbody>
<tr><td><code>shl</code></td><td>влево, справа нули</td><td><code>x &lt;&lt; n</code></td></tr>
<tr><td><code>shr</code></td><td>вправо, слева нули</td><td><code>x &gt;&gt; n</code> для <code>unsigned</code></td></tr>
<tr><td><code>sar</code></td><td>вправо, слева копия знака</td><td><code>x &gt;&gt; n</code> для знаковых (на практике)</td></tr>
<tr><td><code>rol</code>, <code>ror</code></td><td>вращение: вышедшие биты входят с другой стороны</td><td>нет оператора; используется в хешах и шифрах</td></tr>
</tbody></table></div>
<div class="warn"><p><code>sar</code> для отрицательных чисел округляет вниз (−7 &gt;&gt; 1 = −4), а деление в C округляет к нулю (−7 / 2 = −3). Поэтому компилятор не может просто заменить знаковое деление на 2 сдвигом — он добавляет поправку. Для беззнаковых чисел сдвиг и деление совпадают.</p></div>

<h3>Подсчёт и поиск битов</h3>
<pre class="code" data-lang="asm">popcnt rax, rdi     ; число единичных битов
lzcnt  rax, rdi     ; число ведущих нулей
tzcnt  rax, rdi     ; число нулей в конце (индекс младшей единицы)
bt     rdi, 5       ; скопировать бит 5 во флаг CF
jc     .bit5_set</pre>
<p>Эти инструкции есть на всех современных процессорах x86-64 (на очень старых <code>popcnt</code> и <code>lzcnt</code> могут отсутствовать). Из C к ним обращаются через встроенные функции <code>__builtin_popcountll</code>, <code>__builtin_clzll</code>, <code>__builtin_ctzll</code>.</p>

<h3>Классические приёмы</h3>
<pre class="code" data-lang="asm">; степень двойки?  x != 0 && (x & (x − 1)) == 0
    lea  rax, [rdi - 1]
    test rax, rdi
    jnz  .not_power         ; (при x = 0 тоже ZF = 1 — проверь отдельно)

; сбросить младший единичный бит: x & (x − 1)
    lea  rax, [rdi - 1]
    and  rax, rdi

; выделить младший единичный бит: x & −x
    mov  rax, rdi
    neg  rax
    and  rax, rdi

; модуль числа без перехода
    mov  rax, rdi
    cqo                     ; rdx = 0 или −1 (знак)
    xor  rax, rdx
    sub  rax, rdx           ; |x|</pre>
<div class="ayano">Битовые приёмы — не повод писать нечитаемый код: в C и Rust лучше выражать намерение понятно, а компилятор сам выберет инструкции. Но узнавать эти шаблоны в дизассемблере нужно. Увидев <code>lea rax, [rdi-1]</code> и <code>test rax, rdi</code>, ты сразу поймёшь: здесь проверяют степень двойки.</div>
`,
  p: [
    { q: `Установи бит 3 и сбрось бит 0 в регистре <code>eax</code>.`, a: `<pre class="code" data-lang="asm">or  eax, 1 << 3        ; NASM вычислит константу 8
and eax, ~1</pre>` },
    { q: `Умножь <code>rax</code> на 16 и раздели беззнаковое <code>rbx</code> на 8 сдвигами.`, a: `<pre class="code" data-lang="asm">shl rax, 4
shr rbx, 3</pre>` },
    { q: `Чем отличаются <code>shr</code> и <code>sar</code> для числа −8?`, a: `<code>sar rax, 1</code> даёт −4 (слева входит копия знакового бита). <code>shr rax, 1</code> вписывает 0 в старший бит: получается огромное положительное число <code>0x7FFFFFFFFFFFFFFC</code>.` },
    { q: `Извлеки биты 4–7 из <code>edi</code> (второй шестнадцатеричный разряд) в <code>eax</code>.`, a: `<pre class="code" data-lang="asm">mov eax, edi
shr eax, 4
and eax, 0xF</pre>` },
    { q: `Посчитай число единичных битов в <code>rdi</code>.`, a: `<code>popcnt rax, rdi</code>. Без <code>popcnt</code> — цикл: <code>test rdi, rdi</code> / <code>jz</code>, затем сбрасывать младшую единицу (<code>lea rcx, [rdi-1]</code>, <code>and rdi, rcx</code>) и увеличивать счётчик.` },
    { q: `Почему компилятор не заменяет <code>x / 2</code> для знакового <code>int</code> одной инструкцией <code>sar</code>?`, a: `<code>sar</code> округляет вниз, а деление в C — к нулю; для отрицательных нечётных результаты различаются. Компилятор добавляет к отрицательному числу 1 перед сдвигом.` }
  ],
  q: [
    { q: `Обнулить регистр короче всего:`, o: [`<code>mov eax, 0</code>`, `<code>xor eax, eax</code>`, `<code>sub eax, 1</code>`, `<code>not eax</code>`], a: 1, e: `Самоисключение.` },
    { q: `Установить биты маски:`, o: [`<code>and</code>`, `<code>or</code>`, `<code>xor</code>`, `<code>not</code>`], a: 1, e: `or.` },
    { q: `Арифметический сдвиг вправо:`, o: [`<code>shr</code>`, `<code>sar</code>`, `<code>shl</code>`, `<code>ror</code>`], a: 1, e: `Сохраняет знак.` },
    { q: `Сдвиг на переменную величину использует регистр:`, o: [`<code>al</code>`, `<code>cl</code>`, `<code>dl</code>`, `любой`], a: 1, e: `cl.` },
    { q: `<code>x &amp; (x − 1)</code>:`, o: [`удваивает x`, `сбрасывает младший единичный бит`, `инвертирует`, `даёт знак`], a: 1, e: `Классический приём.` }
  ],
  s: [
    `<code>and</code> — оставить/сбросить, <code>or</code> — установить, <code>xor</code> — переключить, <code>not</code> — инвертировать.`,
    `<code>xor eax, eax</code> — идиома обнуления.`,
    `<code>shl</code>, <code>shr</code> — умножение и беззнаковое деление на 2 в степени n; <code>sar</code> — со знаком.`,
    `Сдвиг на переменную — через <code>cl</code>; вращения <code>rol</code>, <code>ror</code>.`,
    `<code>popcnt</code>, <code>lzcnt</code>, <code>tzcnt</code>, <code>bt</code>.`,
    `Приёмы: степень двойки, младший бит, модуль без перехода.`
  ]
});
