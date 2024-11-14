import { io } from 'socket.io-client';

export const socket = io('http://localhost:3000', {
  autoConnect: false,
});

export const connectToRoom = (region: string) => {
  socket.auth = { region };
  socket.connect();
};

export const disconnectSocket = () => {
  if (socket.connected) socket.disconnect();
};

socket.on('connect', () => {
  console.log('Connected to socket server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from socket server');
});
