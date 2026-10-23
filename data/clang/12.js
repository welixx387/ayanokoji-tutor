L('clang', 12, {
  m: 40,
  intro: 'Программа, которая всё забывает после завершения, полезна лишь наполовину. Сегодня научимся сохранять и загружать данные с помощью файлового ввода-вывода стандартной библиотеки: открывать файлы через fopen, читать построчно через fgets, писать через fprintf, работать с двоичными данными через fread и fwrite и правильно обрабатывать ошибки и конец файла.',
  intro2: 'Сэмпай, файл — это тетрадка, которая не исчезает после урока ♡ fopen — открыть тетрадку, fprintf — записать, fgets — прочитать строчку, fclose — закрыть и убрать в портфель. Не закроешь — последние записи могут потеряться!',
  goals: [
    'Открывать файлы в нужном режиме и проверять результат fopen',
    'Читать текстовые файлы построчно и разбирать строки через sscanf',
    'Записывать текстовые и двоичные данные',
    'Правильно определять конец файла и обрабатывать ошибки'
  ],
  c: `
<h3>fopen и режимы</h3>
<div class="tbl"><table><thead><tr><th>Режим</th><th>Смысл</th><th>Если файла нет</th></tr></thead><tbody>
<tr><td><code>"r"</code></td><td>чтение</td><td>ошибка (NULL)</td></tr>
<tr><td><code>"w"</code></td><td>запись, содержимое стирается</td><td>создаётся</td></tr>
<tr><td><code>"a"</code></td><td>дозапись в конец</td><td>создаётся</td></tr>
<tr><td><code>"r+"</code></td><td>чтение и запись</td><td>ошибка</td></tr>
<tr><td><code>"rb"</code>, <code>"wb"</code></td><td>двоичный режим (важно на Windows)</td><td>как без b</td></tr>
</tbody></table></div>
<pre class="code" data-lang="c">FILE *f = fopen("scores.txt", "r");
if (f == NULL) {
    perror("scores.txt");        /* scores.txt: No such file or directory */
    return 1;
}
/* ... работа с файлом ... */
fclose(f);</pre>

<h3>Чтение текста построчно</h3>
<pre class="code" data-lang="c">#include <stdio.h>

int main(void) {
    FILE *f = fopen("scores.txt", "r");   /* строки вида: Kiyotaka 87 */
    if (!f) { perror("scores.txt"); return 1; }

    char line[256], name[64];
    int score, lineno = 0, total = 0, count = 0;
    while (fgets(line, sizeof line, f)) {
        lineno++;
        if (line[0] == '#' || line[0] == '\\n') continue;     /* комментарии и пустые */
        if (sscanf(line, "%63s %d", name, &score) != 2) {
            fprintf(stderr, "строка %d: неверный формат\\n", lineno);
            continue;
        }
        total += score;
        count++;
    }
    if (ferror(f)) perror("чтение");
    fclose(f);
    if (count) printf("среднее %.1f по %d записям\\n", (double)total / count, count);
    return 0;
}</pre>
<p>Связка <code>fgets</code> + <code>sscanf</code> надёжнее прямого <code>fscanf</code>: строка читается целиком, ошибочную можно пропустить с понятным сообщением, а ширина <code>%63s</code> защищает буфер <code>name</code>.</p>
<div class="warn"><p>Не пиши <code>while (!feof(f))</code>: признак конца файла устанавливается только <b>после</b> неудачной попытки чтения, поэтому последняя строка обработается дважды или будет прочитан мусор. Проверяй результат самой функции чтения.</p></div>

<h3>Запись текста</h3>
<pre class="code" data-lang="c">FILE *out = fopen("report.txt", "w");
if (!out) { perror("report.txt"); return 1; }
fprintf(out, "%-10s %5s\\n", "имя", "балл");
for (size_t i = 0; i < n; i++)
    fprintf(out, "%-10s %5d\\n", names[i], scores[i]);
if (fclose(out) != 0) {          /* ошибка записи может проявиться только здесь */
    perror("report.txt");
    return 1;
}</pre>
<p>Вывод буферизуется, поэтому ошибка «диск заполнен» может обнаружиться только при <code>fclose</code>. Для важных данных проверяй его результат.</p>

<h3>Двоичные файлы</h3>
<pre class="code" data-lang="c">typedef struct { int id; double balance; } Account;

Account accs[3] = { {1, 100.0}, {2, 250.5}, {3, 0.0} };
FILE *f = fopen("accounts.bin", "wb");
if (!f) { perror("open"); return 1; }
size_t w = fwrite(accs, sizeof accs[0], 3, f);    /* вернёт число записанных элементов */
fclose(f);

Account loaded[3];
f = fopen("accounts.bin", "rb");
if (!f) { perror("open"); return 1; }
size_t r = fread(loaded, sizeof loaded[0], 3, f);
fclose(f);
printf("записано %zu, прочитано %zu\\n", w, r);</pre>
<p>Двоичный формат компактен и быстр, но зависит от платформы: размеров типов, порядка байтов и выравнивания структур. Для обмена данными между разными системами используют текстовые форматы (CSV, JSON) или явно описанный двоичный формат с фиксированным порядком байтов.</p>
<div class="ichika">Перемещаться по файлу можно через <code>fseek</code> и <code>ftell</code> ♡ Например, <code>fseek(f, 0, SEEK_END)</code> и <code>ftell(f)</code> дают размер файла. Но для текстовых файлов лучше просто читать строки по порядку!</div>
<div class="ayano">Файлы приходят от пользователей, и пользователи ошибаются. Неверная строка не должна ронять программу или молча портить результат. Сообщи номер строки и причину, пропусти или остановись — но осознанно. Программа, которая аккуратно объясняет, что не так с входными данными, экономит людям часы.</div>
`,
  p: [
    { q: `Посчитай число строк в файле, имя которого передано в <code>argv[1]</code>.`, a: `<pre class="code" data-lang="c">FILE *f = fopen(argv[1], "r");
if (!f) { perror(argv[1]); return 1; }
int c, lines = 0;
while ((c = fgetc(f)) != EOF)
    if (c == '\\n') lines++;
fclose(f);
printf("%d\\n", lines);</pre> Переменная <code>c</code> — <code>int</code>, иначе <code>EOF</code> не отличить от байта 0xFF.` },
    { q: `Скопируй текстовый файл, переводя все буквы в верхний регистр.`, a: `<pre class="code" data-lang="c">int c;
while ((c = fgetc(in)) != EOF)
    fputc(toupper(c), out);</pre> Для <code>toupper</code> нужен <code>ctype.h</code>; для кириллицы в UTF-8 этот способ не подходит.` },
    { q: `Почему <code>while (!feof(f))</code> — ошибка?`, a: `<code>feof</code> становится истинной только после неудачной попытки чтения. Цикл выполнится лишний раз и обработает старые или мусорные данные.` },
    { q: `Допиши строку в журнал <code>app.log</code>, не стирая старые записи.`, a: `<pre class="code" data-lang="c">FILE *log = fopen("app.log", "a");
if (log) {
    fprintf(log, "запуск, версия %d\\n", 3);
    fclose(log);
}</pre>` },
    { q: `Прочитай файл CSV со строками <code>имя,возраст</code> и выведи людей старше 18.`, a: `<pre class="code" data-lang="c">char line[256], name[100];
int age;
while (fgets(line, sizeof line, f))
    if (sscanf(line, "%99[^,],%d", name, &age) == 2 && age > 18)
        printf("%s\\n", name);</pre> <code>%99[^,]</code> читает всё до запятой.` },
    { q: `Почему двоичный файл со структурами может не прочитаться на другом компьютере?`, a: `Размеры типов, порядок байтов и выравнивание полей могут отличаться. Для переносимости используют текстовый формат или явный двоичный формат с фиксированными типами и порядком байтов.` }
  ],
  q: [
    { q: `Режим, стирающий содержимое файла:`, o: [`<code>"r"</code>`, `<code>"w"</code>`, `<code>"a"</code>`, `<code>"r+"</code>`], a: 1, e: `Write.` },
    { q: `<code>fopen</code> при ошибке возвращает:`, o: [`−1`, `<code>NULL</code>`, `0 байт`, `EOF`], a: 1, e: `Проверяй.` },
    { q: `Переменная для результата <code>fgetc</code> должна быть типа:`, o: [`<code>char</code>`, `<code>int</code>`, `<code>unsigned char</code>`, `<code>bool</code>`], a: 1, e: `Чтобы отличить EOF.` },
    { q: `Двоичную запись выполняет:`, o: [`<code>fprintf</code>`, `<code>fwrite</code>`, `<code>fputs</code>`, `<code>puts</code>`], a: 1, e: `fwrite.` },
    { q: `Ошибка «диск заполнен» может проявиться только при:`, o: [`<code>fopen</code>`, `<code>fclose</code>`, `<code>fseek</code>`, `<code>perror</code>`], a: 1, e: `Сброс буфера.` }
  ],
  s: [
    `<code>fopen</code>: режимы r, w, a, r+, b; всегда проверяй на <code>NULL</code>.`,
    `Текст: <code>fgets</code> + <code>sscanf</code> с шириной полей; сообщай номер ошибочной строки.`,
    `Не используй <code>while (!feof(f))</code> — проверяй результат чтения.`,
    `<code>fgetc</code> возвращает <code>int</code>; сравнивай с <code>EOF</code>.`,
    `Двоичные данные: <code>fwrite</code>/<code>fread</code>; формат зависит от платформы.`,
    `Проверяй <code>fclose</code> при записи важных данных.`
  ]
});
