
const Chat = require('./models/Chat');

module.exports = function (io){
    // let nicknames = [
    //     'fazt',
    //     'ryan',
    //     'joe'
    // ]; we're gonna change this by
    let users = {};

    io.on('connection', async socket =>{
        console.log('new user connected..');
        //this instruccion is load or search old messages bcause now use MONGODB
        let messages = await Chat.find(({})).limit(8);//could be unlimited or limit
        socket.emit('load old msgs', messages);
        // here when enter a new user 
        socket.on('new user', (data, cb) =>{
            console.log(data);
            if(data in users){ //if(nicknames.indexOf(data) != -1){
                cb(false);
            }else{
                // here pushing the users in a list
                cb(true);
                socket.nickname = data;
                users[socket.nickname] = socket;
                //users.push(socket.nickname);
                //here after show the listusers on the view
                //io.sockets.emit('usernames', nicknames);
                updateNickNames();
            }
        });
        // to listen to user
        socket.on('send message', async (data, cb) =>{
            "/w joe  dsadsada";
            var msg = data.trim();
            if(msg.substr(0, 3) === '/w '){
                msg = msg.substr(3);
                const index = msg.indexOf(' ');
                if(index !== -1){
                   var name = msg.substring(0, index);
                   var msg = msg.substring(index + 1);

                   if(name in users){
                    users[name].emit('whisper', {
                        msg,
                        nick: socket.nickname
                    });
                   }else{// if the users no exist this
                        cb('error! Please enter a valid User');
                   }
                }else{
                    cb('error! please enter your message');
                }
            }else{//this is to send message normal
                var newMsg = new Chat({
                    msg,
                    nick:socket.nickname
                });
                await newMsg.save();
                //before 
                io.sockets.emit('new message',{
                    msg: data,
                    nick: socket.nickname
                });
            }

            console.log(data);// to test if this message is listening
            //this instruccion is to send msm to all users..
            //io.sockets.emit('new message', data); // to update the listMessages
            //we are gonna change this instruccion
           
        });
        // here when the user disconnected..
        socket.on('disconnect', data =>{
            if (!socket.nickname) {
                return;
            }
            delete users[socket.nickname];
            //that will be change nicknames.splice(nicknames.indexOf(socket.nickname), 1); to delte
            //io.sockets.emit('new message', data);// this is to update the list
            updateNickNames();
        });
        // to not update each moment socket data we're gonna make a function
        function updateNickNames() {
            io.sockets.emit('usernames', Object.keys(users)); //here we changed nicknames by ob.. to send 
        }
    });
} 
