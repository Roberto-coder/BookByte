// Importar el pool de conexiones a la base de datos

// Controlador para mostrar la página de administrador
function mostrarAdminPage(req, res) {
    // Llamar a una función en el modelo para obtener los usuarios
    mostrarAdminPage(2, (error, usuarios) => {
      if (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).send('Error interno del servidor');
        return;
      }
      // Renderizar la plantilla Pug y pasar los datos de los usuarios
      res.render('admin', { usuarios: usuarios });
    });
  }

function agregarUsuario(req, res) {
    const sql = 'INSERT INTO users (user_name, user_lastname, user_email, user_password, user_role) VALUES (?, ?, ?, ?, 2)';
    // Obtener los datos del nuevo usuario desde el cuerpo de la solicitud
    const nuevoUsuario = {
      nombre: req.body.nombre,
      correo: req.body.correo,
      rol: req.body.rol
    };
  
    // Llamar a la función en el modelo para agregar el nuevo usuario
    agregarUsuario(nuevoUsuario, (error, resultado) => {
      if (error) {
        console.error('Error al agregar el usuario:', error);
        res.status(500).send('Error interno del servidor');
        return;
      }
      // Redirigir a la página de administrador después de agregar el usuario
      res.redirect('/agregar-empleado');
    });
  }
  
  module.exports=adminController;