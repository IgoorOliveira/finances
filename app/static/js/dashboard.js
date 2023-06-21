let transactions = [];
let categories = []
const popupWrapper = document.querySelector(".popup-wrapper");
const menuButtons = document.querySelectorAll(".menu-button");
const menuButtonWithdraw = document.getElementById("menu-button-withdraw");
const menuButtonDeposit = document.getElementById("menu-button-deposit");
const buttonSubmitTransaction = document.getElementById("button-submit-transaction");
const buttonAccount = document.getElementById("button-account");
const buttonCancel = document.querySelector(".button-cancel");
const selectCategory = document.getElementById("my-select");
const buttonsShowTransactions = document.querySelectorAll(".button-show-transactions");
const buttonsShowHome = document.querySelectorAll(".button-show-home");
const buttonsEditTransaction = document.querySelectorAll(".button-edit-transaction")
const buttonsDeleteTransaction = document.querySelectorAll(".button-delete-transaction");
const formTransaction = document.querySelector(".form-transaction")



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
function createCardTransaction(idTransaction){
    const cardboard = document.createElement("div");
    cardboard.classList.add("cardboard-transaction");
    cardboard.id = idTransaction
    return cardboard;
}


function createDescription(descriptionTransaction) {
    const description = document.createElement("p");
    description.innerText = descriptionTransaction;
    description.classList.add("cardboard-title");
    return description;
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

function createDate(dateTransaction) {

    const date = document.createElement("p")
    date.innerText = dateTransaction.replace(/\-/g, '/')
    return date
}
function createContainerButtonTransaction() {
    const container = document.createElement("div");
    container.classList.add("container-button-transaction");
    return container
}
function createButtonEditTransaction() {
    const button = document.createElement("button");
    button.classList.add("button-edit-transaction", "button-transaction");
    button.innerText = "Editar"
    button.addEventListener("click", ()=>{
        const transaction = arrayToObjectTransaction(searchTransaction(button.parentNode.parentNode.id))
        updateCategories(transaction.idType);
        popupWrapper.classList.add("active");
        formTransaction.action = `/transactions/update/${transaction.idTransaction}`
        
        document.getElementById("input-type").value = transaction.idType;
        fillFormTransaction(searchTransaction(button.parentNode.parentNode.id));
    })
    return button
}

function createButtonDeleteTransaction() {
    const button = document.createElement("button");
    button.classList.add("button-delete-transaction");
    button.innerText = "Deletar"
    button.addEventListener("click", ()=>{
        const transaction = arrayToObjectTransaction(searchTransaction(button.parentNode.parentNode.id))
        window.location.href =`/transactions/delete/${transaction.idTransaction}`
        button.parentNode.parentNode.remove()

    })
    return button
}
function fillFormTransaction(arrayTransaction) {
    const transaction = arrayToObjectTransaction(arrayTransaction)
    document.getElementById("input-description").value = transaction.description
    document.getElementById("input-value").value = transaction.valueTransaction
    document.getElementById("input-date-transaction").value = transaction.dateTransaction
}
function searchTransaction(idTransaction) {
    for(const transaction of transactions) {
       if(arrayToObjectTransaction(transaction).idTransaction == idTransaction) return transaction
    }
}
function arrayToObjectTransaction(transactions) {
    const transaction = {
        "idTransaction": transactions[0],
        "description": transactions[1],
        "valueTransaction": transactions[2],
        "idType": transactions[3],
        "dateTransaction": transactions[4],
        "idCategory": transactions[5],
        "nameCategory": transactions[6]
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
    const description = createDescription(transaction.description);
    const value = createValue(transaction.valueTransaction, transaction.idType);
    cardboard.append(icon, description, value);
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
    showAllTransactions()
}
function showAllTransactions() {
    transactions.forEach(arrayTransaction =>{
        const transaction = arrayToObjectTransaction(arrayTransaction)
        const cardboard = createCardTransaction(transaction.idTransaction)
        const date = createDate(transaction.dateTransaction)
        const icon = createIcon(transaction.nameCategory);
        const description = createDescription(transaction.description);
        const value = createValue(transaction.valueTransaction, transaction.idType);
        const containerButtonTransaction = createContainerButtonTransaction()
        const buttonEditTransaction = createButtonEditTransaction()
        const buttonDeleteTransaction = createButtonDeleteTransaction()
        
        containerButtonTransaction.append(buttonEditTransaction, buttonDeleteTransaction)
        cardboard.append(date, icon, description, value, containerButtonTransaction)
        document.querySelector(".box-all-transactions").appendChild(cardboard)
    })
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
    let dashboardBalance = {
        "balance": 0,
        "credit": 0,
        "withdraw": 0
    }
    transactions.forEach(transaction =>{
        const {idType, valueTransaction} = arrayToObjectTransaction(transaction)
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
    console.log(formTransaction)
    formTransaction.action = "/transactions/add"
    document.querySelector(".menu-type").classList.toggle("active");
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
    }
    categories = []
})

function turnStep(currentStep, nextStep) {
    document.querySelector(".main-step" + currentStep).classList.remove("active");
    document.querySelector(".main-step" + nextStep).classList.add("active");
}

for(const buttonShowTransactions of buttonsShowTransactions) {
    buttonShowTransactions.addEventListener("click", ()=>{
        turnStep(1, 2)
    })
}
for(const buttonShowHome of buttonsShowHome) {
    buttonShowHome.addEventListener("click", ()=>{
        turnStep(2, 1)
    })
}

document.addEventListener("DOMContentLoaded", updateTransactions);
