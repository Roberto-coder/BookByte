import pool from '../config/database.js';
import util from 'util';
import passport from '../config/passport.js';

async function getData(req, res) {
    const idCliente = req.user.idCliente; 
    try {
        const query = `
            SELECT c.idCliente, c.idLibro
            FROM carrito c
            INNER JOIN books l ON c.idLibro = l.book_id
            WHERE c.idCliente = ?
        `;
        pool.query(query, [idCliente], (error, results) =>{
            console.log(results);
            if (results.length > 0) {
                res.json(results);
            } else {
                res.status(404).send('No hay datos en el carrito para este usuario.');
            }
        });

        

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error al obtener datos del carrito');
    }
}

async function carritoo(req, res) {
    const { id } = req.params;
    const idCliente = req.user.user_id;
    const query = 'INSERT INTO carrito (idCliente, idLibro) VALUES (?,?)';
    try {
        pool.query(query, [idCliente, id], (error, results) =>{
            if(error){
                console.log(error);
            }
            res.redirect('/');
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al añadir al carrito');
    }
}

export default { getData, carritoo };
