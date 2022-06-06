const { generateError } = require('../../helpers');
const path = require('path');
const fs = require('fs/promises');
const { zip } = require('zip-a-folder');
const selectUserOneFolderQuery = require('../../db/foldersQueries/selectUserOneFolderQuery');

const downloadFolder = async (req, res, next) => {
    try {
        // el objeto undefined es el archivo subido.
        const { folderId } = req.params;

        if (isNaN(folderId)) {
            throw generateError('No se encuentra un id de carpeta', 400);
        }

        const [folder] = await selectUserOneFolderQuery(req.idUser, folderId);

        // Creamos una ruta absoluta al directorio de descargas.
        const folderPath = path.join(
            __dirname,
            '..',
            '..',
            'uploads',
            `${req.idUser}`,
            `${folder.name}`
        );

        // Creamos la ruta para la carpeta comprimida
        const zipPath = path.join(
            __dirname,
            '..',
            '..',
            'uploads',
            `${req.idUser}`,
            `${folder.name}.zip`
        );

        // Comprimimos la carpeta
        await zip(folderPath, zipPath);

        // Descargamos el archivo
        res.download(zipPath);
    } catch (err) {
        next(err);
    } finally {
        // Eliminamos el archivo zip
        if (req.params) {
            const { folderId } = req.params;

            if (isNaN(folderId)) {
                throw generateError('No se encuentra un archivo', 400);
            }

            const [folder] = await selectUserOneFolderQuery(
                req.idUser,
                folderId
            );
            const zipPath = path.join(
                __dirname,
                '..',
                '..',
                'uploads',
                `${req.idUser}`,
                `${folder.name}.zip`
            );
            await fs.unlink(zipPath);
        }
    }
};

module.exports = downloadFolder;
