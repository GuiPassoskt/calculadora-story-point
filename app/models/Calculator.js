class Calculator {
  constructor({ dependencies, knowledge, repetition, complexity, risk, duration }) {
    this.dependencies = dependencies;
    this.knowledge = knowledge;
    this.repetition = repetition;
    this.complexity = complexity;
    this.risk = risk;
    this.duration = duration;
    Object.freeze(this);
  }

  toString() {
    return JSON.stringify(this);
  }
}
