-------------------TABLAS-------------------

--Tabla user
CREATE TABLE users (
id serial NOT NULL PRIMARY KEY,
name varchar (100) NOT NULL,
email varchar(100) NOT NULL UNIQUE,
password varchar (100) NOT NULL,
role varchar (10) NOT NULL,
created_at DATE default current_timestamp
);

--Tabla genres
CREATE TABLE genres (
id serial NOT NULL PRIMARY KEY UNIQUE,
name varchar (100) NOT NULL UNIQUE
);

--Tabla movies
CREATE TABLE movies (
id serial NOT NULL PRIMARY KEY,
title varchar(100) NOT NULL UNIQUE,
image_url varchar(255),
year integer,
director varchar(100),
duration integer,
created_at DATE default current_timestamp,
genre_id integer NOT NULL,
FOREIGN KEY (genre_id) REFERENCES genres(id)
);

--Tabla user_movies
CREATE TABLE user_movies(
user_id integer NOT NULL,
movie_id integer NOT NULL,
PRIMARY KEY (user_id, movie_id),
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);

-------------------VALORES PRUEBA-------------------

--Valores de prueba users
INSERT INTO users(name, email, password, role)
VALUES
('Nacho', 'nacho@correo.com', 'nacho123', 'user'),
('Steven', 'steven@correo.com', 'steven123', 'admin');

--Valores prueba genres
INSERT INTO genres (name)
VALUES 
('Fantasia'),
('Ciencia Ficción'),
('Terror'),
('Acción'),
('Animación');

--Valores de prueba movies 
INSERT INTO movies (title, year, director, duration, genre_id)
VALUES
('Tron: Legacy', 2010, 'Joseph Kosinski', 125, 2),
('El Hobbit: Un viaje inesperado', 2012, 'Peter Jackson', 169, 1),
('El Hobbit: La desolacion de Smaug', 2013, 'Peter Jackson', 161, 1);

--Valores de prueba user_movies 
INSERT INTO user_movies (user_id, movie_id)
VALUES (1, 1), (1, 2), (2, 2);