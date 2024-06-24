import express from "express";
const router = express.Router();
import pool from '../config/database.js';
import carritoControllers from "../controllers/carritoControllers.js";
import favoritosControllers from "../controllers/favoritosControllers.js";


router.get('/catalogo', carritoControllers.getData, favoritosControllers.getData, (req, res) =>{
    pool.query('SELECT * FROM books ORDER BY book_datePublication DESC LIMIT 10', (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render("productos", { newBooks: results, user: req.user, carrito: req.carrito, favoritos: req.favoritos });
        }
    });
});
router.get('/buscar', carritoControllers.getData, favoritosControllers.getData, (req, res) =>{
    const { inputSearch } = req.body;
    pool.query(`
    SELECT *
    FROM books
    WHERE book_name LIKE ? 
    OR book_genre LIKE ? 
    OR book_author LIKE ?;
    `, [inputSearch, inputSearch, inputSearch] ,(error, results) => {
        if (error) {
            throw error;
        } else {
            res.render("productos", { newBooks: results, user: req.user, carrito: req.carrito, favoritos: req.favoritos });
        }
    });
});
export default router;
