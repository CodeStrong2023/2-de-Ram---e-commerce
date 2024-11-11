import { Router } from "express";
import authRoutes from "./auth.routes.js";
import cartRoutes from "./cart.routes.js";
import productRoutes from "./product.routes.js";
import userRoutes from "./user.routes.js";
import paymentsRoutes from "./payments.routes.js"

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/cart", cartRoutes);
router.use("/products", productRoutes);
router.use("/payments", paymentsRoutes)

export default router;
