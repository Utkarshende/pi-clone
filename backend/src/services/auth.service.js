import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import { generateAccessToken } from "../utils/jwt.js";

class AuthService {
  async register(userData) {
    const { fullName, email, password } = userData;

    // Validation
    if (!fullName || !email || !password) {
      throw new ApiError(400, "All fields are required.");
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ApiError(409, "User already exists.");
    }

    // Create user
    const user = await User.create({
      fullName,
      email,
      password,
    });

    // Fetch user without password
    const createdUser = await User.findById(user._id);

    // Generate JWT
    const token = generateAccessToken(user._id);

    return {
      user: createdUser,
      token,
    };
  }

  async login(email, password) {
    if (!email || !password) {
      throw new ApiError(400, "Email and password are required.");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new ApiError(401, "Invalid email or password.");
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new ApiError(401, "Invalid email or password.");
    }

    const token = generateAccessToken(user._id);

    const responseUser = await User.findById(user._id);

    return {
      user: responseUser,
      token,
    };
  }

  async getProfile(userId) {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    return user;
  }
}

export default new AuthService();