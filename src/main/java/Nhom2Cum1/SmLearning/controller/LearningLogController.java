package Nhom2Cum1.SmLearning.controller;

import Nhom2Cum1.SmLearning.entity.LearningLog;
import Nhom2Cum1.SmLearning.service.LearningLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/logs")
public class LearningLogController {
    @Autowired
    private LearningLogService learningLogService;

    @PostMapping
    public ResponseEntity<LearningLog> logActivity(@RequestBody LearningLog log) {
        return ResponseEntity.ok(learningLogService.logActivity(log));
    }
}
