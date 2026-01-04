package Nhom2Cum1.SmLearning.service;

import Nhom2Cum1.SmLearning.entity.Course;
import Nhom2Cum1.SmLearning.entity.Student;
import Nhom2Cum1.SmLearning.entity.StudentProgress;
import Nhom2Cum1.SmLearning.repository.CourseRepository;
import Nhom2Cum1.SmLearning.repository.StudentProgressRepository;
import Nhom2Cum1.SmLearning.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class TeacherService {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private StudentProgressRepository studentProgressRepository;
    @Autowired
    private CourseRepository courseRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentById(Long studentId) {
        return studentRepository.findById(studentId);
    }

    public List<StudentProgress> getStudentProgress(Long studentId) {
        return studentProgressRepository.findByStudentId(studentId);
    }

    public List<Course> getCoursesByTeacher(Long teacherId) {
        return courseRepository.findByTeacherId(teacherId);
    }
}
