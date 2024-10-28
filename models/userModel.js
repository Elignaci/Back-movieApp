const{ connect } = require('../helpers/bbddConnect')
const { users } = require('./queries')

/**
 * Busca un usuario en la base de datos por su email.
 * 
 * @param {string} email - El email del usuario a buscar.
 * @returns {Object} - Los datos del usuario.
 */
const getUserByEmailModel = async (email) =>{
    try {
        let user = await connect(
            users.getUserByEmail,
            [email]
        );
        return user.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    } 
}

/**
 * Crea un nuevo usuario en la base de datos.
 * 
 * @param {Object} user - Datos del usuario (nombre, email, contraseña hasheada y rol).
 * @returns {Object} - Los datos del nuevo usuario creado.
 */
const createUserModel = async (user) =>{
    const { name, email, hashedPassword, role } = user;
    try {
        let newUser = await connect(
            users.createUser, 
            [name, email, hashedPassword, role]
        );
        return newUser.rows;
    } catch (error) {
        console.log(error);
        throw error;
    } 
}

/**
 * Actualiza la contraseña de un usuario en la base de datos.
 * 
 * @param {string} email - El email del usuario.
 * @param {string} hashedPassword - La nueva contraseña hasheada.
 * @returns {Object} - Resultado de la actualización.
 */
const updateUserPasswordByEmailModel = async (email, hashedPassword) => {
    try {
        let updatedUser = await connect(
            users.updateUserPasswordByEmail, 
            [email, hashedPassword]
        );
        return updatedUser;
    } catch (error) {
        console.log(error);
        throw error;
    }
};



module.exports={
    getUserByEmailModel,
    createUserModel,
    updateUserPasswordByEmailModel
}
