var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};


module.exports = {
  sendHeader: function(status, header, response) {
    status = status || 200;
    response.writeHead(status, header);
    response.end();
  },

  createMessage : function(data, objectId, roomname) {
    var newMessage = JSON.parse(data.toString());
    newMessage.createdAt = new Date();
    newMessage.updatedAt = new Date();
    newMessage.objectId = objectId;
    newMessage.roomname = roomname;
    return newMessage;
  }
};
