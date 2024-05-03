import express from "express";
import  controller  from '../controllers/favoritosControllers.js';
const router = express.Router();

router.post('/favoritos/:id', controller.agregarAFavoritos);

export default router;