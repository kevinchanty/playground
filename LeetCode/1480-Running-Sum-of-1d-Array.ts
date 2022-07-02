function runningSum(nums: number[]): number[] {

    let answer: number[] = [];
    let currentSum = 0

    for (let i = 0; i < nums.length; i++) {
        currentSum += nums[i]
        answer.push(currentSum)
    }

    return answer
};