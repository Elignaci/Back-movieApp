const { 
    getUserByEmailModel,
    createUserModel,
    updateUserPasswordByEmailModel,
    getUserFavoritesMoviesModel,
    addUserFavoritesMoviesModel,
    deleteUserFavoritesMoviesModel
} = require('../models/userModel');

/**
 * Controlador para obtener un usuario por su email.
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - El objeto JSON con la respuesta.
 */
const getUserByEmail = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await getUserByEmailModel(email);
        if (user) {
            return res.status(200).json({
                ok:true,
                user
            })
        } else {
            return res.status(404).json(
                {
                    ok: false, 
                    message: 'Usuario no encontrado' 
                }
            );
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error contacte con el administrador'
        });
    }
};

/**
 * Controlador para crear un nuevo usuario.
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - El objeto JSON con la respuesta.
 */
const createUser = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await createUserModel(userData);
        return res.status(201).json({
            ok: true,
            newUser
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
 * Controlador para actualizar la contraseña de un usuario por su email.
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - El objeto JSON con la respuesta.
 */
const updateUserPasswordByEmail = async (req, res) => {
    try {
        const { email, hashedPassword } = req.body;
        const updatedUser = await updateUserPasswordByEmailModel(email, hashedPassword);

        if (updatedUser.rowCount > 0) {
            return res.status(200).json({
                ok: true,
                message: 'Contraseña actualizada con éxito'
            });
        } else {
            return res.status(404).json({
                ok: false,
                message: 'Usuario no encontrado'
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
            message: "Pelicula agrgeado a favoritos.",
            newFavorite
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
                message: 'Película eliminada de favoritos'
            });
        } else {
            return res.status(404).json({
                ok: false,
                message: 'No se encontró la película en favoritos'
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
    getUserByEmail,
    createUser,
    updateUserPasswordByEmail,
    getUserFavoritesMovies,
    addUserFavoritesMovies,
    deleteUserFavoritesMovies
};