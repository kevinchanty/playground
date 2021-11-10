const isPalindrome = function (x:number) {
    if (x < 0) {
        return false
    }else {
        const original = x.toString().split("")
        const reverse = x.toString().split("").reverse();

        for (let i = 0; i < original.length; i++) {
            if (original[i] !== reverse[i]) {
                return false
            }
        }
        return true
    }
}