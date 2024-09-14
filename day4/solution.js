import { input } from "./input.js";

const phrases = input.split("\n").map((x) => x.split(" "));

// --- PART 1 ---

let validCount = 0;

outer: for (const phrase of phrases) {
  for (let i = 0; i < phrase.length - 1; i++) {
    for (let j = i + 1; j < phrase.length; j++) {
      if (phrase[i] === phrase[j]) continue outer;
    }
  }

  validCount++;
}

console.log(validCount);

// --- PART 2 ---

const createMap = (word) => {
  const map = new Map();

  for (const char of word) {
    map.set(char, (map.get(char) ?? 0) + 1);
  }

  return map;
};

const isAnagram = (word1, word2) =>
  word1.size === word2.size &&
  [...word1.entries()].every(([char, amount]) => word2.get(char) === amount);

validCount = 0;

outer: for (const phrase of phrases) {
  for (let i = 0; i < phrase.length - 1; i++) {
    for (let j = i + 1; j < phrase.length; j++) {
      const word1 = createMap(phrase[i]);
      const word2 = createMap(phrase[j]);

      if (isAnagram(word1, word2)) continue outer;
    }
  }

  validCount++;
}

console.log(validCount);
