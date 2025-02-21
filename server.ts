import { Server } from 'socket.io';
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  },
  path: '/socket.io/',
  transports: ['polling', 'websocket']
});

let previousUsers = 50;
let previousSessions = 500;
let newUsers = 30;
let recurringUsers = 45;
let otherUsers = 25;
let cpuUsage = 65;
let memoryUsage = 45;
let networkUsage = 80;

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  const interval = setInterval(() => {
    previousUsers = Math.max(0, previousUsers + Math.floor(Math.random() * 11) - 5);
    previousSessions = previousSessions + Math.floor(Math.random() * 10);
    newUsers = Math.max(0, newUsers + Math.floor(Math.random() * 7) - 3);
    recurringUsers = Math.max(0, recurringUsers + Math.floor(Math.random() * 5) - 2);
    otherUsers = Math.max(0, otherUsers + Math.floor(Math.random() * 3) - 1);
    cpuUsage = Math.min(100, Math.max(0, cpuUsage + Math.floor(Math.random() * 11) - 5));
    memoryUsage = Math.min(100, Math.max(0, memoryUsage + Math.floor(Math.random() * 7) - 3));
    networkUsage = Math.min(100, Math.max(0, networkUsage + Math.floor(Math.random() * 9) - 4));

    socket.emit('statsUpdate', {
      activeUsers: previousUsers,
      totalSessions: previousSessions,
      serverStatus: 'Conectado',
      newUsers,
      recurringUsers,
      otherUsers,
      systemMetrics: {
        cpu: cpuUsage,
        memory: memoryUsage,
        network: networkUsage
      }
    });
  }, 3000);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
    clearInterval(interval);
  });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Servidor Socket.io corriendo en puerto ${PORT}`);
});