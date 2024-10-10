import { AuthServices } from "../services/auth.service.js";

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
      res.json(user);
    } catch (error) {
      next(error);
    }
  };
}
