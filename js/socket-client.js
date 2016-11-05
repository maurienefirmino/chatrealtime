var socket = io();

var nome = prompt("Seu Nome: ");
socket.emit('name',nome);

socket.on('', function(msg){
  $('#messages').append($('<li>').text(msg));
});

$('#m').typing({
  start: function (event, $elem) {
    socket.emit("client-typing");
  },
  stop: function (event, $elem) {

  },
  delay: 300
});


$('form').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});


socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});

socket.on('welcome',function(){
  $('#messages').append($('<li>').html("<br><center><h1>Bem-vindo ao chat!<h1></center>"));
});

socket.on('client-typing',function(){
  console.log(""+nome+" está digitando...")
})

