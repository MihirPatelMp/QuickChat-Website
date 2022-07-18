// const socket = io('http://localhost:3200', { transports: ['websocket']});
const socket = io('http://128.199.24.166:3200', { transports: ['websocket', 'polling', 'flashsocket'] });

const form = document.getElementById('msgInput-container');
const msgInput = document.getElementById('msgInput');
const msgContainer = document.querySelector(".container");
var audio= new Audio('/media/tone.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText= message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    msgContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message= msgInput.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    msgInput.value='';
})

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined chat`,'left');
});
socket.on('receive', data => {
    append(`${data.name}:${data.message}`,'left');
});
socket.on('leave', name => {
    append(`${name} left the chat`,'left');
});
