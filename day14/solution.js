const input = "wenycdww";

const createHash = (key) => {
  const createKnotHash = (
    list,
    lengths,
    initialCurrentPosition,
    initialSkipSize
  ) => {
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

  const lengths = [...[...key].map((x) => x.charCodeAt(0)), 17, 31, 73, 47, 23];
  const list = new Array(256).fill(null).map((_, i) => i);
  let currentPosition = 0;
  let skipSize = 0;

  for (let i = 0; i < 64; i++) {
    const [newCurrentPosition, newSkipSize] = createKnotHash(
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

  return denseHash.map((x) => x.toString(16).padStart(2, "0")).join("");
};

const hexToBinary = (hex) => {
  let result = "";

  hex.split("").forEach((str) => {
    result += parseInt(str, 16).toString(2).padStart(4, "0");
  });

  return result;
};

// --- PART 1 ---

let used = 0;

for (let i = 0; i < 128; i++) {
  used += hexToBinary(createHash(input + "-" + i)).replaceAll("0", "").length;
}

console.log(used);

// --- PART 2 ---

const grid = [];

for (let i = 0; i < 128; i++) {
  grid.push([...hexToBinary(createHash(input + "-" + i))]);
}

const markRegion = (x, y, grid) => {
  if (grid[y][x] !== "1") return 0;

  grid[y][x] = "x";

  if (x - 1 >= 0) markRegion(x - 1, y, grid);
  if (x + 1 < 128) markRegion(x + 1, y, grid);
  if (y - 1 >= 0) markRegion(x, y - 1, grid);
  if (y + 1 < 128) markRegion(x, y + 1, grid);

  return 1;
};

let regions = 0;

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[0].length; x++) {
    regions += markRegion(x, y, grid);
  }
}

console.log(regions);
