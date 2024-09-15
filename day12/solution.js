import { input } from "./input.js";

const connections = input.split("\n").map((x) =>
  x
    .split(" <-> ")
    .map((y, i) => (i === 0 ? Number(y) : y.split(", ").map(Number)))
    .flat()
);

const connectionsMap = [];

for (const [index, ...conn] of connections) {
  connectionsMap[index] = conn;
}

// --- PART 1 ---

const traverse = (id, connectionsMap, connections = new Set()) => {
  if (connections.has(id)) return connections;

  connections.add(id);
  const connectedIds = connectionsMap[id];

  for (const connectedId of connectedIds.filter((x) => !connections.has(x))) {
    for (const newConnection of traverse(
      connectedId,
      connectionsMap,
      connections
    )) {
      connections.add(newConnection);
    }
  }

  return connections;
};

console.log(traverse(0, connectionsMap).size);

// --- PART 2 ---

const groups = [];

for (let i = 0; i < connectionsMap.length; i++) {
  if (!groups.some((x) => x.has(i))) groups.push(traverse(i, connectionsMap));
}

console.log(groups.length);
