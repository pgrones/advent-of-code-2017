import { input } from "./input.js";

const instructions = input.split("\n");

class Computer {
  pointer = 0;
  lastSound = null;
  registers = new Map();
  queue = [];
  sendCounter = 0;
  otherComputer = null;
  waiting = false;

  constructor(instructions, id) {
    this.instructions = instructions;
    this.id = id;

    if (id !== undefined) {
      this.registers.set("p", id);
    }
  }

  #getRegisterValue(registerOrValue) {
    if (/-*\d+/.test(registerOrValue)) return parseInt(registerOrValue);

    if (!this.registers.has(registerOrValue))
      this.registers.set(registerOrValue, 0);

    return this.registers.get(registerOrValue);
  }

  snd(register) {
    if (this.id === undefined) {
      this.lastSound = this.#getRegisterValue(register);
      return;
    }

    if (this.id === 1) this.sendCounter++;

    this.otherComputer.que(this.#getRegisterValue(register));
  }

  rcv(register) {
    if (this.id === undefined) {
      if (!this.#getRegisterValue(register)) return;

      return this.lastSound;
    }

    if (!this.queue.length) {
      this.waiting = true;
      return;
    }

    this.waiting = false;
    this.set(register, this.queue.pop());
  }

  que(value) {
    this.queue.unshift(value);
  }

  set(register, registerOrValue) {
    this.registers.set(register, this.#getRegisterValue(registerOrValue));
  }

  add(register, registerOrValue) {
    this.registers.set(
      register,
      this.#getRegisterValue(register) + this.#getRegisterValue(registerOrValue)
    );
  }

  mul(register, registerOrValue) {
    this.registers.set(
      register,
      this.#getRegisterValue(register) * this.#getRegisterValue(registerOrValue)
    );
  }

  mod(register, registerOrValue) {
    this.registers.set(
      register,
      this.#getRegisterValue(register) % this.#getRegisterValue(registerOrValue)
    );
  }

  jgz(register, registerOrValue) {
    if (this.#getRegisterValue(register) <= 0) return;

    this.pointer += this.#getRegisterValue(registerOrValue);

    return "jumped";
  }

  next() {
    if (this.pointer < 0 || this.pointer >= this.instructions.length) {
      this.waiting = true;
      return;
    }

    const [operation, register, registerOrValue] =
      this.instructions[this.pointer].split(" ");

    const result = this[operation](register, registerOrValue);

    if (this.waiting) return;

    if (result !== "jumped") this.pointer++;
  }

  run() {
    let recoveredSound = null;

    while (!recoveredSound) {
      const [operation, register, registerOrValue] =
        this.instructions[this.pointer].split(" ");

      recoveredSound = this[operation](register, registerOrValue);

      if (recoveredSound !== "jumped") this.pointer++;
      else recoveredSound = null;
    }

    console.log(recoveredSound);
  }
}

// --- PART 1 ---

new Computer(instructions).run();

// --- PART 2 ---

const computer0 = new Computer(instructions, 0);
const computer1 = new Computer(instructions, 1);

computer0.otherComputer = computer1;
computer1.otherComputer = computer0;

while (!computer0.waiting || !computer1.waiting) {
  while (!computer0.waiting) computer0.next();
  while (!computer1.waiting) computer1.next();

  computer0.next();
  computer1.next();
}

console.log(computer1.sendCounter);
