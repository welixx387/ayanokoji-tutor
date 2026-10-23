L('fra', 16, {
  m: 45,
  intro: 'Контрольная точка B2. Уровень B2 — порог самостоятельности: с ним принимают во многие французские вузы и на работу. Проверим три навыка экзамена DELF B2: официальное письмо (жалоба, запрос), защита точки зрения в устной части и понимание аргументированных текстов. В конце — требования уровня и формат экзамена.',
  intro2: 'Senpai, B2 — это когда француз перестаёт переходить на английский, услышав твой акцент ♡ С ним можно учиться в Сорбонне и спорить о политике в кафе. Ещё одна вершина позади — проверим?',
  goals: [
    'Писать официальное письмо-жалобу и запрос',
    'Защищать точку зрения в устной части DELF B2',
    'Различать регистры: familier, courant, soutenu в письме',
    'Проверить себя по требованиям B2 и формату DELF B2'
  ],
  c: `
<h3>Официальное письмо</h3>
<div class="tbl"><table><thead><tr><th>Часть</th><th>Формулы</th></tr></thead><tbody>
<tr><td>Objet</td><td lang="fr">Objet : réclamation concernant la commande n° 4521</td></tr>
<tr><td>Обращение</td><td lang="fr">Madame, Monsieur,</td></tr>
<tr><td>Повод</td><td lang="fr">Je me permets de vous écrire afin de vous signaler … / Je vous écris au sujet de …</td></tr>
<tr><td>Изложение</td><td lang="fr">En effet, … De plus, … Malgré mes nombreuses relances, …</td></tr>
<tr><td>Требование</td><td lang="fr">Je vous serais reconnaissant(e) de bien vouloir … / Je vous demande donc de …</td></tr>
<tr><td>Концовка</td><td lang="fr">Dans l’attente de votre réponse, je vous prie d’agréer, Madame, Monsieur, l’expression de mes salutations distinguées.</td></tr>
</tbody></table></div>
<div class="warn"><p>Во французском официальном письме нельзя смешивать регистры: никаких <s>super, sympa, ça</s>. Вместо <span lang="fr">ça</span> — <span lang="fr">cela</span>, вместо <span lang="fr">on</span> — <span lang="fr">nous</span>, вместо <span lang="fr">je veux</span> — <span lang="fr">je souhaiterais</span>.</p></div>

<h3>Устная часть: защита точки зрения</h3>
<p>На DELF B2 ты получаешь короткий документ, готовишься 30 минут и затем представляешь свою позицию, а потом споришь с экзаменатором.</p>
<div class="tbl"><table><thead><tr><th>Этап</th><th>Формулы</th></tr></thead><tbody>
<tr><td>Представить документ</td><td lang="fr">Ce document traite de … Il soulève la question de …</td></tr>
<tr><td>Проблематика и план</td><td lang="fr">On peut se demander si … Je présenterai d’abord …, ensuite …</td></tr>
<tr><td>Аргументы</td><td lang="fr">Premièrement, … Prenons l’exemple de …</td></tr>
<tr><td>Дебаты: согласие</td><td lang="fr">Je partage votre point de vue. Vous avez raison sur ce point.</td></tr>
<tr><td>Дебаты: возражение</td><td lang="fr">Je ne suis pas tout à fait d’accord. Permettez-moi de nuancer …</td></tr>
<tr><td>Выиграть время</td><td lang="fr">C’est une question intéressante. Laissez-moi réfléchir un instant.</td></tr>
</tbody></table></div>
<div class="ichika">Экзаменатор специально будет с тобой спорить ♡ Это не значит, что ты ошибся! Он проверяет, умеешь ли ты защищаться. Не сдавайся сразу: <span lang="fr">Je comprends votre position, mais je maintiens que…</span> — «понимаю, но настаиваю». Уверенность приносит баллы.</div>

<h3>Контрольная точка B2</h3>
<ul class="ex-l">
<li><b>Говорение:</b> аргументированно спорить 15–20 минут, нюансировать мнение, реагировать на возражения.</li>
<li><b>Аудирование:</b> радиопередачи, интервью, лекции на знакомые темы; фильмы в целом без субтитров.</li>
<li><b>Чтение:</b> статьи с позицией автора, аргументированные тексты.</li>
<li><b>Письмо:</b> эссе или официальное письмо около 250 слов, связное, с subjonctif и связками.</li>
</ul>
<p><b>DELF B2</b>: четыре части по 25 баллов — понимание устной речи, понимание письменной, письмо (аргументированный текст) и устная часть (защита точки зрения). Сдача — от 50 из 100 при минимуме 5 в каждой части. Многие французские вузы принимают иностранцев с B2, некоторые требуют C1. Требования проверяй у конкретного университета.</p>
<div class="ayano">Пройди честную самопроверку: напиши письмо-жалобу на 250 слов за 60 минут и проверь его по списку — регистр, subjonctif после союзов, согласование причастий, связки, концовка. Если в тексте нет ни одного subjonctif и ни одной уступки, ты пока пишешь на B1+. Вернись к урокам 9, 10 и 15.</div>
`,
  p: [
    { q: 'Напиши строку «Objet» для жалобы на опоздание посылки.', a: '<span lang="fr">Objet : réclamation concernant le retard de livraison de ma commande</span>' },
    { q: 'Вежливо попроси вернуть деньги в официальном письме.', a: '<span lang="fr">Je vous serais reconnaissant(e) de bien vouloir me rembourser.</span>' },
    { q: 'Замени на формальный регистр: <span lang="fr">Ça m’a vraiment énervé.</span>', a: '<span lang="fr">Cela m’a profondément contrarié(e).</span>' },
    { q: 'Представь документ на устной части: «Этот документ рассказывает о…»', a: '<span lang="fr">Ce document traite de …</span>' },
    { q: 'Нюансируй позицию собеседника.', a: '<span lang="fr">Permettez-moi de nuancer votre propos : …</span>' },
    { q: 'Выиграй время перед ответом.', a: '<span lang="fr">C’est une question intéressante. Laissez-moi réfléchir un instant.</span>' }
  ],
  q: [
    { q: 'В официальном письме вместо <span lang="fr">ça</span>:', o: ['ceci uniquement', 'cela', 'ce', 'il'], a: 1, e: 'cela.' },
    { q: '«Я был бы признателен, если бы вы…»:', o: ['Je serais content que vous…', 'Je vous serais reconnaissant de bien vouloir…', 'Merci de me faire…', 'Je veux que vous…'], a: 1, e: 'Формальная формула.' },
    { q: 'Что ждёт экзаменатор в дебатах DELF B2?', o: ['что ты сразу согласишься', 'что ты будешь защищать позицию', 'что ты сменишь тему', 'короткие ответы'], a: 1, e: 'Защита точки зрения.' },
    { q: 'Сколько баллов нужно для DELF B2?', o: ['25', '50 при ≥ 5 в каждой части', '60', '75'], a: 1, e: '≥ 50/100, ≥ 5/25.' },
    { q: 'Формула завершения официального письма:', o: ['Bisous', 'À plus', 'Je vous prie d’agréer…', 'Salut'], a: 2, e: 'Классическая формула.' }
  ],
  s: [
    'Официальное письмо: Objet, Madame Monsieur, повод, изложение, требование, формула вежливости.',
    'Формальный регистр: cela, nous, je souhaiterais; никаких super, sympa.',
    'Устная часть DELF B2: представить документ → проблематика → план → аргументы → дебаты.',
    'В дебатах защищай позицию: Je maintiens que… Permettez-moi de nuancer…',
    'B2: спор 15–20 минут, статьи, эссе 250 слов с subjonctif и связками.',
    'DELF B2: 4 × 25 баллов, ≥ 50 и ≥ 5 в каждой части.'
  ]
});
