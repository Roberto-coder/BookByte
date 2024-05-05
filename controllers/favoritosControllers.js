import pool from '../config/database.js';


function getData(req, res, next) {
    if(req.isAuthenticated()){
        const idCliente = req.user.user_id; 
        console.log(idCliente);
        try {
            const query = `
                SELECT f.id_user, f.id_book, l.book_id,l.book_name, l.book_price, l.book_genre, l.book_isbn
                FROM favoritos f
                INNER JOIN books l ON f.id_book = l.book_id
                WHERE f.id_user = ?
            `;
            pool.query(query, [idCliente], (error, results) =>{
                if (error) {
                    console.log(error);
                }
                if(results.length > 0){
                    req.favoritos = results;
                }else{
                    req.favoritos = null;
                }
                
                return next();
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Error al obtener datos de Favoritos');
        }    
    }else{
        req.favoritos= null;
        return next();
        
    }
}

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



async function eliminarfavs(req, res) {
    const { id } = req.params;
    const idCliente = req.user.user_id;
    const query = `
    DELETE  
    FROM favoritos
    WHERE id_user = ? AND id_book = ?
    `;
    console.log(query);
        pool.query(query, [idCliente, id], (error, results) =>{
            if(error){
                console.log(error);
            }
            res.redirect('/');
        });
}


export default { getData, agregarAFavoritos,eliminarfavs };
