import { input } from "./input.js";

const instructions = input.split("\n");

class Coprocessor {
  mulCounter = 0;
  pointer = 0;
  registers = new Map([
    ["a", 0],
    ["b", 0],
    ["c", 0],
    ["d", 0],
    ["e", 0],
    ["f", 0],
    ["g", 0],
    ["h", 0],
  ]);

  constructor(instructions) {
    this.instructions = instructions;
  }

  #getRegisterValue(registerOrValue) {
    if (/-*\d+/.test(registerOrValue)) return parseInt(registerOrValue);

    return this.registers.get(registerOrValue);
  }

  set(register, registerOrValue) {
    this.registers.set(register, this.#getRegisterValue(registerOrValue));
  }

  sub(register, registerOrValue) {
    this.registers.set(
      register,
      this.#getRegisterValue(register) - this.#getRegisterValue(registerOrValue)
    );
  }

  mul(register, registerOrValue) {
    this.mulCounter++;

    this.registers.set(
      register,
      this.#getRegisterValue(register) * this.#getRegisterValue(registerOrValue)
    );
  }

  jnz(register, registerOrValue) {
    if (this.#getRegisterValue(register) === 0) return;

    this.pointer += this.#getRegisterValue(registerOrValue);
    return "jumped";
  }

  run() {
    while (this.pointer >= 0 && this.pointer < this.instructions.length) {
      const [operation, register, registerOrValue] =
        this.instructions[this.pointer].split(" ");

      const jumped = this[operation](register, registerOrValue);

      if (!jumped) this.pointer++;
    }

    console.log(this.mulCounter);
  }
}

// --- PART 1 ---

new Coprocessor(instructions).run();
