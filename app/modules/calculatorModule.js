document.querySelector('#calcular').addEventListener('click', () => {
  const controller = new CalculatorController();
  controller.calcular();
});

function cleanCalculate() {
  document.querySelector('#points').innerHTML = '';
  document.querySelector('#variacao').innerHTML = '';
}
