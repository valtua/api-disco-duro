const { generateError } = require('../../helpers');
const fs = require('fs/promises');
const path = require('path');
const selectOneFileQuery = require('../../db/filesQueries/selectOneFileQuery');
const selectUserFolderQuery = require('../../db/directoriesQueries/selectUserFolderQuery');
const deleteFilesQuery = require('../../db/filesQueries/deleteUserFilesQuery');

const deleteFile = async (req, res, next) => {
    try {
        const { fileId } = req.params;

        if (isNaN(fileId)) {
            throw generateError('No se encuentra un id de archivo', 400);
        }
        // Localizamos el archivo que queremos eliminar
        const [file] = await selectOneFileQuery(req.idUser, fileId);

        // Si tiene idDir, es necesario localizar la carpeta en la que está
        if (file.idDir != null) {
            const [folder] = await selectUserFolderQuery(
                req.idUser,
                file.idDir
            );
            if (!folder) {
                throw generateError('No se encuentra la carpeta', 400);
            }

            const deleteFileInFolder = path.join(
                __dirname,
                '..',
                '..',
                'uploads',
                `${req.idUser}`,
                `${folder.name}`,
                `${file.name}`
            );

            // Eliminamos la carpeta y sus archivos
            await fs.unlink(deleteFileInFolder);
            await deleteFilesQuery(req.idUser, fileId);
        } else {
            const deleteFileNoFolder = path.join(
                __dirname,
                '..',
                '..',
                'uploads',
                `${req.idUser}`,
                `${file.name}`
            );
            // Eliminamos la carpeta y sus archivos
            await fs.unlink(deleteFileNoFolder);
            await deleteFilesQuery(req.idUser, fileId);
        }

        res.send({
            status: 'ok',
            message: 'Archivos eliminados correctamente',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = deleteFile;
