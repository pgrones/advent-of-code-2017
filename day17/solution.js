const input = 369;

class SpinLock {
  currentPosition = 0;
  buffer = [0];

  constructor(stepSize) {
    this.stepSize = stepSize;
  }

  insert(value) {
    // circular index -> (i % n + n) % n
    // https://stackoverflow.com/questions/17483149/how-to-access-array-in-circular-manner-in-javascript
    const i = this.currentPosition + this.stepSize;
    const n = this.buffer.length;

    this.currentPosition = (((i % n) + n) % n) + 1;

    this.buffer.splice(this.currentPosition, 0, value);
  }
}

const spinLock = new SpinLock(input);

// --- PART 1 ---

for (let i = 1; i <= 2017; i++) {
  spinLock.insert(i);
}

console.log(spinLock.buffer[spinLock.currentPosition + 1]);

// --- PART 2 ---

for (let i = 2018; i <= 50_000_000; i++) {
  spinLock.insert(i);

  if (i % 100000 === 0) console.log(i);
}

console.log(spinLock.buffer[1]);
