/*Importacion de express*/
const express = require('express');

/*guardamos el metodo router de express en una constante para poder utilizarlo*/
const router=express.Router();

/*importacion de funciones controladoras*/
const { 
        getMovies,
        createMovie,
        deleteMovie,
        editMovie,
        getGenres,         
        createGenre 
    } = require('../controllers/movieController')

/* Rutas Movies */
// Obtener todas las películas + búsqueda por título 
router.get('/', getMovies);

// Crear película
router.post('/', createMovie);

// Eliminar película por id 
router.delete('/:id', deleteMovie);

// Actualizar película por id 
router.put('/:id', editMovie);

// Obtener todos los generos
router.get('/genres', getGenres);

// Crear nuevo genero
router.post('/genre', createGenre);  

/*Exportacion rutaz*/
module.exports = router;
