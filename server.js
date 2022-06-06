require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const deleteFolder = require('./controllers/folders/deleteFolder');
const downloadFolder = require('./controllers/folders/downloadFolder');
const newFolder = require('./controllers/folders/newFolder');
const deleteFile = require('./controllers/files/deleteFile');
const downloadFile = require('./controllers/files/downloadFile');
const newFile = require('./controllers/files/newFile');
const newFileInFolder = require('./controllers/files/newFileInFolder');
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
app.post('/users/folder', authUser, newFolder);
app.post('/users/upload/:folderId', authUser, newFileInFolder);
app.get('/users/download/file/:fileId', authUser, downloadFile);
app.get('/users/download/folder/:folderId', authUser, downloadFolder);

app.delete('/users/delete/folders/:folderId', authUser, deleteFolder);
app.delete('/users/delete/files/:fileId', authUser, deleteFile);

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
