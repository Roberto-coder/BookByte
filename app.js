import express from "express";
import path from "path";
import loginruta from "./rutas/login-ruta.js";

const __dirname = (process.platform === "win32")
        ? path.resolve()
        : path.dirname(new URL(import.meta.url).pathname);

// Crear una instancia de la aplicación Express
const app = express();

// Middleware

// Otros middleware que necesites...

// Definir las rutas
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

// Definir más rutas y controladores según sea necesario...
app.use('/',loginruta);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

