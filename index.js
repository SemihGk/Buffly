var app = require('express')(),
  http = require('http').Server(app),
  io = require('socket.io')(http);

http.listen(process.env.PORT || 3000, function() {
  console.log('Lets make better lovers!');
});

function User(socket) {
  var self = this;
  self.socket = socket;
}

User.prototype.joinChat = function(chat) {
  var self = this;
  self.chat = chat;
}

function Chat() {
  var self = this;
  self.users = [];
  self.io = require('socket.io')(app);
  self.addHandlers();
}

Chat.prototype.addHandlers = function() {
  var self = this;

  self.io.sockets.on("connection", function(socket) {
    self.addUser(new User(socket));

    // Adding handlers
    socket.on('sendMessage', function(message) {
      var currentDateTime = new Date().toLocaleString();
      // io.emit("userTypingUpdate", typingUsers);
      io.emit('newChatMessage', clientNickname, message, currentDateTime);
    });
  });
}

Chat.prototype.addUser = function(player) {
  var self = this;
  var user = "user" + (self.users.length + 1);
  self.users.push(user);
  console.log(user + "joined");
  self.startChat();
}

Chat.prototype.startChat = function() {
  // this.player1.socket.emit("startChat")
}

// Start the chat server
var chat = new Chat()
