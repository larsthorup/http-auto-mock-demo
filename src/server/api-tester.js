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
  var httpArchive = {
    log: {
      version: '1.2',
      creator: {name: 'http-auto-mock-demo', version: '0.0.0'},
      entries: traffic
    }
  };
  fs.writeFileSync('api-traffic.har', JSON.stringify(httpArchive, null, 4));
};

function requesting (path) {
  var startTime = Date.now();
  var options = {
    method: 'GET',
    uri: 'http://localhost:1719' + path,
    resolveWithFullResponse: true,
    simple: false
  };
  return request(options).then(function (response) {
    // console.log(response);
    var endTime = Date.now();
    traffic.push({
      startedDateTime: new Date(startTime).toISOString(),
      time: endTime - startTime,
      request: {
        method: options.method,
        url: options.uri,
        httpVersion: 'HTTP/1.1',
        cookies: [],
        headers: [],
        queryString: [],
        postData: undefined,
        headersSize: -1,
        bodySize: -1
      },
      response: {
        status: response.statusCode,
        statusText: response.statusMessage,
        httpVersion: 'HTTP/' + response.httpVersion,
        cookies: [],
        headers: Object.keys(response.headers).map(function (key) { return {name: key, value: response.headers[key]}}),
        content: {
          size: response.body.length,
          mimeType: 'application/json',
          text: response.body
        },
        redirectURL: '',
        headersSize: -1,
        bodySize: -1,
      },
      cache: {},
      timings: {
        send: -1,
        receive: -1,
        wait: endTime - startTime
      }
    });
    return JSON.parse(response.body);
  });
}

module.exports = {
  serving: serving,
  close: close,
  requesting: requesting,
};
