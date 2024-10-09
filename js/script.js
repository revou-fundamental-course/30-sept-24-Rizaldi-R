let inputElem = document.querySelector("#input-temperature");
let submitButton = document.querySelector(".form-btn-submit");
let shortResultDiv = document.querySelector(".result-short div");
let longResultDiv = document.querySelector(".result-calc div");

let tukarButton = document.querySelector(".form-btn-tukar");
let resetButton = document.querySelector(".form-btn-reset");

let validationText = document.querySelector(".validation");

let dropdwnInput = document.querySelector("#temper-input");
let dropdwnResult = document.querySelector("#temper-result");

let temperTypeInput = "C";
let temperTypeResult = "F";

// -------- event listener --------

dropdwnInput.addEventListener('change', function () {
    temperTypeInput = dropdwnInput.value;
    submitValidAndShow();
})

dropdwnResult.addEventListener('change', function () {
    temperTypeResult = dropdwnResult.value;
    submitValidAndShow();
})

submitButton.addEventListener('click', function () {
    submitValidAndShow();
})

resetButton.addEventListener("click", function() {
    inputElem.value = ""
    shortResultDiv.innerHTML = "Hasil akan ditampilkan setelah tombol konversi ditekan"
    longResultDiv.innerHTML = "Cara kalkulasi akan ditampilkan setelah tombol konversi ditekan"
})

tukarButton.addEventListener("click", function () {
    dropdwnSwitcher();
    submitValidAndShow();
})

// -------- function --------

let submitValidAndShow = () => {
    if (inputElem.value) {
        let userValue = inputElem.value;
        let result = calculation(userValue, temperTypeInput, temperTypeResult);
        let shortResult = result.shortRes
        let longResult = result.longRes

        console.log(longResult)
        showResult(shortResult, longResult, temperTypeResult);
        validationText.style.display = "none";
    } else {
        validationText.style.display = "block";
    }
}

let calculation = (inputVal, temTypeIn, temTypeOut) => {
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
            longR = `(${inpValFlt}&deg;${temTypeIn} + 459.67 = ${shortR}&deg;${temTypeOut}`
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
    resultObj.longRes = longR

    return resultObj;
}

let showResult = (shorResult, longResult, temTypeOut) => {
    shortResultDiv.innerHTML = `${shorResult}&deg;${temTypeOut}`;
    longResultDiv.innerHTML = longResult
}

let dropdwnSwitcher = () => {
    let dropInputValTemp = dropdwnInput.value;

    dropdwnInput.value = dropdwnResult.value;
    dropdwnResult.value = dropInputValTemp;

    temperTypeInput = dropdwnInput.value;
    temperTypeResult = dropdwnResult.value;
}