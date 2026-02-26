package com.learningplatform.service;

import com.learningplatform.entity.Course;
import com.learningplatform.entity.Enrollment;
import com.learningplatform.entity.User;
import com.learningplatform.repository.CourseRepository;
import com.learningplatform.repository.EnrollmentRepository;
import com.learningplatform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    public Enrollment enrollUser(String username, Long courseId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (enrollmentRepository.existsByUserAndCourse(user, course)) {
            throw new RuntimeException("User already enrolled in this course");
        }

        Enrollment enrollment = new Enrollment(user, course);
        return enrollmentRepository.save(enrollment);
    }

    public List<Course> getUserCourses(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return enrollmentRepository.findByUser(user).stream()
                .map(Enrollment::getCourse)
                .collect(Collectors.toList());
    }
}
