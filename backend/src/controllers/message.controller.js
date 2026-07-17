import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import messageService from "../services/message.service.js";

export const sendMessage = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const { content } = req.body;

  const response = await messageService.sendMessage({
    chatId,
    userId: req.user._id,
    content,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Message sent successfully", response));
});

export const getMessages = asyncHandler(async (req, res) => {
  const { chatId } = req.params;

  const messages = await messageService.getMessages({
    chatId,
    userId: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Messages fetched successfully", messages));
});

export const deleteMessage = asyncHandler(async (req, res) => {
  const { messageId } = req.params;

  await messageService.deleteMessage({
    messageId,
    userId: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Message deleted successfully"));
});

export const regenerateResponse = asyncHandler(async (req, res) => {
  const { messageId } = req.params;

  const response = await messageService.regenerateResponse({
    messageId,
    userId: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Response regenerated successfully", response));
});