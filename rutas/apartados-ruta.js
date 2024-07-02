import express from "express";
import  controller  from '../controllers/apartadoControllers.js';
const router = express.Router();
import loginControllers from '../controllers/loginControllers.js';

router.get('/apartados',loginControllers.ensureAuthenticated, controller.getData)
router.get('/agregarapartado/:id',loginControllers.ensureAuthenticated, controller.apartadoo)
router.get('/eliminarapartado/:id',loginControllers.ensureAuthenticated, controller.eliminarapatadoo)
export default router;
