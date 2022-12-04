const fs = require('fs');
const path = require('path');
const { cwd } = require('process');

let superPositions = 0, overlaps = 0;

function extractLines(){
    const content = fs.readFileSync(path.join(process.cwd(), 'input.txt'));
    const lines = content.toLocaleString().split('\n');
    return lines;
}

function endsToTab(aDASHb){
    const temp = aDASHb.split('-');
    return ([parseInt(temp[0]), parseInt(temp[1])]);
}

function superPosition(aCOMMAb){
    const temp = aCOMMAb.split(',');
    let aAndB = [];
    for(let i = 0; i < temp.length; i++){
        aAndB[i] = endsToTab(temp[i]);
    }
    return (aAndB[0][0]<=aAndB[1][0] && aAndB[0][1]>=aAndB[1][1]) || (aAndB[0][0]>=aAndB[1][0] && aAndB[0][1]<=aAndB[1][1]);
}

function overlap(aCOMMAb){
    const temp = aCOMMAb.split(',');
    let aAndB = [];
    for(let i = 0; i < temp.length; i++){
        aAndB[i] = endsToTab(temp[i]);
    }
    return (aAndB[1][0]<=aAndB[0][0]&&aAndB[0][0]<=aAndB[1][1]) || (aAndB[1][0]<=aAndB[0][1]&&aAndB[0][1]<=aAndB[1][1]) || (aAndB[0][0]<=aAndB[1][1]&&aAndB[1][1]<=aAndB[0][1]) || (aAndB[0][0]<=aAndB[1][0]&&aAndB[1][0]<=aAndB[0][1]);
}

const lines = extractLines();

for(let i = 0; i < lines.length - 1; i++){
    if(superPosition(lines[i])) superPositions++;
    if(overlap(lines[i])) overlaps++;
}

console.log(`Result for part 1 is ${superPositions}`);
console.log(`Result for part 2 is ${overlaps}`);
