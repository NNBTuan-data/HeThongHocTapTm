package Nhom2Cum1.SmLearning.repository;

import Nhom2Cum1.SmLearning.entity.LearningLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearningLogRepository extends JpaRepository<LearningLog, Long> {
    List<LearningLog> findByStudentId(Long studentId);
}
