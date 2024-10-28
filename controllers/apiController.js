/*importacion de los modelos de movie*/
const {
    getAllMovies, 
    getMovieByTitle
    }=require('../models/movieModel')



/*Funcion todas las pelis + pelispor titulo*/
const getMovies = async (req, res) => {
    let data;

    try {
        const title = req.body.title

        if (title){
            data = await getMovieByTitle(title)
        } else {
            data = await getAllMovies()
        }

        return res.status(200).json({
            ok:true,
            data
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            data: [],
            msg: 'Contacta con el administrador'
        })
        
    }
}

/*Funcion crear pelis*/
const createMovie = (req, res) => {
    const { title,
            imagen_url, 
            year, 
            director, 
            duration, 
            genre_id}=req.body

}
/*Funcion eliminar pelis*/
const deleteMovie = (req, res) => {

}
/*Funcion editar pelis*/
const editMovie = (req, res) => {

}


/*Exportacion funciones*/
module.exports={
    getMovies,
    createMovie,
    deleteMovie,
    editMovie
}