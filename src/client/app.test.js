describe('calculate', function () {
  it('returns 42', function () {
    return calculate('mult', 2, 4).then(function (result) {
      result.should.equal(42);
    });
  });
});