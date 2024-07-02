import express from "express";
import controller from '../controllers/vendedorControllers.js';
const router = express.Router();

router.post('/vendedor', controller.vendedor);  // Maneja GET requests a /tarjeta

export default router;
