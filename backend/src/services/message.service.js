import Message from "../models/message.model.js";
import Chat from "../models/chat.model.js";
import ApiError from "../utils/apiError.js";
import aiService from "./ai.service.js";

class MessageService {
  async sendMessage(chatId, userId, content) {
    // Check chat ownership
    const chat = await Chat.findOne({
      _id: chatId,
      user: userId,
    });

    if (!chat) {
      throw new ApiError(404, "Chat not found");
    }

    // Save user message
    const userMessage = await Message.create({
      chat: chatId,
      sender: userId,
      role: "user",
      content,
    });

    // Ask Gemini
    const aiReply = await aiService.generateResponse(content);

    // Save AI response
    const assistantMessage = await Message.create({
      chat: chatId,
      sender: userId,
      role: "assistant",
      content: aiReply,
    });

    // Update last message
    chat.lastMessage = aiReply;
    await chat.save();

    return {
      userMessage,
      assistantMessage,
    };
  }

  async getMessages(chatId, userId) {
    const chat = await Chat.findOne({
      _id: chatId,
      user: userId,
    });

    if (!chat) {
      throw new ApiError(404, "Chat not found");
    }

    return await Message.find({ chat: chatId }).sort({
      createdAt: 1,
    });
  }
}

export default new MessageService();