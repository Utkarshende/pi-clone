import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";

import aiService from "./ai.service.js";
import titleService from "./title.service.js";

import ApiError from "../utils/apiError.js";

class ChatEngine {
  async processMessage(chatId, userId, content) {
    if (!content || !content.trim()) {
      throw new ApiError(400, "Message cannot be empty.");
    }

    const chat = await Chat.findOne({
      _id: chatId,
      user: userId,
    });

    if (!chat) {
      throw new ApiError(404, "Chat not found.");
    }

    // Save user message
    const userMessage = await Message.create({
      chat: chatId,
      sender: userId,
      role: "user",
      content,
    });

    // Conversation history
    const history = await Message.find({
      chat: chatId,
    }).sort({
      createdAt: 1,
    });

    const messages = history.map((message) => ({
      role: message.role,
      content: message.content,
    }));

    // Generate AI response
    const aiReply = await aiService.generateResponse(messages);

    // Save assistant response
    const assistantMessage = await Message.create({
      chat: chatId,
      sender: userId,
      role: "assistant",
      content: aiReply,
    });

    // Update chat preview
    chat.lastMessage = aiReply;

    // Auto title only on first interaction
    if (chat.title === "New Chat") {
      try {
        chat.title = await titleService.generateTitle(content);
      } catch (error) {
        console.log("Title generation failed.");
      }
    }

    await chat.save();

    return {
      chat,
      userMessage,
      assistantMessage,
    };
  }
}

export default new ChatEngine();