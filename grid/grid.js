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
        str += `<div class="grid-ele" rid=${i} cid=${j} contentEditable="true" spellcheck="false"> </div>`
    }
    str += "</div>";
}
document.querySelector(".grid").innerHTML = str;

let arr3 = [];
function initNewSheet(arr3) {
    let arr = [];
    let arr2 = [];
    for (let j = 0; j < 26; j++) {
        let obj = {
            fontFamily: "Times New Roman",
            fontWeight: "normal",
            fontStyle: "normal",
            textDecoration: "none",
            fontSize: "16px",
            bgColor: "#FFFFFF",
            textColor: "#000000",
            textAlignment: "left",
            text: ""
        };
        arr.push(obj);
    }
    for (let i = 0; i < 100; i++) {
        arr2.push(arr);
    }
    arr3.push(arr2);
}

initNewSheet(arr3);
console.log(arr3);