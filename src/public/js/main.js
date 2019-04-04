//io(); // this is to verify that client is connected at server
//const socket=io();
$(function(){
    
    const socket = io();

    //obtaining Dom elements from the interface
    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#chat');

    //events to not charge the page each moment 
    $messageForm.submit( e => {
        e.preventDefault();
        //console.log('sending data');
       // console.log($messageBox.val());
        socket.emit('send message', $messageBox.val()); //to send  an after clean 
        $messageBox.val('');
    });

    //here listen event from server sockets.js
    socket.on('new message', function(data){
        $chat.append(data + '<br/>');
    });
})