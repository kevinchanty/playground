// Given an array of integers nums, half of the integers in nums are odd, and the other half are even.

// Sort the array so that whenever nums[i] is odd, i is odd, and whenever nums[i] is even, i is even.

// Return any answer array that satisfies this condition.


// 2 <= nums.length <= 2 * 104
// nums.length is even.
// Half of the integers in nums are even.
// 0 <= nums[i] <= 1000


// Example 1:

// Input: nums = [4,2,5,7]
// Output: [4,5,2,7]
// Explanation: [4,7,2,5], [2,5,4,7], [2,7,4,5] would also have been accepted.

// Example 2:

// Input: nums = [2,3]
// Output: [2,3]


function sortArrayByParityII(nums: number[]): number[] {
	let tempEven = [];
	let tempOdd = [];
	let evenCurrent = 0;
	let oddCurrent = 0;
	let answer = [];

	let shouldBeEven = true;
	for (let i = 0; i < nums.length; i++) {
		if (!(nums[i] % 2)) {
			tempEven.push(nums[i])
		} else{
			tempOdd.push(nums[i])
		}
	}

	for (let i = 0; i<nums.length;i++) {
		if (i % 2 === 0) {
			answer.push(tempEven[evenCurrent]);
			evenCurrent++
		}else {
			answer.push(tempOdd[oddCurrent]);
			oddCurrent++
		}
	}

	return answer;
};

console.log("[4,2,5,7]",sortArrayByParityII([4,2,5,7]));
console.log("[2,3]",sortArrayByParityII([2,3]));