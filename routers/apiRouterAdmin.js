/*Importacion de express*/
const express = require('express');

/*guardamos el metodo router de express en una constante para poder utilizarlo*/
const router=express.Router();

//importo el metodo check de express-validator
const {check} = require('express-validator')

//Importo middleware validateimputs
const {validateInputs} = require('../middlewares/validateInputs')

/*importacion de funciones controladoras*/
const { 
        getMovies,
        getMovieById,
        getMoviesByTittle,
        createMovie,
        deleteMovie,
        editMovie,
        getGenres,
        getGenreById,         
        createGenre 
} = require('../controllers/adminController')

/* Rutas Movies */

router.get('/movies', getMovies);

router.get('/movies/:id', [
        check('id')
        .notEmpty().withMessage('Id requerido')
        .isInt().withMessage('El Id debe ser un numero'),
], getMovieById);

router.post("/search", [
        check('title')
        .notEmpty().withMessage('Titulo requerido')
        .isLength({ max: 100 }).withMessage('El titulo no puede exceder 100 caracteres'),
        validateInputs
], getMoviesByTittle);

router.post('/createmovie', [
        check('title')
        .notEmpty().withMessage('Titulo requerido')
        .isLength({ max: 100 }).withMessage('El titulo no puede exceder 100 caracteres'),
        check('image_url')
        .notEmpty().withMessage('Es necesario introducir una url para la imagen de la pelicula')
        .isLength({ max: 255 }).withMessage('La url no puede exceder 255 caracteres'),
        check('year')
        .notEmpty().withMessage('El año es requerido')
        .isInt().withMessage('El año debe ser un numero'),
        check ('director')
        .notEmpty().withMessage('Nombre del director requerido')
        .isLength({ max: 100 }).withMessage('El nombre del director no puede exceder 100 caracteres'),
        check('duration')
        .notEmpty().withMessage('La duracion es necesaria')
        .isInt().withMessage('La duracion debe ser un numero'),
        check('genre_id')
        .notEmpty().withMessage('Id requerido')
        .isInt().withMessage('El Id debe ser un numero'),
        validateInputs

], createMovie);

router.delete('/removemovie/:id', [
        check('id')
        .notEmpty().withMessage('Id requerido')
        .isInt().withMessage('El Id debe ser un numero'),
        validateInputs
], deleteMovie);

router.put('/editmovie/:id', [
        check('id')
        .notEmpty().withMessage('Id requerido')
        .isInt().withMessage('El Id debe ser un numero'),
        check('title')
        .notEmpty().withMessage('Titulo requerido')
        .isLength({ max: 100 }).withMessage('El titulo no puede exceder 100 caracteres'),
        check('image_url')
        .notEmpty().withMessage('Es necesario introducir una url para la imagen de la pelicula')
        .isLength({ max: 255 }).withMessage('La url no puede exceder 255 caracteres'),
        check('year')
        .notEmpty().withMessage('El año es requerido')
        .isInt().withMessage('El año debe ser un numero'),
        check ('director')
        .notEmpty().withMessage('Nombre del director requerido')
        .isLength({ max: 100 }).withMessage('El nombre del director no puede exceder 100 caracteres'),
        check('duration')
        .notEmpty().withMessage('La duracion es necesaria')
        .isInt().withMessage('La duracion debe ser un numero'),
        check('genre_id')
        .notEmpty().withMessage('Id requerido')
        .isInt().withMessage('El Id debe ser un numero'),
        validateInputs
], editMovie);

router.get('/genres', getGenres);

router.get('/genre/:id', [
        check('id')
        .notEmpty().withMessage('Id requerido')
        .isInt().withMessage('El Id debe ser un numero'),
], getGenreById);

router.post('/creategenre', [
        check('name')
        .notEmpty().withMessage('Genero requerido')
        .isLength({ max: 100 }).withMessage('El genero no puede exceder 100 caracteres'),
        validateInputs
], createGenre);  

/*Exportacion rutaz*/
module.exports = router;
