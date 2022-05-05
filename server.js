const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const { userJoin, getCurrentUsers } = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const botName = "ChatCord Bot";

// * Set static folder:
app.use(express.static(path.join(__dirname, "public")));

// * Run when client connected
io.on("connection", (socket) => {
  // * Join Room:
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // * Welcome current user:
    socket.emit("message", formatMessage(botName, "welcome to chat..."));

    // * Broadcast when a user connects:
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has join the chat`)
      );

    // * Listen for message
    socket.on("chatMessage", (msg) => {
      io.emit("message", formatMessage(user.username, msg));
    });

    // * Runs when client disconnects:
    socket.on("disconnect", () => {
      io.emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );
    });
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
