function isSubset(arr1:string[], arr2:string[]):boolean {

    return arr2.every(letter => arr1.includes(letter))
}

//Computational complexity is O(n^2). 

console.log(isSubset(["A","B","C","D","E"], ["A","E","D"]))
console.log(isSubset(["A","B","C","D","E"], ["A","D","Z"]))
console.log(isSubset(["A","D","E"], ["A","A","D","E"]))