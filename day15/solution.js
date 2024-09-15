import { input } from "./input.js";

const [initialValueA, initialValueB] = input
  .split("\n")
  .map((x) => Number(/\d+/.exec(x)[0]));

function* generator(initialValue, factor, criteria = 1) {
  let value = initialValue;

  while (true) {
    value = (value * factor) % 2147483647;
    if (value % criteria === 0) yield value.toString(2).slice(-16);
  }
}

// --- PART 1 ---

const generatorA = generator(initialValueA, 16807);
const generatorB = generator(initialValueB, 48271);

let total = 0;

for (let i = 0; i < 40_000_000; i++) {
  const valueA = generatorA.next().value;
  const valueB = generatorB.next().value;

  if (valueA === valueB) total++;
}

console.log(total);

// --- PART 2 ---

const pickyGeneratorA = generator(initialValueA, 16807, 4);
const pickyGeneratorB = generator(initialValueB, 48271, 8);

total = 0;

for (let i = 0; i < 5_000_000; i++) {
  const valueA = pickyGeneratorA.next().value;
  const valueB = pickyGeneratorB.next().value;

  if (valueA === valueB) total++;
}

console.log(total);
