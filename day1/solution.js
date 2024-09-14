import { input } from "./input.js";

const numbers = [...input].map(Number);

// --- PART 1 ---

console.log(
  numbers.reduce(
    (acc, curr, i, arr) => (curr === (arr[i + 1] ?? arr[0]) ? acc + curr : acc),
    0
  )
);

// --- PART 2 ---

console.log(
  numbers.reduce(
    (acc, curr, i, arr) =>
      curr === arr[(i + arr.length / 2) % arr.length] ? acc + curr : acc,
    0
  )
);
