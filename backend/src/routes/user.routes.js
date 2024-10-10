import Router from "express";
import { UserController } from "../controllers/user.controller.js";

const router = Router();
const userController = new UserController();

// Definición de las rutas
router.post("/", userController.createUser); // Crear un nuevo usuario
router.get("/:id", userController.getUserById); // Obtener un usuario por ID
router.get("/", userController.getAllUsers); // Obtener todos los usuarios
router.put("/:id", userController.updateUser); // Actualizar un usuario por ID
router.delete("/:id", userController.deleteUser); // Eliminar un usuario por ID

export default router;
