require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const getUserSpace = require('./controllers/users/getUserFiles');
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

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
