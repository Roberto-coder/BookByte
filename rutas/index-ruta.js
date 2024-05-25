import  express  from "express";
import pool from '../config/database.js';
import carritoControllers from "../controllers/carritoControllers.js";
import favoritosControllers from "../controllers/favoritosControllers.js";
import compraControllers from "../controllers/compraControllers.js";
const router = express.Router();
router.get('/', carritoControllers.getData, favoritosControllers.getData,compraControllers.finalizarCompra, (req, res) =>{
    pool.query('SELECT * FROM books ORDER BY book_datePublication DESC LIMIT 4',
    (error, results) =>{
        if (error) {
            //res.render("ERROR");
            res.redirect
            throw error;
        }else{
        res.render("index", { newBooks: results, user: req.user, carrito: req.carrito, favoritos: req.favoritos, compra: req.compra });
        }
    });
});

router.get('/productos', carritoControllers.getData,compraControllers.finalizarCompra,(req, res) =>{
    pool.query('SELECT * FROM books ORDER BY book_datePublication DESC LIMIT 4',
    (error, results) =>{
        if (error) {
            //res.render("ERROR");
            res.redirect
            throw error;
        }else{
        res.render("productos", { newBooks: results, user: req.user, carrito: req.carrito, favoritos: req.favoritos , compra:req.compra});
        }
    });
});


export default router;