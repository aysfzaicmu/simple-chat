var express = require("express"),
    app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/MessagesDB';


var insertDocument = function(db, message, userName, messageTime, callback) {
   db.collection('messages').insertOne( {"message":message,"user":userName, "messageTime" :messageTime}, function(err, result) {
    callback();
  });
};



app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendfile('Chat_box.html');
});

app.get('/exitChat', function(req, res){
  res.sendfile('exit_page.html');
});


io.on('connection', function(socket){
  console.log("From Server: connection made");

	socket.on('name given', function(msg){

		console.log('From server: Got name ' + msg);
    console.log("socket id is " + socket.id);
    //get old messages
    MongoClient.connect(url, function(err, db) {
      if (err) {
          throw err
        }
      else {
        console.log("connected to db");


        console.log("DB already contains");
        var cursor = db.collection('messages').find();

        cursor.each(function(err,doc){
          
          if (doc != null) {
            console.log(doc.message);
            io.sockets.connected[socket.id].emit('oldMessages',doc);
          }

        });

      db.close();
      }
    });
  });


  socket.on('chat message', function(msg){
  	console.log('The message is ' + msg.message);
  	console.log('Message time is ' + msg.messageTime);

    MongoClient.connect(url, function(err, db) {
      if (err) {
          throw err
        }
      else {
        console.log("connected to db");
        insertDocument(db,msg.message,msg.user,msg.messageTime, function() {
      });
      db.close();
      }      
    });
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});