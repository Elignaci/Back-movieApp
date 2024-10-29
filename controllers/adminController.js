/*importacion de los modelos de movie*/
const {
    getAllMoviesModel, 
    getMoviesByTitleModel,
    createMovieModel,
    deleteMovieModel,
    editMovieModel,
    getAllGenresModel,        
    createGenreModel
}=require('../models/adminModel')

/**
 * Controlador para obtener todas las peliculas
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - El objeto JSON con la respuesta.
 */
const getMovies = async (req, res) => {
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
 * Controlador para buscar peliculas por el titulo.
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
 * Controlador para crear una película.
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - El objeto JSON con la respuesta.
 */
const createMovie = async (req, res) => {
    const { title,
            image_url, 
            year, 
            director, 
            duration, 
            genre_id } = req.body;
    try {
        const movieSaved = await createMovieModel(title, image_url, year, director, duration, genre_id);
        return res.status(201).json({
            ok: true,
            msg: 'Nueva pelicula creada',
            movieSaved
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error al crear la pelicula'
        });
    }
};

/**
 * Controlador para eliminar una película.
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - El objeto JSON con la respuesta.
 */
const deleteMovie = async (req, res) => {
    const id = req.params.id
    try {
        const data = await deleteMovieModel(id);
        if(!data){
            return res.status(404).json({
                ok: false,
                msg:"Pelicula no encotrada"
            });
        }
        return res.status(200).json({
            ok: true,
            msg: 'Eliminando película',
            data
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error al eliminar la pelicula'
        });
    }
};

/**
 * Controlador para editar una película.
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - El objeto JSON con la respuesta.
 */
const editMovie = async (req, res) => {
    const { title,
        image_url, 
        year, 
        director, 
        duration, 
        genre_id } = req.body;
    try {
        const id=req.params.id;
        const movieEdited = await editMovieModel(id, title, image_url, year, director, duration, genre_id);
        return res.status(200).json({
            ok: true,
            msg: 'Pelicula actualizada',
            movieEdited
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'No se ha podido actualizar la película'
        });
    }
};

/**
 * Controlador para obtener todos los gneros*
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - El objeto JSON con la respuesta.
 */
const getGenres = async (req, res) => {
    try {
        const genres = await getAllGenresModel();
        return res.status(200).json({
            ok: true,
            data: genres
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener géneros'
        });
    }
};

/**
 * Controlador para crear una genero.
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - El objeto JSON con la respuesta.
 */
const createGenre = async (req, res) => {
    const { name } = req.body;
    try {
        const newGenre = await createGenreModel(name);
        return res.status(201).json({
            ok: true,
            msg: 'Nuevo género creado',
            genre: newGenre
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al crear el género'
        });
    }
};

/*Exportacion funciones*/
module.exports={
    getMovies,
    getMoviesByTittle,
    createMovie,
    deleteMovie,
    editMovie,
    getGenres,       
    createGenre 
}