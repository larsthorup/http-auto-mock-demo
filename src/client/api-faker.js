var server;

function loading (path) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/base' + path, true); // Note: Karma mounts under /base
    xhr.onload = function () {
      var traffic = JSON.parse(this.responseText);
      if(this.status === 200) {
        var responses = {};
        for(var i = 0; i < traffic.length; ++i) {
          var exchange = traffic[i];
          responses[exchange.request.uri] = exchange.response;
        }
        resolve(responses);
      } else {
        reject(new Error(this.statusText));
      }
    };
    xhr.send();
  });
}

function faking () {
  return loading('/api-traffic.json').then(function (responses) {
    server = sinon.fakeServer.create();
    server.respondWith(function (request) {
      var response = responses[request.url];
      if (response) {
        request.respond(response.statusCode, {}, response.body);
      } else {
        request.respond(404, {}, JSON.stringify({message: 'Not Found'}));
      }
    });
    server.autoRespond = true;
    server.autoRespondAfter = 1;
  });
}

function restore () {
  server.restore();
}

var api = {
  faking: faking,
  restore: restore
};
