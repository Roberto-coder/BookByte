
import { mostrarAdminPage, agregarUsuario, editarUsuario, obtenerUsuarioPorId, eliminarUsuario} from '../models/admin-modelo.js';
import bcrypt from "bcrypt";

const saltRounds = 10;
function hashPassword(password) {
    return bcrypt.hash(password, saltRounds);
}

// Controlador para mostrar la página de administrador
function mostrarAdmin(req, res) {
    // Llamar a una función en el modelo para obtener los usuarios
    mostrarAdminPage((error, usuarios) => {
      if (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).send('Error interno del servidor');
        return;
      }
      // Renderizar la plantilla Pug y pasar los datos de los usuarios
      res.render('admin', { usuarios: usuarios });
    });
  }

  async function agregarEmpleado(req, res) {
    try{
      const hash = await hashPassword(req.body.password);
      const nuevoUsuario = {
        user_name: req.body.nombre,
        user_lastname: req.body.apellido,
        user_email: req.body.correo,
        //contraseña: req.body.user_password
        user_password: hash
      };
  
      // Llamar a la función en el modelo para agregar el nuevo usuario
      agregarUsuario(nuevoUsuario, (error, resultado) => {
        if (error) {
          console.error('Error al agregar el usuario:', error);
          res.status(500).send('Error interno del servidor');
          return;
        }
        // Redirigir a la página de administrador después de agregar el usuario
        //res.render('admin', { usuarios: usuarios });
        res.redirect('/admin');
      });
    } catch (err){
        console.error(err);
        res.status(500).send('Error al procesar la solicitud');
    }
  }

  async function editarEmpleado(req, res) {
    try {
        //const userId = req.params.id;
        const userData = {
          user_id: req.body.id,
          user_name: req.body.nombre,
          user_lastname: req.body.apellido,
          user_email: req.body.correo,
          //contraseña: req.body.user_password
          user_password:  await bcrypt.hash(req.body.password, 10)
        };

        /*// Verificar si se proporcionó una nueva contraseña
        if (req.body.password) {
            // Hash de la nueva contraseña
            const hash = await bcrypt.hash(req.body.password, 10);
            // Agregar el hash de la contraseña a los datos del usuario
            userData.password = hash;
        }*/

        // Llamar a la función para editar el usuario en el modelo
        editarUsuario(userData.user_id, userData, (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Error al editar usuario' });
            }
            res.redirect('/admin');
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al procesar la solicitud');
    }
}

  function empleadoID(req, res) {
    const userId = req.query.id; // Obtiene el ID del usuario de la consulta (query) de la URL

    // Llama al método del modelo para obtener los datos del usuario por su ID
    obtenerUsuarioPorId(userId, (error, usuario) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener datos del usuario' });
        }

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Renderizar la vista de edición y pasar los datos del usuario como contexto
        res.render('Empleado/editar-empleado', { usuario: usuario });
    });
};

const eliminarEmpleado = (req, res) => {
  const userId = req.query.id; // Obtener el ID del usuario de los parámetros de la ruta

  // Llamar a la función para eliminar el usuario en el modelo
  eliminarUsuario(userId, (error, results) => {
      if (error) {
          return res.status(500).json({ error: 'Error al eliminar usuario' });
      }
      // La eliminación del usuario se ha completado correctamente
      res.redirect('/admin');
  });
};


  export { mostrarAdmin, agregarEmpleado, editarEmpleado, empleadoID, eliminarEmpleado };