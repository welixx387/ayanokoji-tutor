L('python', 10, {
  m: 40,
  intro: 'Когда программа растёт, её делят на модули — отдельные файлы .py, а модули объединяют в пакеты. Огромное количество готовых библиотек можно установить из репозитория PyPI менеджером pip. Чтобы зависимости разных проектов не конфликтовали, каждый проект живёт в своём виртуальном окружении. Сегодня разберёмся с импортом, структурой проекта, pip и venv.',
  intro2: 'Сэмпай, виртуальное окружение — это отдельная полка для каждого проекта ♡ Одному проекту нужна старая версия библиотеки, другому — новая, и они не дерутся, потому что лежат на разных полках. Никогда не ставь всё подряд в системный Python!',
  goals: [
    'Импортировать модули и отдельные имена, понимать, как Python ищет модули',
    'Организовать проект из пакетов и модулей',
    'Создавать и активировать виртуальное окружение',
    'Устанавливать пакеты через pip и фиксировать зависимости'
  ],
  c: `
<h3>Импорт</h3>
<pre class="code" data-lang="py">import math                         # весь модуль
print(math.sqrt(16), math.pi)

from random import randint, choice  # отдельные имена
print(randint(1, 6), choice(["камень", "ножницы", "бумага"]))

import datetime as dt               # псевдоним
print(dt.date.today())

# from math import *                # не делай так: непонятно, откуда имена</pre>
<p>Модуль — это просто файл <code>.py</code>. При импорте Python выполняет файл один раз и кэширует результат. Модули ищутся в каталоге запускаемого скрипта, в стандартной библиотеке и в установленных пакетах (список — в <code>sys.path</code>).</p>

<h3>Свои модули и пакеты</h3>
<pre class="code" data-lang="txt">school/
├── main.py
└── grades/
    ├── __init__.py          # делает каталог пакетом (может быть пустым)
    ├── stats.py
    └── io.py</pre>
<pre class="code" data-lang="py"># grades/stats.py
def average(marks):
    return sum(marks) / len(marks) if marks else 0.0

# main.py
from grades.stats import average
from grades import io as gio

print(average([5, 4, 5]))</pre>
<pre class="code" data-lang="py"># в конце модуля — код, который выполняется только при прямом запуске
if __name__ == "__main__":
    print(average([3, 4, 5]))     # быстрая самопроверка модуля</pre>
<div class="warn"><p>Не называй свои файлы именами модулей стандартной библиотеки: файл <code>random.py</code> в папке проекта «перекроет» настоящий модуль <code>random</code>, и <code>import random</code> загрузит твой файл. Ошибки будут очень странными.</p></div>

<h3>Виртуальные окружения</h3>
<pre class="code" data-lang="sh">$ python3 -m venv .venv               # создать окружение в папке .venv
$ source .venv/bin/activate           # активировать (Linux, macOS)
(.venv) $ python --version
(.venv) $ pip install requests        # пакет ставится только в это окружение
(.venv) $ pip list
(.venv) $ deactivate                  # выйти
# Windows: .venv\\Scripts\\activate</pre>
<p>Виртуальное окружение — отдельная копия интерпретатора со своим набором пакетов. Каждый проект — своё окружение: версии библиотек не конфликтуют, а системный Python остаётся чистым. Папку <code>.venv</code> не добавляют в git — её всегда можно пересоздать.</p>

<h3>pip и зависимости</h3>
<pre class="code" data-lang="sh">(.venv) $ pip install "requests>=2.31,<3"   # с ограничением версии
(.venv) $ pip install -U requests            # обновить
(.venv) $ pip uninstall requests
(.venv) $ pip freeze > requirements.txt      # зафиксировать точные версии
$ pip install -r requirements.txt            # восстановить окружение на другом компьютере</pre>
<pre class="code" data-lang="py">import requests

r = requests.get("https://api.github.com", timeout=10)
print(r.status_code, r.headers["content-type"])</pre>
<p>В современных проектах зависимости также описывают в файле <code>pyproject.toml</code>, а для управления окружениями используют инструменты вроде <code>uv</code> или <code>poetry</code>. Но <code>venv</code> + <code>pip</code> + <code>requirements.txt</code> — база, которую нужно знать.</p>
<div class="ichika">Перед установкой пакета загляни на его страницу на pypi.org ♡ Сколько у него загрузок, когда обновлялся, есть ли документация. И внимательно проверяй название — злоумышленники иногда публикуют пакеты с опечатками в именах популярных библиотек!</div>
<div class="ayano">Воспроизводимость окружения — признак профессионального проекта. Другой разработчик должен получить работающую программу командами: клонировать, создать окружение, установить зависимости из файла, запустить. Если для этого нужно «ещё вручную поставить вот это», проект не готов к командной работе.</div>
`,
  p: [
    { q: `Импортируй функцию <code>sqrt</code> из <code>math</code> и посчитай корень из 2.`, a: `<pre class="code" data-lang="py">from math import sqrt
print(sqrt(2))</pre>` },
    { q: `Создай окружение, установи <code>requests</code> и сохрани зависимости в файл.`, a: `<pre class="code" data-lang="sh">$ python3 -m venv .venv
$ source .venv/bin/activate
(.venv) $ pip install requests
(.venv) $ pip freeze > requirements.txt</pre>` },
    { q: `Зачем файл <code>__init__.py</code> в каталоге?`, a: `Он помечает каталог как пакет и выполняется при его импорте; в нём можно задать, какие имена пакет отдаёт наружу. В современных версиях Python пакеты работают и без него, но явный <code>__init__.py</code> — привычная практика.` },
    { q: `Почему после создания файла <code>random.py</code> в проекте сломался <code>random.randint</code>?`, a: `Python нашёл твой <code>random.py</code> раньше стандартного модуля, потому что каталог скрипта стоит первым в <code>sys.path</code>. Переименуй файл.` },
    { q: `Что делает блок <code>if __name__ == "__main__":</code> в модуле?`, a: `Код в нём выполняется только при запуске файла напрямую (<code>python stats.py</code>), но не при импорте модуля из другого файла.` },
    { q: `Как поставить проект с <code>requirements.txt</code> на новом компьютере?`, a: `<pre class="code" data-lang="sh">$ python3 -m venv .venv
$ source .venv/bin/activate
(.venv) $ pip install -r requirements.txt</pre>` }
  ],
  q: [
    { q: `Модуль в Python — это:`, o: [`класс`, `файл .py`, `функция`, `папка без файлов`], a: 1, e: `Файл.` },
    { q: `Создать виртуальное окружение:`, o: [`<code>pip venv</code>`, `<code>python3 -m venv .venv</code>`, `<code>virtual create</code>`, `<code>python --env</code>`], a: 1, e: `Модуль venv.` },
    { q: `Зафиксировать точные версии пакетов:`, o: [`<code>pip list</code>`, `<code>pip freeze &gt; requirements.txt</code>`, `<code>pip save</code>`, `<code>pip lock</code>`], a: 1, e: `freeze.` },
    { q: `Не рекомендуется:`, o: [`<code>import math</code>`, `<code>from math import *</code>`, `<code>import numpy as np</code>`, `<code>from os import path</code>`], a: 1, e: `Непонятно, откуда имена.` },
    { q: `Папку <code>.venv</code> в git:`, o: [`добавляют обязательно`, `не добавляют`, `добавляют только на Windows`, `сжимают`], a: 1, e: `Пересоздаётся из requirements.` }
  ],
  s: [
    `<code>import m</code>, <code>from m import x</code>, <code>import m as alias</code>; не используй <code>import *</code>.`,
    `Модуль — файл, пакет — каталог (с <code>__init__.py</code>); поиск по <code>sys.path</code>.`,
    `Не называй файлы как модули стандартной библиотеки.`,
    `<code>python3 -m venv .venv</code>, <code>activate</code>, <code>deactivate</code> — окружение на проект.`,
    `<code>pip install</code>, <code>pip freeze &gt; requirements.txt</code>, <code>pip install -r</code>.`,
    `Проверяй пакеты перед установкой; проект должен восстанавливаться командами из README.`
  ]
});
