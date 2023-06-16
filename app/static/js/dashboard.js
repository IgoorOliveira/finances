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
function createArrow(typeTransaction) {
    const img = document.createElement("img");
    img.src = `../static/css/assets/arrow-${typeTransaction}.svg`;
    img.classList.add("icon");
    return img;
}

function createValue(valueTransaction) {
    const value = document.createElement("p");
    value.innerText = `R$${valueTransaction}`;
    value.classList.add("cardboard-value");
    return value;
}

function renderCardboard(transactions) {
    const cardboard = createCardboard();
    const img = createArrow(transactions[2]);
    const title = createTitle(transactions[4]);
    const value = createValue(transactions[1]);
    cardboard.append(img, title, value);
    document.querySelector(".box-bottom").appendChild(cardboard);
}
async function updateTransactions(){
    let result = await fetchTransaction();
    transactions.push(...result);
    transactions.forEach(renderCardboard);
}
document.addEventListener("DOMContentLoaded", updateTransactions);