L('asm', 5, {
  m: 40,
  intro: 'В ассемблере нет if и else — есть только сравнение, которое выставляет флаги, и переходы, которые смотрят на флаги. Из этих двух кирпичиков компилятор строит все ветвления языков высокого уровня. Сегодня изучим cmp и test, безусловный и условные переходы, разберёмся, почему для знаковых и беззнаковых чисел нужны разные переходы, и переведём if-else и switch на язык процессора.',
  intro2: 'Сэмпай, переход в ассемблере — это стрелка «если лампочка горит — иди туда» ♡ Никаких фигурных скобок, только прыжки по меткам. Звучит запутанно, но любой if из C превращается ровно в это. Сегодня научимся переводить туда и обратно!',
  goals: [
    'Сравнивать значения через cmp и проверять биты через test',
    'Использовать безусловный переход jmp и метки',
    'Выбирать правильный условный переход для знаковых и беззнаковых чисел',
    'Переводить if, if-else и составные условия из C в ассемблер'
  ],
  c: `
<h3>cmp и test</h3>
<pre class="code" data-lang="asm">cmp rax, rbx        ; вычисляет rax − rbx, результат отбрасывается, флаги — остаются
test rax, rax       ; вычисляет rax AND rax: ZF=1, если rax == 0; SF — знак
test al, 1          ; проверить младший бит: ZF=0, если число нечётное</pre>
<p><code>cmp</code> — это <code>sub</code> без записи результата, <code>test</code> — это <code>and</code> без записи результата. Обе нужны только ради флагов. <code>test reg, reg</code> — самый короткий способ проверить регистр на ноль, и компиляторы используют его постоянно.</p>

<h3>Переходы</h3>
<div class="tbl"><table><thead><tr><th>Условие</th><th>Знаковые</th><th>Беззнаковые</th></tr></thead><tbody>
<tr><td>равно / не равно</td><td colspan="2"><code>je</code> / <code>jne</code> (то же, что <code>jz</code> / <code>jnz</code>)</td></tr>
<tr><td>больше</td><td><code>jg</code> (greater)</td><td><code>ja</code> (above)</td></tr>
<tr><td>больше или равно</td><td><code>jge</code></td><td><code>jae</code></td></tr>
<tr><td>меньше</td><td><code>jl</code> (less)</td><td><code>jb</code> (below)</td></tr>
<tr><td>меньше или равно</td><td><code>jle</code></td><td><code>jbe</code></td></tr>
<tr><td>отрицательно / нет</td><td colspan="2"><code>js</code> / <code>jns</code></td></tr>
</tbody></table></div>
<pre class="code" data-lang="asm">    mov rax, -1
    cmp rax, 1
    jl  .signed_less        ; сработает: −1 < 1 как знаковые
    jb  .unsigned_less      ; не сработал бы: как беззнаковое 0xFFFF...FF > 1
    jmp .done               ; безусловный переход
.signed_less:
    ; ...
.unsigned_less:
    ; ...
.done:</pre>
<p>Метки, начинающиеся с точки, — <b>локальные</b>: они принадлежат ближайшей обычной метке, поэтому в разных функциях можно использовать одинаковые имена <code>.done</code> и <code>.loop</code>.</p>
<div class="warn"><p>Перепутать <code>jl</code> и <code>jb</code> — классическая ошибка. Знаковые переходы смотрят на SF и OF, беззнаковые — на CF. Для индексов, размеров и адресов (<code>size_t</code>, указатели) нужны беззнаковые переходы, для обычных <code>int</code> — знаковые.</p></div>

<h3>Перевод if и if-else</h3>
<pre class="code" data-lang="c">/* C */
if (x > 10)
    y = 1;
else
    y = 2;</pre>
<pre class="code" data-lang="asm">; x в rdi, y в rax (знаковые)
    cmp rdi, 10
    jle .else           ; условие инвертируется: перепрыгнуть, если НЕ больше
    mov rax, 1
    jmp .end
.else:
    mov rax, 2
.end:</pre>
<p>Компилятор обычно инвертирует условие: переход ведёт в обход блока <code>then</code>. Для простого выбора значения есть инструкция условного копирования без перехода:</p>
<pre class="code" data-lang="asm">    mov  rax, 2
    mov  rcx, 1
    cmp  rdi, 10
    cmovg rax, rcx      ; если rdi > 10, rax = rcx — без ветвления</pre>

<h3>Составные условия</h3>
<pre class="code" data-lang="asm">; if (x >= 0 && x < 100) inside = 1;   x в rdi
    xor  eax, eax           ; inside = 0
    test rdi, rdi
    js   .no                ; x < 0 — сразу выход (сокращённое вычисление)
    cmp  rdi, 100
    jge  .no
    mov  eax, 1
.no:

; трюк компилятора: 0 <= x < 100  ⇔  (unsigned)x < 100
    xor  eax, eax
    cmp  rdi, 100
    jae  .out               ; отрицательные как беззнаковые огромны — тоже вне диапазона
    mov  eax, 1
.out:</pre>
<div class="ichika">Видишь второй вариант? ♡ Одна беззнаковая проверка заменяет две знаковые: отрицательное число как беззнаковое — гигантское, и оно точно больше 100. Компиляторы обожают такие трюки, и теперь ты будешь узнавать их в дизассемблере!</div>
<div class="ayano">Переход — дорогая операция для современного процессора, если он не угадал направление заранее: конвейер приходится сбрасывать. Поэтому компиляторы заменяют предсказуемо-непредсказуемые ветвления на <code>cmov</code> и арифметику. Тебе пока не нужно оптимизировать вручную, но полезно понимать, почему сгенерированный код иногда выглядит странно.</div>
`,
  p: [
    { q: `Переведи на ассемблер: <code>if (a == b) c = 0;</code> — a, b, c в rdi, rsi, rax.`, a: `<pre class="code" data-lang="asm">    cmp rdi, rsi
    jne .skip
    xor eax, eax
.skip:</pre>` },
    { q: `Какой переход выбрать для сравнения двух <code>size_t</code>: <code>jg</code> или <code>ja</code>?`, a: `<code>ja</code>: <code>size_t</code> — беззнаковый тип, нужны беззнаковые переходы (above/below).` },
    { q: `Найди максимум из <code>rdi</code> и <code>rsi</code> (знаковые) в <code>rax</code> без переходов.`, a: `<pre class="code" data-lang="asm">mov  rax, rdi
cmp  rsi, rdi
cmovg rax, rsi</pre>` },
    { q: `Проверь, чётно ли число в <code>rdi</code>, и перейди на <code>.even</code>, если да.`, a: `<pre class="code" data-lang="asm">test dil, 1
jz   .even</pre> Младший бит 0 — число чётное.` },
    { q: `Переведи: <code>if (x &lt; 0 || x &gt; 9) err = 1;</code> (x в rdi, знаковое, err в rax).`, a: `<pre class="code" data-lang="asm">    xor eax, eax
    cmp rdi, 9
    ja  .bad            ; беззнаково: охватывает и x < 0, и x > 9
    jmp .ok
.bad:
    mov eax, 1
.ok:</pre> Можно и двумя знаковыми проверками: <code>js .bad</code> и <code>jg .bad</code> после <code>cmp rdi, 9</code>.` },
    { q: `Почему <code>test rax, rax</code> предпочитают <code>cmp rax, 0</code>?`, a: `Результат по флагам тот же для проверки на ноль и знак, а инструкция <code>test</code> короче (нет непосредственного операнда).` }
  ],
  q: [
    { q: `<code>cmp a, b</code> вычисляет:`, o: [`a + b`, `a − b, сохраняя только флаги`, `a AND b`, `a == b в регистр`], a: 1, e: `sub без записи.` },
    { q: `Переход «больше» для беззнаковых:`, o: [`<code>jg</code>`, `<code>ja</code>`, `<code>jl</code>`, `<code>jb</code>`], a: 1, e: `above.` },
    { q: `Переход «меньше» для знаковых:`, o: [`<code>jb</code>`, `<code>jl</code>`, `<code>js</code>`, `<code>ja</code>`], a: 1, e: `less.` },
    { q: `Проверить регистр на ноль короче всего:`, o: [`<code>cmp rax, 0</code>`, `<code>test rax, rax</code>`, `<code>sub rax, 0</code>`, `<code>mov rax, 0</code>`], a: 1, e: `test.` },
    { q: `Условное копирование без перехода:`, o: [`<code>jmp</code>`, `<code>cmovCC</code>`, `<code>movzx</code>`, `<code>lea</code>`], a: 1, e: `cmov.` }
  ],
  s: [
    `<code>cmp</code> = <code>sub</code> без результата, <code>test</code> = <code>and</code> без результата — только флаги.`,
    `<code>jmp</code> — безусловный; <code>je/jne</code>, знаковые <code>jg/jl/jge/jle</code>, беззнаковые <code>ja/jb/jae/jbe</code>.`,
    `Локальные метки начинаются с точки.`,
    `if переводится инверсией условия и переходом в обход блока.`,
    `<code>cmov</code> — выбор без ветвления.`,
    `Диапазон <code>0 &lt;= x &lt; n</code> — одна беззнаковая проверка.`
  ]
});
