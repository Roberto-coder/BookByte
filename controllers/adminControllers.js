// Importar el pool de conexiones a la base de datos
import { mostrarAdminPage, agregarUsuario } from '../models/admin-modelo.js';
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

  


  export { mostrarAdmin, agregarEmpleado };