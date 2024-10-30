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
        getUserByEmail, 
        createUser,
        updateUserPasswordByEmail
} = require('../controllers/authController')

/* Rutas de usuario */
// Obtener un usuario por email 
router.get('/user', [
        check('email')
        .notEmpty().withMessage('Email requerido')
        .isEmail().withMessage('Formato de email no válido')
        .isLength({ max: 100 }).withMessage('Email no puede exceder 100 caracteres'),
        validateInputs
], getUserByEmail);

// Crear un usuario nuevo
router.post('/user', [
        check('name')
        .notEmpty().withMessage('Nombre es requerido')
        .isLength({ max: 100 }).withMessage('Nombre no puede exceder 100 caracteres'),
        check('email')
        .notEmpty().withMessage('Email es requerido')
        .isEmail().withMessage('Formato de email no válido')
        .isLength({ max: 100 }).withMessage('Email no puede exceder 100 caracteres'),
        check('password')
        .notEmpty().withMessage('Contraseña es requerida')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
        check('role')
        .notEmpty().withMessage('Rol es requerido')
        .isLength({ max: 10 }).withMessage('El rol no debe tener mas 10 caracteres'),
        validateInputs
], createUser);

// Actualizar la contraseña de un usuario
router.put('/user/password', [
        check('email')
        .notEmpty().withMessage('Email es requerido')
        .isEmail().withMessage('Formato de email no válido')
        .isLength({ max: 100 }).withMessage('Email no puede exceder 100 caracteres'),
        check('password')
        .notEmpty().withMessage('Contraseña es requerida')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
        validateInputs
], updateUserPasswordByEmail);

/* Exportación de rutas */
module.exports = router;