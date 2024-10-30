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
        getUserFavoritesMovies,
        getAllMovies,
        getMoviesByTittle,
        addUserFavoritesMovies,
        deleteUserFavoritesMovies
} = require('../controllers/userController')

/* Rutas de usuario */
router.post("/movies", [
        check('email')
        .notEmpty().withMessage('Email requerido')
        .isEmail().withMessage('Formato de email no válido')
        .isLength({ max: 100 }).withMessage('Email no puede exceder 100 caracteres'),
        validateInputs
], getUserFavoritesMovies);


router.get('/search', getAllMovies);


router.post("/searchtitle", [
        check('title')
        .notEmpty().withMessage('Titulo requerido')
        .isLength({ max: 100 }).withMessage('El titulo no puede exceder 100 caracteres'),
        validateInputs
],getMoviesByTittle);


router.post('/favorites/:id', [
        check('email')
        .notEmpty().withMessage('Email requerido')
        .isEmail().withMessage('Formato de email no válido')
        .isLength({ max: 100 }).withMessage('Email no puede exceder 100 caracteres'),
        check('id_movie')
        .notEmpty().withMessage('Id requerido')
        .isInt().withMessage('El Id debe ser un numero'),
        validateInputs
], addUserFavoritesMovies);


router.delete('/favorites/:id', [
        check('email')
        .notEmpty().withMessage('Email requerido')
        .isEmail().withMessage('Formato de email no válido')
        .isLength({ max: 100 }).withMessage('Email no puede exceder 100 caracteres'),
        check('id_movie')
        .notEmpty().withMessage('Id requerido')
        .isInt().withMessage('El Id debe ser un numero'),
        validateInputs
],deleteUserFavoritesMovies);

/* Exportación de rutas */
module.exports = router;