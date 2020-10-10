'use strict';

const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

/*io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});*/

io.on('connect',function(socket){
    console.log("Ada user yang konek : "+socket.id);

    socket.on('pesan',function(pesan, date, jenis, foto){
        var sockets = io.sockets.sockets;
        socket.broadcast.emit('pesan',pesan, date, jenis, foto);
    })   

    socket.on('disconnect',function(){
        console.log("User : "+socket.id+" Keluar");
    })
})

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
