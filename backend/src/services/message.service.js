import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";

import ApiError from "../utils/apiError.js";

import chatEngine from "./chat.engine.js";

class MessageService {
  async sendMessage({ chatId, userId, content }) {
    return await chatEngine.processMessage(
      chatId,
      userId,
      content
    );
  }

  async getMessages({ chatId, userId }) {
    const chat = await Chat.findOne({
      _id: chatId,
      user: userId,
    });

    if (!chat) {
      throw new ApiError(404, "Chat not found.");
    }

    return await Message.find({
      chat: chatId,
    }).sort({
      createdAt: 1,
    });
  }

  async deleteMessage({ messageId, userId }) {
    const message = await Message.findById(messageId);

    if (!message) {
      throw new ApiError(404, "Message not found.");
    }

    const chat = await Chat.findOne({
      _id: message.chat,
      user: userId,
    });

    if (!chat) {
      throw new ApiError(403, "Unauthorized.");
    }

    await message.deleteOne();

    return true;
  }
}

export default new MessageService();