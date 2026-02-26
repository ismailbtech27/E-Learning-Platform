package com.learningplatform.service;

import com.learningplatform.entity.Course;
import com.learningplatform.entity.Topic;
import com.learningplatform.repository.CourseRepository;
import com.learningplatform.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private TopicRepository topicRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course addCourse(Course course) {
        return courseRepository.save(course);
    }

    public java.util.Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    // The original getCourseTopics method is replaced or modified based on the
    // instruction.
    // The provided "Code Edit" snippet seems to introduce a new method
    // `getModuleTopics`
    // and remove the old `getCourseTopics` method.
    // To make the code syntactically correct and incorporate the new method,
    // we assume the intent was to replace `getCourseTopics` with `getModuleTopics`
    // and add necessary imports/autowiring.
    public List<Topic> getModuleTopics(Long moduleId) {
        return topicRepository.findByModuleId(moduleId);
    }
}
