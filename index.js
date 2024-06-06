const config = require("./config/config.js");
const app = require("./src/config/express.config.js");
require("dotenv").config();
const http = require("http").Server(app);
const socketIO = require("socket.io")(http, { cors: { origin: "*   " } });
const PORT = process.env.PORT || 8001

//event connection of a client from the frontend
socketIO.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    console.log(userData?._id + "connected successfully");
    socket.join(userData?._id);
  });

  socket.on("userLikedPhoto", (data) => {
   const username = { username: data.userDocId?.username };
    const datum = {...data,...username }
    console.log("datum", datum.username);
    socketIO.to(data?.userDocId?._id).emit("likeReceived", datum);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
const server_new = http.listen(PORT, "0.0.0.0", (err) => {
  if (!err) {
    console.log("server is running on port", process.env.PORT);
  }
});
