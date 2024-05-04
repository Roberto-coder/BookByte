import express from "express";
import  controller  from '../controllers/favoritosControllers.js';
const router = express.Router();

router.get('/favoritos/:id', controller.agregarAFavoritos)
router.get('/favoritos',controller.getData)

export default router;