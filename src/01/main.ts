import { readFileSync } from 'fs';
import path from 'path';

console.log(Math.max(...((readFileSync(path.resolve(__dirname, './input.txt'))).toString()).split('\r\n\r\n').map((str) => str.split('\r\n').map((str) => parseInt(str)).reduce((a, c) => a+c, 0))));