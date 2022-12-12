const instructions: number[][] = require('fs').readFileSync(require('path').resolve(__dirname, 'input.txt'))
    .toString()
    .split("\r\n")
    .map((str: string) =>
        str.split(" "))
    .map((a: string[]) =>
        [a[0] == 'addx' ? 1 : 0, a[1] ? Number(a[1]) : 0]);

let cycles: number[] = new Array(1).fill(1);

instructions.forEach((instr) => {
    
    const [instruction, value] = instr;
    const curVal = cycles[cycles.length - 1];
    if (instruction) {
        cycles.push(curVal);
        cycles.push(curVal + value);
    } else {
        cycles.push(curVal);
    }

});

// Part 1
function getSignalStrengths(n: number[]): number {
    let sum = 0;
    n.forEach(c => {
        sum += cycles[c-1] * c;
    })
    return sum;
}

console.log(getSignalStrengths([20, 60, 100, 140, 180, 220]));

// Part 2
let display: string[] = new Array(cycles.length);

for (let i = 0; i < display.length; i++) {

    const spritePos = cycles[i]
    display[i] = [spritePos, spritePos + 1, spritePos + 2].includes(i % 40 + 1) ? '#' : '.';

}

console.log(display.slice(0,39).join(""));
console.log(display.slice(40,79).join(""));
console.log(display.slice(80,119).join(""));
console.log(display.slice(120,159).join(""));
console.log(display.slice(160,199).join(""));
console.log(display.slice(200,239).join(""));
