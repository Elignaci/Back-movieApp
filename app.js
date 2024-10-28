/*importacion express*/
const express = require('express');

/*importacion de dotenv*/
require('dotenv').config()

/*Guardamos express en una variable para poder utilizarlo*/
const app=express();

/*Servidor*/
const port=process.env.PORT

/*Middlewares*/
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

/*Rutas*/
//app.use('/api/v1', require('./routes/apiRouter'))
app.use('/api/v1/auth', require('./routers/authRouter'))

/*Servidor a la escucha*/
app.listen(port, ()=>{
    console.log(`Server on port ${port}`)
})

//Importar cors!!