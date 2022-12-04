const fs = require('fs');
const path = require('path');
const { cwd } = require('process');

function extractLines(){
    const content = fs.readFileSync(path.join(process.cwd(), 'input.txt'));
    const lines = content.toLocaleString().split('\n');
    return lines;
}

function convertCharToCode(char){
    const code = char.charCodeAt(0);
    if(code > 90) return code -96;
    return code -38;
}

function getCommonType(a, b){
    for(let i = 0; i < a.length; i++){
        if(b.includes(a[i])) return a[i];
    }
}

function getTypePriorities(){
    const lines = extractLines();
    let res = 0;
    for(let i = 0; i < lines.length-1; i++){
        const temp = lines[i].split('');
        const middle = Math.ceil(temp.length / 2); 
        res += convertCharToCode(getCommonType(temp.slice(0, middle), temp.slice(middle)));
    }
    return res;
}

console.log(`Result for part 1 is ${getTypePriorities()}`);

function getGroupPriorities(){
    const lines = extractLines();
    let res = 0;
    for(let i = 0; i < (lines.length-1)/3; i++){
        const firstElf = lines[3*i].split('');
        for(let j = 0; j < firstElf.length; j++){
            if(lines[3*i+1].includes(firstElf[j]) && lines[3*i+2].includes(firstElf[j])){
                res += convertCharToCode(firstElf[j]);
                break;
            }
        }
    }
    return res;
}

console.log(`Result for part 2 is ${getGroupPriorities()}`);