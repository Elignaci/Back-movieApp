//const {Pool}=require('pg')

const{connect}= require('../helpers/bbddConnect')

const {movies}=require('./queries')


//Get all movies
/*const getAllMovies = async () =>{
    let movie, result;
    try {
        movie = await pool.connect();
        result = await movie.query(movies.getAllMovies)
    } catch (error) {
        console.log(error)
        throw error
    } finally{
        movie.release()
    }
    return result.rows
}*/

const getAllMovies = async () =>{
    try {
        let data = await connect(movies.getAllMovies)
      console.log(data.rows)
      return data.rows
    } catch (error) {
        console.log(error)
    } 
}

const getMovieByTitle = async (title) =>{

    try {
        let data = await connect(movies.getMovieByTitle, [title])
      console.log(data.rows)
      return data.rows
    } catch (error) {
        console.log(error)
    } 
}


module.exports={
    getAllMovies,
    getMovieByTitle
}