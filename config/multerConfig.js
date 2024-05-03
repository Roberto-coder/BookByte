import path from 'path';
import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';
const __dirname = (process.platform === "win32")
        ? path.resolve()
        : path.dirname(new URL(import.meta.url).pathname);
// Middleware para convertir la imagen a JPEG antes de guardarla
function convertToJPEG(req, res, next) {
    if (req.file) {
        // Utilizar Sharp para convertir la imagen a JPEG
        sharp(req.file.path)
            .toFormat('jpeg')
            .jpeg({ quality: 90 }) // Ajustar la calidad según tus preferencias
            .toFile(req.file.path, (err, info) => {
                if (err) {
                    return next(err);
                }
                next();
            });
    } else {
        next();
    }
}
// Configuración para almacenamiento de imágenes de perfil
const bookStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const book_genre = req.body.genero;
        const dir = path.join(__dirname, '/private/img_books/' + book_genre);

        // Verificar si el directorio existe
        fs.access(dir, fs.constants.F_OK, (error) => {
            if (error) {
                // Si el directorio no existe, crearlo
                fs.mkdir(dir, { recursive: true }, (error) => {
                    if (error) {
                        cb(error, null);
                    } else {
                        cb(null, dir);
                    }
                });
            } else {
                // Si el directorio ya existe, simplemente continuar
                cb(null, dir);
            }
        });
    },
    filename: function (req, file, cb) {
        const isbn = req.body.isbn;
        const fileExtension = '.jpg'; // Siempre guardar como JPEG
        cb(null, isbn + fileExtension);
    }
});


const uploadBookImage = multer({ storage: bookStorage });

export { uploadBookImage, convertToJPEG};




