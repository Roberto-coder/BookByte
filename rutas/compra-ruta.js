import express from "express";
import  controller  from '../controllers/compraControllers';
const router = express.Router();

router.get('/compra',controller.finalizarCompra)
export default router;