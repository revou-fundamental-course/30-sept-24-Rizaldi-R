const formElem = document.querySelector("#input-sect-form")
const inputElem = document.querySelector("#input-sect-number");
const shortResultDiv = document.querySelector("#result-sect-output-short");
const longResultDiv = document.querySelector("#result-sect-output-long");

const submitButton = document.querySelector("#input-sect-btn-submit");
const resetButton = document.querySelector("#input-sect-btn-reset");
const tukarButton = document.querySelector("#input-sect-btn-tukar");

const dropdwnInput = document.querySelector("#input-sect-drop-from");
const dropdwnResult = document.querySelector("#input-sect-drop-to");

const validationText = document.querySelector("#input-sect-valid");

const navbar = document.querySelector("nav");
const circleScrollBar = document.querySelector("#nav-circle");

let temperTypeInput = "C";
let temperTypeResult = "F";

// ------------------------------- EVENT LISTENER -------------------------------

dropdwnInput.addEventListener("change", function () {
    temperTypeInput = dropdwnInput.value;
    formValidAndShow();
})

dropdwnResult.addEventListener("change", function () {
    temperTypeResult = dropdwnResult.value;
    formValidAndShow();
})

formElem.addEventListener("submit", function (e) {
    e.preventDefault();
    formValidAndShow();
})

submitButton.addEventListener("click", function () {
    formValidAndShow();
})

resetButton.addEventListener("click", function() {
    inputElem.value = "";
    validationText.style.display = "none";
    showResult(true);
})

tukarButton.addEventListener("click", function () {
    dropdwnSwitcher();
    formValidAndShow();
})

window.addEventListener("scroll", function() {
    scrollIndicator()
})

// ------------------------------- FUNCTION -------------------------------

// FOR VALIDATION AND SHOW THE RESULT
const formValidAndShow = () => {
    if (inputElem.value) {
        const userValue = inputElem.value;
        const result = calculation(userValue, temperTypeInput, temperTypeResult);
        const shortResult = result.shortRes
        const longResult = result.longRes

        showResult(false, shortResult, longResult, temperTypeResult);
        validationText.style.display = "none";
    } else {
        validationText.style.display = "block";
    }
}

// FOR TEMPERATURE CALCULATION; RETURN INT FOR ANSWER AND STRING FOR CALCULATION DETAIL
const calculation = (inputVal, temTypeIn, temTypeOut) => {
    const resultObj = {
        shortRes: 0,
        longRes: ""
    };

    let shortR = 0;
    let longR = "";
    let inpValFlt = parseFloat(inputVal);

    if (temTypeIn == "C" && temTypeIn !== temTypeOut){ 
        if (temTypeOut == "F") {
            shortR = inpValFlt * (9/5) + 32;
            longR = `${inpValFlt}&deg;${temTypeIn} * (9 / 5) + 32 = ${shortR}&deg;${temTypeOut}`
        } else if (temTypeOut == "K") {
            shortR = inpValFlt + 273.15;
            longR = `${inpValFlt}&deg;${temTypeIn} + 273.15 = ${shortR}&deg;${temTypeOut}`
        } else {
            shortR = (inpValFlt * (9/5)) + 491.67;
            longR = `${inpValFlt}&deg;${temTypeIn} * (9/5)) + 491.67 = ${shortR}&deg;${temTypeOut}`
        }
    } else if (temTypeIn == "F" && temTypeIn !== temTypeOut) {
        if (temTypeOut == "C") {
            shortR = (inpValFlt - 32) * (5/9);
            longR = `(${inpValFlt}&deg;${temTypeIn} - 32) * (5/9) = ${shortR}&deg;${temTypeOut}`
        } else if (temTypeOut == "K") {
            shortR = (inpValFlt + 459.67) * (5/9);
            longR = `(${inpValFlt}&deg;${temTypeIn} + 459.67) * (5/9) = ${shortR}&deg;${temTypeOut}`
        } else {
            shortR = inpValFlt + 459.67;
            longR = `${inpValFlt}&deg;${temTypeIn} + 459.67 = ${shortR}&deg;${temTypeOut}`
        }
    } else if (temTypeIn == "K" && temTypeIn !== temTypeOut) { 
        if (temTypeOut == "C") {
            shortR = inpValFlt - 273.15;
            longR = `${inpValFlt}&deg;${temTypeIn} - 273.15 = ${shortR}&deg;${temTypeOut}`
        } else if (temTypeOut == "F") {
            shortR = (inpValFlt * (9/5)) - 459.67;
            longR = `(${inpValFlt}&deg;${temTypeIn} * (9/5)) - 459.67 = ${shortR}&deg;${temTypeOut}`
        } else {
            shortR = inpValFlt * (9/5);
            longR = `${inpValFlt}&deg;${temTypeIn} * (9/5) = ${shortR}&deg;${temTypeOut}`
        }
    } else if (temTypeIn == "R" && temTypeIn !== temTypeOut) {
        if (temTypeOut == "C") {
            shortR = (inpValFlt - 491.67) * (5/9);
            longR = `(${inpValFlt}&deg;${temTypeIn} - 491.67) * (5/9) = ${shortR}&deg;${temTypeOut}`
        } else if (temTypeOut == "F") {
            shortR = inpValFlt - 459.67;
            longR = `${inpValFlt}&deg;${temTypeIn} - 459.67 = ${shortR}&deg;${temTypeOut}`
        } else {
            shortR = inpValFlt * (5/9);
            longR = `${inpValFlt}&deg;${temTypeIn} * (5/9) = ${shortR}&deg;${temTypeOut}`
        }
    } else {
        resultObj.shortRes = inpValFlt;
        resultObj.longRes = `${inpValFlt}&deg;${temTypeIn} = ${inpValFlt}&deg;${temTypeOut}`;
        return resultObj;
    }

    resultObj.shortRes = Math.round(shortR * 10000) / 10000;
    resultObj.longRes = longR;

    return resultObj;
}

// FOR SHOWING THE RESULT BASED ON CALCULATION; COULD USE THIS TO RESET THE RESULT
const showResult = (isResetResult = false, shortResult, longResult, temTypeOut) => {
    if (!isResetResult) {
        shortResultDiv.innerHTML = `${shortResult}&deg;${temTypeOut}`;
        longResultDiv.innerHTML = longResult;
    } else {
        shortResultDiv.innerHTML = "Klik tombol konversi / tekan enter";
        longResultDiv.innerHTML = "";
    }
}

// FOR SWITCHING TEMPERATURE TYPE BETWEEN THE INPUT AND OUTPUT DROP DOWN
const dropdwnSwitcher = () => {
    const dropInputValTemp = dropdwnInput.value;

    dropdwnInput.value = dropdwnResult.value;
    dropdwnResult.value = dropInputValTemp;

    temperTypeInput = dropdwnInput.value;
    temperTypeResult = dropdwnResult.value;
}

// FOR SCROLL INDICATOR ON THE NAVBAR
const scrollIndicator = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    const navHeightLeft = navbar.offsetHeight - circleScrollBar.offsetHeight;
    const navHLPercent = (navHeightLeft/navbar.offsetHeight) * 100;

    const navHBasedScrolled = (navHLPercent / 100) * scrolled;

    circleScrollBar.style.top = navHBasedScrolled + "%";
}