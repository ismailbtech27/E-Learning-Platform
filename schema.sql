CREATE DATABASE IF NOT EXISTS learning_platform;
USE learning_platform;

-- Table to store User Logins
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL,
    profile_image_url VARCHAR(255)
);

-- Table to store Courses (required for Enrollments)
CREATE TABLE IF NOT EXISTS courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DOUBLE NOT NULL,
    instructor_name VARCHAR(255),
    image_url VARCHAR(255)
);

-- Table to store User Enrolled Courses
CREATE TABLE IF NOT EXISTS enrollments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Insert a default admin user
INSERT INTO users (username, password, email, role, profile_image_url) 
VALUES ('admin', 'admin123', 'admin@example.com', 'ADMIN', '');
