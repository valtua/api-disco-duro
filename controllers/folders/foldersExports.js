
// Exports de las diferentes funciones para las carpetas
const deleteFolder = require('./controllers/folders/deleteFolder');
const downloadFolder = require('./controllers/folders/downloadFolder');
const newFolder = require('./controllers/folders/newFolder');

module.exports = {
    deleteFolder,
    downloadFolder,
    newFolder
}