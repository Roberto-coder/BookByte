
import * as modeloGerente from '../models/gerente-modelo.js';

function mostrarReportes(req, res) {

    const year = req.query.year || new Date().getFullYear(); // Default to current year if not provided
    const month = req.query.month || new Date().getMonth() + 1; // Default to current month if not provided

    // Imprimir los valores recibidos para depuración
    //console.log('Year:', year); 
    //console.log('Month:', month);
    
    modeloGerente.mostrarReportes(year, month,(error, datos) => {
         
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

  function mostrarGraficas(req, res) {
    const year = req.query.year; 
    const month = req.query.month;
    modeloGerente.mostrarGraficas(year, month,(error, datos) => {
         
        if (error) {
            console.error('Error al obtener los datos:', error);
            res.status(500).send('Error interno del servidor');
            return;
        }
  
        // Extraer los usuarios y los libros de los datos
        const libros = datos[0];
        const generos = datos[1];
        const autores = datos[2];
  
        if (req.xhr) {
            // Si es una solicitud AJAX, enviar los datos en formato JSON
            res.json({libros: libros, generos:generos, autores:autores});
        } else {
            // Si es una solicitud normal de navegación, renderizar la página HTML
            res.render('gerente', { user: req.user, libros: libros, generos:generos, autores:autores});
        }
    });
  }

  export default { 
    mostrarReportes, mostrarGraficas
    };