import pool from "../config/database.js";

function registrarTarjeta(req, res, next) {
    res.render("tarjeta");
}

export default { registrarTarjeta };
