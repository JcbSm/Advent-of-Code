export class Pos {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    public toString(): string {
        return `x${this.x}y${this.y}`
    }
}

export interface Pos {
    x: number;
    y: number;
}