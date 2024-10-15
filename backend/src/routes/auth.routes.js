import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { AuthMiddlewares } from "../middlewares/auth.middleware.js";

const authMiddlewares = new AuthMiddlewares();
const authController = new AuthController();

const router = Router();

router.post("/register", authMiddlewares.register, authController.register);
router.post("/login", authMiddlewares.login, authController.login);

export default router;
