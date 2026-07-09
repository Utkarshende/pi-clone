import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running 🚀",
  });
});

// Routes
app.use("/api/auth", authRoutes);

// Error Middleware (Keep this LAST)
app.use(errorMiddleware);

export default app;