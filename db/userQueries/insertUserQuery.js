const getConnection = require('../getConnection');
const { generateError } = require('../../helpers');
const bcrypt = require('bcrypt');

const insertUserQuery = async (name, email, password) => {
    let connection;

    try {
        connection = await getConnection();

        const [users] = await connection.query(
            `SELECT id FROM users WHERE email = ?`,
            [email]
        );

        if (users.length > 0) {
            throw generateError(
                'Ya existe un usuario asociado a ese email',
                409
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [newUser] = await connection.query(
            `
        
            INSERT INTO users (name, email, password)
            VALUES(?, ?, ?)`,
            [name, email, hashedPassword]
        );

        return newUser.insertId;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertUserQuery;
