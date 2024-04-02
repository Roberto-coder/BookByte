import  express  from "express";
import passport  from '../config/passport.js';
const router = express.Router();
router.get('/login',(req,res)=>{
    res.render("login");
});
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true // Opcional: para mensajes de flash
}));
export default router;