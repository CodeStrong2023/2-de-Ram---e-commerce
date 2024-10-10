import { UserResponseDto } from "../dtos/user-response.dto.js";
import { BadRequestException, NotImplementedException } from "../exceptions/exceptions.js";
import { userRepository } from "../repositories/user.repository.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";

export class AuthServices {
  constructor() {}
  async register(userData) {
    const newUser = {
      ...userData,
      password: createHash(userData.password),
    };
    const findUser = await userRepository.findByEmail(newUser.email);
    if (findUser) throw new BadRequestException("User already exists");
    
    const user = await userRepository.create(newUser);
    if (!user) throw new NotImplementedException("User not created");

    return user;
  }

  async login(email, password) {
    const user = await userRepository.findByEmail(email);

    if (!user || !isValidPassword(user, password)) throw new BadRequestException("Invalid email or password");
    return new UserResponseDto(user);
  }
}
