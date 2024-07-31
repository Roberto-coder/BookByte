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
router.post('/buscar', carritoControllers.getData, favoritosControllers.getData, (req, res) =>{
    const inputSearch = req.body.inputSearch;
    pool.query(`
    SELECT *
    FROM books
    WHERE LOWER(book_name) LIKE LOWER(CONCAT('%', ?, '%'))
    OR LOWER(book_genre) LIKE LOWER(CONCAT('%', ?, '%'))
    OR LOWER(book_author) LIKE LOWER(CONCAT('%', ?, '%'));

    `, [inputSearch, inputSearch, inputSearch] ,(error, results) => {
        if (error) {
            throw error;
        } else {
            res.render("busqueda", { newBooks: results, user: req.user, carrito: req.carrito, favoritos: req.favoritos });
        }
    });
});

router.get('/buscar/:categoria', carritoControllers.getData, favoritosControllers.getData, (req, res) =>{
    const inputSearch = req.params.categoria;
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

router.get('/Libro/:LibroID', carritoControllers.getData, favoritosControllers.getData, (req, res) =>{
    const LibroID = req.params.LibroID;
    pool.query(`
    SELECT *
    FROM books
    WHERE book_id = ?;
    `, [LibroID] ,(error, results) => {
        if (error) {
            throw error;
        } else {
            res.render("libro", { libro: results[0], user: req.user, carrito: req.carrito, favoritos: req.favoritos });
        }
    });
});

router.post('/ranking', carritoControllers.getData, favoritosControllers.getData, (req, res) => {
    const { bookId, rating } = req.body;

    pool.query(`
        SELECT book_rating
        FROM books
        WHERE book_id = ?
    `, [bookId], (error, results) => {
        if (error) {
            throw error;
        } else {
            let new_rating;
            let current_rating = parseInt(results[0].book_rating);

            if (isNaN(current_rating) || current_rating == -1) {
                new_rating = parseInt(rating);
            } else {
                let rating_value = parseInt(rating);
                if (!isNaN(rating_value)) {
                    new_rating = (current_rating + rating_value) / 2;
                } else {
                    console.error("El valor de rating proporcionado no es un número válido");
                    res.status(400).send("Error: el valor de rating proporcionado no es válido");
                    return;
                }
            }

            // Asegurarse de que new_rating sea un número válido antes de ejecutar la consulta de actualización
            if (!isNaN(new_rating)) {
                pool.query(`
                    UPDATE books
                    SET book_rating = ?
                    WHERE book_id = ?;
                `, [new_rating, bookId], (error, results) => {
                    if (error) {
                        throw error;
                    } else {
                        console.log("Rating actualizado con éxito");
                        res.status(200).send("Rating actualizado con éxito");
                    }
                });
            } else {
                console.error("El valor calculado de new_rating no es un número válido");
                res.status(400).send("Error en la actualización del rating");
            }
        }
    });
});
export default router;

