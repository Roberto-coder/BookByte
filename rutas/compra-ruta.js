import express from "express";
import controller from '../controllers/compraControllers.js';
const router = express.Router();

router.get('/compra', controller.finalizarcompraa);
router.get('/disponibles/:id',controller.disponibles);
export default router;
