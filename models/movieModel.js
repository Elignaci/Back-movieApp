//const {Pool}=require('pg')

const{connect}= require('../helpers/bbddConnect')

const {movies}=require('./queries')

const getAllMoviesModel = async () =>{
    try {
        let data = await connect(movies.getAllMovies)
      console.log(data.rows)
      return data.rows
    } catch (error) {
        console.log(error)
    } 
}

const getMovieByTitleModel = async (title) =>{
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


module.exports={
    getAllMoviesModel,
    getMovieByTitleModel,
    createMovieModel,
    deleteMovieModel,
    editMovieModel
}