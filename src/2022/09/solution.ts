import { Knot } from "./lib/Knot";

const steps: number[][] = require('fs').readFileSync(require('path').resolve(__dirname, 'input.txt'))
    .toString()
    .split("\r\n")
    .map((s:string) => 
        s //
            .split(" "))
            .map((s:string[]) => [['U', 'D', 'R', 'L'].indexOf(s[0]), Number(s[1])]);


function sim(length: number) {
    const rope = new Array(length).fill(0).map(n => new Knot())

    steps.forEach(split => {

        const [direction, distance] = split;

        for (let j = 0; j < distance; j++) {
            rope.forEach((knot: Knot, i) => {

                if (i == 0)
                    return knot.move(direction);

                let prev = rope[i-1];

                if (knot.isAdjacent(prev))
                    return;

                // Else move
                let diffX = knot.pos.x - prev.pos.x;
                let diffY = knot.pos.y - prev.pos.y;

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