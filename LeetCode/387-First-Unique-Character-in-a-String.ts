function firstUniqChar(s: string): number {
    const myMap = new Map()
    for (let i = 0; i < s.length; i++) {
        myMap.set(s[i], (myMap.get(s[i]) + 1) || 1 )
    }

    for (let i = 0; i < s.length; i++) {
        if (myMap.get(s[i])  === 1) {
            return i
        }
    }
    return -1
};

console.log(firstUniqChar("aab"));

function old (s:string){

    const myMap = new Map()
    for (let i = 0; i < s.length; i++) {
        if (myMap.has(s[i])) {
            myMap.set(s[i],myMap.get(s[i])[1]+1)
        }else {
            myMap.set(s[i],[i,1])
        }
    }
    
    for (const [key,val] of myMap.entries()) {
        if (val[1] === 1) {
            return val[0] 
        }
    }
    return -1
}