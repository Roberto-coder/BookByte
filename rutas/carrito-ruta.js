import express from "express";
import  controller  from '../controllers/carritoControllers.js';
const router = express.Router();

router.get('/carrito',controller.getData)
router.get('/agregarcarrito/:id',controller.carritoo)
router.get('/eliminarcarrito/:id',controller.eliminarcarritoo)
export default router;
