class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox=$(`#${chatBoxId}`);
        this.userEmail=userEmail;

        //connection requirest
        this.socket=io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    //this connection handler detect the request
    connectionHandler(){
        let self=this;

        this.socket.on('connect',function(){
            console.log('connection established using sockets');
            
            //for joining the chat room
            self.socket.emit('join_room',{
                user_email:self.userEmail,
                chatroom:'codeial'
            });

            self.socket.on('user_joined',function(data){
                console.log('a user joined',data);
            })
        })
    }
}