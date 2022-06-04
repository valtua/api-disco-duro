const getConnection = require('../getConnection');

const deleteFilesQuery = async (idUser, id) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(`DELETE FROM files WHERE idUser = ? AND id = ?`, [idUser,id]);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteFilesQuery;
