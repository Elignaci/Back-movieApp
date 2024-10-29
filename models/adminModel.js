const{ connect }= require('../helpers/bbddConnect')
const { movies, genres }=require('./queries')

const getAllMoviesModel = async () =>{
    try {
        let data = await connect(movies.getAllMovies)
      console.log(data.rows)
      return data.rows
    } catch (error) {
        console.log(error)
    } 
}

const getMoviesByTitleModel = async (title) =>{
    try {
        let data = await connect(movies.getMovieByTitle, [title])
        console.log(data.rows)
        return data.rows
    } catch (error) {
        console.log(error)
    } 
}

const createMovieModel = async (title, image_url, year, director, duration, genre_id) =>{
    try {
        let data = await connect(movies.createMovie, [title, image_url, year, director, duration, genre_id])
        return data.rows 
    } catch (error) {
        console.log(error)
    }
}

const deleteMovieModel = async (id) =>{
    try {
        let data = await connect(movies.deleteMovie, [id])
        console.log(data.rows)
        return data.rows
    } catch (error) {
        console.log(error)
    } 
}

const editMovieModel = async (id, title, image_url, year, director, duration, genre_id) =>{
    try {
        let data = await connect(movies.editMovie, [id,title, image_url, year, director, duration, genre_id])
        console.log(data.rows)
        return data.rows
    } catch (error) {
        console.log(error)
    }
}

const getAllGenresModel = async () => {
    try {
        let data = await connect(genres.getAllGenres);
        console.log(data.rows);
        return data.rows;
    } catch (error) {
        console.log(error);
    }
};

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
    createGenreModel
}

