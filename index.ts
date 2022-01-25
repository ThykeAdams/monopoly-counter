import next from "next";
import express from "express";
import http from "http";
import socket from "socket.io";
import cors from "cors";

const app = next({ dev: true });
const handle = app.getRequestHandler();
app.prepare().then(() => {
  const server = express();
  const setServer = new http.Server(server);
  const db = require("quick.db");
  db.set("balance", 1000);
  const io = new socket.Server(setServer, {
    cors: {
      origin: "*",
    },
  });
  server.use(
    cors({
      origin: "*",
    })
  );
  io.on("connection", (socket) => {
    console.log(socket.id);
    socket.emit("money:updated", db.get("balance"));

    socket.on("money:request", (m) => {
      console.log(m.division, "requested", m.ammount);
      io.emit("money:requested", m);
    });
    socket.on("money:add", (e) => {
      console.log(e.division, "added", e.amount);
      db.set("balance", db.get("balance") + e.amount);
      io.emit("money:updated", db.get("balance"));
    });
    socket.on("money:remove", (e) => {
      console.log("A");
      console.log(e.division, "removed", e.amount);
      db.set("balance", db.get("balance") - e.amount);
      io.emit("money:updated", db.get("balance"));
    });
  });
  server.get("*", (req, res) => {
    handle(req, res);
  });
  setServer.listen(3001, () => {
    console.log("Server is running on port 3001");
  });
});
