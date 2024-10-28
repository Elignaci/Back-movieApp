/*Importacion de express*/
const express = require('express');

/*guardamos el metodo router de express en una constante para poder utilizarlo*/
const router=express.Router();

/*importacion de funciones controladoras*/
const { 
        getMovies,
        createMovie,
        deleteMovie,
        editMovie
    } = require('../controllers/apiController')


/*Rutas Movies*/
//Get all movies + moviebytitle
router.get('/', getMovies);

//create movie
router.post('/', createMovie);

//delete movie
router.delete('/:title', deleteMovie);

//update movie by title 
router.put('/:title', editMovie);


//search favorites (es un join de movies y user_movies)


//CRUD a generos (get y create)


/*Exportacion rutaz*/
module.exports=router;
