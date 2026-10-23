L('cpp', 10, {
  m: 40,
  intro: 'Иногда объект действительно нужно создать в куче: размер или тип известны только во время работы, объект полиморфный или должен пережить функцию. В современном C++ для этого не пишут new и delete, а используют умные указатели — RAII-обёртки, которые сами освобождают память. Сегодня изучим три вида умных указателей — уникальный, разделяемый и слабый — и разберёмся, когда какой выбрать.',
  intro2: 'Сэмпай, умный указатель — это записка с адресом, которая сама выкидывает дом, когда он никому не нужен ♡ unique — у дома один хозяин, shared — несколько совладельцев, а weak — просто знакомый, который может зайти в гости, если дом ещё стоит!',
  goals: [
    'Создавать объекты через make-функции и владеть ими через уникальный указатель',
    'Передавать владение перемещением',
    'Использовать разделяемое владение и понимать подсчёт ссылок',
    'Разрывать циклы ссылок слабыми указателями и правильно передавать указатели в функции'
  ],
  c: `
<h3><code>unique_ptr</code> — единственный владелец</h3>
<pre class="code" data-lang="cpp">#include <iostream>
#include <memory>

struct Enemy {
    explicit Enemy(int hp) : hp(hp) { std::cout << "создан\\n"; }
    ~Enemy() { std::cout << "уничтожен\\n"; }
    int hp;
};

int main() {
    auto e = std::make_unique<Enemy>(100);     /* вместо new */
    e->hp -= 30;
    std::cout << e->hp << '\\n';

    // auto copy = e;                            /* ошибка: копировать нельзя */
    std::unique_ptr<Enemy> boss = std::move(e); /* передача владения */
    std::cout << (e ? "e владеет" : "e пуст") << '\\n';
}                                                /* boss уничтожает Enemy */</pre>
<p><code>std::unique_ptr</code> — указатель, который владеет объектом единолично и удаляет его в деструкторе. Его нельзя копировать, но можно перемещать. Накладных расходов по сравнению с сырым указателем нет. Это выбор по умолчанию для динамических объектов.</p>
<pre class="code" data-lang="cpp">std::unique_ptr<Shape> make_shape(const std::string& kind) {   /* фабрика */
    if (kind == "circle") return std::make_unique<Circle>(1.0);
    return std::make_unique<Rect>(1.0, 2.0);
}

auto arr = std::make_unique<int[]>(100);   /* массив; но обычно лучше std::vector */</pre>

<h3><code>shared_ptr</code> — разделяемое владение</h3>
<pre class="code" data-lang="cpp">auto texture = std::make_shared<Texture>("hero.png");
std::cout << texture.use_count() << '\\n';      /* 1 */
{
    std::shared_ptr<Texture> copy = texture;   /* копировать можно */
    std::cout << texture.use_count() << '\\n';  /* 2 */
}
std::cout << texture.use_count() << '\\n';      /* 1 */
/* объект удалится, когда последний shared_ptr исчезнет */</pre>
<p><code>std::shared_ptr</code> хранит счётчик ссылок; объект удаляется, когда счётчик падает до нуля. Это удобно, когда у объекта действительно несколько равноправных владельцев (например, текстура, используемая многими спрайтами). Но счётчик атомарный, копирование дороже, и владение становится размытым — используй <code>shared_ptr</code> только при реальной необходимости.</p>

<h3><code>weak_ptr</code> — наблюдатель без владения</h3>
<pre class="code" data-lang="cpp">struct Node {
    std::shared_ptr<Node> next;
    std::weak_ptr<Node> prev;        /* слабая ссылка назад разрывает цикл */
};

auto a = std::make_shared<Node>();
auto b = std::make_shared<Node>();
a->next = b;
b->prev = a;                         /* если бы prev был shared_ptr — утечка */

if (auto p = b->prev.lock())         /* получить shared_ptr, если объект жив */
    std::cout << "предыдущий узел существует\\n";</pre>
<div class="warn"><p>Два объекта, держащие друг друга через <code>shared_ptr</code>, никогда не будут удалены: у каждого счётчик не меньше 1. Это утечка памяти даже с умными указателями. Одна из ссылок в цикле должна быть <code>std::weak_ptr</code>.</p></div>

<h3>Как передавать в функции</h3>
<div class="tbl"><table><thead><tr><th>Параметр</th><th>Смысл</th></tr></thead><tbody>
<tr><td><code>void use(const Enemy&amp; e)</code></td><td>функция просто пользуется объектом — лучший вариант</td></tr>
<tr><td><code>void use(Enemy* e)</code></td><td>то же, но объекта может не быть (<code>nullptr</code>)</td></tr>
<tr><td><code>void take(std::unique_ptr&lt;Enemy&gt; e)</code></td><td>функция забирает владение</td></tr>
<tr><td><code>void share(std::shared_ptr&lt;Texture&gt; t)</code></td><td>функция становится совладельцем</td></tr>
</tbody></table></div>
<p>Сырой указатель или ссылка в современном C++ означают «не владею, только пользуюсь». Владение выражается только умными указателями и контейнерами.</p>
<div class="ichika">Шпаргалка ♡ Нужен объект в куче — <code>make_unique</code>. Несколько хозяев — <code>make_shared</code>. Ссылка назад или кэш — <code>weak_ptr</code>. Просто передать в функцию — ссылка. И никаких <code>new</code> и <code>delete</code>!</div>
<div class="ayano">Начинай с <code>unique_ptr</code>: его всегда можно превратить в <code>shared_ptr</code>, если появится второй владелец, а обратное преобразование невозможно. Желание сделать всё через <code>shared_ptr</code> обычно означает, что вопрос «кто отвечает за этот объект» не решён. Решить его — часть проектирования.</div>
`,
  p: [
    { q: `Создай вектор из трёх врагов в куче и удали второго.`, a: `<pre class="code" data-lang="cpp">std::vector<std::unique_ptr<Enemy>> enemies;
for (int hp : {50, 80, 120})
    enemies.push_back(std::make_unique<Enemy>(hp));
enemies.erase(enemies.begin() + 1);   /* объект удаляется автоматически */</pre>` },
    { q: `Почему <code>unique_ptr</code> нельзя копировать?`, a: `Копия означала бы двух владельцев, и оба удалили бы объект. Владение можно только передать через <code>std::move</code>.` },
    { q: `Что напечатает код?<pre class="code" data-lang="cpp">auto a = std::make_shared<int>(5);
auto b = a;
auto c = b;
b.reset();
std::cout << a.use_count();</pre>`, a: `2: владеют <code>a</code> и <code>c</code>, <code>b</code> отказался от владения.` },
    { q: `Перепиши без <code>new</code> и <code>delete</code>:<pre class="code" data-lang="cpp">Widget* w = new Widget(3);
w->draw();
delete w;</pre>`, a: `<pre class="code" data-lang="cpp">auto w = std::make_unique<Widget>(3);
w->draw();</pre> Объект удалится сам, даже если <code>draw</code> бросит исключение.` },
    { q: `Как функция должна принимать объект, если она лишь вызывает его методы?`, a: `По ссылке (<code>const Enemy&amp;</code> или <code>Enemy&amp;</code>) или по сырому указателю, если объект может отсутствовать. Принимать умный указатель стоит, только если функция участвует во владении.` },
    { q: `Как сделать RAII-обёртку для <code>FILE*</code> через <code>unique_ptr</code>?`, a: `<pre class="code" data-lang="cpp">struct FileCloser { void operator()(std::FILE* f) const { if (f) std::fclose(f); } };
using FilePtr = std::unique_ptr<std::FILE, FileCloser>;
FilePtr f(std::fopen("log.txt", "w"));</pre>` }
  ],
  q: [
    { q: `Указатель-владелец по умолчанию:`, o: [`<code>std::shared_ptr</code>`, `<code>std::unique_ptr</code>`, `<code>std::weak_ptr</code>`, `сырой указатель`], a: 1, e: `Без накладных расходов.` },
    { q: `Передать владение <code>unique_ptr</code>:`, o: [`копированием`, `через <code>std::move</code>`, `через <code>delete</code>`, `невозможно`], a: 1, e: `Перемещение.` },
    { q: `<code>shared_ptr</code> удаляет объект, когда:`, o: [`выходит первый владелец`, `счётчик ссылок стал 0`, `вызван <code>lock</code>`, `завершается main`], a: 1, e: `Последний владелец.` },
    { q: `Цикл из двух <code>shared_ptr</code> приводит к:`, o: [`двойному удалению`, `утечке`, `ошибке компиляции`, `ничему`], a: 1, e: `Счётчики не обнуляются.` },
    { q: `Получить доступ к объекту из <code>weak_ptr</code>:`, o: [`<code>*w</code>`, `<code>w.lock()</code>`, `<code>w.get()</code>`, `<code>w-&gt;</code>`], a: 1, e: `Если объект жив.` }
  ],
  s: [
    `Нет голым <code>new</code>/<code>delete</code>: используй <code>make_unique</code> и <code>make_shared</code>.`,
    `<code>unique_ptr</code> — единственный владелец, перемещается, не копируется.`,
    `<code>shared_ptr</code> — подсчёт ссылок; используй только при реальном совместном владении.`,
    `<code>weak_ptr</code> разрывает циклы; доступ через <code>lock()</code>.`,
    `Ссылка или сырой указатель в параметре — «пользуюсь, не владею».`,
    `Начинай с <code>unique_ptr</code>.`
  ]
});
