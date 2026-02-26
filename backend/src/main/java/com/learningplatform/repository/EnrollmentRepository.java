package com.learningplatform.repository;

import com.learningplatform.entity.Enrollment;
import com.learningplatform.entity.User;
import com.learningplatform.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByUser(User user);

    Optional<Enrollment> findByUserAndCourse(User user, Course course);

    boolean existsByUserAndCourse(User user, Course course);
}
