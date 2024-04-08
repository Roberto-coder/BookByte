// Importa el objeto `pool` desde el archivo de configuración
import pool from '../config/database.js';

// Define las funciones de los controladores
function mostrarAdminPage(callback) {

    // Consulta SQL para obtener los usuarios
    const sql = 'SELECT user_id, user_name, user_email FROM users WHERE user_role = 2';
    
    // Ejecutar la consulta utilizando el pool de conexiones
    pool.query(sql, (error, resultados) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            // Si hay un error, llama a la función de callback con el error
            callback(error, null);
        } else {
            // Si la consulta es exitosa, llama a la función de callback con los resultados
            callback(null, resultados);
        }
    });

}

// Función para agregar un usuario a la base de datos
const agregarUsuario = (usuarioDatos, callback) => {
    // Consulta SQL para insertar un nuevo usuario en la tabla usuarios
    usuarioDatos.user_role = 2;
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

  const editarUsuario = (userId, userData, callback) => {
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

const obtenerUsuarioPorId = (userId, callback) => {
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

const eliminarUsuario = (userId, callback) => {
  pool.query('DELETE FROM users WHERE user_id = ?', [userId], (error, results) => {
      if (error) {
          console.error('Error al eliminar usuario:', error);
          return callback(error, null);
      }
      // La eliminación del usuario se ha completado correctamente
      return callback(null, results);
  });
};


// Exporta las funciones de los controladores
export { mostrarAdminPage, agregarUsuario, editarUsuario, obtenerUsuarioPorId, eliminarUsuario };