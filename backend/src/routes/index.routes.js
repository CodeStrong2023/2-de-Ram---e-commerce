/*import { Route } from "express";

const router = Route();


export default router;
*/

import express from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from '../controllers/userController.js'; // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Ruta para crear un nuevo usuario
router.post('/users', createUser);

// Ruta para obtener todos los usuarios
router.get('/users', getUsers);

// Ruta para obtener un usuario por ID
router.get('/users/:id', getUserById);

// Ruta para actualizar un usuario por ID
router.put('/users/:id', updateUserById);

// Ruta para eliminar un usuario por ID
router.delete('/users/:id', deleteUserById);

export default router;
