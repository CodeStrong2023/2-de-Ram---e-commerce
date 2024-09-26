import { Router } from "express";
import { UserController } from "../controllers/user.controllers.js";
const userController = new UserController();
const router = Router();
router.post("/", userController.createUser);
router.get("/:id", userController.getUserById);
router.get("/", userController.getAll);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
