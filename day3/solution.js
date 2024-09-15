const input = 312051;

// --- PART 1 ---

let squareLength = 3;
let counter = 2;
let x = 0;
let y = 0;

const checkCounter = () => {
  if (counter === input) {
    console.log(Math.abs(x) + Math.abs(y));
    return true;
  }

  counter++;
  return false;
};

const traceCircle = () => {
  x++;
  if (checkCounter()) return false;

  for (let i = 0; i < squareLength - 2; i++) {
    y++;
    if (checkCounter()) return false;
  }

  for (let i = squareLength; i > 1; i--) {
    x--;
    if (checkCounter()) return false;
  }

  for (let i = 0; i < squareLength - 1; i++) {
    y--;
    if (checkCounter()) return false;
  }

  for (let i = 0; i < squareLength - 1; i++) {
    x++;
    if (checkCounter()) return false;
  }

  squareLength = squareLength + 2;

  return true;
};

while (traceCircle());

// --- PART 2 ---

let currentValue = 2;
const values = [{ value: 1, x: 0, y: 0 }];
squareLength = 3;
x = 0;
y = 0;

const checkValue = () => {
  const neighbors = [
    values.find((i) => i.x === x + 1 && i.y === y)?.value,
    values.find((i) => i.x === x + 1 && i.y === y + 1)?.value,
    values.find((i) => i.x === x && i.y === y + 1)?.value,
    values.find((i) => i.x === x - 1 && i.y === y + 1)?.value,
    values.find((i) => i.x === x - 1 && i.y === y)?.value,
    values.find((i) => i.x === x - 1 && i.y === y - 1)?.value,
    values.find((i) => i.x === x && i.y === y - 1)?.value,
    values.find((i) => i.x === x + 1 && i.y === y - 1)?.value,
  ].filter(Boolean);

  currentValue = neighbors.reduce((acc, curr) => acc + curr);
  values.push({ value: currentValue, x, y });

  if (currentValue > input) {
    console.log(currentValue);
    return true;
  }

  return false;
};

const calculateCircle = () => {
  x++;
  if (checkValue()) return false;

  for (let i = 0; i < squareLength - 2; i++) {
    y++;
    if (checkValue()) return false;
  }

  for (let i = squareLength; i > 1; i--) {
    x--;
    if (checkValue()) return false;
  }

  for (let i = 0; i < squareLength - 1; i++) {
    y--;
    if (checkValue()) return false;
  }

  for (let i = 0; i < squareLength - 1; i++) {
    x++;
    if (checkValue()) return false;
  }

  squareLength = squareLength + 2;

  return true;
};

while (calculateCircle());
