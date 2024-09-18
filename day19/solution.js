import { input } from "./input.js";

const getNextDir = (x, y, dir, map) => {
  const [nextX, nextY] = takeStep(x, y, dir);

  if (map[nextY][nextX]) return dir;

  if (map[y][x - 1] && dir !== "r") return "l";
  if (map[y][x + 1] && dir !== "l") return "r";
  if (map[y - 1]?.[x] && dir !== "d") return "u";
  if (map[y + 1]?.[x] && dir !== "u") return "d";

  return null;
};

const takeStep = (x, y, dir) => {
  switch (dir) {
    case "u":
      return [x, y - 1];
    case "d":
      return [x, y + 1];
    case "l":
      return [x - 1, y];
    case "r":
      return [x + 1, y];
  }
};

const map = input.split("\n").map((x) => x.split("").map((y) => y.trim()));

const start = [map[0].findIndex((x) => x === "|"), 0];
const startDir = "d";

// --- PART 1 & 2---

let dir = startDir;
let x = start[0];
let y = start[1];
let letters = "";
let steps = 1;

while (true) {
  const nextDir = getNextDir(x, y, dir, map);

  if (!nextDir) break;

  const [nextX, nextY] = takeStep(x, y, nextDir);

  const letter = map[nextY][nextX];
  if (letter.charCodeAt(0) >= 65 && letter.charCodeAt(0) <= 90)
    letters += letter;

  x = nextX;
  y = nextY;
  dir = nextDir;
  steps++;
}

console.log(letters);
console.log(steps);
