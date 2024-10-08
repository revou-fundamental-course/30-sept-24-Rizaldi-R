// alogarithm basic convertion ->
// > listen for button klik dan gabungkan dg input value 
// > user klik convert lalu kita baca value nya jika ada 
// > berdasarkan value kita hitung dg rumus dlm function
// > ambil div untuk menampilkan hasil lalu edit kontennya

// alogarithm calculation details ->
//  display none and show (manipulasi css)

// alogarithm penukaran celcius dg farenheit ->
// 

// bug ->
// button submit tiba2 scroll kebwh ketika diklik

let inputElem = document.querySelector("#input-temperature");
let submitButton = document.querySelector(".form-btn-submit");
let shortResultDiv = document.querySelector(".result-short div");
let calcResultDiv = document.querySelector(".result-calc div");

submitButton.addEventListener('click', function () {
    if (inputElem.value) {
        let userValue = inputElem.value
        let result = calculation(userValue)
        showResult(userValue, result)
    } else {
        // TODO VALIDASI HARUS DIISI
        console.log("required to be filled");
    }
})

let calculation = (inputVal) => {
    result = inputVal * (9 / 5) + 32;
    return result;
}

let showResult = (UserVal, resultVal) => {
    shortResultDiv.innerHTML = ` ${resultVal}&deg;F`;
    calcResultDiv.innerHTML = ` ${UserVal}&deg;C * (9 / 5) + 32 = ${resultVal}&deg;F`;
}
