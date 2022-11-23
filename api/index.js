import mongoose from "mongoose";
import { Server } from "socket.io"; 
import app from "./src/app.js";

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => console.log("🟢 DB connection succesfull"))
  .catch((error) => console.log(error));

const server = app.listen(process.env.PORT, () => {
  console.log(`🟢 Server listening at ${process.env.PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});