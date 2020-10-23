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
        this.socket.on('connect',function(){
            console.log('connection established using sockets');
        })
    }
}