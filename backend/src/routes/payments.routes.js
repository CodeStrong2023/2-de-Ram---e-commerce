// backend/routes/payments.routes.js
import express from "express";
import { createPaymentPreference } from "../controllers/payment.controller.js";  // Importamos el controller

const router = express.Router();

// Ruta para crear la preferencia de pago
router.post("/create_preference", createPaymentPreference);  // Usamos la función del controller

export default router;
