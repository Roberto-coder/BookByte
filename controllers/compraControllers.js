import pool from "../config/database.js";

function finalizarcompraa(req, res,next) {
   
    if(req.isAuthenticated()){
        const idCliente = req.user.user_id; 
        console.log(idCliente);
        try{
            const query = `
                SELECT c.idCliente, c.idLibro,l.book_id, l.book_name, l.book_price, l.book_genre, l.book_isbn
                FROM carrito c
                INNER JOIN books l ON c.idLibro = l.book_id
                WHERE c.idCliente = ?
            `;

            pool.query(query, [idCliente], (error, results) =>{
                if (error) {
                    console.log(error);
                }
                if(results.length > 0){
                    req.carrito = results;
                }else{
                    req.carrito = null;
                }
                
                return next();
            });    
        }catch(err){
            console.error(err.message);
            res.status(500).send('Error al obtener datos del carrito');
        }
    }else{
        req.carrito = null;
        return next();
        
}
}

function agregarDetalle(req,res,next){
    const { id } = req.params;
    const idCliente = req.user.user_id; 
    const query = 'INSERT INTO favoritos (id_user, id_book) VALUES (?, ?)';

    pool.query(query, [idCliente, id], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error al añadir a favoritos');
        }
        res.redirect('/'); 
    });
}
function disponibles(req,res,next){
    const {id} = req.params;
    const query = 'SELECT CANTIDAD FROM disponibles WHERE idLibro = ?';

    pool.query(query, [id], (error, results) => {
        if (error) {
            console.log(error);
        }
        if(results.length > 0){
            req.disponibles = results;
        }else{
            req.disponibles = null;
        }
        
        return next();
    });
}
export default { finalizarcompraa,agregarDetalle };