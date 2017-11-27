
CREATE DATABASE TODO;

CREATE TABLE todo (
	id SERIAL PRIMARY KEY,
	task VARCHAR (80),
	status VARCHAR (15) );
	
	INSERT INTO todo ("task", "status")
VALUES ('finish this assignment','not complete');