const fs = require('fs');
const path = require('path');
const { cwd } = require('process');

const part1States = [20, 60, 100, 140, 180, 220];
let part1Values = [];
let screen = '';

function extractDocumentAsCPUOperations(){
    let content = fs.readFileSync(path.join(cwd(), 'input.txt')).toLocaleString().split('\n');
    content.pop();
    let lines = [];
    for(let i = 0; i < content.length; i++){
        if(content[i].startsWith("noop")){
            lines.push([1, 0]);
        }else{
            let addxValue = parseInt(content[i].split(' ')[1]);
            lines.push([2, addxValue]);
        }
    }
    return lines;
}

function computeCommand(duration, value, state, beginningTime){
    let finishingTime = beginningTime + duration;
    for(let i = 0; i < part1States.length; i++){
        if(beginningTime < part1States[i] && part1States[i] <= finishingTime) part1Values.push(state * part1States[i]);
    }
    for(let i = beginningTime; i < beginningTime + duration; i++){
        if([state - 1, state, state + 1].includes(i % 40)){
            screen += '▮';
        }else{
            screen += ' ';
        }
    }
    return [value + state, finishingTime];
}

let CPUState = [1, 0];
const CPUCommands = extractDocumentAsCPUOperations();
for(let i = 0; i < CPUCommands.length; i++){
    CPUState = computeCommand(CPUCommands[i][0], CPUCommands[i][1], CPUState[0], CPUState[1]);
}
let part1Sum = 0;
for(let i = 0; i < part1Values.length; i++){
    part1Sum += part1Values[i];
}

let CRT = screen.match(/.{1,40}/g) || [];
screen = '';
for(let i = 0; i < CRT.length; i++){
    screen += CRT[i]+'\n';
}

console.log(`Result for part 1 is ${part1Sum}`);
console.log(`Result for part 2 is :\n${screen}`);
