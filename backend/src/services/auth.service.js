import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import { generateAccessToken } from "../utils/jwt.js";

class AuthService {
  async register(userData) {
    const { fullName, email, password } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ApiError(409, "User already exists");
    }

    // Create new user
    const user = await User.create({
      fullName,
      email,
      password,
    });

    // Remove password before sending response
    const createdUser = await User.findById(user._id);

    const token = generateAccessToken(createdUser._id);

    return {
      user: createdUser,
      token,
    };
  }

  async login(email, password) {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new ApiError(401, "Invalid email or password");
    }

    const token = generateAccessToken(user._id);

    user.password = undefined;

    return {
      user,
      token,
    };
  }

  async getProfile(userId) {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return user;
  }
}

export default new AuthService();