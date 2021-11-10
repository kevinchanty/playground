function isValid(s: string): boolean {
    const open = ["(", "{", "["]
    const close = [")", "}", "]"]
    let list = []
    for (let i = 0; i < s.length; i++) {
        if (open.includes(s[i])) {
            list.push(close[open.indexOf(s[i])])
        } else if (close.includes(s[i])) {
            if (list[list.length - 1] !== s[i]) {
                return false
            } else {
                list.pop();
            }
        }
    }
    if (list.length === 0) {
        return true
    } else { return false }
};