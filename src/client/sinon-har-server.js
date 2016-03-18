function load (server, harFile) {
  var responses = {};
  var traffic = harFile.log.entries;
  for(var i = 0; i < traffic.length; ++i) {
    var exchange = traffic[i];
    responses[exchange.request.url.href] = exchange.response;
  }

  server.respondWith(function (request) {
    var response = responses[request.url];
    if (response) {
      request.respond(response.status, {}, response.content.text);
    } else {
      request.respond(404, {}, JSON.stringify({message: 'Not Found'}));
    }
  });
}

var sinonHarServer = {
  load: load,
};
