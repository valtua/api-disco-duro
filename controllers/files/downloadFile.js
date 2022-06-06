const { generateError } = require('../../helpers');
const fs = require('fs/promises');
const path = require('path');
const selectOneFileQuery = require('../../db/filesQueries/selectOneFileQuery');

const downloadFile = async (req, res, next) => {
    try {
        // el objeto undefined es el archivo subido.
        const { fileId } = req.params;

        if (isNaN(fileId)) {
            throw generateError('No se encuentra un id de archivo', 400);
        }

        const [file] = await selectOneFileQuery(req.idUser, fileId);

        // Creamos una ruta absoluta al directorio de descargas.
        const filePath = path.join(
            __dirname,
            '..',
            '..',
            'uploads',
            `${req.idUser}`,
            `${file.name}`
        );

        // Descargamos el archivo
        res.download(filePath);
    } catch (err) {
        next(err);
    }
};

module.exports = downloadFile;
