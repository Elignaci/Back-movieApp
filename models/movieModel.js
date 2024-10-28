//const {Pool}=require('pg')

const{connect}= require('../helpers/bbddConnect')

const {movies}=require('./queries')

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
