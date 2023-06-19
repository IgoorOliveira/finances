const transactions = [];
const categories = []
const menuButtons = document.querySelectorAll(".menu-button");
const menuButtonWithdraw = document.getElementById("menu-button-withdraw");
const menuButtonDeposit = document.getElementById("menu-button-deposit");

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
    value.innerText = `R$${valueTransaction}`;
    value.style.color = color;
    value.style.fontWeight = 800
    return value;
}

function renderCardboard(transactions) {
    const cardboard = createCardboard();
    const icon = createIcon(transactions[4]);
    const title = createTitle(transactions[4]);
    const value = createValue(transactions[1], transactions[2]);
    cardboard.append(icon, title, value);
    document.querySelector(".box-bottom").appendChild(cardboard);
}
function renderCategories(category) {
    const option = document.createElement("option");
    option.innerText = category[0]; 
    document.getElementById("my-select").append(option)
}
async function updateTransactions(){
    let result = await fetchTransaction();
    transactions.push(...result);
    transactions.forEach(renderCardboard);
}
async function updateCategories(id) {
    const result = await fetchCategories(id);
    categories.push(...result)
    categories.forEach(renderCategories)
    console.log(result)
}

menuButtonDeposit.addEventListener("click", ()=>{
    document.querySelector(".menu-type").classList.remove("active");
    document.querySelector(".popup-wrapper").classList.add("active");
    updateCategories(1);
    
})
menuButtonWithdraw.addEventListener("click", ()=>{
    document.querySelector(".menu-type").classList.remove("active");
    document.querySelector(".popup-wrapper").classList.add("active");
    updateCategories(2);
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

document.addEventListener("DOMContentLoaded", updateTransactions);