const getConnection = require('../getConnection');

const selectUserDirectoriesQuery = async (idUser) => {
    let connection;

    try {
        connection = await getConnection();

        const [directories] = await connection.query(
            `SELECT id, name FROM directories WHERE idUser = ?`,
            [idUser]
        );

        return directories;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserDirectoriesQuery;
