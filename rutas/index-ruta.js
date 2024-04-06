import  express  from "express";
import pool from '../config/database.js';
const router = express.Router();
router.get('/', (req, res) =>{
    pool.query('SELECT * FROM books ORDER BY book_datePublication DESC LIMIT 4',
    (error, results) =>{
        if (error) {
            res.render("ERROR");
        }else{
        console.log(results);
        res.render("index", { newBooks: results });
        }
    });

});
export default router;