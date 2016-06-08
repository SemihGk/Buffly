var app = require('express')(),
  http = require('http').Server(app),
  path = require('path'),
  bodyParser = require('body-parser'),
  io = require('socket.io')(http);


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(process.env.PORT || 5000, function() {
  console.log('Lets the chat begin!');
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
  self.io = io;
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
