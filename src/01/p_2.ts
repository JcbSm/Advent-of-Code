import { readFileSync } from 'fs';
import path from 'path';
console.log(((readFileSync(path.resolve(__dirname, './input.txt'))).toString()).split('\r\n\r\n').map((str) => str.split('\r\n').map((str) => parseInt(str)).reduce((a,c) => a+c,0)).sort((a,b)=>b-a).slice(0,3).reduce((a,c)=>a+c,0));