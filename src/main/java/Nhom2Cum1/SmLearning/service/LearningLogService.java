package Nhom2Cum1.SmLearning.service;

import Nhom2Cum1.SmLearning.entity.LearningLog;
import Nhom2Cum1.SmLearning.repository.LearningLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LearningLogService {
    @Autowired
    private LearningLogRepository learningLogRepository;

    @Transactional
    public LearningLog logActivity(LearningLog log) {
        return learningLogRepository.save(log);
    }
}
