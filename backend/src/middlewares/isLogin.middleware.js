import { request, response } from "express";

import { UnauthorizedException } from "../exceptions/exceptions.js";
import { verifyToken } from "../utils/jwt.js";

export class IsLoginMiddleware {
  async isLogin(req = request, res = response, next) {
    try {
      if (!req.cookies.token) throw new UnauthorizedException("User is not logged in");
      req.user = verifyToken(req.cookies.token);
      if (!req.user) throw new UnauthorizedException("Invalid token");

      next();
    } catch (error) {
      next(error);
    }
  }
}
