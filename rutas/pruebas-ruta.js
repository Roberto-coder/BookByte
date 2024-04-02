import  express  from "express";
import passport  from '../config/passport.js';
import bcrypt from "bcrypt";
import pool from '../config/database.js';
import path from 'path';
const router = express.Router();
router.get('/header',(req,res)=>{
    const error_msg = req.flash('error'); // Obtiene el mensaje de error
    res.render('header');
});
export default router;