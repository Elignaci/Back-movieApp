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

/* Importación de middlewares */
const { 
    verifyToken, 
    verifyRole 
} = require('../middlewares/authMiddleware');

/*Rutas Movies*/
// Obtener todas las películas + búsqueda por título (requiere autenticación)
router.get('/', verifyToken, getMovies);

// Crear película (requiere autenticación y rol de administrador)
router.post('/', verifyToken, verifyRole(['admin']), createMovie);

// Eliminar película por id (requiere autenticación y rol de administrador)
router.delete('/:id', verifyToken, verifyRole(['admin']), deleteMovie);

// Actualizar película por id (requiere autenticación y rol de administrador)
router.put('/:id', verifyToken, verifyRole(['admin']), editMovie);

//search favorites (es un join de movies y user_movies)


//CRUD a generos (get y create)


/*Exportacion rutaz*/
module.exports=router;
