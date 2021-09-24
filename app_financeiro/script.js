// Pegar componentes por ID
const transactionUl = document.querySelector('#transactions');
const moneyPlusDisplay = document.querySelector('#money-plus');
const moneyMinusDisplay = document.querySelector('#money-minus');
const balanceDisplay = document.querySelector('#balance');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount');



//Declaracao de um objeto literal
const dummyTransactions = [
    {id: 1, name: 'Bolo de brigadeiro', amount: -20},
    {id: 2, name: 'Salario', amount: 30},
    {id: 3, name: 'Torta de limao', amount: -20},
    {id: 4, name: 'Violao', amount: 150}
]

const addTransactionIntoDom = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+';
    const amountWithoutOperator = Math.abs(transaction.amount);
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus';
    const li = document.createElement('li');
    li.classList.add(CSSClass);
    li.innerHTML = `
        ${transaction.name} <span> ${operator} R$ ${amountWithoutOperator} </span>
         <button class= "delete-btn">x</button>`
    transactionUl.append(li);
}

/*
Metodo que ira retornar todos os valores somados de receitas e despesas 
*/

const updateBalanceValues = () => {
    
    //Pegar todos os valores do objeto dummy
    const transactionAmounts = dummyTransactions.map(transaction => transaction.amount);

    // Somatorio dos valores retomados
    const total = transactionAmounts
                .reduce((acumulator, transaction) => acumulator + transaction, 0)
                .toFixed(2);

    // Retorna todas as receitas
    const income = transactionAmounts
                    .filter(values => values > 0)
                    .reduce((acumulator, values) => acumulator + values, 0)
                    .toFixed(2);


    // Retorna todas as despesas
    const expense = transactionAmounts
                    .filter(values => values < 0)
                    .reduce((acumulator, values) => acumulator - values, 0)
                    .toFixed(2);

    balanceDisplay.textContent = `R$ ${total}`
    moneyPlusDisplay.textContent = `R$ ${income}`
    moneyMinusDisplay.textContent = `R$ ${expense}`


}

const init = () => {
    dummyTransactions.forEach(addTransactionIntoDom);
    updateBalanceValues();
}
init();



// <li class="plus">
// Salário <span>$400</span><button class="delete-btn">x</button>
// </li>