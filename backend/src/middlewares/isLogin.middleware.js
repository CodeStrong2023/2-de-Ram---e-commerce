import { UnauthorizedException } from "../exceptions/exceptions.js";

export class IsLoginMiddleware {
  async isLogin(req, res, next) {
    try {
      if (!req.session.user) throw new UnauthorizedException("You must be logged in");
      next();
    } catch (error) {
      next(error);
    }
  }
}