const movies = {
    getAllMovies: `
    SELECT movies.*, genres.name AS genre_name
    FROM movies
    JOIN genres ON movies.genre_id = genres.id
    ORDER BY movies.title`,

    getMovieByTitle:`
    SELECT movies.*, genres.name AS genre_name
    FROM movies
    JOIN genres ON movies.genre_id = genres.id
    WHERE movies.title ILIKE '%' || $1 || '%'
    ORDER BY movies.title`,

    getMovieById:`
    SELECT movies.*, genres.name AS genre_name
    FROM movies
    JOIN genres ON movies.genre_id = genres.id
    WHERE movies.id = ($1)`,

    createMovie:`
    INSERT INTO movies (title, image_url, year, director, duration, genre_id)
    VALUES ($1, $2, $3, $4, $5, $6)  
    RETURNING *`,

    deleteMovie:`
    DELETE FROM movies
    WHERE id=$1  
    RETURNING *`,

    editMovie:`
    UPDATE movies
    SET title=$2,
	    image_url=$3,
	    year=$4,
	    director=$5,
	    duration=$6,
        genre_id=$7
    WHERE id=$1
    RETURNING *`
}

const genres = {
    getAllGenres:`
    SELECT * 
    FROM genres
    ORDER BY name
    `, 

    getGenreById:`
    SELECT * 
    FROM genres
    WHERE id = $1
    `, 

    createGenre:`
    INSERT INTO genres (name)
    VALUES ($1)
    RETURNING *
    `
};


const users = {
    getUserByEmail:`
    SELECT *
    FROM USERS
    WHERE email = $1
    `,

    createUser:`
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,

    updateUserPasswordByEmail:`
    UPDATE users
    SET password = $2
    WHERE email = $1
    RETURNING *
    `,

    getUserFavoritesMovies:`
    SELECT users.email, movies.*
    FROM movies
    JOIN user_movies ON movies.id = user_movies.movie_id
    JOIN users ON users.id = user_movies.user_id
    WHERE users.email = $1
    `,

    addUserFavoritesMovies:`
    INSERT INTO user_movies (user_id, movie_id)
    VALUES ((SELECT id FROM users WHERE email = $1), $2)
    RETURNING *
    `,

    deleteUserFavoritesMovies:`
    DELETE FROM user_movies
    WHERE user_id = (SELECT id FROM users WHERE email = $1) AND movie_id = $2
    RETURNING *
    `
}

module.exports={
    movies,
    users,
    genres
}