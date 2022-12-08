export type Pos = [number, number];

export class Tree {
    constructor(height: number, grid: Grid, pos: Pos) {
        this.grid = grid;
        this.height = height;
        this.pos = pos;
    }

    public isVisibleFromEdge(): boolean {

        let i;
        // Go through each direction and see if it reaches the edge

        // -pos[0]
        for (i = this.pos[0] - 1; i >= 0; i--)
            if (this.grid.getTreeAtPos([i, this.pos[1]])!.height >= this.height)
                break;
        if (i < 0)
            return true;

        // +pos[0]
        for (i = this.pos[0] + 1; i < this.grid.y; i++)
            if(this.grid.getTreeAtPos([i, this.pos[1]])!.height >= this.height)
                break;
        if (i >= this.grid.y)
            return true;

        // -pos[1]
        for (i = this.pos[1] - 1; i >= 0; i--)
            if (this.grid.getTreeAtPos([this.pos[0], i])!.height >= this.height)
                break;
        if (i < 0)
            return true;

        // +pos[1]
        for (i = this.pos[1] + 1; i < this.grid.x; i++)
            if(this.grid.getTreeAtPos([this.pos[0], i])!.height >= this.height)
                break;
        if (i >= this.grid.x)
            return true;

        return false;
    }

    public getRelativeTree(relativePos: Pos): Tree | undefined {
        let newpos: Pos = [this.pos[0] + relativePos[0], this.pos[1] + relativePos[1]];
        return this.grid.getTreeAtPos(newpos);
    }

    public calcScenicScore(): number {

        let score = 1;

        score *= this.countTreesInDirection([-1, 0]);
        score *= this.countTreesInDirection([1, 0]);
        score *= this.countTreesInDirection([0, -1]);
        score *= this.countTreesInDirection([0, 1]);

        return score;

    }

    private countTreesInDirection(relativePos: Pos) {

        let score = 0;
        let next: Tree | undefined;
        let current = this.height;

        next = this.getRelativeTree(relativePos);
        while (next) {
            score++;

            if (next.height >= current)
                break;

            next = next.getRelativeTree(relativePos);
        };

        return score;

    }
}

export interface Tree {
    grid: Grid;
    height: number;
    pos: Pos;
}



export class Grid {
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.plane = this.createPlane(x, y);
    }

    private createPlane(x: number, y: number): Tree[][] {

        let plane = new Array(y);

        for (let i = 0; i < y; i++)
            plane[i] = (new Array(x));

        return plane;
    }

    public plotTree(height: number, pos: Pos): Tree {

        const tree = new Tree(height, this, pos);
        this.plane[pos[0]][pos[1]] = tree;
        return tree;
    }

    public getTreeAtPos(pos: Pos): Tree | undefined {

        if (pos[0] >= this.y || pos[0] < 0)
            return;
        if (pos[1] >= this.x || pos[1] < 0)
            return;

        return this.plane[pos[0]][pos[1]];
    }

    public getTreesVisibleFromEdge(): number {

        let count = 0;

        this.plane.forEach(row => {
            row.forEach(tree => {
                tree.isVisibleFromEdge() ? count++ : null
            })
        })

        return count;

    }

    public getMostScenic(): number {

        let score = 0;
        
        this.plane.forEach(row => {
            row.forEach(tree => {
                let s = tree.calcScenicScore();
                score = s > score ? s : score; 
            })
        })

        return score;

    }
}

export interface Grid {
    x: number;
    y: number;
    plane: Tree[][];
}