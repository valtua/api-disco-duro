const getConnection = require('../getConnection');

const selectOneFileQuery = async (idUser, id) => {
    let connection;

    try {
        connection = await getConnection();

        const [file] = await connection.query(
            `SELECT id, name FROM files WHERE idUser = ? AND id = ?`,
            [idUser, id]
        );

        return file;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectOneFileQuery;
