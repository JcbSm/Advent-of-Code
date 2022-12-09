export class Pos {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    up() {
        return this.y++;
    }

    down() {
        return this.y--;
    }

    right() {
        return this.x++;
    }

    left() {
        return this.x--;
    }

    public toString(): string {
        return `x${this.x}y${this.y}`
    }
}

export interface Pos {
    x: number;
    y: number;
}