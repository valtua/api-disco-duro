const getConnection = require('../getConnection');

const insertUserFoldersQuery = async (idUser, name) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(
            `
                INSERT INTO folders (idUser, name)
                VALUES (?, ?)
            `,
            [idUser, name]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertUserFoldersQuery;
