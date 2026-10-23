L('linux', 15, {
  m: 45,
  intro: 'Git — система контроля версий, без которой не работает ни одна команда разработчиков. Она хранит историю изменений, позволяет вести несколько линий разработки в ветках, объединять работу разных людей и откатываться к рабочей версии. В этом уроке — всё, что нужно Junior каждый день: коммиты, история, ветки, слияние, конфликты и работа с удалённым репозиторием.',
  intro2: 'Сэмпай, Git — это машина времени для кода ♡ Сломал всё? Вернись во вчера. Хочешь попробовать безумную идею? Сделай ветку, а основная версия останется целой. Без Git на собеседование лучше не приходить!',
  goals: [
    'Настраивать Git и создавать репозиторий',
    'Делать коммиты: status, add, commit, log, diff',
    'Работать с ветками и разрешать конфликты слияния',
    'Отправлять и получать изменения: remote, push, pull'
  ],
  c: `
<h3>Настройка и первый коммит</h3>
<pre class="code" data-lang="sh">$ git config --global user.name "Anna Petrova"
$ git config --global user.email "anna@example.com"
$ mkdir notes && cd notes
$ git init                      # создать репозиторий
$ echo "# Notes" > README.md
$ git status                    # что изменилось
$ git add README.md             # добавить в индекс (подготовить к коммиту)
$ git commit -m "Add README"    # сохранить снимок</pre>
<div class="tbl"><table><thead><tr><th>Зона</th><th>Что там</th><th>Как попасть</th></tr></thead><tbody>
<tr><td>Рабочий каталог</td><td>файлы, как они сейчас на диске</td><td>редактирование</td></tr>
<tr><td>Индекс (staging)</td><td>то, что войдёт в следующий коммит</td><td><code>git add</code></td></tr>
<tr><td>Репозиторий</td><td>история коммитов</td><td><code>git commit</code></td></tr>
</tbody></table></div>

<h3>История и изменения</h3>
<pre class="code" data-lang="sh">$ git log --oneline --graph     # компактная история
$ git diff                      # изменения, ещё не добавленные в индекс
$ git diff --staged             # что войдёт в коммит
$ git show a1b2c3d              # содержимое коммита
$ git restore file.c            # отменить изменения в файле
$ git restore --staged file.c   # убрать файл из индекса</pre>
<p>Файл <code>.gitignore</code> перечисляет то, что не должно попадать в репозиторий: <code>build/</code>, <code>*.o</code>, <code>.env</code>, <code>node_modules/</code>.</p>
<div class="warn"><p>Никогда не коммить пароли, ключи и токены. Даже если удалить их следующим коммитом, они останутся в истории. Секреты — в <code>.env</code>, а <code>.env</code> — в <code>.gitignore</code>.</p></div>

<h3>Ветки и слияние</h3>
<pre class="code" data-lang="sh">$ git switch -c feature/search   # создать ветку и перейти в неё
# ... правки и коммиты ...
$ git switch main                 # вернуться в основную ветку
$ git merge feature/search        # влить изменения
$ git branch -d feature/search    # удалить слитую ветку</pre>
<p>Если две ветки поменяли одни и те же строки, возникает <b>конфликт</b>. Git помечает его в файле:</p>
<pre class="code" data-lang="txt"><<<<<<< HEAD
int limit = 10;
=======
int limit = 20;
>>>>>>> feature/search</pre>
<p>Нужно отредактировать файл, оставив правильный вариант и убрав маркеры, затем <code>git add файл</code> и <code>git commit</code>.</p>
<div class="ichika">Конфликт — это не ошибка, а вопрос от Git ♡ «Два человека поменяли одно и то же — какой вариант оставить?» Он просто не берёт на себя ответственность и спрашивает тебя. Очень вежливо с его стороны!</div>

<h3>Удалённый репозиторий</h3>
<pre class="code" data-lang="sh">$ git remote add origin git@github.com:anna/notes.git
$ git push -u origin main        # первая отправка, связать ветки
$ git push                        # дальше просто так
$ git pull                        # забрать и влить чужие изменения
$ git clone git@github.com:team/project.git   # скопировать чужой репозиторий</pre>
<p>Типичный рабочий цикл в команде: <code>git pull</code> → новая ветка → коммиты → <code>git push</code> → pull request (запрос на слияние) → ревью → слияние.</p>
<div class="ayano">Хороший коммит — маленький и осмысленный: одна задача, понятное сообщение в повелительном наклонении («Add search by title», «Fix crash on empty input»). История из коммитов «fix», «fix2», «asdf» бесполезна, когда через месяц нужно найти, где сломалось. Ревьюеры и будущий ты скажут спасибо.</div>
`,
  p: [
    { q: `Создай репозиторий, добавь все файлы и сделай первый коммит.`, a: `<pre class="code" data-lang="sh">$ git init
$ git add .
$ git commit -m "Initial commit"</pre>` },
    { q: `Ты изменил три файла, но в коммит должен войти только <code>main.c</code>.`, a: `<pre class="code" data-lang="sh">$ git add main.c
$ git commit -m "Fix input parsing"</pre>` },
    { q: `Покажи последние 5 коммитов в одну строку каждый.`, a: `<pre class="code" data-lang="sh">$ git log --oneline -5</pre>` },
    { q: `Создай ветку <code>fix/login</code>, переключись в неё, а после работы влей её в <code>main</code>.`, a: `<pre class="code" data-lang="sh">$ git switch -c fix/login
# ... коммиты ...
$ git switch main
$ git merge fix/login</pre>` },
    { q: `Что делать при конфликте слияния?`, a: `Открыть файл, выбрать или объединить варианты между маркерами <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code>=======</code>, <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>, удалить маркеры, затем <code>git add</code> и <code>git commit</code>.` },
    { q: `Как сделать так, чтобы каталог <code>build/</code> и файлы <code>.o</code> не попадали в Git?`, a: `Добавить в <code>.gitignore</code> строки <code>build/</code> и <code>*.o</code>.` }
  ],
  q: [
    { q: `Подготовить файл к коммиту:`, o: [`<code>git commit</code>`, `<code>git add</code>`, `<code>git push</code>`, `<code>git save</code>`], a: 1, e: `В индекс.` },
    { q: `Создать ветку и перейти в неё:`, o: [`<code>git branch -m</code>`, `<code>git switch -c</code>`, `<code>git merge -b</code>`, `<code>git new</code>`], a: 1, e: `switch -c.` },
    { q: `Забрать изменения с сервера и влить:`, o: [`<code>git push</code>`, `<code>git pull</code>`, `<code>git clone</code>`, `<code>git fetch</code> и всё`], a: 1, e: `pull = fetch + merge.` },
    { q: `Пароли в репозитории:`, o: [`можно, если приватный`, `нельзя никогда`, `можно в отдельной ветке`, `можно, потом удалить`], a: 1, e: `Останутся в истории.` },
    { q: `Изменения, которые войдут в коммит:`, o: [`<code>git diff</code>`, `<code>git diff --staged</code>`, `<code>git log</code>`, `<code>git status -v</code> только`], a: 1, e: `Индекс.` }
  ],
  s: [
    `Зоны: рабочий каталог → индекс (<code>add</code>) → репозиторий (<code>commit</code>).`,
    `<code>status</code>, <code>log --oneline --graph</code>, <code>diff</code>, <code>diff --staged</code>, <code>restore</code>.`,
    `<code>.gitignore</code>; секреты никогда не коммитим.`,
    `Ветки: <code>switch -c</code>, <code>merge</code>, <code>branch -d</code>; конфликт — выбрать вариант, убрать маркеры, add, commit.`,
    `<code>remote add</code>, <code>push -u</code>, <code>pull</code>, <code>clone</code>; цикл с pull request и ревью.`,
    `Маленькие осмысленные коммиты с понятными сообщениями.`
  ]
});
