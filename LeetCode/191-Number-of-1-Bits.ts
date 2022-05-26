function hammingWeight1(n: number): number {
  const binaryString = n.toString(2);

  let answer = 0;
  for (const digit of binaryString) {
    answer += digit === "1" ? 1 : 0;
  }

  return answer;
}

function hammingWeight2(n: number): number {
  const binaryString = n.toString(2);
  return binaryString.split("").filter((d) => d === "1").length;
}

function hammingWeight(n: number): number {
  return (n >>> 0)
    .toString(2)
    .split("")
    .filter((b) => b === "1").length;
}

console.log(hammingWeight(0b00000000000000000000000000001011));
console.log(0b00000000000000000000000000001011 >>> 0);
