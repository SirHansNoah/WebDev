CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE jwtdb;

CREATE TABLE users(
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL UNIQUE,
  user_password TEXT NOT NULL,
  courses TEXT[],
);

CREATE TABLE courses(
  course_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_name TEXT NOT NULL,
  course_price INT NOT NULL,
  enrolled_members INT,
  course_instrcutor TEXT NOT NULL
);

SELECT * FROM users;
SELECT * FROM courses;

-- INSERT INTO users (user_name,user_email,user_password) VALUES ('Bob','bob@email.com','bob');


--psql -U postgres
--\c jwtdb
--\dt
--heroku pg:psql