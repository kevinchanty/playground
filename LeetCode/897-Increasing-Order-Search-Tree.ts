// Given the root of a binary search tree,
// rearrange the tree in in-order so that the leftmost node in the tree is now the root of the tree,
// and every node has no left child and only one right child.



// Example 1:

// Input: root = [5,3,6,2,4,null,8,1,null,null,null,7,9]
// Output: [1,null,2,null,3,null,4,null,5,null,6,null,7,null,8,null,9]

// Example 2:

// Input: root = [5,1,7]
// Output: [1,null,5,null,7]


/* *
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}




function increasingBST(root: TreeNode | null): TreeNode | null {
    let inOrderResult: number[] = []

    let answerNode = new TreeNode()
    let current = answerNode;

    for (const val of inOrderResult) {
        current.val = val;
        current.right = new TreeNode();
        current = current.right
    }
    return answerNode;
};

function inOrder(node: TreeNode, answer: number[]) {
    if (node === null) { return };

    inOrder(node.left, answer);
    answer.push(node.val);
    inOrder(node.right, answer);

}
