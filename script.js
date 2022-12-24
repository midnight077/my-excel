'use strict';
let currsheetIdx = 0;
let arr2 = arr3[currsheetIdx];
let addSheetBtn = document.querySelector(".add-sheet-button");
let sheetContainer = document.querySelector(".sheets-container");
let allGridCells = document.querySelectorAll(".grid-ele");
let cellIdentify = document.querySelector(".cell-identify");
let formula = document.querySelector(".formula-bar");


let fontFamilyBtn = document.querySelector(".font-family-container");
let BUIContainer = document.querySelectorAll(".BUI-container>*");
let fontSizeCont = document.querySelector(".font-size-container");
let bgColor = document.querySelector(".bg-color");
let textColor = document.querySelector(".text-color");
let alignmentBtns = document.querySelectorAll(".alignment-container>*");
// *********************************************************************************

addSheetBtn.addEventListener("click",function(e){
    storeTextInDB(e);
    createNewSheet(e);
});
for (let i = 0; i < allGridCells.length; i++) {
    allGridCells[i].addEventListener("click", selectACell);
    
}
document.querySelector(".sheet").addEventListener("click", handleActiveSheet);

// menu cont event listener ---------------------------------------------
fontFamilyBtn.addEventListener("change", changeFontFamily);
for (let i = 0; i < BUIContainer.length; i++) {
    BUIContainer[i].addEventListener("click", buiStyling);
}
fontSizeCont.addEventListener("change", changeFontSize);
bgColor.addEventListener("change", changeBGColor);
textColor.addEventListener("change", changeTextColor);
for (let i = 0; i < alignmentBtns.length; i++)
    alignmentBtns[i].addEventListener("click", changeAlignment);

// formula bar event list -----------------
formula.addEventListener("keydown", formulaBarMainFn )


// ********************************************************************************
// handling multiple sheets ************************************************
function createNewSheet(e) {
    // create new sheet in UI
    let allSheets = document.querySelectorAll(".sheet");
    let sheetIdx = allSheets[allSheets.length - 1].getAttribute("sheetIdx");
    sheetIdx = parseInt(sheetIdx);
    // console.log(sheetIdx);
    // create a sheet
    let sheet = document.createElement("div");
    sheet.classList.add("sheet");

    // make new sheet active
    for (let i = 0; i < allSheets.length; i++) {
        allSheets[i].classList.remove("active-sheet");
    }
    sheet.classList.add("active-sheet");
    

    sheet.setAttribute("sheetIdx", sheetIdx + 1);
    sheet.innerText = `sheet ${sheetIdx + 2}`;
    sheetContainer.appendChild(sheet);
    sheet.addEventListener("click", handleActiveSheet);
    // create sheet in data base
    createNewSheetInDB();
}
function createNewSheetInDB(){
    initNewSheet(arr3);
    // clear data in UI
    for(let i = 0 ; i< allGridCells.length ; i++)
        allGridCells[i].innerText = allGridCells[i].style = "";
    arr2 = arr3[arr3.length-1];
    allGridCells[0].click();
}

function handleActiveSheet(e) {
    storeTextInDB(e);
    let allSheets = document.querySelectorAll(".sheet");
    console.log(e.currentTarget);
    for (let i = 0; i < allSheets.length; i++) {
        console.log(allSheets[i]);
        allSheets[i].classList.remove("active-sheet");
    }
    e.currentTarget.classList.add("active-sheet");

    // load data form data base
    currsheetIdx = e.currentTarget.getAttribute("sheetidx");
    arr2 = arr3[currsheetIdx];

    loadDataInUI(arr2);
    console.log(arr2);
}

function loadDataInUI(arr2){
    for(let i=0 ; i< arr2.length ; i++)
        for(let j = 0 ; j < arr2[0].length ; j++){
            let aCell = allGridCells[i*26 + j];
            aCell.style.fontFamily =  arr2[i][j].fontFamily;
            aCell.style.fontWeight =  arr2[i][j].fontWeight;
            aCell.style.fontFamily =  arr2[i][j].fontStyle;
            aCell.style.fontFamily =  arr2[i][j].textDecoration;
            aCell.style.fontFamily =  arr2[i][j].fontSize;
            aCell.style.fontFamily =  arr2[i][j].bgColor;
            aCell.style.fontFamily =  arr2[i][j].textColor;
            aCell.style.fontFamily =  arr2[i][j].textAlignment;
            aCell.innerText =  arr2[i][j].text;
        }
    allGridCells[0].click();
}

function storeTextInDB(e){
    for(let i=0 ; i< 100 ; i++){
        for(let j=0 ; j<26; j++){
            let cell = allGridCells[(i*26)+j];
            let t = cell.innerText;
            arr2[i][j].text = t;
            
        }
        console.log(i,arr2[0][0].test);
    }
    console.log(arr2);
}

// getting cell in formula bar *****************************************************
//setting initial value of formula bar
allGridCells[0].click();

// display cellname to formula bar
function selectACell(e) {
    // console.log(e.target);
    let cellNode = e.target;
    let rID = Number(cellNode.getAttribute("rid"));
    let cID = Number(cellNode.getAttribute("cid"));
    console.log(rID, cID);
    cellIdentify.value = String.fromCharCode(65 + cID) + (rID + 1);

    // set font styling in menu bar
    setMenuDefaults(rID, cID);
}

//  styling bar ***********************************************************************

function changeFontFamily(e) {

    // get cell id on which change has to be applies
    let { rowAd, colAd } = getRowColId(cellIdentify.value);
    // let cell = document.querySelector(`.grid-ele[rid="${rowAd}"][cid="${colAd}"]`);
    let cell = allGridCells[rowAd * 26 + colAd];
    cell.style.fontFamily = e.target.value;
    // setting in array
    arr2[rowAd][colAd].fontFamily = e.target.value;
}

