package Nhom2Cum1.SmLearning.repository;

import Nhom2Cum1.SmLearning.entity.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {
    List<Recommendation> findByStudentId(Long studentId);
}
