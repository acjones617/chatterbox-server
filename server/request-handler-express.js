/* Import underscore and utils: */
var _ = require("underscore");
var utils = require("./utils.js");

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


module.exports = {
  getMessages: function(request, response) {
    response.writeHead(200, headers);
    var dataToSend = _.filter(dataStore.results, function(message) {
      return message.roomname === request.params.roomname;
    });
    response.write(JSON.stringify({results: dataToSend}));
    response.end();
  },

  sendMessages: function(request, response) {
    var data = "";
    request.on('data', function(partial) {
      data += partial;
    });
    request.on('end', function() {
      var message = utils.createMessage(data, counter, request.params.roomname);
      dataStore.results.unshift(message);
      var dataToSend = {results: [message]};
      counter++;
      response.writeHead(201, headers);
      response.end(JSON.stringify(dataToSend));
    });
  },

  optionsResponse: function(request, response) {
    console.log('what up');
    utils.sendHeader(200, headers, response);
  },

  badRequest: function(request, response) {
    utils.sendHeader(404, headers, response);
  }
};
