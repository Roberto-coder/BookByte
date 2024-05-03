import  express  from "express";
import pool from '../config/database.js';
import carritoControllers from "../controllers/carritoControllers.js";

const router = express.Router();
router.get('/', carritoControllers.getData, (req, res) =>{
    pool.query('SELECT * FROM books ORDER BY book_datePublication DESC LIMIT 4',
    (error, results) =>{
        if (error) {
            //res.render("ERROR");
            res.redirect
            throw error;
        }else{
        res.render("index", { newBooks: results, user: req.user, carrito: req.carrito });
        }
    });
});

router.get('/', carritoControllers.getData, (req, res) =>{
    pool.query('SELECT * FROM books ORDER BY book_datePublication DESC LIMIT 4',
    (error, results) =>{
        if (error) {
            //res.render("ERROR");
            res.redirect
            throw error;
        }else{
        res.render("productos", { newBooks: results, user: req.user, carrito: req.carrito });
        }
    });
});


export default router;