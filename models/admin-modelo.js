// Importa el objeto `pool` desde el archivo de configuración
import pool from '../config/database.js';

export const mostrarAdminPage=(callback) => {
    const sqlUsuarios = 'SELECT * FROM users WHERE user_role!=0 AND user_role!=2 ORDER BY user_role desc ;';
    const sqlLibros = 'SELECT book_id, book_name, book_author, YEAR(book_datePublication) AS year, book_amount FROM books;';

    pool.query(sqlUsuarios, (errorUsuarios, resultadosUsuarios) => {
        if (errorUsuarios) {
            console.error('Error al ejecutar la consulta de usuarios:', errorUsuarios);
            callback(errorUsuarios, null);
        } else {
            pool.query(sqlLibros, (errorLibros, resultadosLibros) => {
                if (errorLibros) {
                    console.error('Error al ejecutar la consulta de libros:', errorLibros);
                    callback(errorLibros, null);
                } else {
                    callback(null, [resultadosUsuarios, resultadosLibros]);
                }
            });
        }
    });
}

// Función para agregar un usuario a la base de datos
export const agregarUsuario = (usuarioDatos, callback) => {
    // Consulta SQL para insertar un nuevo usuario en la tabla usuarios
    let sql = "INSERT INTO users SET ?";
    
    // Ejecutar la consulta SQL utilizando la conexión a la base de datos
    pool.query(sql, usuarioDatos, (error, resultado) => {
      if (error) {
        // Si hay un error, se pasa al callback
        return callback(error, null);
      } else {
        // Si la inserción es exitosa, se pasa al callback el ID del usuario insertado
        return callback(null, resultado.insertId);
      }
    });
  };

export const editarUsuario = (userId, userData, callback) => {
    // Realiza la actualización en la base de datos
    pool.query('UPDATE users SET ? WHERE user_id = ?', [userData, userId], (error, results) => {
        if (error) {
            console.error('Error al editar usuario:', error);
            return callback(error, null);
        }
        // La actualización del usuario se ha completado correctamente
        return callback(null, results);
    });
};

export const obtenerUsuarioPorId = (userId, callback) => {
  pool.query('SELECT * FROM users WHERE user_id = ?', [userId], (error, results, fields) => {
      if (error) {
          console.error('Error al obtener datos del usuario:', error);
          return callback(error, null);
      }
      // Si se encontraron resultados para el usuario
      if (results.length > 0) {
          const usuario = results[0];
          return callback(null, usuario);
      } else {
          // Si no se encontró ningún usuario con ese ID
          return callback(null, null);
      }
  });
};

export const eliminarUsuario = (userId, callback) => {
  pool.query('DELETE FROM users WHERE user_id = ?', [userId], (error, results) => {
      if (error) {
          console.error('Error al eliminar usuariosadsa:', error);
          return callback(error, null);
      }
      // La eliminación del usuario se ha completado correctamente
      return callback(null, results);
  });
};

export const agregarLibro = (libroDatos, callback) => {
    // Consulta SQL para insertar un nuevo usuario en la tabla usuarios
    let sql = "INSERT INTO books SET ?";
    
    // Ejecutar la consulta SQL utilizando la conexión a la base de datos
    pool.query(sql, libroDatos, (error, resultado) => {
      if (error) {
        // Si hay un error, se pasa al callback
        return callback(error, null);
      } else {
        // Si la inserción es exitosa, se pasa al callback el ID del usuario insertado
        return callback(null, resultado.insertId);
      }
    });
  };

  export const obtenerLibroPorId = (bookId, callback) => {
    pool.query('SELECT * FROM books WHERE book_id = ?', [bookId], (error, results, fields) => {
        if (error) {
            console.error('Error al obtener datos del libro:', error);
            return callback(error, null);
        }
        // Si se encontraron resultados para el libro
        if (results.length > 0) {
            const libro = results[0];
            return callback(null, libro);
        } else {
            // Si no se encontró ningún libro con ese ID
            return callback(null, null);
        }
    });
  };

  export const editarLibro = (bookId, bookData, callback) => {
    // Realiza la actualización en la base de datos
    pool.query('UPDATE books SET ? WHERE book_id = ?', [bookData, bookId], (error, results) => {
        if (error) {
            console.error('Error al editar libro:', error);
            return callback(error, null);
        }
        // La actualización del usuario se ha completado correctamente
        return callback(null, results);
    });
};

export const eliminarLibro = (bookId, callback) => {
    pool.query('DELETE FROM books WHERE book_id = ?', [bookId], (error, results) => {
        if (error) {
            console.error('Error al eliminar libro:', error);
            return callback(error, null);
        }
        // La eliminación del usuario se ha completado correctamente
        return callback(null, results);
    });
  };
