import  express  from "express";
import loginControllers from '../controllers/loginControllers.js'
import adminControllers from '../controllers/adminControllers.js';
const router = express.Router();

// Ruta para mostrar la página de administrador
router.get('/admin', loginControllers.ensureAuthenticated, adminControllers.mostrarAdmin);

// Controlador para la página de agregar empleado
router.get('/admin/agregar-empleado', loginControllers.ensureAuthenticated, (req, res) => {
    res.render('Empleado/agregar-empleado');
});

router.post('/admin/registrar-empleado', loginControllers.ensureAuthenticated, adminControllers.agregarEmpleado);

// Controlador para la página de editar empleado
router.get('/admin/editar-empleado', loginControllers.ensureAuthenticated, adminControllers.empleadoID);

router.post('/admin/actualizar-empleado', loginControllers.ensureAuthenticated, adminControllers.editarEmpleado);

router.get('/admin/eliminar-empleado', loginControllers.ensureAuthenticated, adminControllers.eliminarEmpleado);

// Controlador para la página de agregar empleado
router.get('/admin/agregar-libro', loginControllers.ensureAuthenticated, (req, res) => {
    res.render('Libro/agregar-libro');
});

router.post('/admin/registrar-libro', loginControllers.ensureAuthenticated, adminControllers.agregarLibro);



export default router;//module.exports = router;

