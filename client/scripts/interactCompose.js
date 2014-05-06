var app = app;
var $ = $;

// interacting with compose/fetch
$(document).ready(function() {

  var send = function() {
    var $text = $('.composeMessage').val();
    var username = window.location.search.split('username=')[1].split('&')[0];
    var roomname = app.activeChatRoom;
    var message = {
      username: username,
      text: $text,
      // set roomname to current roomname
      roomname: roomname || 'lobby'
    };
    app.send(message);
    app.fetch();
    $('.composeMessage').val(''); // clear input field
  };

  // Send message if send message button clicked
  $('.sendMessage').click(function(e) {
    e.preventDefault();
    send();
  });

  // Send message if Enter key is hit in input field
  $('.composeMessage').keyup(function(e) {
    e.preventDefault();
    if (e.which === 13) {
      send();
    }
  });

  // Fetch messages if refresh button clicked
  $('.fetch').click(function() {
    e.preventDefault();
    app.fetch();
  });
});
