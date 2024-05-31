import pool from "../config/database.js";

function finalizarcompraa(req, res, next) {
    if (req.isAuthenticated()) {
        const idCliente = req.user.user_id;
        console.log(idCliente);
        try {
            const query = `
                SELECT c.idCliente, c.idLibro, l.book_id, l.book_name, l.book_price, l.book_genre, l.book_isbn, d.cantidad
                FROM carrito c
                INNER JOIN books l ON c.idLibro = l.book_id
                LEFT JOIN disponibles d ON l.book_id = d.idLibro
                WHERE c.idCliente = ?
            `;

            pool.query(query, [idCliente], (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Error al obtener datos del carrito');
                }
                if (results.length > 0) {
                    req.carrito = results;
                    req.disponibles = results.reduce((acc, libro) => {
                        acc[libro.book_id] = libro.cantidad;
                        return acc;
                    }, {});
                } else {
                    req.carrito = [];
                    req.disponibles = {};
                }
                return next();
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Error al obtener datos del carrito');
        }
    } else {
        req.carrito = [];
        req.disponibles = {};
        return next();
    }
}

function operaciones(req,res,next) {
   
   const {id} = req.params ;
   const nuevaCantidad = parseInt(req.body.cantidad, 10);
   const query = `SELECT book_price FROM books WHERE book_id = ? `;
   
   pool.query(query, [id], (error, results) => {
    if (error) {
        console.error(error);
        return res.status(500).send('Error al consultar el precio');
    }
   
    res.redirect('/compra');
});

}

function generarOrden(req, res, next) {
    const idCliente = req.user.user_id;
    

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.beginTransaction(err => {
            if (err) throw err;

            const queryInsertOrden = `
                INSERT INTO orden (ID_USUARIO,  TOTAL)
                VALUES (?, ?)
            `;

            const total = req.carrito.reduce((acc, item) => acc + (item.book_price * item.carrito_cantidad), 0);

            connection.query(queryInsertOrden, [idCliente, total], (error, results) => {
                if (error) {
                    return connection.rollback(() => {
                        throw error;
                    });
                }

                const idOrden = results.insertId;
                const queryInsertDetalle = `
                    INSERT INTO detalle_orden (ID_ORDEN, ID_PRODUCTO, PRECIO)
                    VALUES ?
                `;

                const detalles = req.carrito.map(item => [idOrden, item.book_id, item.carrito_cantidad, item.book_price]);

                connection.query(queryInsertDetalle, [detalles], (error, results) => {
                    if (error) {
                        return connection.rollback(() => {
                            throw error;
                        });
                    }

                    const queryDeleteCarrito = `DELETE FROM carrito WHERE idCliente = ?`;

                    connection.query(queryDeleteCarrito, [idCliente], (error, results) => {
                        if (error) {
                            return connection.rollback(() => {
                                throw error;
                            });
                        }

                        connection.commit(err => {
                            if (err) {
                                return connection.rollback(() => {
                                    throw err;
                                });
                            }
                            res.redirect('/compra');
                        });
                    });
                });
            });
        });
    });
}


export default { finalizarcompraa,operaciones,generarOrden };
