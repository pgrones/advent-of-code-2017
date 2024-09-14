import { input } from "./input.js";

const hash = (list, lengths, initialCurrentPosition, initialSkipSize) => {
  let currentPosition = initialCurrentPosition;
  let skipSize = initialSkipSize;

  for (const length of lengths) {
    const slice = list.slice(currentPosition, currentPosition + length);

    if (slice.length < length) {
      slice.push(...list.slice(0, length - slice.length));
    }

    slice.reverse();

    for (let i = 0; i < slice.length; i++) {
      list[(currentPosition + i) % list.length] = slice[i];
    }

    currentPosition = (currentPosition + length + skipSize) % list.length;
    skipSize++;
  }

  return [currentPosition, skipSize];
};

// --- PART 1 ---

let lengths = input.split(",").map(Number);
let list = new Array(256).fill(null).map((_, i) => i);
let currentPosition = 0;
let skipSize = 0;

hash(list, lengths, currentPosition, skipSize);

console.log(list[0] * list[1]);

// --- PART 2 ---

lengths = [...[...input].map((x) => x.charCodeAt(0)), 17, 31, 73, 47, 23];
list = new Array(256).fill(null).map((_, i) => i);
currentPosition = 0;
skipSize = 0;

for (let i = 0; i < 64; i++) {
  const [newCurrentPosition, newSkipSize] = hash(
    list,
    lengths,
    currentPosition,
    skipSize
  );
  currentPosition = newCurrentPosition;
  skipSize = newSkipSize;
}

const denseHash = [];

for (let i = 0; i < list.length; i += 16) {
  const slice = list.slice(i, i + 16);
  denseHash.push(slice.reduce((acc, curr) => acc ^ curr));
}

console.log(denseHash.map((x) => x.toString(16).padStart(2, "0")).join(""));
