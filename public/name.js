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
    messageTime = "4:05";
    user = document.getElementById("nameHidden").value;
    socket.emit('chat message', {message : message, messageTime : messageTime, user : user,userId: userId});
    $('#message').val('');
    return false;
  });


  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg.user + ' ' + msg.message));
  });
  
  }