const socketIO = require("socket.io");

exports.sio = (server) => {
  return socketIO(server, {
    transports: ["polling"],
    cors: {
      origin: "*",
    },
  });
};

exports.connection = (io) => {
  io.on("connection", (socket) => {
    console.log("A user is connected:", socket.id);

    socket.on("createRoom", (userId) => {
      const roomId = `room-${Date.now()}`;
      socket.join(roomId);
      socket.emit("roomCreated", {
        roomId,
        inviteLink: `http://localhost:5000/join/${roomId}`,
      });
      socket.userId = userId;
      console.log(`Room created: ${roomId} by user: ${userId}`);
    });

    socket.on("joinRoom", (roomId, userId) => {
      socket.join(roomId);
      socket.userId = userId;
      socket.to(roomId).emit("userJoined", userId);
      console.log(`User ${userId} joined room: ${roomId}`);

      const roomSockets = io.sockets.adapter.rooms[roomId]?.sockets;
      if (roomSockets && Object.keys(roomSockets).length === 2) {
        const wordleWord = "apple";
        socket.to(roomId).emit("startGame", { wordleWord });
      }
    });

    socket.on("guessWord", (roomId, guess) => {
      const correctWord = "apple";
      if (guess === correctWord) {
        socket.to(roomId).emit("declareWinner", socket.userId);
      }
    });

    socket.on("disconnect", () => {
      console.log(`socket ${socket.id} disconnected`);
    });
  });
};
