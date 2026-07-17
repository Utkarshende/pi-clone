import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import chatService from "../models/chat.service.js";

export const createChat = asyncHandler(async (req, res) => {
  const chat = await chatService.createChat(req.user._id);

  return resc
    .status(201)
    .json(new ApiResponse(201, "Chat created successfully", chat));
});

export const getChats = asyncHandler(async (req, res) => {
  const chats = await chatService.getChats(req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Chats fetched successfully", chats));
});

export const renameChat = asyncHandler(async (req, res) => {
  const { title } = req.body;

  const chat = await chatService.renameChat(
    req.params.id,
    title,
    req.user._id
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Chat renamed successfully", chat));
});

export const deleteChat = asyncHandler(async (req, res) => {
  await chatService.deleteChat(req.params.id, req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Chat deleted successfully"));
});