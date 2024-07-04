import express from "express";
import compraControllers from '../controllers/compraControllers.js';

const router = express.Router();

router.get('/compra', compraControllers.finalizarcompraa, compraControllers.obtenerDirecciones, (req, res) => {
    res.render("compra", { user: req.user, carrito: req.carrito, direcciones: req.direcciones });
});

router.post('/cantidad/:id', compraControllers.operaciones);
router.post('/generarOrden', compraControllers.finalizarcompraa, compraControllers.generarOrden); 
router.post('/direccion', compraControllers.capturaDireccion);

router.get('/editarDireccion/:id', compraControllers.obtenerDireccionParaEdicion); // Obtener datos para la edición
router.post('/editarDireccion/:id', compraControllers.editarDireccion); // Editar dirección
router.get('/eliminarDireccion/:id', compraControllers.eliminarDireccion); // Eliminar dirección


export default router;
