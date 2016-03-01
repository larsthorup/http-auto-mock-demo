var fs = require('fs');
var request = require('request-promise');
var api = require('./api');

var server;
var traffic;

function serving () {
  return api.serving().then(function (s) {
    server = s;
    traffic = [];
  });
}

function close () {
  server.close();
  fs.writeFileSync('api-traffic.json', JSON.stringify(traffic, null, 4));
};

function requesting (path) {
  var uri = 'http://localhost:1719' + path;
  return request(uri).then(function (body) {
    traffic.push({
      request: {
        uri: uri
      },
      response: {
        statusCode: 200,
        body: body
      }
    });
    return JSON.parse(body);
  });
}

module.exports = {
  serving: serving,
  close: close,
  requesting: requesting,
};
