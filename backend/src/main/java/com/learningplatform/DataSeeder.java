package com.learningplatform;

import com.learningplatform.entity.Course;
import com.learningplatform.entity.Module;
import com.learningplatform.entity.Topic;
import com.learningplatform.repository.CourseRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

        private final CourseRepository courseRepository;
        private final com.learningplatform.repository.UserRepository userRepository;

        public DataSeeder(CourseRepository courseRepository,
                        com.learningplatform.repository.UserRepository userRepository) {
                this.courseRepository = courseRepository;
                this.userRepository = userRepository;
        }

        @Override
        public void run(String... args) throws Exception {
                // Seed Admin User
                if (userRepository.findByUsername("admin").isEmpty()) {
                        com.learningplatform.entity.User admin = new com.learningplatform.entity.User("admin",
                                        "admin123", "admin@example.com", "ADMIN");
                        userRepository.save(admin);
                        System.out.println("seeded admin user: admin / admin123");
                }

                if (courseRepository.count() == 0) {
                        Course course1 = new Course("React for Beginners", "John Doe", "Learn React from scratch",
                                        49.99,
                                        "https://images.unsplash.com/photo-1633356122544-f134324a6cee");
                        Course course2 = new Course("Advanced Spring Boot", "Jane Smith",
                                        "Master Spring Boot microservices", 89.99,
                                        "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107");
                        Course course3 = new Course("Java Essentials", "Mike Johnson", "Core Java programming", 29.99,
                                        "https://images.unsplash.com/photo-1627398242454-45cee8f8ad88");

                        // Seed Modules for React Course
                        Module c1m1 = new Module("Introduction to React", course1);
                        Module c1m2 = new Module("Components & Props", course1);
                        course1.setModules(java.util.Arrays.asList(c1m1, c1m2));

                        // Seed Topics for React Modules
                        Topic c1m1t1 = new Topic("What is React?", "React is a library...",
                                        "https://www.youtube.com/embed/w7ejDZ8SWv8", c1m1);
                        Topic c1m1t2 = new Topic("JSX Basics", "JSX is syntax extension...",
                                        "https://www.youtube.com/embed/w7ejDZ8SWv8", c1m1);
                        c1m1.setTopics(java.util.Arrays.asList(c1m1t1, c1m1t2));

                        Topic c1m2t1 = new Topic("Functional Components", "Functions that return JSX...",
                                        "https://www.youtube.com/embed/w7ejDZ8SWv8", c1m2);
                        c1m2.setTopics(java.util.Arrays.asList(c1m2t1));

                        // Seed Modules for Spring Boot
                        Module c2m1 = new Module("Spring Core", course2);
                        course2.setModules(java.util.Arrays.asList(c2m1));

                        Topic c2m1t1 = new Topic("Dependency Injection", "DI explanation",
                                        "https://www.youtube.com/embed/lfL5D0_b86g", c2m1);
                        c2m1.setTopics(java.util.Arrays.asList(c2m1t1));

                        // Seed Assignments for React
                        com.learningplatform.entity.Assignment a1 = new com.learningplatform.entity.Assignment(
                                        "React Basics Quiz", "Test your knowledge of React fundamentals", "Easy", c1m1);

                        com.learningplatform.entity.Problem p1 = new com.learningplatform.entity.Problem(
                                        "Create a Component",
                                        "Write a functional component named 'Welcome' that returns an h1 with 'Hello World'.",
                                        "function Welcome() {\n  // Write your code here\n}",
                                        "Easy",
                                        10,
                                        a1);

                        com.learningplatform.entity.Problem p2 = new com.learningplatform.entity.Problem(
                                        "JSX Attributes",
                                        "Fix the syntax error in the following JSX.",
                                        "const element = <img src='logo.png' class='logo' />;",
                                        "Easy",
                                        5,
                                        a1);

                        a1.addProblem(p1);
                        a1.addProblem(p2);
                        c1m1.setAssignments(java.util.Arrays.asList(a1));

                        courseRepository.save(course1);
                        courseRepository.save(course2);
                        courseRepository.save(course3);
                }
        }
}
