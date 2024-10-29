/*Importacion de express*/
const express = require('express');

/*guardamos el metodo router de express en una constante para poder utilizarlo*/
const router=express.Router();

/*importacion de funciones controladoras*/
const { 
        getUserByEmail, 
        createUser,
        updateUserPasswordByEmail
} = require('../controllers/authController')

/* Rutas de usuario */
router.get("/", getUserByEmail);

router.post('/', createUser);

router.put('/', updateUserPasswordByEmail);

/* Exportación de rutas */
module.exports = router;