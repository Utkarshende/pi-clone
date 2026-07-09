import User from "../models/user.model.js";

class UserRepository {
  async create(userData) {
    return await User.create(userData);
  }

  async findByEmail(email) {
    return await User.findOne({ email }).select("+password");
  }

  async findById(id) {
    return await User.findById(id);
  }

  async updateById(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id) {
    return await User.findByIdAndDelete(id);
  }
}

export default new UserRepository();