function buiStyling(e) {
    let { rowAd, colAd } = getRowColId(cellIdentify.value);
    let cell = allGridCells[rowAd * 26 + colAd];
    let selectedTag = e.currentTarget.value;
    if (selectedTag == "B") {
        if (cell.style.fontWeight == "bold") {
            arr2[rowAd][colAd].fontWeight = cell.style.fontWeight = "normal";
            BUIContainer[0].classList.remove("active-icon");
        }
        else {
            arr2[rowAd][colAd].fontWeight = cell.style.fontWeight = "bold";
            BUIContainer[0].classList.add("active-icon");
        }
    }
    else if (selectedTag == "I") {
        if (cell.style.fontStyle == "italic") {
            arr2[rowAd][colAd].fontStyle = cell.style.fontStyle = "normal";
            BUIContainer[1].classList.remove("active-icon");
        }
        else {
            arr2[rowAd][colAd].fontStyle = cell.style.fontStyle = "italic";
            BUIContainer[1].classList.add("active-icon");
        }
    }
    else if (selectedTag == "U") {
        if (cell.style.textDecoration == "underline") {
            arr2[rowAd][colAd].textDecoration = cell.style.textDecoration = "none";
            BUIContainer[2].classList.remove("active-icon");
        }
        else {
            arr2[rowAd][colAd].textDecoration = cell.style.textDecoration = "underline";
            BUIContainer[2].classList.add("active-icon");
        }

    }
}

function changeFontSize(e) {
    console.log(typeof (e.target.value));
    let { rowAd, colAd } = getRowColId(cellIdentify.value);
    let cell = allGridCells[rowAd * 26 + colAd];
    cell.style.fontSize = e.target.value + "px";
    arr2[rowAd][colAd].fontSize = e.target.value + "px";
    console.log(arr2[rowAd][colAd]);
}

function changeBGColor(e) {
    // console.log(bgColor.value);
    let { rowAd, colAd } = getRowColId(cellIdentify.value);
    let cell = allGridCells[rowAd * 26 + colAd];
    cell.style.backgroundColor = bgColor.value;
    arr2[rowAd][colAd].bgColor = bgColor.value;
    
}
function changeTextColor(e) {
    let { rowAd, colAd } = getRowColId(cellIdentify.value);
    let cell = allGridCells[rowAd * 26 + colAd];
    cell.style.color = textColor.value;
    arr2[rowAd][colAd].textColor = textColor.value;
}

function changeAlignment(e) {
    // console.log(e.currentTarget);
    let { rowAd, colAd } = getRowColId(cellIdentify.value);
    let cell = allGridCells[rowAd * 26 + colAd];
    console.log(e.target.classList[0]);
    let alig = e.currentTarget.classList[0];
    cell.style.textAlign = alig;
    arr2[rowAd][colAd].textAlignment = alig;
    console.log(arr2);
}

function getRowColId(cellAd) {
    let colAd = cellAd[0];
    let rowAd = cellAd.slice(1);
    // console.log(colAd, rowAd)
    colAd = parseInt(colAd, 36) - 9 - 1;
    rowAd = rowAd - 1;
    return { rowAd, colAd };
}

function setMenuDefaults(rID, cID) {
    fontFamilyBtn.value = arr2[rID][cID].fontFamily;
    // bui cont
    if (arr2[rID][cID].fontWeight == "bold")
    BUIContainer[0].classList.add("active-icon");
    else
    BUIContainer[0].classList.remove("active-icon");
    if (arr2[rID][cID].fontStyle == "italic")
    BUIContainer[1].classList.add("active-icon");
    else
    BUIContainer[1].classList.remove("active-icon");
    if (arr2[rID][cID].textDecoration == "underline")
    BUIContainer[2].classList.add("active-icon");
    else
    BUIContainer[2].classList.remove("active-icon");
    // font size
    fontSizeCont.value = arr2[rID][cID].fontSize.split("px")[0];
    // color
    bgColor.value = arr2[rID][cID].bgColor;
    textColor.value = arr2[rID][cID].textColor;
    formula.value = arr2[rID][cID].formula;
}

// formula bar ***************************************************************************
function formulaBarMainFn(e){
    if(e.key == "Enter" && formula.value!=""){
        // console.log(formula.value);
        // evaluate formula
        let evaluatedValue = evaluatedFormula(formula.value , cellIdentify.value);
        // get curr cell 
        let { rowAd, colAd } = getRowColId(cellIdentify.value);
        let cell = allGridCells[rowAd * 26 + colAd];
        // set formula in UI
        cell.innerText = evaluatedValue;        
        // set formula in DB
        arr2[rowAd][colAd].formula = formula.value;
        console.log(arr2);
    }
}

function evaluatedFormula( stringToEval , currCellAddress ){
    let regex = /([A-Z])\w+/g;
    let arr =stringToEval.match(regex);
    for(let i = 0 ;i< arr.length ; i++){
        let { rowAd, colAd } = getRowColId(arr[i]);
        let cellValue = allGridCells[rowAd * 26 + colAd].innerText;
        stringToEval = stringToEval.replace(arr[i], cellValue);
        // update dependency in parents db
        updateDependencyofParent(arr[i], currCellAddress );
    }
    // console.log(stringToEval);
    let evaluatedValue = eval(stringToEval);
    // console.log(evaluatedValue);
    return evaluatedValue;
}

function updateDependencyofParent(parent , child ){
    let { rowAd, colAd } = getRowColId(parent);
    arr2[rowAd][colAd].dependency.push(child);
}