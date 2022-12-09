const balance = document.getElementById("balance");
const inflow = document.getElementById("income");
const outflow = document.getElementById("income");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");


// get transaction from local storage
const localStorageTransactions = JSON.parse(
    localStorage.getItem("transactions")
);
let transactions = 
localStorage.getItem("transactions") !== null ?
localStorageTransactions  : [];

// Add transactions
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === "" || amount.value.trim() === "")
    {
        document.getElementById("error_msg").innerHTML = 
        "<span>Error :please enter description and amount!</span>";
        setTimeout(() => (document.getElementById("error_msg").innerHTML = ""),5000);
    }else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,
        };
        transactions.push(transaction);

        addTransactionDOM(transaction);

        updatevalues();

        updateLocalStorage();

        text.value = "";
        amount.value = "";
    }
}

// Generate random id

function generateID() {
    return Math.floor(Math.random() * 100000000);

}

// transaction history
function addTransactionDOM(transaction) {
    // get sign
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    // add class based on value 
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");

    item.innerHTML =`
    ${transaction.text} ${sign}${Math.abs(transaction.amount)}
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;

    list.appendChild(item);
}

//  update the balance inflow and outflow
function updatevalues() {
    const amounts = transactions.map((transaction) => transaction.amount);
    const total = amounts.reduce((bal,value) => (bal += value), 0).toFixed(2);

    const income = amounts
    .filter((value) => value > 0)
    .reduce((bal,value) => (bal += value),0)
    .toFixed(2);

    const expense = amounts
    .filter((value) => value < 0)
    .reduce((bal,value) => (bal += value),0) * -(1).
    toFixed(2);
     
    balance.innerText = `$${total}`;
    inflow.innerText = `$${income}`;
    outflow.innerText = `$${expense}`;

}
// remove transaction by id
function removeTransaction(id) {
    transactions = transactions.filter((transaction) => transaction.id !== id);
    start();
}
// update localstorage  transactions
function updateLocalStorage() {
    localStorage.setItem("transactions",JSON.stringify(transactions));
}
// start app
function start() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updatevalues();
}

start();

form.addEventListener("submit", addTransaction);