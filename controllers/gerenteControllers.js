
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
  
        if (req.xhr) {
            // Si es una solicitud AJAX, enviar los datos en formato JSON
            res.json({ autores: autores, libros: libros, generos: generos });
        } else {
            // Si es una solicitud normal de navegación, renderizar la página HTML
            res.render('gerente', { user: req.user, autores: autores, libros: libros, generos: generos });
        }
    });
  }

  export default { 
    mostrarReportes
    };