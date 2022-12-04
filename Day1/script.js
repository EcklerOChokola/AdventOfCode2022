const fs = require('fs');
const path = require('path');
const { cwd } = require('process');

function readGroups(str){
    const allLines = str.split('\n');
    let max = 0;
    let local = 0;
    for(let i = 0; i < allLines.length; i++){
        if(allLines[i] == ''){
            if(local > max) max = local;
            local = 0;
        }else{
            local += parseInt(allLines[i]);
        }
    }
    return max;
}

function readTotals(str){
    const allLines = str.split('\n');
    let totals = [];
    let local = 0;
    for(let i = 0; i < allLines.length; i++){
        if(allLines[i] == ''){
            totals.push(local);
            local = 0;
        }else{
            local += parseInt(allLines[i]);
        }
    }
    const result = totals.sort().reverse();
    return [result[1], result[2], result[3]];
}

const lines = fs.readFileSync(path.join(cwd(), 'input.txt')).toLocaleString();

console.log(`Result for part 1 is ${readGroups(lines)}`);
console.log(`Result for part 2 is ${readTotals(lines)}`);