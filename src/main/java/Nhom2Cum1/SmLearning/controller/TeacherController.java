package Nhom2Cum1.SmLearning.controller;

import Nhom2Cum1.SmLearning.entity.Course;
import Nhom2Cum1.SmLearning.entity.Student;
import Nhom2Cum1.SmLearning.entity.StudentProgress;
import Nhom2Cum1.SmLearning.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {
    @Autowired
    private TeacherService teacherService;

    @GetMapping("/students")
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(teacherService.getAllStudents());
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long studentId) {
        return teacherService.getStudentById(studentId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/student/{studentId}/progress")
    public ResponseEntity<List<StudentProgress>> getStudentProgress(@PathVariable Long studentId) {
        return ResponseEntity.ok(teacherService.getStudentProgress(studentId));
    }

    @GetMapping("/{teacherId}/courses")
    public ResponseEntity<List<Course>> getCoursesByTeacher(@PathVariable Long teacherId) {
        return ResponseEntity.ok(teacherService.getCoursesByTeacher(teacherId));
    }
}
