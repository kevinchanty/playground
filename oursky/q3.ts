function recur(n: number, cur?: number): number {
    if (!cur) {
        cur = 0;
    }
    console.log(n,cur)

    if (n < 2) {
        throw new Error('Invalid input');
    }
    if (n === 2) {
        return 1 / n + cur;
    }
    return recur(n - 1, cur + 1 / (n * (n - 1)));
}

function noRecur(n: number) {
    if (n < 2) {
        throw new Error('Invalid input');
    }

    return 1 - (1 / n)
}


// for (let i = 2; i < 3; i++) {
//     if (recur(i) !== noRecur(i)) {
//         console.log(false, i, recur(i), noRecur(i))
//     }
// }

console.log(recur(10))