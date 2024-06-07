import pool from "../config/database.js";

function finalizarcompraa(req, res, next) {
    if (req.isAuthenticated()) {
        const idCliente = req.user.user_id;
        const queryCarrito = `
            SELECT c.idCliente, c.idLibro, l.book_id, l.book_name, l.book_price, l.book_genre, l.book_isbn, d.cantidad AS disponibles, c.cantidad AS carrito_cantidad
            FROM carrito c
            INNER JOIN books l ON c.idLibro = l.book_id
            LEFT JOIN disponibles d ON l.book_id = d.idLibro
            WHERE c.idCliente = ?
        `;

        pool.query(queryCarrito, [idCliente], (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).send('Error al obtener datos del carrito');
            }
            req.carrito = results.length > 0 ? results : [];
            console.log("Carrito obtenido:", req.carrito);
            next();
        });
    } else {
        req.carrito = [];
        next();
    }
}
function obtenerDirecciones(req, res, next) {
    if (req.isAuthenticated()) {
        const idCliente = req.user.user_id;
        const queryDirecciones = `
            SELECT * FROM domicilios WHERE idCliente = ?
        `;
        pool.query(queryDirecciones, [idCliente], (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).send('Error al obtener direcciones');
            }
            req.direcciones = results;
            console.log("Direcciones obtenidas:", req.direcciones);
            next();
        });
    } else {
        req.direcciones = [];
        next();
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

function capturaDireccion(req, res, next) {
    const { nombre, cp, estado, municipio, colonia, calle, numero, sin_numero, interior, calle1, calle2, tipo, telefono, indicaciones } = req.body;
    const idCliente = req.user.user_id;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.beginTransaction(err => {
            if (err) throw err;
            const query = `
                INSERT INTO domicilios (idCliente, Nombre, CP, ESTADO, Municipio, colonia, calle, numExterior, numInterior, calleext1, calleext2, telefono, indicaciones)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            connection.query(query, [idCliente, nombre, cp, estado, municipio, colonia, calle, numero, interior, calle1, calle2, telefono, indicaciones], (error, results) => {
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
}

function generarOrden(req, res, next) {
    const idCliente = req.user.user_id;
    const idDomicilio = req.body.domicilioId;

    if (!idDomicilio) {
        return res.status(400).send('No se ha seleccionado un domicilio');
    }

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.beginTransaction(err => {
            if (err) throw err;

            const total = (req.carrito || []).reduce((acc, item) => acc + (item.book_price * item.carrito_cantidad), 0);

            const queryInsertOrden = `
                INSERT INTO orden (ID_USUARIO, ID_DOMICILIO, total) 
                VALUES (?, ?, ?)
            `;

            connection.query(queryInsertOrden, [idCliente, idDomicilio, total], (error, results) => {
                if (error) {
                    return connection.rollback(() => {
                        throw error;
                    });
                }

                const idOrden = results.insertId;

                const detalles = (req.carrito || []).map(item => [idOrden, item.book_id, item.carrito_cantidad, item.book_price * item.carrito_cantidad]);

                if (detalles.length > 0) {
                    const queryInsertDetalle = `
                        INSERT INTO detalle_orden (ID_ORDEN, ID_PRODUCTO, CANTIDAD, PRECIO)
                        VALUES ?
                    `;

                    connection.query(queryInsertDetalle, [detalles], (error, results) => {
                        if (error) {
                            return connection.rollback(() => {
                                throw error;
                            });
                        }

                        connection.query('DELETE FROM carrito WHERE idCliente = ?', [idCliente], (error, results) => {
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

                                res.redirect('/tarjeta');  // Redirigir a la ruta de tarjeta después de generar la orden
                            });
                        });
                    });
                } else {
                    connection.commit(err => {
                        if (err) {
                            return connection.rollback(() => {
                                throw err;
                            });
                        }

                        res.redirect('/tarjeta');  // Redirigir a la ruta de tarjeta si no hay detalles
                    });
                }
            });
        });
    });
}
export default { finalizarcompraa, obtenerDirecciones, operaciones, generarOrden, capturaDireccion};
