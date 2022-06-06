const { generateError } = require('../../helpers');
const getConnection = require('../getConnection');

// Función con query para seleccionar archivos dentro de carpetas
const selectFilesInFolderQuery = async (idUser, idDir) => {
    let connection;

    try {
        // Conectamos a la base de datos
        connection = await getConnection();

        // Realizamos la query
        const [file] = await connection.query(
            `SELECT id, name FROM files WHERE idUser = ? AND idDir = ?`,
            [idUser, idDir]
        );

        // Lanzamos un error cuando la longitud de 'file' es menor a 1
        if (file.length < 1) {
            throw generateError('Archivo no encontrado', 404);
        }

        // Retornamos el archivo
        return file;
    } finally {
        // Liberamos la conexión
        if (connection) connection.release();
    }
};

module.exports = selectFilesInFolderQuery;
