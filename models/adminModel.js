const{ connect }= require('../helpers/bbddConnect')
const { movies, genres }=require('./queries')

/**
 * Trae de la base de datos todas las peliculas.
 * 
 * @returns {Object} - Devuevle todas las peliculas.
 */
const getAllMoviesModel = async () =>{
    try {
        let data = await connect(movies.getAllMovies);
        console.log(data.rows);
        return data.rows;
    } catch (error) {
        console.log(error)
    } 
}

/**
 * Busca peliculas por el titulo.
 * 
 * @param {String} tittle - titulo de la pelicula a buscar.
 * @returns {Object} - Las peliculas encontradas.
 */
const getMoviesByTitleModel = async (title) =>{
    try {
        let data = await connect(movies.getMovieByTitle, [title]);
        console.log(data.rows);
        return data.rows
    } catch (error) {
        console.log(error)
    } 
}
/**
 * Funcion para crear nuevas peliculas.
 * 
 * @param {String} title - Titulo de la pelicula que se quiere crear.
 * @param {String} image_url - Enlace de la imagen que queremos utilizar.
 * @param {Number} year - Año en el que se hizo la pelicula.
 * @param {String} director - Nombre del director de la pelicula.
 * @param {Number} duration - Duracion de la pelicula en minutos.
 * @param {Number} genre_id - ID del genero de la pelicula.
 * @returns {object} - Pelicula creada.
 */
const createMovieModel = async (title, image_url, year, director, duration, genre_id) =>{
    try {
        let data = await connect(movies.createMovie, [title, image_url, year, director, duration, genre_id]);
        return data.rows; 
    } catch (error) {
        console.log(error)
    }
}

/**
 * Elimina una película.
 * 
 * @param {number} id - El ID de la película.
 * @returns {Object} - Resultado de la eliminación.
 */
const deleteMovieModel = async (id) =>{
    try {
        let data = await connect(movies.deleteMovie, [id]);
        console.log(data.rows);
        return data.rows;
    } catch (error) {
        console.log(error)
    } 
}

/**
 * Funcion para editar peliculas.
 * 
 * @param {Number} - Id de la pelicula.
 * @param {String} title - Titulo de la pelicula que se quiere crear.
 * @param {String} image_url - Enlace de la imagen que queremos utilizar.
 * @param {Number} year - Año en el que se hizo la pelicula.
 * @param {String} director - Nombre del director de la pelicula.
 * @param {Number} duration - Duracion de la pelicula en minutos.
 * @param {Number} genre_id - ID del genero de la pelicula.
 * @returns {object} - Pelicula editada.
 */
const editMovieModel = async (id, title, image_url, year, director, duration, genre_id) =>{
    try {
        let data = await connect(movies.editMovie, [id,title, image_url, year, director, duration, genre_id]);
        console.log(data.rows);
        return data.rows;
    } catch (error) {
        console.log(error)
    }
}

/**
 * Funcion para obtener todos generos de peliculas.
 * 
 * @returns {object} - Devuelve todos los generos.
 */
const getAllGenresModel = async () => {
    try {
        let data = await connect(genres.getAllGenres);
        console.log(data.rows);
        return data.rows;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Funcion para obtener un genero por su id.
 * 
 * @returns {object} - Devuelve todos los generos.
 */
const getGenreByIdModel = async (id) => {
    try {
        let data = await connect(genres.getGenreById, [id]);
        console.log(data.rows);
        return data.rows;
    } catch (error) {
        console.log(error);
    }
};

/**
 *Funcion para crear generos de peliculas.
 *  
 * @param {string} name - Nombre del nuevo genero.
 * @returns {Object} - Genero creado.
 */
const createGenreModel = async (name) => {
    try {
        let data = await connect(genres.createGenre, [name]);
        return data.rows[0];
    } catch (error) {
        console.log(error);
    }
};

module.exports={
    getAllMoviesModel,
    getMoviesByTitleModel,
    createMovieModel,
    deleteMovieModel,
    editMovieModel,
    getAllGenresModel,
    getGenreByIdModel,
    createGenreModel
}

