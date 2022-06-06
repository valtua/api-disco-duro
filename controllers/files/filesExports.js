
//Exports de las diferentes funciones para los archivos
const deleteFile = require('./controllers/files/deleteFile');
const downloadFile = require('./controllers/files/downloadFile');
const newFile = require('./controllers/files/newFile');
const newFileInFolder = require('./controllers/files/newFileInFolder');

module.exports = {
    deleteFile,
    downloadFile,
    newFile,
    newFileInFolder
}