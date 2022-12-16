'use strict';

let addSheetBtn = document.querySelector(".add-sheet-button");
let sheetContainer = document.querySelector(".sheets-container");
addSheetBtn.addEventListener("click", createNewSheet);

document.querySelector(".sheet").addEventListener("click" , handleActiveSheet);

function createNewSheet(e){
    let allSheets = document.querySelectorAll(".sheet");
    let sheetIdx = allSheets[allSheets.length - 1].getAttribute("sheetIdx");
    sheetIdx = parseInt(sheetIdx);
    // console.log(sheetIdx);
    // create a sheet
    let sheet = document.createElement("div");
    sheet.classList.add("sheet");
    sheet.setAttribute("sheetIdx", sheetIdx+1);
    sheet.innerText = `sheet ${sheetIdx+2}`;
    sheetContainer.appendChild(sheet);
    sheet.addEventListener("click", handleActiveSheet);
}

function handleActiveSheet(e){
    let allSheets = document.querySelectorAll(".sheet");
    console.log(e.currentTarget);
    for(let i=0 ; i < allSheets.length ; i++){
        console.log(allSheets[i]);
        allSheets[i].classList.remove("active-sheet");
    }
    e.currentTarget.classList.add("active-sheet");

}