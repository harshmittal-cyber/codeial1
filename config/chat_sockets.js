module.exports.chatSockets=function(socketServer){
    let io=require('socket.io')(socketServer);

    io.sockets.on('connection',function(socket){
        console.log('new connection received',socket.id);
    
        socket.on('disconnect',function(){
            console.log('socket disconnected !');
        });
        //for joining chat room
        socket.on('join_room',function(data){
            console.log('joining request rec',data);

            //add the client to the room
            socket.join(data.chatroom);
            //this tell us to evry user that this user join the chat room
            io.in(data.chatroom).emit('user_joined',data);
        });

        //change:: detect send message and broadcast to everyone in the room
        socket.on('send_message',function(data){
            io.in(data.chatroom).emit('receive_message',data);
        })
    })
}