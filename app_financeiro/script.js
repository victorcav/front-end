// Pegar componente por ID:

const transactionsUl = document.querySelector("#transactions");

const moneyPlusDisplay = document.querySelector("#money-plus");

const moneyMinusDisplay = document.querySelector("#money-minus");

const balanceDisplay = document.querySelector("#balance");

const inputTransactionName = document.querySelector("#text");

const inputTransactionAmount = document.querySelector("#amount");

const formulario = document.querySelector("#form");

// Declaraccao de um objeto literal:

let dummyTransactions = [];

// Métodos para remover uma transacao da lista:

const removeTransaction = (ID) => {
  dummyTransactions = dummyTransactions.filter(
    (transaction) => transaction.id !== ID
  );
  console.log(dummyTransactions);
  init();
};

const addTransactionIntoDom = (transaction) => {
  const operator = transaction.amount < 0 ? "-" : "+"; // if ternario ou if linha
  const amountWithoutOperator = Math.abs(transaction.amount);
  const CSSClass = transaction.amount < 0 ? "minus" : "plus";
  const li = document.createElement("li");
  li.classList.add(CSSClass);
  li.innerHTML = `     
                    ${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span>
                    <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button> `;
  transactionsUl.append(li);
};

/* Metodo que ira retornar todo os valores somados de receitas e despesas */

const updateBalanceValues = () => {
  // Pegar todos os valores do objeto dummy
  const transactionAmounts = dummyTransactions.map(
    (transaction) => transaction.amount
  );

  // Somatorio dos valores retornados:
  const total = transactionAmounts
    .reduce((acumulator, transaction) => acumulator + transaction, 0)
    .toFixed(2);

  // Retorna todas as receitas:
  const income = transactionAmounts
    .filter((values) => values > 0)
    .reduce((acumulator, values) => acumulator + values, 0)
    .toFixed(2);

  // Retorna todas as despesas:
  const expense = transactionAmounts
    .filter((values) => values < 0)
    .reduce((acumulator, values) => acumulator - values, 0)
    .toFixed(2);

  balanceDisplay.textContent = `R$ ${total}`;
  moneyPlusDisplay.textContent = `R$ ${income}`;
  moneyMinusDisplay.textContent = `R$ ${expense}`;
};
const init = () => {
  // Inicializa todas as funções da pagina:
  transactionsUl.innerHTML = "";
  dummyTransactions.forEach(addTransactionIntoDom);
  updateBalanceValues();
  inputTransactionName.value = "";
  inputTransactionAmount.value = "";
};

init();

//  Funcao que gera ID:

const generateId = () => Math.round(Math.random() * 1000);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Adicionado os componente a uma variavel para mellhor a escrita:
  const transactionName = inputTransactionName.value.trim();
  const transactionAmount = inputTransactionAmount.value.trim();

  if (transactionName === "" && transactionAmount === "") {
    alert("Informe os campos valor e nome da transação");
    return;
  }

  // Cria um objeto para fazer a insercao no array:
  const transaction = {
    id: generateId(),
    name: transactionName,
    amount: Number(transactionAmount),
  };

  // Adiciona na lista na ultima posicao:
  dummyTransactions.push(transaction);
  init();
});
