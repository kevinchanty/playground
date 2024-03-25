package main

import "fmt"

func main() {

	fmt.Printf("%v\n", findDuplicates([]int{4, 3, 2, 7, 8, 2, 3, 1}))

}

func findDuplicates(nums []int) []int {
	// fmt.Printf("nums in start: %v\n", nums)

	answer := []int{}

	for _, v := range nums {
		index := 0
		if v < 0 {
			index = v*-1 - 1
		} else {
			index = v - 1
		}

		nums[index] = nums[index] * -1
		if nums[index] > 0 {
			answer = append(answer, index+1)
		}
	}

	return answer
}
