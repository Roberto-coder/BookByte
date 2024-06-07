import express from "express";
import path from "path";
import flash from "connect-flash";
import session from "express-session";

import imagenesRuta from "./rutas/imagenes-ruta.js";
import indexruta from "./rutas/index-ruta.js";
import loginruta from "./rutas/login-ruta.js";

import carritoRuta from "./rutas/carrito-ruta.js";
import pruebasruta from "./rutas/pruebas-ruta.js";
import catalogoruta from "./rutas/catalogo-ruta.js";
import adminRuta from "./rutas/admin-ruta.js";
import passport from "./config/passport.js";
import favoritosRuta from "./rutas/favoritos-ruta.js";
import gerente from "./rutas/gerente-ruta.js";
import compraRuta from "./rutas/compra-ruta.js"
import tarjetaRuta from "./rutas/tarjeta-ruta.js"
const __dirname = (process.platform === "win32")
        ? path.resolve()
        : path.dirname(new URL(import.meta.url).pathname);

// Crear una instancia de la aplicación Express
const app = express();
// Configuración de express-session
const expressSession = session({
    secret: 'tu_secreto', // Reemplaza 'tu_secreto' con una cadena secreta real
    resave: false,
    saveUninitialized: false
});
app.use(expressSession);
// Middleware
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Otros middleware que necesites...
// Inicializaciones
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
// Definir más rutas y controladores según sea necesario...
app.use('/', indexruta);
app.use('/', loginruta);
app.use('/', pruebasruta);
app.use('/', catalogoruta);
app.use('/', imagenesRuta);
app.use('/', adminRuta);
app.use('/', carritoRuta);
app.use('/', favoritosRuta);
app.use('/', gerente);
app.use('/',compraRuta);
app.use('/', tarjetaRuta);
// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

