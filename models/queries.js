const movies = {
    getAllMovies: `
    SELECT *
    FROM movies
    ORDER BY title;`,

    getMovieByTitle:`
    SELECT *
    FROM movies
    WHERE title LIKE '%' || $1 || '%'
    ORDER BY title;`,

    createMovie:`
    INSERT INTO movies (title, image_url, year, director, duration, genre_id)
    VALUES ($1, $2, $3, $4, $5, $6)`,

    deleteMovie:`
    DELETE FROM movies
    WHERE id=$1`,

    editMovie:`
    UPDATE movies
    SET title=$2,
	    image_url=$3,
	    year=$4,
	    director=$5,
	    duration=$6,
        genre_id=$7
    WHERE id=$1`
}


module.exports={
    movies
}