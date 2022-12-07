const fs = require('fs');
const path = require('path');
const { cwd } = require('process');

let totalPart1 = 0;
let part2CompatibleDirs = [];

class Tree{
    value = 0;
    name = "";
    constructor(father){
        this.leaves = [];
        this.father = father;
    }
    addLeaf(leaf){
        this.leaves.push(leaf);
    }
    setValue(newValue){
        this.value = newValue;
    }
    calcValue(){
        for(let i = 0; i < this.leaves.length; i++){
            this.value += this.leaves[i].calcValue();
        }
        if(this.value <= 100000 && this.leaves.length > 0) totalPart1 += this.value;
        part2CompatibleDirs.push(this.value);
        return this.value;
    }
    setName(name){
        this.name = name;
    }
}

let Root;
let currentNode = new Tree(Root);
let RootNode = currentNode;
let slashNode = new Tree(currentNode);
slashNode.setName('/');
currentNode.addLeaf(slashNode);
currentNode = currentNode.leaves[0];

function extractCommands(){
    const content = fs.readFileSync(path.join(cwd(), 'input.txt'));
    let lines = content.toLocaleString().split('$');
    return lines;
}

function lsCommand(arr){
    for(let i = 1; i < arr.length; i++){
        let value = arr[i].split(' ');
        if (value[0] === 'dir'){
            let node = new Tree(currentNode);
            node.setName(value[1]);
            currentNode.addLeaf(node);
        }else{
            let node = new Tree(currentNode);
            node.setValue(parseInt(value[0]));
            node.setName(value[1]);
            currentNode.addLeaf(node);
        }
    }
}

function cdCommand(value){
    if(value == ".."){
        currentNode = currentNode.father;
    }else{
        const dir = value;
        for(let i = 0; i < currentNode.leaves.length; i++){
            if (currentNode.leaves[i].name == dir) {
                currentNode = currentNode.leaves[i];
                return;
            }
        }
    }
}

function command(arr){
    if(arr[0].startsWith(" ls")){
        lsCommand(arr);
    }
    if(arr[0].startsWith(" cd")){
        const com = arr[0].split(' ');
        cdCommand(com[2]);
    }
    
}

function listCommandIOs(str){
    const arr = str.split('\n');
    arr.pop();
    return arr;
}

const lines = extractCommands();

function executeCommands(){
    for(let i = 1; i < lines.length; i++){
        command(listCommandIOs(lines[i]));
    }
}

executeCommands();
RootNode.calcValue();

const neededSpace = 30000000 - (70000000 - RootNode.value);

const part2Result = part2CompatibleDirs.filter((value) => value >= neededSpace).sort((a, b) => parseInt(a) - parseInt(b))[0];

console.log(`Result for part 1 is ${totalPart1}`);
console.log(`Result for part 2 is ${part2Result}`);
