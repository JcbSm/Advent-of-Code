class Dir {
    constructor(name: string, parent: Dir | null) {
        this.name = name;
        this.parent = parent;
        this.filesize = 0;
        this.subdirs = [];
    }
    
    public getSize(): number {
        return this.filesize + this.subdirs.map(dir => dir.getSize()).reduce((a,c)=>a+c,0);
    }
}

interface Dir { name: string; parent: Dir | null; filesize: number; subdirs: Dir[]; }

// Parse input into a 'nice' format
let input:string[][][] = require('fs').readFileSync(require('path').resolve(__dirname,'input.txt'))
    .toString()
    .split("\r\n$ ")
    .map((c:string)=> {
        return c.split("\r\n").map(e=>e.split(" "))
    });

// Create root directory
const root = new Dir('/', null);

// Generate dir tree iterating through the cmdlines
let current = root;
input.forEach((line: string[][], i, a) => {

    // line[0] is the first line of the command
    // line[0][0] is the command that was run
    // line[1..] is the responses
    // For each line in output from 'ls':
    // ['dir', 'doiajd'] or ['123456', 'file.name']
    // Can easily determine what is inside the dir using this format.

    const cmd = line[0][0];

    // Skip first command, already in root dir
    if (i == 0)
        return;

    // Listing Directory
    if (cmd == 'ls') {

        for (let i = 1; i < line.length; i++) {
            const entry = line[i];

            if (entry[0] == 'dir')
                current.subdirs.push(new Dir(entry[1], current));
            else
                current.filesize += Number(entry[0]);
        }

    }
    
    // Changing directory
    if (cmd == 'cd') {

        switch (line[0][1]) {
            case '/':
                current = root;
                break;
            case '..':
                if (!current.parent)
                    process.exit(2);

                current = current.parent;
                break;
            default:
                let next = current.subdirs.find(d=>d.name == line[0][1]);
                if (!next)
                    process.exit(3);
                current = next;
                break;
        }
    }
});


//////// PART 1 ////////
let sum = 0;
const sumSmallDirs = (dir: Dir) => {

    const size = dir.getSize();
    sum += size <= 100000 ? size : 0;

    // Check subdirs recursively
    dir.subdirs.forEach(subdir => {
        sumSmallDirs(subdir);
    });

}; sumSmallDirs(root);

// Some useful constants
const reqSpace = 40000000;
const rootSize = root.getSize();

//////// PART 2 ////////
let del: number = rootSize;
const findSmallestDir = (dir: Dir) => {

    const size = dir.getSize();

    if (rootSize - size <= reqSpace && size < del)
        del = size;

    dir.subdirs.forEach(subdir => {
        findSmallestDir(subdir);
    });

}; findSmallestDir(root);

console.log(`Part 1: ${sum}`);
console.log(`Part 2: ${del}`)