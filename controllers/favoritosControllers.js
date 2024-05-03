import pool from '../config/database.js';
async function favoritos(req, res) {
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

export default {favoritos};