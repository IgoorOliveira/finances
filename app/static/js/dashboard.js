let transactions = [];
let categories = []
const menuButtons = document.querySelectorAll(".menu-button");
const menuButtonWithdraw = document.getElementById("menu-button-withdraw");
const menuButtonDeposit = document.getElementById("menu-button-deposit");
const buttonSubmitTransaction = document.getElementById("button-submit-transaction");
const buttonAccount = document.getElementById("button-account");
const buttonCancel = document.querySelector(".button-cancel");
const selectCategory = document.getElementById("my-select");

async function fetchTransaction() {
    return await fetch("http://127.0.0.1:5000/transactions").then(result => result.json())
}
async function fetchCategories(idType) {
    return await fetch(`http://127.0.0.1:5000/categories/${idType}`).then(result => result.json())
}

const iconCategories ={
    "Alimentação": "feeding",
    "Saúde": "health",
    "Compras": "shopping",
    "Transporte": "transport",
    "Combustivel": "fuel",
    "Medicamentos": "medicines",
    "Serviços": "services",
    "Vendas": "sales",
    "Salário": "salary",
    "Outros": "outhers"
}

const formater = Intl.NumberFormat("pt-BR", {
    compactDisplay: "long",
    currency: "BRL",
    style: "currency"
})

function createCardboard() {
    const cardboard = document.createElement("div");
    cardboard.classList.add("cardboard");
    return cardboard;
}


function createTitle(titleTransaction) {
    const title = document.createElement("p");
    title.innerText = titleTransaction;
    title.classList.add("cardboard-title");
    return title;
}
function createIcon(nameCategory) {
    const img = document.createElement("img");
    if(nameCategory in iconCategories) {
        console.log("entrei")
        img.src = `../static/css/assets/icon-${iconCategories[nameCategory]}.svg`;
    }
    else {
        img.src = `../static/css/assets/icon-outhers.svg`;
    }
    img.classList.add("icon");
    return img;
}

function createValue(valueTransaction, idType) {
    const value = document.createElement("p");
    color = idType == 1? "green": "red"
    value.innerText = formater.format(valueTransaction);
    value.style.color = color;
    value.style.fontWeight = 800
    return value;
}
function arrayToObjectTransaction(transactions) {
    const transaction = {
        "idTransaction": transactions[0],
        "valueTransaction": transactions[1],
        "idType": transactions[2],
        "dateTransaction": transactions[3],
        "idCategory": transactions[4],
        "nameCategory": transactions[5]
    }
    return transaction
}
function arrayToObjectCategory(categories) {
    const category = {
        "idCategory": categories[0],
        "name": categories[1],
        "idType": categories[2]
    }
    return category
}

function renderCardboard(arrayTransaction) {
    const transaction = arrayToObjectTransaction(arrayTransaction)
    const cardboard = createCardboard();
    const icon = createIcon(transaction.nameCategory);
    const title = createTitle(transaction.nameCategory);
    const value = createValue(transaction.valueTransaction, transaction.idType);
    cardboard.append(icon, title, value);
    document.querySelector(".box-transactions").appendChild(cardboard);
}
function renderCategories(arrayCategory) {
    const category = arrayToObjectCategory(arrayCategory)
    const option = document.createElement("option");
    option.innerText = category.name; 
    option.value = category.idCategory;
    document.getElementById("my-select").append(option)
}
async function updateTransactions(){
    let result = await fetchTransaction();
    transactions.push(...result);
    let x = transactions.length -1
    for(x; x >= 0; x--) {
        renderCardboard(transactions[x])
    }
    updateBalance()
}
async function updateCategories(id) {
    const result = await fetchCategories(id);
    categories.push(...result)
    categories.forEach(renderCategories)
}

function updateBalance() {
    const totalBalance = document.getElementById("balance");
    const creditBalance = document.getElementById("balance-credit")
    const withdrawBalance = document.getElementById("balance-withdraw")
    console.log(withdrawBalance)
    let dashboardBalance = {
        "balance": 0,
        "credit": 0,
        "withdraw": 0
    }
    transactions.forEach(transaction =>{
        const {idType, valueTransaction} = arrayToObjectTransaction(transaction)
        console.log(idType)
        if(idType == 1) {
            dashboardBalance.balance += valueTransaction
            dashboardBalance.credit += valueTransaction
        }
        else {
            dashboardBalance.balance -= valueTransaction
            dashboardBalance.withdraw += valueTransaction
        }
    })
    totalBalance.innerText = formater.format(dashboardBalance.balance)
    creditBalance.innerText = formater.format(dashboardBalance.credit)
    withdrawBalance.innerText = formater.format(dashboardBalance.withdraw)
    

}

menuButtonDeposit.addEventListener("click", ()=>{
    document.querySelector(".menu-type").classList.remove("active");
    document.querySelector(".popup-wrapper").classList.add("active");
    updateCategories(1);
    document.getElementById("input-type").value = 1;
    
})
menuButtonWithdraw.addEventListener("click", ()=>{
    document.querySelector(".menu-type").classList.remove("active");
    document.querySelector(".popup-wrapper").classList.add("active");
    updateCategories(2);
    document.getElementById("input-type").value = 2;
})

document.getElementById("button-add-transaction").addEventListener("click", ()=>{
    document.querySelector(".menu-type").classList.add("active");
})

setTimeout(()=>{
    if(document.querySelector(".alert")) {
        document.querySelector(".alert").style.animation = "exit-alert 2s";
        setTimeout(() =>{document.querySelector(".alert").style.display = "none"}, 1500);
    }

}, 3000)

buttonCancel.addEventListener("click", ()=>{
    document.querySelector(".popup-wrapper").classList.remove("active");
    while(selectCategory.firstChild) {
        selectCategory.removeChild(selectCategory.firstChild)
        console.log("entrei")
    }
    categories = []
})


function turnStep(currentStep, nextStep) {
    document.querySelector(".step" + currentStep).classList.remove("active-popup");
    document.querySelector(".step" + nextStep).classList.add("active-popup");
}

document.addEventListener("DOMContentLoaded", updateTransactions);
