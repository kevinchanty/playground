export {};

function maxNumberOfFamilies(n: number, reservedSeats: number[][]): number {
  let mappedReserved: Record<number, number[]> = {};

  for (let reserved of reservedSeats) {
    if (!mappedReserved[reserved[0]]) {
      mappedReserved[reserved[0]] = [reserved[1]];
    } else {
      mappedReserved[reserved[0]].push(reserved[1]);
    }
  }

  let answer = 0;
  for (let reservedRow of Object.values(mappedReserved)) {
    answer += calculateFamily(reservedRow);
  }

  answer += (n - Object.keys(mappedReserved).length) * 2;
  return answer;
}

function calculateFamily(reserved: number[]) {
  let answer = 0;
  let continute = 0;

  let leftAisle1 = !reserved.includes(2) && !reserved.includes(3);
  let rightAisle1 = !reserved.includes(4) && !reserved.includes(5);
  let leftAisle2 = !reserved.includes(6) && !reserved.includes(7);
  let rightAisle2 = !reserved.includes(8) && !reserved.includes(9);

  if (leftAisle1 && rightAisle1) {
    answer++;
    if (leftAisle2 && rightAisle2) {
      answer++;
    }
  } else if ((rightAisle1 && leftAisle2) || (leftAisle2 && rightAisle2)) {
    answer++;
  }
  console.log(answer);
  return answer;
}

console.log(
  maxNumberOfFamilies(3, [
    [1, 2],
    [1, 3],
    [1, 8],
    [2, 6],
    [3, 1],
    [3, 10],
  ])
);
