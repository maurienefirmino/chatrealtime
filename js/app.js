//exportando socket
  var socket = io();
  //quando dar submit
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  //parte dos eventos
  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });

  socket.on('welcome',function(){
    $('#messages').append($('<li>').text("Bem-vindo ao chat!"));
  });
