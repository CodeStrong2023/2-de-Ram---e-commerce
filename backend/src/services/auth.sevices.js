import { NotImplementedException } from "../exceptions/exceptions.js";
import { userRepository } from "../repositories/user.repository.js";
import { createHash } from "../utils/hashPassword.js";

export class AuthServices {
  constructor() {}
  async register(userData) {
    const newUser = {
      ...userData,
      password: createHash(userData.password),
    };
    const user = await userRepository.create(newUser);
    if (!user) throw new NotImplementedException("User not created");

    return user;
  }

  async login(email, password) {}
}
