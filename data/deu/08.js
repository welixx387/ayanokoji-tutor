L('deu', 8, {
  m: 45,
  intro: 'Контрольная точка уровня B1. Грамматическая база собрана, теперь её нужно превратить в навыки: написать письмо, высказать и обосновать мнение, поддержать разговор. В уроке — структура формального и неформального письма, выражения для мнения и связки, а в конце — проверка по требованиям B1 и описание экзамена Goethe-Zertifikat B1.',
  intro2: 'Senpai, ты дошёл до B1 ♡ Это уровень, с которым в Германии уже можно жить: снять квартиру, поговорить с врачом, поспорить о футболе. Давай проверим, готов ли ты к такой жизни!',
  goals: [
    'Писать формальное и неформальное письмо по правилам',
    'Высказывать и обосновывать мнение',
    'Использовать связки для логичного текста',
    'Проверить себя по требованиям уровня B1'
  ],
  c: `
<h3>Два типа писем</h3>
<div class="tbl"><table><thead><tr><th></th><th>Формальное</th><th>Неформальное</th></tr></thead><tbody>
<tr><td>Обращение</td><td lang="de">Sehr geehrte Damen und Herren, / Sehr geehrte Frau Müller,</td><td lang="de">Liebe Anna, / Lieber Tom, / Hallo Max,</td></tr>
<tr><td>Начало</td><td lang="de">Ich schreibe Ihnen, weil … / Mit Interesse habe ich Ihre Anzeige gelesen.</td><td lang="de">Danke für deine Nachricht! / Wie geht’s dir?</td></tr>
<tr><td>Местоимение</td><td lang="de">Sie, Ihnen, Ihr (с большой буквы)</td><td lang="de">du, dir, dein</td></tr>
<tr><td>Концовка</td><td lang="de">Ich freue mich auf Ihre Antwort. Mit freundlichen Grüßen</td><td lang="de">Schreib mir bald! Viele Grüße / Liebe Grüße</td></tr>
</tbody></table></div>
<div class="warn"><p>После обращения ставится запятая, и следующее слово пишется с маленькой буквы (если это не существительное или Sie): <span lang="de">Liebe Anna, vielen Dank für…</span></p></div>

<h3>Мнение и аргументы</h3>
<ul class="ex-l">
<li><span lang="de">Meiner Meinung nach ist das eine gute Idee.</span><span class="tr">По-моему, это хорошая идея (глагол сразу на втором месте).</span></li>
<li><span lang="de">Ich bin der Meinung, dass …</span><span class="tr">Я считаю, что…</span></li>
<li><span lang="de">Einerseits …, andererseits …</span><span class="tr">С одной стороны…, с другой стороны…</span></li>
<li><span lang="de">Ich stimme dir zu. / Da bin ich anderer Meinung.</span><span class="tr">Согласен. / Тут я не согласен.</span></li>
<li><span lang="de">Ein Vorteil ist, dass … Ein Nachteil ist, dass …</span><span class="tr">Плюс в том, что… Минус в том, что…</span></li>
</ul>

<h3>Связки</h3>
<div class="tbl"><table><thead><tr><th>Связка</th><th>Значение</th><th>Порядок слов</th></tr></thead><tbody>
<tr><td lang="de">und, aber, oder, denn, sondern</td><td>и, но, или, ведь, а (после отрицания)</td><td>не меняют порядок</td></tr>
<tr><td lang="de">deshalb, trotzdem, außerdem, dann, danach</td><td>поэтому, тем не менее, кроме того, потом</td><td>занимают 1-е место → глагол второй</td></tr>
<tr><td lang="de">weil, dass, obwohl, wenn, als</td><td>подчинительные</td><td>глагол в конец</td></tr>
</tbody></table></div>
<div class="ex" data-t="Мнение в пять предложений"><p lang="de">Viele Jugendliche verbringen täglich mehrere Stunden am Handy. Meiner Meinung nach ist das nicht immer schlecht, denn man kann damit auch lernen. Außerdem bleibt man mit Freunden in Kontakt. Trotzdem finde ich, dass man feste Pausen machen sollte, weil sonst der Schlaf leidet. Deshalb lege ich mein Handy abends in ein anderes Zimmer.</p></div>
<div class="ichika">Ошибка номер один на B1 ♡ <s>Deshalb ich lerne Deutsch.</s> После deshalb, trotzdem, außerdem — сразу глагол: <span lang="de">Deshalb lerne ich Deutsch.</span> Это как правило второго места, только первое место заняла связка.</div>

<h3>Контрольная точка B1</h3>
<ul class="ex-l">
<li><b>Говорение:</b> рассказать о событии, планах и опыте; объяснить причину; решить бытовую проблему (врач, магазин, жильё).</li>
<li><b>Аудирование:</b> понять объявления, главное в радиопередаче на знакомую тему, разговор в обычном темпе.</li>
<li><b>Чтение:</b> письма, объявления, статьи на бытовые темы.</li>
<li><b>Письмо:</b> личное письмо, сообщение, короткое мнение (около 80–100 слов).</li>
</ul>
<p>Экзамен <b>Goethe-Zertifikat B1</b> состоит из модулей Lesen, Hören, Schreiben, Sprechen; модули можно сдавать отдельно. Альтернативы — telc Deutsch B1 и ÖSD Zertifikat B1. Форматы иногда обновляются — проверяй на официальных сайтах.</p>
<div class="ayano">Проверь себя без жалости: запиши на диктофон двухминутный рассказ о прошлых выходных и сразу послушай. Если ты слышишь ошибки в порядке слов и падежах, но речь не останавливается, — ты на B1. Если останавливаешься каждые пять слов — вернись к урокам 1–3 и тренируй беглость короткими ежедневными рассказами.</div>
`,
  p: [
    { q: 'Начни формальное письмо в компанию, когда имя адресата неизвестно.', a: '<span lang="de">Sehr geehrte Damen und Herren,</span>' },
    { q: 'Закончи неформальное письмо подруге.', a: '<span lang="de">Liebe Grüße</span> / <span lang="de">Viele Grüße, dein …</span>' },
    { q: 'Исправь: <i>Deshalb ich bleibe zu Hause.</i>', a: '<span lang="de">Deshalb bleibe ich zu Hause.</span>' },
    { q: 'Выскажи мнение о школьной форме одним предложением.', a: 'Например: <span lang="de">Meiner Meinung nach ist eine Schuluniform praktisch, weil man morgens nicht überlegen muss.</span>' },
    { q: 'Соедини с sondern: <span lang="de">Ich fahre nicht mit dem Bus. Ich fahre mit dem Rad.</span>', a: '<span lang="de">Ich fahre nicht mit dem Bus, sondern mit dem Rad.</span>' },
    { q: 'Вежливо попроси в формальном письме прислать информацию.', a: '<span lang="de">Könnten Sie mir bitte weitere Informationen schicken?</span>' }
  ],
  q: [
    { q: 'Формальная концовка письма:', o: ['Tschüss', 'Mit freundlichen Grüßen', 'Bis bald', 'Hab dich lieb'], a: 1, e: 'Стандарт делового письма.' },
    { q: '<span lang="de">Meiner Meinung nach ___ das richtig.</span>', o: ['das ist', 'ist', 'sein', 'ist das ist'], a: 1, e: 'Глагол на втором месте.' },
    { q: 'Связка, после которой глагол в конце:', o: ['deshalb', 'denn', 'obwohl', 'außerdem'], a: 2, e: 'obwohl — подчинительный союз.' },
    { q: 'В формальном письме «вам» пишется:', o: ['ihnen', 'Ihnen', 'euch', 'dir'], a: 1, e: 'Вежливая форма — с большой буквы.' },
    { q: 'Немецкий экзамен уровня B1 от Гёте-института:', o: ['TestDaF', 'Goethe-Zertifikat B1', 'DSH', 'DELF'], a: 1, e: 'Goethe-Zertifikat B1.' }
  ],
  s: [
    'Формально: Sehr geehrte…, Sie/Ihnen, Mit freundlichen Grüßen.',
    'Неформально: Liebe/Lieber…, du/dir, Viele/Liebe Grüße.',
    'Мнение: Meiner Meinung nach…, Ich bin der Meinung, dass…, Einerseits… andererseits…',
    'und/aber/denn — порядок не меняют; deshalb/trotzdem — глагол сразу после них; weil/dass — в конец.',
    'B1: рассказ, объяснение, бытовые ситуации, письмо 80–100 слов.',
    'Экзамены B1: Goethe-Zertifikat, telc, ÖSD.'
  ]
});
