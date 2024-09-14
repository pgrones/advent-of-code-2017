import { input } from "./input.js";

const rows = input.split("\n").map((x) => x.split(/\s+/g).map(Number));

// --- PART 1 ---

console.log(
  rows.reduce((acc, curr) => acc + Math.max(...curr) - Math.min(...curr), 0)
);

// --- PART 2 ---

const findValue = (numbers) => {
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const [small, large] = [numbers[i], numbers[j]].toSorted((a, b) => a - b);
      if (large % small === 0) return large / small;
    }
  }
};

console.log(rows.reduce((acc, curr) => acc + findValue(curr), 0));
