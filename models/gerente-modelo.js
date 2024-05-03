// Importa el objeto `pool` desde el archivo de configuración
import pool from '../config/database.js';

export const mostrarReportes=(callback) => {
    const sqlAutores = 'SELECT mes.mes, book_author, COUNT(*) AS repeticiones ' +
    'FROM (SELECT detalle_orden.ID_PRODUCTO,books.book_author, books.book_id FROM detalle_orden JOIN books where detalle_orden.ID_PRODUCTO = books.book_id) as autores ' +
    'JOIN (SELECT DISTINCT MONTH(fecha_registro) as mes FROM detalle_orden WHERE MONTH(fecha_registro) = MONTH(CURDATE())) AS mes ' +
    'GROUP BY book_author ORDER BY repeticiones DESC LIMIT 10;';

    const sqlGeneros = 'SELECT mes.mes, generos.book_genre, COUNT(*) AS repeticiones ' +
    'FROM (SELECT detalle_orden.ID_PRODUCTO,books.book_genre, books.book_id FROM detalle_orden JOIN books where detalle_orden.ID_PRODUCTO = books.book_id) as generos ' +
    'JOIN (SELECT DISTINCT MONTH(fecha_registro) as mes FROM detalle_orden WHERE MONTH(fecha_registro) = MONTH(CURDATE())) AS mes ' +
    'GROUP BY book_genre ORDER BY repeticiones DESC LIMIT 10;';
    
    const sqlLibros = 'SELECT mes.mes, repeticiones.repeticiones, nombre.book_name ' +
    'FROM (SELECT DISTINCT MONTH(fecha_registro) as mes FROM detalle_orden WHERE MONTH(fecha_registro) = MONTH(CURDATE())) AS mes ' +
    'JOIN (SELECT DISTINCT COUNT(*) as repeticiones FROM detalle_orden GROUP BY ID_PRODUCTO ORDER BY repeticiones DESC LIMIT 10) AS repeticiones ' +
    'JOIN (SELECT DISTINCT book_name FROM books JOIN ( SELECT ID_PRODUCTO FROM detalle_orden GROUP BY ID_PRODUCTO ORDER BY COUNT(*) DESC LIMIT 10 ) as top10 ON books.book_id = top10.ID_PRODUCTO) AS nombre;';

    pool.query(sqlAutores, (errorAutores, resultadosAutores) => {
        if (errorAutores) {
            console.error('Error al ejecutar la consulta de autores:', errorAutores);
            callback(errorAutores, null);
        } else {
            pool.query(sqlLibros, (errorLibros, resultadosLibros) => {
                if (errorLibros) {
                    console.error('Error al ejecutar la consulta de libros:', errorLibros);
                    callback(errorLibros, null);
                } else {
                    pool.query(sqlGeneros, (errorGeneros, resultadosGeneros) => {
                        if (errorGeneros) {
                            console.error('Error al ejecutar la consulta de generos:', errorGeneros);
                            callback(errorLibros, null);
                        } else {
                            callback(null, [resultadosAutores, resultadosLibros, resultadosGeneros]);
                        }
                    });
                }
            });
        }
    });
}