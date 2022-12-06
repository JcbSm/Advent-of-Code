let stacks = [[],[],[],[],[],[],[],[],[]].map((v,i,a:string[][])=>require('fs').readFileSync(require('path').resolve(__dirname,'small_input.txt')).toString().split("\r\n").slice(0,8).map((s:string)=>s.charAt(4*i+1) == ' ' ? 0 : a[i].unshift(s.charAt(4*i+1))).map((n:number)=>a[i])[0]).map((v:string[],i,a:string[][])=> {

    // Array of [number, from, to]
    return require('fs').readFileSync(require('path').resolve(__dirname,'input.txt')).toString().split("\r\n").slice(10).map((s:string)=>s.split(' ').map(s=>Number(s)).filter((n:number)=>!isNaN(n))).map().map((n:number[])=>a[i])[0]
    
    
    /*
    .map((c:number[])=> {
        return a[c[2]-1].push(...a[c[1]-1].splice(a[c[1]-1].length-c[0],c[0]).reverse())
    })
    .map((n:number)=>a[i])[0]; */
})
console.log(stacks)//.map(s=>s.join("")));