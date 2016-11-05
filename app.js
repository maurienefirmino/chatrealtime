'use strict';
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static(__dirname + '/'))

app.get('/', (req, res)=>{
	res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket)=>{

	//função que seta a variavel nome no socket
	function setName(nome){
		socket.nome = nome
	}

	//dispara o evento inicial
	socket.emit('welcome')
	socket.emit('user-connected')

	//aqui pegamos o id 
	const id = socket.id
	
	console.log('Usuário: '+id+' conectado!')

	socket.on('disconnect', function(){
		console.log('Usuário: '+id+" desconectado!")
	})

	socket.on('name', function(nome){
		setName(nome)
	})

	socket.on('client-typing', function(msg){
		io.emit('client-typing')
	})

	socket.on('chat message', function(msg){
		socket.emit('chat message',"Eu: "+msg)
		msg = socket.nome+": "+msg
		socket.broadcast.emit('chat message', msg)
	})
})

http.listen(3000, ()=>{
	console.log('listening on *:3000')
})