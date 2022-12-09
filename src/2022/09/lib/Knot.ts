import { Pos } from "./Pos";

export class Knot {
    constructor() {
        this.pos = new Pos();
        this.visited = new Set();
        this.visited.add(this.pos.toString());
    }

    public move(direction: number) {

        switch (direction) {
            case 0:
                this.pos.y++;
                break;
            case 1:
                this.pos.y--;
                break;
            case 2:
                this.pos.x++;
                break;
            case 3:
                this.pos.x--;
                break;
        }
    }

    public isAdjacent(knot: Knot) {
        return Math.abs(this.pos.x - knot.pos.x) < 2 && Math.abs(this.pos.y - knot.pos.y) < 2;
    }
}

export interface Knot {
    pos: Pos;
    visited: Set<string>;
}