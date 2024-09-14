import { input } from "./input.js";

const banks = input.split(/\s+/).map(Number);

// --- PART 1 ---

const configurations = new Set();
let i = 0;

while (!configurations.has(banks.join())) {
  configurations.add(banks.join());
  i++;

  let index = banks.indexOf(Math.max(...banks));
  const block = banks[index];
  banks[index] = 0;

  for (let i = 0; i < block; i++) {
    index = (index + 1) % banks.length;
    banks[index] += 1;
  }
}

console.log(i);

// --- PART 2 ---

console.log(configurations.size - [...configurations].indexOf(banks.join()));
