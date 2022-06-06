const getConnection = require('../getConnection');

const selectUserFilesQuery = async (idUser) => {
    let connection;

    try {
        connection = await getConnection();

        const [files] = await connection.query(
            `SELECT id, name FROM files WHERE idUser = ?`,
            [idUser]
        );

        if (files.length < 1) {
            throw generateError('Archivos no encontrados', 404);
        }

        return files;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserFilesQuery;
