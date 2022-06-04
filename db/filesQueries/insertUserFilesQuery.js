const getConnection = require('../getConnection');

const insertUserFilesQuery = async (idUser, name) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(
            `
                INSERT INTO directories (idUser, name)
                VALUES (?, ?)
            `,
            [idUser, name]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertUserFilesQuery;
