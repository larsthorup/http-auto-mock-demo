var request = require('request-har-capture');
var api = require('./api');

var server;

function serving () {
  return api.serving().then(function (s) {
    server = s;
  });
}

function close () {
  server.close();
  request.saveHar('api-traffic.har');
};

function requesting (path) {
  var options = {
    method: 'GET',
    uri: 'http://localhost:1719' + path
  };
  return request(options).then(function (response) {
    return JSON.parse(response.body);
  });
}

module.exports = {
  serving: serving,
  close: close,
  requesting: requesting,
};
