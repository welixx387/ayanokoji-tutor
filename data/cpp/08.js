L('cpp', 8, {
  m: 45,
  intro: 'Контрольная точка первой половины курса. Спроектируем и реализуем класс банковского счёта с историей операций, а затем систему из нескольких типов счетов. Проект проверяет всё, что мы изучили: классы и инварианты, конструкторы, const-методы, std::string и std::vector, наследование и виртуальные функции. Сначала попробуй сам, затем сверься с решением.',
  intro2: 'Сэмпай, деньги — лучшая тема для проверки инвариантов ♡ Баланс не должен уходить в минус, каждая операция записывается в историю, и никто не может подправить сумму напрямую. Почти как баллы в нашей школе!',
  goals: [
    'Спроектировать класс с инвариантами и понятным интерфейсом',
    'Хранить деньги в целых единицах и сообщать об ошибках исключениями',
    'Построить иерархию счетов с виртуальными функциями',
    'Проверить решение тестовыми сценариями'
  ],
  c: `
<h3>Задание</h3>
<ul class="ex-l">
<li>Класс <code>Account</code>: владелец, баланс в копейках, история операций.</li>
<li>Методы: <code>deposit(amount)</code>, <code>withdraw(amount)</code>, <code>balance()</code>, <code>history()</code>.</li>
<li>Сумма операции должна быть положительной; снять больше баланса нельзя — исключение.</li>
<li>Наследник <code>CreditAccount</code> позволяет уходить в минус до кредитного лимита.</li>
<li>Функция перевода между любыми счетами.</li>
</ul>

<h3>Базовый счёт</h3>
<pre class="code" data-lang="cpp">#include <iostream>
#include <stdexcept>
#include <string>
#include <vector>

struct Operation {
    std::string kind;     /* "deposit" или "withdraw" */
    long long amount;     /* в копейках */
};

class Account {
public:
    explicit Account(std::string owner) : owner_(std::move(owner)) {}
    virtual ~Account() = default;

    void deposit(long long amount) {
        check_positive(amount);
        balance_ += amount;
        history_.push_back({"deposit", amount});
    }

    void withdraw(long long amount) {
        check_positive(amount);
        if (balance_ - amount < min_balance())
            throw std::runtime_error("недостаточно средств");
        balance_ -= amount;
        history_.push_back({"withdraw", amount});
    }

    long long balance() const { return balance_; }
    const std::string& owner() const { return owner_; }
    const std::vector<Operation>& history() const { return history_; }

protected:
    virtual long long min_balance() const { return 0; }   /* точка расширения */

private:
    static void check_positive(long long amount) {
        if (amount <= 0) throw std::invalid_argument("сумма должна быть положительной");
    }
    std::string owner_;
    long long balance_ = 0;
    std::vector<Operation> history_;
};</pre>
<p>Ключевые решения: деньги — в целых копейках (<code>long long</code>), а не в <code>double</code>; баланс меняется только через методы; история отдаётся по константной ссылке — снаружи её можно читать, но нельзя подделать; проверка лимита вынесена в виртуальную функцию <code>min_balance</code>, которую переопределит наследник.</p>

<h3>Кредитный счёт и перевод</h3>
<pre class="code" data-lang="cpp">class CreditAccount : public Account {
public:
    CreditAccount(std::string owner, long long limit)
        : Account(std::move(owner)), limit_(limit) {
        if (limit_ < 0) throw std::invalid_argument("лимит не может быть отрицательным");
    }
protected:
    long long min_balance() const override { return -limit_; }
private:
    long long limit_;
};

void transfer(Account& from, Account& to, long long amount) {
    from.withdraw(amount);       /* если бросит исключение — to не изменится */
    to.deposit(amount);
}

std::string money(long long kop) {
    std::string sign = kop < 0 ? "-" : "";
    if (kop < 0) kop = -kop;
    std::string k = std::to_string(kop % 100);
    return sign + std::to_string(kop / 100) + "." + (k.size() < 2 ? "0" + k : k);
}</pre>
<pre class="code" data-lang="cpp">int main() {
    Account a{"Kiyotaka"};
    CreditAccount c{"Ichika", 50000};          /* лимит 500 рублей */
    a.deposit(100000);
    transfer(a, c, 30000);
    c.withdraw(70000);                          /* уходит в минус, это разрешено */
    try {
        a.withdraw(1000000);
    } catch (const std::exception& e) {
        std::cerr << "ошибка: " << e.what() << '\\n';
    }
    for (const Account* acc : {static_cast<Account*>(&a), static_cast<Account*>(&c)})
        std::cout << acc->owner() << ": " << money(acc->balance()) << '\\n';
}</pre>
<div class="warn"><p>В <code>transfer</code> порядок важен: сначала снятие, потом зачисление. Если снятие не удалось, зачисления не будет. Но если бы <code>deposit</code> мог бросить исключение после успешного <code>withdraw</code>, деньги бы «пропали». Для настоящей банковской системы нужна транзакционность — либо обе операции, либо ни одной.</p></div>
<div class="ichika">Подсказка для самопроверки ♡ Попробуй сломать свой класс: отрицательная сумма, ноль, снятие больше баланса, огромный лимит. Если хоть где-то баланс стал неправильным — инвариант не защищён!</div>

<h3>Вопросы для самопроверки</h3>
<ol>
<li>Почему баланс хранится в копейках, а не в рублях типа <code>double</code>?</li>
<li>Зачем <code>history()</code> возвращает <code>const</code>-ссылку, а не копию или обычную ссылку?</li>
<li>Почему у <code>Account</code> виртуальный деструктор?</li>
<li>Что изменится, если <code>min_balance</code> сделать невиртуальной?</li>
</ol>
<div class="ayano">Обрати внимание, как мало кода в наследнике: он меняет одно правило через одну виртуальную функцию. Это хороший признак иерархии — базовый класс задаёт общий алгоритм, а наследники уточняют детали. Если бы <code>CreditAccount</code> переписывал <code>withdraw</code> целиком, логика проверок дублировалась бы и рано или поздно разошлась.</div>
`,
  p: [
    { q: `Ответь на вопрос 1.`, a: `<code>double</code> хранит дробные числа приближённо: 0.1 + 0.2 ≠ 0.3. В деньгах ошибка в копейку недопустима, поэтому используют целые минимальные единицы.` },
    { q: `Ответь на вопрос 2.`, a: `Копия была бы дорогой при длинной истории, а обычная ссылка позволила бы снаружи изменить историю. <code>const</code>-ссылка даёт чтение без копирования и без возможности подделки.` },
    { q: `Ответь на вопрос 4.`, a: `Вызов <code>min_balance()</code> внутри <code>withdraw</code> всегда выполнял бы версию <code>Account</code>, возвращающую 0; кредитный счёт перестал бы уходить в минус.` },
    { q: `Добавь в <code>Account</code> метод, возвращающий сумму всех пополнений.`, a: `<pre class="code" data-lang="cpp">long long total_deposits() const {
    long long s = 0;
    for (const auto& op : history_)
        if (op.kind == "deposit") s += op.amount;
    return s;
}</pre>` },
    { q: `Добавь <code>SavingsAccount</code>, который запрещает снимать больше 3 раз.`, a: `Сделай в базовом классе виртуальную проверку <code>virtual void before_withdraw()</code>, вызываемую в начале <code>withdraw</code>. В <code>SavingsAccount</code> переопредели её: считай снятия и бросай исключение на четвёртом.` },
    { q: `Замени строковое поле <code>kind</code> на более надёжный тип.`, a: `<pre class="code" data-lang="cpp">enum class OpKind { Deposit, Withdraw };
struct Operation { OpKind kind; long long amount; };</pre> <code>enum class</code> не даст записать опечатку вроде «depost».` }
  ],
  q: [
    { q: `Деньги правильнее хранить в:`, o: [`<code>float</code>`, `<code>double</code>`, `целых минимальных единицах`, `строках`], a: 2, e: `Без погрешности.` },
    { q: `Ошибку «недостаточно средств» сообщаем через:`, o: [`возврат −1`, `исключение`, `глобальную переменную`, `молча игнорируем`], a: 1, e: `Нарушение условия.` },
    { q: `Наследник меняет правило снятия через:`, o: [`копирование withdraw`, `виртуальную функцию <code>min_balance</code>`, `макрос`, `friend`], a: 1, e: `Точка расширения.` },
    { q: `Константная ссылка на историю позволяет:`, o: [`изменять историю`, `читать без копирования`, `удалять операции`, `ничего`], a: 1, e: `Только чтение.` },
    { q: `<code>enum class</code> лучше строки для вида операции, потому что:`, o: [`короче`, `опечатки ловит компилятор`, `быстрее печатается`, `можно складывать`], a: 1, e: `Типобезопасность.` }
  ],
  s: [
    `Деньги — целые копейки; инварианты проверяются в каждом изменяющем методе.`,
    `Ошибки — исключения <code>std::invalid_argument</code>, <code>std::runtime_error</code>.`,
    `Данные отдаём по <code>const&amp;</code>: чтение без копий и подделок.`,
    `Виртуальная функция — точка расширения для наследников.`,
    `Перевод: порядок операций и транзакционность.`,
    `Проверяй класс попытками его сломать.`
  ]
});
