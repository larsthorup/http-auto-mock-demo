var server;

function faking () {
  return fetch('/base/api-traffic.har').then(function (response) { // Note: Karma mounts under /base
    return response.json();
  }).then(function (harFile) {
    server = sinon.fakeServer.create();
    server.autoRespond = true;
    server.autoRespondAfter = 1;
    return sinonHarServer.load(server, harFile);
  });
}

function restore () {
  server.restore();
}

var api = {
  faking: faking,
  restore: restore
};
