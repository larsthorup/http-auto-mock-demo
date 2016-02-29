function calculate() {
  return new Promise(function (resolve) {
    resolve(42);
  });
}

function calcClicked() {
  var value1 = document.getElementById('value1').value;
  var value2 = document.getElementById('value2').value;
  var operator = document.getElementById('operator').value;
  calculate(operator, value1, value2).then(function (result) {
    document.getElementById('result').innerHTML = result;
  });
}

function app() {
  document.getElementById('calc').addEventListener('click', calcClicked);
}