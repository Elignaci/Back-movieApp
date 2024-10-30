const{ connect } = require('../helpers/bbddConnect')
const { users, movies } = require('./queries')

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

/**
 * Trae de la base de datos todas las peliculas.
 * 
 * @returns {Object} - Devuevlo todas las peliculas.
 */
const getAllMoviesModel = async () => {
    try {
        let data = await connect(movies.getAllMovies);
        console.log(data.rows)
        return data.rows
    } catch (error) {
        console.log(error);
        throw error;
    } 
}

/**
 * Busca peliculas por el titulo.
 * 
 * @param {String} tittle - titulo de la pelicula a buscar.
 * @returns {Object} - Las peliculas encontradas.
 */
const getMoviesByTitleModel = async (tittle) => {
    try {
        let data = await connect(movies.getMovieByTitle(tittle));
        console.log(data.rows)
        return data.rows
    } catch (error) {
        console.log(error);
        throw error;
    } 
} 

/**
 * Obtiene las películas favoritas de un usuario por su email.
 * 
 * @param {string} email - El email del usuario.
 * @returns {Array} - Lista de películas favoritas del usuario.
 */
const getUserFavoritesMoviesModel = async (email) => {
    try {
        let favorites = await connect(
            users.getUserFavoritesMovies,
            [email]
        );
        return favorites.rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

/**
 * Agrega una película a las favoritas de un usuario.
 * 
 * @param {string} email - El email del usuario.
 * @param {number} id_movie - El ID de la película.
 * @returns {Object} - Resultado de la inserción.
 */
const addUserFavoritesMoviesModel = async (email, id_movie) => {
    try {
        let newfavorite = await connect(
            users.addUserFavoritesMovies,
            [email, id_movie]
        );
        return newfavorite;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

/**
 * Elimina una película de las favoritas de un usuario.
 * 
 * @param {string} email - El email del usuario.
 * @param {number} id_movie - El ID de la película.
 * @returns {Object} - Resultado de la eliminación.
 */
const deleteUserFavoritesMoviesModel = async (email, id_movie) => {
    try {
        let favoriteDeleted = await connect(
            users.deleteUserFavoritesMovies,
            [email, id_movie]
        );
        return favoriteDeleted;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports={
    getUserByEmailModel,
    createUserModel,
    updateUserPasswordByEmailModel,
    getAllMoviesModel,
    getMoviesByTitleModel,
    getUserFavoritesMoviesModel,
    addUserFavoritesMoviesModel,
    deleteUserFavoritesMoviesModel
}
