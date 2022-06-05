require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const deleteDirectory = require('./controllers/directories/deleteDirectory');
const newDirectory = require('./controllers/directories/newDirectory');
const newFile = require('./controllers/files/newFile');
const newFileInDirectory = require('./controllers/files/newFileInDirectory');
const getUserSpace = require('./controllers/users/getUserSpace');
const loginUser = require('./controllers/users/loginUser');
const newUser = require('./controllers/users/newUser');
const authUser = require('./middleware/authUser');

const { PORT } = process.env;

const app = express();

app.use(morgan(`dev`));
app.use(express.json());
app.use(fileUpload());

app.post('/users/register', newUser);
app.post('/users/login', loginUser);

app.get('/users/:userId/space', authUser, getUserSpace);

app.post('/users/upload', authUser, newFile);
app.post('/users/folder', authUser, newDirectory)
app.post('/users/upload/:folderName', authUser, newFileInDirectory)

app.post('/users/delete/:folderName', authUser, deleteDirectory)

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
