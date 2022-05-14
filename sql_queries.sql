CREATE DATABASE daily;
USE daily;

CREATE TABLE users (
	user_id varchar(21) NOT NULL,
	display_name varchar(30) NOT NULL,
	email varchar(50),
    PRIMARY KEY (user_id)
);

CREATE TABLE days (
	id int NOT NULL AUTO_INCREMENT,
    user_id varchar(21) NOT NULL,
	date date NOT NULL,
	rating int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE scales (
    id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(21) NOT NULL,
    scale_name VARCHAR(30) NOT NULL,
    max_points INT NOT NULL,
    rating_names VARCHAR(255),
    colors VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id)
        REFERENCES users (user_id)
);
