import { input } from "./input.js";

const layers = input.split("\n").map((x) => x.split(": ").map(Number));

class Layer {
  travelsDown = true;
  currentPosition = 1;

  constructor(depth) {
    this.depth = depth;
  }

  isAtTop() {
    return this.currentPosition === 1;
  }

  reset() {
    this.travelsDown = true;
    this.currentPosition = 1;
  }

  takeSnapshot() {
    this.snapshot = {
      travelsDown: this.travelsDown,
      currentPosition: this.currentPosition,
    };
  }

  revert() {
    if (this.snapshot) {
      this.travelsDown = this.snapshot.travelsDown;
      this.currentPosition = this.snapshot.currentPosition;
    }
  }

  move() {
    if (this.travelsDown && this.depth !== this.currentPosition) {
      this.currentPosition++;
      return;
    }

    if (!this.travelsDown && this.currentPosition !== 1) {
      this.currentPosition--;
      return;
    }

    if (this.travelsDown) {
      this.currentPosition--;
      this.travelsDown = false;
      return;
    }

    this.currentPosition++;
    this.travelsDown = true;
  }
}

const fireWall = [];

for (const [index, depth] of layers) {
  fireWall[index] = new Layer(depth);
}

// --- PART 1 ---

let severity = 0;

for (let i = 0; i < fireWall.length; i++) {
  const layer = fireWall[i];

  if (layer?.isAtTop()) severity += i * layer.depth;

  fireWall.forEach((x) => x?.move());
}

console.log(severity);

// --- PART 2 ---

fireWall.forEach((x) => x?.reset());

outer: for (let delay = 1; ; delay++) {
  fireWall.forEach((x) => {
    x?.revert();
    x?.move();
    x?.takeSnapshot();
  });

  for (let i = 0; i < fireWall.length; i++) {
    const layer = fireWall[i];

    if (layer?.isAtTop()) continue outer;

    fireWall.forEach((x) => x?.move());
  }

  console.log(delay);
  break;
}
