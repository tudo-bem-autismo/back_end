const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: multer.diskStorage({
        destination: (request, file, callback) => {
            callback(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"))
        },
        filename: (req, file, callback) => {
            crypto.randomBytes(16, (error, hash) => {
                if(error) callback(error);

                const fileName = `${hash.toString('hex')}-${file.originalname}`;
               
                callback(null, fileName);
            })
        },
    }),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (request, file, callback) => {
        const allowedMimes = [
            'image/jpg',
            'image/png',
            'image/jpeg',
            'image/gif'
        ];

        if(allowedMimes.includes(file.mimetype)) {
            callback(null, true);
        }else{
            callback(new Error("Tipo de arquivo inválido."));
        }
    }
};