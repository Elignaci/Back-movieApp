/*importacion express*/
const express = require('express');

/*importar cors*/
const cors = require('cors');

/*importacion de dotenv*/
require('dotenv').config()

/*Guardamos express en una variable para poder utilizarlo*/
const app=express();

/*Servidor*/
const port = process.env.PORT || 4000;

/*Middlewares*/
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

app.use(cors());

// parse application/json
app.use(express.json())

/*Rutas*/
app.use('/api/v1/admin', require('./routers/apiRouterAdmin'))
app.use('/api/v1/user', require('./routers/apiRouterUser'))
app.use('/api/v1/auth', require('./routers/apiRouterAuth'))

/*Servidor a la escucha*/
app.listen(port, ()=>{
    console.log(`Server on port ${port}`)
})