const getConnection = require('../getConnection');

const selectUserFoldersQuery = async (idUser) => {
    let connection;

    try {
        connection = await getConnection();

        const [folders] = await connection.query(
            `SELECT id, name FROM folders WHERE idUser = ?`,
            [idUser]
        );

        return folders;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserFoldersQuery;
