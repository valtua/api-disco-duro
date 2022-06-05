const { generateError } = require('../../helpers');
const fs = require('fs/promises');
const path = require('path');
const selectUserFolderQuery = require('../../db/directoriesQueries/selectUserFolderQuery');
const deleteUserDirectoriesQuery = require('../../db/directoriesQueries/deleteUserDirectoriesQuery');


const deleteDirectory = async (req, res, next) => {
    try {

        const { folderName }= req.params;
        if (!folderName) {
            throw generateError('No se encuentra la carpeta', 400);
        }

        // Localizamos la ruta que queremos eliminar
        const deleteDir = path.join(
            __dirname,
            '..',
            '..',
            'uploads',
            `${req.idUser}`,
            `${folderName}`
        );

        // Eliminamos la carpeta y sus archivos
        await fs.rmdir(deleteDir, {recursive: true});


        const [folder] = await selectUserFolderQuery(req.idUser, folderName);
        await deleteUserDirectoriesQuery(req.idUser, folder.id)

        res.send({
            status: 'ok',
            message: 'Archivos eliminados correctamente',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = deleteDirectory;
