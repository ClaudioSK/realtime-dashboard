import { Server } from 'socket.io';
import { createServer } from 'http';
import { NextApiResponseServerIO } from '@/types/socket';
import { NextResponse } from 'next/server';

const httpServer = createServer();
const io = new Server(httpServer, {
  path: '/api/socket',
  addTrailingSlash: false,
  cors: {
    origin: '*',
  },
});

let previousUsers = 50;
let previousSessions = 500;

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  const interval = setInterval(() => {
    previousUsers = Math.max(0, previousUsers + Math.floor(Math.random() * 11) - 5);
    previousSessions = previousSessions + Math.floor(Math.random() * 10);

    socket.emit('statsUpdate', {
      activeUsers: previousUsers,
      totalSessions: previousSessions,
      serverStatus: 'Conectado'
    });
  }, 3000);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
    clearInterval(interval);
  });
});

httpServer.listen(3001);

export async function GET() {
  return NextResponse.json({ success: true });
}