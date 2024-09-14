import { input } from "./input.js";

const steps = input.split(",");

const takeStep = (dir, [x, y]) => {
  switch (dir) {
    case "n":
      return [x, y + 1];
    case "ne":
      return [x + 1, y];
    case "nw":
      return [x - 1, y + 1];
    case "se":
      return [x + 1, y - 1];
    case "s":
      return [x, y - 1];
    case "sw":
      return [x - 1, y];
  }
};

const calculateDistance = ([x, y]) =>
  Math.sign(x) === Math.sign(y)
    ? Math.abs(x + y)
    : Math.max(Math.abs(x), Math.abs(y));

// --- PART 1 ---

let goal = [0, 0];

for (const step of steps) {
  goal = takeStep(step, goal);
}

console.log(calculateDistance(goal));

// --- PART 2 ---

goal = [0, 0];
let maxDistance = 0;

for (const step of steps) {
  goal = takeStep(step, goal);
  maxDistance = Math.max(maxDistance, calculateDistance(goal));
}

console.log(maxDistance);

// Wanted to do graph traversal first, but the distance is too large
// There is a way to calculate the manhattan distance on a hex grid:
// https://stackoverflow.com/questions/5084801/manhattan-distance-between-tiles-in-a-hexagonal-grid

// let shortestPathLength = Infinity;

// const traverse = (pathLength = 0, [x, y] = [0, 0], ignoreDir = "") => {
//   if (pathLength >= shortestPathLength || pathLength > steps.length) return;

//   if (x === goal[0] && y === goal[1]) {
//     shortestPathLength = pathLength;
//     return;
//   }

//   ["n", "ne", "nw", "s", "sw", "se"].forEach((dir, i, arr) => {
//     if (dir !== ignoreDir)
//       traverse(
//         pathLength + 1,
//         takeStep(dir, [x, y]),
//         arr[(i + 3) % arr.length]
//       );
//   });
// };

// traverse();

// console.log(shortestPathLength);
