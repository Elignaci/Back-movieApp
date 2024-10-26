--Tabla user
CREATE TABLE users (
id serial NOT NULL PRIMARY KEY,
name varchar (100) NOT NULL,
email varchar(100) NOT NULL UNIQUE,
password varchar (100) NOT NULL,
role varchar (10) NOT NULL,
created_at DATE default current_timestamp
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
genre_name varchar(100) NOT NULL,
FOREIGN KEY (genre_name) REFERENCES genres(name)
);
--Tabla genres
CREATE TABLE genres (
id serial NOT NULL PRIMARY KEY UNIQUE,
name varchar (100) NOT NULL UNIQUE
);


--Tabla user_movies
CREATE TABLE user_movies(
user_id integer PRIMARY KEY NOT NULL,
movie_id integer NOT NULL,
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (movie_id) REFERENCES movies(id)
);


--Valores de prueba users
INSERT INTO users(name, email, password, role)
VALUES
('Nacho', 'nacho@correo.com', 'nacho123', 'user'),
('Steven', 'steven@correo.com', 'steven123', 'admin');

--Valores de prueba movies (revisar conflicto con genere)
INSERT INTO movies (title, year, director, duration, genre)
VALUES
('Tron: Legacy', 2010, 'Joseph Kosinski', 125, 'Ciencia ficcion'),
('El Hobbit: Un viaje inesperado', 2012, 'Peter Jackson', 169, 'Fantasía');