import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";

import { Router } from "express";
const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);

export default router;
