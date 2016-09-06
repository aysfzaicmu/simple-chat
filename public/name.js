 function nameEntered() {

console.log("hellow  from client");
    var name = "";
  document.getElementById("nameHidden").value = document.forms["nameForm"]["name"].value;

//remove name input
  $("#name").remove();
  $("#enterButton").remove();
  $("#heading1").remove();
  $("#footer1").remove();


  //Add welcome to FSE heading
  var heading = document.createElement('div');
  heading.className="portlet-heading";
  heading.innerHTML = "<div class='clearfix'></div><h4><i class='fa fa-circle text-green'></i>FSE Chat Room \
  <a class='right1' href='/exitChat'>Exit Chat</a></h4><div class='clearfix'></div>";
  document.getElementById("heading2").appendChild(heading);


  //add div to show all previous messages(if any)
  var oldMessages = document.createElement('div');
  oldMessages.id = "messages2";
  oldMessages.className="portlet-body chat-widget";
  oldMessages.style = "overflow-y: auto; width: auto; height: 300px;";
  document.getElementById("messagesDiv").appendChild(oldMessages);


  //add input for message

  var newdiv = document.createElement('div');
    newdiv.className = "portlet-footer";
    newdiv.innerHTML = "<form id='messageForm'><input id='message' class='form-control' placeholder='Enter message...'/><button id='messageButton' class='btn btn-default pull-right'>Send</button><div class='clearfix'></div></form>";
    document.getElementById("messages").appendChild(newdiv);
     

  
  var socket = io();
  name = document.getElementById("nameHidden").value;
  socket.emit('name given', name);


  socket.on('oldMessages', function(msg){
  var messDiv = document.createElement('div');
  messDiv.className = "row";
  messDiv.innerHTML = "<div class='col-lg-12'> \
  <div class='media-body'> \
  <h4 class='media-heading'>" + msg.user + " \
    </h4> \
  <h9>" + msg.messageTime +"</h9> \
  <p>" + msg.message + "</p> \
  </div> \
  </div>  \
  <hr>";
  document.getElementById("messages2").appendChild(messDiv);
  });


  var message = "",
      messageTime = "",
      user = name,
      userId = 4; 

  $('form').submit(function(){
    console.log("message entered:");
    message = $('#message').val();
    var d = new Date();
    messageTime = d.toLocaleString();;
    user = document.getElementById("nameHidden").value;
    socket.emit('chat message', {message : message, messageTime : messageTime, user : user});
    $('#message').val('');
    return false;
  });


  socket.on('chat message', function(msg){
  console.log("got a chat notification from server");
  var newMessDiv = document.createElement('div');
  newMessDiv.className = "row";
  newMessDiv.innerHTML = "<div class='col-lg-12'> \
  <div class='media-body'> \
  <h4 class='media-heading'>" + msg.user + " \
  </h4> \
  <h9>" + msg.messageTime +"</h9> \
  <p>" + msg.message + "</p> \
  </div> \
  </div>  \
  <hr>";
   document.getElementById("messages2").appendChild(newMessDiv);
  });
  
  }






  