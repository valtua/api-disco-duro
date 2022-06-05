const getConnection = require('../getConnection');

const selectUserFolderQuery = async (idUser, name) => {
    let connection;

    try {
        connection = await getConnection();

        const [folder] = await connection.query(
            `SELECT id, name FROM directories WHERE idUser = ? AND name = ?`,
            [idUser , name]
        );
        
        return folder;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserFolderQuery;
