import { BadRequestException } from "../exceptions/exceptions.js";

export class AuthMiddlewares {
  async register(req, res, next) {
    try {
      const { email, password, firstName, lastName } = req.body;

      if (!email || !password || !firstName || !lastName) throw new BadRequestException("All fields are required");
      next();
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) throw new BadRequestException("Email and password are required");
      next();
    } catch (error) {
      next(error);
    }
  }
}

export const authMiddlewares = new AuthMiddlewares();
