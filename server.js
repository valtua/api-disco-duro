require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const loginUser = require('./controllers/users/loginUser');
const newUser = require('./controllers/users/newUser');

const { PORT } = process.env;

const app = express();

app.use(morgan(`dev`));
app.use(express.json());
app.use(fileUpload());

app.post('/users/register', newUser);
app.post('/users/login', loginUser);

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
