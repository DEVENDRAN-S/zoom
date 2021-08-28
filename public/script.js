const socket = io('/');

//frontend javascript
const videoGrid = document.getElementById('video-grid');
const myVideo=document.createElement('video');
myVideo.muted=true;
var peer=new Peer(undefined,{
  path:'/peerjs',
  host:'/',
  port:'3030'
});//peer requiremwnts

let myVideoStream
navigator.mediaDevices.getUserMedia({
  video:true,//to access video
  audio:true
}).then(stream=>{
    myVideoStream= stream;
    addVideoStream(myVideo,stream);

    peer.on('call',call  => {
      call.answer(stream)
      const video= document.createElement('video')
      call.on('stream',userVideoStream => {
        addVideoStream(video,userVideoStream)
      })
    })
    socket.on('user-connected',(userId) => {
      connecToNewUser(userId,stream);
    })
   
})
//used to get audio and video from user 
peer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id);
})


const connecToNewUser = (userId,stream) =>{
  const call =peer.call(userId,stream)
  const video = document.createElement('video')
  call.on('stream',userVideoStream  => {
    addVideoStream(video,userVideoStream)
  })
}//others video


const addVideoStream = ( video,stream )=> {
    video.srcObject=stream;
    video.addEventListener('loadedmetadata',() => {
    video.play();
    })
    videoGrid.append(video); //we will put the video
}



