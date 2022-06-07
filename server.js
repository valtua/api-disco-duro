// Tecnologia para hacer disponibles las variables de entorno
require('dotenv').config();

// ---------------------- IMPORTS ----------------------

// Requerimos las tecnologías necesarias
const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');

// Requerimos la autentificación del usuario
const authUser = require('./middleware/authUser');

// Almacenamos en esta variable los datos que contiene el archivo .env (base de datos)
const { PORT } = process.env;

// ---------------------- CONTROLLERS ----------------------

// Requerimos los controladores para los archivos, carpetas y usuarios
const { deleteFile, downloadFile, newFile, newFileInFolder } = require('./controllers/files/filesExports');
const { deleteFolder, downloadFolder, newFolder } = require('./controllers/folders/foldersExports');
const { newUser, loginUser, modifyUser, getUserSpace } = require('./controllers/users/usersExports');

// Declaramos una variable que contiene la tecnología express, para el manejo de endpoints
const app = express();

// ---------------------- MIDDLEWARE ----------------------
app.use(morgan(`dev`));
app.use(express.json());
app.use(fileUpload());
app.use(cors());

// ---------------------- ENDPOINTS ----------------------

// Registrar un nuevo usuario
app.post('/users/register', newUser);

// Login
app.post('/users/login', loginUser);

// Modificar un usuario
app.post('/users/modifyUser/:userId', modifyUser);

// Ver archivos y carpetas
app.get('/users/space', authUser, getUserSpace);

// Subir un nuevo archivo
app.post('/users/upload', authUser, newFile);

// Subir un archivo dentro de una carpeta
app.post('/users/upload/:folderId', authUser, newFileInFolder);

// Descargar un archivo
app.get('/users/download/file/:fileId', authUser, downloadFile);

// Borrar un archivo
app.delete('/users/delete/files/:fileId', authUser, deleteFile);

// Crear una nueva carpeta
app.post('/users/folder', authUser, newFolder);

// Descargar una carpeta
app.get('/users/download/folder/:folderId', authUser, downloadFolder);

// Borrar una carpeta
app.delete('/users/delete/folders/:folderId', authUser, deleteFolder);


// --------------------------------------------------------

// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
