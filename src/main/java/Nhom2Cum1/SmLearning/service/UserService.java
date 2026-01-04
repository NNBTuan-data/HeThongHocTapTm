package Nhom2Cum1.SmLearning.service;

import Nhom2Cum1.SmLearning.entity.Role;
import Nhom2Cum1.SmLearning.entity.Student;
import Nhom2Cum1.SmLearning.entity.Teacher;
import Nhom2Cum1.SmLearning.entity.User;
import Nhom2Cum1.SmLearning.repository.StudentRepository;
import Nhom2Cum1.SmLearning.repository.TeacherRepository;
import Nhom2Cum1.SmLearning.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        if (savedUser.getRole() == Role.STUDENT) {
            Student student = new Student();
            student.setUser(savedUser);
            studentRepository.save(student);
        } else if (savedUser.getRole() == Role.TEACHER) {
            Teacher teacher = new Teacher();
            teacher.setUser(savedUser);
            teacherRepository.save(teacher);
        }
        return savedUser;
    }

    @Transactional(readOnly = true)
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    @Transactional(readOnly = true)
    public Long getProfileId(Long userId, Role role) {
        if (role == Role.STUDENT) {
            return studentRepository.findByUser_Id(userId)
                    .map(Student::getId)
                    .orElse(null);
        } else if (role == Role.TEACHER) {
            return teacherRepository.findByUser_Id(userId)
                    .map(Teacher::getId)
                    .orElse(null);
        }
        return null;
    }
}
