const insertUserQuery = require('../../db/userQueries/insertUserQuery');

const { generateError } = require('../../helpers');

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

        res.send({
            status: 'ok',
            message: `Usuario con id ${idUser} creado`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = newUser;
