// 904. Fruit Into Baskets
// Medium

// You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array fruits where fruits[i] is the type of fruit the ith tree produces.

// You want to collect as much fruit as possible. However, the owner has some strict rules that you must follow:

//     You only have two baskets, and each basket can only hold a single type of fruit. There is no limit on the amount of fruit each basket can hold.
//     Starting from any tree of your choice, you must pick exactly one fruit from every tree (including the start tree) while moving to the right. The picked fruits must fit in one of your baskets.
//     Once you reach a tree with fruit that cannot fit in your baskets, you must stop.

// Given the integer array fruits, return the maximum number of fruits you can pick.

// Example 1:

// Input: fruits = [1,2,1]
// Output: 3
// Explanation: We can pick from all 3 trees.

// Example 2:

// Input: fruits = [0,1,2,2]
// Output: 3
// Explanation: We can pick from trees [1,2,2].
// If we had started at the first tree, we would only pick from trees [0,1].

// Example 3:

// Input: fruits = [1,2,3,2,2]
// Output: 4
// Explanation: We can pick from trees [2,3,2,2].
// If we had started at the first tree, we would only pick from trees [1,2].

// Constraints:

//     1 <= fruits.length <= 105
//     0 <= fruits[i] < fruits.length

function totalFruit(fruits: number[]): number {
    let answer = 0;
  
    let lastFruit: { type?: number; count: number; continuousCount: number } = {
      type: undefined,
      count: 0,
      continuousCount: 0,
    };
    let secondLastFruit: {
      type?: number;
      count: number;
      continuousCount: number;
    } = {
      type: undefined,
      count: 0,
      continuousCount: 0,
    };
  
    for (let i = 0; i < fruits.length; i++) {
      let currentFruit = fruits[i];
      if (currentFruit === lastFruit.type) {
        lastFruit.count++;
        lastFruit.continuousCount++;
      } else if (currentFruit === secondLastFruit.type) {
        let temp = {
          type: currentFruit,
          count: secondLastFruit.count + 1,
          continuousCount: 1,
        };
        secondLastFruit = lastFruit;
        lastFruit = temp;
      } else {
        secondLastFruit = { ...lastFruit, count: lastFruit.continuousCount };
        lastFruit = { type: fruits[i], count: 1, continuousCount: 1 };
      }
  
      answer = Math.max(answer, lastFruit.count + secondLastFruit.count);
    }
  
    return answer;
  }
  
  console.log(totalFruit([1, 0, 1, 4, 1, 4, 1, 2, 3]));
  