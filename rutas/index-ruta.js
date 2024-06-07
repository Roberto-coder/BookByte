import express from "express";
import pool from '../config/database.js';
import carritoControllers from "../controllers/carritoControllers.js";
import favoritosControllers from "../controllers/favoritosControllers.js";
import compraControllers from "../controllers/compraControllers.js";
const router = express.Router();

router.get('/',loginControllers.ensureAuthenticated, carritoControllers.getData, favoritosControllers.getData, (req, res) => {
    pool.query('SELECT * FROM books ORDER BY book_datePublication DESC LIMIT 4', (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render("index", { newBooks: results, user: req.user, carrito: req.carrito, favoritos: req.favoritos });
        }
    });
});

router.get('/productos',loginControllers.ensureAuthenticated, carritoControllers.getData, (req, res) => {
    pool.query('SELECT * FROM books ORDER BY book_datePublication DESC LIMIT 4', (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render("productos", { newBooks: results, user: req.user, carrito: req.carrito, favoritos: req.favoritos });
        }
    });
});

router.get('/compra', compraControllers.finalizarcompraa, (req, res) => {
    res.render("compra", { user: req.user,
        carrito: req.carrito,
        direcciones: req.direcciones
    });
});

router.get('/tarjeta', (req, res) => {
    res.render("tarjeta");
});

export default router;
