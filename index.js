//var app = require('express')();
var express = require("express"),
    app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendfile('chat.html');
});

// app.get('/index.html', function(req, res){
//   res.sendfile('index.html');
// });



io.on('connection', function(socket){
	socket.on('name given', function(msg){
		console.log('name is ' +  msg);
  });


  socket.on('chat message', function(msg){
  	console.log('The message is ' + msg.message);
  	console.log('Message time is ' + msg.messageTime);
    io.emit('chat message', msg);
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});