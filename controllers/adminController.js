/*importacion de los modelos de movie*/
const {
    getAllMoviesModel, 
    getMoviesByTitleModel,
    createMovieModel,
    deleteMovieModel,
    editMovieModel,
    getAllGenresModel,        
    createGenreModel
}=require('../models/adminModel')

/*Funcion todas las pelis + pelispor titulo*/
const getMovies = async (req, res) => {
    let movies;
    try {
        movies = await getAllMoviesModel()
        return res.status(200).json({
            ok: true,
            data: movies
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error contacte con el administrador'
        });
    }
};

const getMoviesByTittle = async (req, res) => {
    let movies;
    try {
        const title = req.params.title;
        movies = await getMoviesByTitleModel(title);
        return res.status(200).json({
            ok: true,
            data: movies
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error contacte con el administrador'
        });
    }
};

/*Funcion crear pelis*/
const createMovie = async (req, res) => {
    const { title,
            image_url, 
            year, 
            director, 
            duration, 
            genre_id } = req.body;
    try {
        const movieSaved = await createMovieModel(title, image_url, year, director, duration, genre_id);
        return res.status(201).json({
            ok: true,
            msg: 'Nueva pelicula creada',
            movieSaved
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error al crear la pelicula'
        });
    }
};

/*Funcion eliminar pelis*/
const deleteMovie = async (req, res) => {
    const id = req.params.id
    try {
        const data = await deleteMovieModel(id);
        if(!data){
            return res.status(404).json({
                ok: false,
                msg:"Pelicula no encotrada"
            });
        }
        return res.status(200).json({
            ok: true,
            msg: 'Eliminando película',
            data
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error al eliminar la pelicula'
        });
    }
};

/*Funcion editar pelis*/
const editMovie = async (req, res) => {
    const { title,
        image_url, 
        year, 
        director, 
        duration, 
        genre_id } = req.body;
    try {
        const id=req.params.id;
        const movieEdited = await editMovieModel(id, title, image_url, year, director, duration, genre_id);
        return res.status(200).json({
            ok: true,
            msg: 'Pelicula actualizada',
            movieEdited
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'No se ha podido actualizar la película'
        });
    }
};

const getGenres = async (req, res) => {
    try {
        const genres = await getAllGenresModel();
        return res.status(200).json({
            ok: true,
            data: genres
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener géneros'
        });
    }
};

const createGenre = async (req, res) => {
    const { name } = req.body;
    try {
        const newGenre = await createGenreModel(name);
        return res.status(201).json({
            ok: true,
            msg: 'Nuevo género creado',
            genre: newGenre
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al crear el género'
        });
    }
};

/*Exportacion funciones*/
module.exports={
    getMovies,
    getMoviesByTittle,
    createMovie,
    deleteMovie,
    editMovie,
    getGenres,       
    createGenre 
}