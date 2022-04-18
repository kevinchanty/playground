// Given an m x n matrix of distinct numbers, return all lucky numbers in the matrix in any order.

// A lucky number is an element of the matrix such that it is the minimum element in its row and maximum in its column.

// m == mat.length
// n == mat[i].length
// 1 <= n, m <= 50
// 1 <= matrix[i][j] <= 105.
// All elements in the matrix are distinct.

function luckyNumbers(matrix: number[][]): number[] {
  const m = matrix.length;
  const n = matrix[0].length;
  let answer: number[] = [];
  let columnMin: number[] = [];

  function calculateColumnMin(columnIndex: number) {
    //not
    let column: number[] = [];
    for (let i = 0; i < m; i++) {
      column.push(matrix[i][columnIndex]);
    }

    return Math.max(...column);
  }

  for (let i = 0; i < m; i++) {
    const rowMin = Math.min(...matrix[i]); //must
    if (rowMin === calculateColumnMin(matrix[i].indexOf(rowMin))) {
      answer.push(rowMin);
    }
  }

  return answer;
}

console.log(
  "[[3,7,8],[9,11,13],[15,16,17]]:",
  luckyNumbers([
    [3, 7, 8],
    [9, 11, 13],
    [15, 16, 17],
  ])
);
console.log(
  "[[1,10,4,2],[9,3,8,7],[15,16,17,12]]:",
  luckyNumbers([
    [1, 10, 4, 2],
    [9, 3, 8, 7],
    [15, 16, 17, 12],
  ])
);
console.log(
  "[[7,8],[1,2]]:",
  luckyNumbers([
    [7, 8],
    [1, 2],
  ])
);
