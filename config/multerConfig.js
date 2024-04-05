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
        const { book_genre } = req.body;
        cb(null, path.join(__dirname, '/private/img_books/', book_genre));
    },
    filename: function (req, file, cb) {
        const { isr } = req.body;
        const fileExtension = '.jpg'; // Siempre guardar como JPEG
        cb(null, userId + fileExtension);
    }
});

const uploadBookImage = multer({ storage: bookStorage });

export { uploadBookImage, convertToJPEG};




