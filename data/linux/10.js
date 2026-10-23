L('linux', 10, {
  m: 45,
  intro: 'Bash — не только оболочка, но и язык программирования. Скрипт на Bash автоматизирует то, что ты делаешь руками: резервные копии, сборку, развёртывание, обработку файлов. В этом уроке — структура скрипта, переменные и кавычки, условия, циклы, функции и чтение ввода. С этим уже можно писать полезные утилиты.',
  intro2: 'Сэмпай, если ты сделал что-то в терминале больше двух раз — пора писать скрипт ♡ Компьютер не устаёт и не ошибается от скуки. Пусть работает он, а мы пока выпьем чаю!',
  goals: [
    'Создавать и запускать скрипты с шебангом',
    'Работать с переменными и правильно ставить кавычки',
    'Писать условия: if, [[ ]], проверки файлов и чисел',
    'Писать циклы for и while и функции'
  ],
  c: `
<h3>Первый скрипт</h3>
<pre class="code" data-lang="sh">#!/bin/bash
# hello.sh — приветствие
name="Анна"
echo "Привет, $name! Сегодня $(date +%A)."</pre>
<pre class="code" data-lang="sh">$ chmod +x hello.sh
$ ./hello.sh</pre>
<p>Первая строка — <b>шебанг</b>: какой интерпретатор выполнит файл. <code>$(команда)</code> подставляет вывод команды.</p>

<h3>Переменные и кавычки</h3>
<div class="tbl"><table><thead><tr><th>Запись</th><th>Смысл</th></tr></thead><tbody>
<tr><td><code>x=5</code></td><td>присваивание — <b>без пробелов</b> вокруг <code>=</code></td></tr>
<tr><td><code>"$x"</code></td><td>значение подставляется, пробелы внутри сохраняются</td></tr>
<tr><td><code>'$x'</code></td><td>текст как есть, без подстановки</td></tr>
<tr><td><code>&#36;{x}</code></td><td>явная граница имени: <code>"&#36;{x}px"</code></td></tr>
<tr><td><code>$((a + b))</code></td><td>целочисленная арифметика</td></tr>
<tr><td><code>read -p "Имя: " name</code></td><td>прочитать ввод в переменную</td></tr>
</tbody></table></div>
<div class="warn"><p>Всегда бери переменные в двойные кавычки: <code>rm "$file"</code>, а не <code>rm $file</code>. Если в имени файла есть пробел, без кавычек команда получит два аргумента и может удалить не то.</p></div>

<h3>Условия</h3>
<pre class="code" data-lang="sh">#!/bin/bash
read -p "Введите путь: " path
if [[ -d "$path" ]]; then
    echo "Это каталог, файлов: $(ls "$path" | wc -l)"
elif [[ -f "$path" ]]; then
    echo "Это файл размером $(stat -c %s "$path") байт"
else
    echo "Такого нет" >&2
    exit 1
fi</pre>
<div class="tbl"><table><thead><tr><th>Проверка</th><th>Истина, если</th></tr></thead><tbody>
<tr><td><code>-f file</code> / <code>-d dir</code> / <code>-e path</code></td><td>файл / каталог / существует</td></tr>
<tr><td><code>-z "$s"</code> / <code>-n "$s"</code></td><td>строка пустая / непустая</td></tr>
<tr><td><code>"$a" == "$b"</code></td><td>строки равны</td></tr>
<tr><td><code>$a -eq $b</code>, <code>-ne</code>, <code>-lt</code>, <code>-le</code>, <code>-gt</code>, <code>-ge</code></td><td>сравнение чисел</td></tr>
<tr><td><code>(( a &gt; b ))</code></td><td>сравнение чисел в арифметическом виде</td></tr>
</tbody></table></div>

<h3>Циклы и функции</h3>
<pre class="code" data-lang="sh">#!/bin/bash
for f in *.txt; do                 # по файлам
    echo "$f: $(wc -l < "$f") строк"
done

for i in {1..5}; do echo "шаг $i"; done

count=0
while read -r line; do             # построчно из файла
    count=$((count + 1))
done < data.txt
echo "Строк: $count"

backup() {                          # функция
    local src="$1"
    cp -r "$src" "$src.bak" && echo "Копия $src готова"
}
backup docs</pre>
<div class="ichika">Отладочный трюк ♡ Запусти скрипт как <code>bash -x script.sh</code> — Bash будет печатать каждую команду перед выполнением, уже с подставленными значениями. Сразу видно, где всё пошло не так!</div>
<div class="ayano">Bash хорош для склейки команд, но плох для сложной логики. Если скрипт перерос 100 строк, обзавёлся массивами словарей и сложными расчётами — пора переписать его на Python. Знать, когда остановиться, — тоже навык.</div>
`,
  p: [
    { q: `Напиши скрипт, который спрашивает имя и печатает «Привет, имя!».`, a: `<pre class="code" data-lang="sh">#!/bin/bash
read -p "Как тебя зовут? " name
echo "Привет, $name!"</pre>` },
    { q: `Почему <code>x = 5</code> в Bash — ошибка?`, a: `Bash воспримет <code>x</code> как команду с аргументами <code>=</code> и <code>5</code>. Присваивание пишется без пробелов: <code>x=5</code>.` },
    { q: `Проверь, существует ли файл <code>config.ini</code>, и выведи сообщение в обоих случаях.`, a: `<pre class="code" data-lang="sh">if [[ -f config.ini ]]; then
    echo "Конфиг найден"
else
    echo "Конфига нет"
fi</pre>` },
    { q: `Выведи числа от 1 до 10 и их квадраты.`, a: `<pre class="code" data-lang="sh">for i in {1..10}; do
    echo "$i $((i * i))"
done</pre>` },
    { q: `Переименуй все файлы <code>.jpeg</code> в текущем каталоге в <code>.jpg</code>.`, a: `<pre class="code" data-lang="sh">for f in *.jpeg; do
    mv "$f" "$(basename "$f" .jpeg).jpg"
done</pre>` },
    { q: `Напиши функцию <code>max</code>, которая печатает большее из двух чисел.`, a: `<pre class="code" data-lang="sh">max() {
    if (( $1 > $2 )); then echo "$1"; else echo "$2"; fi
}
max 3 8    # 8</pre>` }
  ],
  q: [
    { q: `Правильное присваивание:`, o: [`<code>x = 5</code>`, `<code>x=5</code>`, `<code>$x=5</code>`, `<code>set x 5</code>`], a: 1, e: `Без пробелов.` },
    { q: `<code>'$HOME'</code> в одинарных кавычках выведет:`, o: [`путь домашнего каталога`, `текст $HOME`, `ошибку`, `пустую строку`], a: 1, e: `Без подстановки.` },
    { q: `Проверка «это каталог»:`, o: [`<code>-f</code>`, `<code>-d</code>`, `<code>-z</code>`, `<code>-x</code>`], a: 1, e: `directory.` },
    { q: `Сравнение чисел «меньше» в <code>[[ ]]</code>:`, o: [`<code>&lt;</code> всегда`, `<code>-lt</code>`, `<code>-less</code>`, `<code>lt</code>`], a: 1, e: `-lt (или (( a &lt; b ))).` },
    { q: `Отладочный запуск с печатью команд:`, o: [`<code>bash -d</code>`, `<code>bash -x</code>`, `<code>bash -v</code> только`, `<code>debug</code>`], a: 1, e: `Трассировка.` }
  ],
  s: [
    `Шебанг <code>#!/bin/bash</code>, <code>chmod +x</code>, запуск <code>./script.sh</code>.`,
    `Присваивание без пробелов; переменные всегда в двойных кавычках; <code>'...'</code> — без подстановки.`,
    `<code>$(команда)</code> — вывод, <code>$((…))</code> — арифметика, <code>read -p</code> — ввод.`,
    `<code>if [[ -f/-d/-z ]]</code>, строки <code>==</code>, числа <code>-eq -lt -gt</code> или <code>(( ))</code>.`,
    `<code>for … in</code>, <code>while read -r</code>, функции с <code>local</code>.`,
    `<code>bash -x</code> — отладка; сложную логику — на Python.`
  ]
});
