import express from "express";
import controller from '../controllers/tarjetaControllers.js';
const router = express.Router();

router.get('/tarjeta', controller.registrarTarjeta);  // Maneja GET requests a /tarjeta
router.post('/tarjeta', controller.registrarTarjeta);  // Maneja POST requests a /tarjeta

export default router;
