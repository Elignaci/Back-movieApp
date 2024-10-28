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
    INSERT INTO movies (title, imagen_url, year, director, duration, genre_id)
    VALUES ('$1', '$2', '$3', '$4', '$5', '$6')`,

    deleteMovie:`
    DELETE FROM movies
    WHERE id='$1'`,

    editMovie:`
    UPDATE movies
    SET title='$1'
	    image_url='$2'
	    year = '$3'
	    director='$4'
	    duration='$5'
    WHERE id='$'`
}

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
    `
}

module.exports={
    movies,
    users
}