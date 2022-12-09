const fs = require('fs');
const path = require('path');
const { cwd } = require('process');

class Position{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    upPosition(){
        return new Position(this.x-1, this.y);
    }
    downPosition(){
        return new Position(this.x+1, this.y);
    }
    leftPosition(){
        return new Position(this.x, this.y-1);
    }
    rightPosition(){
        return new Position(this.x, this.y+1);
    }
}

class RopeEnd{
    pastPositions = [];
    constructor(){
        this.currentPosition = new Position(0, 0);
        this.pastPositions.push("0-0");
    }
}

function extractDocumentAsMovementArray(){
    let content = fs.readFileSync(path.join(cwd(), 'input.txt')).toLocaleString().split('\n');
    content.pop();
    let lines = [];
    for(let i = 0; i < content.length; i++){
        const arr = content[i].split(' ');
        lines.push([arr[0], parseInt(arr[1])]);
    }
    return lines;
}

function move(direction, obj){
    let newPos = obj.currentPosition;
    if(direction.includes('U')) newPos = newPos.upPosition(); 
    if(direction.includes('D')) newPos = newPos.downPosition();
    if(direction.includes('R')) newPos = newPos.rightPosition();
    if(direction.includes('L')) newPos = newPos.leftPosition();
    obj.currentPosition = newPos;
    const str = `${newPos.x}-${newPos.y}`;
    if(!obj.pastPositions.includes(str)) obj.pastPositions.push(str);
}

function processTailMove(index){
    const headPos = [rope[index].currentPosition.x, rope[index].currentPosition.y];
    const tailPos = [rope[index+1].currentPosition.x, rope[index+1].currentPosition.y];
    let processedMovesList = "";
    if(headPos[0] > tailPos[0]+1){
        processedMovesList += 'D';
        if(headPos[1] > tailPos[1]) processedMovesList += 'R';
        if(headPos[1] < tailPos[1]) processedMovesList += 'L';
    }
    if(headPos[0] < tailPos[0]-1){
        processedMovesList += 'U';
        if(headPos[1] > tailPos[1]) processedMovesList += 'R';
        if(headPos[1] < tailPos[1]) processedMovesList += 'L';
    }
    if(headPos[1] > tailPos[1]+1){
        processedMovesList += 'R';
        if(headPos[0] > tailPos[0]) processedMovesList += 'D';
        if(headPos[0] < tailPos[0]) processedMovesList += 'U';
    }
    if(headPos[1] < tailPos[1]-1){
        processedMovesList += 'L'
        if(headPos[0] > tailPos[0]) processedMovesList += 'D';
        if(headPos[0] < tailPos[0]) processedMovesList += 'U';
    };

    return processedMovesList;
}

function applyMovements(direction, numberOfSteps){
    for(let i = 0; i < numberOfSteps; i++){
        move(direction, rope[0]);
        for(let i = 0; i < rope.length-1; i++){
            let tailMove = processTailMove(i);
            move(tailMove, rope[i+1]);
        }
    }
}

const movementList = extractDocumentAsMovementArray();

let rope = [];
for(let i = 0; i < 10; i++){
    rope.push(new RopeEnd());
}

for(let i = 0; i < movementList.length; i++){
    applyMovements(movementList[i][0], movementList[i][1]);
}


console.log(`Result for part 1 is ${rope[1].pastPositions.length}`);
console.log(`Result for part 2 is ${rope[9].pastPositions.length}`);
