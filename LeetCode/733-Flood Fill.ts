function floodFill(image: number[][], sr: number, sc: number, newColor: number): number[][] {
    const lengthX = image.length
    const lengthY = image[0].length
    const prevColor = image[sr][sc]

    if (prevColor === newColor) { return image }

    function flood(x: number, y: number) {
        
        if (image[x][y] === prevColor) {
            image[x][y] = newColor

            if (x >= 1) { flood(x - 1, y) }
            if (y < lengthY -1) { flood(x, y + 1) }
            if (x < lengthX -1) { flood(x + 1, y) }
            if (y >= 1) { flood(x, y - 1) }
        }
    }

    flood(sr, sc)
    return image
};

console.log(floodFill([[1, 1, 1], [1, 1, 0], [1, 0, 1]], 1, 1, 2))
