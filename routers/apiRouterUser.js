/*Importacion de express*/
const express = require('express');

/*guardamos el metodo router de express en una constante para poder utilizarlo*/
const router=express.Router();

/*importacion de funciones controladoras*/
const { 
        getUserFavoritesMovies,
        getAllMovies,
        getMoviesByTittle,
        addUserFavoritesMovies,
        deleteUserFavoritesMovies
} = require('../controllers/userController')

/* Rutas de usuario */
router.get("/movies", getUserFavoritesMovies);

router.get('/search', getAllMovies);

router.get("/search/:title", getMoviesByTittle);

router.post('/favorites/:id', addUserFavoritesMovies);

router.delete('/favorites/:id', deleteUserFavoritesMovies);

/* Exportación de rutas */
module.exports = router;