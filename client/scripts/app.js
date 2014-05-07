// make linter happy
var $ = $;
var _ = _;
var moment = moment;
// end

// YOUR CODE HERE:
var app = {

  // initializes messages, chatrooms, and users to blank arrays/objects
  init: function() {
    app.allMessages = {};
    app.allChatRooms = {};
    app.activeChatRoom = 'lobby';
    app.allUsers = {};
    // app.server = 'https://api.parse.com/1/classes/chatterbox';
    //app.server = 'http://127.0.0.1:3000';
    app.server = 'http://localhost:3000/';
    app.fetch();
  },

  send: function(message) {
    $.ajax({
      // always use app url
      url: app.server + 'classes/' + message.roomname,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function () {
        console.log('chatterbox: Message sent');
      },
      error: function () {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      },
      complete: function () {
        console.log('complete');
      }
    });
  },

  // fetch should pull last 100 msgs from server
  fetch: function(roomname) {
    roomname = roomname || app.activeChatRoom;
    $.ajax({
      url: app.server + 'classes/' + roomname,
      // data: {
      //   order: '-createdAt'
      // },
      success: function (data) {
        console.log('chatterbox: Successfully fetched messages');
        app.organize(JSON.parse(data).results);
      },
      error: function () {
        console.error('chatterbox: Failed to fetch messages');
      }
    });
  },

  // organize takes the messages array fetch returns and loads it into the users and chatrooms
  organize: function(messages) {
    // for each msg
    for(var i = messages.length-1; i >= 0; i--) {
      var m = messages[i];
      // check if obj id is in all messages
      if(!app.allMessages[m.objectId]) {
        // if we don't have the user or they are not friends, create/set new user to not a friend
        if(!app.allUsers[m.username]) {
          app.allUsers[m.username] = false;
        }
        // if we don't have the chatroom, create new chatroom
        if(app.allChatRooms[m.roomname] === undefined) { // revisit making chatroom into a class and checking
          app.allChatRooms[m.roomname] = true;
          app.renderChatRoomList(m.roomname);
        }
        // push to both user and chatroom
        var message = new Message(m.text, m.createdAt, m.objectId, m.username, m.roomname);
        app.allMessages[m.objectId] = message;

        app.renderMessage(message);
      }
    }
  },

  renderMessage: function(message) {
    $('.message-list').prepend($(message.templated())); // prepend to dom
    //app.renderRoom();
  },

  renderRoom: function(){
    for(var key in app.allMessages) {
      var needsRendering = false;
      var m = app.allMessages[key];
      if(m.timeAsString !== m.timeToString()) { // checks if message needs to be updated based on time
        m.timeAsString = m.timeToString();
        needsRendering = true;
      }
      if(m.fromFriend !== m.isFromAFriend()) { // checks if message needs to be bolded (for friend)
        m.fromFriend = m.isFromAFriend();
        needsRendering = true;
      }
      // if chatroom our message is in is the active chatroom, remove hidden class
      if (m.chatroom === app.activeChatRoom) {
        $('#'+key).removeClass('hidden');
      // else (unless no room is selected) add hidden class
      } else if (app.activeChatRoom !== null) {
        $('#'+key).addClass('hidden');
      }
      if(needsRendering) {
        $('#'+key).html(m.updatedTemplate());
      }
    }
  },

  renderChatRoomList: function(roomname) {
    $('.dropdown-menu').append('<li><a class="chatroom-link">' + roomname + '</a></li>'); //template needs to go into a class
  },

  renderFriendList: function() {
    $('.friends').html('');
    for(var friend in app.allUsers) {
      if(app.allUsers[friend]) {
        $('.friends').append('<a class="list-group-item friend-link">' + friend + '</a>');
      }
    }
  },
};

app.init();

