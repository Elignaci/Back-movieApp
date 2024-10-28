/*importacion de los modelos de movie*/
const {
    getAllMoviesModel, 
    getMovieByTitleModel,
    createMovieModel,
    deleteMovieModel,
    editMovieModel
    
    }=require('../models/movieModel')

/*Funcion todas las pelis + pelispor titulo*/
const getMovies = async (req, res) => {
    let data;

    try {
        const title = req.body.title

        if (title){
            data = await getMovieByTitleModel(title)
        } else {
            data = await getAllMoviesModel()
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
const createMovie = async (req, res) => {
    const { title,
            image_url, 
            year, 
            director, 
            duration, 
            genre_id}=req.body

    
    try {
        const movieSaved= await createMovieModel(title, image_url, year, director, duration, genre_id)
        return res.status(201).json({
            ok: true,
            msg: 'Nueva pelicula creada',
            movieSaved
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error al crear la pelicula'
        })
    }

}
/*Funcion eliminar pelis*/
const deleteMovie = async (req, res) => {
    const id = req.params.id
    try {
        const data = await deleteMovieModel(id)
        if(!data){
            return res.status(404).json({
                ok: false,
                msg:"Pelicula no encotrada"
            })
        }
        return res.status(200).json({
            ok: true,
            msg: 'Eliminando película',
            data
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error al eliminar la pelicula'
        })
    }
}
/*Funcion editar pelis*/
const editMovie = async (req, res) => {
    try {
        const { title,
                image_url, 
                year, 
                director, 
                duration, 
                genre_id}=req.body;

        const id=req.params.id;

        const movieEdited = await editMovieModel(id, title, image_url, year, director, duration, genre_id)
        return res.status(200).json({
            ok: true,
            msg: 'Pelicula actualizada',
            movieEdited
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'No se ha podido actualizar la película'
        })   
    }
}


/*Exportacion funciones*/
module.exports={
    getMovies,
    createMovie,
    deleteMovie,
    editMovie
}