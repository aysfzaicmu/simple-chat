//var name = "";



 function contactus() {

    var name = "";
  document.getElementById("nameHidden").value = document.forms["nameForm"]["name"].value;

  console.log("hellow  from client");
  var socket = io();
  // $('nameForm').submit(function(){
  //   console.log('Name form submitted');
  //   socket.emit('name given', $('#name').val());
  //   $('#name').val('');
  //   name = document.getElementById("nameHidden").value;
  //   console.log(name);
  //   return false;
  // });
  name = document.getElementById("nameHidden").value;
  socket.emit('name given', name);

  socket.on('oldMessages', function(msg){

    $('#messages').append($('<li>').text(msg.user + ' ' + msg.message + ' at ' + msg.messageTime));
  });


//have name. start chat
  var message = "",
      messageTime = "",
      user = name,
      userId = 4; 


//remove name input
  $("#name").remove();
  $("#enterButton").remove();



  //add input for message

  var newdiv = document.createElement('div');
    newdiv.innerHTML = "<form id='messagesForm' action=''><input id='message' autocomplete='off' /><button>Send</button></form>"; 
    // "<ul id='messages'></ul>
    // <form id='messagesForm' action=''>
    //   <input id='message' autocomplete='off' /><button>Send</button>
    // </form>";
    document.getElementById("aa").appendChild(newdiv);



     


    


  $('form').submit(function(){
    message = $('#message').val();
    messageTime = new Date();
    user = document.getElementById("nameHidden").value;
    socket.emit('chat message', {message : message, messageTime : messageTime.toUTCString(), user : user,userId: userId});
    $('#message').val('');
    return false;
  });


  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg.user + ' ' + msg.message + ' at ' + msg.messageTime));
  });
  
  }