import express from "express";
import controller from '../controllers/compraControllers.js';
const router = express.Router();

router.get('/compra', controller.finalizarcompraa);
router.post('/cantidad/:id', controller.operaciones);
router.post('/generarOrden', controller.generarOrden);  // Nueva ruta
router.post('/direccion',controller.capturaDireccion);
export default router;
