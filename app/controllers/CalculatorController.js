class CalculatorController {
  constructor() {
    this._service = new CalculatorService();
  }

  calcular() {
    const dependencies = document.querySelector('input[name="dependencia"]:checked').value;
    const knowledge = document.querySelector('input[name="conhecimento"]:checked').value;
    const repetition = document.querySelector('input[name="repeticao"]:checked').value;
    const complexity = document.querySelector('input[name="complexidade"]:checked').value;
    const risk = document.querySelector('input[name="risco"]:checked').value;
    const duration = document.querySelector('input[name="duracao"]:checked').value;

    const calculator = new Calculator({
      dependencies,
      knowledge,
      repetition,
      complexity,
      risk,
      duration,
    });

    this._service.calculate(calculator);
  }
}
