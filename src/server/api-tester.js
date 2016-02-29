var api = require('./api');
var request = require('request-promise');

var server;

function serving () {
  return api.serving().then(function (s) {
    server = s;
  });
}

function close () {
  server.close();
};

function adding (value1, value2) {
  return request('http://localhost:1719' + '/add/' + value1 + '/' + value2).then(function (body) {
    return JSON.parse(body);
  });
}

module.exports = {
  serving: serving,
  close: close,
  adding: adding
};
