const selectUserFilesQuery = require('../../db/filesQueries/selectUserFIlesQuery');
const { generateError } = require('../../helpers');

const getUserSpace = async (req, res, next) => {
    try {
        const { userId } = req.params;

        if (req.idUser != userId) {
            throw generateError(
                'No tienes permisos para acceder a este espacio',
                401
            );
        }

        const files = await selectUserFilesQuery(userId);

        res.send({
            status: 'ok',
            data: {
                files,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getUserSpace;
