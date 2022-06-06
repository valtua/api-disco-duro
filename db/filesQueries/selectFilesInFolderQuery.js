const getConnection = require('../getConnection');

const selectFilesInFolderQuery = async (idUser, idDir) => {
    let connection;

    try {
        connection = await getConnection();

        const [file] = await connection.query(
            `SELECT id, name FROM files WHERE idUser = ? AND idDir = ?`,
            [idUser, idDir]
        );

        return file;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectFilesInFolderQuery;
