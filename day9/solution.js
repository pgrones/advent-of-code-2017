import { input } from "./input.js";

// --- PART 1 ---

let stream = input;

stream = stream.replaceAll(/!!/g, "");
stream = stream.replaceAll(/!./g, "");
stream = stream.replaceAll(/<.*?>/g, "");
stream = stream.replaceAll(/[^\{\}]/g, "");

let score = 0;
let depth = 0;
for (const char of stream) {
  if (char === "{") {
    depth++;
    continue;
  }

  score += depth;
  depth--;
}

console.log(score);

// --- PART 2 ---

stream = input;

stream = stream.replaceAll(/!!/g, "");
stream = stream.replaceAll(/!./g, "");

console.log(
  [...stream.matchAll(/(?<=<).*?(?=>)/g)].reduce(
    (acc, curr) => acc + curr[0].length,
    0
  )
);
