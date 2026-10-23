L('asm', 13, {
  m: 40,
  intro: 'Строка для процессора — просто последовательность байтов в памяти, а строка C — такая последовательность с нулевым байтом в конце. Обрабатывать её можно обычными циклами, а можно специальными строковыми инструкциями x86 с префиксом rep, которые повторяются сами. Сегодня напишем strlen, memcpy, memset и перевод в верхний регистр и разберёмся, как устроены эти функции в библиотеке C.',
  intro2: 'Сэмпай, строковые инструкции — это конвейер для байтов ♡ Говоришь «rep movsb» — и процессор сам копирует байт за байтом, двигая указатели и уменьшая счётчик. Как будто у тебя появился маленький помощник для скучной работы!',
  goals: [
    'Обрабатывать строки C циклами по байтам',
    'Знать инструкции movsb, stosb, lodsb, scasb, cmpsb и префиксы rep',
    'Понимать роль rsi, rdi, rcx и флага направления',
    'Реализовать strlen, memcpy, memset и смену регистра ASCII'
  ],
  c: `
<h3>Строка как массив байтов</h3>
<pre class="code" data-lang="asm">; size_t my_strlen(const char *s) — s в rdi
my_strlen:
    mov rax, rdi                ; указатель бежит по строке
.loop:
    cmp byte [rax], 0           ; дошли до завершающего нуля?
    je  .done
    inc rax
    jmp .loop
.done:
    sub rax, rdi                ; длина = конец − начало
    ret</pre>
<p>Это прямой перевод C-цикла <code>while (*p) p++; return p - s;</code>. Обрати внимание на <code>byte</code>: без него ассемблер не знал бы, сколько байт сравнивать.</p>

<h3>Строковые инструкции</h3>
<div class="tbl"><table><thead><tr><th>Инструкция</th><th>Действие (для байтов)</th><th>С префиксом</th></tr></thead><tbody>
<tr><td><code>movsb</code></td><td><code>[rdi] = [rsi]</code>, оба указателя +1</td><td><code>rep movsb</code> — копировать <code>rcx</code> байт</td></tr>
<tr><td><code>stosb</code></td><td><code>[rdi] = al</code>, <code>rdi</code> +1</td><td><code>rep stosb</code> — заполнить <code>rcx</code> байт</td></tr>
<tr><td><code>lodsb</code></td><td><code>al = [rsi]</code>, <code>rsi</code> +1</td><td>обычно в цикле</td></tr>
<tr><td><code>scasb</code></td><td>сравнить <code>al</code> с <code>[rdi]</code>, <code>rdi</code> +1</td><td><code>repne scasb</code> — искать <code>al</code></td></tr>
<tr><td><code>cmpsb</code></td><td>сравнить <code>[rsi]</code> с <code>[rdi]</code>, оба +1</td><td><code>repe cmpsb</code> — сравнивать, пока равны</td></tr>
</tbody></table></div>
<p>Есть версии для 2, 4 и 8 байт: <code>movsw</code>, <code>movsd</code>, <code>movsq</code> и так далее. Префикс <code>rep</code> повторяет инструкцию, уменьшая <code>rcx</code>, пока он не станет нулём; <code>repe</code> и <code>repne</code> дополнительно останавливаются по флагу ZF.</p>
<div class="warn"><p>Направление движения указателей задаёт флаг DF: при DF = 0 они растут, при DF = 1 — убывают. Соглашение System V гарантирует DF = 0 при входе в любую функцию, поэтому обычно ничего делать не нужно. Если ты сам выполнил <code>std</code>, обязательно верни <code>cld</code> перед выходом или вызовом другой функции.</p></div>

<h3>memcpy, memset, strlen на строковых инструкциях</h3>
<pre class="code" data-lang="asm">; void *my_memcpy(void *dst, const void *src, size_t n) — rdi, rsi, rdx
my_memcpy:
    mov rax, rdi                ; memcpy возвращает dst
    mov rcx, rdx
    rep movsb
    ret

; void *my_memset(void *dst, int c, size_t n) — rdi, esi, rdx
my_memset:
    mov r8, rdi                 ; сохранить dst для результата
    mov eax, esi                ; байт-заполнитель в al
    mov rcx, rdx
    rep stosb
    mov rax, r8
    ret

; size_t strlen_scas(const char *s) — классический трюк с repne scasb
strlen_scas:
    xor eax, eax                ; искать нулевой байт
    mov rcx, -1                 ; «бесконечный» счётчик
    repne scasb                 ; идти, пока [rdi] != 0
    not rcx                     ; rcx = −1 − (длина + 1) → not даёт длину + 1
    lea rax, [rcx - 1]
    ret</pre>
<div class="ichika">Современные процессоры отлично ускоряют <code>rep movsb</code> и <code>rep stosb</code> на больших блоках ♡ А вот настоящие <code>strlen</code> и <code>memcpy</code> в glibc написаны с векторными инструкциями и обрабатывают по 32–64 байта за раз. Твой вариант — учебный, но принцип тот же!</div>

<h3>Перевод в верхний регистр</h3>
<pre class="code" data-lang="asm">; void to_upper(char *s) — меняет строку на месте, только латиница ASCII
to_upper:
.loop:
    mov  al, [rdi]
    test al, al
    jz   .done                  ; конец строки
    mov  cl, al
    sub  cl, 'a'
    cmp  cl, 'z' - 'a'
    ja   .next                  ; не строчная буква (одна беззнаковая проверка диапазона)
    sub  al, 'a' - 'A'          ; 32
    mov  [rdi], al
.next:
    inc  rdi
    jmp  .loop
.done:
    ret</pre>
<p>Здесь снова трюк из урока 5: проверка <code>'a' &lt;= c &lt;= 'z'</code> одной беззнаковой операцией. Для кириллицы в UTF-8 так нельзя: буква занимает два байта, и смена регистра требует таблиц Unicode — поэтому это делают библиотеки.</p>
<div class="ayano">Функции <code>memcpy</code>, <code>memset</code> и <code>strlen</code> вызываются в программах миллиарды раз, поэтому авторы библиотек оптимизируют их вручную на ассемблере под каждое поколение процессоров. Понимать, как они устроены, полезно и для безопасности: <code>strlen</code> без нуля в конце читает память до первого нулевого байта, где бы он ни оказался.</div>
`,
  p: [
    { q: `Напиши <code>count_char(const char *s, char c)</code> — сколько раз символ встречается в строке.`, a: `<pre class="code" data-lang="asm">count_char:                  ; s — rdi, c — sil
    xor eax, eax
.loop:
    mov dl, [rdi]
    test dl, dl
    jz  .done
    cmp dl, sil
    jne .next
    inc rax
.next:
    inc rdi
    jmp .loop
.done:
    ret</pre>` },
    { q: `Какие регистры использует <code>rep movsb</code>?`, a: `<code>rsi</code> — источник, <code>rdi</code> — приёмник, <code>rcx</code> — количество байт. После выполнения <code>rcx</code> = 0, указатели сдвинуты на n.` },
    { q: `Объясни, почему в <code>strlen_scas</code> после <code>not rcx</code> нужно вычесть 1.`, a: `<code>repne scasb</code> уменьшает <code>rcx</code> и для нулевого байта, то есть n + 1 раз: <code>rcx</code> = −1 − (n + 1). Побитовое отрицание даёт n + 1, а длина без нуля — n.` },
    { q: `Заполни 100 байт по адресу <code>buf</code> символом «*».`, a: `<pre class="code" data-lang="asm">mov rdi, buf
mov al, '*'
mov ecx, 100
rep stosb</pre>` },
    { q: `Напиши <code>to_lower</code> для латиницы.`, a: `То же, что <code>to_upper</code>, но проверка диапазона <code>'A'</code>…<code>'Z'</code> и прибавление 32: <code>sub cl, 'A'</code>, <code>cmp cl, 'Z' - 'A'</code>, <code>ja .next</code>, <code>add al, 32</code>.` },
    { q: `Почему опасно вызывать <code>strlen</code> для буфера, прочитанного через <code>read</code>?`, a: `<code>read</code> не добавляет завершающий ноль. <code>strlen</code> будет читать память за концом данных, пока не встретит нулевой байт, — неверная длина или выход за границу буфера.` }
  ],
  q: [
    { q: `Признак конца строки C:`, o: [`перевод строки`, `нулевой байт`, `длина в начале`, `пробел`], a: 1, e: `NUL.` },
    { q: `<code>rep stosb</code> записывает байт из:`, o: [`<code>bl</code>`, `<code>al</code>`, `<code>cl</code>`, `<code>dl</code>`], a: 1, e: `al в [rdi].` },
    { q: `Счётчик повторений для <code>rep</code>:`, o: [`<code>rax</code>`, `<code>rcx</code>`, `<code>rdx</code>`, `<code>rsi</code>`], a: 1, e: `rcx.` },
    { q: `При входе в функцию по System V флаг направления DF:`, o: [`0`, `1`, `не определён`, `равен ZF`], a: 0, e: `Указатели растут.` },
    { q: `Расстояние между <code>'a'</code> и <code>'A'</code> в ASCII:`, o: [`26`, `32`, `65`, `97`], a: 1, e: `Один бит.` }
  ],
  s: [
    `Строка C — байты до нулевого; обход циклом с <code>byte [ptr]</code>.`,
    `<code>movsb</code>, <code>stosb</code>, <code>lodsb</code>, <code>scasb</code>, <code>cmpsb</code>; источник <code>rsi</code>, приёмник <code>rdi</code>, счётчик <code>rcx</code>.`,
    `<code>rep</code> — повторять <code>rcx</code> раз; <code>repe</code>/<code>repne</code> — ещё и по ZF.`,
    `DF = 0 по соглашению; после <code>std</code> верни <code>cld</code>.`,
    `<code>memcpy</code> = <code>rep movsb</code>, <code>memset</code> = <code>rep stosb</code>, <code>strlen</code> = <code>repne scasb</code>.`,
    `Регистр ASCII — разница 32; UTF-8 требует библиотек.`
  ]
});
