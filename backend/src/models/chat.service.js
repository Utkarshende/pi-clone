import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";
import ApiError from "../utils/apiError.js";

class ChatService {
  async createChat(userId) {
    const chat = await Chat.create({
      user: userId,
      title: "New Chat",
    });

    return chat;
  }

  async getChats(userId) {
    return await Chat.find({
      user: userId,
      isArchived: false,
    }).sort({
      updatedAt: -1,
    });
  }

  async getChatById(chatId, userId) {
    const chat = await Chat.findOne({
      _id: chatId,
      user: userId,
    });

    if (!chat) {
      throw new ApiError(404, "Chat not found");
    }

    return chat;
  }

  async renameChat(chatId, title, userId) {
    const chat = await this.getChatById(chatId, userId);

    chat.title = title;

    await chat.save();

    return chat;
  }

  async pinChat(chatId, userId) {
    const chat = await this.getChatById(chatId, userId);

    chat.isPinned = !chat.isPinned;

    await chat.save();

    return chat;
  }

  async archiveChat(chatId, userId) {
    const chat = await this.getChatById(chatId, userId);

    chat.isArchived = true;

    await chat.save();

    return chat;
  }

  async restoreChat(chatId, userId) {
    const chat = await this.getChatById(chatId, userId);

    chat.isArchived = false;

    await chat.save();

    return chat;
  }

  async deleteChat(chatId, userId) {
    const chat = await this.getChatById(chatId, userId);

    await Message.deleteMany({
      chat: chat._id,
    });

    await chat.deleteOne();

    return;
  }
}

export default new ChatService();