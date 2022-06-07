require('dotenv').config();

// Requerimos las tecnologías necesarias
const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');

// Requerimos la autentificación del usuario
const authUser = require('./middleware/authUser');

// Almacenamos en esta variable los datos que contiene el archivo .env (base de datos)
const { PORT } = process.env;

// Requerimos los controladores para los archivos, carpetas y usuarios
const { deleteFile, downloadFile, newFile, newFileInFolder } = require('./controllers/files/filesExports');
const { deleteFolder, downloadFolder, newFolder } = require('./controllers/folders/foldersExports');
const { newUser, loginUser, modifyUser, getUserSpace } = require('./controllers/users/usersExports');

// Declaramos una variable que contiene la tecnología express, para el manejo de endpoints
const app = express();

// Utilizamos middlewares
app.use(morgan(`dev`));
app.use(express.json());
app.use(fileUpload());
app.use(cors());

// Métodos post, get y delete con sus respectivos endpoints
app.post('/users/register', newUser);
app.post('/users/login', loginUser);
app.post('/users/modifyUser/:userId', modifyUser);
app.get('/users/space', authUser, getUserSpace);

app.post('/users/upload', authUser, newFile);
app.post('/users/upload/:folderId', authUser, newFileInFolder);
app.get('/users/download/file/:fileId', authUser, downloadFile);
app.delete('/users/delete/files/:fileId', authUser, deleteFile);

app.post('/users/folder', authUser, newFolder);
app.get('/users/download/folder/:folderId', authUser, downloadFolder);
app.delete('/users/delete/folders/:folderId', authUser, deleteFolder);

// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
