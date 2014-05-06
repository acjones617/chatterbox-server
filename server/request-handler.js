/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
var dataStore = {
  results: []
};

var counter = 1;

var handleRequest = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */


  console.log("Serving request type " + request.method + " for url " + request.url);
  // console.log(Object.keys(request));
  // console.log(Object.keys(request.headers['user-agent']));
  var statusCode = 200;


  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "text/plain";



  // interpret request
  if (request.method === "GET") {
    console.log('get me some messages!'); // #todo
    /* .writeHead() tells our server what HTTP status code to send back */
    response.writeHead(statusCode, headers);

    /* Make sure to always call response.end() - Node will not send
     * anything back to the client until you do. The string you pass to
     * response.end() will be the body of the response - i.e. what shows
     * up in the browser.*/
    response.end(JSON.stringify(dataStore));
    // return message s
  } else if (request.method === "POST") {
    request.on('data', function(data) {
      // data =??? <Buffer 7b 22 75 73 65 72 6e 61 6d 65 22 3a 22 68 61 74 73 6f 6e 63 61 74 73 22 2c 22 74 65 78 74 22 3a 22 65 68 3f 22 2c 22 72 6f 6f 6d 6e 61 6d 65 22 3a 22 6c ...>
      // create a data store for messages sent in
      // create an object & parse post input into object properties
      var newMessage = JSON.parse(data.toString());
      newMessage.createdAt = new Date();
      newMessage.updatedAt = new Date();
      newMessage.objectId = counter;
      // push the object into dataStore.results
      // dataStore.results.push(newMessage);
      dataStore.results.unshift(newMessage);
      counter++;
      statusCode = 201;
      response.writeHead(statusCode, headers);
      response.end("Messages posted successfully");
    });
  }

  response.writeHead(statusCode, headers);
  response.end("Messages posted successfully");
};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.handler = handleRequest;
