import pool from '../config/database.js';

function getData(req, res, next) {
    if(req.isAuthenticated()){
        const idCliente = req.user.user_id; 
        console.log(idCliente);
        try {
            const query = `
                SELECT c.idCliente, c.idLibro,l.book_id, l.book_name, l.book_price, l.book_genre, l.book_isbn
                FROM carrito c
                INNER JOIN books l ON c.idLibro = l.book_id
                WHERE c.idCliente = ?
            `;
            pool.query(query, [idCliente], (error, results) =>{
                if (error) {
                    console.log(error);
                }
                if(results.length > 0){
                    req.carrito = results;
                }else{
                    req.carrito = null;
                }
                
                return next();
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Error al obtener datos del carrito');
        }    
    }else{
        req.carrito = null;
        return next();
        
    }
}

async function carritoo(req, res) {
    const { id } = req.params;
    const idCliente = req.user.user_id;
    const query = 'INSERT INTO carrito (idCliente, idLibro,cantidad) VALUES (?,?,1)';
    
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

async function eliminarcarritoo(req, res) {
    const { id } = req.params;
    const idCliente = req.user.user_id;
    const query = `
    DELETE  
    FROM carrito 
    WHERE idCliente = ? AND idLibro = ?
    `;
    console.log(query);
        pool.query(query, [idCliente, id], (error, results) =>{
            if(error){
                console.log(error);
            }
            res.redirect('/');
        });
}

export default { getData, carritoo,eliminarcarritoo };
