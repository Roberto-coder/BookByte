import  express  from "express";
import passport  from '../config/passport.js';
import bcrypt from "bcrypt";
import pool from '../config/database.js';
import path from 'path';
const router = express.Router();
const __dirname = (process.platform === "win32")
        ? path.resolve()
        : path.dirname(new URL(import.meta.url).pathname);
const saltRounds = 10;
function hashPassword(password) {
    return bcrypt.hash(password, saltRounds);
}
router.get('/login',(req,res)=>{
    const error_msg = req.flash('error'); // Obtiene el mensaje de error
    res.render('login', { error_msg });
});
router.post('/signup', async (req, res) => {
    try {
        const { signup_name, signup_lastname, signup_email, signup_password } = req.body;
        console.log(req.body);
        const hash = await hashPassword(signup_password);
        pool.query('INSERT INTO users (user_name, user_lastname, user_email, user_password) VALUES (?, ?, ?, ?)',
                [signup_name, signup_lastname, signup_email, hash], (error, results) => {
                    if (error) {
                        // Manejo de error al intentar guardar en la base de datos
                        res.status(500).send(error);
                    } else {
                        // El usuario se ha registrado exitosamente, ahora crea una sesión para él
                        const insertedId = results.insertId;
                        const newUser = {
                            id: insertedId,
                            name: signup_name,
                            lastname: signup_lastname,
                        };
                        req.login(newUser, (err) => { // Passport expone este método en req
                            if (err) {
                                res.status(500).send('Error al iniciar sesión');
                            } else {
                                res.redirect('/'); // Redirigir al usuario a una parte segura del sitio
                            }
                        });
                    }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al procesar la solicitud');
    }
});
router.post('/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true // Opcional: para mensajes de flash
}));
export default router;