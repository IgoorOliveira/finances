const transactions = []

async function fetchTransaction() {
    return await fetch("http://127.0.0.1:5000/transactions").then(result => result.json())
}

function createCardboard() {
    const cardboard = document.createElement("div");
    cardboard.classList.add("cardboard");
    return cardboard
}

function createTitle(titleTransaction) {
    const title = document.createElement("h3");
    title.innerText = titleTransaction;
    title.classList.add("cardboard-title");
    return title
}

function createValue(valueTransaaction) {
    const value = document.createElement("p");
    value.innerText = `R$${valueTransaaction}`;
    value.classList.add("cardboard-value");
    return value;
}

function renderCardboard(transactions) {
    const cardboard = createCardboard();
    const title = createTitle(transactions[3]);
    const value = createValue(transactions[1]);
    cardboard.append(title, value);
    document.querySelector(".box-bottom").appendChild(cardboard);
}
async function updateTransactions(){
    let result = await fetchTransaction();
    transactions.push(...result);
    transactions.forEach(renderCardboard);
}
document.addEventListener("DOMContentLoaded", updateTransactions);