const getConnection = require('../getConnection');

const deleteFoldersQuery = async (idUser, idDir) => {
    let connection;

    try {
        connection = await getConnection();
        await connection.query(`DELETE FROM files WHERE idDir = ? AND idUser = ?`, [idDir,idUser]);
        await connection.query(`DELETE FROM folders WHERE id = ? AND idUser = ?`, [idDir,idUser]);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteFoldersQuery;
