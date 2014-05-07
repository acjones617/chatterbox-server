var require = require;
var http = require("http");
var utils = require("./utils.js");
var express = require("express");
var _ = require("underscore");

/* Every server needs to listen on a port with a unique number. The
 * standard port for HTTP servers is port 80, but that port is
 * normally already claimed by another server and/or not accessible
 * so we'll use a higher port number that is not likely to be taken: */
var port = 3000;

var app = express();

var dataStore = {
  results: []
};

var counter = 1;

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

// app.get("/classes/*", function(request, response, next) {
//   response.writeHead(200, headers);
//   next();
// });

app.get("/classes/:roomname", function(request, response) {
  response.writeHead(200, headers);
  var dataToSend = _.filter(dataStore.results, function(message) {
    return message.roomname === request.params.roomname;
  });
  response.write(JSON.stringify({results: dataToSend}));
  response.end();
});

app.post("/classes/:roomname", function(request, response) {
  request.on("data", function(data) {
    var newMessage = utils.createMessage(data, counter, request.params.roomname);
    dataStore.results.unshift(newMessage);
    var dataToSend = {results: [newMessage]};
    counter++;
    response.writeHead(201, headers);
    response.end(JSON.stringify(dataToSend));
  });
});

app.options("*", function(request, response) {
  utils.sendHeader(200, headers, response);
});

app.all("*", function(request, response) {
  utils.sendHeader(404, headers, response);
});

app.listen(port);

/* To start this server, run:
     node basic-server.js
 *  on the command line.

 * To connect to the server, load http://127.0.0.1:3000 in your web
 * browser.

 * server.listen() will continue running as long as there is the
 * possibility of serving more requests. To stop your server, hit
 * Ctrl-C on the command line. */
