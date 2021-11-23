/**
 * Definition for singly-linked list.
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

function removeElements(head: ListNode | null, val: number): ListNode | null {
    if (head == null) {
        return null
    }

    let output = new ListNode(undefined,head)
    let cur = output

    while (cur.next !== null) {
        if (cur.next.val === val) {
            cur.next = cur.next.next
        }else {
            cur = cur.next
        }
    }

    return output.next
};