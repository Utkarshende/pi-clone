import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";

import ApiError from "../utils/apiError.js";

import aiService from "./ai.service.js";

class MessageService {
  async sendMessage({ chatId, userId, content }) {
    if (!content?.trim()) {
      throw new ApiError(400, "Message cannot be empty.");
    }

    const chat = await Chat.findOne({
      _id: chatId,
      user: userId,
    });

    if (!chat) {
      throw new ApiError(404, "Chat not found.");
    }

    const userMessage = await Message.create({
      chat: chatId,
      sender: userId,
      role: "user",
      content,
    });

    const history = await Message.find({
      chat: chatId,
    }).sort({
      createdAt: 1,
    });

    const aiReply = await aiService.generateResponse(
      history.map((message) => ({
        role: message.role,
        content: message.content,
      }))
    );

    const assistantMessage = await Message.create({
      chat: chatId,
      sender: userId,
      role: "assistant",
      content: aiReply,
    });

    chat.lastMessage = aiReply;
    chat.updatedAt = new Date();

    await chat.save();

    return {
      userMessage,
      assistantMessage,
    };
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

  async regenerateResponse({ messageId, userId }) {
    const userMessage = await Message.findById(messageId);

    if (!userMessage) {
      throw new ApiError(404, "Message not found.");
    }

    if (userMessage.role !== "user") {
      throw new ApiError(
        400,
        "Only user messages can be regenerated."
      );
    }

    const chat = await Chat.findOne({
      _id: userMessage.chat,
      user: userId,
    });

    if (!chat) {
      throw new ApiError(403, "Unauthorized.");
    }

    const history = await Message.find({
      chat: chat._id,
      createdAt: {
        $lte: userMessage.createdAt,
      },
    }).sort({
      createdAt: 1,
    });

    const aiReply = await aiService.generateResponse(
      history.map((message) => ({
        role: message.role,
        content: message.content,
      }))
    );

    const assistantMessage = await Message.create({
      chat: chat._id,
      sender: userId,
      role: "assistant",
      content: aiReply,
    });

    chat.lastMessage = aiReply;
    await chat.save();

    return assistantMessage;
  }
}

export default new MessageService();