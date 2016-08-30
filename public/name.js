//var name = "";







 function contactus() {

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
  heading.innerHTML = "<div class='clearfix'></div><h4><i class='fa fa-circle text-green'></i> \
   FSE Chat Room</h4><div class='clearfix'></div>";
  document.getElementById("heading2").appendChild(heading);


  //add div to show all previous messages(if any)
  var oldMessages = document.createElement('div');
  oldMessages.id = "messages2";
  oldMessages.className="portlet-body chat-widget";
  oldMessages.style = "overflow-y: auto; width: auto; height: 300px;";
  document.getElementById("messagesDiv").appendChild(oldMessages);


  //add input for message

  var newdiv = document.createElement('div');
    //newdiv.innerHTML = "<form id='messagesForm' action=''><input id='message' autocomplete='off' /><button>Send</button></form>"; 
    //document.getElementById("aa").appendChild(newdiv);
    newdiv.className = "portlet-footer";
    newdiv.innerHTML = "<form id='messageForm'><input id='message' class='form-control' placeholder='Enter message...'/><button id='messageButton' class='btn btn-default pull-right'>Send</button><div class='clearfix'></div></form>";

    document.getElementById("messages").appendChild(newdiv);
     

  
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

  //make necessary changes to dom





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


//have name. start chat
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
    socket.emit('chat message', {message : message, messageTime : messageTime, user : user,userId: userId});
    $('#message').val('');
    return false;
  });


  socket.on('chat message', function(msg){
    console.log("got a chat noti from server");
    //$('#messages').append($('<li>').text(msg.user + ' ' + msg.message + ' at ' + msg.messageTime));
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




  