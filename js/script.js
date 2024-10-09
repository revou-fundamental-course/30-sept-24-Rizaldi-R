// todo basic convertion ->
// > listen for button klik dan gabungkan dg input value 
// > user klik convert lalu kita baca value nya jika ada 
// > berdasarkan value kita hitung dg rumus dlm function
// > ambil div untuk menampilkan hasil lalu edit kontennya

// todo penukaran celcius dg farenheit dan reset button ->
// > listen tombol tukar
// > check input label character pertama untuk ngecek jenis suhu
// > ketika diklik label input dan label result diganti
// > di fungsi calculation dan showResult ditambah param dan if statment
// > change result everytime tukar get pressed
// > put empty string pada input setiap tombol reset ditekan

// todo validasi ->
// > display invalid di html dg manipulasi styling

// todo temp tipe lain ->
// > listen to select element input and simpan tipe temp nya
// > listen to select element result and simpan tipe temp nya
// > calculation return array that can be used for to show cara kalkulasi
// > dropdown yg result mengclean hasilnya

// todo tombol reset ->
// reset hasilnya juga

// todo perbaiki tombol tukar -> 
// 

// bug ->
// > button submit reload sendiri -> button inside form akan otomatis reload sendiri
// > Add type="button" to the button, the default value of type for a button is submit

let inputElem = document.querySelector("#input-temperature");
let submitButton = document.querySelector(".form-btn-submit");
let shortResultDiv = document.querySelector(".result-short div");
let calcResultDiv = document.querySelector(".result-calc div");

let tukarButton = document.querySelector(".form-btn-tukar");
let resetButton = document.querySelector(".form-btn-reset");
let inputLabel = document.querySelector(".from-convert label");
let resultLabel = document.querySelector(".result-short p");

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

// tukarButton.addEventListener("click", function () {
//     temperTypeInput = resultLabel.textContent.charAt(0);
//     labelSwitcher(temperTypeInput);
    
//     console.log(temperTypeInput)
//     submitValidAndShow();
// })

resetButton.addEventListener("click", function() {
    inputElem.value = ""
    shortResultDiv.innerHTML = "Hasil akan ditampilkan setelah tombol konversi ditekan"
    calcResultDiv.innerHTML = "Cara kalkulasi akan ditampilkan setelah tombol konversi ditekan"
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

let calculation = (inputVal, temTypeIn, temTypeR) => {
    const resultObj = {
        shortRes: 0,
        longRes: ""
    };

    let shortR = 0;
    let longR = "";
    let inpValFlt = parseFloat(inputVal);

    if (temTypeIn == "C" && temTypeIn !== temTypeR){ 
        if (temTypeR == "F") {
            shortR = inpValFlt * (9/5) + 32;
            longR = `${inpValFlt}&deg;${temTypeIn} * (9 / 5) + 32 = ${shortR}&deg;${temTypeR}`
        } else if (temTypeR == "K") {
            shortR = inpValFlt + 273.15;
            longR = `${inpValFlt}&deg;${temTypeIn} + 273.15 = ${shortR}&deg;${temTypeR}`
        } else {
            shortR = (inpValFlt * (9/5)) + 491.67;
            longR = `${inpValFlt}&deg;${temTypeIn} * (9/5)) + 491.67 = ${shortR}&deg;${temTypeR}`
        }
    } else if (temTypeIn == "F" && temTypeIn !== temTypeR) {
        if (temTypeR == "C") {
            shortR = (inpValFlt - 32) * (5/9);
            longR = `(${inpValFlt}&deg;${temTypeIn} - 32) * (5/9) = ${shortR}&deg;${temTypeR}`
        } else if (temTypeR == "K") {
            shortR = (inpValFlt + 459.67) * (5/9);
            longR = `(${inpValFlt}&deg;${temTypeIn} + 459.67) * (5/9) = ${shortR}&deg;${temTypeR}`
        } else {
            shortR = inpValFlt + 459.67;
            longR = `(${inpValFlt}&deg;${temTypeIn} + 459.67 = ${shortR}&deg;${temTypeR}`
        }
    } else if (temTypeIn == "K" && temTypeIn !== temTypeR) { 
        if (temTypeR == "C") {
            shortR = inpValFlt - 273.15;
            longR = `${inpValFlt}&deg;${temTypeIn} - 273.15 = ${shortR}&deg;${temTypeR}`
        } else if (temTypeR == "F") {
            shortR = (inpValFlt * (9/5)) - 459.67;
            longR = `(${inpValFlt}&deg;${temTypeIn} * (9/5)) - 459.67 = ${shortR}&deg;${temTypeR}`
        } else {
            shortR = inpValFlt * (9/5);
            longR = `${inpValFlt}&deg;${temTypeIn} * (9/5) = ${shortR}&deg;${temTypeR}`
        }
    } else if (temTypeIn == "R" && temTypeIn !== temTypeR) {
        if (temTypeR == "C") {
            shortR = (inpValFlt - 491.67) * (5/9);
            longR = `(${inpValFlt}&deg;${temTypeIn} - 491.67) * (5/9) = ${shortR}&deg;${temTypeR}`
        } else if (temTypeR == "F") {
            shortR = inpValFlt - 459.67;
            longR = `${inpValFlt}&deg;${temTypeIn} - 459.67 = ${shortR}&deg;${temTypeR}`
        } else {
            shortR = inpValFlt * (5/9);
            longR = `${inpValFlt}&deg;${temTypeIn} * (5/9) = ${shortR}&deg;${temTypeR}`
        }
    } else {
        resultObj.shortRes = inpValFlt;
        resultObj.longRes = `${inpValFlt}&deg;${temTypeIn} = ${inpValFlt}&deg;${temTypeR}`;
        return resultObj;
    }

    resultObj.shortRes = Math.round(shortR * 10000) / 10000;
    resultObj.longRes = longR

    return resultObj;
}

let showResult = (shorResult, longResult, temTypeR) => {
    shortResultDiv.innerHTML = `${shorResult}&deg;${temTypeR}`;
    calcResultDiv.innerHTML = longResult
}

let labelSwitcher = (temType) => {
    if (temType == "C"){
        inputLabel.innerHTML = "Celcius (&deg;C) :"
        resultLabel.innerHTML = "Fahrenheit (&deg;F) :"
    } else {
        inputLabel.innerHTML = "Fahrenheit (&deg;F) :"
        resultLabel.innerHTML = "Celcius (&deg;C) :"
    }
}