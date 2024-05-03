import pool from '../config/database.js';

async function agregarAFavoritos(req, res) {
    const { id } = req.params;
    const idCliente = req.user.user_id; 
    const query = 'INSERT INTO favoritos (id_user, id_book) VALUES (?, ?)';

    pool.query(query, [idCliente, id], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error al añadir a favoritos');
        }
        res.redirect('/'); 
    });
}

export default { agregarAFavoritos };
