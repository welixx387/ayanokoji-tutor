L('asm', 7, {
  m: 40,
  intro: 'Программа на ассемблере без библиотеки C общается с миром только через системные вызовы. Мы уже использовали write и exit, а сегодня разберём соглашение о системных вызовах Linux x86-64 полностью: какие регистры передают аргументы, где результат, как распознать ошибку и какие регистры ядро портит. Напишем программу, которая читает ввод пользователя и отвечает ему.',
  intro2: 'Сэмпай, помнишь, как в курсе системного программирования printf превращался в write? ♡ Сегодня мы стоим на самом нижнем этаже — сами кладём номер вызова в rax и стучимся в ядро инструкцией syscall. Ниже уже только ядро и железо!',
  goals: [
    'Знать соглашение о системных вызовах Linux x86-64',
    'Вызывать read, write, open, close и exit',
    'Распознавать ошибки по отрицательному результату',
    'Помнить, какие регистры изменяет syscall'
  ],
  c: `
<h3>Соглашение о системных вызовах</h3>
<div class="tbl"><table><thead><tr><th>Что</th><th>Где</th></tr></thead><tbody>
<tr><td>Номер вызова</td><td><code>rax</code></td></tr>
<tr><td>Аргументы 1–6</td><td><code>rdi</code>, <code>rsi</code>, <code>rdx</code>, <code>r10</code>, <code>r8</code>, <code>r9</code></td></tr>
<tr><td>Результат</td><td><code>rax</code>; от −4095 до −1 — ошибка: <code>−errno</code></td></tr>
<tr><td>Портятся</td><td><code>rcx</code> и <code>r11</code> (туда процессор сохраняет rip и флаги)</td></tr>
</tbody></table></div>
<div class="tbl"><table><thead><tr><th>Вызов</th><th>Номер</th><th>Аргументы</th></tr></thead><tbody>
<tr><td><code>read</code></td><td>0</td><td>fd, buf, count</td></tr>
<tr><td><code>write</code></td><td>1</td><td>fd, buf, count</td></tr>
<tr><td><code>open</code></td><td>2</td><td>path, flags, mode</td></tr>
<tr><td><code>close</code></td><td>3</td><td>fd</td></tr>
<tr><td><code>exit</code></td><td>60</td><td>code</td></tr>
</tbody></table></div>
<p>Полная таблица номеров — в заголовке ядра <code>unistd_64.h</code> или в справке <code>man 2 syscalls</code>. Обрати внимание: четвёртый аргумент передаётся в <code>r10</code>, а не в <code>rcx</code>, как у обычных функций, — потому что <code>rcx</code> занят инструкцией <code>syscall</code>.</p>

<h3>Эхо: read и write</h3>
<pre class="code" data-lang="asm">section .data
prompt      db  "Как тебя зовут? "
prompt_len  equ $ - prompt
hello       db  "Привет, "
hello_len   equ $ - hello

section .bss
name        resb 64

section .text
global _start
_start:
    mov eax, 1                  ; write(1, prompt, prompt_len)
    mov edi, 1
    mov rsi, prompt
    mov edx, prompt_len
    syscall

    mov eax, 0                  ; read(0, name, 64)
    mov edi, 0
    mov rsi, name
    mov edx, 64
    syscall
    test rax, rax
    jle .exit_error             ; 0 — конец ввода, отрицательное — ошибка
    mov r12, rax                ; сохранить длину (r12 syscall не портит)

    mov eax, 1                  ; write(1, hello, hello_len)
    mov edi, 1
    mov rsi, hello
    mov edx, hello_len
    syscall

    mov eax, 1                  ; write(1, name, длина) — вместе с введённым переводом строки
    mov edi, 1
    mov rsi, name
    mov rdx, r12
    syscall

    mov eax, 60                 ; exit(0)
    xor edi, edi
    syscall

.exit_error:
    mov eax, 60                 ; exit(1)
    mov edi, 1
    syscall</pre>
<p><code>read</code> возвращает число прочитанных байт — вместе с символом перевода строки, если пользователь нажал Enter. Если ввести больше 64 байт, остаток останется во входном буфере терминала и достанется shell после выхода программы — в настоящем коде ввод читают в цикле.</p>
<div class="ichika">Регистры <code>rbx</code>, <code>rbp</code>, <code>r12</code>–<code>r15</code> ядро при системном вызове не трогает ♡ Поэтому длину мы спрятали в <code>r12</code>. А вот в <code>rcx</code> и <code>r11</code> после <code>syscall</code> будет мусор — не храни там ничего важного!</div>

<h3>Ошибки</h3>
<pre class="code" data-lang="asm">section .data
path    db  "/etc/shadow", 0        ; путь — строка C с нулём в конце

section .text
    mov eax, 2                      ; open(path, O_RDONLY = 0)
    mov rdi, path
    xor esi, esi
    syscall
    test rax, rax
    js  .open_failed                ; отрицательный результат — ошибка
    mov r12, rax                    ; дескриптор
    ; ...
.open_failed:
    neg rax                         ; rax = errno, например 13 = EACCES
    mov rdi, rax
    mov eax, 60                     ; exit(errno) — увидим код ошибки через echo $?
    syscall</pre>
<div class="warn"><p>На уровне системных вызовов нет переменной <code>errno</code> — её заполняет библиотека C. Ядро возвращает ошибку прямо в <code>rax</code> как отрицательное число. Проверяй результат каждого вызова: <code>test rax, rax</code> + <code>js</code>.</p></div>
<p>Проверить, что делает программа, удобно знакомым <code>strace</code>: он покажет каждый вызов с аргументами и результатом, например <code>open("/etc/shadow", O_RDONLY) = -1 EACCES (Permission denied)</code>.</p>
<div class="ayano">Соглашение о системных вызовах — это контракт между программой и ядром, такой же строгий, как сигнатура функции. Нарушишь его — передашь аргумент не в тот регистр, забудешь, что <code>rcx</code> испорчен, — и получишь ошибку, которую трудно найти. Когда что-то не работает, первым делом запусти <code>strace</code>: он покажет, что ядро на самом деле получило.</div>
`,
  p: [
    { q: `Какие регистры нужны для вызова <code>write(2, msg, 10)</code>?`, a: `<code>rax</code> = 1, <code>rdi</code> = 2, <code>rsi</code> = адрес msg, <code>rdx</code> = 10, затем <code>syscall</code>.` },
    { q: `Почему четвёртый аргумент системного вызова передают в <code>r10</code>, а не в <code>rcx</code>?`, a: `Инструкция <code>syscall</code> сохраняет адрес возврата в <code>rcx</code> (и флаги в <code>r11</code>), поэтому <code>rcx</code> нельзя использовать для аргумента.` },
    { q: `<code>read</code> вернул −9. Что это значит?`, a: `Ошибка с кодом 9 — <code>EBADF</code>: неверный файловый дескриптор.` },
    { q: `Выведи сообщение в поток ошибок и заверши программу с кодом 2.`, a: `<pre class="code" data-lang="asm">    mov eax, 1
    mov edi, 2              ; stderr
    mov rsi, errmsg
    mov edx, errmsg_len
    syscall
    mov eax, 60
    mov edi, 2
    syscall</pre>` },
    { q: `Как посмотреть системные вызовы своей программы на ассемблере?`, a: `<pre class="code" data-lang="sh">$ strace ./echo</pre>` },
    { q: `Почему после <code>syscall</code> нельзя рассчитывать на значение, сохранённое в <code>rcx</code>?`, a: `Процессор записывает в <code>rcx</code> адрес следующей инструкции при входе в ядро. После возврата там окажется этот адрес, а не твоё значение.` }
  ],
  q: [
    { q: `Номер системного вызова передаётся в:`, o: [`<code>rdi</code>`, `<code>rax</code>`, `<code>rcx</code>`, `<code>rsp</code>`], a: 1, e: `rax.` },
    { q: `Первый аргумент системного вызова:`, o: [`<code>rax</code>`, `<code>rdi</code>`, `<code>rsi</code>`, `<code>rbx</code>`], a: 1, e: `rdi.` },
    { q: `Номер вызова read:`, o: [`0`, `1`, `2`, `3`], a: 0, e: `0.` },
    { q: `Ошибка системного вызова возвращается как:`, o: [`errno в памяти`, `отрицательное число в rax`, `флаг CF`, `исключение`], a: 1, e: `−errno.` },
    { q: `Инструкция syscall портит регистры:`, o: [`<code>rbx</code> и <code>rbp</code>`, `<code>rcx</code> и <code>r11</code>`, `<code>rdi</code> и <code>rsi</code>`, `никакие`], a: 1, e: `rip и rflags.` }
  ],
  s: [
    `Номер в <code>rax</code>, аргументы <code>rdi</code>, <code>rsi</code>, <code>rdx</code>, <code>r10</code>, <code>r8</code>, <code>r9</code>.`,
    `Результат в <code>rax</code>; от −4095 до −1 — ошибка <code>−errno</code>.`,
    `<code>syscall</code> портит <code>rcx</code> и <code>r11</code>.`,
    `read 0, write 1, open 2, close 3, exit 60.`,
    `Строки-пути заканчиваются нулём; <code>read</code> возвращает длину с переводом строки.`,
    `Проверяй каждый вызов; <code>strace</code> покажет, что получило ядро.`
  ]
});
