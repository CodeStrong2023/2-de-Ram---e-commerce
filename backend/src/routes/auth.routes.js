import { Router } from "express";
import { authMiddlewares } from "../middlewares/auth.middlewares.js";
import { authController } from "../controllers/auth.controllers.js";

const router = Router();

router.post("/register", authMiddlewares.register, authController.register);
router.post("/login", authMiddlewares.login, authController.login);

export default router;
