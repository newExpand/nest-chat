const socket = io('http://localhost:3000/chat');
const nickname = prompt('닉네임을 입력해 주세요');

socket.on('connect', () => {
  console.log('connected');
});

function sendMessage() {
  const message = $('#message').val();
  $('#chat').append(`<p>나 : ${message}</p>`);
  socket.emit('message', { message, nickname });
}

socket.on('message', (message) => {
  $('#chat').append(`<p>${message}</p>`);
});
