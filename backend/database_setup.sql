CREATE DATABASE IF NOT EXISTS learning_platform;
USE learning_platform;

-- Note: The tables (users, courses, enrollments, modules, problems, assignments, topics) 
-- will be automatically created by Spring Boot (Hibernate) because of the application.properties setting:
-- spring.jpa.hibernate.ddl-auto=update
-- Below is the script to insert an initial ADMIN user so you can log in immediately.

INSERT INTO users (username, password, email, role, profile_image_url) 
VALUES ('admin', 'admin123', 'admin@example.com', 'ADMIN', '')
ON DUPLICATE KEY UPDATE username=username;
