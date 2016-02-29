var api = require('./api-tester');

describe('calculating', function () {
  before(function () {
    return api.serving();
  });

  after(function () {
    api.close();
  });

  it('should work', function () {
    return api.adding(2, 4).then(function (response) {
      response.result.should.equal(42);
    });
  });
});
