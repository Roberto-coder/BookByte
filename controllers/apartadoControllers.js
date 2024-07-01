import pool from '../config/database.js';

function getData(req, res, next) {
    if(req.isAuthenticated()){
        const idCliente = req.user.user_id; 
        console.log(idCliente);
        try {
            const query = `
                SELECT c.id_user, c.id_book, c.quantity, c.reservationDate, l.book_id, l.book_name, l.book_price, l.book_genre, l.book_isbn
	            FROM apartado as c
	            INNER JOIN books as l ON c.id_book = l.book_id
	            WHERE c.id_user = ?
            `;
            pool.query(query, [idCliente], (error, results) =>{
                if (error) {
                    console.log(error);
                }
                if(results.length > 0){
                    req.apartados = results;
                }else{
                    req.apartados = null;
                }
                
                return next();
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Error al obtener datos del carrito');
        }    
    }else{
        req.apartados = null;
        return next();
        
    }
}

async function apartadoo(req, res) {
    const { id } = req.params;  // ID del libro
    const idCliente = req.user.user_id;  // ID del usuario

    const checkQuery = 'SELECT quantity FROM apartado WHERE id_user = ? AND id_book = ?';
    const insertQuery = 'INSERT INTO apartado (id_user, id_book, quantity, reservationDate) VALUES (?, ?, 1, CURRENT_DATE)';
    const updateQuery = 'UPDATE apartado SET quantity = quantity + 1 WHERE id_user = ? AND id_book = ?';

    try {
        // Verificar si el libro ya está reservado por el usuario
        pool.query(checkQuery, [idCliente, id], (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Error al verificar el libro en el apartado');
            }

            if (results.length > 0) {
                // Si el libro ya está reservado, incrementar la cantidad
                const currentQuantity = results[0].quantity;

                if (currentQuantity >= 2) {
                    return res.status(400).send('No puede reservar más de dos libros');
                }

                // Actualizar la cantidad del libro reservado
                pool.query(updateQuery, [idCliente, id], (error, results) => {
                    if (error) {
                        console.error(error);
                        return res.status(500).send('Error al actualizar la cantidad en el apartado');
                    }

                    res.redirect('/'); 
                });
            } else {
                // Insertar un nuevo registro si el libro no está reservado
                pool.query(insertQuery, [idCliente, id], (error, results) => {
                    if (error) {
                        console.error(error);
                        return res.status(500).send('Error al añadir al apartado');
                    }

                    res.redirect('/'); 
                });
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error al añadir al apartado');
    }
}



async function eliminarapatadoo(req, res) {
    const { id } = req.params;
    const idCliente = req.user.user_id;
    const query = `
    DELETE  
    FROM apartado 
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

export default { getData, apartadoo,eliminarapatadoo };
