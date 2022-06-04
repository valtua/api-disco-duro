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

const createUploadsIfNotExists = async () => {
    // Creamos una ruta absoluta al directorio de descargas.
    const uploadsDir = path.join(__dirname, 'uploads');

    // Creamos el directorio si no existe.
    await createPathIfNotExists(uploadsDir);
};

module.exports = {
    generateError,
    createPathIfNotExists,
    createUploadsIfNotExists,
};
