import { Router } from "express";
import {
  register,
  login,
  profile,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// Public Routes
router.post("/register", register);
router.post("/login", login);

// Protected Routes
router.get("/profile", authMiddleware, profile);

export default router;