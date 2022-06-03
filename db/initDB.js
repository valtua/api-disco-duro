const getConnection = require('./getConnection');

async function main() {
    // Variable que almacenará una conexión libre de la base de datos.
    let connection;

    try {
        // Obtenemos una conexión libre.
        connection = await getConnection();

        console.log('Borrando tablas existentes...');

        await connection.query('DROP TABLE IF EXISTS files');
        await connection.query('DROP TABLE IF EXISTS directories');
        await connection.query('DROP TABLE IF EXISTS users');

        console.log('Creando tablas...');

        await connection.query(`
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(20) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP

            )
        `);

        await connection.query(`
            CREATE TABLE directories (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                idUser INTEGER NOT NULL,
                FOREIGN KEY (idUser) REFERENCES users(id),
                name VARCHAR(50) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP

            )
        `);

        await connection.query(`
            CREATE TABLE files (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                idUser INTEGER NOT NULL,
                FOREIGN KEY (idUser) REFERENCES users(id),
                idDir INTEGER NOT NULL,
                FOREIGN KEY (idDir) REFERENCES directories(id),
                name VARCHAR(50) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        console.log('¡Tablas creadas!');
    } catch (err) {
        console.error(err);
    } finally {
        // Si existe una conexión la liberamos.
        if (connection) connection.release();

        // Cerramos el proceso actual.
        process.exit();
    }
}

// Llamamos a la función principal.
main();
