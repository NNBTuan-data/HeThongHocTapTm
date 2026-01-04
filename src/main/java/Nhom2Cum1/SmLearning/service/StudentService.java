package Nhom2Cum1.SmLearning.service;

import Nhom2Cum1.SmLearning.entity.*;
import Nhom2Cum1.SmLearning.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private StudentProgressRepository studentProgressRepository;
    @Autowired
    private RecommendationRepository recommendationRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private QuizResultRepository quizResultRepository;
    @Autowired
    private LessonRepository lessonRepository;
    @Autowired
    private MaterialRepository materialRepository;
    @Autowired
    private LearningLogRepository learningLogRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Optional<Course> getCourseById(Long courseId) {
        return courseRepository.findById(courseId);
    }

    public List<Lesson> getLessonsByCourse(Long courseId) {
        return lessonRepository.findByCourseId(courseId);
    }

    public List<Material> getMaterialsByLesson(Long lessonId) {
        return materialRepository.findByLessonId(lessonId);
    }

    public List<StudentProgress> getStudentProgress(Long studentId) {
        return studentProgressRepository.findByStudentId(studentId);
    }

    @Transactional
    public StudentProgress updateProgress(StudentProgress progress) {
        return studentProgressRepository.save(progress);
    }

    public List<Recommendation> getRecommendations(Long studentId) {
        return recommendationRepository.findByStudentId(studentId);
    }

    public List<QuizResult> getQuizResults(Long studentId) {
        return quizResultRepository.findByStudentId(studentId);
    }

    @Transactional
    public QuizResult submitQuizResult(QuizResult result) {
        return quizResultRepository.save(result);
    }

    public List<LearningLog> getLearningLogs(Long studentId) {
        return learningLogRepository.findByStudentId(studentId);
    }
}
