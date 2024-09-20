import { input } from "./input.js";

class State {
  constructor(id, zeroCase, oneCase) {
    this.id = id;
    this.zeroCase = zeroCase;
    this.oneCase = oneCase;
  }

  process(cursor, tape) {
    const currentValue = tape.has(cursor);

    if (!currentValue) {
      if (this.zeroCase.value) tape.add(cursor);
      else tape.delete(cursor);

      return [cursor + this.zeroCase.offset, this.zeroCase.nextState];
    }

    if (this.oneCase.value) tape.add(cursor);
    else tape.delete(cursor);

    return [cursor + this.oneCase.offset, this.oneCase.nextState];
  }
}

const lines = input.split("\n");
const startState = lines[0].charAt(lines[0].length - 2);
const checkSum = parseInt(lines[1].match(/\d+/)[0]);
const states = [];

for (let i = 3; i < lines.length; i += 10) {
  const state = lines.slice(i, i + 9);

  const id = state[0].charAt(state[0].length - 2);

  const zeroCase = {
    value: state[2].includes("1"),
    offset: state[3].includes("right") ? 1 : -1,
    nextState: state[4].charAt(state[4].length - 2),
  };

  const oneCase = {
    value: state[6].includes("1"),
    offset: state[7].includes("right") ? 1 : -1,
    nextState: state[8].charAt(state[8].length - 2),
  };

  states.push(new State(id, zeroCase, oneCase));
}

// --- PART 1 ---

const tape = new Set();
let cursor = 0;
let currentState = states.find((x) => x.id === startState);

for (let i = 0; i < checkSum; i++) {
  const [nextCursor, nextState] = currentState.process(cursor, tape);

  cursor = nextCursor;
  currentState = states.find((x) => x.id === nextState);
}

console.log(tape.size);
