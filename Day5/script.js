const fs = require('fs');
const path = require('path');
const { cwd } = require('process');

function extractLines(){
    const content = fs.readFileSync(path.join(cwd(), 'input.txt'));
    let lines = content.toLocaleString().split('\n');
    lines.pop();
    return lines;
}

function findZeroLengthLine(tab){
    for(let i = 0; i < tab.length; i++){
        if(tab[i].length == 0) return i;
    }
}

function extractItems(str){
    let index = 1;
    let result = [];
    while(index < str.length){
        result.push(str.charAt(index));
        index += 4;
    }
    return result;
}

function extractFirstPartAsStackArray(){
    const lines = extractLines();
    const limit = findZeroLengthLine(lines);
    let result = [];
    for(let i = 0; i < limit; i++){
        result.push(extractItems(lines[i]));
    }
    return flip2DArrayWithoutFirstIndexRemovingEmptyChars(result.reverse());
}

function flip2DArrayWithoutFirstIndexRemovingEmptyChars(arr){
    let result = [];
    for(let i = 0; i < arr[0].length; i++){
        let temp = [];
        for(let j = 1; j < arr.length; j++){
            if(arr[j][i] != ' ') temp.push(arr[j][i]);
        }
        result.push(temp);
    }
    return result;
}

function extractLineToTriplet(str){
    const re = /move ([0-9]*) from ([0-9]) to ([0-9])/gmi
    const res = re.exec(str);
    return [parseInt(res[1]), parseInt(res[2]), parseInt(res[3])];
}

function moveInPlaceFirst(arr, [num, from, to]){
    for(let i = 0; i < num; i++){
        arr[to-1].push(arr[from-1].pop());
    }
}

function moveInPlaceSecond(arr, [num, from, to]){
    let temp = [];
    for(let i = 0; i < num; i++){
        temp.push(arr[from-1].pop());
    }
    for(let i = 0; i < num; i++){
        arr[to-1].push(temp.pop());
    }
}

// Change parameter name
function executeMoveSequel(type){
    const lines = extractLines();
    const floor = findZeroLengthLine(lines);
    let stacks = extractFirstPartAsStackArray();
    for(let i = floor + 1; i < lines.length; i++){
        const move = extractLineToTriplet(lines[i]);
        if(type == 1) moveInPlaceFirst(stacks, move);
        if(type == 2) moveInPlaceSecond(stacks, move);
    }
    return stacks;
}

function getStackTops(arr){
    let result = "";
    for(let i = 0; i < arr.length; i++){
        result += arr[i][arr[i].length-1];
    }
    return result;
}

console.log(`Result for part 1 is ${getStackTops(executeMoveSequel(1))}`);
console.log(`Result for part 2 is ${getStackTops(executeMoveSequel(2))}`);
