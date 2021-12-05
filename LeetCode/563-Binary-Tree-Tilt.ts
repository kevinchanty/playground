/**
 * Definition for a binary tree node.
 * 
 */

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    
    constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

function findTilt(root: TreeNode | null): number {
    let totalTilt = 0
    
    function calculsteSum(root:TreeNode | null):number {
        if (root === null) {return 0}

        const leftSum = calculsteSum(root.left)
        const rightSum = calculsteSum(root.right)
        const tilt = Math.abs(leftSum - rightSum)
        totalTilt += tilt

        return leftSum + rightSum + root.val
    }

    calculsteSum(root)
    return totalTilt
};