L('python', 8, {
  m: 45,
  intro: 'Контрольная точка первой половины курса. Напишем консольную программу учёта расходов: добавление трат с категорией и датой, отчёт по категориям, сохранение в CSV-файл между запусками. Проект проверяет всё изученное: ввод и вывод, условия и циклы, списки и словари, функции, строки и файлы. Сначала попробуй сам, потом сверься с решением.',
  intro2: 'Сэмпай, это первая программа, которой можно пользоваться по-настоящему ♡ Хочешь узнать, сколько уходит на кофе и мангу? Запиши траты — и программа всё посчитает. Главное, чтобы данные не терялись между запусками!',
  goals: [
    'Спроектировать программу из небольших функций с понятными обязанностями',
    'Хранить данные в CSV и загружать их при запуске',
    'Группировать и форматировать отчёт с помощью словарей и f-строк',
    'Обрабатывать неверный ввод без падения программы'
  ],
  c: `
<h3>Требования</h3>
<pre class="code" data-lang="txt">Команды: add, report, list, quit
> add
Сумма: 350
Категория: еда
Описание: обед
добавлено
> report
еда          1 250.00  (62%)
транспорт      450.00  (22%)
книги          320.00  (16%)
ИТОГО        2 020.00</pre>
<ul class="ex-l">
<li>Данные хранятся в <code>expenses.csv</code> (дата, сумма, категория, описание) и загружаются при старте.</li>
<li>Сумма — положительное число; неверный ввод не роняет программу, а просит повторить.</li>
<li>Отчёт отсортирован по убыванию суммы, с процентами.</li>
</ul>

<h3>Решение</h3>
<pre class="code" data-lang="py">import csv
import os
from datetime import date

FILE = "expenses.csv"
FIELDS = ["date", "amount", "category", "note"]


def load(path=FILE):
    if not os.path.exists(path):
        return []
    with open(path, newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    for r in rows:
        r["amount"] = float(r["amount"])
    return rows


def save(rows, path=FILE):
    with open(path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=FIELDS)
        writer.writeheader()
        writer.writerows(rows)


def ask_amount():
    while True:
        text = input("Сумма: ").replace(",", ".").strip()
        try:
            value = float(text)
        except ValueError:
            print("нужно число, например 350 или 99.90")
            continue
        if value > 0:
            return value
        print("сумма должна быть больше нуля")


def add(rows):
    amount = ask_amount()
    category = input("Категория: ").strip().lower() or "прочее"
    note = input("Описание: ").strip()
    rows.append({"date": date.today().isoformat(), "amount": amount,
                 "category": category, "note": note})
    save(rows)
    print("добавлено")


def report(rows):
    totals = {}
    for r in rows:
        totals[r["category"]] = totals.get(r["category"], 0) + r["amount"]
    grand = sum(totals.values())
    if grand == 0:
        print("пока нет расходов")
        return
    for cat, s in sorted(totals.items(), key=lambda kv: kv[1], reverse=True):
        print(f"{cat:<12}{s:>10,.2f}  ({s / grand:.0%})".replace(",", " "))
    print(f"{'ИТОГО':<12}{grand:>10,.2f}".replace(",", " "))


def main():
    rows = load()
    commands = {"add": add, "report": report,
                "list": lambda rs: [print(r["date"], r["amount"], r["category"], r["note"]) for r in rs]}
    print("Команды: add, report, list, quit")
    while True:
        cmd = input("> ").strip().lower()
        if cmd == "quit":
            break
        action = commands.get(cmd)
        if action is None:
            print("неизвестная команда")
        else:
            action(rows)


if __name__ == "__main__":
    main()</pre>
<p>Ключевые решения: каждая функция делает одно дело; суммы проверяются в цикле до корректного ввода; файл перезаписывается после каждого добавления, чтобы данные не потерялись при закрытии окна; команды выбираются через словарь функций вместо длинной цепочки <code>if</code>. Конструкция <code>if __name__ == "__main__":</code> запускает <code>main</code>, только когда файл запущен как программа, а не импортирован.</p>
<div class="warn"><p>Лямбда для <code>list</code> использует генератор списка ради побочного эффекта <code>print</code> — так делать не принято, это «хитрость ради краткости». Перепиши её обычной функцией <code>show(rows)</code> с циклом — это одно из заданий ниже.</p></div>
<div class="ichika">Попробуй сломать программу ♡ Введи «abc» вместо суммы, «-5», пустую категорию, неизвестную команду. Удали файл и запусти заново. Если ничего не упало — ты молодец, сэмпай!</div>

<h3>Вопросы для самопроверки</h3>
<ol>
<li>Зачем <code>replace(",", ".")</code> при вводе суммы?</li>
<li>Почему после загрузки сумма преобразуется во <code>float</code>?</li>
<li>Что изменится, если сохранять файл только при выходе по команде quit?</li>
<li>Как добавить отчёт за текущий месяц?</li>
</ol>
<div class="ayano">Обрати внимание на границу между вводом-выводом и логикой. <code>report</code> и сейчас смешивает подсчёт и печать. Если вынести подсчёт в функцию <code>totals_by_category(rows)</code>, возвращающую словарь, её можно будет протестировать и использовать, например, для графика. Это небольшой шаг, который делает программу заметно гибче.</div>
`,
  p: [
    { q: `Ответь на вопрос 1.`, a: `Многие вводят дробную часть через запятую («99,90»), а <code>float</code> понимает только точку. Замена делает ввод удобнее.` },
    { q: `Ответь на вопрос 2.`, a: `CSV хранит всё как текст, и <code>DictReader</code> возвращает строки. Без преобразования суммы складывались бы как строки или вызывали ошибку.` },
    { q: `Перепиши команду <code>list</code> обычной функцией.`, a: `<pre class="code" data-lang="py">def show(rows):
    if not rows:
        print("записей нет")
    for r in rows:
        print(f"{r['date']}  {r['amount']:>9.2f}  {r['category']:<12} {r['note']}")</pre>` },
    { q: `Вынеси подсчёт сумм по категориям в отдельную функцию.`, a: `<pre class="code" data-lang="py">def totals_by_category(rows):
    totals = {}
    for r in rows:
        totals[r["category"]] = totals.get(r["category"], 0) + r["amount"]
    return totals</pre>` },
    { q: `Добавь отчёт только за текущий месяц.`, a: `<pre class="code" data-lang="py">def this_month(rows):
    prefix = date.today().isoformat()[:7]          # "2026-10"
    return [r for r in rows if r["date"].startswith(prefix)]
report(this_month(rows))</pre>` },
    { q: `Что делает <code>if __name__ == "__main__":</code>?`, a: `Код внутри выполняется, только если файл запущен напрямую. При импорте модуля (например, в тестах) <code>main</code> не запускается, а функции становятся доступны.` }
  ],
  q: [
    { q: `Неверный ввод суммы обрабатываем через:`, o: [`падение программы`, `<code>try</code>/<code>except ValueError</code> в цикле`, `<code>exit()</code>`, `игнорирование`], a: 1, e: `Просим повторить.` },
    { q: `Выбор действия по команде удобно делать через:`, o: [`словарь функций`, `глобальные переменные`, `рекурсию`, `строку`], a: 0, e: `Таблица команд.` },
    { q: `<code>csv.DictReader</code> возвращает значения как:`, o: [`числа`, `строки`, `байты`, `даты`], a: 1, e: `Преобразуй сам.` },
    { q: `Формат <code>{x:,.2f}</code> добавляет:`, o: [`разделители разрядов и 2 знака`, `проценты`, `выравнивание`, `знак`], a: 0, e: `Запятые-разделители.` },
    { q: `Дата в формате ГГГГ-ММ-ДД:`, o: [`<code>date.today().isoformat()</code>`, `<code>date.now()</code>`, `<code>str(time)</code>`, `<code>today()</code>`], a: 0, e: `ISO 8601.` }
  ],
  s: [
    `Программа = маленькие функции: load, save, ask, add, report, main.`,
    `Данные в CSV, загрузка при старте, сохранение после изменений.`,
    `Ввод проверяется в цикле с <code>try</code>/<code>except</code>.`,
    `Отчёт: словарь сумм, сортировка по значению, f-строки с форматом.`,
    `<code>if __name__ == "__main__":</code> — точка входа.`,
    `Отделяй вычисления от печати — так код можно тестировать.`
  ]
});
