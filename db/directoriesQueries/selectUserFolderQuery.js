const { generateError } = require('../../helpers');
const getConnection = require('../getConnection');

const selectUserFolderQuery = async (idUser, id) => {
    let connection;

    try {
        connection = await getConnection();

        const [folder] = await connection.query(
            `SELECT id, name FROM directories WHERE idUser = ? AND id = ?`,
            [idUser, id]
        );

        if (folder.length < 1) {
            throw generateError('Carpeta no encontrada', 404);
        }

        return folder;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserFolderQuery;
