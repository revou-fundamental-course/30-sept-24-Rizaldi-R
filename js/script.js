const formElem = document.querySelector("#input-sect-form");
const dropdwnInput = document.querySelector("#input-sect-drop-from");
const dropdwnOutput = document.querySelector("#input-sect-drop-to");
const inputElem = document.querySelector("#input-sect-number");
const shortResultDiv = document.querySelector("#result-sect-output-short");
const longResultDiv = document.querySelector("#result-sect-output-long");
const validationText = document.querySelector("#input-sect-valid");

const submitButton = document.querySelector("#input-sect-btn-submit");
const resetButton = document.querySelector("#input-sect-btn-reset");
const tukarButton = document.querySelector("#input-sect-btn-tukar");

const resultSection = document.querySelector("#result-sect")

const navbar = document.querySelector("#nav-group");
const circleScrollBar = document.querySelector("#nav-circle");
const darkThemeCheckbox = document.querySelector("#nav-toggler-dark-check");

let temperTypeInput = "C";
let temperTypeResult = "F";

// ------------------------------- EVENT LISTENER -------------------------------

// ISSUE: if user prefered theme is dark, the page flashes whenever user reload the page
addEventListener("load", () => {
    themeChecker()
});

dropdwnInput.addEventListener("change", function () {
    temperTypeInput = dropdwnInput.value;
    // dropdownOptionHider(dropdwnInput, dropdwnOutput);
    formValidator();
})

dropdwnOutput.addEventListener("change", function () {
    temperTypeResult = dropdwnOutput.value;
    // dropdownOptionHider(dropdwnOutput, dropdwnInput);
    formValidator();
})

formElem.addEventListener("submit", function (e) {
    e.preventDefault();
    formValidator();
})

submitButton.addEventListener("click", function () {
    formValidator();    
})

resetButton.addEventListener("click", function() {
    inputElem.value = "";
    showResult(true);
})

tukarButton.addEventListener("click", function () {
    dropdwnSwitcher();
    formValidator();
})

window.addEventListener("scroll", function() {
    scrollIndicator()
})

// ------------------------------- FUNCTION -------------------------------

// FOR VALIDATION AND SHOW THE RESULT
const formValidator = () => {
    if (inputElem.value) {
        const userValue = inputElem.value;
        const result = calculator(userValue, temperTypeInput, temperTypeResult);
        const shortResult = result.shortRes
        const longResult = result.longRes

        showResult(false, shortResult, longResult, temperTypeResult);
        submitIndicator()
        validationText.style.display = "none";
    } else {
        validationText.style.display = "block";
    }
}

// For temperature calculation; return int for answer and string for calculation detail
const calculator = (inputVal, temTypeIn, temTypeOut) => {
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

// For showing the result based on calculation; could use this to reset the result
const showResult = (isResetResult = false, shortResult, longResult, temTypeOut) => {
    if (!isResetResult) {
        shortResultDiv.innerHTML = `${shortResult}&deg;${temTypeOut}`;
        longResultDiv.innerHTML = longResult;
    } else {
        shortResultDiv.innerHTML = "Klik tombol konversi / tekan enter";
        longResultDiv.innerHTML = "";
        validationText.style.display = "none";
    }
}

// For switching temperature type between the input and output drop down
const dropdwnSwitcher = () => {
    const dropInputValTemp = dropdwnInput.value;

    dropdwnInput.value = dropdwnOutput.value;
    dropdwnOutput.value = dropInputValTemp;

    temperTypeInput = dropdwnInput.value;
    temperTypeResult = dropdwnOutput.value;
}

// Hide one of the dropdown option when the opposing dropdown has similiar selected option
// ISSUE: from ux perspective, this can confuse user
const dropdownOptionHider = (currentDropdwn, opposingDropdwn) => {
    const currentDropValue = currentDropdwn.selectedOptions[0].value;
    for (let i = 0; i < opposingDropdwn.childElementCount; i++) {
        opposingDropdwn.children[i].style.display = "initial";
        if (opposingDropdwn.children[i].value == currentDropValue) { 
            opposingDropdwn.children[i].style.display = "none";
        }
    }
}

// Make result section flashes after submiting form
// TODO: use promise?
const submitIndicator = () => {
    resultSection.classList.add("flasher");
    let timeout = setTimeout(() => {
        resultSection.classList.remove("flasher")
    }, 300)
}

// Check the user prefered theme then toggle the dark mode toggler
const themeChecker = () => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const isDarkMode = mql.matches;
    if (isDarkMode) { darkThemeCheckbox.checked = true; }
}

// For scroll indicator on the navbar
const scrollIndicator = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    // total height - viewport height
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    const navHeight = navbar.offsetHeight - circleScrollBar.offsetHeight;
    const navHPercent = (navHeight/navbar.offsetHeight) * 100;
    const navHBasedScrolled = (navHPercent / 100) * scrolled;
    
    circleScrollBar.style.top = navHBasedScrolled + "%";
}