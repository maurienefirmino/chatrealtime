'use strict';

const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', (req, res)=>{
	res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket)=>{

	//função que seta a variavel nome no socket
	function setName(nome){
		socket.nome = nome
	}

	//dispara o evento inicial
	socket.emit('welcome');
	
	//aqui pegamos o id 
	const id = socket.id
	
	console.log('Usuário: '+id+' conectado!')

	socket.on('disconnect', function(){
		console.log('Usuário: '+id+" desconectado!")
	})

	socket.on('name', function(nome){
		setName(nome);
	})

	socket.on('chat message', function(msg){
		msg = socket.nome+": "+msg
		io.emit('chat message', msg)
	})
})

http.listen(3000, ()=>{
	console.log('listening on *:3000')
})