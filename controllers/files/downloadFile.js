const { generateError } = require('../../helpers');
const fs = require('fs/promises');
const path = require('path');
const selectOneFileQuery = require('../../db/filesQueries/selectOneFileQuery');

// Función para descargar un archivo
const downloadFile = async (req, res, next) => {
    try {
        
        // Recogemos la id del archivo
        const { fileId } = req.params;

        // Lanzamos un error en caso de que no se encuentre el archivo
        if (!fileId) {
            throw generateError('No se encuentra un archivo', 400);
        }

        // Localizamos el archivo en la base de datos
        const [file] = await selectOneFileQuery(req.idUser, fileId);

        // Variable que contiene la ruta del archivo
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
