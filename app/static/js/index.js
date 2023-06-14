buttonsRegister = document.querySelectorAll(".button-register");
popupWrapper = document.querySelector(".popup-wrapper");
popupLogin = document.getElementById("popup-login");
popupRegister = document.getElementById("popup-register");
buttonTurnRegister = document.querySelector(".button-turn-register");

buttonsClose = document.querySelectorAll(".button-close");
inputEmail = document.getElementById("input-email");
inputPassword = document.getElementById("input-password");
buttonSubmitLogin = document.getElementById("button-submit-login");

document.getElementById("button-login").addEventListener("click", () =>{
    popupWrapper.classList.add("active");
    popupLogin.classList.add("active-popup");
}) 
for(const buttonClose of buttonsClose) {
    buttonClose.addEventListener("click", ()=>{
        popupWrapper.classList.remove("active");
        idPopup = buttonClose.getAttribute("data-attribute");
        document.getElementById(idPopup).classList.remove("active-popup");
        resetStyle();
        inputEmail.value = "";
        inputPassword.value = "";
    })
}

for(const buttonRegister of buttonsRegister) {
    buttonRegister.addEventListener("click", () =>{
        popupWrapper.classList.add("active");
        popupRegister.classList.add("active-popup");

    })
}
buttonTurnRegister.addEventListener("click", () => {turnStep(1, 2)});
buttonSubmitLogin.addEventListener("click", (ev) =>{
    resetStyle();
    try {
        if(!validateEmail(inputEmail.value)) {
            ev.preventDefault();
            error = new Error("Campo email inválido*");
            error.input = "email";
            throw error;
        }
        updateStyleInput("email", "sucess");
        if(!validatePassword(inputPassword.value)) {
            ev.preventDefault();
            error = new Error("Campo senha inválido*");
            error.input = "password";
            throw error;
        }
        updateStyleInput("password", "sucess");
    }
    catch(error) {
        console.log(error)
        elementError = document.querySelector(`.${error.input}-error`);
        elementError.innerText = error.message;
        elementError.classList.add("error");
        updateStyleInput(error.input, "error");
    }
})

setTimeout(()=>{
    if(document.querySelector(".alert")) {
        document.querySelector(".alert").style.animation = "exit-alert 2s";
        setTimeout(() =>{document.querySelector(".alert").style.display = "none"}, 1500);
    }

}, 5000)
function validateEmail(email) {
    return email.match(/^[\w\.]{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/g);
}

function validatePassword(password) {
    return password.match(/^(?=.*[A-Z])(?=.*\d).{8,}$/);
}

function updateStyleInput(element, result) {
    color = result == "error"? "red": "green";
    document.getElementById(`input-${element}`).style.border = `1px solid ${color}`;
}

function resetStyle() {
    const elements = ["email", "password"];
    elements.forEach((element)=>{
        document.getElementById(`input-${element}`).style.border = "1px solid black";
        const span = document.querySelector(`.${element}-error`);
        span.classList.remove("error");
        span.innerText = "";
    });
}

function turnStep(currentStep, nextStep) {
    document.querySelector(".step" + currentStep).classList.remove("active-popup");
    document.querySelector(".step" + nextStep).classList.add("active-popup");
}

