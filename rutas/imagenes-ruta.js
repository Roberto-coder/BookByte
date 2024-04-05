import  express  from "express";
import path from 'path';
const router = express.Router();
const __dirname = (process.platform === "win32")
        ? path.resolve()
        : path.dirname(new URL(import.meta.url).pathname);
router.get('/img_book/:genre/:isr', (req, res) => {
    const { genre }= req.params;
    const { isr }= req.params;
    const rutaImagen = path.join(__dirname, 'private/img_books/' , genre, isr, '.jpg');
    console.log(rutaImagen);
    res.sendFile(rutaImagen, (err) => {
        if (err) {
            // Manejar el error, por ejemplo, si el archivo no existe
            res.status(404).send('Imagen no encontrada');
        }
    });
});
export default router;