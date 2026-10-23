L('asm', 16, {
  m: 45,
  intro: 'Финальная контрольная курса ассемблера — консольный калькулятор без библиотеки C. Программа читает строку вида «123+456», разбирает два числа и операцию, вычисляет результат и печатает его. Для этого понадобятся системные вызовы, функции с соблюдением соглашения о вызовах, циклы, арифметика и преобразования между строкой и числом. Вторая часть урока — вопросы, которые задают на собеседованиях о низкоуровневом программировании.',
  intro2: 'Сэмпай, ты дошёл до самого нижнего этажа программирования ♡ Калькулятор без printf, без scanf, без libc — только ты, регистры и ядро. Соберёшь его — и сможешь честно сказать, что понимаешь, как работает компьютер!',
  goals: [
    'Собрать программу из нескольких функций с соблюдением соглашения о вызовах',
    'Преобразовывать строку в число и число в строку',
    'Обрабатывать неверный ввод и возвращать код ошибки',
    'Отвечать на вопросы собеседования о низкоуровневом устройстве программ'
  ],
  c: `
<h3>Требования</h3>
<pre class="code" data-lang="sh">$ echo "123+456" | ./calc
579
$ echo "12*12" | ./calc
144
$ echo "7/0" | ./calc; echo $?
ошибка ввода
1</pre>
<ul class="ex-l">
<li>Операции <code>+</code>, <code>-</code>, <code>*</code>; неотрицательные целые числа.</li>
<li>Любой неверный ввод — сообщение в stderr и код возврата 1.</li>
<li>Функции <code>parse_uint</code> и <code>print_uint</code> соблюдают соглашение System V.</li>
</ul>

<h3>Функции</h3>
<pre class="code" data-lang="asm">; parse_uint: rdi — указатель на строку
; возвращает rax — число, rdi — указатель на первый символ после цифр, rdx — количество цифр
parse_uint:
    xor eax, eax
    xor edx, edx
.loop:
    movzx ecx, byte [rdi]
    sub ecx, '0'
    cmp ecx, 9
    ja  .done                   ; не цифра (одна беззнаковая проверка диапазона)
    imul rax, rax, 10
    add rax, rcx
    inc rdi
    inc rdx
    jmp .loop
.done:
    ret

; print_uint: rdi — число; печатает его в stdout с переводом строки
print_uint:
    sub rsp, 40                 ; буфер на стеке: rsp .. rsp+39
    lea rsi, [rsp + 32]
    mov byte [rsi], 10          ; перевод строки
    mov rax, rdi
    mov ecx, 10
.digit:
    xor edx, edx
    div rcx
    add dl, '0'
    dec rsi
    mov [rsi], dl
    test rax, rax
    jnz .digit
    lea rdx, [rsp + 33]
    sub rdx, rsi                ; длина
    mov eax, 1                  ; write(1, rsi, rdx)
    mov edi, 1
    syscall
    add rsp, 40
    ret</pre>
<p><code>parse_uint</code> возвращает сразу три значения в регистрах — в ассемблере это нормально, если договорённость описана в комментарии. Функции используют только регистры, которые разрешено портить, поэтому ничего не сохраняют.</p>

<h3>Главная программа</h3>
<pre class="code" data-lang="asm">section .data
err     db  "ошибка ввода", 10
err_len equ $ - err

section .bss
line    resb 64

section .text
global _start
_start:
    xor eax, eax                ; read(0, line, 63)
    xor edi, edi
    mov rsi, line
    mov edx, 63
    syscall
    test rax, rax
    jle .bad
    mov byte [line + rax], 0    ; завершающий ноль

    mov rdi, line
    call parse_uint
    test rdx, rdx
    jz  .bad                    ; нет цифр
    mov r12, rax                ; первое число (r12 не портят наши функции и syscall)
    movzx ebx, byte [rdi]       ; символ операции
    inc rdi
    call parse_uint
    test rdx, rdx
    jz  .bad
    movzx ecx, byte [rdi]       ; после второго числа — конец строки или перевод строки
    cmp ecx, 10
    je  .ok
    test ecx, ecx
    jnz .bad
.ok:
    cmp bl, '+'
    je  .add
    cmp bl, '-'
    je  .sub
    cmp bl, '*'
    je  .mul
    jmp .bad
.add:
    lea rdi, [r12 + rax]
    jmp .print
.sub:
    cmp r12, rax
    jb  .bad                    ; отрицательный результат — доработай сам
    mov rdi, r12
    sub rdi, rax
    jmp .print
.mul:
    mov rdi, r12
    imul rdi, rax
.print:
    call print_uint
    mov eax, 60                 ; exit(0)
    xor edi, edi
    syscall

.bad:
    mov eax, 1                  ; write(2, err, err_len)
    mov edi, 2
    mov rsi, err
    mov edx, err_len
    syscall
    mov eax, 60                 ; exit(1)
    mov edi, 1
    syscall</pre>
<pre class="code" data-lang="sh">$ nasm -f elf64 -g -F dwarf calc.asm -o calc.o && ld calc.o -o calc
$ printf "100-1\\n" | ./calc
99
$ printf "abc\\n" | ./calc; echo $?
ошибка ввода
1</pre>
<div class="ichika">Задания на доработку ♡ Добавь деление с проверкой на ноль, поддержку отрицательных результатов (печатать минус и модуль), пробелы вокруг операции и проверку переполнения при умножении через флаг OF после <code>imul</code>. Каждое — маленький шаг к настоящему парсеру!</div>
<div class="warn"><p>Программа написана для сборки через <code>ld</code> без PIE, поэтому использует абсолютные адреса (<code>mov rsi, line</code>). Чтобы собрать её через gcc как PIE, добавь <code>default rel</code> и замени такие загрузки адресов на <code>lea</code> — как в уроке 11.</p></div>

<h3>Вопросы собеседования</h3>
<div class="tbl"><table><thead><tr><th>Вопрос</th><th>Суть ответа</th></tr></thead><tbody>
<tr><td>Чем <code>lea</code> отличается от <code>mov</code>?</td><td><code>lea</code> вычисляет адрес и не читает память; <code>mov</code> с квадратными скобками читает</td></tr>
<tr><td>Как передаются аргументы функции в Linux x86-64?</td><td><code>rdi</code>, <code>rsi</code>, <code>rdx</code>, <code>rcx</code>, <code>r8</code>, <code>r9</code>, затем стек; результат в <code>rax</code></td></tr>
<tr><td>Что делают <code>call</code> и <code>ret</code>?</td><td>Кладут адрес возврата на стек и переходят; снимают адрес и возвращаются</td></tr>
<tr><td>Как переполнение буфера приводит к выполнению кода?</td><td>Запись за буфер на стеке перезаписывает адрес возврата</td></tr>
<tr><td>Почему знаковые и беззнаковые сравнения различаются?</td><td>Разные флаги: SF и OF против CF; <code>jl</code> против <code>jb</code></td></tr>
<tr><td>Что такое little-endian?</td><td>Младший байт числа хранится по меньшему адресу</td></tr>
<tr><td>Зачем <code>xor eax, eax</code>?</td><td>Короткое обнуление регистра; перед вариадическими вызовами — число векторных аргументов</td></tr>
<tr><td>Что происходит при <code>syscall</code>?</td><td>Переход в режим ядра; номер в <code>rax</code>, результат в <code>rax</code>, портятся <code>rcx</code> и <code>r11</code></td></tr>
<tr><td>Что такое PLT?</td><td>Таблица переходов для вызова функций разделяемых библиотек, адреса которых известны только при загрузке</td></tr>
</tbody></table></div>
<div class="ayano">Junior-уровень в ассемблере — это не умение писать большие программы, а уверенное чтение: открыть дизассемблер упавшей функции, найти аргументы, циклы и место ошибки, понять, что сгенерировал компилятор. С этим навыком дорога открыта в системное программирование, разработку компиляторов, встраиваемые системы и информационную безопасность. Дальше — «Programming from the Ground Up», руководства Intel и практика на задачах реверс-инжиниринга.</div>
`,
  p: [
    { q: `Почему для первого числа выбран регистр <code>r12</code>, а не <code>rcx</code>?`, a: `<code>rcx</code> портят и наши функции, и <code>syscall</code>. <code>r12</code> сохраняется вызываемым по соглашению и не меняется при системных вызовах, поэтому переживёт вызов <code>parse_uint</code>.` },
    { q: `Добавь операцию деления с проверкой делителя.`, a: `<pre class="code" data-lang="asm">.div:
    test rax, rax
    jz   .bad               ; деление на ноль
    mov  rcx, rax
    mov  rax, r12
    xor  edx, edx
    div  rcx
    mov  rdi, rax
    jmp  .print</pre> И в блоке выбора операции: <code>cmp bl, '/'</code> / <code>je .div</code>.` },
    { q: `Как обнаружить переполнение при умножении?`, a: `После <code>imul rdi, rax</code> флаг OF (и CF) установлен, если результат не поместился в 64 бита со знаком: <code>jo .bad</code>. Для беззнаковых — <code>mul</code> и проверка <code>rdx</code> на ноль.` },
    { q: `Почему в <code>parse_uint</code> используется <code>movzx ecx, byte [rdi]</code>, а не <code>mov cl, [rdi]</code>?`, a: `<code>movzx</code> обнуляет старшие биты <code>rcx</code>, поэтому дальше можно безопасно выполнить <code>add rax, rcx</code>. После <code>mov cl</code> в старших битах остался бы мусор.` },
    { q: `Вопрос собеседования: что такое кадр стека?`, a: `Область стека функции: адрес возврата, сохранённые регистры (часто <code>rbp</code>), локальные переменные. Создаётся прологом и удаляется эпилогом.` },
    { q: `Вопрос собеседования: в чём разница между регистрами, сохраняемыми вызывающим и вызываемым?`, a: `Сохраняемые вызывающим (<code>rax</code>, <code>rcx</code>, <code>rdx</code>, <code>rsi</code>, <code>rdi</code>, <code>r8</code>–<code>r11</code>) функция может портить — вызывающий сохраняет их сам при необходимости. Сохраняемые вызываемым (<code>rbx</code>, <code>rbp</code>, <code>r12</code>–<code>r15</code>) функция обязана вернуть в исходном виде.` }
  ],
  q: [
    { q: `Проверка «символ — цифра» одной инструкцией после <code>sub ecx, '0'</code>:`, o: [`<code>cmp ecx, 9</code> + <code>ja</code>`, `<code>cmp ecx, 9</code> + <code>jg</code>`, `<code>test ecx, ecx</code>`, `<code>jz</code>`], a: 0, e: `Беззнаковый диапазон.` },
    { q: `Регистр, переживающий вызовы функций по соглашению:`, o: [`<code>rcx</code>`, `<code>r12</code>`, `<code>rdx</code>`, `<code>r11</code>`], a: 1, e: `Callee-saved.` },
    { q: `Код возврата программы задаётся в:`, o: [`<code>rax</code> перед exit`, `<code>rdi</code> перед exit`, `<code>rsi</code>`, `стеке`], a: 1, e: `1-й аргумент exit.` },
    { q: `Флаг переполнения после знакового <code>imul</code>:`, o: [`ZF`, `OF`, `SF`, `PF`], a: 1, e: `Overflow.` },
    { q: `Little-endian означает:`, o: [`старший байт по меньшему адресу`, `младший байт по меньшему адресу`, `биты в обратном порядке`, `байты в сети`], a: 1, e: `x86-64.` }
  ],
  s: [
    `Калькулятор: <code>read</code> → <code>parse_uint</code> → операция → <code>print_uint</code> → <code>exit</code>.`,
    `Строка → число: цифра = байт − <code>'0'</code>, результат = результат × 10 + цифра.`,
    `Число → строка: деление на 10 и буфер на стеке справа налево.`,
    `Долгоживущие значения — в сохраняемых регистрах (<code>rbx</code>, <code>r12</code>).`,
    `Ошибки ввода — в stderr и код 1; доработки: деление, минус, переполнение.`,
    `Собеседование: <code>lea</code>, ABI, <code>call</code>/<code>ret</code>, стек, флаги, порядок байтов, <code>syscall</code>, PLT.`
  ]
});
