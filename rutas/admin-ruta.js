import  express  from "express";
import { mostrarAdminPage, agregarUsuario } from '../models/admin-modelo.js';
const router = express.Router();


// Ruta para mostrar la página de administrador
router.get('/admin', mostrarAdminPage);

// Ruta para mostrar la página de agregar Empleado
router.post('/agregar-empleado', agregarUsuario);


export default router;//module.exports = router;

