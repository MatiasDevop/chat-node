//io(); // this is to verify that client is connected at server
//const socket=io();
$(function(){
    
    const socket = io();

    //obtaining Dom elements from the interface
    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#chat');
    //obtaining Dom elements from the NIcknameForm
    const $nickForm = $('#nickForm');
    const $nickError = $('#nickError');
    const $nickname = $('#nickname');

    const $users = $('#usernames');
    // to avoid the refresh again
    $nickForm.submit(e =>{
        e.preventDefault();
        socket.emit('new user', $nickname.val(), data =>{
            console.log('here i need user.'+$nickname.val());
            if(data){
                $('#nickWrap').hide();
                $('#contentWrap').show();
                $("#user").text("User:"+$nickname.val());
            }else{
                $nickError.html(`
                    <div class="alert alert-danger">
                    THat username already exits.
                    </div>
                `);
            }
            $nickname.val('');
        });
        console.log('sending....');
    });

    //events to not charge the page each moment 
    $messageForm.submit( e => {
        e.preventDefault();
        //console.log('sending data');
       // console.log($messageBox.val());
        socket.emit('send message', $messageBox.val(), data=>{
            //here is new function to valid user from listusers to message private
            $chat.append(`<p class="error">${data}</p>`);
        }); //to send  an after clean 
        $messageBox.val('');
    });

    //here listen event from server sockets.js
    socket.on('new message', function(data){
        //$chat.append(data + '<br/>'); change to show user in messages look at down
        $chat.append('<b>' + data.nick + '</b>:' + data.msg + '<br/>');
    });
    // here event to listes usernames event and show listusers in html
    socket.on('usernames', data =>{
        let html = ''; // hold etiquetas
        for (let i = 0; i < data.length; i++) {
            html +=`<p><i class="fas fa-user"></i>${data[i]}</p>`;
            
        }
        $users.html(html);
    });
    // this instruccion is to listen event whisperr to message privates
    socket.on('whisper', data =>{
        $chat.append(`<p class="whisper"><b>${data.nick}:</b> ${data.msg} </p>`);
    })

    // to event load messages now We use MONGO DB
    socket.on('load old msgs', msgs => {
        for(let i = 0; i< msgs.length; i++){
            displayMsg(msgs[i]);
        }
    })
    
    function displayMsg(data){
        $chat.append(`<p class="whisper"><b>${data.nick}:</b> ${data.msg} </p>`);
    }
})