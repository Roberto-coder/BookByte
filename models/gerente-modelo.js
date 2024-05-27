// Importa el objeto `pool` desde el archivo de configuración
import pool from '../config/database.js';

export const mostrarReportes=(year, month,callback) => {

    const sqlAutores = 'SELECT fecha.fecha, book_author, COUNT(*) AS repeticiones '
    +'FROM (SELECT detalle_orden.ID_PRODUCTO,books.book_author, books.book_id FROM detalle_orden JOIN books where detalle_orden.ID_PRODUCTO = books.book_id) as autores '
    +'JOIN (SELECT DISTINCT fecha_registro as fecha FROM detalle_orden WHERE MONTH(fecha_registro) = ? AND YEAR(detalle_orden.fecha_registro) = ?) AS fecha '
    +'GROUP BY book_author ORDER BY repeticiones DESC LIMIT 10;'

    const sqlGeneros = 'SELECT fecha.fecha_registro, generos.book_genre, COUNT(*) AS repeticiones ' +
    'FROM (SELECT detalle_orden.ID_PRODUCTO,books.book_genre, books.book_id FROM detalle_orden JOIN books where detalle_orden.ID_PRODUCTO = books.book_id) as generos ' +
    'JOIN (SELECT detalle_orden.fecha_registro '+
    'FROM detalle_orden '+
    'JOIN books ON detalle_orden.ID_PRODUCTO = books.book_id '+
    'WHERE MONTH(detalle_orden.fecha_registro) = ? '+
    'AND YEAR(detalle_orden.fecha_registro) = ?) as fecha '+
    'GROUP BY book_genre ORDER BY repeticiones DESC LIMIT 10;';
    
    const sqlLibros = 'SELECT mes.fecha_registro, repeticiones.repeticiones, nombre.book_name ' +
    'FROM (SELECT DISTINCT fecha_registro FROM detalle_orden WHERE MONTH(fecha_registro) = ? AND YEAR(fecha_registro) = ?) AS mes ' +
    'JOIN (SELECT DISTINCT COUNT(*) as repeticiones FROM detalle_orden GROUP BY ID_PRODUCTO ORDER BY repeticiones DESC LIMIT 10) AS repeticiones ' +
    'JOIN (SELECT DISTINCT book_name FROM books JOIN ( SELECT ID_PRODUCTO FROM detalle_orden GROUP BY ID_PRODUCTO ORDER BY COUNT(*) DESC LIMIT 10 ) as top10 ON books.book_id = top10.ID_PRODUCTO) AS nombre;';

    pool.query(sqlAutores, [month, year], (errorAutores, resultadosAutores) => {
        if (errorAutores) {
            console.error('Error al ejecutar la consulta de autores:', errorAutores);
            callback(errorAutores, null);
        } else {
            pool.query(sqlLibros, [month, year], (errorLibros, resultadosLibros) => {
                if (errorLibros) {
                    console.error('Error al ejecutar la consulta de libros:', errorLibros);
                    callback(errorLibros, null);
                } else {
                    pool.query(sqlGeneros, [month, year], (errorGeneros, resultadosGeneros) => {
                        if (errorGeneros) {
                            console.error('Error al ejecutar la consulta de generos:', errorGeneros);
                            callback(errorGeneros, null);
                        } else {
                            callback(null, [resultadosAutores, resultadosLibros, resultadosGeneros]);
                        }
                    });
                }
            });
        }
    });

}

export const mostrarGraficas=(year, month,callback) => {
    const sqlLibrosYear = 'SELECT meses.mes, '+ 
    'COALESCE(SUM(detalle_orden.cantidad), 0) AS total_cantidad FROM '+
    '(SELECT 1 AS mes UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION '+
     'SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION '+
     'SELECT 11 UNION SELECT 12) AS meses '+
    'LEFT JOIN detalle_orden '+
    'ON meses.mes = MONTH(detalle_orden.fecha_registro) AND YEAR(detalle_orden.fecha_registro) = ? '+
    'GROUP BY meses.mes ORDER BY meses.mes;'

    const sqlGenres = 'SELECT fecha.fecha_registro, generos.book_genre, COUNT(*) AS repeticiones ' +
    'FROM (SELECT detalle_orden.ID_PRODUCTO,books.book_genre, books.book_id FROM detalle_orden JOIN books where detalle_orden.ID_PRODUCTO = books.book_id) as generos ' +
    'JOIN (SELECT detalle_orden.fecha_registro '+
    'FROM detalle_orden '+
    'JOIN books ON detalle_orden.ID_PRODUCTO = books.book_id '+
    'WHERE YEAR(detalle_orden.fecha_registro) = ?) as fecha '+
    'GROUP BY book_genre ORDER BY repeticiones DESC LIMIT 10;';

    const sqlAuthor = "WITH meses AS ( "+
        "SELECT 1 AS mes UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION "+
        "SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION "+
        "SELECT 11 UNION SELECT 12 ), "+
    "top_authors AS ( "+
        "SELECT DISTINCT book_author, book_id  "+
        "FROM books "+
        "LIMIT 5 ) "+
    "SELECT b.book_author, m.mes, COALESCE(SUM(d.cantidad), 0) AS total_cantidad "+
    "FROM top_authors AS b "+
    "CROSS JOIN meses AS m "+
    "LEFT JOIN detalle_orden AS d "+
    "ON b.book_id = d.ID_PRODUCTO AND MONTH(d.fecha_registro) = m.mes AND YEAR(d.fecha_registro) = ? "+
    "WHERE b.book_author = 'Frank Herbert' GROUP BY b.book_author, m.mes ORDER BY m.mes; ";

    pool.query(sqlLibrosYear, [year], (errorbooksByYear, booksByYear) => {
        if (errorbooksByYear) {
            console.error('Error al ejecutar la consulta de generos:', errorbooksByYear);
            callback(errorbooksByYear, null);
        } else {
            pool.query(sqlGenres, [year], (errorGenre, resultsGenere) => {
                if (errorGenre) {
                    console.error('Error al ejecutar la consulta de generos:', errorGenre);
                    callback(errorGenre, null);
                } else {
                    pool.query(sqlAuthor, [year], (errorAutor, resultsAutor) => {
                        if (errorAutor) {
                            console.error('Error al ejecutar la consulta de generos:', errorAutor);
                            callback(errorAutor, null);
                        } else {
                            callback(null, [booksByYear, resultsGenere, resultsAutor]);
                        }
                    });
                }
            });
        }
    });
}