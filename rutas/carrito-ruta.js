import express from "express";
import  controller  from '../controllers/carritoControllers.js';
const router = express.Router();
import loginControllers from '../controllers/loginControllers.js';

router.get('/carrito',loginControllers.ensureAuthenticated, controller.getData)
router.get('/agregarcarrito/:id',loginControllers.ensureAuthenticated, controller.carritoo)
router.get('/eliminarcarrito/:id',loginControllers.ensureAuthenticated, controller.eliminarcarritoo)
export default router;
