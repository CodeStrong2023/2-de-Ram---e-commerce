import { request, response } from "express";

import { AuthServices } from "../services/auth.service.js";
import { createToken } from "../utils/jwt.js";

export class AuthController {
  constructor() {
    this.authService = new AuthServices();
  }

  register = async (req = request, res = response, next) => {
    try {
      const user = await this.authService.register(req.body);
      res.status(201).json({ status: "ok", user });
    } catch (error) {
      next(error);
    }
  };

  login = async (req = request, res = response, next) => {
    try {
      const { email, password } = req.body;

      const user = await this.authService.login(email, password);

      const token = createToken(user);
      // Guardar el token en en una cookie
      res.cookie("token", token, { maxAge: 3600000 });

      res.json({ status: "ok", user });
    } catch (error) {
      next(error);
    }
  };

  logout = async (req = request, res = response, next) => {
    try {
      res.clearCookie("token");
      req.user = null;
      res.json({ status: "ok", message: "Logged out" });
    } catch (error) {
      next(error);
    }
  };
}
