describe('calculate', function () {
  before(function () {
    return api.faking();
  });

  after(function () {
    api.restore();
  });

  for(val1 = 0; val1 < 30; ++val1) {
    for (val2 = 0; val2 < 30; ++val2) {
      (function (val1, val2) {
        it('should add ' + val1 + ' and ' + val2, function () {
          return calculating('ad', val1, val2).then(function (result) {
            result.should.equal(val1 + val2);
          });
        });
      })(val1, val2);
    }
  }
});