const {
    generateError,
    createPathIfNotExists,
    createUploadsIfNotExists,
} = require('../../helpers');
const path = require('path');
const insertUserDirectoriesQuery = require('../../db/directoriesQueries/insertUserDirectoriesQuery');

const newDirectory = async (req, res, next) => {
    try {
        // el objeto undefined es el archivo subido.
        const { directory } = req.body;

        if (!directory) {
            throw generateError(
                'No se encuentra un nombre para la carpeta',
                400
            );
        }

        await createUploadsIfNotExists();

        // Creamos una ruta absoluta al directorio de descargas.
        const newDir = path.join(
            __dirname,
            '..',
            '..',
            'uploads',
            `${req.idUser}`,
            `${directory}`
        );

        // Creamos la carpeta si no existe.
        await createPathIfNotExists(newDir);

        await insertUserDirectoriesQuery(req.idUser, directory);

        res.send({
            status: 'ok',
            message: 'Carpeta creada correctamente',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newDirectory;
