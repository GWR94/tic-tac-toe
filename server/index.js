const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const { Server } = require("socket.io");
const {
  createBoard,
  checkWinner,
  isDraw,
  generateRoomCode,
} = require("./game");

const PORT = process.env.PORT || 3001;
const defaultOrigin = process.env.RAILWAY_PUBLIC_DOMAIN
  ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
  : "http://localhost:3000";
const CLIENT_ORIGINS = (process.env.CLIENT_ORIGIN || defaultOrigin).split(",");

const app = express();
const distPath = path.join(__dirname, "..", "dist");

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_ORIGINS,
    methods: ["GET", "POST"],
  },
});

const rooms = new Map();

const getOpenRooms = () =>
  [...rooms.values()]
    .filter((room) => !room.players[2])
    .map((room) => ({
      roomCode: room.code,
      hostName: room.players[1].name,
    }))
    .sort((a, b) => a.roomCode.localeCompare(b.roomCode));

const broadcastOpenRoomsChanged = () => {
  io.emit("open-rooms-changed");
};

const getRoomBySocket = (socketId) => {
  for (const room of rooms.values()) {
    if (room.players[1]?.socketId === socketId || room.players[2]?.socketId === socketId) {
      return room;
    }
  }
  return null;
};

const removePlayerFromRoom = (socketId) => {
  const room = getRoomBySocket(socketId);
  if (!room) return;

  const slot =
    room.players[1]?.socketId === socketId
      ? 1
      : room.players[2]?.socketId === socketId
      ? 2
      : null;

  if (!slot) return;

  const opponentSlot = slot === 1 ? 2 : 1;
  const opponent = room.players[opponentSlot];

  if (opponent?.socketId) {
    io.to(opponent.socketId).emit("opponent-disconnected");
  }

  rooms.delete(room.code);
  broadcastOpenRoomsChanged();
};

app.use(cors({ origin: CLIENT_ORIGINS }));
app.get("/health", (_req, res) => res.json({ ok: true }));
app.get("/api/open-rooms", (_req, res) => {
  res.json({ rooms: getOpenRooms() });
});
app.use(express.static(distPath));
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/socket.io")) {
    next();
    return;
  }
  res.sendFile(path.join(distPath, "index.html"));
});

io.on("connection", (socket) => {
  socket.on("list-open-rooms", () => {
    socket.emit("open-rooms-list", { rooms: getOpenRooms() });
  });

  socket.on("create-room", ({ playerName }) => {
    removePlayerFromRoom(socket.id);

    let code = generateRoomCode();
    while (rooms.has(code)) {
      code = generateRoomCode();
    }

    const room = {
      code,
      board: createBoard(),
      currentPlayer: 1,
      scores: { player1: 0, player2: 0 },
      players: {
        1: {
          socketId: socket.id,
          name: playerName || "Player 1",
          counter: "X",
        },
        2: null,
      },
    };

    rooms.set(code, room);
    socket.join(code);

    socket.emit("room-created", {
      roomCode: code,
      playerSlot: 1,
    });
    broadcastOpenRoomsChanged();
  });

  socket.on("join-room", ({ roomCode, playerName }) => {
    removePlayerFromRoom(socket.id);

    const code = (roomCode || "").trim().toUpperCase();
    const room = rooms.get(code);

    if (!room) {
      socket.emit("join-error", { message: "Room not found." });
      return;
    }

    if (room.players[2]) {
      socket.emit("join-error", { message: "Room is full." });
      return;
    }

    room.players[2] = {
      socketId: socket.id,
      name: playerName || "Player 2",
      counter: "O",
    };

    socket.join(code);

    socket.emit("room-joined", {
      roomCode: code,
      playerSlot: 2,
      opponentName: room.players[1].name,
    });

    io.to(room.players[1].socketId).emit("player-joined", {
      opponentName: room.players[2].name,
    });

    const gameStartPayload = {
      roomCode: code,
      player1: {
        name: room.players[1].name,
        counter: room.players[1].counter,
      },
      player2: {
        name: room.players[2].name,
        counter: room.players[2].counter,
      },
      currentPlayer: room.currentPlayer,
      scores: room.scores,
    };

    io.to(code).emit("game-start", gameStartPayload);
    broadcastOpenRoomsChanged();
  });

  socket.on("make-move", ({ roomCode, squareId }) => {
    const code = (roomCode || "").trim().toUpperCase();
    const room = rooms.get(code);

    if (!room) {
      socket.emit("move-error", { message: "Room not found." });
      return;
    }

    const slot =
      room.players[1]?.socketId === socket.id
        ? 1
        : room.players[2]?.socketId === socket.id
        ? 2
        : null;

    if (!slot) {
      socket.emit("move-error", { message: "You are not in this room." });
      return;
    }

    if (room.currentPlayer !== slot) {
      socket.emit("move-error", { message: "Not your turn." });
      return;
    }

    const index = parseInt(squareId, 10);
    if (Number.isNaN(index) || index < 0 || index > 8) {
      socket.emit("move-error", { message: "Invalid move." });
      return;
    }

    if (typeof room.board[index] !== "number") {
      socket.emit("move-error", { message: "Square already taken." });
      return;
    }

    const counter = room.players[slot].counter;
    room.board[index] = counter;

    const winner = checkWinner(room.board, counter);
    const draw = !winner && isDraw(room.board);

    let gameOver = null;
    if (winner) {
      if (slot === 1) {
        room.scores.player1 += 1;
      } else {
        room.scores.player2 += 1;
      }
      gameOver = { type: "win", winner: slot, winIndex: winner.index, counter };
    } else if (draw) {
      gameOver = { type: "draw" };
    } else {
      room.currentPlayer = slot === 1 ? 2 : 1;
    }

    io.to(code).emit("move-made", {
      squareId: index.toString(),
      counter,
      currentPlayer: room.currentPlayer,
      scores: room.scores,
      gameOver,
    });

    if (gameOver) {
      setTimeout(() => {
        const activeRoom = rooms.get(code);
        if (!activeRoom) return;

        activeRoom.board = createBoard();
        activeRoom.currentPlayer =
          gameOver.type === "win" ? gameOver.winner : slot === 1 ? 2 : 1;

        io.to(code).emit("round-reset", {
          currentPlayer: activeRoom.currentPlayer,
        });
      }, 1500);
    }
  });

  socket.on("leave-room", () => {
    removePlayerFromRoom(socket.id);
  });

  socket.on("disconnect", () => {
    removePlayerFromRoom(socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Tic-tac-toe server listening on port ${PORT}`);
});
