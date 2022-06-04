const fs = require('fs/promises');
const path = require('path');

const generateError = (message, status) => {
    const error = new Error(message);
    error.statusCode = status;
    return error;
};

const createPathIfNotExists = async (path) => {
    try {
        // Intentamos acceder al directorio.
        await fs.access(path);
    } catch {
        // Si no es posible acceder al directorio en el "try" se
        // lanzaría un error. Si es así creamos el directorio.
        await fs.mkdir(path);
    }
};

const deleteFile = async (fileName) => {
    try {
        // Creamos la ruta absoluta a la foto.
        const filePath = path.join(__dirname, 'archivos', fileName);

        // Eliminamos el archivos del disco.
        await fs.unlink(filePath);
    } catch {
        throw new Error('Error al eliminar el archivo del servidor');
    }
};

module.exports = {
    generateError,
    createPathIfNotExists,
    deleteFile,
};
