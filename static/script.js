const socket = io('http://localhost:3000/chat');
const roomSocket = io('http://localhost:3000/room');
let currentRoom = '';
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

function createRoom() {
  const room = prompt('생성할 방의 이름을 입력해주세요.');
  roomSocket.emit('createRoom', { room, nickname });
}

socket.on('notice', (data) => {
  $('#notice').append(`<div>${data.message}</div>`);
});

roomSocket.on('rooms', (data) => {
  console.log(data);
  $('#rooms').empty();
  data.forEach((room) => {
    $('#rooms').append(
      `<li>${room} <button onclick="joinRoom('${room}')">참가</button></li>`,
    );
  });
});

function joinRoom(room) {
  roomSocket.emit('joinRoom', { room, nickname, toLeaveRoom: currentRoom });
  currentRoom = room;
}
