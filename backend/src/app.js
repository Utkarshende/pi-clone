import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import messageRoutes from "./routes/message.routes.js";

import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server running 🚀",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/chats", chatRoutes);

app.use(errorMiddleware);

app.use("/api/messages", messageRoutes);


export default app;