describe('calculate', function () {
  before(function () {
    var fixture = document.createElement('div');
    fixture.innerHTML = '<input id="operator"><input id="value1"><input id="value2"><span id="result"></span>';
    document.body.appendChild(fixture);
    return api.faking();
  });

  after(function () {
    api.restore();
  });

  for(val1 = 0; val1 < 1; ++val1) {
    for (val2 = 0; val2 < 2; ++val2) {
      (function (val1, val2) {
        it('should add ' + val1 + ' and ' + val2, function () {
          document.getElementById('operator').value = 'ad';
          document.getElementById('value1').value = val1;
          document.getElementById('value2').value = val2;
          return calcClicked().then(function (result) {
            document.getElementById('result').innerHTML.trim().should.equal((val1 + val2).toString());
          });
        });
      })(val1, val2);
    }
  }
});