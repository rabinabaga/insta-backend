const config = require("./config/config.js");
const app = require("./src/config/express.config.js");

const http = require("http").Server(app);
const socketIO = require("socket.io")(http, { cors: { origin: "*   " } });

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
const server_new = http.listen(8001, "0.0.0.0", (err) => {
  if (!err) {
    console.log("server is running on port", process.env.PORT);
  }
});
