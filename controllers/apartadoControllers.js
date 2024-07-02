import pool from '../config/database.js';

function getData(req, res, next) {
    if (req.isAuthenticated()) {
        const idCliente = req.user.user_id;
        console.log(idCliente);
        try {
            const query = `
                SELECT c.id_user, c.id_book, c.quantity, c.reservationDate, l.book_id, l.book_name, l.book_price, l.book_genre, l.book_isbn
                FROM apartado as c
                INNER JOIN books as l ON c.id_book = l.book_id
                WHERE c.id_user = ?
            `;
            pool.query(query, [idCliente], (error, results) => {
                if (error) {
                    console.log(error);
                }
                if (results.length > 0) {
                    req.apartados = results;
                } else {
                    req.apartados = null;
                }
                
                return next();
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Error al obtener datos del apartado');
        }
    } else {
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
    const stockQuery = 'SELECT book_apartados FROM books WHERE book_id = ?';
    const decrementStockQuery = 'UPDATE books SET book_apartados = book_apartados - 1 WHERE book_id = ?';

    try {
        // Verificar el stock_apartado
        pool.query(stockQuery, [id], (error, stockResults) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Error al verificar el stock del libro');
            }

            const stockApartado = stockResults[0].stock_apartado;
            if (stockApartado <= 0) {
                return res.status(400).send('No hay stock disponible para reservar');
            }

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

                        // Decrementar el stock_apartado
                        pool.query(decrementStockQuery, [id], (error, stockResults) => {
                            if (error) {
                                console.error(error);
                                return res.status(500).send('Error al actualizar el stock del libro');
                            }
                            //res.send('Cantidad de libro actualizada exitosamente');
                            res.redirect('/'); 
                        });
                    });
                } else {
                    // Insertar un nuevo registro si el libro no está reservado
                    pool.query(insertQuery, [idCliente, id], (error, results) => {
                        if (error) {
                            console.error(error);
                            return res.status(500).send('Error al añadir al apartado');
                        }

                        // Decrementar el stock_apartado
                        pool.query(decrementStockQuery, [id], (error, stockResults) => {
                            if (error) {
                                console.error(error);
                                return res.status(500).send('Error al actualizar el stock del libro');
                            }
                            //res.send('Libro añadido al apartado exitosamente');
                            res.redirect('/'); 
                        });
                    });
                }
            });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error al añadir al apartado');
    }
}


async function eliminarapatadoo(req, res) {
    const { id } = req.params;
    const idCliente = req.user.user_id;

    const getQuantityQuery = 'SELECT quantity FROM apartado WHERE id_user = ? AND id_book = ?';
    const deleteQuery = 'DELETE FROM apartado WHERE id_user = ? AND id_book = ?';
    const incrementStockQuery = 'UPDATE books SET book_apartados = book_apartados + ? WHERE book_id = ?';

    try {
        // Obtener la cantidad de libros reservados antes de eliminar
        pool.query(getQuantityQuery, [idCliente, id], (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Error al obtener la cantidad del apartado');
            }

            if (results.length === 0) {
                return res.status(404).send('El libro no está reservado por el usuario');
            }

            const quantity = results[0].quantity;

            // Eliminar el registro de la tabla de apartados
            pool.query(deleteQuery, [idCliente, id], (error, results) => {
                if (error) {
                    console.error(error);
                    return res.status(500).send('Error al eliminar el apartado');
                }

                // Incrementar el stock_apartado con la cantidad obtenida
                pool.query(incrementStockQuery, [quantity, id], (error, stockResults) => {
                    if (error) {
                        console.error(error);
                        return res.status(500).send('Error al actualizar el stock del libro');
                    }

                    //res.send('Apartado eliminado y stock actualizado exitosamente');
                    res.redirect('/'); 
                });
            });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error al eliminar el apartado');
    }
}

export default { getData, apartadoo,eliminarapatadoo };
