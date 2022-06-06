const { generateError } = require('../../helpers');
const getConnection = require('../getConnection');

const selectOneFileQuery = async (idUser, id) => {
    let connection;

    try {
        connection = await getConnection();

        const [file] = await connection.query(
            `SELECT id, name, idDir FROM files WHERE idUser = ? AND id = ?`,
            [idUser, id]
        );

        if (file.length < 1) {
            throw generateError('Archivo no encontrado', 404);
        }

        return file;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectOneFileQuery;
