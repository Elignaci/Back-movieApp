/*Importacion de express*/
const express = require('express');

/*guardamos el metodo router de express en una constante para poder utilizarlo*/
const router=express.Router();

/*importacion de funciones controladoras*/
const { 
        getUserByEmail,
        createUser,
        updateUserPasswordByEmail,
        getUserFavoritesMovies,
        addUserFavoritesMovies,
        deleteUserFavoritesMovies
} = require('../controllers/userController')

/* Rutas de usuario */
// Obtener usuario por correo electrónico
router.get('/email', getUserByEmail);

// Crear nuevo usuario
router.post('/', createUser);

// Actualizar contraseña de usuario por correo electrónico
router.put('/email', updateUserPasswordByEmail); 

// Obtener películas favoritas de usuario
router.get('/favorites', getUserFavoritesMovies); 

// Agregar película a favoritos
router.post('/favorites/:id', addUserFavoritesMovies);

// Eliminar película de favoritos
router.delete('/favorites/:id', deleteUserFavoritesMovies); 

/* Exportación de rutas */
module.exports = router;