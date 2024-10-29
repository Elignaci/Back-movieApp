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

const genres = {
    getAllGenres:`
    SELECT * 
    FROM genres
    ORDER BY name
    `, 

    createGenre:`
    INSERT INTO genres (name)
    VALUES ($1)
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
    `,

    updateUserPasswordByEmail:`
    UPDATE users
    SET password = $2
    WHERE email = $1
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
    `,

    deleteUserFavoritesMovies:`
    DELETE FROM user_movies
    WHERE user_id = (SELECT id FROM users WHERE email = $1) AND movie_id = $2
    `
}

module.exports={
    movies,
    users,
    genres
}