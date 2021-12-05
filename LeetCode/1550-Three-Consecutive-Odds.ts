function threeConsecutiveOdds(arr: number[]): boolean {
    let status = 0

    for (let i = 0; i < arr.length; i++) {
        status = arr[i] % 2 === 0 ? 0 : status + 1

        if (status === 3) return true
    }
    return false
};

console.log(threeConsecutiveOdds([1, 2, 34, 3, 4, 5, 7, 24, 12]))