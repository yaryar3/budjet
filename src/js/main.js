let startBtn = document.getElementById("start"),
	budgetValue = document.getElementsByClassName('budget-value')[0],
	dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
	levelValue = document.getElementsByClassName('level-value')[0],
	expensesValue = document.getElementsByClassName('expenses-value')[0],
	optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
	incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],


	expensesItem = document.getElementsByClassName('expenses-item'),
	expensesBtn = document.getElementsByTagName('button')[0],
	optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
	incomeItem = document.querySelector('.choose-income'),
	checkSavings = document.querySelector('#savings'),
	sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;

expensesBtn.disabled = true; //первая кнопка выключенат -тру
optionalExpensesBtn.disabled = true;
countBtn.disabled = true;

startBtn.addEventListener('click', () => { // когда кликаем на кнопк старт
    time = prompt('Введите дату в формате YYYY-MM-DD', ''); // сначала у пользователя спрашиваем дату
    money = +prompt("Ваш бюджет на месяц?", ''); // дальше спрашиваем бюджет на месяц, проверяем чтобы наш доход был числом

    while (isNaN(money) || money == '' || money == null) { // проверяем, чтобы наш доход был числом, и чтобы пользователь не мог оставить пустое место
        money = prompt("Ваш бюджет?", "");
    }
    appData.budget = money;  // полученные данные записываем в объект appData
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();  // полученные данные записываем в поле
    yearValue.value = new Date(Date.parse(time)).getFullYear();// вытаскиваем полный год отсюда
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1; //месяцы начинаются с нуля, поэтому +1 в конце
    dayValue.value = new Date(Date.parse(time)).getDate();

    expensesBtn.disabled = false;
    optionalExpensesBtn.disabled = false;
    countBtn.disabled = false;
});

expensesBtn.addEventListener('click', () => {// запускается функция при клике на кнопку
    let sum = 0; // сумма всех наших ценников
    for (let i = 0; i < expensesItem.length; i++) { // Запускается цикл, который присваиваетпеременной а - наименование (количество элементов в псевдомассиве)
        let a = expensesItem[i].value, // всё начинается с нулевого элемента
            b = expensesItem[++i].value; // префиксная форма позволяет взять следующий элемент

        if ((typeof (a)) != null && (typeof (b)) != null && a != '' && b != '' && a.length < 50) {
            appData.expenses[a] = b;
            sum += +b; // к сумме все время прибавляем всё время b в виде числа
        } else {
            i = i - 1;
        }
        expensesValue.textContent = sum;
    }
});

optionalExpensesBtn.addEventListener('click', () => {
    for (let i = 0; i < optionalExpensesItem.length; i++) { // подстраивается под количество инпутов
		let opt = optionalExpensesItem[i].value; // вытаскиваем значение из каждого инпута и помещаем в глобальный объект аппдата
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' '; // записываем справа все полученные данные (каждый сследдующий элемент + объект через пробел)
	}
});

countBtn.addEventListener('click', () => { // расчёт дневного бюджета 
    if (appData.budget != undefined) { //изначально оно undefined, и оно заработает, когда мы ему дадим значение**
        appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed(); // бюджет на день и округляем его
        dayBudgetValue.textContent = appData.moneyPerDay; // записываем его справа
        if (appData.moneyPerDay < 100) {
            levelValue.textContent = 'Минимальный уровень достатка'; // записываем в блок levelValue
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = 'Средний уровень достатка';
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = 'Высокий уровень достатка';
        } else {
            levelValue.textContent = 'Произошла ошибка';
        }
    } else {
        dayBudgetValue.textContent = 'Произошла ошибка';
    }
});

incomeItem.addEventListener('input', () => {  // подсчёт возможных доходов, через запятую
    let items = incomeItem.value; 
    console.log(1);
    if (isNaN(items) || items != '') {
        appData.income = items.split(',');
        incomeValue.textContent = appData.income;
    } 
});

checkSavings.addEventListener("click", () => {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sumValue.addEventListener('input', () => {
    if (appData.savings == true) {
        let sum = +sumValue.value;
        let percent = +percentValue.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener('input', () => {
    if (appData.savings == true) {
        let sum = +sumValue.value;
        let percent = +percentValue.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

const appData = {
	budget: money,
	expenses: {},
	optionalExpenses: {},
    income: [],
	timeData: time,
    savings: false
};

