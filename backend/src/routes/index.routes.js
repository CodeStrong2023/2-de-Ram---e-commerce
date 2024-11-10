import { IsLoginMiddleware } from "../middlewares/isLogin.middleware.js";
import { Router } from "express";
import authRoutes from "./auth.routes.js";
import cartRoutes from "./cart.routes.js";
import productRoutes from "./product.routes.js";
import userRoutes from "./user.routes.js";

const isLoginMiddleware = new IsLoginMiddleware();

const router = Router();

router.use("/auth", authRoutes);
router.use(isLoginMiddleware.isLogin); // Middleware para proteger rutas de usuarios no logueados
router.use("/users", userRoutes);
router.use("/cart", cartRoutes);
router.use("/products", productRoutes);

export default router;
