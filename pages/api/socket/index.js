import { Server } from "socket.io";

let io;

export default function SocketHandler(req, res) {
  if (!io) {
    console.log('Socket is initializing');
    io = new Server(res.socket.server);
    io.on('connection', socket => {
      socket.on('input-change', msg => {
        console.log('Received message:', msg);
        socket.emit('input-change', { message: msg.message, user: 'other' });
      }).on("error", (error) => {
        console.error("Error on socket connection:", error);
      });
    });
  } else {
    console.log('Socket is already running');
  }
  res.end();
}
