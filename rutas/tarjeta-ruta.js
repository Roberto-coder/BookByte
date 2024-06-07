import express from "express";
import controller from '../controllers/tarjetaControllers.js';
const router = express.Router();
router.post('/tarjeta',controller.registrarTarjeta);

export default router;
