import { input } from "./input.js";

const danceMoves = input.split(",").map((x) => ({
  move: x.charAt(0),
  a: x.substring(1, x.indexOf("/") === -1 ? undefined : x.indexOf("/")),
  b: x.substring(x.indexOf("/") + 1),
}));

const spin = (dancers, spins) => {
  const minSpins = (spins % dancers.length) * -1;

  return [...dancers.slice(minSpins), ...dancers.slice(0, minSpins)];
};

const exchange = (dancers, a, b) => {
  const dancerCopy = [...dancers];

  const temp = dancerCopy[a];
  dancerCopy[a] = dancerCopy[b];
  dancerCopy[b] = temp;

  return dancerCopy;
};

const partner = (dancers, a, b) =>
  exchange(dancers, dancers.indexOf(a), dancers.indexOf(b));

let dancers = new Array(16)
  .fill(null)
  .map((_, i) => String.fromCharCode(i + 97));

const dance = () => {
  for (const { move, a, b } of danceMoves) {
    if (move === "s") {
      dancers = spin(dancers, parseInt(a));
    }

    if (move === "x") {
      dancers = exchange(dancers, parseInt(a), parseInt(b));
    }

    if (move === "p") {
      dancers = partner(dancers, a, b);
    }
  }
};

// --- PART 1 ---

dance();
console.log(dancers.join(""));

// --- PART 2 ---

const uniqueLineups = new Set([dancers.join("")]);

for (let i = 1; i < 1_000_000_000; i++) {
  dance();
  const lineup = dancers.join("");

  if (uniqueLineups.has(lineup)) {
    const cycleLength = uniqueLineups.size - [...uniqueLineups].indexOf(lineup);
    const remainingDances = (1_000_000_000 - i - 1) % cycleLength;

    for (let j = 0; j < remainingDances; j++) {
      dance();
    }

    console.log(dancers.join(""));
    break;
  }

  uniqueLineups.add(lineup);
}
