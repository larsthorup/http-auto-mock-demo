var restify = require('restify');

function calculate (op, val1, val2) {
  switch(op) {
    case 'add':
      // if(val1 == 1) return -4;
      return val1 + val2;
    case 'mult':
      return val1 * val2;
  }
}

function calcHandler (req, res, next) {
  var result = calculate(req.params.op, parseInt(req.params.val1), parseInt(req.params.val2));
  var response = {result: result};
  res.send(response);
  next();
}

function serving () {
  return new Promise(function (resolve) {
    var server = restify.createServer();
    server.pre(restify.CORS());
    server.get('/:op/:val1/:val2', calcHandler);
    server.listen(1719, function () {
      resolve(server);
    });
  });
}

module.exports = {
  serving: serving
};