// Read data
const data = require('fs').readFileSync(require('path').resolve(__dirname,'input.txt')).toString().split("\r\n")
// Initialise (crate) stack
let stack:string[][] = [[],[],[],[],[],[],[],[],[]]
let init:string[] = data.slice(0,8);
stack.forEach((v,i,a)=> init.forEach(s=>s.charAt(4*i+1) == ' ' ? null : a[i].unshift(s.charAt(4*i+1))));
// Each move
let commands = data.slice(10).map((s:string)=>s.split(' ').map(s=>Number(s)).filter((n:number)=>!isNaN(n)));
commands.forEach((c:number[])=>stack[c[2]-1].push(...stack[c[1]-1].splice(stack[c[1]-1].length-c[0], c[0])));
console.log(stack.map(a=>a.join("")));