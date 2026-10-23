L('fra', 7, {
  m: 40,
  intro: 'Относительные местоимения qui, que, où, dont связывают предложения: «девушка, которая поёт», «фильм, который я видел», «город, где я родился», «книга, о которой я говорю». А сравнения — «больше, чем», «так же, как», «лучший» — нужны в любом описании и споре. Обе темы — опора письма и речи уровня B1.',
  intro2: 'Senpai, «dont» — самое загадочное слово французского ♡ Его нет в русском, но оно постоянно мелькает: «le livre dont je parle». Сегодня я раскрою его секрет. Спойлер: всё дело в маленьком «de»!',
  goals: [
    'Выбирать qui, que, où и dont',
    'Использовать ce qui, ce que, ce dont',
    'Строить сравнительную и превосходную степень',
    'Правильно использовать meilleur и mieux'
  ],
  c: `
<h3>qui, que, où, dont</h3>
<div class="tbl"><table><thead><tr><th>Местоимение</th><th>Роль в придаточном</th><th>Пример</th></tr></thead><tbody>
<tr><td lang="fr">qui</td><td>подлежащее (после него — глагол)</td><td lang="fr">La fille qui chante est ma sœur.</td></tr>
<tr><td lang="fr">que (qu’)</td><td>прямое дополнение (после него — подлежащее)</td><td lang="fr">Le film que j’ai vu était génial.</td></tr>
<tr><td lang="fr">où</td><td>место и время</td><td lang="fr">La ville où je suis né. Le jour où on s’est rencontrés.</td></tr>
<tr><td lang="fr">dont</td><td>заменяет de + …</td><td lang="fr">Le livre dont je parle. L’homme dont la fille est actrice.</td></tr>
</tbody></table></div>
<div class="ichika">Секрет dont ♡ Посмотри, какой предлог требует глагол: <span lang="fr">parler de</span>, <span lang="fr">avoir besoin de</span>, <span lang="fr">être fier de</span>, <span lang="fr">rêver de</span>. Если там de — бери dont! <span lang="fr">C’est le stylo dont j’ai besoin.</span> — «Это ручка, которая мне нужна».</div>
<div class="warn"><p>Подсказка для qui и que: после <b>qui</b> сразу идёт глагол, после <b>que</b> — подлежащее. И помни: с que в passé composé причастие согласуется (урок 3): <span lang="fr">la robe que j’ai achetée</span>. Время после «le jour» — <span lang="fr">où</span>, а не <s>quand</s>.</p></div>

<h3>ce qui, ce que, ce dont</h3>
<ul class="ex-l">
<li><span lang="fr">Ce qui m’intéresse, c’est l’histoire.</span><span class="tr">Что меня интересует, так это история.</span></li>
<li><span lang="fr">Dis-moi ce que tu veux.</span><span class="tr">Скажи, чего ты хочешь.</span></li>
<li><span lang="fr">C’est exactement ce dont j’ai besoin.</span><span class="tr">Это именно то, что мне нужно.</span></li>
</ul>

<h3>Сравнение</h3>
<div class="tbl"><table><thead><tr><th>Что сравниваем</th><th>Формула</th><th>Пример</th></tr></thead><tbody>
<tr><td>Прилагательное / наречие</td><td lang="fr">plus / moins / aussi … que</td><td lang="fr">Paul est plus grand que Marc. Il court aussi vite que moi.</td></tr>
<tr><td>Существительное</td><td lang="fr">plus de / moins de / autant de … que</td><td lang="fr">J’ai autant de livres que toi.</td></tr>
<tr><td>Глагол</td><td lang="fr">plus / moins / autant que</td><td lang="fr">Il travaille plus que moi.</td></tr>
<tr><td>Превосходная</td><td lang="fr">le / la / les plus (moins) …</td><td lang="fr">C’est la plus belle ville du monde.</td></tr>
</tbody></table></div>
<div class="tbl"><table><thead><tr><th></th><th>Сравнительная</th><th>Превосходная</th></tr></thead><tbody>
<tr><td lang="fr">bon (хороший)</td><td lang="fr">meilleur</td><td lang="fr">le meilleur</td></tr>
<tr><td lang="fr">bien (хорошо)</td><td lang="fr">mieux</td><td lang="fr">le mieux</td></tr>
<tr><td lang="fr">mauvais</td><td lang="fr">pire / plus mauvais</td><td lang="fr">le pire</td></tr>
</tbody></table></div>
<p>Неверно: <s>plus bon</s>, <s>plus bien</s>. После превосходной степени — de, а не «в»: <span lang="fr">le meilleur élève de la classe</span>.</p>
<div class="ayano">Различай meilleur и mieux так же, как «лучший» и «лучше» в значении наречия. Если можно спросить «какой?» — meilleur: <span lang="fr">un meilleur film</span>. Если «как?» — mieux: <span lang="fr">il chante mieux</span>. Одна проверка — и ошибка уходит навсегда.</div>
`,
  p: [
    { q: 'Соедини: <span lang="fr">J’ai un ami. Il habite à Nice.</span>', a: '<span lang="fr">J’ai un ami qui habite à Nice.</span>' },
    { q: 'Соедини: <span lang="fr">Voici la maison. Mes parents ont acheté cette maison.</span>', a: '<span lang="fr">Voici la maison que mes parents ont achetée.</span>' },
    { q: 'Соедини: <span lang="fr">C’est le professeur. Je t’ai parlé de ce professeur.</span>', a: '<span lang="fr">C’est le professeur dont je t’ai parlé.</span>' },
    { q: 'Вставь: <span lang="fr">Je n’ai pas compris ___ il a dit.</span>', a: '<span lang="fr">ce qu’</span>' },
    { q: 'Сравни: Лиза — 1 м 60, Анна — 1 м 60.', a: '<span lang="fr">Lisa est aussi grande qu’Anna.</span>' },
    { q: 'Выбери: <span lang="fr">Ce gâteau est (meilleur/mieux) que l’autre. Elle danse (meilleur/mieux) que moi.</span>', a: '<span lang="fr">meilleur</span>; <span lang="fr">mieux</span>.' }
  ],
  q: [
    { q: '<span lang="fr">Le garçon ___ parle est mon frère.</span>', o: ['que', 'qui', 'dont', 'où'], a: 1, e: 'Подлежащее.' },
    { q: '<span lang="fr">Le pays ___ je rêve, c’est le Canada.</span>', o: ['que', 'qui', 'dont', 'où'], a: 2, e: 'rêver de.' },
    { q: '<span lang="fr">Le jour ___ il est né…</span>', o: ['quand', 'où', 'que', 'dont'], a: 1, e: 'Время после существительного — où.' },
    { q: '<span lang="fr">Elle parle ___ anglais que moi.</span>', o: ['meilleur', 'mieux', 'plus bien', 'plus bon'], a: 1, e: 'Наречие — mieux.' },
    { q: '<span lang="fr">C’est le plus grand musée ___ monde.</span>', o: ['dans le', 'du', 'en', 'au'], a: 1, e: 'После превосходной — de.' }
  ],
  s: [
    'qui — подлежащее, que — прямое дополнение, où — место и время, dont — de + …',
    'dont после parler de, avoir besoin de, rêver de, être fier de.',
    'ce qui, ce que, ce dont — «то, что».',
    'plus/moins/aussi … que; plus de/autant de … que.',
    'bon → meilleur, bien → mieux, mauvais → pire.',
    'Превосходная + de: le meilleur de la classe.'
  ]
});
