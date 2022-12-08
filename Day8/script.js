const fs = require('fs');
const path = require('path');
const { cwd } = require('process');

let viewableOutside = [];
let scenicView = [];

function extractDocumentAs2DArray(){
    let content = fs.readFileSync(path.join(cwd(), 'input.txt')).toLocaleString().split('\n');
    content.pop();
    let lines = [];
    for(let i = 0; i < content.length; i++){
        let arr = content[i].split('');
        let temp = [];
        for(let j = 0; j < arr.length; j++){
            temp.push(parseInt(arr[j]));
        }
        lines.push(temp);
    }
    return lines;
}

function initializeCount(arr){
    for(let i = 0; i < arr.length; i++){
        let temp = [];
        for(let j = 0; j < arr[i].length; j++){
            temp.push(false);
        }
        viewableOutside.push(temp);
    }
}

function analyzeColumn(arr, index){
    let col = [];
    for(let i = 0; i < arr.length; i++){
        col.push(arr[i][index]);
    }
    for(let i = 0; i < col.length; i++){
        const topArray = col.slice(0, i);
        const bottomArray = col.slice(i+1);
        const topMax = Math.max(...topArray);
        const bottomMax = Math.max(...bottomArray);
        if(arr[i][index] > topMax || arr[i][index] > bottomMax || i == 0 || i == arr.length-1 || index == 0 || index == arr[0].length -1) viewableOutside[i][index] = true;
    }
}

function analyzeRow(arr, index){
    let row = arr[index];
    for(let i = 0; i < row.length; i++){
        const leftArray = row.slice(0, i);
        const rightArray = row.slice(i+1);
        const leftMax = Math.max(...leftArray);
        const rightMax = Math.max(...rightArray);
        if(row[i] > leftMax || row[i] > rightMax || i == 0 || i == arr[0].length-1 || index == 0 || index == arr.length -1) viewableOutside[index][i] = true;
    }
}

function analyzeTable(arr){
    for(let i = 0; i < arr.length; i++){
        analyzeRow(arr, i);
    }
    for(let i = 0; i < arr[0].length; i++){
        analyzeColumn(arr, i);
    }
}

function countTable(arr){
    let count = 0;
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr[i].length; j++){
            if(arr[i][j]) count++;
        }
    }
    return count;
}

function viewTop(arr, i, j){
    for(let index = i-1; index > 0; index--){
        if(arr[index][j] >= arr[i][j]) return i-index;
    }
    return i;
}

function viewBottom(arr, i, j){
    for(let index = i+1; index < arr.length; index++){
        if(arr[index][j] >= arr[i][j]) return index-i;
    }
    return arr.length-i-1;
}

function viewLeft(arr, i, j){
    for(let index = j-1; index > 0; index--){
        if(arr[i][index] >= arr[i][j]) return j-index;
    }
    return j;
}

function viewRight(arr, i, j){
    for(let index = j+1; index < arr[0].length; index++){
        if(arr[i][index] >= arr[i][j]) return index-j;
    }
    return arr[0].length-j-1;
}

function viewTable(arr){
    for(let i = 0; i < arr.length; i++){
        let temp = [];
        for(let j = 0; j < arr[i].length; j++){
            temp.push(
                viewBottom(arr, i, j) *
                viewLeft(arr, i, j) *
                viewRight(arr, i, j) *
                viewTop(arr, i, j)
            );
        }
        scenicView.push(temp);
    }
}

function arrayMax(arr){
    let max = 0;
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr[i].length; j++){
            if(arr[i][j] > max) max = arr[i][j];
        }
    }
    return max;
}

const document = extractDocumentAs2DArray()

initializeCount(document);

analyzeTable(document);

viewTable(document);

console.log(`Result for part 1 is ${countTable(viewableOutside)}`);
console.log(`Result for part 2 is ${arrayMax(scenicView)}`);
