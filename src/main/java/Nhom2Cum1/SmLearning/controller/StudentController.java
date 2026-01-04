package Nhom2Cum1.SmLearning.controller;

import Nhom2Cum1.SmLearning.entity.*;
import Nhom2Cum1.SmLearning.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @GetMapping("/courses")
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(studentService.getAllCourses());
    }

    @GetMapping("/courses/{courseId}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long courseId) {
        return studentService.getCourseById(courseId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/courses/{courseId}/lessons")
    public ResponseEntity<List<Lesson>> getLessonsByCourse(@PathVariable Long courseId) {
        return ResponseEntity.ok(studentService.getLessonsByCourse(courseId));
    }

    @GetMapping("/lessons/{lessonId}/materials")
    public ResponseEntity<List<Material>> getMaterialsByLesson(@PathVariable Long lessonId) {
        return ResponseEntity.ok(studentService.getMaterialsByLesson(lessonId));
    }

    @GetMapping("/{studentId}/progress")
    public ResponseEntity<List<StudentProgress>> getProgress(@PathVariable Long studentId) {
        return ResponseEntity.ok(studentService.getStudentProgress(studentId));
    }

    @PostMapping("/progress")
    public ResponseEntity<StudentProgress> updateProgress(@RequestBody StudentProgress progress) {
        return ResponseEntity.ok(studentService.updateProgress(progress));
    }

    @GetMapping("/{studentId}/recommendations")
    public ResponseEntity<List<Recommendation>> getRecommendations(@PathVariable Long studentId) {
        return ResponseEntity.ok(studentService.getRecommendations(studentId));
    }

    @GetMapping("/{studentId}/quiz-results")
    public ResponseEntity<List<QuizResult>> getQuizResults(@PathVariable Long studentId) {
        return ResponseEntity.ok(studentService.getQuizResults(studentId));
    }

    @PostMapping("/quiz-results")
    public ResponseEntity<QuizResult> submitQuizResult(@RequestBody QuizResult result) {
        return ResponseEntity.ok(studentService.submitQuizResult(result));
    }

    @GetMapping("/{studentId}/logs")
    public ResponseEntity<List<LearningLog>> getLearningLogs(@PathVariable Long studentId) {
        return ResponseEntity.ok(studentService.getLearningLogs(studentId));
    }
}
