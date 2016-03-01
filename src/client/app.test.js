describe('calculate', function () {
  var server;
  before(function () {
    // ToDo: move to api-faker
    server = sinon.fakeServer.create();
    // ToDo: read traffic
    server.respondWith(function (request) {
      // ToDo: lookup in traffic
      if (request.url == 'http://localhost:1719/mult/2/4') {
        request.respond(200, {}, JSON.stringify({result: 42}));
      } else {
        request.respond(404, {}, 'Not Found');
      }
    });
    server.autoRespond = true;
    server.autoRespondAfter = 1;
  });
  after(function () {
    server.restore();
  });
  it('returns 42', function () {
    return calculating('mult', 2, 4).then(function (result) {
      result.should.equal(42);
    });
  });
});