var app = app, $ = $;

// interact with left pane (chatroom stuff)
$(function() {
  // create new chatroom helper function
  var createNewChatRoom = function() {
    var newChatRoom = $('.createNewRoomName').val();
    if(!app.allChatRooms[newChatRoom]) {
      app.renderChatRoomList(newChatRoom); // adds new chatroom to chatrooms list on left pane
      app.allChatRooms[newChatRoom] = true; // adding new chatroom to the allchatrooms array
    }
    makeChatActive(newChatRoom); // sets chatroom to active (new or not)
    $('.createNewRoomName').val('');
  };

  // Create new Chatroom if button clicked
  $('.createNewRoomButton').click(function(e) {
    e.preventDefault();
    createNewChatRoom();
  });

  // Create new Chatroom if Enter key is hit in input field
  $('.createNewRoomName').keyup(function(e) {
    e.preventDefault();
    if (e.which === 13) {
      createNewChatRoom();
    }
  });

  $('body').on('click', '.chatroom-link', function(e) {
    e.preventDefault();
    makeChatActive($(this).text());
  });

  // When chatroom is selected, make that room active
  var makeChatActive = function(chatRoom) {
    chatRoom = chatRoom || 'lobby';  // chatroom defaults to 'lobby'
    app.activeChatRoom = chatRoom;
    $('#chatroom-list-button:first-child').text(chatRoom); // set dropdown button text to the chatroom name
    $('#chatroom-list-button:first-child').append($('<span> </span><span class="caret"></span>'));
    // $('#chatroom-list-button:first-child').val(chatRoom);
    app.renderRoom(); // updates the messages list to show only the active chatrooms messages by adding a "hidden" class to all other msgs
  };
});
