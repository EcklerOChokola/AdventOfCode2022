const fs = require('fs');
const path = require('path');
const { cwd } = require('process');

function extractLineAsCharArray(){
    const content = fs.readFileSync(path.join(cwd(), 'input.txt'));
    let line = content.toLocaleString().split('\n');
    line.pop();
    return line[0].split('');
}

function assert4DifferentChars(a, b, c, d){
    const compA = (a != b) && (a != c) && (a != d);
    const compB = (b != c) && (b != d);
    const compC = (c != d);
    return compA && compB && compC;
}

function assert14DifferentChars(a, b, c, d, e, f, g, h, i, j, k, l, m, n){
    const compA = (a != b) && (a != c) && (a != d) && (a != e) && (a != f) && (a != g) && (a != h) && (a != i) && (a != j) && (a != k) && (a != l) && (a != m) && (a != n);
    const compB = (b != c) && (b != d) && (b != e) && (b != f) && (b != g) && (b != h) && (b != i) && (b != j) && (b != k) && (b != l) && (b != m) && (b != n);
    const compC = (c != d) && (c != e) && (c != f) && (c != g) && (c != h) && (c != i) && (c != j) && (c != k) && (c != l) && (c != m) && (c != n);
    const compD = (d != e) && (d != f) && (d != g) && (d != h) && (d != i) && (d != j) && (d != k) && (d != l) && (d != m) && (d != n);
    const compE = (e != f) && (e != g) && (e != h) && (e != i) && (e != j) && (e != k) && (e != l) && (e != m) && (e != n);
    const compF = (f != g) && (f != h) && (f != i) && (f != j) && (f != k) && (f != l) && (f != m) && (f != n);
    const compG = (g != h) && (g != i) && (g != j) && (g != k) && (g != l) && (g != m) && (g != n);
    const compH = (h != i) && (h != j) && (h != k) && (h != l) && (h != m) && (h != n);
    const compI = (i != j) && (i != k) && (i != l) && (i != m) && (i != n);
    const compJ = (j != k) && (j != l) && (j != m) && (j != n);
    const compK = (k != l) && (k != m) && (k != n);
    const compL = (l != m) && (l != n);
    const compM = (m != n);
    return compA && compB && compC && compD && compE && compF && compG && compH && compI && compJ && compK && compL && compM;
}

function resolvePart(int){
    const tab = extractLineAsCharArray();
    for(let i = 0; i < tab.length; i++){
        if(int == 1 && assert4DifferentChars(tab[i], tab[i + 1], tab[i + 2], tab[i + 3])) return (i + 4);
        if(int == 2 && assert14DifferentChars(tab[i], tab[i + 1], tab[i + 2], tab[i + 3], tab[i + 4], tab[i + 5], tab[i + 6], tab[i + 7], tab[i + 8], tab[i + 9], tab[i + 10], tab[i + 11], tab[i + 12], tab[i + 13])) return (i + 14);
    }
}

console.log(`Result for part 1 is ${resolvePart(1)}`);
console.log(`Result for part 2 is ${resolvePart(2)}`);
