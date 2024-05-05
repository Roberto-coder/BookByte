import express from "express";
import  controller  from '../controllers/favoritosControllers.js';
const router = express.Router();

router.get('/agregarfavoritos/:id', controller.agregarAFavoritos)
router.get('/favoritos',controller.getData)
router.get('/eliminarfavoritos/:id',controller.eliminarfavs)
export default router;