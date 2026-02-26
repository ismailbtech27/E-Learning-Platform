package com.learningplatform.controller;

import com.learningplatform.entity.Course;
import com.learningplatform.entity.Enrollment;
import com.learningplatform.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    @PostMapping("/{courseId}")
    public ResponseEntity<?> enrollUser(@RequestBody Map<String, String> payload, @PathVariable Long courseId) {
        // In a real app, username would come from Security Context/JWT
        // Here we expect it in the body for simplicity as requested, or we can assume
        // it comes from the frontend
        String username = payload.get("username");
        if (username == null) {
            return ResponseEntity.badRequest().body("Username is required");
        }

        try {
            Enrollment enrollment = enrollmentService.enrollUser(username, courseId);
            return ResponseEntity.ok(enrollment);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/my-courses")
    public ResponseEntity<List<Course>> getUserCourses(@RequestParam String username) {
        List<Course> courses = enrollmentService.getUserCourses(username);
        return ResponseEntity.ok(courses);
    }
}
