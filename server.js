require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const deleteDirectory = require('./controllers/directories/deleteDirectory');
const downloadFolder = require('./controllers/directories/downloadFolder');
const newDirectory = require('./controllers/directories/newDirectory');
const deleteFile = require('./controllers/files/deleteFile');
const downloadFile = require('./controllers/files/downloadFile');
const newFile = require('./controllers/files/newFile');
const newFileInDirectory = require('./controllers/files/newFileInDirectory');
const getUserSpace = require('./controllers/users/getUserSpace');
const loginUser = require('./controllers/users/loginUser');
const newUser = require('./controllers/users/newUser');
const authUser = require('./middleware/authUser');
const cors = require('cors');

const { PORT } = process.env;

const app = express();

app.use(morgan(`dev`));
app.use(express.json());
app.use(fileUpload());
app.use(cors());

app.post('/users/register', newUser);
app.post('/users/login', loginUser);

app.get('/users/space', authUser, getUserSpace);

app.post('/users/upload', authUser, newFile);
app.post('/users/folder', authUser, newDirectory);
app.post('/users/upload/:folderId', authUser, newFileInDirectory);
app.get('/users/download/file/:fileId', authUser, downloadFile);
app.get('/users/download/folder/:folderId', authUser, downloadFolder);

app.delete('/users/delete/folders/:folderId', authUser, deleteDirectory);
app.delete('/users/delete/files/:fileId', authUser, deleteFile);

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
