package com.learningplatform.repository;

import com.learningplatform.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TopicRepository extends JpaRepository<Topic, Long> {
    List<Topic> findByModuleId(Long moduleId);
}
