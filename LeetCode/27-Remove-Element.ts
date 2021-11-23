
function removeElement(nums: number[], val: number): number {
    let lastIndex = (nums.indexOf(val))
    while (lastIndex !== -1) {
        nums.splice(lastIndex, 1)
        lastIndex = (nums.indexOf(val))
    }
    return nums[nums.length - 1]
};


const nums = [0,1,2,2,3,0,4,2]
removeElement(nums, 2)
console.log(nums)
