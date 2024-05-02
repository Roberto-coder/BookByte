import  express  from "express";
import loginControllers from '../controllers/loginControllers.js'
import gerenteControllers from '../controllers/gerenteControllers.js';
import passport from "passport";

const router = express.Router();


// Ruta para mostrar la página de administrador
router.get('/gerente'/*, loginControllers.ensureAuthenticated*/, gerenteControllers.mostrarReportes);



export default router;//module.exports = router;