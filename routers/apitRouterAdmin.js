/*Importacion de express*/
const express = require('express');

/*guardamos el metodo router de express en una constante para poder utilizarlo*/
const router=express.Router();

/*importacion de funciones controladoras*/
const { 
        getMovies,
        getMoviesByTittle,
        createMovie,
        deleteMovie,
        editMovie,
        getGenres,         
        createGenre 
} = require('../controllers/adminController')

/* Rutas Movies */

router.get('/movies', getMovies);

router.get("/search/:title", getMoviesByTittle);

router.post('/createmovie', createMovie);

router.delete('/removemovie/:id', deleteMovie);

router.put('/editmovie/:id', editMovie);

router.get('/genres', getGenres);

router.post('/creategenre', createGenre);  

/*Exportacion rutaz*/
module.exports = router;
