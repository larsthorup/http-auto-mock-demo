function requesting (path) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:1719' + path, true);
    xhr.onload = function () {
      var response = JSON.parse(this.responseText);
      if(this.status === 200) {
        resolve(response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    xhr.onerror = function () {
      reject('failed');
    };
    xhr.send();
  });
}

function calculating(operator, value1, value2) {
  return requesting('/' + operator + '/' + value1 + '/' + value2).then(function (response) {
    return response.result;
  });
}

function calcClicked() {
  var value1 = document.getElementById('value1').value;
  var value2 = document.getElementById('value2').value;
  var operator = document.getElementById('operator').value;
  return calculating(operator, value1, value2).then(function (result) {
    document.getElementById('result').innerHTML = result;
  });
}

function bindEvents() {
  document.getElementById('calc').addEventListener('click', calcClicked);
}

function app() {
  bindEvents();
}