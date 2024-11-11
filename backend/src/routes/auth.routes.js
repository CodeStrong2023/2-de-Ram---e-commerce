import { AuthController } from "../controllers/auth.controller.js";
import { AuthMiddlewares } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const authMiddlewares = new AuthMiddlewares();
const authController = new AuthController();

const router = Router();

router.post("/register", authMiddlewares.register, authController.register);
router.post("/login", authMiddlewares.login, authController.login);
router.post("/logout", authController.logout);

export default router;
