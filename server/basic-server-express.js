var express = require("express");
var path = require("path");
var handle = require("./request-handler-express.js");

var port = 3000;

var app = express();

// pull in the static html/css/js files
app.use(express.static(path.join(__dirname+"/../client")));

app.get("/classes/:roomname", handle.getMessages);

app.post("/classes/:roomname", handle.sendMessages);

app.options("*", handle.optionsResponse);

app.all("*", handle.badRequest);

app.listen(port);
