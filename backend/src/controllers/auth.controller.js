import authService from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";

export const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", result));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await authService.login(email, password);

  return res
    .status(200)
    .json(new ApiResponse(200, "Login successful", result));
});

export const profile = asyncHandler(async (req, res) => {
  const user = await authService.getProfile(req.user.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Profile fetched successfully", user));
});