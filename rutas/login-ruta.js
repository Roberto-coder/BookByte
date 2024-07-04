import express from "express";
import passport from '../config/passport.js';
import bcrypt from "bcrypt";
import pool from '../config/database.js';
import loginControllers from '../controllers/loginControllers.js';
import path from 'path';

const router = express.Router();

const saltRounds = 10;
function hashPassword(password) {
    return bcrypt.hash(password, saltRounds);
}

router.get('/login', loginControllers.notensureAuthenticated, (req, res) => {
    const error_msg = req.flash('error'); // Obtiene el mensaje de error
    res.render('login', { error_msg });
});

router.get('/compras', (req, res) => {
    // Implementar lógica para compras si es necesario
});

function checkDuplicateEmail(req, res, next) {
    const email = req.body.signup_email;
    pool.query('SELECT user_id FROM users WHERE user_email = ?', [email], (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Error en el servidor' });
        }
        if (results.length > 0) {
            req.flash('error', 'El correo electrónico ya está registrado');
            return res.redirect('/signup');
        }
        next();
    });
}
// Ruta para mostrar el formulario de registro
router.get('/signup', (req, res) => {
    const error_msg = req.flash('error');
    res.render('login', { error_msg });
});

// Registro de usuario
router.post('/signup', checkDuplicateEmail, async (req, res) => {
    try {
        const { signup_name, signup_lastname, signup_email, signup_password } = req.body;
        const hash = await hashPassword(signup_password);
        pool.query('INSERT INTO users (user_name, user_lastname, user_email, user_password, user_role) VALUES (?, ?, ?, ?, ?)',
            [signup_name, signup_lastname, signup_email, hash, 2], (error, results) => {
                if (error) {
                    res.status(500).send(error);
                } else {
                    const insertedId = results.insertId;
                    const newUser = {
                        id: insertedId,
                        name: signup_name,
                        lastname: signup_lastname,
                    };
                    req.login(newUser, (err) => {
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

// Ruta para autenticar y redirigir basada en el rol del usuario
router.post('/signin', passport.authenticate('local', {
    failureRedirect: '/login', // Redirigir en caso de falla de autenticación
    failureFlash: true // Opcional: para mensajes de flash
}), (req, res) => {
    // Verificar el rol del usuario después de la autenticación
    switch (req.user['user_role']) {
        case 0:
            res.redirect('/admin');
            break;
        case 1:
            res.redirect('/vendedor');
            break;
        case 2:
            res.redirect('/cliente');
            break;
        case 3:
            res.redirect('/gerente');
            break;
        case 4:
            res.redirect('/caja');
            break;
        default:
            res.redirect('/'); // Redirigir a una página por defecto en caso de un rol desconocido
    }
});

router.get('/logout', (req, res, next) => {
    const id_user = req.user.id;
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        // Opcionalmente, destruir la sesión
        req.session.destroy(() => {
            res.redirect('/'); // Redireccionar al usuario después de cerrar sesión
        });
    });
});

export default router;
