const { generateError } = require('../../helpers');
const fs = require('fs/promises');
const path = require('path');
const selectUserFolderQuery = require('../../db/directoriesQueries/selectUserFolderQuery');
const deleteUserDirectoriesQuery = require('../../db/directoriesQueries/deleteUserDirectoriesQuery');

const deleteDirectory = async (req, res, next) => {
    try {
        const { folderId } = req.params;
        if (isNaN(folderId)) {
            throw generateError('No se encuentra un id de carpeta', 400);
        }
        const [folder] = await selectUserFolderQuery(req.idUser, folderId);
        // Localizamos la ruta que queremos eliminar
        const deleteDir = path.join(
            __dirname,
            '..',
            '..',
            'uploads',
            `${req.idUser}`,
            `${folder.name}`
        );

        // Eliminamos la carpeta y sus archivos
        await fs.rmdir(deleteDir, { recursive: true });
        await deleteUserDirectoriesQuery(req.idUser, folder.id);

        res.send({
            status: 'ok',
            message: 'Archivos eliminados correctamente',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = deleteDirectory;
