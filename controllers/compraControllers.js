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
function capturaDireccion(req,res,next){
    const { nombre, cp, estado, municipio, colonia, calle, numero, sin_numero, interior, calle1, calle2, tipo, telefono, indicaciones } = req.body;
    const idCliente = req.user.user_id;
    pool.getConnection((err,connection) => {
        if(err) throw err;
        connection.beginTransaction(err =>{
            if(err) throw err;
            const query = `
                INSERT INTO domicilios (idCliente, Nombre, CP, ESTADO, Municipio,colonia,calle,numExterior,numInterior,calleext1,calleext2,telefono,indicaciones)
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
            `;
            connection.query(query, [idCliente,nombre,cp,estado,municipio,colonia,calle,numero,interior,calle1,calle2,telefono,indicaciones], (error, results) => {
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
        })
    });
}
function generarOrden(req, res, next) {
    const idCliente = req.user.user_id;
  
    
    const querySelectDom = `
      SELECT id FROM domicilios WHERE idCliente = ?
    `;
  
    pool.query(querySelectDom, [idCliente], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Error al consultar domicilio');
      }
  
      const idDomicilio = results[0]?.id; // Use optional chaining to handle potential missing id
  
      if (!idDomicilio) {
        return res.status(400).send('No se encontró domicilio registrado');
      }
  
      pool.getConnection((err, connection) => {
        if (err) throw err;
  
        connection.beginTransaction(err => {
          if (err) throw err;
  
          const queryInsertOrden = `
            INSERT INTO orden (ID_USUARIO, TOTAL, ID_DOMICILIO) 
            VALUES (?, ?, ?)
          `;
  
          const total = req.carrito.reduce((acc, item) => acc + (item.book_price * item.carrito_cantidad), 0);
  
          connection.query(queryInsertOrden, [idCliente, total, idDomicilio], (error, results) => {
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
  
            const detalles = req.carrito.map(item => [idOrden, item.book_id, item.carrito_cantidad, item.book_price * item.carrito_cantidad]);
  
            connection.query(queryInsertDetalle, [detalles], (error, results) => {
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

export default { finalizarcompraa, operaciones, generarOrden,capturaDireccion };
