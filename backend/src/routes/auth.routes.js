import { Router } from "express";
import { AuthController } from "../controllers/auth.controllers.js";
import { AuthMiddlewares } from "../middlewares/auth.middlewares.js";

const authController = new AuthController();
const authMiddlewares = new AuthMiddlewares();

const router = Router();

router.post("/register", authMiddlewares.register, authController.register);

export default router;
