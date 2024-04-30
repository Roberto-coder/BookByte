import pool from '../config/database.js';
import util from 'util';
import passport from '../config/passport.js';

// Promisificar pool.query()
const queryAsync = util.promisify(pool.query).bind(pool);

async function getData(req, res) {
    const idCliente = req.user.idCliente; 

    try {
        const query = `
            SELECT c.idCliente, c.idLibro
            FROM carrito c
            INNER JOIN books l ON c.idLibro = l.book_id
            WHERE c.idCliente = ?
        `;
        
        const result = await queryAsync(query, [idCliente]);
        console.log(result);
        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(404).send('No hay datos en el carrito para este usuario.');
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error al obtener datos del carrito');
    }
}

async function carritoo(req, res) {
    const { id } = req.params;
    const idCliente = req.user.user_id;
    console.log(idCliente);

    try {
        await queryAsync('INSERT INTO carrito (idCliente, idLibro) VALUES (?,?)', [idCliente, id]);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al añadir al carrito');
    }
}

export default { getData, carritoo };
