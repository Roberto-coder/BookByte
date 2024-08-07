import express from "express";
import pool from '../config/database.js';
import carritoControllers from "../controllers/carritoControllers.js";
import favoritosControllers from "../controllers/favoritosControllers.js";
import compraControllers from "../controllers/compraControllers.js";
import tarjetaControllers from "../controllers/tarjetaControllers.js";
import vendedorControllers from "../controllers/vendedorControllers.js";
import apartadoControllers from "../controllers/apartadoControllers.js";
import cajaControllers from "../controllers/cajaControllers.js";
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

router.get('/vendedor',(req,res)=>{
    res.render('Empleado/vendedor', { results: req.results || [] });
});

router.get('/caja', (req, res) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    const total = req.session.cart.reduce((acc, item) => acc + parseFloat(item.book_price), 0).toFixed(2);
    res.render('Empleado/caja', { cart: req.session.cart, total, addedBook: null, error: null });
});

router.post('/caja', cajaControllers.buscarLibro);
router.post('/caja/remove', cajaControllers.removeFromCart);
router.post('/caja/checkout', cajaControllers.checkout);
export default router;