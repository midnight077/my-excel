let str = "";
// top - row => A to Z
let topRow = document.querySelector(".top-row");
for (let i = 0; i < 26; i++) {
    str += `<div class="top-row-ele">${String.fromCharCode(65 + i)}</div>`
}
topRow.innerHTML = str;

// left col => 1 to 100
str = "";

for (let i = 0; i < 100; i++) {
    str += `<div class="left-col-ele"> ${i + 1}</div>`;
}
document.querySelector(".left-col").innerHTML = str;

// main grid
str = "";
for (let i = 0; i < 100; i++) {
    str += `<div class="row-grid">`;
    for (let j = 0; j < 26; j++) {
        str += `<div class="grid-ele">${String.fromCharCode(65 + j)}${i + 1} </div>`
    }
    str += "</div>";
}
document.querySelector(".grid").innerHTML = str;