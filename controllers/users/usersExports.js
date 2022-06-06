
//Exports de las diferentes funciones para los usuarios
const getUserSpace = require('./controllers/users/getUserSpace');
const loginUser = require('./controllers/users/loginUser');
const newUser = require('./controllers/users/newUser');

module.exports = {
    getUserSpace,
    loginUser,
    newUser
}