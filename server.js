require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');

const { PORT } = process.env;

const app = express();

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
