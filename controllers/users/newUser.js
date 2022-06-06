const {
    generateError,
    createUploadsIfNotExists,
    createPathIfNotExists,
} = require('../../helpers');
const path = require('path');
const insertUserQuery = require('../../db/userQueries/insertUserQuery');


const newUser = async (req, res, next) => {
    try {

        // Obtenemos los campos del body.
        const { name, email, password } = req.body;

        // Si faltan campos lanzamos un error.
        if (!name || !email || !password) {
            throw generateError('Faltan campos', 400);
        }

        // Creamos un usuario en la base de datos y obtenemos el id.
        const idUser = await insertUserQuery(name, email, password);

        await createUploadsIfNotExists();

        // Variable que contiene la ruta dela carpeta del usuario
        const newUserSpace = path.join(
            __dirname,
            '..',
            '..',
            'uploads',
            `${idUser}`
        );

        // Creamos la carpeta si no existe.
        await createPathIfNotExists(newUserSpace);

        res.send({
            status: 'ok',
            message: `Usuario con id ${idUser} creado`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = newUser;
