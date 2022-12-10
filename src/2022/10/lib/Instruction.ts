export class Instruction {
    constructor(cycles: number, value: number) {
        this.cycles = cycles;
        this.value = value;
    }

    
}

export interface Instruction {
    cycles: number;
    value: number;
}