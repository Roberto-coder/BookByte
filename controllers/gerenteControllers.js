
import * as modeloGerente from '../models/gerente-modelo.js';

function mostrarReportes(req, res) {
    modeloGerente.mostrarReportes((error, datos) => {
        if (error) {
            console.error('Error al obtener los datos:', error);
            res.status(500).send('Error interno del servidor');
            return;
        }
  
        // Extraer los usuarios y los libros de los datos
        const autores = datos[0];
        const libros = datos[1];
        const generos = datos[2];
  
        // Renderizar la plantilla Pug y pasar los datos de usuarios y libros
        res.render('gerente', { user: req.user, autores: autores, libros: libros, generos: generos });
    });
  }

  export default { 
    mostrarReportes
    };