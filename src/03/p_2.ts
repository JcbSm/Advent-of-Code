import { readFileSync } from "fs"; import { resolve } from 'path';
//console.log(((readFileSync(resolve(__dirname,'input.txt'))).toString().split("\r\n").map(s=>[s.slice(0, s.length/2), s.slice(s.length/2, s.length)]).map(a=>a[0].split("").filter(l=>a[1].split("").includes(l))[0].charCodeAt(0)).map(n=>n>91?n-96:n-38)).reduce((a,c)=>a+c,0));

const data = (readFileSync(resolve(__dirname,'input.txt'))).toString().split("\r\n").map((s,i,a)=>i%3==0?[s,a[i+1],a[i+2]].map(s=>[...new Set(s.split(""))].join("")):undefined).filter(e=>e).map(a=>a![0].split("").filter(c=>a![1].split("").includes(c) && a![2].split("").includes(c))[0].charCodeAt(0)).map(n=>n>91?n-96:n-38).reduce((a,c)=>a+c,0);

console.log(data);