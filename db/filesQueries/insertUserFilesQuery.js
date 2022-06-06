const getConnection = require('../getConnection');

// Función con query para insertar un archivo
const insertUserFilesQuery = async (idUser, name, idDir) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(
            `
                INSERT INTO files (idUser, name, idDir)
                VALUES (?, ?, ?)
            `,
            [idUser, name, idDir]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertUserFilesQuery;
