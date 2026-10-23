L('deu', 23, {
  m: 40,
  intro: 'На C1 немецкий становится рабочим инструментом: описать график на презентации, сделать резюме статьи, аргументировать позицию, написать деловое письмо. У каждого жанра свои формулы. Этот урок — набор таких формул для учёбы и работы, проверенных на экзаменах Goethe C1 и TestDaF.',
  intro2: 'Senpai, «Der Anteil ist um 15 Prozent gestiegen» — и ты уже звучишь как аналитик ♡ А «Für Rückfragen stehe ich Ihnen gern zur Verfügung» — как настоящий немецкий менеджер. Сегодня примеряем деловой костюм!',
  goals: [
    'Описывать графики и статистику',
    'Писать резюме текста и передавать позицию автора',
    'Строить аргументацию: тезис, доводы, контрдоводы, вывод',
    'Писать деловое письмо по немецким нормам'
  ],
  c: `
<h3>Описание графика</h3>
<div class="tbl"><table><thead><tr><th>Функция</th><th>Формулы</th></tr></thead><tbody>
<tr><td>Введение</td><td lang="de">Die Grafik zeigt / veranschaulicht … Die Daten stammen aus dem Jahr 2024.</td></tr>
<tr><td>Рост</td><td lang="de">steigen, zunehmen, wachsen; sich verdoppeln; einen Höchststand erreichen</td></tr>
<tr><td>Падение</td><td lang="de">sinken, abnehmen, zurückgehen; einen Tiefststand erreichen</td></tr>
<tr><td>Без изменений</td><td lang="de">gleich bleiben, stagnieren, sich kaum verändern</td></tr>
<tr><td>Величины</td><td lang="de">von 20 auf 35 Prozent; um 15 Prozentpunkte; mehr als die Hälfte; knapp ein Drittel</td></tr>
<tr><td>Сравнение</td><td lang="de">im Vergleich zu …; während …, …; Im Gegensatz dazu …</td></tr>
</tbody></table></div>
<div class="warn"><p>Различай <span lang="de">auf</span> и <span lang="de">um</span>: <span lang="de">Die Zahl stieg auf 50</span> — достигла 50. <span lang="de">Die Zahl stieg um 50</span> — выросла на 50. И проценты против процентных пунктов: с 20 до 30 процентов — это рост на 10 Prozentpunkte, но на 50 Prozent.</p></div>

<h3>Резюме и позиция автора</h3>
<ul class="ex-l">
<li><span lang="de">Der Text behandelt das Thema …</span><span class="tr">В тексте рассматривается тема…</span></li>
<li><span lang="de">Der Autor vertritt die These, dass …</span><span class="tr">Автор отстаивает тезис, что…</span></li>
<li><span lang="de">Er begründet dies damit, dass …</span><span class="tr">Он обосновывает это тем, что…</span></li>
<li><span lang="de">Abschließend kommt er zu dem Schluss, dass …</span><span class="tr">В заключение он приходит к выводу, что…</span></li>
</ul>
<p>В резюме используй Konjunktiv I или формулы-посредники, чтобы отделить мнение автора от своего: <span lang="de">Laut dem Autor sei …, Nach Ansicht der Verfasserin …</span></p>
<div class="ichika">Резюме — это не пересказ всего подряд ♡ Только главная мысль, два-три аргумента и вывод. Никаких «мне кажется» — твоего мнения там нет. Это как пересказать фильм другу за минуту, без спойлеров про каждую сцену!</div>

<h3>Аргументация</h3>
<div class="tbl"><table><thead><tr><th>Шаг</th><th>Формулы</th></tr></thead><tbody>
<tr><td>Тезис</td><td lang="de">Ich vertrete die Auffassung, dass …</td></tr>
<tr><td>Довод</td><td lang="de">Dafür spricht vor allem, dass … Ein weiteres Argument ist …</td></tr>
<tr><td>Пример</td><td lang="de">Dies lässt sich am Beispiel … veranschaulichen.</td></tr>
<tr><td>Контрдовод</td><td lang="de">Kritiker wenden ein, dass … Dem lässt sich entgegenhalten, dass …</td></tr>
<tr><td>Вывод</td><td lang="de">Alles in allem überwiegen meiner Meinung nach …</td></tr>
</tbody></table></div>

<h3>Деловое письмо</h3>
<div class="ex" data-t="Пример"><p lang="de">Betreff: Ihre Anfrage vom 12. März</p><p lang="de">Sehr geehrter Herr Krause,</p><p lang="de">vielen Dank für Ihre Anfrage. Anbei sende ich Ihnen unser aktuelles Angebot. Wir würden uns freuen, wenn Sie uns bis zum 25. März eine Rückmeldung geben könnten. Für Rückfragen stehe ich Ihnen gern zur Verfügung.</p><p lang="de">Mit freundlichen Grüßen<br>Anna Petrova</p></div>
<div class="ayano">Немецкие деловые тексты ценят структуру и конкретность: одна тема — один абзац, точные даты и сроки, ясная просьба в конце. Не пиши долгих вступлений и извинений. Если к письму прилагается файл, скажи об этом словом <span lang="de">anbei</span>. Чёткость здесь — форма вежливости.</div>
`,
  p: [
    { q: 'Опиши: доля студентов-иностранцев выросла с 10 до 14 процентов.', a: '<span lang="de">Der Anteil ausländischer Studierender ist von 10 auf 14 Prozent gestiegen.</span>' },
    { q: 'Выбери предлог: <span lang="de">Die Preise sind ___ 5 Prozent gestiegen</span> (на 5 %).', a: '<span lang="de">um</span>' },
    { q: 'Начни резюме: «Автор отстаивает тезис, что школьная форма полезна».', a: '<span lang="de">Der Autor vertritt die These, dass Schuluniformen sinnvoll sind.</span>' },
    { q: 'Введи контрдовод и ответ на него.', a: '<span lang="de">Kritiker wenden ein, dass … Dem lässt sich jedoch entgegenhalten, dass …</span>' },
    { q: 'Сообщи, что прикладываешь файл.', a: '<span lang="de">Anbei sende ich Ihnen die gewünschten Unterlagen.</span>' },
    { q: 'Заверши деловое письмо предложением помощи.', a: '<span lang="de">Für Rückfragen stehe ich Ihnen gern zur Verfügung.</span>' }
  ],
  q: [
    { q: '<span lang="de">Die Zahl stieg ___ 1000.</span> (достигла 1000)', o: ['um', 'auf', 'bis', 'an'], a: 1, e: 'auf — до значения.' },
    { q: '«Оставаться на одном уровне»:', o: ['stagnieren', 'steigen', 'sinken', 'zunehmen'], a: 0, e: 'stagnieren.' },
    { q: 'В резюме текста следует:', o: ['давать своё мнение в каждом предложении', 'передавать главную мысль и аргументы автора', 'пересказывать всё подробно', 'цитировать весь текст'], a: 1, e: 'Сжато и нейтрально.' },
    { q: '«В приложении» в деловом письме:', o: ['anbei', 'dabei', 'hierbei', 'nebenbei'], a: 0, e: 'Anbei sende ich…' },
    { q: 'С 20 до 30 процентов — рост на:', o: ['10 Prozent', '10 Prozentpunkte', '30 Prozent', '20 Prozentpunkte'], a: 1, e: '10 процентных пунктов (или на 50 %).' }
  ],
  s: [
    'График: Die Grafik zeigt…; steigen/sinken/stagnieren; von … auf …, um …',
    'auf — до значения, um — на величину; проценты ≠ процентные пункты.',
    'Резюме: Der Text behandelt…, Der Autor vertritt die These…; без своего мнения.',
    'Аргументация: тезис → доводы → пример → контрдовод → вывод.',
    'Деловое письмо: Betreff, Anrede, anbei, срок, Für Rückfragen…, Mit freundlichen Grüßen.',
    'Немецкий деловой стиль — структура, конкретика, краткость.'
  ]
});
