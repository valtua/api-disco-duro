const selectUserDirectoriesQuery = require('../../db/directoriesQueries/selectUserDirectoriesQuery');
const selectFilesInDirectoryQuery = require('../../db/filesQueries/selectFilesInDirectoryQuery');
const selectUserFilesQuery = require('../../db/filesQueries/selectUserFilesQuery');
const { generateError } = require('../../helpers');

const getUserSpace = async (req, res, next) => {
    try {
        if (!req.idUser) {
            throw generateError(
                'No tienes permisos para acceder a este espacio',
                401
            );
        }

        const folders = await selectUserDirectoriesQuery(req.idUser);

        let filesInDirectoriesId = [];
        for (const folder of folders) {
            folder.files = await selectFilesInDirectoryQuery(
                req.idUser,
                folder.id
            );

            for (const file of folder.files) {
                filesInDirectoriesId.push(file.id);
            }
        }

        console.log(filesInDirectoriesId);
        const allFiles = await selectUserFilesQuery(req.idUser);
        const aloneFiles = [];
        const aloneFileDetector = () => {
            for (let i = 0; i < allFiles.length; i++) {
                console.log(allFiles[i]);
                if (filesInDirectoriesId.includes(allFiles[i].id)) continue;
                aloneFiles.push(allFiles[i]);
            }
            return;
        };

        aloneFileDetector();
        const files = aloneFiles;

        res.send({
            status: 'ok',
            data: {
                space: {
                    folders,
                    files,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getUserSpace;
