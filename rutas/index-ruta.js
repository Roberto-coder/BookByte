import express from "express";
import pool from '../config/database.js';
import carritoControllers from "../controllers/carritoControllers.js";
import favoritosControllers from "../controllers/favoritosControllers.js";
import compraControllers from "../controllers/compraControllers.js";
import tarjetaControllers from "../controllers/tarjetaControllers.js";
import apartadoControllers from "../controllers/apartadoControllers.js";

const router = express.Router();

router.get('/', carritoControllers.getData, favoritosControllers.getData, apartadoControllers.getData, (req, res) => {
    pool.query('SELECT * FROM books ORDER BY book_datePublication DESC LIMIT 4', (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render("index", { newBooks: results, user: req.user, carrito: req.carrito, favoritos: req.favoritos, apartados: req.apartados });
        }
    });
});


router.get('/productos', carritoControllers.getData, (req, res) => {
    pool.query('SELECT * FROM books ORDER BY book_datePublication DESC LIMIT 4', (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render("productos", { newBooks: results, user: req.user, carrito: req.carrito, favoritos: req.favoritos, apartados: req.apartados });
        }
    });
});

router.get('/compra', compraControllers.finalizarcompraa, compraControllers.obtenerDirecciones, (req, res) => {
    res.render("compra", { 
        user: req.user,
        carrito: req.carrito,
        direcciones: req.direcciones
    });
});

router.get('/tarjeta', (req, res) => {
    res.render("tarjeta");
});

export default router;