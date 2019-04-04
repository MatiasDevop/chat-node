module.exports = function (io){
    io.on('connection', socket =>{
        console.log('new user connected..');
        // to listen to user
        socket.on('send message', function (data){
            console.log(data);// to test if this message is listening
            //this instruccion is to send msm to all users..
            io.sockets.emit('new message', data); //
        });
    });
} 
