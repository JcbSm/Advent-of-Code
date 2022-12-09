import { Knot } from "./lib/Knot";

// Parse input to be [direction, distance]
const steps: number[][] = require('fs').readFileSync(require('path').resolve(__dirname, 'input.txt'))
    .toString()
    .split("\r\n")
    .map((s:string) => 
        s //
            .split(" "))
            .map((s:string[]) => [['U', 'D', 'R', 'L'].indexOf(s[0]), Number(s[1])]);


function sim(length: number) {

    // Generate Rope
    const rope = new Array(length).fill(null).map(n => new Knot())

    steps.forEach(step => {

        const [direction, distance] = step;

        for (let j = 0; j < distance; j++) {
            rope.forEach((knot: Knot, i) => {

                // Move head
                if (i == 0)
                    return knot.move(direction);

                let prev = rope[i-1];

                // Do nothign if still adjacent
                if (knot.isAdjacent(prev))
                    return;

                // Else move
                let diffX = knot.pos.x - prev.pos.x;
                let diffY = knot.pos.y - prev.pos.y;

                // Move(): 0-UP 1-DOWN 2-RIGHT 3-LEFT
                if (Math.abs(diffX) > 0) {
                    knot.move(diffX > 0 ? 3 : 2);
                }

                if (Math.abs(diffY) > 0) {
                    knot.move(diffY > 0 ? 1 : 0);
                }

                knot.visited.add(knot.pos.toString());

            });
        }
    })

    return rope[rope.length - 1].visited.size;
}

// Part 1
console.log(sim(2));
// Part 2
console.log(sim(10));