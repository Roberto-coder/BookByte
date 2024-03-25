import express from "express";
import path from "path";
import loginruta from "./rutas/login-ruta.js";

const __dirname = (process.platform === "win32")
        ? path.resolve()
        : path.dirname(new URL(import.meta.url).pathname);

// Crear una instancia de la aplicación Express
const app = express();

// Middleware
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
// Otros middleware que necesites...

// Definir las rutas
app.get('/', (req, res) => {
    res.render("index");
});

// Definir más rutas y controladores según sea necesario...
app.use('/',loginruta);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

