const { generateError } = require('../../helpers');
const getConnection = require('../getConnection');

const selectUserByEmailQuery = async (email) => {
    let connection;

    try {
        connection = await getConnection();

        const [users] = await connection.query(
            `SELECT id, email, password FROM users WHERE email = ?`,
            [email]
        );

        if (users.length < 1) {
            throw generateError('Usuario no encontrado', 404);
        }

        return users[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserByEmailQuery;
