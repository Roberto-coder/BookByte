import pool from "../config/database.js";

function finalizarcompraa(req, res, next) {
    if (req.isAuthenticated()) {
        const idCliente = req.user.user_id;
        try {
            const query = `
                SELECT c.idCliente, c.idLibro, l.book_id, l.book_name, l.book_price, l.book_genre, l.book_isbn, d.cantidad AS disponibles, c.cantidad AS carrito_cantidad
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
                } else {
                    req.carrito = [];
                }
                return next();
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Error al obtener datos del carrito');
        }
    } else {
        req.carrito = [];
        return next();
    }
}

function operaciones(req, res, next) {
    const idCliente = req.user.user_id;
    const idLibro = req.params.id;
    const nuevaCantidad = parseInt(req.body.cantidad, 10);

    const queryUpdate = `UPDATE carrito SET cantidad = ? WHERE idCliente = ? AND idLibro = ?`;

    pool.query(queryUpdate, [nuevaCantidad, idCliente, idLibro], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error al actualizar la cantidad');
        }
        res.redirect('/compra');
    });
}

function generarOrden(req, res, next) {
    const idCliente = req.user.user_id;
    const { metodoPago, idDomicilio } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.beginTransaction(err => {
            if (err) throw err;

            const queryInsertOrden = `
                INSERT INTO orden (ID_USUARIO, ID_METODO_PAGO, ID_DOMICILIO, TOTAL)
                VALUES (?, ?, ?, ?)
            `;

            const total = req.carrito.reduce((acc, item) => acc + (item.book_price * item.carrito_cantidad), 0);

            connection.query(queryInsertOrden, [idCliente, metodoPago, idDomicilio, total], (error, results) => {
                if (error) {
                    return connection.rollback(() => {
                        throw error;
                    });
                }

                const idOrden = results.insertId;
                const queryInsertDetalle = `
                    INSERT INTO detalle_orden (ID_ORDEN, ID_PRODUCTO, CANTIDAD, PRECIO)
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

export default { finalizarcompraa, operaciones, generarOrden };
