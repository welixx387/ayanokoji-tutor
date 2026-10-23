L('fra', 2, {
  m: 45,
  intro: 'Главный экзамен уровня B1 во французском — умение рассказать о прошлом. Для этого есть два времени, которые работают в паре: passé composé — для событий, которые произошли и завершились, и imparfait — для фона, описаний и привычек. Русскоговорящим их выбор часто даётся интуитивно, ведь у нас есть совершенный и несовершенный вид. Но совпадает это не всегда.',
  intro2: 'Senpai, представь фильм ♡ Imparfait — это декорации: «светило солнце, птицы пели». Passé composé — действие: «и тут вошёл он!» Одно без другого — либо скучный пейзаж, либо сплошной экшен без смысла.',
  goals: [
    'Образовывать passé composé с avoir и être',
    'Образовывать imparfait',
    'Выбирать между passé composé и imparfait в рассказе',
    'Рассказывать историю о прошлом на уровне B1'
  ],
  c: `
<h3>Passé composé</h3>
<div class="rule" data-t="avoir / être (présent) + participe passé"><p>-er → -é (parlé), -ir → -i (fini), -re → -u (vendu); много исключений: fait, pris, mis, dit, écrit, vu, eu, été, pu, voulu, su, venu.</p></div>
<p>С <b>être</b> спрягаются глаголы движения и изменения состояния (запомни: <span lang="fr">aller, venir, arriver, partir, entrer, sortir, monter, descendre, naître, mourir, tomber, rester, retourner, devenir, revenir, rentrer</span>) и все местоименные глаголы. Причастие согласуется с подлежащим:</p>
<ul class="ex-l">
<li><span lang="fr">Elle est partie à huit heures.</span><span class="tr">Она ушла в восемь (partie — женский род).</span></li>
<li><span lang="fr">Nous nous sommes levés tôt.</span><span class="tr">Мы встали рано.</span></li>
<li><span lang="fr">J’ai mangé une pizza.</span><span class="tr">С avoir — без согласования с подлежащим.</span></li>
</ul>

<h3>Imparfait</h3>
<div class="rule" data-t="основа nous (présent) без -ons + -ais, -ais, -ait, -ions, -iez, -aient"><p>nous parlons → je parlais; nous finissons → je finissais; nous faisons → je faisais. Единственное исключение: être → j’étais.</p></div>
<div class="tbl"><table><thead><tr><th>Imparfait — фон</th><th>Passé composé — событие</th></tr></thead><tbody>
<tr><td>описание, обстановка, погода: <span lang="fr">Il faisait beau.</span></td><td>завершённое действие: <span lang="fr">J’ai visité le musée.</span></td></tr>
<tr><td>привычка, повторение: <span lang="fr">Je jouais au foot tous les samedis.</span></td><td>однократное событие: <span lang="fr">Samedi, j’ai joué au foot.</span></td></tr>
<tr><td>длящееся действие, которое прервали: <span lang="fr">Je dormais…</span></td><td>действие, которое прервало: <span lang="fr">…quand le téléphone a sonné.</span></td></tr>
<tr><td>состояние, чувства: <span lang="fr">J’étais fatigué.</span></td><td>последовательность: <span lang="fr">Je suis entré, j’ai vu, j’ai compris.</span></td></tr>
</tbody></table></div>
<div class="warn"><p>Ловушка для русскоговорящих: <span lang="fr">J’ai habité à Moscou pendant cinq ans</span> — passé composé, хотя по-русски «жил» (несовершенный вид). Период с чёткими границами (pendant cinq ans, de 2015 à 2020) — это завершённый блок, значит passé composé.</p></div>
<div class="ichika">Тест на «слайд-шоу» ♡ Если можно спросить «и что случилось потом?» — это passé composé. Если ответ «ничего, это просто было так» — imparfait. <span lang="fr">Il pleuvait</span> — фон. <span lang="fr">Il a commencé à pleuvoir</span> — событие!</div>

<h3>Рассказ целиком</h3>
<div class="ex" data-t="Une soirée inattendue"><p lang="fr">C’était un vendredi soir. Il pleuvait et je regardais un film à la maison. Tout à coup, quelqu’un a frappé à la porte. J’ai ouvert : c’était mon vieil ami Paul. Il avait l’air fatigué. Il est entré, il s’est assis et il m’a raconté toute son histoire.</p></div>
<p>Подчеркни глаголы двумя цветами: фон (c’était, il pleuvait, je regardais, c’était, il avait l’air) и события (a frappé, j’ai ouvert, est entré, s’est assis, a raconté).</p>
<div class="ayano">Проверь себя на собственной истории. Запиши пять предложений о вчерашнем вечере: сначала два предложения фона, затем три события. Если ты легко выбираешь время в своём рассказе, переходи к чужим текстам: читай короткие новеллы и задавай к каждому глаголу вопрос «фон или событие?».</div>
`,
  p: [
    { q: 'Passé composé: <span lang="fr">Nous (aller) au cinéma.</span>', a: '<span lang="fr">Nous sommes allés au cinéma.</span>' },
    { q: 'Passé composé: <span lang="fr">Elle (prendre) le train.</span>', a: '<span lang="fr">Elle a pris le train.</span>' },
    { q: 'Imparfait: <span lang="fr">Quand j’(être) petit, je (avoir) un chien.</span>', a: '<span lang="fr">Quand j’étais petit, j’avais un chien.</span>' },
    { q: 'Выбери время: <span lang="fr">Je (lire) quand tu (appeler).</span>', a: '<span lang="fr">Je lisais quand tu as appelé.</span>' },
    { q: 'Выбери время: <span lang="fr">L’année dernière, nous (passer) deux semaines en Bretagne.</span>', a: '<span lang="fr">nous avons passé</span> — период с границами.' },
    { q: 'Переведи: «Каждое лето мы ездили к морю».', a: '<span lang="fr">Chaque été, nous allions à la mer.</span>' }
  ],
  q: [
    { q: '<span lang="fr">Elle ___ née en 2008.</span>', o: ['a', 'est', 'était', 'avait'], a: 1, e: 'naître — с être.' },
    { q: 'Imparfait от faire (je):', o: ['je fais', 'je faisais', 'je fesais', 'j’ai fait'], a: 1, e: 'Основа fais- (nous faisons).' },
    { q: 'Описание погоды в рассказе:', o: ['Il a fait beau.', 'Il faisait beau.', 'Il fera beau.', 'Il fait beau hier.'], a: 1, e: 'Фон — imparfait.' },
    { q: '<span lang="fr">Je dormais quand le réveil ___ .</span>', o: ['sonnait', 'a sonné', 'sonne', 'sonnera'], a: 1, e: 'Прерывающее событие.' },
    { q: '<span lang="fr">J’___ à Paris de 2018 à 2021.</span>', o: ['habitais', 'ai habité', 'habite', 'habiterai'], a: 1, e: 'Завершённый период.' }
  ],
  s: [
    'Passé composé = avoir/être + participe passé.',
    'С être: глаголы движения и состояния (aller, venir, partir, naître…) и местоименные; согласование с подлежащим.',
    'Imparfait = основа nous + -ais, -ait, -ions, -iez, -aient; être → étais.',
    'Imparfait — фон, описание, привычка, длящееся действие.',
    'Passé composé — событие, последовательность, прерывание, период с границами.',
    'Тест: «а что потом?» — passé composé.'
  ]
});
