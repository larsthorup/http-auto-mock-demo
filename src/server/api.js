var restify = require('restify');

function add (req, res, next) {
  var response = {result: 42};
  res.send(response);
  next();
}

function serving () {
  return new Promise(function (resolve) {
    var server = restify.createServer();
    server.get('/add/2/4', add);
    server.listen(1719, function () {
      resolve(server);
    });
  });
}

module.exports = {
  serving: serving
};