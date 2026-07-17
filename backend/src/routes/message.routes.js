import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import {
  sendMessage,
  getMessages,
  deleteMessage,
  regenerateResponse,
} from "../controllers/message.controller.js";

const router = Router();

router.use(authMiddleware);

router.post("/:chatId", sendMessage);

router.get("/:chatId", getMessages);

router.delete("/:messageId", deleteMessage);

router.post("/regenerate/:messageId", regenerateResponse);

export default router;