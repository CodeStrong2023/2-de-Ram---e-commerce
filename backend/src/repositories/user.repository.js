import { UserModel } from "../models/user.model.js";



class UserRepository {
    
  async create(userData) {
    
    return await UserModel.create(userData);
  }

  async findById(userId) {
    return await UserModel.findById(userId);
  }

  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async findAll() {
    return await UserModel.find();
  }

  async update(userId, userData) {
    return await UserModel.findByIdAndUpdate(userId, userData, { new: true });
  }

  async delete(userId) {
    return await UserModel.findByIdAndDelete(userId);
  }
}

export const userRepository = new UserRepository();
