import pool from "../config/database.js";

function vendedor(req, res, next) {
    const { title, author, isbn, publisher, subject } = req.body;

    let query = 'SELECT * FROM books WHERE 1=1';
    const params = [];

    if (title) {
        query += ' AND book_name LIKE ?';
        params.push(`%${title}%`);
    }
    if (author) {
        query += ' AND book_author LIKE ?';
        params.push(`%${author}%`);
    }
    if (isbn) {
        query += ' AND book_isbn = ?';
        params.push(isbn);
    }
    if (publisher) {
        query += ' AND book_editorial LIKE ?';
        params.push(`%${publisher}%`);
    }
    if (subject) {
        query += ' AND book_genre LIKE ?';
        params.push(`%${subject}%`);
    }

    // Imprimir la consulta y los parámetros
    console.log('SQL Query:', query);
    console.log('Parameters:', params);

    pool.query(query, params, (error, results) => {
        if (error) {
            return next(error);
        }
        console.log('Results:', results); // Asegúrate de que los resultados son correctos
        res.render('Empleado/vendedor', { results: results || [] });
    });
}

export default { vendedor };
