const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const mongoose = require('mongoose');

//initializations
const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);
//db connect
mongoose.connect('mongodb://localhost/chat-database')
    .then(db => console.log('db is connected'))
    .catch(err => console.log(err));
/********************** */
require('./sockets')(io);
//Settings
app.set('port', process.env.PORT || 3000);
//Midlewares
//Routes

//Static Variable
console.log(path.join(__dirname,'public'));
app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000, ()=>{
    console.log('Server on port:', app.get('port'));
});
//Settings
//app.set('port', process.env.PORT || 3000)