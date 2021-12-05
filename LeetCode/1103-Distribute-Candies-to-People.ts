function distributeCandies(candies: number, num_people: number): number[] {
    let output = [...Array(num_people)].map(() => 0)
    let currentIndex = 0

    while (candies > 0) {
        if (candies > currentIndex + 1) {
            output[currentIndex % num_people] = output[currentIndex % num_people] + currentIndex + 1
            candies -= currentIndex + 1
        } else {
            output[currentIndex % num_people] = output[currentIndex % num_people] + candies
            candies = 0
        }
        currentIndex++
    }

    return output
};

console.log(distributeCandies(10,3))