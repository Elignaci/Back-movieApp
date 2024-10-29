/*Exrtaemos desestructurado el metodo Pool  de PG*/
const {Pool}=require('pg')

/* guardamos un nuevo pool de conexiones en una constante*/
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
})
/**
 * Funcion para conectarse a BBDD.
 * Si
 * 
 * @param {Object} consulta 
 * @param {Array} variables 
 * @returns {Object} - Respuesta con la query.
 */
const connect = async (consulta, variables=[]) =>{
    let movie, response;
    try {
        movie = await pool.connect()
        response = await movie.query(consulta, variables)
        //console.log(response.rows)
        
    } catch (error) {
        console.log(error)
        throw error
    } finally {
        movie.release()
    }
    return response
}
module.exports={
    connect
}