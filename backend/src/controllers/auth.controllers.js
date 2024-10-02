
export class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  register = async (req = request, res = response, next) => {
    try {
      const user = await this.authService.register(req.body);
      res.status(201).json(user);
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

  me = async (req = request, res = response, next) => {
    try {
      const user = await this.authService.me(req.user.id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  };
}