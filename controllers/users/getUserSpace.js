const selectUserDirectoriesQuery = require('../../db/directoriesQueries/selectUserDirectoriesQuery');
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
        const files = await selectUserFilesQuery(req.idUser);

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
