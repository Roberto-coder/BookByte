import pool from '../config/database.js'; 
import passport  from '../config/passport.js';

async function getData (req,res) {
    const { idLibro, cantidad } = req.body;
    const idCliente = req.user.user_id;
    try {
        await pool.query('Select * FROM carrito (idCliente, idLibro, cantidad) VALUES ($1, $2, $3)', [idCliente, idLibro, cantidad]);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error al añadir al carrito');
    }
}

function carritoo(req,res) {
    const { id } = req.params;
    const idCliente = req.user.user_id;
    console.log(idCliente);
     pool.query('INSERT INTO carrito (idCliente, idLibro) VALUES (?,?)', [idCliente, id],  (err,res) =>{
        if(err){
            console.log(err);
            res.send(505);
        }
        
     });
        
     res.redirect('/');
        
}


export default {getData,carritoo};   