
import * as modeloAdmin from '../models/admin-modelo.js';
import bcrypt from "bcrypt";

const saltRounds = 10;
function hashPassword(password) {
    return bcrypt.hash(password, saltRounds);
}

// Controlador para mostrar la página de administrador
function mostrarAdmin(req, res) {
  modeloAdmin.mostrarAdminPage((error, datos) => {
      if (error) {
          console.error('Error al obtener los datos:', error);
          res.status(500).send('Error interno del servidor');
          return;
      }

      // Extraer los usuarios y los libros de los datos
      const usuarios = datos[0];
      const libros = datos[1];

      // Renderizar la plantilla Pug y pasar los datos de usuarios y libros
      res.render('admin', { usuarios: usuarios, libros: libros });
  });
}
//---------------------------Empleados------------------------------------

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
      modeloAdmin.agregarUsuario(nuevoUsuario, (error, resultado) => {
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
        modeloAdmin.editarUsuario(userData.user_id, userData, (error, results) => {
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
    modeloAdmin.obtenerUsuarioPorId(userId, (error, usuario) => {
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

function eliminarEmpleado(req, res){
  const userId = req.query.id; // Obtener el ID del usuario de los parámetros de la ruta

  // Llamar a la función para eliminar el usuario en el modelo
  modeloAdmin.eliminarUsuario(userId, (error, results) => {
      if (error) {
          return res.status(500).json({ error: 'Error al eliminar usuario' });
      }
      // La eliminación del usuario se ha completado correctamente
      res.redirect('/admin');
  });
};
//---------------------------Libros------------------------------------
function agregarLibro(req, res) {

    const nuevoLibro = {
      book_name: req.body.titulo,
      book_author: req.body.autor,
      book_genre: req.body.genero,
      book_price: req.body.precio,
      book_numPage: req.body.paginas,
      book_datePublication: req.body.fecha,
      book_placePublication: req.body.lugar,
      book_vol: req.body.volumen,
      book_isbn: req.body.isbn,
      book_editorial: req.body.editorial,
      book_amount: req.body.cantidad
    };

    // Llamar a la función en el modelo para agregar el nuevo usuario
    modeloAdmin.agregarLibro(nuevoLibro, (error, resultado) => {
      if (error) {
        console.error('Error al agregar el libro:', error);
        res.status(500).send('Error interno del servidor');
        return;
      }
      // Redirigir a la página de administrador después de agregar el libro
      res.redirect('/admin');
    });

}

function libroID(req, res) {
  const libroId = req.query.id; // Obtiene el ID del usuario de la consulta (query) de la URL

  // Llama al método del modelo para obtener los datos del libro por su ID
  modeloAdmin.obtenerLibroPorId(libroId, (error, libro) => {
      if (error) {
          return res.status(500).json({ error: 'Error al obtener datos del libro' });
      }

      if (!libro) {
          return res.status(404).json({ error: 'Libro no encontrado' });
      }

      // Renderizar la vista de edición y pasar los datos del usuario como contexto
      res.render('Libro/editar-libro', { libro: libro });
  });
};

function editarLibro(req, res) {
  try {
      //const userId = req.params.id;
      const libroData = {
        book_id: req.body.id,
        book_name: req.body.titulo,
        book_author: req.body.autor,
        book_genre: req.body.genero,
        book_price: req.body.precio,
        book_numPage: req.body.paginas,
        book_datePublication: req.body.fecha,
        book_placePublication: req.body.lugar,
        book_vol: req.body.volumen,
        book_amount: req.body.cantidad
      };

      // Llamar a la función para editar el usuario en el modelo
      modeloAdmin.editarLibro(libroData.book_id, libroData, (error, results) => {
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

function eliminarLibro(req, res){
  const bookId = req.query.id; // Obtener el ID del usuario de los parámetros de la ruta

  // Llamar a la función para eliminar el usuario en el modelo
  modeloAdmin.eliminarLibro(bookId, (error, results) => {
      if (error) {
          return res.status(500).json({ error: 'Error al eliminar libro' });
      }
      // La eliminación del usuario se ha completado correctamente
      res.redirect('/admin');
  });
};

  export default { mostrarAdmin, agregarEmpleado, editarEmpleado, empleadoID, eliminarEmpleado
  , agregarLibro, libroID, editarLibro, eliminarLibro
  };
