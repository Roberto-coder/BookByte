import  express  from "express";

import { agregarEmpleado, mostrarAdmin } from '../controllers/adminControllers.js';
const router = express.Router();


// Ruta para mostrar la página de administrador
router.get('/admin', mostrarAdmin);



// Controlador para la página de agregar empleado
router.get('/admin/agregar-empleado', (req, res) => {
    // Aquí puedes renderizar la vista de la página de agregar empleado
    res.render('Empleado/agregar-empleado');
});

router.post('/admin/registrar-empleado', agregarEmpleado);

export default router;//module.exports = router;

