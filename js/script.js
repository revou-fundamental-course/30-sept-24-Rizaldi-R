// alogarithm basic convertion ->
// > listen for button klik dan gabungkan dg input value 
// > user klik convert lalu kita baca value nya jika ada 
// > berdasarkan value kita hitung dg rumus dlm function
// > ambil div untuk menampilkan hasil lalu edit kontennya

// alogarithm penukaran celcius dg farenheit dan reset button ->
// > listen tombol tukar
// > check input label character pertama untuk ngecek jenis suhu
// > ketika diklik label input dan label result diganti
// > di fungsi calculation dan showResult ditambah param dan if statment
// > change result everytime tukar get pressed
// > put empty string pada input setiap tombol reset ditekan

// insert new elemnt dan disend ke html
// bikin regex buat menghilangkan character e, *, etc -> tapi minus perlu

// bug ->
// > button submit tiba2 scroll kebwh ketika diklik dan reload sendiri -> button inside form akan otomatis reload sendiri
// > Add type="button" to the button, the default value of type for a button is submit
// pake enter juga mereload page

let inputElem = document.querySelector("#input-temperature");
let submitButton = document.querySelector(".form-btn-submit");
let shortResultDiv = document.querySelector(".result-short div");
let calcResultDiv = document.querySelector(".result-calc div");

let tukarButton = document.querySelector(".form-btn-tukar");
let resetButton = document.querySelector(".form-btn-reset");
let inputLabel = document.querySelector(".from-convert label");
let resultLabel = document.querySelector(".result-short p");
// let calcDetailDiv = document.querySelector("");

let temperType = "C";

// -------- event listener --------

submitButton.addEventListener('click', function () {
    if (inputElem.value) {
        let userValue = inputElem.value;
        let result = calculation(userValue, temperType);

        showResult(userValue, result, temperType);
    } else {
        // TODO VALIDASI HARUS DIISI
        console.log("required to be filled");
    }
})

tukarButton.addEventListener("click", function () {
    temperType = resultLabel.textContent.charAt(0);
    labelSwitcher(temperType);
    
    // TODO DIKASI VALIDASI
    console.log(temperType)
    let userValue = inputElem.value;
    let result = calculation(userValue, temperType);
    
    showResult(userValue, result, temperType);
})

resetButton.addEventListener("click", function() {
    inputElem.value = ""
})

// -------- function --------
let calculation = (inputVal, temType) => {
    if (temType == "C"){ 
        result = inputVal * (9 / 5) + 32;
    } else {
        result = (inputVal - 32) * (5/9);
    }
    
    // console.log(Math.round(result * 1000) / 1000);
    return Math.round(result * 10000) / 10000;
}

let showResult = (UserVal, resultVal, temType) => {
    if (temType == "C"){ 
        shortResultDiv.innerHTML = `${resultVal}&deg;F`;
        calcResultDiv.innerHTML = `${UserVal}&deg;C * (9 / 5) + 32 = ${resultVal}&deg;F`;
    } else {
        shortResultDiv.innerHTML = `${resultVal}&deg;C`;
        calcResultDiv.innerHTML = `${UserVal}&deg;F - 32) * (5/9) = ${resultVal}&deg;C`;
    }

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