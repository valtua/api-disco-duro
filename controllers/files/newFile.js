const {
    generateError,
    createPathIfNotExists,
    createUploadsIfNotExists,
} = require('../../helpers');
const path = require('path');
const insertUserFilesQuery = require('../../db/filesQueries/insertUserFilesQuery');

const newFile = async (req, res, next) => {
    try {
        // el objeto undefined es el archivo subido.
        const file = req.files.uploadedFile;

        if (!file) {
            throw generateError('No se encuentra un archivo', 400);
        }

        console.log(file);

        await createUploadsIfNotExists();

        // Creamos una ruta absoluta al directorio de descargas.
        const uploadsDir = path.join(
            __dirname,
            '..',
            '..',
            'uploads',
            `${req.idUser}`
        );

        // Creamos el directorio si no existe.
        await createPathIfNotExists(uploadsDir);

        file.mv(`${uploadsDir}/${file.name}`);

        await insertUserFilesQuery(req.idUser, file.name)

        res.send({
            status: 'ok',
            message: 'Archivo subido correctamente',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newFile;
