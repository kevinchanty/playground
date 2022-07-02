function escapeGhosts(ghosts: number[][], target: number[]): boolean {
  let targetDistance = calculateStep(target, [0, 0]);

  let ghostDistance = ghosts.map((ghost) => calculateStep(ghost, target));
  return ghostDistance.every((distance) => distance > targetDistance);
}

function calculateStep(point1: number[], point2: number[]) {
  const distanceX = Math.abs(point1[0] - point2[0]);
  const distanceY = Math.abs(point1[1] - point2[1]);

  return distanceX + distanceY;
}

calculateStep([0, 0], [0, 0]);
