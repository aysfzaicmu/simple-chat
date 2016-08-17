//var name = "";
 function contactus() {
    var name = "";


  document.getElementById("nameHidden").value = document.forms["nameForm"]["name"].value;

  var socket = io();
  $('form').submit(function(){
    socket.emit('name given', $('#name').val());
    $('#name').val('');
    name = document.getElementById("nameHidden").value;

    console.log(name);
    return false;
  });

//have name. start chat
  var message = "",
      messageTime = "",
      user = name,
      userId = 4; 


//remove name input
  //$("#name").remove();
  //$("#enterButton").remove();




  $('form').submit(function(){
    message = $('#message').val();
    messageTime = "4:05";
    user = name;
    socket.emit('chat message', {message : message, messageTime : messageTime, user : user,userId: userId});
    $('#message').val('');
    return false;
  });


  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg.user + ' ' + msg.message));
  });
  
  }