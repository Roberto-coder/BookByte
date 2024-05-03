import express from "express";
import  controller  from '../controllers/favoritosControllers.js';
const router = express.Router();

router.get('/agregarfavoritos/:id',controller.favoritos);
export default router;