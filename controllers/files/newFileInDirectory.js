const {
    generateError,
    createPathIfNotExists,
    createUploadsIfNotExists,
} = require('../../helpers');
const path = require('path');
const insertUserFilesQuery = require('../../db/filesQueries/insertUserFilesQuery');
const selectUserFolderQuery = require('../../db/directoriesQueries/selectUserFolderQuery');

const newFileInDirectory = async (req, res, next) => {
    try {
        // el objeto undefined es el archivo subido.
        const file = req.files.uploadedFile;
        const { folderId } = req.params;
        if (!file) {
            throw generateError('No se encuentra un archivo', 400);
        }

        const [folderData] = await selectUserFolderQuery(req.idUser, folderId);
        // Creamos una ruta absoluta al directorio de descargas.
        const uploadsDir = path.join(
            __dirname,
            '..',
            '..',
            'uploads',
            `${req.idUser}`,
            `${folderData.name}`
        );

        // Creamos el directorio si no existe.
        await createPathIfNotExists(uploadsDir);
        
        file.mv(`${uploadsDir}/${file.name}`);
        await insertUserFilesQuery(req.idUser, file.name, folderId);

        res.send({
            status: 'ok',
            message: 'Archivo subido correctamente',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newFileInDirectory;
