// Importa el objeto `pool` desde el archivo de configuración
import pool from '../config/database.js';

// Define las funciones de los controladores
function mostrarAdminPage(req, res) {
    // Definir `rol` aquí si es necesario
    const rol = 2;
    // Ejecutar la consulta SQL utilizando el objeto `pool`
    pool.query('SELECT user_id, user_name, user_email FROM users WHERE user_role = ?', [rol], (error, resultados) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            res.status(500).send('Error interno del servidor');
            return;
        }
        // Renderizar la plantilla Pug y pasar los datos de los usuarios
        res.render('admin', { usuarios: resultados });
    });
}

function agregarUsuario(req, res) {
    // Aquí debes obtener los datos del nuevo usuario desde el cuerpo de la solicitud
    // y ejecutar la consulta SQL utilizando el objeto `pool`
    const nuevoUsuario = req.body;
    pool.query('INSERT INTO users (user_name, user_lastname, user_email, user_password, user_role) VALUES (?, ?, ?, ?, 2)', [nuevoUsuario.user_name, nuevoUsuario.user_lastname, nuevoUsuario.user_email, nuevoUsuario.user_password], (error, resultado) => {
        if (error) {
            console.error('Error al agregar el usuario:', error);
            res.status(500).send('Error interno del servidor');
            return;
        }
        // Redirigir a la página deseada después de agregar el usuario
        res.redirect('/admin',resultado);
    });
}

// Exporta las funciones de los controladores
export { mostrarAdminPage, agregarUsuario };