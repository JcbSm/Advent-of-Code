import { Grid, Tree } from "./lib";

// Parse input
let trees = require('fs').readFileSync(require('path').resolve(__dirname, 'input.txt')).toString().split("\r\n").map((s:string) => s.split(""));

const grid = new Grid(trees[0].length, trees.length);

// Insert trees into grid
trees.forEach((row: string[], i: number) => {
    row.forEach((c: string, j: number) => {
        grid.plotTree(Number(c), [i,j]);
    })
});

// Part 1
console.log(grid.getTreesVisibleFromEdge());

// Part 2
console.log(grid.getMostScenic());