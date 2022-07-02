function bitwiseComplement(n: number): number {
    const binaryString = n.toString(2);
  
    let answer = "";
    for (const letter of binaryString) {
      answer += letter === "1" ? "0" : "1";
    }
    return parseInt(answer, 2);
  }
  