package com.learningplatform.controller;

import com.learningplatform.entity.Assignment;
import com.learningplatform.entity.Module;
import com.learningplatform.entity.Problem;
import com.learningplatform.repository.AssignmentRepository;
import com.learningplatform.repository.ModuleRepository;
import com.learningplatform.repository.ProblemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class AssignmentController {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private ProblemRepository problemRepository;

    @Autowired
    private ModuleRepository moduleRepository;

    // Get assignments for a module
    @GetMapping("/modules/{moduleId}/assignments")
    public List<Assignment> getAssignmentsByModule(@PathVariable Long moduleId) {
        return assignmentRepository.findByModuleId(moduleId);
    }

    // Get problems for an assignment
    @GetMapping("/assignments/{assignmentId}/problems")
    public List<Problem> getProblemsByAssignment(@PathVariable Long assignmentId) {
        return problemRepository.findByAssignmentId(assignmentId);
    }

    // Get single assignment with problems
    @GetMapping("/assignments/{id}")
    public ResponseEntity<Assignment> getAssignment(@PathVariable Long id) {
        return assignmentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create Assignment
    @PostMapping("/modules/{moduleId}/assignments")
    public ResponseEntity<Assignment> createAssignment(@PathVariable Long moduleId,
            @RequestBody Assignment assignment) {
        return moduleRepository.findById(moduleId)
                .map(module -> {
                    assignment.setModule(module);
                    return ResponseEntity.ok(assignmentRepository.save(assignment));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Add Problem to Assignment
    @PostMapping("/assignments/{assignmentId}/problems")
    public ResponseEntity<Problem> addProblem(@PathVariable Long assignmentId, @RequestBody Problem problem) {
        return assignmentRepository.findById(assignmentId)
                .map(assignment -> {
                    problem.setAssignment(assignment);
                    // Update total marks for assignment
                    assignment.setTotalMarks(
                            (assignment.getTotalMarks() == null ? 0 : assignment.getTotalMarks()) + problem.getMarks());
                    assignmentRepository.save(assignment);
                    return ResponseEntity.ok(problemRepository.save(problem));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
