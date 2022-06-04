const getConnection = require('../getConnection');

const deleteTweetQuery = async (idUser, idDir) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(`DELETE FROM directories WHERE id = ? AND idUser = ?`, [idDir,idUser]);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteTweetQuery;
