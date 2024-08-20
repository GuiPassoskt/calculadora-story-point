class CalculatorService {
  constructor() {
    this.points = 0;
    this.previous = 0;
    this.next = 0;
  }

  answerQuestion(t, e) {
    this.points = -1;
    this[t] = e;
  }

  getIsChoiceSelected(t, e) {
    return this[t] === e;
  }

  getAllQuestionsAnswered({ dependencies, knowledge, repetition, complexity, risk, duration }) {
    return (
      null !== dependencies &&
      null !== knowledge &&
      null !== repetition &&
      null !== complexity &&
      null !== risk &&
      null !== duration
    );
  }

  getFirstMultiplier({ duration, dependencies, complexity, knowledge, repetition }) {
    let t = 100;

    if ('high' === duration) {
      t += 20;
    } else if ('mid' === duration) {
      t += 10;
    }

    if ('high' === dependencies) {
      t += 15;
    }

    if ('high' === complexity) {
      if ('high' === knowledge) {
        t -= 15;
      } else if ('mid' === knowledge) {
        t -= 5;
      }
    } else if ('mid' === complexity) {
      if ('high' === knowledge) {
        t += 20;
      } else if ('mid' === knowledge) {
        t += 12;
      }
    }

    if ('high' === repetition) {
      t -= 10;
    } else if ('mid' === repetition) {
      t -= 5;
    }

    return t;
  }

  getSecondMultiplier({ risk, complexity, knowledge }) {
    let t = 100;

    if ('high' === risk) {
      t += 25;
    } else if ('mid' === risk) {
      t += 10;
    }

    if ('high' === complexity) {
      if ('high' === knowledge) {
        t -= 30;
      } else if ('mid' === knowledge) {
        t -= 15;
      }
    } else if ('mid' === complexity) {
      if ('high' === knowledge) {
        t -= 20;
      } else if ('mid' === knowledge) {
        t -= 12;
      }
    }

    return t;
  }

  getHighRiskEstimate({ duration, dependencies, repetition, knowledge, complexity }) {
    let t = 3;

    if ('high' === duration) {
      t += 8;
    } else if ('mid' === duration) {
      t += 5;
    }

    if ('high' === dependencies) {
      t += 13;
    } else if ('mid' === dependencies) {
      t += 5;
    }

    const e = [1, 1.6, 2.6][['high', 'mid', 'low'].indexOf(knowledge)];
    const n = ['low', 'mid', 'high'].indexOf(repetition);

    if ('high' === complexity) {
      t += 5 * e;
      t -= n;
    } else if ('mid' === complexity) {
      t += Math.ceil(3 * e);
      t -= Math.ceil(2.1 * n);
    } else {
      t += Math.ceil(e);
    }

    return t;
  }

  getMediumRiskEstimate({ duration, dependencies, complexity, knowledge, repetition }) {
    let t = 2;

    if ('high' === duration) {
      t += 8;
    } else if ('mid' === duration) {
      t += 3;
    }

    if ('high' === dependencies) {
      t += 5;
    } else if ('mid' === dependencies) {
      t += 3;
    }

    if ('low' !== complexity) {
      const e = [1, 1, 1.5][['high', 'mid', 'low'].indexOf(knowledge)];
      const n = ['low', 'mid', 'high'].indexOf(repetition);
      const o = 'high' === complexity ? 3 : 2;

      t += Math.ceil(o * e);
      t -= n;
    }

    return t;
  }

  getLowRiskEstimate({ duration, dependencies, complexity }) {
    let t = 1;

    if ('high' === duration) {
      t += 6;
    } else if ('mid' === duration) {
      t += 3;
    }

    if ('high' === dependencies) {
      t += 4;
    } else if ('mid' === dependencies) {
      t += 2;
    }

    if ('high' === complexity) {
      t += 3;
    } else if ('mid' === complexity) {
      t += 2;
    }

    return t;
  }

  getEstimatedPoints(calculator) {
    if ('high' === calculator.risk) {
      return this.getHighRiskEstimate({ ...calculator });
    } else if ('mid' === this.risk) {
      return this.getMediumRiskEstimate({ ...calculator });
    } else {
      return this.getLowRiskEstimate({ ...calculator });
    }
  }

  getAverage(t, e) {
    return (t / 100 + e / 100) / 2;
  }

  calculate(calculator) {
    const t = this.getAverage(this.getFirstMultiplier({ ...calculator }), this.getSecondMultiplier({ ...calculator }));

    this.points = Math.round(this.getEstimatedPoints(calculator) * t);

    document.querySelector('#points').innerHTML = `Pontos de história: ${this.points}`;

    this.setTermsInSequence();

    document.querySelector('#variacao').innerHTML = `Variando entre ${this.previous} e ${this.next}.`;
  }

  setTermsInSequence() {
    const t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
    const e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
    const n = t + e;

    if (this.points > t && this.points <= n) {
      this.previous = t;
      this.next = n;
    } else if (this.points <= t && this.points >= e) {
      this.previous = e;
      this.next = t;
    } else if (this.points > n) {
      this.setTermsInSequence(n, t);
    }
  }
}
