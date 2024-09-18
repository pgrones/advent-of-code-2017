import { input } from "./input.js";

const map = input.split("\n").map((x) => x.split(""));

const [startX, startY] = [
  Math.floor(map[0].length / 2),
  Math.floor(map.length / 2),
];

const dirs = ["u", "r", "d", "l"];

const getInitialNodes = () => {
  const nodes = new Map();

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      nodes.set([x - startX, y - startY].join(), map[y][x]);
    }
  }

  return nodes;
};

const move = (x, y, dir) => {
  switch (dirs[dir]) {
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

// --- PART 1 ---

let getNextDir = (x, y, dir, nodes) => {
  let i = dir - 1;

  if (nodes.get([x, y].join()) === "#") i = dir + 1;

  return ((i % 4) + 4) % 4;
};

let workOnNode = (x, y) => {
  const key = [x, y].join();

  if (nodes.get(key) === "#") {
    nodes.set(key, ".");
    return 0;
  }

  nodes.set(key, "#");
  return 1;
};

let nodes = getInitialNodes();
let currX = 0;
let currY = 0;
let currDir = 0;
let infectionCounter = 0;

for (let i = 0; i < 10000; i++) {
  currDir = getNextDir(currX, currY, currDir, nodes);
  infectionCounter += workOnNode(currX, currY);
  const [x, y] = move(currX, currY, currDir);
  currX = x;
  currY = y;
}

console.log(infectionCounter);

// --- PART 2 ---

getNextDir = (x, y, dir, nodes) => {
  const key = [x, y].join();
  let i = dir - 1;

  if (nodes.get(key) === "W") i = dir;
  if (nodes.get(key) === "#") i = dir + 1;
  if (nodes.get(key) === "F") i = dir + 2;

  return ((i % 4) + 4) % 4;
};

workOnNode = (x, y) => {
  const key = [x, y].join();
  const state = nodes.get(key) ?? ".";

  if (state === "W") {
    nodes.set(key, "#");
    return 1;
  }

  nodes.set(key, state === "." ? "W" : state === "#" ? "F" : ".");
  return 0;
};

nodes = getInitialNodes();
currX = 0;
currY = 0;
currDir = 0;
infectionCounter = 0;

for (let i = 0; i < 10000000; i++) {
  currDir = getNextDir(currX, currY, currDir, nodes);
  infectionCounter += workOnNode(currX, currY);
  const [x, y] = move(currX, currY, currDir);
  currX = x;
  currY = y;
}

console.log(infectionCounter);
