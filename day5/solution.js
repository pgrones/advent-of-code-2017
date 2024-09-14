import { input } from "./input.js";

const instructions = input.split("\n").map(Number);

// --- PARt 1 ---

let i = 0;
let pointer = 0;
let instructionsCopy = [...instructions];

while (pointer >= 0 && pointer < instructionsCopy.length) {
  instructionsCopy[pointer]++;
  pointer += instructionsCopy[pointer] - 1;
  i++;
}

console.log(i);

// --- PART 2 ---

i = 0;
pointer = 0;
instructionsCopy = [...instructions];

while (pointer >= 0 && pointer < instructionsCopy.length) {
  const offset = instructionsCopy[pointer] >= 3 ? -1 : 1;
  instructionsCopy[pointer] += offset;
  pointer += instructionsCopy[pointer] - offset;
  i++;
}

console.log(i);
