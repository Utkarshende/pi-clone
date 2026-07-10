import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

import {
  createChat,
  getChats,
  renameChat,
  deleteChat,
} from "../controllers/chat.controller.js";

const router = Router();

router.use(authMiddleware);

router.post("/", createChat);

router.get("/", getChats);

router.patch("/:id", renameChat);

router.delete("/:id", deleteChat);

export default router;