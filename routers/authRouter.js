const express = require('express');
const { 
    register, 
    login, 
    logout,
    recoverPassword 
} = require('../controllers/authController');
const { check } = require('express-validator'); 
const { validateInputs } = require('../middlewares/validateInputs');
const router = express.Router();

router.post(
    '/register',
    [
        check('name')
            .notEmpty().withMessage('Nombre requerido')
            .isLength({ max: 100 }).withMessage('Nombre  no puede exceder 100 caracteres'),
        check('email')
            .notEmpty().withMessage('Email requerido')
            .isEmail().withMessage('Formato de email no válido')
            .isLength({ max: 100 }).withMessage('Email no puede exceder 100 caracteres'),
        check('password')
            .notEmpty().withMessage('Contraseña requerida')
            .isLength({ min: 6, max: 100 }).withMessage('Contraseña debe tener entre 6 y 100 caracteres')
    ],
    validateInputs,
    register
);

router.post(
    '/login',
    [
        check('email')
            .notEmpty().withMessage('Email requerido')
            .isEmail().withMessage('Formato de email no válido')
            .isLength({ max: 100 }).withMessage('Email no puede exceder 100 caracteres'),
        check('password')
            .notEmpty().withMessage('Contraseña requerida')
            .isLength({ max: 100 }).withMessage('Contraseña no puede exceder 100 caracteres')
    ],
    validateInputs,
    login
);

router.post('/logout', logout);

router.post('/recover-password',
    [
        check('email')
            .notEmpty().withMessage('Email requerido')
            .isEmail().withMessage('Formato de email no válido')
            .isLength({ max: 100 }).withMessage('Email no puede exceder 100 caracteres'),
    ],
    validateInputs,
    recoverPassword
);


module.exports = router;
