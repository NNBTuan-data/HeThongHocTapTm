package Nhom2Cum1.SmLearning.config;

import Nhom2Cum1.SmLearning.entity.Role;
import Nhom2Cum1.SmLearning.entity.User;
import Nhom2Cum1.SmLearning.repository.UserRepository;
import Nhom2Cum1.SmLearning.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    public ApplicationRunner init() {
        return args -> {
            // Check if test users already exist
            if (userRepository.findByEmail("student@test.com").isEmpty()) {
                // Create test student
                User student = new User();
                student.setEmail("student@test.com");
                student.setPassword("password123");
                student.setFullName("Test Student");
                student.setRole(Role.STUDENT);
                userService.registerUser(student);
                System.out.println("Test student created: student@test.com / password123");
            }

            if (userRepository.findByEmail("teacher@test.com").isEmpty()) {
                // Create test teacher
                User teacher = new User();
                teacher.setEmail("teacher@test.com");
                teacher.setPassword("password123");
                teacher.setFullName("Test Teacher");
                teacher.setRole(Role.TEACHER);
                userService.registerUser(teacher);
                System.out.println("Test teacher created: teacher@test.com / password123");
            }

            if (userRepository.findByEmail("baotu0ndz24h@gmail.com").isEmpty()) {
                // Create test user with the email from screenshot
                User user = new User();
                user.setEmail("baotu0ndz24h@gmail.com");
                user.setPassword("password123");
                user.setFullName("Bao Tu");
                user.setRole(Role.STUDENT);
                userService.registerUser(user);
                System.out.println("Test user created: baotu0ndz24h@gmail.com / password123");
            }
        };
    }
}
