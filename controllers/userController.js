const { 
    getUserFavoritesMoviesModel,
    getAllMoviesModel,
    getMoviesByTitleModel,
    addUserFavoritesMoviesModel,
    deleteUserFavoritesMoviesModel
} = require('../models/userModel');

/**
 * Controlador para obtener las películas favoritas de un usuario por su email.
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - El objeto JSON con la respuesta.
 */
const getUserFavoritesMovies = async (req, res) => {
    try {
        const email = req.body.email;
        const favorites = await getUserFavoritesMoviesModel(email);
        return res.status(200).json({
            ok: true,
            data: favorites
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error contacte con el administrador'
        });
    }
};

/**
 * Controlador para obtener todas las peliculas
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - El objeto JSON con la respuesta.
 */
const getAllMovies = async (req, res) => {
    let movies;
    try {
        movies = await getAllMoviesModel()
        return res.status(200).json({
            ok: true,
            data: movies
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error contacte con el administrador'
        });
    }
};

/**
 * Controlador para buscar peliculas por el titulo
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - El objeto JSON con la respuesta.
 */
const getMoviesByTittle = async (req, res) => {
    let movies;
    try {
        const title = req.body.title;
        movies = await getMoviesByTitleModel(title);
        return res.status(200).json({
            ok: true,
            data: movies
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error contacte con el administrador'
        });
    }
};


/**
 * Controlador para agregar una película a los favoritos de un usuario.
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - El objeto JSON con la respuesta.
 */
const addUserFavoritesMovies = async (req, res) => {
    try {
        const email = req.body.email; 
        const id_movie = req.params.id;
        const newFavorite = await addUserFavoritesMoviesModel(email, id_movie);
        return res.status(201).json({
            ok: true,
            msg: "Pelicula agrgeado a favoritos.",
            data: newFavorite
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error contacte con el administrador'
        });
    }
};

/**
 * Controlador para eliminar una película de favoritos de un usuario.
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - El objeto JSON con la respuesta.
 */
const deleteUserFavoritesMovies = async (req, res) => {
    try {
        const email = req.body.email;
        const id_movie = req.params.id;
        const favoriteDeleted = await deleteUserFavoritesMoviesModel(email, id_movie);
        if (favoriteDeleted.rowCount > 0) {
            return res.status(200).json({
                ok: true,
                msg: 'Película eliminada de favoritos',
                data: favoriteDeleted
            });
        } else {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró la película en favoritos'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error contacte con el administrador'
        });
    }
};

module.exports = {
    getUserFavoritesMovies,
    getAllMovies,
    getMoviesByTittle,
    addUserFavoritesMovies,
    deleteUserFavoritesMovies
};