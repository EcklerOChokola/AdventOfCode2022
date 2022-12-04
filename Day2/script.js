const fs = require('fs');
const path = require('path');
const { cwd } = require('process');

let totalScore = 0;

function splitLine(str){
    let fight = str.split(' ');
    for(let i = 0 ; i < fight.length; i++){
        fight[i] = convertLetter(fight[i]);
    }
    return fight;
}

function extractLines(){
    const content = fs.readFileSync(path.join(process.cwd(), 'input.txt'));
    const lines = content.toLocaleString().split('\n');
    return lines;
}

function convertLetter(char){
    if(char == 'A' || char == 'X') return 1;
    if(char == 'B' || char == 'Y') return 2;
    if(char == 'C' || char == 'Z') return 3;
}

const lines = extractLines();
let analysedLines = [];

for(let i = 0; i < lines.length-1; i++){
    analysedLines[i] = (splitLine(lines[i]));
}

function calculateScore([a, b]){
    let localScore = b;
    if(a == 1){
        if(b == 1) localScore += 3;
        if(b == 2) localScore += 6;
    }
    if(a == 2){
        if(b == 2) localScore += 3;
        if(b == 3) localScore += 6;
    }
    if(a == 3){
        if(b == 3) localScore += 3;
        if(b == 1) localScore += 6;
    }
    return localScore;
}
 
for(let i = 0; i < analysedLines.length; i++){
    totalScore += calculateScore(analysedLines[i]);
}

console.log(`Result for part 1 is ${totalScore}`);

totalScore = 0;

function calculateScoreAlt([a, b]){
    let localScore = (b-1)*3;
    if(b == 1){
        if (a == 1) localScore += 3
        if (a == 2) localScore += 1
        if (a == 3) localScore += 2
    }
    if(b == 2){
        if (a == 1) localScore += 1
        if (a == 2) localScore += 2
        if (a == 3) localScore += 3
    }
    if(b == 3){
        if (a == 1) localScore += 2
        if (a == 2) localScore += 3
        if (a == 3) localScore += 1
    }
    return localScore;
}

for(let i = 0; i < analysedLines.length; i++){
    totalScore += calculateScoreAlt(analysedLines[i]);
}

console.log(`Result for part 2 is ${totalScore}`);