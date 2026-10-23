L('asm', 14, {
  m: 40,
  intro: 'Главная практическая польза знания ассемблера — умение читать машинный код, который сгенерировал компилятор, и отлаживать программы на уровне инструкций. Сегодня освоим три инструмента: отладчик gdb в режиме ассемблера, дизассемблер objdump и вывод ассемблерного кода компилятором через gcc -S. Научимся находить в дизассемблере знакомые конструкции C.',
  intro2: 'Сэмпай, сегодня ты получаешь рентгеновское зрение ♡ Любая программа — даже без исходников — открывается в дизассемблере, и ты видишь, что она делает на самом деле. Это суперсила отладчиков, исследователей безопасности и всех, кто оптимизирует код!',
  goals: [
    'Отлаживать программу по инструкциям в gdb: stepi, регистры, память',
    'Дизассемблировать исполняемые файлы через objdump',
    'Получать ассемблерный код из C через gcc -S и читать его',
    'Узнавать в дизассемблере пролог, циклы, ветвления и вызовы'
  ],
  c: `
<h3>gdb на уровне инструкций</h3>
<pre class="code" data-lang="sh">$ nasm -f elf64 -g -F dwarf prog.asm -o prog.o && ld prog.o -o prog
$ gdb ./prog
(gdb) set disassembly-flavor intel     # синтаксис Intel вместо AT&T
(gdb) break _start
(gdb) run
(gdb) layout asm                       # окно с дизассемблером
(gdb) layout regs                      # окно с регистрами
(gdb) stepi                            # одна инструкция (с заходом в call)
(gdb) nexti                            # одна инструкция, call целиком
(gdb) info registers rax rdi rsi
(gdb) p/x $rax                         # значение в шестнадцатеричном виде
(gdb) x/8xb $rsp                       # 8 байт по адресу rsp в hex
(gdb) x/4gx $rsp                       # 4 значения по 8 байт
(gdb) x/s 0x402000                     # строка C по адресу
(gdb) break *0x401020                  # точка останова на адресе
(gdb) finish                           # выполнить до выхода из функции</pre>
<div class="tbl"><table><thead><tr><th>Формат x/NFU</th><th>Смысл</th></tr></thead><tbody>
<tr><td>N</td><td>сколько элементов</td></tr>
<tr><td>F</td><td>формат: <code>x</code> — hex, <code>d</code> — десятичный, <code>c</code> — символ, <code>s</code> — строка, <code>i</code> — инструкция</td></tr>
<tr><td>U</td><td>размер: <code>b</code> — 1, <code>h</code> — 2, <code>w</code> — 4, <code>g</code> — 8 байт</td></tr>
</tbody></table></div>
<div class="ichika">Чтобы не набирать каждый раз <code>set disassembly-flavor intel</code>, добавь эту строку в файл <code>~/.gdbinit</code> ♡ А ещё есть удобные надстройки вроде GEF и pwndbg — они сразу показывают регистры, стек и код. Их любят исследователи безопасности!</div>

<h3>objdump</h3>
<pre class="code" data-lang="sh">$ objdump -d -M intel prog            # дизассемблировать секции с кодом
$ objdump -d -M intel --no-show-raw-insn app | less
$ objdump -s -j .rodata app           # содержимое секции данных
$ nm app                              # символы
$ readelf -h app                      # заголовок ELF: точка входа и другое</pre>
<pre class="code" data-lang="txt">0000000000401000 <_start>:
  401000:  b8 01 00 00 00         mov    eax,0x1
  401005:  bf 01 00 00 00         mov    edi,0x1
  40100a:  48 be 00 20 40 00 00   movabs rsi,0x402000
  ...</pre>
<p>Слева — адрес, посередине — байты машинного кода, справа — инструкция. По именам символов (<code>&lt;_start&gt;</code>, <code>&lt;main&gt;</code>) видно границы функций. В программах, собранных с удалением символов (<code>strip</code>), имён не будет — остаются только адреса.</p>

<h3>gcc -S: что сделал компилятор</h3>
<pre class="code" data-lang="c">/* sum.c */
long sum(const long *a, long n) {
    long s = 0;
    for (long i = 0; i < n; i++)
        s += a[i];
    return s;
}</pre>
<pre class="code" data-lang="sh">$ gcc -O1 -S -masm=intel -fno-asynchronous-unwind-tables sum.c -o -</pre>
<pre class="code" data-lang="asm">sum:
        test    rsi, rsi            ; n <= 0? (знаковая проверка через флаги test)
        jle     .L4
        mov     rax, rdi            ; указатель на текущий элемент
        lea     rdx, [rdi+rsi*8]    ; адрес конца массива
        mov     ecx, 0              ; s = 0
.L3:
        add     rcx, QWORD PTR [rax]
        add     rax, 8
        cmp     rax, rdx
        jne     .L3
.L1:
        mov     rax, rcx
        ret
.L4:
        mov     ecx, 0
        jmp     .L1</pre>
<p>Код примерный: точный вывод зависит от версии компилятора. Но узнаются все конструкции из курса: проверка входа в цикл, указатель от начала до конца вместо индекса, проверка условия в конце цикла, результат в <code>rax</code>. Флаг <code>-fno-asynchronous-unwind-tables</code> убирает служебные директивы <code>.cfi</code>, которые мешают читать.</p>
<div class="warn"><p>Код с <code>-O0</code> читать легко, но он не похож на настоящий: каждая переменная хранится в памяти стека, и инструкций в разы больше. Чтобы понять, что реально выполняется в релизной сборке, смотри <code>-O1</code> или <code>-O2</code>. Удобнее всего делать это на сайте Compiler Explorer (godbolt.org): код на C и ассемблер подсвечиваются рядом построчно.</p></div>

<h3>Шаблоны в дизассемблере</h3>
<div class="tbl"><table><thead><tr><th>Видишь</th><th>Это</th></tr></thead><tbody>
<tr><td><code>push rbp; mov rbp, rsp; sub rsp, N</code></td><td>пролог функции с локальными переменными</td></tr>
<tr><td><code>cmp</code>/<code>test</code> + условный переход вперёд</td><td><code>if</code></td></tr>
<tr><td>условный переход назад</td><td>цикл</td></tr>
<tr><td><code>[reg + reg*8]</code></td><td>доступ к массиву 8-байтовых элементов</td></tr>
<tr><td><code>[reg + константа]</code></td><td>поле структуры</td></tr>
<tr><td>загрузка <code>rdi</code>, <code>rsi</code>… перед <code>call</code></td><td>аргументы функции</td></tr>
<tr><td><code>xor eax, eax</code> перед <code>call printf</code></td><td>вызов функции с переменным числом аргументов</td></tr>
</tbody></table></div>
<div class="ayano">Не пытайся читать дизассемблер инструкция за инструкцией без плана. Сначала найди границы функции и её вызовы, затем циклы по переходам назад, потом аргументы и результат по соглашению о вызовах. Восстанови скелет — и только потом детали. Так работают все реверс-инженеры, и так же стоит читать код, который сгенерировал компилятор.</div>
`,
  p: [
    { q: `Как в gdb выполнить одну инструкцию, не заходя внутрь вызываемой функции?`, a: `<code>nexti</code> (сокращённо <code>ni</code>). <code>stepi</code> (<code>si</code>) заходит внутрь <code>call</code>.` },
    { q: `Покажи 16 байт стека в шестнадцатеричном виде побайтно.`, a: `<pre class="code" data-lang="sh">(gdb) x/16xb $rsp</pre>` },
    { q: `Получи ассемблерный код функции из <code>prog.c</code> в синтаксисе Intel с оптимизацией.`, a: `<pre class="code" data-lang="sh">$ gcc -O2 -S -masm=intel -fno-asynchronous-unwind-tables prog.c -o prog.s</pre>` },
    { q: `В дизассемблере видишь <code>mov eax, DWORD PTR [rdi+12]</code>. Что это может быть в C?`, a: `Чтение 4-байтового поля структуры по указателю в <code>rdi</code> (первый аргумент), смещение 12: например, <code>p-&gt;age</code>, где перед <code>age</code> идут поля общим размером 12 байт.` },
    { q: `Как по дизассемблеру найти циклы в функции?`, a: `Искать условные или безусловные переходы на адреса, меньшие текущего (назад). Целевая метка — начало цикла, переход — его конец.` },
    { q: `Почему код, скомпилированный с <code>-O0</code>, плохо подходит для изучения реальной производительности?`, a: `Без оптимизаций все переменные постоянно сохраняются в стек и загружаются обратно; код в разы длиннее и медленнее того, что выполняется в релизной сборке.` }
  ],
  q: [
    { q: `Включить синтаксис Intel в gdb:`, o: [`<code>set syntax intel</code>`, `<code>set disassembly-flavor intel</code>`, `<code>layout intel</code>`, `<code>-M intel</code>`], a: 1, e: `disassembly-flavor.` },
    { q: `Дизассемблировать файл в синтаксисе Intel:`, o: [`<code>objdump -d -M intel</code>`, `<code>nm -d</code>`, `<code>readelf -asm</code>`, `<code>gcc -d</code>`], a: 0, e: `objdump.` },
    { q: `Получить ассемблер из C:`, o: [`<code>gcc -c</code>`, `<code>gcc -S</code>`, `<code>gcc -E</code>`, `<code>gcc -g</code>`], a: 1, e: `-S.` },
    { q: `<code>x/4gx $rsp</code> показывает:`, o: [`4 байта`, `4 значения по 8 байт в hex`, `4 инструкции`, `4 строки`], a: 1, e: `g — 8 байт.` },
    { q: `Переход на меньший адрес обычно означает:`, o: [`вызов функции`, `цикл`, `возврат`, `ошибку`], a: 1, e: `Назад.` }
  ],
  s: [
    `gdb: <code>layout asm</code>/<code>regs</code>, <code>stepi</code>/<code>nexti</code>, <code>info registers</code>, <code>x/NFU</code>, <code>break *адрес</code>.`,
    `<code>set disassembly-flavor intel</code> — в <code>~/.gdbinit</code>.`,
    `<code>objdump -d -M intel</code>, <code>nm</code>, <code>readelf</code>.`,
    `<code>gcc -O1 -S -masm=intel -fno-asynchronous-unwind-tables</code>; Compiler Explorer.`,
    `Шаблоны: пролог, if, циклы, массивы, поля структур, аргументы.`,
    `Читай сверху вниз: функции → вызовы → циклы → детали.`
  ]
});
