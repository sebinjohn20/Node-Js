const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();

const server = http.createServer(app);

//initiate socket.io and attach this to the http server
const io = socketIo(server);
app.use(express.static("public"));
const users = new Set();
io.on("connection", (socket) => {
  console.log("A user is now connected");

  //handle user when they will join the chat
  socket.on("join", (userName) => {
    users.add(userName);
    socket.userName = userName;

    //broadcast to all client/user that a new user has joined
    io.emit("userJoined", userName);

    // send the updated user list  to all clients
    io.emit("userList", Array.from(users));
  });

  // handle incoming chat message

  socket.on("chatMessage", (message) => {
    // broadcast the received to all conntected users

    io.emit("chatMessage", message);
  });
  ///Typing Indicator

  socket.on("typing", (user) => {
    socket.broadcast.emit("typing", user);
  });

  // handle user disconnection

  socket.on("disconnect", () => {
    console.log("A user disconnected");

    if (socket.userName) {
      users.delete(socket.userName);

      io.emit("userLeft", socket.userName);
      io.emit("userList", Array.from(users));
    }
  });
});
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server is now Running http://localhost:${PORT}`);
});
