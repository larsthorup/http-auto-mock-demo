var api = require('./api-tester');

describe('calculating', function () {
  before(function () {
    return api.serving();
  });

  after(function () {
    api.close();
  });

  for(val1 = 0; val1 < 30; ++val1) {
    for (val2 = 0; val2 < 30; ++val2) {
      (function (val1, val2) {
        it('should add ' + val1 + ' and ' + val2, function () {
          return api.adding(val1, val2).then(function (response) {
            var result = response.result !== undefined ? response.result : response.answer;
            result.should.equal(val1 + val2);
          });
        });
      })(val1, val2);
    }
  }
});
