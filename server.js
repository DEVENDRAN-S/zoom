const express = require('express');
const { Server } = require('http');
const app=express();
const server=require('http').Server(app);
const io=require('socket.io')(server)//initiating socket
const { v4: uuidv4 }=require('uuid');
const { ExpressPeerServer}=require('peer');
const peerServer = ExpressPeerServer(server,{
    debug: true
});

app.set('view engine','ejs');
app.use(express.static('public'));

app.use('/peerjs',peerServer);

app.get('/',(req,res) =>{
    //res.status(200).send("hello world");
    //res.render('room');
    res.redirect(`/${uuidv4()}`);
})
app.get('/:room',(req,res) =>{
    res.render('room',{roomId:req.params.room})
})
io.on('connection', socket => {
    socket.on('join-room',(roomId,userId) =>{
        //console.log("joined room");
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('user-connected',userId);//it says somebody joined my room like phone call signal
    })
})







server.listen(3030);