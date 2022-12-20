'use strict';

let addSheetBtn = document.querySelector(".add-sheet-button");
let sheetContainer = document.querySelector(".sheets-container");
let allGridCells = document.querySelectorAll(".grid-ele");
let cellIdentify = document.querySelector(".cell-identify");
let fontFamilyBtn = document.querySelector(".font-family-container");
let BUIContainer = document.querySelectorAll(".BUI-container>*");
let fontSizeCont = document.querySelector(".font-size-container");
// *********************************************************************************

addSheetBtn.addEventListener("click", createNewSheet);

for(let i = 0 ; i< allGridCells.length ; i++){
    allGridCells[i].addEventListener("click" , selectACell);
}
document.querySelector(".sheet").addEventListener("click" , handleActiveSheet);

fontFamilyBtn.addEventListener("change", changeFontFamily);
for(let i =0 ; i<BUIContainer.length ; i++){
    BUIContainer[i].addEventListener("click", buiStyling);
}
fontSizeCont.addEventListener("change", changeFontSize);


// handling multiple sheets ************************************************
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

// getting cell in formula bar *****************************************************
//setting initial value of formula bar

allGridCells[0].click();
function selectACell(e){
    // console.log(e.target);
    // applying cellname to formula bar
    let cellNode = e.target;
    let rID = Number(cellNode.getAttribute("rid"));
    let cID = Number(cellNode.getAttribute("cid"));
    console.log(rID,cID);
    cellIdentify.value = String.fromCharCode(65+cID) + (rID+1);

    // set font styling in menu bar
    setMenuDefaults(rID,cID);
}




//  styling bar ***********************************************************************

function changeFontFamily(e){

    // get cell id on which change has to be applies
    let {rowAd , colAd } = getRowColId(cellIdentify.value);
    // let cell = document.querySelector(`.grid-ele[rid="${rowAd}"][cid="${colAd}"]`);
    let cell = allGridCells[rowAd*26 + colAd ];
    cell.style.fontFamily = e.target.value;
    // setting in array
    arr2[rowAd][colAd].fontFamily = e.target.value;
}

function buiStyling(e){
    let {rowAd , colAd } = getRowColId(cellIdentify.value);
    let cell = allGridCells[rowAd*26 + colAd ];
    let selectedTag = e.currentTarget.value;
    if(selectedTag == "B"){
        if(cell.style.fontWeight == "bold"){
            arr2[rowAd][colAd].fontWeight = cell.style.fontWeight = "normal";
        }
        else{
            arr2[rowAd][colAd].fontWeight = cell.style.fontWeight = "bold" ;
        }
    }
    else if(selectedTag == "I"){
        if(cell.style.fontStyle  == "italic"){
            arr2[rowAd][colAd].fontStyle =cell.style.fontStyle  = "normal";
        }
        else{
            arr2[rowAd][colAd].fontStyle = cell.style.fontStyle  = "italic" ;
        }
    }
    else if(selectedTag == "U"){
        if(cell.style.textDecoration   == "underline"){
            arr2[rowAd][colAd].textDecoration = cell.style.textDecoration   = "none";
        }
        else{
            arr2[rowAd][colAd].textDecoration = cell.style.textDecoration   = "underline" ;
        }
        
    }
}

function changeFontSize(e){
    console.log(typeof(e.target.value));
    let {rowAd , colAd } = getRowColId(cellIdentify.value);
    let cell = allGridCells[rowAd*26 + colAd ];
    cell.style.fontSize = e.target.value+"px";
    arr2[rowAd][colAd].fontSize = e.target.value +"px";
    console.log(arr2[rowAd][colAd]);    
}

function getRowColId(cellAd){
    let colAd = cellAd[0];
    let rowAd = cellAd.slice(1);
    // console.log(colAd, rowAd)
    colAd =parseInt(colAd,36)-9 -1;
    rowAd = rowAd-1;
    return {rowAd , colAd};
}

function setMenuDefaults(rID , cID){
    fontFamilyBtn.value = arr2[rID][cID].fontFamily;

    console.log(arr2[rID][cID].fontSize);
    fontSizeCont.value = arr2[rID][cID].fontSize.split("px")[0];
}