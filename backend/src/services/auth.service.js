import { BadRequestException, NotImplementedException } from "../exceptions/exceptions.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";

import { UserResponseDto } from "../dtos/user-response.dto.js";
import { cartRepository } from "../repositories/cart.repository.js";
import { userRepository } from "../repositories/user.repository.js";

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

    // Crear carrito para el usuario
    const cart = await cartRepository.createCart({ userId: user._id });

    return { user: new UserResponseDto(user), cart };
  }

  async login(email, password) {
    const user = await userRepository.findByEmail(email);

    if (!user || !isValidPassword(user, password)) throw new BadRequestException("Invalid email or password");
    return new UserResponseDto(user);
  }
}
