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


// Exporta las funciones de los controladores
export { mostrarAdminPage, agregarUsuario };