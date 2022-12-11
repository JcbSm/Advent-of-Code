import { evaluate } from "mathjs";

class Monkey {
    constructor(input: string[]) {
        this.id = Number(input[0].replace(/Monkey |:/g, ''));
        this.items = input[1].replace(/Starting items: /, '').split(', ').map(s=> Number(s));
        this.operation = input[2].replace(/Operation: new = /, '');
        this.divider = Number(input[3].replace(/Test: divisible by /, ''));
        this.ifTrue = Number(input[4].replace(/If true: throw to monkey /, ''));
        this.ifFalse = Number(input[5].replace(/If false: throw to monkey /, ''));
        this.count = 0;
    }

    public turn(monkeys: Map<number, Monkey>) {

        while (this.items[0]) {

            this.inspect();
            this.test(monkeys);
        }
    }

    private inspect() {
        let level = this.items[0]!
        this.items[0] = evaluate(this.operation.replace(/old/g, `${level}`));
        this.count++;
    }
    
    private test(monkeys: Map<number, Monkey>) {
        this.items[0] % this.divider == 0 ? this.throw(monkeys.get(this.ifTrue)!) : this.throw(monkeys.get(this.ifFalse)!);
    }    

    private throw(monkey: Monkey) {
        const item = this.items.shift();
        item ? monkey.items.push(item) : null;
    }
}

interface Monkey {
    id: number,
    items: number[];
    operation: string;
    divider: number;
    ifTrue: number;
    ifFalse: number;
    count: number;
}

// Parse input
const monkeyInput: string[][] = require('fs').readFileSync(require('path').resolve(__dirname, 'input.txt'))
    .toString()
    .split("\r\n\r\n")
    .map((m: string) =>
        m //
            .split("\r\n")
            .map(s=> s.trim()));

const monkeys: Map<number, Monkey> = new Map()

monkeyInput.forEach(mon => {
    const monkey = new Monkey(mon);
    monkeys.set(monkey.id, monkey);
});

function calcMonkeyBusiness(monkeys: Map<number, Monkey>) {
    let counts = [...monkeys.values()].map((m: Monkey) => m.count).sort((a,b) => b-a);
    return counts[0] * counts[1];
}

function sim(rounds: number) {
    for (let i = 0; i < rounds; i++) {
        for(let m = 0; m < monkeys.size; m++) {
            monkeys.get(m)?.turn(monkeys);
        }
    }
}

// Part 1
sim(20);
console.log(calcMonkeyBusiness(monkeys))