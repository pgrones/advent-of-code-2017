import { input } from "./input.js";

const instructions = input.split("\n");

class Computer {
  registers = new Map();
  highestValue = -Infinity;

  constructor(instructions) {
    this.instructions = instructions;
  }

  inc(register, value) {
    this.registers.set(register, this.registers.get(register) + value);
  }

  dec(register, value) {
    this.registers.set(register, this.registers.get(register) - value);
  }

  evaluateCondition(register, operand, compareValue) {
    const value = this.registers.get(register);
    return eval(`${value} ${operand} ${compareValue}`);
  }

  run() {
    for (const instruction of this.instructions) {
      const [registerOperation, condition] = instruction.split(" if ");
      const [register, operation, value] = registerOperation.split(" ");
      const [cRegister, operand, compareValue] = condition.split(" ");

      if (!this.registers.has(register)) this.registers.set(register, 0);
      if (!this.registers.has(cRegister)) this.registers.set(cRegister, 0);

      if (!this.evaluateCondition(cRegister, operand, parseInt(compareValue)))
        continue;

      this[operation](register, parseInt(value));

      this.highestValue = Math.max(
        this.highestValue,
        Math.max(...this.registers.values())
      );
    }

    return [Math.max(...this.registers.values()), this.highestValue];
  }
}

// --- PART 1 AND 2---

console.log(...new Computer(instructions).run());
