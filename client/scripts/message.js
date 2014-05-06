var _ = _;
var moment = moment;

var Message = function(text, createdAt, objectId, username, chatroom) {
  this._text = text;
  this._createdAt = createdAt;
  this._objectId = objectId;
  this._username = username;
  this.chatroom = chatroom;
  this.timeAsString = this.timeToString();
  this.fromFriend = this.isFromAFriend();
};

Message.prototype.hello = function(){
  alert('hi');
};

Message.prototype.timeToString = function() {
  return moment(this._createdAt).fromNow();
};

Message.prototype.templated = _.template('<div class="message" id="<%- this._objectId %>"> \
                                            <div class="message-header"> \
                                              <a class="username" href="#"><%- this._username %></a> <small class="created-at"><%- this.timeAsString %> to <a class="chatroom-link" href=""><%- this.chatroom %></a></small> \
                                            </div> \
                                            <p class="message-text<% if (this.fromFriend) { %>friend<% } %>"><%- this._text %></p> \
                                          </div>');

Message.prototype.updatedTemplate = _.template('<div class="message-header"> \
                                                  <a                    <a class="username" href="#"><%- this._username %></a> <small class="created-at"><%- this.timeAsString %> to <a class="chatroom-link" href=""><%- this.chatroom %></a></small> \
                                                </div> \
                                                <p class="message-text <% if (this.fromFriend) { %>friend<% } %>"><%- this._text %></p>');

Message.prototype.isFromAFriend = function() {
  return app.allUsers[this._username];
};
